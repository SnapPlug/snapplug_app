import type { TeamMember, HeroTeamMember, Challenge, AITeamKey, AITeamInfo } from '@/types';

// Hero Section - Simplified Team Members
export const heroTeamMembers: HeroTeamMember[] = [
  { name: 'Ara', role: '자동화 전문가', desc: '업무 자동화는 제가 할게요!', image: '/AI_ara.webp', delay: 0 },
  { name: 'Rio', role: '영업 책임자', desc: '리드 관리 맡겨주세요!', image: '/AI_rio.webp', delay: 0.5 },
  { name: 'Luna', role: '마케팅 책임자', desc: '콘텐츠 발행 도와드릴게요!', image: '/AI_luna.webp', delay: 1 },
  { name: 'Sera', role: '고객응대 책임자', desc: '고객 문의 제가 받을게요!', image: '/AI_sera.webp', delay: 1.5 },
  { name: 'Alex', role: '정보관리 책임자', desc: '자료·정보 정리 맡겨주세요!', image: '/AI_alex.webp', delay: 2 },
  { name: 'Theo', role: '개발 책임자', desc: '개발은 제가 맡을게요!', image: '/AI_theo.webp', delay: 2.5 },
];

// Full Team Members Data (for modals)
export const teamMembers: TeamMember[] = [
  {
    id: 'luna',
    name: 'Luna',
    role: 'AI 마케팅 책임자',
    roleEn: 'HEAD OF MARKETING',
    image: '/AI_luna.webp',
    tagline: '"콘텐츠 하나로 세상을 뒤집어 놓겠습니다"',
    problems: [
      '마케팅 채널은 많은데 콘텐츠 만들 시간이 부족함',
      '전문 마케터 고용하기엔 비용 부담',
    ],
    solution: {
      description: '아이디어 하나만 전달하면, Luna가 모든 채널용 콘텐츠를 자동 생성',
      features: [
        '콘텐츠 생성 (X, 링크드인, 인스타, 페이스북, 유튜브)',
        '광고 성과 관리',
      ],
    },
    metrics: [
      { label: '콘텐츠 제작', before: '주 10시간+', after: '주 1시간' },
      { label: '활용 채널', before: '1~2개', after: '5개+' },
      { label: '월절감액', before: '-', after: '~200만원 (마케터 인건비 대비)' },
    ],
    licenses: [
      { name: '콘텐츠 마케팅 전문가', date: '2026.01' },
      { name: '멀티채널 운영 자격', date: '2026.01' },
      { name: '광고 성과 분석사', date: '2026.01' },
    ],
    skills: [
      { name: '블로그/SNS 콘텐츠 작성', level: 5 },
      { name: '광고 카피라이팅', level: 4 },
      { name: '채널별 콘텐츠 최적화', level: 5 },
      { name: '콘텐츠 캘린더 관리', level: 4 },
      { name: '해시태그/키워드 분석', level: 4 },
    ],
    introduction: '대표님의 서비스와 제품을 더 많은 고객에게 알려드립니다',
    experiences: [
      {
        period: '',
        company: '신제품/서비스 런칭 마케팅',
        industry: 'saas',
        description: '제품 소개 콘텐츠를 X, 인스타, 링크드인, 블로그 등 5개+ 채널에 맞게 자동 생성',
        result: '런칭 초기 인지도 확보',
      },
      {
        period: '',
        company: 'SNS 채널 운영 자동화',
        industry: 'coach',
        description: '아이디어 하나만 주시면 각 채널 톤에 맞는 콘텐츠로 동시 생성',
        result: '콘텐츠 생산 시간 90% 절감',
      },
      {
        period: '',
        company: '광고 소재 대량 생산',
        industry: 'ecommerce',
        description: '상품별 광고 카피와 이미지 문구를 다양한 버전으로 자동 생성',
        result: 'A/B 테스트용 소재 무한 생산',
      },
    ],
  },
  {
    id: 'sera',
    name: 'Sera',
    role: 'AI 고객응대 책임자',
    roleEn: 'HEAD OF CUSTOMER SUCCESS',
    image: '/AI_sera.webp',
    tagline: '"잠들지 않습니다. 고객님이 필요할 때 항상 여기 있어요"',
    problems: [
      '밤/주말에 문의 오면 다음 날 답하는데, 그때 이미 고객이 이탈함',
      '똑같은 질문에 매번 같은 답변 반복',
      'CS 담당자 뽑기엔 아직 애매함',
    ],
    solution: {
      description: '고객 문의 (채널톡/카카오/웹) → Sera 자동 응대 (24시간)',
      features: [
        '자주 묻는 질문 → 즉시 답변',
        '복잡한 문의 → 담당자 연결',
        '문의 유형별 자동 분류',
        '급한 건만 알림',
      ],
    },
    metrics: [
      { label: '응대시간', before: '평균 4시간', after: '평균 5분' },
      { label: '응대율', before: '70%', after: '100%' },
      { label: '월절감액', before: '-', after: '~150만원 (CS인건비 대비)' },
    ],
    licenses: [
      { name: '24시간 무휴 응대 전문가', date: '2026.01' },
      { name: '자연어 대화 처리 자격', date: '2026.01' },
      { name: '고객 경험 관리사', date: '2026.01' },
    ],
    skills: [
      { name: '자연스러운 대화 응대', level: 5 },
      { name: '채널톡/카카오톡 연동', level: 5 },
      { name: '문의 유형 자동 분류', level: 5 },
      { name: '복잡한 문의 담당자 연결', level: 4 },
      { name: '고객 감정 파악', level: 4 },
    ],
    introduction: '대표님이 주무시는 동안에도 고객 문의에 자연스럽게 응대합니다',
    experiences: [
      {
        period: '',
        company: '24시간 고객 문의 자동 응대',
        industry: 'ecommerce',
        description: '밤/주말에도 고객 문의에 즉시 응답하여 이탈 방지, 복잡한 건만 담당자에게 연결',
        result: '응대율 100%, 고객 만족도 향상',
      },
      {
        period: '',
        company: '반복 문의 자동 처리',
        industry: 'education',
        description: '"배송 언제 되나요?", "환불 어떻게 하나요?" 등 자주 묻는 질문 즉시 답변',
        result: 'CS 업무 80% 자동화',
      },
      {
        period: '',
        company: '고객 경험 개선',
        industry: 'subscription',
        description: '빠른 응대로 고객 대기 시간 최소화, 친절하고 일관된 톤 유지',
        result: '고객 이탈률 25% 감소',
      },
    ],
  },
  {
    id: 'rio',
    name: 'Rio',
    role: 'AI 영업 책임자',
    roleEn: 'HEAD OF SALES',
    image: '/AI_rio.webp',
    tagline: '"지구 끝까지 찾아가서 결제받아오겠습니다 (IP 추적으로)"',
    problems: [
      '리드는 들어오는데 정리가 안 됨',
      '누가 진짜 고객인지 파악이 어려움',
      '팔로업 타이밍 놓쳐서 기회 손실',
    ],
    solution: {
      description: '리드 유입 (문의, 웨비나, 광고) → Rio BANT 자동 검증',
      features: [
        'Hot 리드 → 즉시 미팅 제안',
        'Warm 리드 → 자동 너처링',
        'Cold 리드 → 장기 관리',
      ],
    },
    metrics: [
      { label: '리드정리 시간', before: '주 3시간', after: '자동화' },
      { label: '전환율', before: '5%', after: '10%+' },
      { label: '기회손실', before: '많음', after: '최소화' },
    ],
    licenses: [
      { name: 'BANT 분석 전문가', date: '2026.01' },
      { name: '리드 스코어링 자격', date: '2026.01' },
      { name: '세일즈 자동화 관리사', date: '2026.01' },
    ],
    skills: [
      { name: 'BANT 기반 리드 검증', level: 5 },
      { name: '고객 온도 분류 (Hot/Warm/Cold)', level: 5 },
      { name: '고객별 맞춤 응대', level: 5 },
      { name: 'CRM 자동 정리', level: 4 },
      { name: '팔로업 타이밍 최적화', level: 4 },
    ],
    introduction: '진짜 고객과 아닌 고객을 BANT로 걸러내고, 우선순위에 맞게 응대합니다',
    experiences: [
      {
        period: '',
        company: 'BANT 기반 리드 검증',
        industry: 'saas',
        description: '예산(Budget), 결정권(Authority), 필요(Need), 시기(Timeline)를 자동 파악하여 진짜 고객 선별',
        result: '영업 효율 3배 향상',
      },
      {
        period: '',
        company: '고객 온도별 우선순위 관리',
        industry: 'startup',
        description: 'Hot 리드는 즉시 미팅 제안, Warm은 너처링, Cold는 장기 관리로 자동 분류',
        result: '기회 손실 최소화',
      },
      {
        period: '',
        company: '고객별 맞춤형 팔로업',
        industry: 'agency',
        description: '고객 상황에 맞는 메시지로 개인화된 팔로업 자동 발송',
        result: '전환율 2배 증가',
      },
    ],
  },
  {
    id: 'ara',
    name: 'Ara',
    role: 'AI 자동화 전문가',
    roleEn: 'AUTOMATION EXPERT',
    image: '/AI_ara.webp',
    tagline: '"반복 업무, 제가 자동화해드릴게요"',
    problems: [
      '미팅 잡느라 이메일 왔다갔다 시간 낭비',
      '일정 겹쳐서 실수하는 경우 발생',
      '반복 업무(보고서, 정리)에 시간 뺏김',
    ],
    solution: {
      description: '일정 및 반복 업무 자동화',
      features: [
        '미팅 일정 자동 조율',
        '캘린더 충돌 체크 & 알림',
        '정기 보고서 자동 생성',
        '이메일 초안 작성',
      ],
    },
    metrics: [
      { label: '일정조율', before: '건당 30분', after: '자동화' },
      { label: '실수율', before: '가끔', after: '0%' },
      { label: '주간절감', before: '-', after: '~5시간' },
    ],
    licenses: [
      { name: '업무 프로세스 자동화 전문가', date: '2026.01' },
      { name: '워크플로우 설계 자격', date: '2026.01' },
      { name: '데이터 연동 관리사', date: '2026.01' },
    ],
    skills: [
      { name: '문서/서류 작성 자동화', level: 5 },
      { name: '반복 데이터 처리', level: 5 },
      { name: '보고서 자동 생성', level: 5 },
      { name: '일정 조율 및 관리', level: 4 },
      { name: '툴 간 데이터 연동', level: 4 },
    ],
    introduction: '매일 반복되는 불필요한 업무를 자동화하여 진짜 중요한 일에 집중하게 해드립니다',
    experiences: [
      {
        period: '',
        company: '문서/서류 작업 자동화',
        industry: 'agency',
        description: '데이터 입력 → 서류 작성 → 보고서 생성까지 수작업 없이 원스톱 처리',
        result: '건당 1시간 → 5분',
      },
      {
        period: '',
        company: '반복 데이터 처리 자동화',
        industry: 'ecommerce',
        description: '여러 시스템에 흩어진 데이터를 자동 수집, 정리, 입력하여 처리',
        result: '입력 오류 0%, 시간 90% 절감',
      },
      {
        period: '',
        company: '일정 조율 및 보고서 자동화',
        industry: 'startup',
        description: '미팅 일정 자동 조율, 정기 보고서 자동 생성 및 관계자 발송',
        result: '반복 업무 완전 자동화',
      },
    ],
  },
];

// Challenge Cards Data
export const challenges: Challenge[] = [
  {
    id: 'content',
    title: '마케팅 콘텐츠',
    avatar: '/AI_luna.webp',
    aiName: 'Luna',
    beforeValue: 100,
    afterValue: 10,
    beforeLabel: '주 10시간+',
    afterLabel: '주 1시간',
    problemDesc: '채널별로 각각 콘텐츠 만들기 힘들어요',
    solutionDesc: '아이디어 하나로 5개+ 채널 콘텐츠 생성',
    improvement: '90%',
    improvementLabel: '시간 절감',
  },
  {
    id: 'cs',
    title: '고객 응대',
    avatar: '/AI_sera.webp',
    aiName: 'Sera',
    beforeValue: 40,
    afterValue: 100,
    beforeLabel: '40% 응대',
    afterLabel: '100% 응대',
    problemDesc: '밤/주말엔 답변 불가, 고객 이탈',
    solutionDesc: '즉시 응대, 복잡한 건만 연결',
    improvement: '100%',
    improvementLabel: '응대율',
  },
  {
    id: 'lead',
    title: '리드 관리',
    avatar: '/AI_rio.webp',
    aiName: 'Rio',
    beforeValue: 50,
    afterValue: 100,
    beforeLabel: '15% 전환',
    afterLabel: '30% 전환',
    problemDesc: '누락 잦고, 팔로업 타이밍 놓침',
    solutionDesc: 'Hot/Warm/Cold 자동 분류 & 알림',
    improvement: '2배',
    improvementLabel: '전환율',
  },
  {
    id: 'admin',
    title: '반복 업무',
    avatar: '/AI_ara.webp',
    aiName: 'Ara',
    beforeValue: 100,
    afterValue: 20,
    beforeLabel: '하루 2시간+',
    afterLabel: '하루 24분',
    problemDesc: '일정 조율, 보고서, 이메일...',
    solutionDesc: '일정/보고서/이메일 자동 처리',
    improvement: '80%',
    improvementLabel: '업무 감소',
  },
];

// AI Team Info (for Scenarios)
export const aiTeamInfo: Record<AITeamKey, AITeamInfo> = {
  luna: { name: 'Luna', image: '/AI_luna.webp', color: '#EC4899' },
  sera: { name: 'Sera', image: '/AI_sera.webp', color: '#06B6D4' },
  rio: { name: 'Rio', image: '/AI_rio.webp', color: '#F59E0B' },
  ara: { name: 'Ara', image: '/AI_ara.webp', color: '#8B5CF6' },
};

// Helper function to get team member by name
export const getTeamMemberByName = (name: string): TeamMember | undefined => {
  return teamMembers.find((m) => m.name === name);
};
