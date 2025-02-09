import React from 'react';
import { motion } from 'framer-motion';
import { GlowingEffectDemo } from './GlowingEffect';

function Services() {
  return (
    <div className="w-full flex flex-col items-center">
      <header className="flex flex-col items-center justify-center gap-2">
        <motion.h1 className="text-5xl font-sans">
          Services we offer to{' '}
          <span className="text-transparent font-medium bg-clip-text bg-gradient-to-r from-pink-400 to-blue-500">
            you
          </span>
        </motion.h1>
        <motion.p className="text-lg text-slate-300">
          Explore the power of AI-driven learning paths and unlock your full potential.
        </motion.p>
      </header>
      <main className="glowing-effect mt-10 p-5">
        <GlowingEffectDemo />
      </main>
    </div>
  );
}

export default Services;
