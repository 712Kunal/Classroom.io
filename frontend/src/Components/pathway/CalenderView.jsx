import { React, useState } from 'react';
import { SchedulerProvider, SchedularView } from 'mina-scheduler';
('use client');

function CalenderPage() {
  // Create today's date for first event
  const today = new Date();

  const events = [
    {
      id: '1d4c5c73-b5fa-4f67-bb6e-1d5d66cbd57d',
      title: 'web dev',
      description: 'Initial project kickoff with stakeholders.',
      startDate: today,
      endDate: new Date(today.getTime() + 2 * 60 * 60 * 1000), // 2 hour later
      variant: 'primary',
      allDay: false
    },
    {
      id: '2e5d6d84-c6fb-5g78-cc7f-2e6e77dce68e',
      title: 'DSA',
      description: 'Initial project kickoff with stakeholders - Two Day Event',
      startDate: new Date('2025-01-23T12:00:00'), // January 23, 2025, 12:00 PM
      endDate: new Date('2025-01-25T15:00:00'), // January 25, 2025, 3:00 PM
      variant: 'primary',
      allDay: true,
    }
  ];

  return (
    <div className="w-full h-full">
      <section className="flex w-full flex-col items-center justify-center gap-4 py-8 md:py-10">
        <SchedulerProvider initialState={events} weekStartsOn="monday" defaultDate={today}>
          <SchedularView
            classNames={{
              buttons: {
                addEvent: '!bg-red-500',
                next: '!bg-blue-500',
                prev: '!bg-green-500'
              }
            }}
            views={{
              views: ['month', 'day', 'week'],
              mobileViews: ['day']
            }}
            defaultView="week"
          />
        </SchedulerProvider>
      </section>
    </div>
  );
}

export default CalenderPage;
