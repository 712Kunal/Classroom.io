import { useState } from 'react'
import Calendar from './calendar/calendar'
import { generateMockEvents } from '@/lib/mock-calendar-events'

export default function CalendarDemo() {
  const [events, setEvents] = useState(generateMockEvents())
  const [mode, setMode] = useState('month')
  const [date, setDate] = useState(new Date())

  return (
    <Calendar
      events={events}
      setEvents={setEvents}
      mode={mode}
      setMode={setMode}
      date={date}
      setDate={setDate}
    />
  )
}
