import React from 'react';
import { Outlet, useParams, Link, useLocation } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ChevronDownIcon, Library, Clock, Calendar, Pencil, List, RouteIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function PathwayPage() {
  const { pathwayId } = useParams();
  const { pathname } = useLocation();  

  const lastWord = pathname.split('/').pop();
  const viewOptions = {
    timeline: {
      name: "Timeline View",
      icon: <Clock size={16}/>
    },
    calender: {
      name: "Calender View",
      icon: <Calendar size={16}/>
    },
    create: {
      name: "Create Pathway",
      icon: <Pencil size={16}/>
    },
    tasks: {
      name: "Tasks View",
      icon: <List size={16}/>
    }
  }
  const currentView = viewOptions[lastWord];

  const pathways = [
    {
      id: 1,
      name: "Basic React",
    },
    {
      id: 2,
      name: "Advanced React",
    },
    {
      id: 3,
      name: "Full Stack React",
    },
  ];

  return (
    <div className="text-4xl w-full p-2 h-full rounded-lg">
      <div className="titleBar w-full items-center justify-start flex-row py-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/app/library">
                  <Badge variant="outline" className="text-sm flex items-center gap-1 p-1"><Library  size={16}/> Library</Badge>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Badge variant="outline" className="text-sm flex items-center gap-1">
                    <RouteIcon size={16}/>
                    {pathways[pathwayId - 1].name}
                    <ChevronDownIcon />
                  </Badge>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {pathways.map((pathway) => (
                    <DropdownMenuItem key={pathway.id}>
                      <Link to={`/app/library/pathways/${pathway.id}/timeline`} className='flex items-center gap-2 text-sm'>
                        <RouteIcon size={16}/>
                        {pathway.name}
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
      <Separator/>
      <Outlet />
    </div>
  );
}

export default PathwayPage;
