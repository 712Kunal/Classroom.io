import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import AppSidebar from './AppSidebar';
import { useIsMobile } from '@/hooks/use-mobile';

function AppWrapper() {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="w-screen h-screen flex">
        <aside>
          {isMobile && <SidebarTrigger />}
          <AppSidebar />
        </aside>
        <main className="grid place-items-center flex-grow py-2 pr-2">
          <div className="border-2 w-full h-full rounded-lg grid place-items-center">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

export default AppWrapper;
