import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar.jsx';
import AppSidebar from './AppSidebar.jsx';
import { useIsMobile } from '@/hooks/use-mobile.jsx';
import { GlobalProvider } from '../context/GlobalContext.jsx';

function AppWrapper({user}) {
  const isMobile = useIsMobile();
  return (
    <GlobalProvider initialData={{user: user}}>
      <div className="w-screen h-screen flex">
        <aside>
          <SidebarProvider defaultOpen={false}>
            {isMobile && <SidebarTrigger />}
            <AppSidebar />
          </SidebarProvider>
        </aside>
        <main className="grid place-items-center flex-grow py-2 pr-2">
          <div className="border-2 w-full h-full rounded-lg grid place-items-center dark:bg-neutral-900">
            <Outlet />
          </div>
        </main>
      </div>
    </GlobalProvider>
  );
}

export default AppWrapper;
