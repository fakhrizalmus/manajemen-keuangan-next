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

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
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
      url: "/home",
      icon: SquareTerminal,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
