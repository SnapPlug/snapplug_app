import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Problem from '@/components/Problem';

// Lazy load components that are not in the initial viewport
const Scenarios = dynamic(() => import('@/components/Scenarios'), {
  loading: () => <div className="section animate-pulse bg-gray-100" />,
});

const ROICalculator = dynamic(() => import('@/components/ROICalculator'), {
  loading: () => <div className="section animate-pulse bg-white" />,
});

const Process = dynamic(() => import('@/components/Process'), {
  loading: () => <div className="section animate-pulse bg-gray-100" />,
});

const FAQ = dynamic(() => import('@/components/FAQ'), {
  loading: () => <div className="section animate-pulse bg-white" />,
});

const FinalCTA = dynamic(() => import('@/components/FinalCTA'), {
  loading: () => <div className="section animate-pulse bg-gray-100" />,
});

const Footer = dynamic(() => import('@/components/Footer'));

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Problem />
      <Scenarios />
      <ROICalculator />
      <Process />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
