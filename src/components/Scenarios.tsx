'use client';

import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

const scenarios = [
  {
    id: 'customs',
    icon: '⚖️',
    title: 'P 관세사무소',
    subtitle: '한달 평균 30~40건 처리',
    highlight: {
      number: '40',
      unit: '시간',
      suffix: '/월 절감',
    },
    subMetrics: [
      { label: '건당 처리', value: '1시간 → 10분' },
      { label: '영수증', value: '20장/건 자동 처리' },
    ],
    painPoint: '한 건당 평균 20장 영수증 처리, 평균 1시간 소요',
    solutions: [
      '영수증 OCR 판독 및 AI 자동 문서 작성',
    ],
  },
  {
    id: 'obgyn',
    icon: '🏥',
    title: 'O 산부인과',
    subtitle: '환자 1명당 간호사 1명 배정',
    highlight: {
      number: '43.5',
      unit: '시간',
      suffix: '/월 절감',
    },
    subMetrics: [
      { label: '환자당 소요', value: '15분 → 5분' },
      { label: '자동화', value: '예진·문진·상담' },
    ],
    painPoint: '환자 1명당 평균 10~15분 소요되는 예진·문진 과정',
    solutions: [
      '예진·문진·상담과정 자동화',
    ],
  },
  {
    id: 'stenography',
    icon: '📝',
    title: 'S 속기사사무소',
    subtitle: '한달 평균 200건+ 계약 상담',
    highlight: {
      number: '54',
      unit: '시간',
      suffix: '/월 절감',
    },
    subMetrics: [
      { label: '상담 예약', value: '자동 처리' },
      { label: '후속 관리', value: '자동 발송' },
    ],
    painPoint: '전화·카카오톡 문의 채널 관리와 계약 단계별 안내에 시간 소모',
    solutions: [
      '문의 채널 연동 상담 예약·변경 자동 처리',
      '계약 단계별 안내·알림 및 후속 메시지 자동 발송',
    ],
  },
  {
    id: 'pilates',
    icon: '🧘',
    title: 'S 필라테스',
    subtitle: '회원 관리 시스템 개선',
    highlight: {
      number: '2',
      unit: '배',
      suffix: ' 매출 상승',
    },
    subMetrics: [
      { label: '연장률', value: '대폭 개선' },
      { label: '관리', value: '카카오톡 기반' },
    ],
    painPoint: '기존 회원관리 시스템의 복잡한 인터페이스, 잔여 기간 모니터링 부재',
    solutions: [
      '카카오톡 기반 회원관리 시스템으로 수강 연장률 개선',
    ],
  },
  {
    id: 'academy',
    icon: '📚',
    title: 'J 종합학원',
    subtitle: '강사 2명 / 수강생 80명',
    highlight: {
      number: '67',
      unit: '%',
      suffix: ' 재등록률 상승',
    },
    subMetrics: [
      { label: '운영시간', value: '10시~24시' },
      { label: '과목', value: '대입·토익·검정고시' },
    ],
    painPoint: '아침 10시~밤 12시 쉴틈 없는 수업으로 상담 누락 발생',
    solutions: [
      '상담 및 학생 진단 프로세스 AI 자동화',
    ],
  },
];

export default function Scenarios() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const current = scenarios[selectedIndex];

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">&ldquo;우리 업종도 가능할까요?&rdquo;</h2>
        <p className="text-center text-[var(--text-sub)] mb-10 max-w-2xl mx-auto">
          네, 이미 이렇게 바뀌고 있어요
        </p>

        <div className="max-w-2xl mx-auto">
          {/* Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
              aria-label="이전"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="flex items-center gap-3">
              <span className="text-3xl">{current.icon}</span>
              <div className="text-center">
                <h3 className="text-lg md:text-xl font-bold">{current.title}</h3>
                <p className="text-xs md:text-sm text-[var(--text-sub)]">{current.subtitle}</p>
              </div>
            </div>

            <button
              onClick={scrollNext}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
              aria-label="다음"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mb-6">
            {scenarios.map((_, idx) => (
              <button
                key={idx}
                onClick={() => emblaApi?.scrollTo(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === selectedIndex
                    ? 'w-6 bg-[var(--primary)]'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`시나리오 ${idx + 1}`}
              />
            ))}
          </div>

          {/* Hidden carousel for swipe */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {scenarios.map((s) => (
                <div key={s.id} className="flex-[0_0_100%] min-w-0">
                  <div className="h-1" />
                </div>
              ))}
            </div>
          </div>

          {/* Main Card */}
          <div className="card overflow-hidden">
            {/* Big Number */}
            <div className="bg-gradient-to-r from-[var(--primary)] to-[#FF9A76] text-white p-6 -mx-6 -mt-6 mb-6 text-center">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl md:text-6xl font-bold">{current.highlight.number}</span>
                <span className="text-2xl md:text-3xl font-bold">{current.highlight.unit}</span>
                <span className="text-lg md:text-xl opacity-90">{current.highlight.suffix}</span>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                {current.subMetrics.map((metric, idx) => (
                  <div key={idx} className="text-center">
                    <p className="text-xs opacity-80">{metric.label}</p>
                    <p className="font-semibold">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pain Point */}
            <div className="mb-6">
              <p className="text-sm text-[var(--text-sub)] mb-1">😩 도입 전 고민</p>
              <p className="text-[var(--text-main)]">{current.painPoint}</p>
            </div>

            {/* Solution */}
            <div>
              <p className="text-sm text-[var(--text-sub)] mb-3">✨ AI 자동화 솔루션</p>
              <div className="space-y-2">
                {current.solutions.map((solution, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-[#FFF8F5] rounded-xl">
                    <span className="text-[var(--primary)] mt-0.5">•</span>
                    <p className="text-sm text-[var(--text-main)]">{solution}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
