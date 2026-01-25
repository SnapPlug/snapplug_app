import type { ProcessStep } from '@/types';

export const processSteps: ProcessStep[] = [
  {
    number: '1',
    title: '맞춤 컨설팅',
    duration: '60분',
    subtext: '무료로 진행됩니다',
    items: [
      '현재 업무 프로세스 심층 분석',
      '자동화 가능 포인트 발견',
      '예상 ROI 및 도입 방향 제안',
    ],
  },
  {
    number: '2',
    title: '서비스 기획 & 설계',
    duration: '1~2주',
    isHighlighted: true,
    subtext: '성공의 80%가 여기서 결정됩니다',
    items: [
      '비즈니스 요구사항 정의',
      '최적의 AI 솔루션 아키텍처 설계',
      '연동 시스템 및 워크플로우 설계',
    ],
  },
  {
    number: '3',
    title: '개발 & 품질 검증',
    duration: '2~3주',
    subtext: '완벽하게 작동할 때까지',
    items: [
      'AI 솔루션 개발 및 학습',
      '내부 테스트 (기능/성능)',
      '외부 테스트 (실사용 환경)',
    ],
  },
  {
    number: '4',
    title: '런칭 & 안정화',
    duration: '',
    subtext: '안심하고 맡기세요',
    items: [
      'AI 팀원 정식 투입',
      '초기 2주 집중 모니터링',
      '지속적인 성능 개선',
    ],
  },
];
