"use client"

import {
  BadgeCheck,
  ChevronsUpDown,
  LogOut,
  ChartSpline,
  Settings as CogIcon
} from "lucide-react"

import { Link } from "react-router-dom"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import ModeToggle from '../originUi/mode-toggle.jsx';
import React, { useEffect, useState } from "react";
import { auth, db } from "@/Firebase/firebase"; // Assuming you have your firebase config
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext.jsx"

export function NavUser({user}) {
  const { isMobile } = useSidebar();
  const { setUser } = useGlobal();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        console.log("User logged out");
        setUser(null); // Clear user details
        navigate("/"); // Navigate to the login page after logout
      })
      .catch((error) => {
        console.error("Error logging out: ", error.message);
      });
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {user ? (
                <>
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.username} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.username}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </>
              ) : (
                <div>Loading...</div>  // Show loading or fallback message
              )}
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              {user ? (
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.username} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.username}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              ) : (
                <div>Loading...</div>  // Show loading or fallback message
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <ModeToggle />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                <Link to="/app/profile">Account</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CogIcon />
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              <a onClick={handleLogout}>Log out</a>
              
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
