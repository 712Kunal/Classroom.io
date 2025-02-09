import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
import UserActivityChart from "./UserActivitychart.jsx";

// UserCard Component
export function UserCard({ user }) {
  return (
    <div className="grid gap-4 lg:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-8 pt-20">

      {/* Revenue Card with Glowing Shadow */}
      <div className="relative p-6 rounded-2xl bg-blue-50 text-gray-800 shadow-lg hover:shadow-xl hover:shadow-blue-400 hover:scale-105 transition-all duration-300">
        <div className="flex flex-row items-center justify-start space-x-4">
          {/* Avatar Section */}
          <div className="w-auto sm:w-10 sm:h-10 md:w-14 md:h-14 rounded-full sm:border-2 sm:border-gray-200 overflow-hidden flex justify-center items-center">
            <img
              src={user.avatar || 'https://via.placeholder.com/150'}  // Fallback image URL
              alt={user.username}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text Section */}
          <div className="text-left">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-black">{user.FullName}</h2>
            <p className="text-xs font-medium text-gray-700 mt-1">{user.username}</p>
          </div>
        </div>
      </div>


      {/* New Customers Card with Glowing Shadow */}
      <div className="relative p-6 rounded-2xl bg-yellow-50 text-gray-800 shadow-lg hover:shadow-xl hover:shadow-yellow-400 hover:scale-105 transition-all duration-300">
        <div className="flex flex-row items-center justify-start space-x-4">
          <div className="w-auto sm:w-10 sm:h-10 md:w-14 md:h-14 rounded-full sm:border-2 sm:border-gray-200 overflow-hidden flex justify-center items-center">
            <h1 className="text-xl sm:text-5xl">{'🏆'}</h1>
            {/* <h1 className="text-xl sm:text-2xl">
              <img
                src="/brand/image.png"
                alt="Brand Logo"
                className="w-8 sm:w-10 md:w-12 lg:w-14 h-auto"
              />
            </h1> */}
          </div>
          {/* Text Section */}
          <div className="text-center pl-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              <span className="font-bold">{user.badgesAwarded?.length || 0}</span>
            </h2>
          </div>
        </div>
      </div>

      {/* New Orders Card with Glowing Shadow */}
      <div className="relative p-6 rounded-2xl bg-green-50 text-gray-800 shadow-lg hover:shadow-xl hover:shadow-green-400 hover:scale-105 transition-all duration-300">
        <div className="flex flex-row items-center justify-start space-x-4">
          <div className="w-auto sm:w-10 sm:h-10 md:w-14 md:h-14 rounded-full sm:border-2 sm:border-gray-200 overflow-hidden flex justify-center items-center">
            {/* <h1 className="text-xl sm:text-2xl">{'🎢'}</h1> */}
            <h1 className="text-xl sm:text-2xl">
              <img
                src="/brand/progress.png"
                alt="Brand Logo"
                className="w-8 sm:w-10 md:w-12 lg:w-14 h-auto"
              />
            </h1>
          </div>
          {/* Text Section */}
          <div className="text-center pl-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              <span className="font-bold">{20} %</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Additional Card with Glowing Shadow */}
      <div className="relative p-6 rounded-2xl bg-purple-50 text-gray-800 shadow-lg hover:shadow-xl hover:shadow-purple-400 hover:scale-105 transition-all duration-300">
        <div className="flex flex-row items-center justify-start space-x-4">
          <div className="w-auto sm:w-10 sm:h-10 md:w-14 md:h-14 rounded-full sm:border-2 sm:border-gray-200 overflow-hidden flex justify-center items-center">
            <h1 className="text-xl sm:text-2xl">
              <img
                src="/brand/path.png"
                alt="Brand Logo"
                className="w-8 sm:w-10 md:w-12 lg:w-14 h-auto"
              />
            </h1>
          </div>
          {/* Text Section */}
          <div className="text-center pl-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              <span className="font-bold">{5}</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

// weekly tasks

// export function WeekTask() {
//   const [daysData, setDaysData] = useState([
//     { day: "M", height: 4 },
//     { day: "T", height: 60 },
//     { day: "W", height: 24 },
//     { day: "T", height: 45 },
//     { day: "F", height: 20 },
//     { day: "S", height: 60 },
//     { day: "S", height: 55 },
//   ]);

//   const updateDayColors = () => {
//     setDaysData(prevData =>
//       prevData.map(day => ({
//         ...day,
//         color: getRandomColor(),
//       }))
//     );
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       updateDayColors();
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="">
//       <div className="grid grid-cols-7 gap-2 flex-grow self-stretch">
//         {daysData.map((day, index) => (
//           <div key={index} className="flex flex-col justify-end items-center group relative">
//             <div
//               className="mx-auto rounded-full transition-all duration-300 ease-in-out"
//               style={{
//                 width: "16px",
//                 height: `${day.height}px`,
//                 backgroundColor: day.color,
//               }}
//             ></div>
//             <div className="text-center text-xs text-gray-400 font-semibold mt-2">
//               {day.day} 
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// Recnet Tasks
// export function RecentTask() {
//   return (
//     <div className="w-full px-4 py-6">
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//         <div className="p-6 rounded-lg shadow-md shadow-gray-700 dark:shadow-gray-700 transition-all shadow-md  hover:shadow-[0_0_15px_4px] h-64 sm:h-80 flex flex-col">
//           <h2 className="text-center text-xl font-semibold text-gray-800 dark:text-gray-100">Task</h2>
//           <div className="flex-grow"></div>
//         </div>

//         {/* Column 2 */}
//         <div className=" p-6 rounded-lg shadow-md shadow-gray-700  dark:shadow-gray-700 transition-all shadow-md hover:shadow-[0_0_15px_4px] h-64 sm:h-80 flex flex-col">
//           <h2 className="text-xl text-center font-semibold text-gray-800 dark:text-gray-100">Weekly Report</h2>
//           <div className="pb-8 flex-grow"></div>
//           <WeekTask />
//         </div>
//       </div>
//     </div>
//   );
// }

// Dashboard Component
export default function Dashboard({ user }) {
  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-10">
      {/* First Row: User Card */}
      <div className="flex justify-center">
        <UserCard user={user} />
      </div>

      {/* Second Row: User Activity Chart */}
      <div className="flex justify-center">
        <UserActivityChart />
      </div>
      {/* <div className="flex justify-center">
        <RecentTask />
      </div> */}
    </div>
  );
}
