import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

// navbar will be on landing page only
// Sidebar will be on all /app pages

function AppWrapper() {
  return (
    <div className="w-full h-full flex p-2 gap-2">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default AppWrapper;
