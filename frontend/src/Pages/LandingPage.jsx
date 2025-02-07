import Hero from '../Components/LandingComponents/Hero.jsx';
import LandingNavbar from '@/components/core/LandingNavbar.jsx';
import { Lamp } from '@/Components/LandingComponents/Lamp.jsx';
import Spline from '@splinetool/react-spline';

function LandingPage() {
  return (
    <div className="border w-full h-full dark:bg-[#030014] overflow-y-scroll overflow-x-hidden">
      <main className="flex flex-col h-[850px] gap-20">
        <LandingNavbar />
        <Hero />
      </main>
      <Lamp />
    </div>
  );
}

export default LandingPage;
