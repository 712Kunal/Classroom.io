import React from 'react';
import { cn } from '@/lib/utils';
// import Image from 'next/image';
// import createGlobe from 'cobe';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
// import Link from 'next/link';

export function FeaturesSectionDemo() {
  const features = [
    {
      title: 'Pathway Builder Pro',
      description: 'AI-powered tool to create customized learning paths tailored to your goals',
      skeleton: <SkeletonOne />,
      className: 'col-span-1 lg:col-span-4 border-b lg:border-r dark:border-neutral-800'
    },
    {
      title: 'Pathway AI Assistant',
      description:
        'Get instant support and answers with our intelligent, real-time chat assistant.',
      skeleton: <SkeletonTwo />,
      className: 'border-b col-span-1 lg:col-span-2 dark:border-neutral-800'
    },
    {
      title: 'Task Scheduler AI',
      description: 'Smart task management with AI-suggested prioritization and reminders.',
      skeleton: <SkeletonThree />,
      className: 'col-span-1 lg:col-span-3 lg:border-r  dark:border-neutral-800'
    },
    {
      title: 'Smart Notifications',
      description: 'Stay on track with timely reminders and motivational nudges',
      skeleton: <SkeletonFour />,
      className: 'col-span-1 lg:col-span-3 border-b lg:border-none'
    }
  ];
  return (
    <div className="relative z-20 py-10 lg:py-40 max-w-7xl mx-auto">
      <div className="px-8">
        <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
          Packed with thousands of features
        </h4>

        <p className="text-sm lg:text-base  max-w-2xl  my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
          From Image generation to video generation, Everything AI has APIs for literally
          everything. It can even create this website copy for you.
        </p>
      </div>
      <div className="relative ">
        <div className="grid grid-cols-1 lg:grid-cols-6 mt-12 xl:border rounded-md dark:border-neutral-800">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className=" h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({ children, className }) => {
  return <div className={cn(`p-4 sm:p-8 relative overflow-hidden`, className)}>{children}</div>;
};

const FeatureTitle = ({ children }) => {
  return (
    <p className=" max-w-5xl mx-auto text-left tracking-tight text-black dark:text-white text-xl md:text-2xl md:leading-snug">
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }) => {
  return (
    <p
      className={cn(
        'text-sm md:text-base  max-w-4xl text-left mx-auto',
        'text-neutral-500 text-center font-normal dark:text-neutral-300',
        'text-left max-w-sm mx-0 md:text-sm my-2'
      )}>
      {children}
    </p>
  );
};

export const SkeletonOne = () => {
  return (
    <div className="relative flex py-8 px-2 gap-10 ">
      <div className="w-full  p-5  mx-auto bg-white dark:bg-neutral-900 shadow-2xl group">
        <div className="flex flex-1 w-full h-full flex-col space-y-2  ">
          {/* TODO */}
          <img
            src="/assets/pathway.png"
            alt="header"
            className="w-full object-contain rounded-sm shadow-2xl"
          />
        </div>
      </div>
      <div className="absolute bottom-0 z-40 inset-x-0 h-60 bg-gradient-to-t from-white dark:from-black via-white dark:via-black to-transparent w-full pointer-events-none" />
      <div className="absolute top-0 z-40 inset-x-0 h-60 bg-gradient-to-b from-white dark:from-black via-transparent to-transparent w-full pointer-events-none" />
    </div>
  );
};

export const SkeletonThree = () => {
  return (
    <a href="/" target="__blank" className="relative flex gap-10  h-full group/image">
      <div className="w-full  mx-auto bg-transparent dark:bg-transparent group h-full">
        <div className="flex flex-1 w-full h-full flex-col space-y-2  relative">
          {/* TODO */}
          <img
            src="/assets/calender.png"
            alt="header"
            className="h-full w-full aspect-square object-cover object-center rounded-sm blur-none group-hover/image:blur-sm transition-all duration-200"
          />
        </div>
      </div>
    </a>
  );
};

export const SkeletonTwo = () => {
  const imageVariants = {
    whileHover: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100
    },
    whileTap: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100
    }
  };
  return (
    <div className="relative h-full overflow-hidden">
      {/* TODO */}
      <div className="flex justify-center items-center">
        <img
          src="/assets/assistant.png"
          alt="assistant images"
          width="500"
          height="500"
          className="rounded-lg mt-5 object-contain flex-shrink-0"
        />
      </div>
      <div className="absolute left-0 z-[100] inset-y-0 w-20 bg-gradient-to-r from-white dark:from-black to-transparent  h-full pointer-events-none" />
      <div className="absolute right-0 z-[100] inset-y-0 w-20 bg-gradient-to-l from-white dark:from-black  to-transparent h-full pointer-events-none" />
    </div>
  );
};

export const SkeletonFour = () => {
  return (
    <div className="bg-transparent mt-10 grid place-items-center overflow-hidden">
      <img src="/assets/notify.png" alt="gif" className="object-cover scale-150" />
    </div>
  );
};
