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
  video?: {
    src: string;
    srcMobile: string;
    poster: string;
  };
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

// Blog Types
export type BlogCategory = 'ai-automation' | 'case-study' | 'how-to' | 'industry-trends';

export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  updatedAt?: string;
  category: BlogCategory;
  tags?: string[];
  author: string;
  published: boolean;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
  readingTime: number;
}

export const BLOG_CATEGORIES: Record<BlogCategory, { label: string; description: string }> = {
  'ai-automation': {
    label: 'AI 자동화 인사이트',
    description: 'AI 자동화 트렌드와 실무 인사이트',
  },
  'case-study': {
    label: '고객 사례',
    description: '스냅플러그 AI 팀원 도입 스토리',
  },
  'how-to': {
    label: '실전 가이드',
    description: '단계별 AI 자동화 구축 가이드',
  },
  'industry-trends': {
    label: '업계 트렌드',
    description: 'AI 업계 최신 동향과 분석',
  },
};
