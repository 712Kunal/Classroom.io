import { React, useState } from 'react';
import { SchedulerProvider, SchedularView } from 'mina-scheduler';


function CalenderPage() {
  return (
    <div className="w-full h-full">
      <section className="flex w-full flex-col items-center justify-center gap-4 py-8 md:py-10">
        <SchedulerProvider>
          <SchedularView defaultView="month" />
        </SchedulerProvider>
      </section>
    </div>
  );
}

export default CalenderPage;
