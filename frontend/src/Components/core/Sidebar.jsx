import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LuSquareChevronRight, LuSquareChevronLeft, LuCircleUser } from "react-icons/lu";
const Sidebar = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const { pathname } = useLocation();

  const user = {
    username: 'JohnDoe08',
    avatar: 'https://avatar.iran.liara.run/public/48',
    email: 'johndoe08@gmail.com'
  }

  const pathways = [
    {
      id: 1,
      name: 'Pathway 1'
    },
    {
      id: 2,
      name: 'Pathway 2'
    },
  ];

  const routes = [
    {
      name: 'Library',
      path: '/app/library'
    },
    {
      name: 'Notifications',
      path: '/app/notifications'
    }
  ]

  return (
    <aside className='flex flex-col justify-between p-2 h-full border-2 border-neutral-700 rounded-lg min-w-60'>
      <SidebarHeader open={isOpen} setOpen={setIsOpen} />
      <div className="main flex flex-col gap-2 flex-grow">
        <SidebarSection heading={'Library'}>
          {routes.map((route, index) => (
            <SidebarItem key={index} link={route.path} name={route.name} active={pathname === route.path} />
          ))}
        </SidebarSection>
        <SidebarSection heading={'Pathways'}>
          {pathways.map((pathway, index) => (
            <SidebarItem key={index} link={`/app/library/pathways/${pathway.id}`} name={pathway.name} />
          ))}
        </SidebarSection>
      </div>
      <SidebarFooter user={user} />
    </aside>
  )
}

export default Sidebar

const SidebarHeader = () => {
  return (
    <div className='header flex justify-between p-2 h-12'>
      {
        open && <div className="logo">
          <img className='object-contain h-full' src="/brand/logo.png" alt="logo" />
        </div>
      }
      <div className="sidebarToggle grid place-items-center hover:text-violet-500">
        {open ? <LuSquareChevronLeft size={24} /> : <LuSquareChevronRight size={24} />}
      </div>
    </div>
  );
}

const SidebarFooter = ({user}) => {
  return (
    <div className='footer flex justify-between p-2 gap-2 self-end'>
      <div className="icon h-12 w-12">
        <img src={user.avatar} alt="avatar" className='object-contain h-full' />
      </div>
      <div className="user-details flex flex-col text-sm">
        <p className='text-lg'>{user.username}</p>
        <p>{user.email}</p>
      </div>
    </div>
  );
}

const SidebarSection = ({ heading, children }) => {
  return (
    <>
      <p className='text-lg font-bold text-neutral-400 px-2'>{heading}</p>
      <ul className='flex flex-col gap-2 justify-center p-2'>
        {children}
      </ul>
    </>
  );
}

const SidebarItem = ({ link, name, active }) => {
  return (
    <li className='flex items-center'>
      <Link to={link} className={`w-full border-2 border-neutral-700 p-2 text-xl rounded-lg ${active ? 'bg-violet-950 text-white' : 'hover:translate-x-2 hover:bg-violet-950'}`}>
        {name}
      </Link>
    </li>
  );
}