import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LuSquareChevronRight, LuSquareChevronLeft } from 'react-icons/lu';
import { MdLibraryBooks } from 'react-icons/md';
import { IoIosNotifications } from 'react-icons/io';
import { PiPathBold } from 'react-icons/pi';

const Sidebar = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const { pathname } = useLocation();

  const user = {
    username: 'JohnDoe08',
    avatar: 'https://avatar.iran.liara.run/public/48',
    email: 'johndoe08@gmail.com'
  };

  const pathways = [
    {
      id: 1,
      name: 'Pathway 1'
    },
    {
      id: 2,
      name: 'Pathway 2'
    }
  ];

  const routes = [
    {
      name: 'Library',
      path: '/app/library',
      icon: <MdLibraryBooks />
    },
    {
      name: 'Notifications',
      path: '/app/notifications',
      icon: <IoIosNotifications />
    }
  ];

  return (
    <aside className="flex flex-col justify-between p-2 h-full border-2 border-neutral-700 rounded-lg min-w-60">
      <SidebarHeader open={isOpen} setOpen={setIsOpen} />
      <div className="main flex flex-col gap-2 flex-grow">
        <SidebarSection heading={'Library'}>
          {routes.map((route, index) => (
            <SidebarItem
              key={index}
              open={isOpen}
              link={route.path}
              name={route.name}
              active={pathname === route.path}
              icon={route.icon}
            />
          ))}
        </SidebarSection>
        <SidebarSection heading={'Pathways'}>
          {pathways.map((pathway, index) => (
            <SidebarItem
              key={index}
              open={isOpen}
              link={`/app/library/pathways/${pathway.id}`}
              name={pathway.name}
              active={pathname === `/app/library/pathways/${pathway.id}`}
            />
          ))}
        </SidebarSection>
      </div>
      <SidebarFooter user={user} open={isOpen} />
    </aside>
  );
};

export default Sidebar;

const SidebarHeader = ({ open, setOpen }) => {
  return (
    <div className="header flex justify-between p-2 h-12">
      {open && (
        <div className="logo">
          <img className="object-contain h-full" src="/brand/logo.png" alt="logo" />
        </div>
      )}
      <div
        className="sidebarToggle grid place-items-center hover:text-violet-500"
        onClick={() => setOpen(!open)}
      >
        {open ? <LuSquareChevronLeft size={24} /> : <LuSquareChevronRight size={24} />}
      </div>
    </div>
  );
};

const SidebarFooter = ({ user, open }) => {
  return (
    <div className="footer w-full flex justify-between p-2 gap-2 self-end">
      <div className="icon h-12 w-12">
        <img src={user.avatar} alt="avatar" className="object-contain h-full" />
      </div>
      {open && (
        <div className="user-details flex flex-col text-sm">
          <p className="text-lg">{user.username}</p>
          <p>{user.email}</p>
        </div>
      )}
    </div>
  );
};

const SidebarSection = ({ heading, children }) => {
  return (
    <>
      <p className="text-lg font-bold text-neutral-400 px-2">{heading}</p>
      <ul className="flex flex-col gap-2 justify-center p-2">{children}</ul>
    </>
  );
};

const SidebarItem = ({ open, link, name, active, icon }) => {
  return (
    <li className="flex items-center">
      <Link
        to={link}
        className={`flex items-center gap-2 w-full border-2 border-neutral-700 p-2 text-xl rounded-lg ${active ? 'bg-violet-950 text-white' : 'hover:translate-x-2 hover:bg-violet-950'}`}
      >
        <div className="icon text-xl">{icon}</div>
        {open && name}
      </Link>
    </li>
  );
};
