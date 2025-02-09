import React from 'react';
import { ColourfulText } from '../ui/colorful-text.jsx';

function Colorfultext() {
  return (
    <div className="relative w-full h-full">
      {/* Dark background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black" />

      {/* Subtle grid overlay */}
      {/* <div className="absolute inset-0"
      style={{
        backgroundImage: `url('src/assets/background.png')`,
        backgroundSize: 'cover',
      }}
       /> */}

      {/* Content container */}
      <div className="relative w-full h-full flex justify-center items-center">
        <span className="text-6xl">Empower your journey with </span>{' '}
        <ColourfulText text={' PATHIFY'} />
      </div>
    </div>
  );
}

export default Colorfultext;
