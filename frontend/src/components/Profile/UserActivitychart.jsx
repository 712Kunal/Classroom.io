import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const UserActivityChart = () => {
  const [hovered, setHovered] = useState(false); 
  const borderColor = getRandomColor(); 
  

  const data = {
    labels: [
      "2025-01-01", "2025-01-02", "2025-01-03", "2025-01-04", "2025-01-05", "2025-01-06", "2025-01-07", 
      "2025-01-08", "2025-01-09", "2025-01-10", "2025-01-11", "2025-01-12"
    ], 
    datasets: [
      {
        label: "Tasks Completed",
        data: [3, 7, 5, 9, 2, 6, 8, 7, 4, 9, 2, 1], 
        borderColor: borderColor, 
        backgroundColor: "rgba(75,192,192,0.2)", 
        fill: true, 
        tension: 0.4, 
      },
    ],
  };

  // Options to customize the chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,  
    plugins: {
      title: {
        display: true,
        text: "User Activity - Tasks Completed Over Time",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `Tasks: ${tooltipItem.raw}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Tasks",
        },
        min: 0,
      },
    },
  };

  return (
    <div 
      className={`w-full h-80 sm:h-[350px] md:h-[400px] xl:h-[450px] mx-auto p-5 sm:p-6 sm:rounded-lg sm:shadow-md sm:shadow-gray-300 sm:rounded-xl p-0 shadow-none lg:p-8 lg:rounded-2xl lg:shadow-xl lg:shadow-gray-500 transition-all duration-300 ${hovered ? 'hover:shadow-[0_0_10px_5px]' : ''}`}
      style={{
        boxShadow: `0 4px 6px rgba(${parseInt(borderColor.slice(1, 3), 16)}, ${parseInt(borderColor.slice(3, 5), 16)}, ${parseInt(borderColor.slice(5, 7), 16)}, 0.3)`,
        transition: 'box-shadow 0.3s ease-in-out'
      }}
      onMouseEnter={() => setHovered(true)} 
      onMouseLeave={() => setHovered(false)} 
    >
      <h2 className="text-center text-xl sm:text-2xl md:text-1xl">User Activity Chart</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default UserActivityChart;
