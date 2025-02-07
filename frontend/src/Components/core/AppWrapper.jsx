import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar.jsx';
import AppSidebar from './AppSidebar.jsx';
import { useIsMobile } from '@/hooks/use-mobile.jsx';
import { GlobalProvider } from '../context/GlobalContext.jsx';
import Start from '@/Pages/start.jsx';

function AppWrapper() {
  const isMobile = useIsMobile();
  const location = useLocation();

  const isAppRoute = location.pathname === "/app";
  return (
    <GlobalProvider>
      <div className="w-screen h-screen flex">
        <aside>
          <SidebarProvider defaultOpen={false}>
            {isMobile && <SidebarTrigger />}
            <AppSidebar />
          </SidebarProvider>
        </aside>
        <main className="grid place-items-center flex-grow py-2 pr-2">
          <div className="border-2 w-full h-full rounded-lg grid place-items-center dark:bg-neutral-900">
            {isAppRoute && <Start />} 
            <Outlet />
          </div>
        </main>
      </div>
    </GlobalProvider>
  );
}

export default AppWrapper;
