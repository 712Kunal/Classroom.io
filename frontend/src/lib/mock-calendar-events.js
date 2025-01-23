import { addDays, startOfMonth } from 'date-fns';
import { colorOptions } from '@/components/calender_jsx/calendar/calendar-tailwind-classes';
import dummy from '../assets/data/dummy.json';

console.log(dummy);

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

const EVENT_TITLES = AllTasks.map((task) => task.taskTitle);
console.log('All tasks:', EVENT_TITLES);

// Extract color values from colorOptions
const EVENT_COLORS = colorOptions.map((color) => color.value);

function getRandomTime(date) {
  const hours = Math.floor(Math.random() * 14) + 8; // 8 AM to 10 PM
  const minutes = Math.floor(Math.random() * 4) * 15; // 0, 15, 30, 45
  return new Date(date.setHours(hours, minutes, 0, 0));
}

function generateEventDuration() {
  const durations = [30, 60, 90, 120]; // in minutes
  return durations[Math.floor(Math.random() * durations.length)];
}

export function generateMockEvents() {
  const events = [];
  const startDate = startOfMonth(new Date());

  for (let i = 0; i < AllTasks.length; i++) {
    // Random date between start and end
    const daysToAdd = Math.floor(Math.random() * 90); // 90 days = ~3 months
    const eventDate = addDays(startDate, daysToAdd);
    
    const startTime = AllTasks[i].scheduledDate ? new Date(AllTasks[i].scheduledDate) : getRandomTime(eventDate);
    const durationMinutes = generateEventDuration();
    const endTime = new Date(startTime.getTime() + durationMinutes * 60000);
    
    events.push({
      id: `event-${i + 1}`,
      title: EVENT_TITLES[i],
      color: EVENT_COLORS[Math.floor(Math.random() * EVENT_COLORS.length)],
      start: startTime,
      end: endTime
    });
  }

  // Sort events by start date
  return events.sort((a, b) => a.start.getTime() - b.start.getTime());
}
