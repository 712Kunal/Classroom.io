import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SquareChevronLeft, SquareChevronRight } from 'lucide-react'

const Sidebar = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const { pathname } = useLocation();

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
    <aside className='block p-2 flex-shrink h-full border-2 border-neutral-700 rounded-lg min-w-60'>
      <Sidebar_Header open={isOpen} setOpen={setIsOpen} />
      <div className="main flex flex-col gap-2">
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
      <div className="footer"></div>
    </aside>
  )
}

export default Sidebar

const Sidebar_Header = () => {
  return (
    <div className='header flex justify-between p-2 h-12'>
      <div className="logo">
        {open && <img className='object-contain h-full' src="/brand/logo.png" alt="logo" />}
      </div>
      <div className="sidebarToggle grid place-items-center hover:text-violet-500">
        {open ? <SquareChevronLeft size={24} /> : <SquareChevronRight size={24} />}
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