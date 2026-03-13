import type { Metadata } from 'next';
import ContactsClient from './ContactsClient';

export const metadata: Metadata = {
  title: '60분 무료 컨설팅 예약',
  description: 'AI 팀원 채용에 관심이 있으신가요? 편한 시간에 60분 무료 진단 컨설팅을 예약하세요. 어디에 AI 팀원을 붙이면 좋을지 함께 찾아드립니다. 구매 의무 없습니다.',
  alternates: {
    canonical: 'https://snapplug.app/contacts',
  },
  openGraph: {
    title: '60분 무료 컨설팅 예약 | 스냅플러그',
    description: 'AI 팀원 채용에 관심이 있으신가요? 60분 무료 진단 컨설팅을 예약하세요. 구매 의무 없습니다.',
    url: 'https://snapplug.app/contacts',
  },
};

export default function ContactPage() {
  return <ContactsClient />;
}
