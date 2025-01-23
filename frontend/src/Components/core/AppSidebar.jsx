import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  useSidebar,
} from "@/components/ui/sidebar";
import { NavUser } from '../ui/nav-user';
import { Bell, Library, RouteIcon } from "lucide-react";

const AppSidebar = () => {
  const { pathname } = useLocation();
  const { open } = useSidebar();

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
      icon: <Library />,
    },
    {
      name: 'Notifications',
      path: '/app/notifications',
      icon: <Bell />,
    }
  ];

  return (
    <Sidebar side="left" variant="floating" collapsible="icon">
      <SidebarHeader className="flex-row justify-between items-center">
        {open && <div className="logo">
          <p className='text-violet-400 text-4xl'>Pathify</p>
        </div>}
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
                    <Link to={route.path}>
                      {route.icon}
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
                    <Link to={`/app/pathway/${pathway.id}/timeline`}>
                      <RouteIcon />
                      <span>{pathway.name}</span>
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
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;