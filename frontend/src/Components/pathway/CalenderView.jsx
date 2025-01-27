import { React, useEffect, useState } from "react"
import "../../App.css"
import dummy from "../../assets/data/dummy.json"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import TaskMoodle from "./TaskMoodle"
import { useTheme } from "../core/ThemeProvider"
import { late } from "zod"

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment) // or globalizeLocalizer

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
  const [tasks, setTasks] = useState([])
  const [isTaskMoodleOpen, setIsTaskMoodleOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const { theme } = useTheme()

  useEffect(() => {
    const extract_tasks = (dummyData) => {
      const tasks = [] // empty array to store tasks
      const pathway = dummyData.response.pathway

      // Iterate through the data
      for (let i = 0; i < pathway.length; i++) {
        if (pathway[i].tasks.length > 0) {
          const numberOfTasks = pathway[i].tasks.length
          for (let j = 0; j < numberOfTasks; j++) {
            const singleTask = pathway[i].tasks[j]
            tasks.push(singleTask)
          }
        }
      }

      return tasks
    }

    const AllTasks = extract_tasks(dummy)
    setTasks(AllTasks)
  }, [])

  const events = tasks.map((task) => {
    const start = new Date(task.scheduledDate)
    const currentDate = new Date()

    // Adjusted the colors for better visibility in the dark mode
    const colors =
      theme === "dark"
        ? {
            upcoming: "#3b82f6", // Brighter blue
            late: "#f97316", // Brighter orange
            done: "#22c55e", // Brighter green
            current: "#c49d02", // Brighter yellow
            overdue: "#ef4444", // Brighter red
          }
        : {
            upcoming: "#2454ff",
            late: "#ff6700",
            done: "#38b000",
            current: "#c49d02",
            overdue: "#ef233c",
          }

    let color = colors.upcoming // Default blue for upcoming tasks

    if (task.isDone) {
      color = task.lateMark
        ? colors.late // Orange for late marked tasks
        : colors.done // Green for on-time done tasks
    } else {
      // Convert dates to start of day for accurate comparison
      const taskDate = new Date(start.setHours(0, 0, 0, 0))
      const today = new Date(currentDate.setHours(0, 0, 0, 0))

      if (taskDate.getTime() === today.getTime()) {
        color = colors.current // Yellow for current tasks
      } else if (taskDate.getTime() < today.getTime()) {
        color = colors.overdue // Red for overdue tasks
      } else {
        color = colors.upcoming // Blue for upcoming tasks
      }
    }

    return {
      title: task.taskTitle,
      description: task.description,
      resources: task.resources,
      outcome: task.expectedOutcome,
      start: start,
      end: start,
      color: color,
    }
  })

  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: event.color,
      color: "white",
      borderRadius: "5px",
      border: "none",
      display: "block",
      opacity: theme === "dark" ? 0.9 : 0.8,
    },
  })

  const handleEventClick = (event) => {
    setSelectedEvent(event)
    setIsTaskMoodleOpen(true)
  }

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        style={{ height: "50rem", width: "100%" }}
        events={events}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={(event) => handleEventClick(event)}
      />

      {isTaskMoodleOpen && (
        <div className="absolute z-10 inset-0 flex justify-center items-center bg-black bg-opacity-60">
          <TaskMoodle event={selectedEvent} setIsTaskMoodleOpen={setIsTaskMoodleOpen} />
        </div>
      )}
    </div>
  )
}

export default CalenderView

