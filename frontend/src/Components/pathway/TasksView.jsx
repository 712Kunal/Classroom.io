import { usePathway } from "../context/PathwayContext.jsx";
import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion.jsx"
import { Card } from "@/components/ui/card.jsx"
import { Badge } from "@/components/ui/badge.jsx"
import { CalendarIcon, BookOpenIcon, MonitorPlay, SquareMousePointer, CopyPlus, CopyMinus, CalendarCheck, Clock, BadgeCheck, CircleCheck, BadgeAlert, CircleAlert } from "lucide-react"
import { Button } from "@/components/ui/button.jsx"

const ResourceTypeToIconMap = {
  'Documentation': <BookOpenIcon size={24} className="text-blue-500" />,
  'Video': <MonitorPlay size={24} className="text-red-500" />,
  'Interactive Exercise': <SquareMousePointer size={24} className="text-green-500" />,
  'Video Tutorial': <MonitorPlay size={24} className="text-yellow-500" />,
}

const ResourceTypeToColorMap = {
  'Documentation': 'border-blue-500',
  'Video': 'border-red-500',
  'Interactive Exercise': 'border-green-500',
  'Video Tutorial': 'border-yellow-500',
}

const ResourceTypeToBgColorMap = {
  'Documentation': 'hover:bg-blue-100 dark:hover:bg-blue-900',
  'Video': 'hover:bg-red-100 dark:hover:bg-red-900',
  'Interactive Exercise': 'hover:bg-green-100 dark:hover:bg-green-900',
  'Video Tutorial': 'hover:bg-yellow-100 dark:hover:bg-yellow-900',
}

const taskStateToBgColorMap = {
  'completedOnTime': 'bg-neutral-50 dark:bg-neutral-900',
  'completedLate': 'bg-neutral-50 dark:bg-neutral-900',
  'lateMark': 'bg-neutral-100 dark:bg-neutral-700',
  'pending': 'bg-neutral-100 dark:bg-neutral-700',
  'scheduled': 'bg-neutral-200 dark:bg-neutral-800',
}

const taskStateToTextColorMap = {
  'pending': 'text-yellow-500',
  'lateMark': 'text-red-500',
  'completedOnTime': 'text-green-500',
  'completedLate': 'text-orange-500',
  'scheduled': 'text-blue-500',
}

const taskStateToBorderColorMap = {
  'completedOnTime': 'border-green-800',
  'completedLate': 'border-orange-800',
  'lateMark': 'border-red-800',
  'pending': 'border-yellow-800',
  'scheduled': 'border-blue-600',
}

const taskStateToIconMap = {
  'completedOnTime': <BadgeCheck size={24} className="text-green-500" />,
  'completedLate': <CircleCheck size={24} className="text-orange-500" />,
  'lateMark': <CircleAlert size={24} className="text-red-500" />,
  'pending': <BadgeAlert size={24} className="text-yellow-500" />,
  'scheduled': <Clock size={24} className="text-blue-500" />,
}

const taskStateToDisplayTextMap = {
  'completedOnTime': 'Completed On Time',
  'completedLate': 'Completed Late',
  'lateMark': 'You are Late',
  'pending': 'Complete it Today',
  'scheduled': 'Scheduled',
}

const TasksView = () => {
  const { pathway } = usePathway();
  const { topic, description, duration, startDate, endDate } = pathway.data;
  const { pathway: intervals, intervalType } = pathway.data.response;
  const [expandedIntervals, setExpandedIntervals] = useState([]);

  const toggleInterval = (interval) => {
    if (expandedIntervals.includes(interval)) {
      setExpandedIntervals(expandedIntervals.filter((i) => i !== interval));
    } else {
      setExpandedIntervals([...expandedIntervals, interval]);
    }
  };

  const toggleCollapseExpandAll = () => {
    if (expandedIntervals.length === 0) {
      setExpandedIntervals(intervals.map((interval) => interval.intervalNumber));
    } else {
      setExpandedIntervals([]);
    }
  }

  const getTaskState = (scheduledDate, completedDate, isDone, lateMark) => {
    const today = new Date();

    if (completedDate && completedDate < scheduledDate) {
      throw new Error('Completed date cannot be before scheduled date');
    }

    if (isDone) {
      return completedDate <= scheduledDate
        ? 'completedOnTime'
        : 'completedLate';
    }

    if (scheduledDate > today) {
      return 'scheduled';
    }

    return lateMark ? 'lateMark' : 'pending';
  };

  return (
    <div className="w-full h-full p-6 grid place-items-center">
      <div className="max-w-7xl">
        <h1 className="text-3xl font-bold mb-4">{topic}</h1>
        <p className="text-gray-600 text-2xl mb-4">{description}</p>
        <div className="flex justify-between items-center gap-4 text-sm text-gray-800 dark:text-gray-500">
          <div className="flex gap-2">
            <Badge variant="outline" className="p-2">
              Duration: {duration} days
            </Badge>
            <Badge variant="outline" className="p-2">
              {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
            </Badge>
          </div>
          <div className="options flex gap-2">
            <span>
              <Button variant="outline" size="icon" onClick={toggleCollapseExpandAll}>
                {expandedIntervals.length > 0 ? <CopyMinus size={24} className="text-gray-800 dark:text-gray-500" /> : <CopyPlus size={24} className="text-gray-500" />}
              </Button>
            </span>
          </div>
        </div>
        <Accordion type="multiple" value={expandedIntervals} onValueChange={setExpandedIntervals}>
          {intervals.map((interval) => (
            <AccordionItem key={interval.intervalNumber} value={`interval-${interval.intervalNumber}`}>
              <AccordionTrigger onClick={() => toggleInterval(`interval-${interval.intervalNumber}`)}>
                <div className="flex items-center gap-2">
                  <Badge variant={(expandedIntervals.includes(interval.intervalNumber)) ? "default" : "outline"}>
                    {intervalType} {interval.intervalNumber}
                  </Badge>
                  <span>{interval.summary}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-4 border-l-2 border-gray-200 ml-4 mt-2">
                  {interval.tasks.map((task) => {
                    const taskState = getTaskState(task.scheduledDate, task.completedDate, task.isDone, task.lateMark);
                    return (
                      <Card key={task.taskNumber} className={`mb-4 p-4 ${taskStateToBgColorMap[taskState]} border-2 ${taskStateToBorderColorMap[taskState]} ${['completedOnTime', 'completedLate'].includes(taskState) ? 'opacity-75' : ''}`}>
                        <div className="top flex items-center justify-between">
                          <div className="left">
                            <h3 className={`text-lg font-semibold mb-2 ${taskStateToTextColorMap[taskState]}`}>{task.taskTitle}</h3>
                            <p className="text-gray-800 dark:text-gray-300 mb-2">{task.description}</p>
                          </div>
                          <div className="flex flex-col items-end gap-2 justify-center">
                            <div className="flex items-center justify-between text-gray-800 dark:text-gray-300 gap-2">
                              <CalendarIcon className="w-4 h-4 mr-1" />
                              <span>{new Date(task.scheduledDate).toLocaleDateString()}</span>
                            </div>
                            {task.completedDate && <div className={`flex items-center justify-between ${taskStateToTextColorMap[taskState]} gap-2`}>
                              <CalendarCheck className="w-4 h-4 mr-1" />
                              <span>{new Date(task.completedDate).toLocaleDateString()}</span>
                            </div>}
                            <div className="flex items-center gap-1">
                              {taskStateToIconMap[taskState]}
                              <span>{taskStateToDisplayTextMap[taskState]}</span>
                            </div>
                          </div>
                        </div>
                        <div className="resources flex gap-2 items-center justify-start">
                          <h4 className="font-semibold text-gray-700 dark:text-gray-200">Resources:</h4>
                          <ul className="list-none flex gap-2">
                            {task.resources.map((resource, index) => (
                              <li key={index}>
                                <a
                                  href={resource.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Badge variant="outline" className={`flex gap-2 items-center ${ResourceTypeToBgColorMap[resource.type]} border-2 ${ResourceTypeToColorMap[resource.type]}`}>
                                    {ResourceTypeToIconMap[resource.type]}
                                    {resource.title}
                                  </Badge>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <p className="mt-2">
                          <strong className="text-gray-700 dark:text-gray-200">Outcome:</strong> <span className="text-gray-800 dark:text-gray-300">{task.expectedOutcome}</span>
                        </p>
                      </Card>
                    )
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

export default TasksView;