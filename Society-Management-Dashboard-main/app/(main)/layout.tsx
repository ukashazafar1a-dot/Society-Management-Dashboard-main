import AppSidebar from '@/components/AppSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import Navebar from '@/components/Navebar'
import React from 'react'
import { cookies } from "next/headers"

const Mainlayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />

      <div className="flex-1 flex flex-col">
        <Navebar />
        <main className="p-4">{children}</main>
      </div>
    </SidebarProvider>
  )
}

export default Mainlayout