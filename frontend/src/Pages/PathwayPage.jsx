import React from 'react';
import { Outlet, useParams } from 'react-router-dom';

function PathwayPage() {
  const { pathwayId } = useParams();

  return (
    <div className="text-4xl flex-grow p-2 h-full border-2 border-neutral-700 rounded-lg">
      <h1>PathwayPage pathwayId: {pathwayId}</h1>
      <Outlet />
    </div>
  );
}

export default PathwayPage;
