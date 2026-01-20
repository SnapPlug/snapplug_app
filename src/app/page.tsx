import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Problem from '@/components/Problem';
import Scenarios from '@/components/Scenarios';
import ROICalculator from '@/components/ROICalculator';
import Process from '@/components/Process';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

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
