import { React, useState } from 'react';

// import { SchedulerProvider, SchedularView } from 'mina-scheduler';
// import { Calendar, Views, ScheduleView } from 'mina-scheduler';

// @ts-ignore
import Calendar from 'mina-scheduler';
import ScheduleView from 'mina-scheduler';

import { Button } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AlarmIcon from '@mui/icons-material/Alarm';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import ViewDayIcon from '@mui/icons-material/ViewDay';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function CalenderPage() {
  console.log({ Calendar, ScheduleView });

  const events = [
    {
      id: 1,
      title: 'Sample Event',
      start: new Date(2025, 0, 21, 10, 0), // Year, Month (0-based), Day, Hour, Minute
      end: new Date(2025, 0, 21, 11, 0)
    }
  ];

  // Calendar configurations
  const config = {
    defaultView: 'month',
    views: ['month', 'week', 'day'],
    events: events,
    onEventClick: (event) => {
      console.log('Event clicked:', event);
    },
    onEventCreate: (event) => {
      console.log('New event:', event);
    },
    onEventUpdate: (event) => {
      console.log('Event updated:', event);
    },
    onEventDelete: (event) => {
      console.log('Event deleted:', event);
    }
  };

  return (
    <div className="w-full h-screen p-4 bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-4 h-full">
        <Calendar {...config}>
          <ScheduleView />
        </Calendar>
      </div>
    </div>
  );
}

export default CalenderPage;
