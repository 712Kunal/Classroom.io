import { usePathway } from "../context/PathwayContext";
import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, CheckCircleIcon, XCircleIcon, BookOpenIcon, MonitorPlay, SquareMousePointer, CopyPlus, CopyMinus, Clock, BadgeCheck, CircleCheck, BadgeAlert, CircleAlert } from "lucide-react"
import { Button } from "@/components/ui/button"

const ResourceTypeToIconMap = {
  'Documentation': <BookOpenIcon size={24} className="text-blue-500" />,
  'Video': <MonitorPlay size={24} className="text-red-500" />,
  'Interactive Exercise': <SquareMousePointer size={24} className="text-green-500" />,
  'Video Tutorial': <MonitorPlay size={24} className="text-yellow-500" />,
}

const ResourceTypeToColorMap = {
  'Documentation': 'blue',
  'Video': 'red',
  'Interactive Exercise': 'green',
  'Video Tutorial': 'yellow',
}

const taskStateToBgColorMap = {
  'completedOnTime': 'bg-neutral-900',
  'completedLate': 'bg-neutral-900',
  'lateMark': 'bg-neutral-800',
  'pending': 'bg-neutral-800',
  'scheduled': 'bg-neutral-900',
}

const taskStateToTextColorMap = {
  'pending': 'text-blue-500',
  'lateMark': 'text-red-500',
  'completedOnTime': 'text-green-500',
  'completedLate': 'text-yellow-500',
  'scheduled': 'text-neutral-300',
}

const taskStateToBorderColorMap = {
  'completedOnTime': 'border-green-800',
  'completedLate': 'border-yellow-800',
  'lateMark': 'border-red-800',
  'pending': 'border-blue-800',
  'scheduled': 'border-neutral-600',
}

const taskStateToIconMap = {
  'completedOnTime': <BadgeCheck size={24} className="text-green-500" />,
  'completedLate': <CircleCheck size={24} className="text-yellow-500" />,
  'lateMark': <CircleAlert size={24} className="text-red-500" />,
  'pending': <BadgeAlert size={24} className="text-blue-500" />,
  'scheduled': <Clock size={24} className="text-gray-500" />,
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
  const { pathway: intervals } = pathway.data.response;
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
    <div className="w-full h-full py-6 grid place-items-center">
      <div className="max-w-7xl">
        <h1 className="text-3xl font-bold mb-4">{topic}</h1>
        <p className="text-gray-600 text-2xl mb-4">{description}</p>
        <div className="flex justify-between items-center gap-4 text-sm text-gray-500">
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
                {expandedIntervals.length > 0 ? <CopyMinus size={24} className="text-gray-500" /> : <CopyPlus size={24} className="text-gray-500" />}
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
                    Week {interval.intervalNumber}
                  </Badge>
                  <span>{interval.summary}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-4 border-l-2 border-gray-200 ml-4 mt-2">
                  {interval.tasks.map((task) => {
                    const taskState = getTaskState(task.scheduledDate, task.completedDate, task.isDone, task.lateMark);
                    return (
                      <Card key={task.taskNumber} className={`mb-4 p-4 ${taskStateToBgColorMap[taskState]} border-2 ${taskStateToBorderColorMap[taskState]} ${['completedOnTime', 'completedLate'].includes(taskState) ? 'opacity-50' : ''}`}>
                        <div className="top flex items-center justify-between">
                          <div className="left">
                            <h3 className={`text-lg font-semibold mb-2 ${taskStateToTextColorMap[taskState]}`}>{task.taskTitle}</h3>
                            <p className="text-gray-600 mb-2">{task.description}</p>
                          </div>
                          <div className="flex flex-col items-end justify-center">
                            <div className="flex items-center text-sm text-gray-500 mb-2">
                              <CalendarIcon className="w-4 h-4 mr-1" />
                              <span>{new Date(task.scheduledDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              {taskStateToIconMap[taskState]}
                              <span>{taskStateToDisplayTextMap[taskState]}</span>
                            </div>
                          </div>
                        </div>
                        <div className="resources flex gap-2 items-center justify-start">
                          <h4 className="font-semibold text-gray-200">Resources:</h4>
                          <ul className="list-none flex gap-2">
                            {task.resources.map((resource, index) => (
                              <li key={index}>
                                <a
                                  href={resource.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-500"
                                >
                                  <Badge variant="outline" className={`flex gap-2 items-center border-2 border-${ResourceTypeToColorMap[resource.type]}-500`}>
                                    {ResourceTypeToIconMap[resource.type]}
                                    {resource.title}
                                  </Badge>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <p className="mt-2">
                          <strong className="text-gray-200">Outcome:</strong> <span className="text-gray-300">{task.expectedOutcome}</span>
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