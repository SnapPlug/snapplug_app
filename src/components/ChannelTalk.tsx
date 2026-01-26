'use client';

import { useEffect, useCallback } from 'react';

declare global {
  interface Window {
    ChannelIO?: (...args: unknown[]) => void;
    ChannelIOInitialized?: boolean;
    loadChannelIO?: () => Promise<void>;
    openChannelIOWorkflow?: (workflowId: number) => void;
  }
}

const CHANNEL_TALK_PLUGIN_KEY = process.env.NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY || '';

// Channel.io 스크립트 로딩 지연 시간 (초기 페이지 로딩 후)
const LAZY_LOAD_DELAY = 5000; // 5초

export default function ChannelTalk() {
  // Channel.io 스크립트를 로드하는 함수
  const loadScript = useCallback((): Promise<void> => {
    return new Promise((resolve) => {
      if (window.ChannelIOInitialized) {
        resolve();
        return;
      }

      window.ChannelIOInitialized = true;
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
      s.onload = () => {
        // Boot Channel Talk after script loads
        window.ChannelIO?.('boot', {
          pluginKey: CHANNEL_TALK_PLUGIN_KEY,
          hideChannelButtonOnBoot: false,
        });
        resolve();
      };
      s.onerror = () => {
        console.error('Failed to load Channel.io script');
        resolve();
      };
      document.head.appendChild(s);
    });
  }, []);

  // Channel.io 초기화 함수 (Queue 설정)
  const initializeQueue = useCallback(() => {
    const w = window;
    if (w.ChannelIO) {
      return;
    }
    const ch: { (...args: unknown[]): void; c: (args: unknown[]) => void; q: unknown[][] } = function(...args: unknown[]) {
      ch.c(args);
    } as { (...args: unknown[]): void; c: (args: unknown[]) => void; q: unknown[][] };
    ch.q = [];
    ch.c = function(args: unknown[]) {
      ch.q.push(args);
    };
    w.ChannelIO = ch;
  }, []);

  useEffect(() => {
    if (!CHANNEL_TALK_PLUGIN_KEY) {
      console.warn('Channel Talk plugin key is not set');
      return;
    }

    // Queue 초기화 (스크립트 로딩 전에도 ChannelIO 호출 가능하도록)
    initializeQueue();

    // 전역 함수 노출: 버튼 클릭 시 Channel.io 로딩
    window.loadChannelIO = loadScript;

    // 전역 함수: Workflow 열기 (로딩 후 실행)
    window.openChannelIOWorkflow = async (workflowId: number) => {
      await loadScript();
      // 스크립트 로드 후 약간의 지연을 주어 boot 완료 대기
      setTimeout(() => {
        window.ChannelIO?.('openWorkflow', workflowId);
      }, 100);
    };

    // 지연 로딩 타이머 설정
    let loadTimer: NodeJS.Timeout | null = null;
    let hasLoaded = false;

    const triggerLoad = () => {
      if (hasLoaded) return;
      hasLoaded = true;
      if (loadTimer) clearTimeout(loadTimer);
      loadScript();
    };

    // 1. 사용자 상호작용 시 로딩 (스크롤, 클릭, 터치)
    const interactionEvents = ['scroll', 'click', 'touchstart', 'mousemove'];
    const handleInteraction = () => {
      triggerLoad();
      // 이벤트 리스너 제거
      interactionEvents.forEach(event => {
        window.removeEventListener(event, handleInteraction, { capture: true });
      });
    };

    // 상호작용 이벤트는 passive로 등록 (성능 최적화)
    interactionEvents.forEach(event => {
      window.addEventListener(event, handleInteraction, { capture: true, passive: true });
    });

    // 2. 5초 후 자동 로딩 (사용자 상호작용이 없어도)
    loadTimer = setTimeout(() => {
      if (!hasLoaded) {
        triggerLoad();
      }
    }, LAZY_LOAD_DELAY);

    return () => {
      if (loadTimer) clearTimeout(loadTimer);
      interactionEvents.forEach(event => {
        window.removeEventListener(event, handleInteraction, { capture: true });
      });
      window.ChannelIO?.('shutdown');
    };
  }, [loadScript, initializeQueue]);

  return null;
}
