import type { Scenario } from '@/types';

export const scenarios: Scenario[] = [
  {
    id: 'customs',
    icon: '⚖️',
    title: 'P 관세사무소',
    subtitle: '한달 평균 30~40건 처리',
    aiTeam: ['ara'],
    highlight: {
      number: '40',
      unit: '시간',
      suffix: '/월 절감',
    },
    painPoint: '한 건당 평균 20장 영수증 처리, 평균 1시간 소요',
    solutions: [
      '영수증 OCR 판독 및 AI 자동 문서 작성',
      '건당 처리시간 1시간 → 10분',
    ],
  },
  {
    id: 'sensor',
    icon: '🏭',
    title: 'K 센서장비 제조사',
    subtitle: '전국 시공/설치/AS 운영',
    aiTeam: ['ara'],
    highlight: {
      number: '전사',
      unit: '',
      suffix: '업무 자동화',
    },
    painPoint: '전국에 흩어진 시공현황, 장비현황, 문서작업을 수동으로 관리',
    solutions: [
      '전국 시공현황 실시간 대시보드',
      '장비현황 자동 모니터링',
      '문서작업 및 보고서 자동 생성',
    ],
  },
  {
    id: 'obgyn',
    icon: '🏥',
    title: 'O 산부인과',
    subtitle: '환자 1명당 간호사 1명 배정',
    aiTeam: ['ara', 'sera'],
    highlight: {
      number: '43.5',
      unit: '시간',
      suffix: '/월 절감',
    },
    painPoint: '환자 1명당 평균 10~15분 소요되는 예진·문진 과정',
    solutions: [
      '예진·문진·상담과정 자동화',
      '환자 응대 챗봇 연동',
    ],
  },
  {
    id: 'stenography',
    icon: '📝',
    title: 'S 속기사사무소',
    subtitle: '한달 평균 200건+ 계약 상담',
    aiTeam: ['sera', 'rio'],
    highlight: {
      number: '54',
      unit: '시간',
      suffix: '/월 절감',
    },
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
    aiTeam: ['ara', 'sera'],
    highlight: {
      number: '2',
      unit: '배',
      suffix: ' 매출 상승',
    },
    painPoint: '기존 회원관리 시스템의 복잡한 인터페이스, 잔여 기간 모니터링 부재',
    solutions: [
      '카카오톡 기반 회원관리 시스템',
      '수강 만료 전 자동 알림으로 연장률 개선',
    ],
  },
  {
    id: 'academy',
    icon: '📚',
    title: 'J 종합학원',
    subtitle: '강사 2명 / 수강생 80명',
    aiTeam: ['ara', 'sera', 'rio'],
    highlight: {
      number: '67',
      unit: '%',
      suffix: ' 재등록률 상승',
    },
    painPoint: '아침 10시~밤 12시 쉴틈 없는 수업으로 상담 누락 발생',
    solutions: [
      '상담 및 학생 진단 프로세스 AI 자동화',
      '24시간 문의 응대 챗봇',
    ],
  },
];
