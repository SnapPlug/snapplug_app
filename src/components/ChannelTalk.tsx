'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    ChannelIO?: (...args: unknown[]) => void;
    ChannelIOInitialized?: boolean;
  }
}

const CHANNEL_TALK_PLUGIN_KEY = process.env.NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY || '';

export default function ChannelTalk() {
  useEffect(() => {
    if (!CHANNEL_TALK_PLUGIN_KEY) {
      console.warn('Channel Talk plugin key is not set');
      return;
    }

    // Channel Talk boot script
    (function() {
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

      function l() {
        if (w.ChannelIOInitialized) {
          return;
        }
        w.ChannelIOInitialized = true;
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
        const x = document.getElementsByTagName('script')[0];
        if (x && x.parentNode) {
          x.parentNode.insertBefore(s, x);
        }
      }

      if (document.readyState === 'complete') {
        l();
      } else {
        window.addEventListener('DOMContentLoaded', l);
        window.addEventListener('load', l);
      }
    })();

    // Boot Channel Talk
    window.ChannelIO?.('boot', {
      pluginKey: CHANNEL_TALK_PLUGIN_KEY,
      customLauncherSelector: '.channel-talk-launcher',
      hideChannelButtonOnBoot: false,
    });

    return () => {
      window.ChannelIO?.('shutdown');
    };
  }, []);

  return null;
}
