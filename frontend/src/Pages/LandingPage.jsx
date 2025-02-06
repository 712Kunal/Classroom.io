import LandingNavbar from '@/components/core/LandingNavbar.jsx';
import Spline from '@splinetool/react-spline';

function LandingPage() {
  return (
    <div className="border w-full h-full">
      <main className="w-full h-auto">
        <div className="hero-section relative h-screen overflow-hidden">
          <LandingNavbar />
          {/* Spline Background Container */}
          <div className="absolute inset-0 w-full h-full">
            <Spline
              className="w-full h-full"
              scene="https://prod.spline.design/0XkBsySMprkHqiga/scene.splinecode"
            />
          </div>

          {/* Overlay to ensure text readability */}
          {/* <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-black/50" /> */}

          {/* Content Container */}
          <div className="relative flex items-center h-full w-full">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl">
                <div className="animate flex flex-col gap-2">
                  <h1 className="text-5xl md:text-6xl font-bold text-white">
                    Transform Your Learning Journey with AI
                  </h1>
                  <p className="text-gray-300 text-lg md:text-xl max-w-xl">
                    Experience the future of education with our AI-enhanced learning platform.
                    Personalized paths, adaptive content, and intelligent insights.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
