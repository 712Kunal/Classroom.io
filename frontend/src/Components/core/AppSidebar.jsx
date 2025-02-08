import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarGroupContent,
  useSidebar
} from '@/components/ui/sidebar.jsx';
import { NavUser } from '../ui/nav-user.jsx';
import MobileModeToggle from '../originUi/mobile-mode-toggle.jsx';
import { Bell, Library, RouteIcon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile.jsx';
import { useGlobal } from '../context/GlobalContext.jsx';
import { Pathway } from '../models/Pathway.model.js';

const AppSidebar = () => {
  const { open } = useSidebar();
  const isMobile = useIsMobile();
  const { pathwaysList, isLoading } = useGlobal();
  let pathways = [];

  if (!isLoading && pathwaysList && pathwaysList.length > 0) {
    pathways = pathwaysList.map((pathway) => ({
      id: pathway.data.id,
      name: pathway.data.topic,
      pathwayId: pathway.data.id
    }));
  }

  const routes = [
    {
      name: 'Library',
      path: '/app/library',
      icon: <Library size={18} />
    },
    {
      name: 'Notifications',
      path: '/app/notifications',
      icon: <Bell size={18} />
    }
  ];

  return (
    <Sidebar side="left" variant="floating" collapsible="icon">
      <SidebarHeader className="flex-row justify-between items-center">
        {open && (
          <div className="logo">
            <p className="text-violet-400 text-4xl">Pathify</p>
          </div>
        )}
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((route, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={route.path}
                      className={`flex items-center gap-2 text-base ${isMobile ? 'justify-center' : 'justify-start'}`}
                    >
                      <span>{route.icon}</span>
                      <span>{route.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Pathways</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {pathways.map((pathway, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={`/app/library/pathways/${pathway.id}/timeline`}
                      className="flex items-center gap-2 text-base"
                    >
                      <RouteIcon className="text-base" />
                      <span className="text-base">{pathway.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-start">{!open && <MobileModeToggle />}</div>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
