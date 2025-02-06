import { Outlet, useParams, Link, useLocation } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ChevronDownIcon, Library, Clock, Calendar, List, RouteIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGlobal } from '@/components/context/GlobalContext';
import { useEffect, useState } from 'react';
import { Loader } from './LibraryPage';

const viewOptions = {
  timeline: { name: "Timeline View", icon: <Clock size={16} /> },
  calender: { name: "Calendar View", icon: <Calendar size={16} /> },
  tasks: { name: "Tasks View", icon: <List size={16} /> }
};

function PathwayPage() {
  const { pathname } = useLocation();
  const { pathwayId } = useParams();
  const { pathwaysList: pathways, isLoading } = useGlobal();
  const lastWord = pathname.split('/').pop() || "timeline"; // Fallback to a default view

  const [currentView, setCurrentView] = useState(viewOptions[lastWord]);

  useEffect(() => {
    setCurrentView(viewOptions[lastWord] || viewOptions.timeline);
  }, [pathname]);

  const pathway = pathways.find((pathway) => pathway.data.id === pathwayId);

  if (isLoading) {
    return <Loader backdrop="aiChip" />;
  }

  if (!pathway) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-lg text-neutral-500">Pathway not found.</p>
        <Link to="/app/library">
          <Badge variant="outline" className="mt-2">Go back to Library</Badge>
        </Link>
      </div>
    );
  }

  return (
    <div className="text-4xl w-full p-2 h-full rounded-lg flex flex-col">
      <div className="titleBar w-full flex items-center justify-start py-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/app/library">
                  <Badge variant="outline" className="text-sm flex items-center gap-1 p-1">
                    <Library size={16} /> Library
                  </Badge>
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
                  {pathways.map(({ data }) => (
                    <DropdownMenuItem key={data.id}>
                      <Link to={`/app/library/pathways/${data.id}/${lastWord}`} className='flex items-center gap-2 text-sm'>
                        <RouteIcon size={16} />
                        {data.topic}
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
                    {Object.entries(viewOptions).map(([key, { name, icon }]) => (
                      <DropdownMenuItem key={key}>
                        <Link to={`/app/library/pathways/${pathwayId}/${key}`} className='flex items-center gap-2 text-sm'>
                          {icon} {name}
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
