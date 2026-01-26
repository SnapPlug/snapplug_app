// AI Team Member Types
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  roleEn: string;
  image: string;
  tagline: string;
  problems: string[];
  solution: {
    description: string;
    channels?: string[];
    features?: string[];
  };
  metrics: { label: string; before: string; after: string }[];
  licenses: { name: string; date: string }[];
  skills: { name: string; level: number }[];
  introduction: string;
  experiences: {
    period: string;
    company: string;
    industry: IndustryType;
    description: string;
    result: string;
  }[];
}

export type IndustryType =
  | 'saas'
  | 'ecommerce'
  | 'agency'
  | 'coach'
  | 'logistics'
  | 'hr'
  | 'education'
  | 'subscription'
  | 'startup';

// Hero AI Team Member (simplified)
export interface HeroTeamMember {
  name: string;
  role: string;
  desc: string;
  image: string;
  delay: number;
}

// Challenge Card Types
export interface Challenge {
  id: string;
  title: string;
  avatar: string;
  aiName: string;
  beforeValue: number;
  afterValue: number;
  beforeLabel: string;
  afterLabel: string;
  problemDesc: string;
  solutionDesc: string;
  improvement: string;
  improvementLabel: string;
}

// Scenario Types
export interface Scenario {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  aiTeam: AITeamKey[];
  highlight: {
    number: string;
    unit: string;
    suffix: string;
  };
  painPoint: string;
  solutions: string[];
  // GEO: Customer testimonial for credibility
  quote?: string;
  quoteName?: string;
}

export type AITeamKey = 'luna' | 'sera' | 'rio' | 'ara';

export interface AITeamInfo {
  name: string;
  image: string;
  color: string;
}

// FAQ Types
export interface FAQ {
  question: string;
  answer: string;
}

// Process Types
export interface ProcessStep {
  number: string;
  title: string;
  duration: string;
  items: string[];
  isHighlighted?: boolean;
  subtext?: string;
}

// Navigation Types
export interface NavLink {
  href: string;
  label: string;
}

// Industry Metadata
export interface IndustryMeta {
  color: string;
  name: string;
}

export const industryColors: Record<IndustryType, string> = {
  saas: '#3B82F6',
  ecommerce: '#F59E0B',
  agency: '#8B5CF6',
  coach: '#EC4899',
  logistics: '#F97316',
  hr: '#06B6D4',
  education: '#10B981',
  subscription: '#6366F1',
  startup: '#EF4444',
};

export const industryNames: Record<IndustryType, string> = {
  saas: 'SaaS',
  ecommerce: '이커머스',
  agency: '에이전시',
  coach: '코칭/컨설팅',
  logistics: '물류',
  hr: 'HR',
  education: '교육',
  subscription: '구독서비스',
  startup: '스타트업',
};
