import { Card } from "@/components/ui/card.jsx";
import {  BookOpenIcon, MonitorPlay, SquareMousePointer,  CalendarCheck, Clock, BadgeCheck, CircleCheck, BadgeAlert, CircleAlert, CheckCircle } from "lucide-react";


const ResourceTypeToIconMap = {
  'Documentation': <BookOpenIcon size={24} className="text-blue-500" />,
  'Video': <MonitorPlay size={24} className="text-red-500" />,
  'Interactive Exercise': <SquareMousePointer size={24} className="text-green-500" />,
  'Video Tutorial': <MonitorPlay size={24} className="text-yellow-500" />,
};

const taskStateToBgColorMap = {
  'completedOnTime': 'bg-neutral-50 dark:bg-neutral-900',
  'completedLate': 'bg-neutral-50 dark:bg-neutral-900',
  'lateMark': 'bg-neutral-100 dark:bg-neutral-700',
  'pending': 'bg-neutral-100 dark:bg-neutral-700',
  'scheduled': 'bg-neutral-200 dark:bg-neutral-800',
};

const taskStateToTextColorMap = {
  'pending': 'text-yellow-500',
  'lateMark': 'text-red-500',
  'completedOnTime': 'text-green-500',
  'completedLate': 'text-orange-500',
  'scheduled': 'text-blue-500',
};

const taskStateToBorderColorMap = {
  'completedOnTime': 'border-green-800',
  'completedLate': 'border-orange-800',
  'lateMark': 'border-red-800',
  'pending': 'border-yellow-800',
  'scheduled': 'border-blue-600',
};

const taskStateToIconMap = {
  'completedOnTime': <BadgeCheck size={24} className="text-green-500" />,
  'completedLate': <CircleCheck size={24} className="text-orange-500" />,
  'lateMark': <CircleAlert size={24} className="text-red-500" />,
  'pending': <BadgeAlert size={24} className="text-yellow-500" />,
  'scheduled': <Clock size={24} className="text-blue-500" />,
};

const taskStateToDisplayTextMap = {
  'completedOnTime': 'Completed On Time',
  'completedLate': 'Completed Late',
  'lateMark': 'You are Late',
  'pending': 'Complete it Today',
  'scheduled': 'Scheduled',
};

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

const Taskprogress = ({ pathway }) => {
  const taskList = pathway.toTaskList();

  const completedTasks = taskList.filter(task => {
    const taskState = getTaskState(task.scheduledDate, task.completedDate, task.isDone, task.lateMark);
    return taskState === 'completedOnTime' || taskState === 'completedLate';
  });

  return (
    <>
<p className='text-base sm:text-lg md:text-xl lg:text-2xl mb-2'>Completed Tasks</p>
<div className="task-list">
  {completedTasks.length > 0 ? (
    completedTasks.map((task) => {
      const taskState = getTaskState(task.scheduledDate, task.completedDate, task.isDone, task.lateMark);
      return (
        <Card key={task.taskNumber} className={`mb-4 p-4 ${taskStateToBgColorMap[taskState]} border-2 ${taskStateToBorderColorMap[taskState]}`}>
          <div className="top flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <div className="left sm:w-2/3">
              <h3 className={`text-lg sm:text-xl font-semibold mb-2 ${taskStateToTextColorMap[taskState]}`}>{task.taskTitle}</h3>
              <p className="text-gray-800 dark:text-gray-300 mb-2 text-sm sm:text-base">{task.description}</p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-2 justify-center sm:w-1/3">
              {task.completedDate && (
                <div className={`flex items-center justify-start sm:justify-end text-base ${taskStateToTextColorMap[taskState]} gap-2`}>
                  <CalendarCheck className="w-4 h-4 mr-1" />
                  <span>{new Date(task.completedDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
        </Card>
      );
    })
  ) : (
    <p>No completed tasks available.</p>
  )}
</div>
    </>
  );
};

export default Taskprogress;
