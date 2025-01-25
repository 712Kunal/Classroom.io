import { createContext, useContext } from 'react'

export const CalendarContext = createContext(
  undefined
)

export function useCalendarContext() {
  const context = useContext(CalendarContext)
  if (!context) {
    throw new Error('useCalendarContext must be used within a CalendarProvider')
  }
  return context
}
