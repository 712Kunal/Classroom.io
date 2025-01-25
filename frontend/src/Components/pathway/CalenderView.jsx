import { React, useEffect, useState } from 'react';
import '../../App.css';
import dummy from '../../assets/data/dummy.json';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer

// const events = [
//   {
//     title: 'React',
//     start: new Date('2025-01-26T13:00:00'),
//     end: new Date('2025-01-26T14:00:00')
//   },
//   {
//     title: 'DSA',
//     start: new Date('2025-01-28T13:00:00'),
//     end: new Date('2025-01-28T15:00:00')
//   }
// ];

const CalenderView = (props) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const extract_tasks = (dummyData) => {
      const tasks = []; // empty array to store tasks
      const pathway = dummyData.response.pathway;

      // Iterate through the data
      for (let i = 0; i < pathway.length; i++) {
        if (pathway[i].tasks.length > 0) {
          const numberOfTasks = pathway[i].tasks.length;
          for (let j = 0; j < numberOfTasks; j++) {
            const singleTask = pathway[i].tasks[j];
            tasks.push(singleTask);
          }
        }
      }

      return tasks;
    };

    const AllTasks = extract_tasks(dummy);
    console.log(AllTasks);
    setTasks(AllTasks);
  }, []);

  const events = tasks.map((task) => {
    const start = new Date(task.scheduledDate);
    const currentDate = new Date();

    let color = '#2454ff'; // Default blue for upcoming tasks

    if (task.isDone) {
      color = task.lateMark
        ? '#ff5400' // Orange for late marked tasks
        : '#38b000'; // Green for on-time done tasks
    } else if (start.toDateString() === currentDate.toDateString()) {
      color = '#ffc300'; // Yellow for current tasks
    } else if (start.toDateString() < currentDate.toDateString()) {
      color = '#ef233c'; // Red for overdue tasks
    }

    return {
      title: task.taskTitle,
      start: start,
      end: start,
      allDay: true,
      color: color
    };
  });

  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: event.color,
      color: 'white',
      borderRadius: '5px',
      border: 'none',
      display: 'block',
      opacity: 0.8
    }
  });

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        style={{ height: '50rem', width: '100%' }}
        events={events}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default CalenderView;
