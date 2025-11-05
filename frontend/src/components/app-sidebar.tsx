"use client"

import * as React from "react"
import {
  DollarSign,
  LayoutDashboard,
  Menu,
  TrendingDown,
  TrendingUp,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { infoLogin } from "@/app/(auth)/actions"
import Image from "next/image";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Pengeluaran",
      url: "#",
      icon: TrendingDown,
      items: [
        {
          title: "Data Pengeluaran",
          url: "/pengeluaran/data-pengeluaran",
          icon: DollarSign
        },
        {
          title: "Kategori Pengeluaran",
          url: "/pengeluaran/kategori-pengeluaran",
          icon: Menu
        },
      ],
    },
    {
      title: "Pemasukan",
      url: "#",
      icon: TrendingUp,
      items: [
        {
          title: "Data Pemasukan",
          url: "/pemasukan/data-pemasukan",
          icon: DollarSign
        },
        {
          title: "Kategori Pemasukan",
          url: "/pemasukan/kategori-pemasukan",
          icon: Menu
        },
      ],
    },
  ],
  projects: [
    {
      name: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [infoUser, setInfoUser] = React.useState<{
    email: string
    name: string
    id: number
  } | null>(null);
  const infologin = async () => {
    try {
      const res = await infoLogin()
      setInfoUser(res.data)
    } catch (error) {
      throw error
    }
  }
  React.useEffect(() => {
    infologin();
  }, []);
  console.log(infoUser);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={40}
            height={40}
            priority />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {infoUser && <NavUser user={infoUser} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
