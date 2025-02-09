import Hero from '../components/LandingComponents/Hero.jsx';
import LandingNavbar from '@/components/core/LandingNavbar.jsx';
import { Lamp } from '@/components/LandingComponents/Lamp.jsx';
import Services from '../components/LandingComponents/Services.jsx';
import Colorfultext from '../components/LandingComponents/Colorfultext.jsx';
import Features from '../components/LandingComponents/Features.jsx';

function LandingPage() {
  return (
    <div className="border w-full h-full dark:bg-[#030014] overflow-y-scroll overflow-x-hidden">
      <main className="flex flex-col h-[700px] gap-20">
        <LandingNavbar />
        <Hero />
      </main>
      <Lamp />
      <Services />
      <Features />
      {/* <Colorfultext /> */}
    </div>
  );
}

export default LandingPage;
