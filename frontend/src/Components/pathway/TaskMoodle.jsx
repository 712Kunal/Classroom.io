import React from 'react';
import { SlCalender } from 'react-icons/sl';
import { FaCircle } from 'react-icons/fa6';
import { GrResources } from 'react-icons/gr';
import {
  BookOpenIcon,
  MonitorPlay,
  SquareMousePointer,
  Target,
  ChartNoAxesCombined
} from 'lucide-react';

import { Button } from '@/Components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/Components/ui/card';

import { Label } from '@/Components/ui/label';

const ResourceTypeToIconMap = {
  Documentation: <BookOpenIcon size={24} className="text-blue-500" />,
  Video: <MonitorPlay size={24} className="text-red-500" />,
  'Interactive Exercise': <SquareMousePointer size={24} className="text-green-500" />,
  'Video Tutorial': <MonitorPlay size={24} className="text-yellow-500" />
};

const ResourceTypeToColorMap = {
  Documentation: 'border-blue-500',
  Video: 'border-red-500',
  'Interactive Exercise': 'border-green-500',
  'Video Tutorial': 'border-yellow-500'
};

const ResourceTypeToBgColorMap = {
  Documentation: 'hover:bg-blue-100 dark:hover:bg-blue-900',
  Video: 'hover:bg-red-100 dark:hover:bg-red-900',
  'Interactive Exercise': 'hover:bg-green-100 dark:hover:bg-green-900',
  'Video Tutorial': 'hover:bg-yellow-100 dark:hover:bg-yellow-900'
};

function TaskMoodle({ event }) {
  console.log(event);

  return (
    <Card className="shadow-md rounded-lg shadow-blue-500 w-1/2">
      <CardHeader>
        <CardTitle className="font-sans">{event.title}</CardTitle>
        <CardDescription>{event.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label className="text-sm">Scheduled Date</Label>
            <span className="flex justify-between items-center text-xl border-[1px] border-[#333] px-2 rounded-md text-white/50">
              {event.start.toDateString()} <SlCalender />
            </span>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label className="text-sm">Completion Date</Label>
            <span className="flex justify-between items-center text-xl border-[1px] border-[#333] px-2 rounded-md text-white/50">
              {event.start.toDateString()} <SlCalender />
            </span>
          </div>

          <div className="Resources flex flex-col gap-2">
            <span className="flex gap-1 items-center text-xl">
              <GrResources /> Resources
            </span>
            <div className="Resource-info w-full border-[1px] border-[#333] rounded-md text-white/50 p-2">
              <div className="flex flex-wrap gap-2">
                {event.resources.map((resource, index) => (
                  <div
                    key={index}
                    className="flex gap-5 items-center px-2 rounded-md border-[1px] bg-black border-[#333]">
                    <a
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl">
                      {resource.title}
                    </a>
                    <a href={resource.link} target="_blank" rel="noopener noreferrer">
                      {resource.type === 'Documentation' && (
                        <BookOpenIcon size={24} className="text-blue-500" />
                      )}
                      {resource.type === 'Video' && (
                        <MonitorPlay size={24} className="text-red-500" />
                      )}
                      {resource.type === 'Interactive Exercise' && (
                        <SquareMousePointer size={24} className="text-green-500" />
                      )}
                      {resource.type === 'Video Tutorial' && (
                        <MonitorPlay size={24} className="text-yellow-500" />
                      )}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="outcome flex flex-col">
              <span className="flex gap-1 items-center text-xl">
                <Target size={24} /> Outcomes
              </span>
              <span className="text-lg text-white/50 px-3">{event.outcome}</span>
            </div>

            <div className="outcome flex flex-col">
              <span className="flex gap-1 items-center text-xl">
                <ChartNoAxesCombined size={24} /> Status:{'  '}
                <span>
                  {event.color === ('#3b82f6' || '#2454ff') && (
                    <span className="flex items-center gap-1">
                      <FaCircle className="text-[#3b82f6]" /> Upcoming
                    </span>
                  )}
                  {event.color === ('#22c55e' || '#38b000') && (
                    <span className="flex items-center gap-1">
                      <FaCircle className="text-[#22c55e]" /> Completed
                    </span>
                  )}
                  {event.color === ('#facc15' || '#fdc500') && (
                    <span className="flex items-center gap-1">
                      <FaCircle className="text-[#facc15]" /> Ongoing
                    </span>
                  )}
                  {event.color === ('#f97316' || '#ff6700') && (
                    <span className="flex items-center gap-1">
                      <FaCircle className="text-[#f97316]" /> Late
                    </span>
                  )}
                  {event.color === ('#ef4444' || '#ef233c') && (
                    <span className="flex items-center gap-1">
                      <FaCircle className="text-[#ef4444]" /> Overdue
                    </span>
                  )}
                </span>
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default TaskMoodle;
