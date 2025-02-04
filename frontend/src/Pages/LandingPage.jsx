import LandingNavbar from '@/components/core/LandingNavbar.jsx';

function LandingPage() {
  return (
    <div className="border w-full h-full">
      <LandingNavbar />
      <main className="w-full h-auto">
        <div className="hero-section relative h-[calc(100dvh-85px)] overflow-hidden">
          {/* Spline Background Container */}
          <div className="absolute inset-0 w-full h-full">
            {/* Example: <Spline scene="..." /> */}
          </div>

          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-purple-900/30" />

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
