import React from "react"
import "../../App.css"
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment) // or globalizeLocalizer

const events = [
  {
    title: 'React',
    start: new Date(2025, 0, 24, 13, 0), // Jan 24, 2025, 10:00 AM
    end: new Date(2025, 0, 25, 14, 0), // Jan 24, 2025, 12:00 PM
  },
  {
    title: 'DSA',
    start: new Date(2025, 0, 26, 14, 0), // Jan 26, 2025, 2:00 PM
    end: new Date(2025, 0, 26, 16, 0), // Jan 26, 2025, 4:00 PM
  },
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
)

export default CalenderView