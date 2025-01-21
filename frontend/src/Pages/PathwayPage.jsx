import React from 'react'
import { Outlet } from 'react-router-dom'

function PathwayPage() {
  return (
    <div className='text-4xl flex-grow p-2 h-full border-2 border-neutral-700 rounded-lg'>
      <Outlet/>
    </div>
  )
}

export default PathwayPage