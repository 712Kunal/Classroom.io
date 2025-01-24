import { useCalendarContext } from '../../calendar-context'
import { Calendar } from '@/components/ui/calendar'

export default function CalendarBodyDayCalendar() {
  const { date, setDate } = useCalendarContext()
  return (
    <Calendar
      selected={date}
      onSelect={(date) => date && setDate(date)}
      mode="single"
    />
  )
}
