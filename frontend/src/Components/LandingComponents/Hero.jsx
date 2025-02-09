import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Play } from 'lucide-react';
import { slideinfromleft, slideinfromright, slideinfromtop } from '../../lib/motion.js';
import { useNavigate } from 'react-router-dom';
import Spline from '@splinetool/react-spline';

function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col h-full w-full">
      <video
        autoPlay
        loop
        muted
        className="rotate-180 absolute top-[-264px] left-0 w-full h-full object-cover">
        <source src="/assets/blackhole.webm" type="video/webm" />
      </video>

      {/* hero content */}
      <motion.div
        initial="hidden"
        animate="visible"
        className="flex flex-row justify-center items-center w-full px-20 mt-60 z-20">
        {/* left portion */}
        <div className="w-full h-full flex flex-col gap-4 justify-center m-auto text-start">
          <motion.div
            variants={slideinfromtop}
            className="Welcome-box flex gap-2 items-center rounded-xl py-1 px-[7px] bg-purple-950 opacity-[0.9] max-w-[150px]">
            <Brain className="text-[#bba8f2] text-[20px]" />
            <h1 className="text-[13px]">Learn with AI</h1>
          </motion.div>

          <motion.div
            variants={slideinfromleft(0.5)}
            className="flex flex-col mt-6 text-6xl font-bold max-w-[600px] w-auto h-auto">
            <span>
              Learn
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-500">
                {' '}
                Better with <br />
              </span>
              Pathify
            </span>
          </motion.div>

          <motion.p
            variants={slideinfromleft(0.8)}
            className="text-lg text-slate-300 my-5 max-w-[600px] w-auto h-auto">
            From AI-powered assistance to real-time analytics, automated workflows, and intuitive
            designs
          </motion.p>

          <motion.a
            variants={slideinfromleft(1)}
            onClick={() => navigate('/signup')}
            className="flex items-center justify-center border border-[#5252eb] py-2 button-primary text-white cursor-pointer bg-gradient-to-br from-purple-800 to-black/50 rounded-xl max-w-[150px] w-auto h-auto">
            Get Started
            <Play />
          </motion.a>
        </div>

        <motion.div
          variants={slideinfromright(0.8)}
          className="w-full h-full flex justify-center items-center ">
          <img src="assets/brahma-fusion-peris-ai.gif" className="scale-150" />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Hero;
