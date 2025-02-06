import { Outlet, useParams, Link, useLocation } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.jsx"
import { ScrollArea } from '@/components/ui/scroll-area.jsx';
import { Separator } from "@/components/ui/separator.jsx"
import { Badge } from "@/components/ui/badge.jsx"
import { ChevronDownIcon, Library, Clock, Calendar, List, RouteIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.jsx"
import { useGlobal } from '@/components/context/GlobalContext';
import { useEffect, useState } from 'react';

const viewOptions = {
  timeline: {
    name: "Timeline View",
    icon: <Clock size={16} />
  },
  calender: {
    name: "Calender View",
    icon: <Calendar size={16} />
  },
  tasks: {
    name: "Tasks View",
    icon: <List size={16} />
  }
}

function PathwayPage() {
  const { pathname } = useLocation();
  const { pathwayId } = useParams();
  const lastWord = pathname.split('/').pop();
  const [currentView, setCurrentView] = useState(viewOptions[lastWord]);

  useEffect(() => {
    const lastWord = pathname.split('/').pop();
    setCurrentView(viewOptions[lastWord]);
  }, [pathname]);

  const { pathwaysList: pathways } = useGlobal();
  const pathway = pathways.find((pathway) => pathway.data.id === pathwayId);

  return (
    <div className="text-4xl w-full p-2 h-full rounded-lg flex flex-col">
      <div className="titleBar w-full items-center justify-start flex-row py-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/app/library">
                  <Badge variant="outline" className="text-sm flex items-center gap-1 p-1"><Library size={16} /> Library</Badge>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Badge variant="outline" className="text-sm flex items-center gap-1">
                    <RouteIcon size={16} />
                    {pathway.data.topic}
                    <ChevronDownIcon />
                  </Badge>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {pathways.map((pathway, index) => (
                    <DropdownMenuItem key={index}>
                      <Link to={`/app/library/pathways/${pathway.data.id}/${lastWord}`} className='flex items-center gap-2 text-sm'>
                        <RouteIcon size={16} />
                        {pathway.data.topic}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Badge variant="outline" className='flex items-center gap-1 text-sm'>
                      {currentView.icon}
                      {currentView.name}
                      <ChevronDownIcon />
                    </Badge>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {Object.keys(viewOptions).map((view) => (
                      <DropdownMenuItem key={view}>
                        <Link to={`/app/library/pathways/${pathwayId}/${view}`} className='flex items-center gap-2 text-sm'>
                          {viewOptions[view].icon}
                          {viewOptions[view].name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <Separator />
      <ScrollArea className="h-full relative">
        <Outlet />
      </ScrollArea>
    </div>
  );
}

export default PathwayPage;
