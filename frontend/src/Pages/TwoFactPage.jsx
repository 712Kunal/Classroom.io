import React from 'react';
import Spline from '@splinetool/react-spline';
import TwoFactorAuth from '@/Components/Profile/TwoFactorAuth.jsx';

function TwoFactPage() {
  return (
    <div className="relative h-screen w-full bg-gray-800 overflow-hidden">
      {/* Spline Background */}
      <div className="absolute inset-0 z-0">
        <Spline
          scene="https://prod.spline.design/xPuydTijfScyJNOh/scene.splinecode"
          className="w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex justify-center items-center grow w-full h-full">
        <TwoFactorAuth />
      </div>
    </div>
  );
}

export default TwoFactPage;
