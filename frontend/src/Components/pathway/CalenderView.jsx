import React from 'react';
import '../../App.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer

const events = [
  {
    title: 'React',
    start: new Date('2025-01-26T13:00:00'),
    end: new Date('2025-01-26T14:00:00')
  },
  {
    title: 'DSA',
    start: new Date('2025-01-28T13:00:00'),
    end: new Date('2025-01-28T15:00:00')
  }
];

const CalenderView = (props) => (
  <div className="calendar-container">
    <Calendar
      localizer={localizer}
      startAccessor="start"
      endAccessor="end"
      defaultView="month"
      style={{ height: '50rem', width: '100%' }}
      events={events}
    />
  </div>
);

export default CalenderView;
