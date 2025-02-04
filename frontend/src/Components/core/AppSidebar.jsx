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
  useSidebar,
} from "@/components/ui/sidebar.jsx";
import { NavUser } from '../ui/nav-user.jsx';
import MobileModeToggle from '../originUi/mobile-mode-toggle.jsx';
import { Bell, Library, RouteIcon } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile.jsx';
import { useGlobal } from '../context/GlobalContext.jsx';
import { getAllPathwaysOfUser } from '@/Firebase/services/pathway.service.js';

const AppSidebar = () => {
  const { open } = useSidebar();
  const isMobile = useIsMobile();
  const { user: contextUser } = useGlobal();
  const { pathwaysList, setPathwaysList } = useGlobal();

  useEffect(() => {
    if(contextUser) {
      const fetchPathways = async () => {
        try {
          const pathways = await getAllPathwaysOfUser(contextUser.uid);
          setPathwaysList(pathways);
          console.log(pathways);
        } catch (error) {
          console.error("Error fetching pathways:", error);
        }
      };
      fetchPathways();
    };
  }, [contextUser]);
  
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const user = auth.currentUser; 
  //     if (user) {
  //       const docRef = doc(db, "Users", user.uid);
  //       const docSnap = await getDoc(docRef);
  
  //       if (docSnap.exists()) {
  //         setUserDetails(docSnap.data());
  //       } else {
  //         console.log("No such document!");
  //       }
  //     } else {
  //       console.log("No user is logged in");
  //     }
  //   };
  
  //   fetchUserData();
  // }, []); 
  
  const user = contextUser ? {
    username: contextUser.displayName,
    avatar: 'https://avatar.iran.liara.run/public/48',
    email: contextUser.email,
  } : null;  
  
  const pathways = pathwaysList.map((pathway, index) => (
    {
      id: pathway.id,
      name: pathway.topic,
      pathwayId: pathway.id,
    }
  ));

  const routes = [
    {
      name: 'Library',
      path: '/app/library',
      icon: <Library size={18} />,
    },
    {
      name: 'Notifications',
      path: '/app/notifications',
      icon: <Bell size={18} />,
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
                    <Link to={route.path} className={`flex items-center gap-2 text-base ${isMobile ? 'justify-center' : 'justify-start'}`}>
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
                    <Link to={`/app/library/pathways/${pathway.id}/timeline`} className="flex items-center gap-2 text-base">
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
        <div className="flex items-center justify-start">
          {!open && <MobileModeToggle/>}
        </div>
        <NavUser user={user}/>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
