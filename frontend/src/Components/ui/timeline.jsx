"use client";
import React, { useEffect, useRef, useState } from "react";
import { Badge } from "./badge.jsx";
import { Progress } from "./progress.jsx"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip.jsx"
import { Button } from "./button.jsx";

export const Timeline = ({
  data,
  title,
  desciption,
  duration,
  startDate,
  endDate,
  percentageComplete,
  isActivePathway,
}) => {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  if(!isActivePathway) {
    percentageComplete = 0;
  }
  const heightOfProgressTracer = `${isActivePathway ? parseInt(percentageComplete) : 0}%`;

  return (
    (<div className="w-full relative bg-white rounded-lg dark:bg-neutral-950 font-sans md:px-10" ref={containerRef}>
      <div className="flex p-6">
        <div className="left w-1/2 flex flex-col gap-4">
          <h2 className="text-lg md:text-4xl text-black dark:text-white max-w-4xl">
            {title}
          </h2>
          <p
            className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-lg">
            {desciption}
          </p>
          <div className="flex gap-2 items-center justify-start">
            <Badge variant="outline" className="p-2">
              Duration: {duration} days
            </Badge>
            <Badge variant="outline" className="p-2">
              {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
            </Badge>
          </div>
        </div>
        <div className="progress flex flex-col gap-8 w-1/2">
          {isActivePathway ? (
            <>
              <p className="text-xl">Your Progress Till Now: <span className="text-blue-500">{parseInt(percentageComplete) + "%"}</span></p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Progress value={parseInt(percentageComplete)} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-base">{"Your have completed " + parseInt(percentageComplete) + "% of this pathway."}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          ) : (
            <div className="StartBox ml-auto">
              <Button>Start Your Learning Journey now</Button>
            </div>
          )}
        </div>
      </div>
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:pt-40 md:gap-10">
            <div
              className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start lg:max-w-sm">
              <div
                className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div
                  className="h-4 w-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 border border-blue-700 p-2" />
              </div>
              <h3
                className="hidden xl:inline-block text-xl xl:pl-20 md:text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
                {item.title}
              </h3>
            </div>
            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3
                className="xl:hidden inline-block text-2xl mb-4 text-left font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] flex flex-col items-start justify-start bg-neutral-600">
          <div className="bg-gradient-to-b from-purple-500 to-blue-500 w-full" style={{ height: `${heightOfProgressTracer}` }}></div>
        </div>
      </div>
    </div>)
  );
};
``