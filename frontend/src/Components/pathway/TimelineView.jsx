import { useGlobal } from "../context/GlobalContext.jsx";
import { Timeline } from "@/components/ui/timeline.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Separator } from "@/components/ui/separator.jsx";
import { Calendar, BadgeCheck, CircleCheck, CircleAlert, BadgeAlert, Clock, CalendarCheck, BookOpenIcon, MonitorPlay, SquareMousePointer, CheckCircle2, Database, ClipboardList, Goal } from "lucide-react";
import { BackgroundGradient } from "../ui/background-gradient.jsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog.jsx"
import { useParams } from "react-router-dom";
import { Button } from "../ui/button.jsx";

const taskStateToObject = {
  'completedOnTime': { icon: <BadgeCheck size={16} />, color: 'text-green-500', displayText: "Completed On Time" },
  'completedLate': { icon: <CircleCheck size={16} />, color: 'text-orange-500', displayText: "Completed Late" },
  'lateMark': { icon: <CircleAlert size={16} />, color: 'text-red-500', displayText: "You are Late" },
  'pending': { icon: <BadgeAlert size={16} />, color: 'text-yellow-500', displayText: "Complete it Today" },
  'scheduled': { icon: <Clock size={16} />, color: 'text-blue-500', displayText: "Scheduled" },
}

const resourceStateToIcon = {
  'Documentation': <BookOpenIcon size={24} className="text-blue-500" />,
  'Video': <MonitorPlay size={24} className="text-red-500" />,
  'Interactive Exercise': <SquareMousePointer size={24} className="text-green-500" />,
  'Video Tutorial': <MonitorPlay size={24} className="text-yellow-500" />,
}

const TimelineView = () => {
  const { pathwayId } = useParams();
  const { pathwaysList } = useGlobal();
  const pathway = pathwaysList.find((pathway) => pathway.data.id === pathwayId);

  const { topic, description, duration, startDate, endDate, isActive, haveBeenPaused } = pathway.data;
  const { pathway: intervals, intervalType } = pathway.data.response;

  // console.log(pathway.data);

  const data = intervals.map((interval) => ({
    title: `${intervalType} ${interval.intervalNumber}: ${interval.summary}`,
    content: <Interval data={interval} pathway={pathway} />,
  }))

  const getPercentageComplete = () => {
    const taskList = pathway.toTaskList();
    const completedTaskList = taskList.filter((task) => task.isDone);
    return (completedTaskList.length / taskList.length) * 100;
  }

  return <div className='p-2 w-full h-svh' style={{ position: 'relative', top: '0px' }}>
    <Timeline
      data={data}
      title={topic}
      description={description}
      duration={duration}
      startDate={startDate}
      endDate={endDate}
      percentageComplete={getPercentageComplete()}
      isActivePathway={isActive}
      haveBeenPaused={haveBeenPaused}
    />
  </div>;
};

const Interval = ({ data, pathway }) => {
  const { summary: title, tasks, pathwayStartDate: startDate, pathwayEndDate: endDate, intervalNumber } = data;
  const { refetchPathways } = useGlobal();

  const getTaskState = (scheduledDate, completedDate, isDone, lateMark) => {
    const today = new Date();

    if(!scheduledDate) {
      return;
    }

    if (completedDate && completedDate < scheduledDate) {
      throw new Error('Completed date cannot be before scheduled date');
    }

    if (isDone) {
      return completedDate <= scheduledDate
        ? 'completedOnTime'
        : 'completedLate';
    }

    if (scheduledDate.getDate() > today.getDate()) {
      return 'scheduled';
    }

    return lateMark ? 'lateMark' : 'pending';
  };

  const isIntervalComplete = () => {
    return tasks.every((task) => task.isDone);
  }

  const handleMarkAsDone = async (taskNumber) => {
    console.log(intervalNumber, taskNumber);
    await pathway.markAsDone(intervalNumber, taskNumber);
    await refetchPathways();
  }

  return (
    <Card className="bg-neutral-100 dark:bg-neutral-900 shadow-none hover:shadow-lg hover:shadow-blue-300 transition-all duration-300 ease-in-out">
      <CardHeader className="flex flex-col gap-2">
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="flex gap-2">
          {(startDate || endDate) && <Badge className="flex gap-2 w-fit bg-neutral-200 text-black hover:bg-neutral-300">
            <Calendar size={16} />
            <Separator orientation="vertical" />
            {startDate ? new Date(startDate).toLocaleDateString() : "No Start Date"} - {endDate ? new Date(endDate).toLocaleDateString() : "No End Date"}
          </Badge>}
          {isIntervalComplete() && <Badge className="flex gap-2 w-fit bg-green-400 text-black hover:bg-neutral-300">
            <CircleCheck size={16} />
            <Separator orientation="vertical" />
            Completed on {new Date(tasks[tasks.length - 1].completedDate).toLocaleDateString()}
          </Badge>}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2 flex-col lg:flex-row">
        {tasks.map((task, index) => {
          const taskState = getTaskState(task.scheduledDate, task.completedDate, task.isDone, task.lateMark);
          return (
            <Dialog key={index} className="h-full grid place-items-center">
              <DialogTrigger className="h-full grid place-items-center">
                <BackgroundGradient className="rounded-[22px] p-1 bg-neutral-200 dark:bg-neutral-700 w-full h-full">
                  <Card className="bg-neutral-200 dark:bg-neutral-700 border-none shadow-none h-full w-full">
                    <CardHeader className="flex flex-col gap-2 items-start text-left">
                      <CardTitle className="text-xl">{task.taskTitle}</CardTitle>
                      <CardDescription>{task.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-2 justify-center items-start md:justify-start md:items-center md:flex-row text-sm">
                        {task.scheduledDate &&<div className="flex gap-2 items-center">
                          <Calendar size={16} />
                          <span>{new Date(task.scheduledDate).toLocaleDateString()}</span>
                        </div>}
                        {task.scheduledDate && <div className={`status flex gap-2 items-center ${taskStateToObject[taskState].color}`}>
                          {taskStateToObject[taskState].icon}
                          {taskStateToObject[taskState].displayText}
                        </div>}
                      </div>
                    </CardContent>
                  </Card>
                </BackgroundGradient>
              </DialogTrigger>
              <DialogContent className="max-w-xs lg:max-w-4xl shadow-2xl shadow-blue-400 w-fit">
                <DialogHeader className="flex flex-col gap-2">
                  <DialogTitle className="text-2xl">{task.taskNumber}. {task.taskTitle}</DialogTitle>
                  <DialogDescription>{""}</DialogDescription>
                  <div className="flex gap-2 justify-stretch w-fit">
                    <div className="left flex flex-col gap-2">
                      <div className="flex gap-2 text-bold"><ClipboardList /> Todo:</div>
                      <div className="border-2 border-blue-400 rounded-md p-2">
                        {task.description}
                      </div>
                      <div className="flex gap-2 text-bold mt-5"><Database /> Refer these resources:</div>
                      <div className="rounded-md flex gap-2">
                        {task.resources.map((resource, index) => (
                          <div key={index} className="flex gap-2 items-center border-2 border-neutral-500 dark:border-neutral-300 rounded-md p-2 hover:scale-105 cursor-pointer">
                            <a href={resource.link} target="_blank" className="text-blue-400 hover:text-blue-500 flex gap-2">
                              {resourceStateToIcon[resource.type]}
                              <span>{resource.title}</span>
                            </a>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2 text-bold mt-5"><Goal /> Outcome:</div>
                      <div className="border-2 border-green-400 rounded-md p-2">
                        {task.expectedOutcome}
                      </div>
                    </div>
                    {task.scheduledDate && <Separator orientation="vertical" className="bg-neutral-500 mx-2" />}
                    <div className="right flex flex-col items-start justify-start gap-2">
                      {task.scheduledDate && <div className="flex gap-2 items-center text-gray-800 dark:text-gray-400">
                        <Calendar size={16} />
                        <span>{new Date(task.scheduledDate).toLocaleDateString()}</span>
                      </div>}
                      {task.completedDate && <div className="completedDate flex gap-2 items-center">
                        <CalendarCheck size={16} />
                        <span>{new Date(task.completedDate).toLocaleDateString()}</span>
                      </div>}
                      {task.scheduledDate && <div className={`status flex gap-2 items-center ${taskStateToObject[taskState].color}`}>
                        {taskStateToObject[taskState].icon}
                        {taskStateToObject[taskState].displayText}
                      </div>}
                      {(taskState === "pending" || taskState === "lateMark") && <Button type="button" className="bg-green-600 dark:bg-green-500" onClick={() => handleMarkAsDone(task.taskNumber)}>
                        <CheckCircle2 /> Mark As Done
                      </Button>}
                    </div>
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default TimelineView;