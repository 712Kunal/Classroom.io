import React from 'react';
import { motion } from 'framer-motion';
import { TimeLineland } from '../ui/TimeLineland.jsx';

const timelineData = [
  {
    title: 'Pathway Builder Pro',
    content: (
      <div className="prose prose-sm dark:prose-invert rounded-2xl p-4 shadow-xl shadow-pink-300"> 
        <h3 className="text-xl font-bold mb-4">Your Personalized Learning Architect</h3>
        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
          Empower your learning journey with Pathway Builder Pro, an AI-driven tool designed to
          craft personalized educational paths tailored to your goals and pace.
        </p>
        <div className="w-[90%]">
          <img src="src/assets/pathway.png" alt="fksk" className="w-full h-full rounded-xl" />
        </div>
      </div>
    )
  },
  {
    title: 'Gamify Toolkit',
    content: (
      <div className="prose prose-sm dark:prose-invert rounded-2xl p-4 shadow-xl shadow-blue-300">
        <h3 className="text-xl font-bold mb-4">Expanded core functionality</h3>
        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
          Engage with gamified challenges, rewards, and progress tracking.
        </p>
        <div className="w-[90%]">
          <img src="src/assets/gamify.png" alt="fksk" className="w-full h-full rounded-xl" />
        </div>
      </div>
    )
  },
  {
    title: 'Task Scheduler AI',
    content: (
      <div className="prose prose-sm dark:prose-invert rounded-2xl p-4 shadow-xl shadow-red-500">
        <h3 className="text-xl font-bold mb-4">Introduced premium features</h3>
        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
          Smart task management with AI-suggested prioritization and reminders.
        </p>
        <div className="w-[90%]">
          <img src="src/assets/calender.png" alt="fksk" className="w-full h-full rounded-xl" />
        </div>
      </div>
    )
  },
  {
    title: 'Smart Notifications',
    content: (
      <div className="prose prose-sm dark:prose-invert rounded-2xl p-4 shadow-xl shadow-green-500">
        <h3 className="text-xl font-bold mb-4">Introduced premium features</h3>
        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
          Stay on track with timely reminders and motivational nudges
        </p>
        <div className="w-[90%]">
          <img src="src/assets/notification.png" alt="fksk" className="w-full h-full rounded-xl" />
        </div>
      </div>
    )
  }
];

function Features() {
  return (
    <div className="w-full flex flex-col items-center">
      <header className="flex flex-col items-center justify-center gap-2">
        <motion.h1 className="text-5xl font-sans">
          Efficient and Innovative Features of{' '}
          <span className="text-transparent font-medium bg-clip-text bg-gradient-to-r from-pink-400 to-blue-500">
            Pathify
          </span>
        </motion.h1>
        <motion.p className="text-lg text-slate-300">
          Explore the power of AI-driven learning paths and unlock your full potential.
        </motion.p>
      </header>
      <TimeLineland data={timelineData} />
    </div>
  );
}

export default Features;
