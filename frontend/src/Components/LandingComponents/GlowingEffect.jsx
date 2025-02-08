'use client';
import { Route, MessageCircleMore, ChartColumn, CalendarCheck, Gamepad2 } from 'lucide-react';
import { GlowingEffect } from '@/components/ui/glowing-effect';

export function GlowingEffectDemo() {
  return (
    <ul className="w-full h-full grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={<Route className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Ai generated pathways"
        description="Create personalized learning paths tailored to your goals with the power of AI."
      />
      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        icon={<CalendarCheck className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Task Scheduling"
        description="Organize and prioritize your tasks efficiently to stay productive and on track."
      />
      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        icon={<MessageCircleMore className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Chat Assistant"
        description="Get instant support and answers with our intelligent, real-time chat assistant."
      />
      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        icon={<Gamepad2 className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Gamified Services"
        description="Make your journey engaging with challenges and rewards through gamified services."
      />
      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        icon={<ChartColumn className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Analytics and Insights"
        description="Unlock powerful insights to track progress and make data-driven decisions."
      />
    </ul>
  );
}

const GridItem = ({ area, icon, title, description }) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2.5xl border  p-2  md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6  dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2 ">{icon}</div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-black dark:text-white">
                {title}
              </h3>
              <h2
                className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm/[1.125rem] 
              md:text-base/[1.375rem]  text-black dark:text-neutral-400">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
