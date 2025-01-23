import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required chart components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

export default function Dashboard() {
  // Task list state
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Task 1', completed: false },
    { id: 2, name: 'Task 2', completed: false },
    { id: 3, name: 'Task 3', completed: false },
    { id: 4, name: 'Task 4', completed: false },
    { id: 5, name: 'Task 5', completed: false },
  ]);

  // Handle task completion
  const handleTaskToggle = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Calculate progress (percentage of tasks completed)
  const progress = (tasks.filter((task) => task.completed).length / tasks.length) * 100;

  // Data for progress chart
  const chartData = {
    labels: ['Progress'], // Label for progress chart
    datasets: [
      {
        label: 'Task Completion Progress',
        data: [progress], // Data point for current progress
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Task Completion Progress',
      },
    },
  };

  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-10">
      {/* Task List */}
      <div className="bg-white shadow-lg rounded-md p-4 sm:p-6 md:p-8 xl:p-10 flex flex-col space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Task List</h2>
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleTaskToggle(task.id)}
                className="h-5 w-5 text-green-600 border-gray-300 rounded"
              />
              <span className={task.completed ? 'line-through text-gray-500' : ''}>
                {task.name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Progress Chart */}
      <div className="bg-white shadow-lg rounded-md p-4 sm:p-6 md:p-8 xl:p-10 flex flex-col">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Task Completion Progress</h2>
        <div className="h-48 sm:h-64 md:h-72 lg:h-80 xl:h-96">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Other Dashboard Content */}
      <div className="bg-white shadow-lg rounded-md p-4 sm:p-6 md:p-8 xl:p-10 flex flex-col">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Other Dashboard Content</h2>
        <p className="text-gray-600">Here you can add additional widgets or content related to your dashboard.</p>
      </div>
    </div>
  );
}
