import Hero from '../Components/LandingComponents/Hero.jsx';
import LandingNavbar from '@/components/core/LandingNavbar.jsx';
import { Lamp } from '@/Components/LandingComponents/Lamp.jsx';
import Features from '../Components/LandingComponents/Features.jsx';
import Colorfultext from '../Components/LandingComponents/Colorfultext.jsx';

function LandingPage() {
  return (
    <div className="border w-full h-full dark:bg-[#030014] overflow-y-scroll overflow-x-hidden">
      <main className="flex flex-col h-[700px] gap-20">
        <LandingNavbar />
        <Hero />
      </main>
      <Lamp />
      <Features />
      <Colorfultext />
    </div>
  );
}

export default LandingPage;
