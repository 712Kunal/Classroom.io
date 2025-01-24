export default function CalendarHeader({
  children,
}) {
  return (
    <div className="flex lg:flex-row flex-col lg:items-center justify-between p-4 gap-4 border-b">
      {children}
    </div>
  )
}
