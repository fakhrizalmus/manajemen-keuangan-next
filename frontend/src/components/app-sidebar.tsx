"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  DollarSign,
  Frame,
  GalleryVerticalEnd,
  Map,
  Menu,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
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
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Pengeluaran",
      url: "#",
      icon: Bot,
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
      icon: BookOpen,
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
      icon: SquareTerminal,
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
          <span className="text-lg font-semibold text-gray-800 dark:text-white">
            Manajemen Keuangan
          </span>
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
