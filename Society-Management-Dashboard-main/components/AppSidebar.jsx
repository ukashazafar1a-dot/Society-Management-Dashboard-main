'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  HomeIcon,
  Users,
  Users2,
  CalendarCheck,
  Bell,
  FileText,
  BarChart2,
  ClipboardList,
  Settings,
  CreditCard,
  ClipboardCheck,
  User2,
  ChevronUp
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'

export const items = [
  { title: "Dashboard", url: "/", icon: HomeIcon },
  { title: "Residents", url: "/residents", icon: Users },
  { title: "Communities", url: "/communities", icon: Users2 },
  { title: "Bookings", url: "/bookings", icon: CalendarCheck },
  { title: "Announcement", url: "/announcements", icon: Bell },
  { title: "Complains", url: "/complaints", icon: FileText },
  { title: "Marketing", url: "/marketing", icon: BarChart2 },
  { title: "Forms", url: "/forms", icon: ClipboardList },
  { title: "Services", url: "/services", icon: ClipboardCheck },
  { title: "Billing", url: "/billing", icon: CreditCard },
  { title: "Settings", url: "/settings", icon: Settings },
];

const AppSidebar = () => {
  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader className='py-4'/>
      
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href='/'>
            <Image src="/logo.png" alt="logo" width={20} height={20}/>
            <span>Society</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>

          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link href={item.url} className="flex items-center gap-2">
                  <item.icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarGroup>
      </SidebarContent>

      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="flex items-center gap-2">
                <User2 className="w-4 h-4"/> umer <ChevronUp className='ml-auto'/>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem>Account</DropdownMenuItem>
              <DropdownMenuItem>Setting</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <SidebarFooter />
    </Sidebar>
  )
}

export default AppSidebar