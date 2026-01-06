"use client"

import * as React from "react"
import {
  IconCategoryPlus,
  IconDatabaseDollar,
  IconDatabase,
  IconCashRegister,
  IconFileWord,
  IconBuildingWarehouse,
  IconHelp,
  IconTruckLoading,
  IconAppsFilled,
  IconCubePlus,
  IconReport,
  IconPackages,
  IconSettings,
  IconStack3,
  IconDatabaseExport,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Kasir",
      url: "/",
      icon: IconCashRegister,
      isActive: true,
    },
    {
      title: "Data Penjualan",
      url: "/data-penjualan",
      icon: IconDatabaseDollar,
    },
    
    
  ],
  navTambah:[
    {
      title: "Data Barang",
      url: "/daftar-barang",
      icon: IconPackages,
    },
    {
      title: "Tambah Barang",
      url: "/tambah-barang",
      icon: IconCubePlus,
    },
    
    {
      title: "Stok Barang",
      url: "/stok-barang",
      icon: IconStack3,
    },
    {
      title: "Kategori Barang",
      url: "/kategori-barang",
      icon: IconCategoryPlus,
    },

  ],
  navVendor:[
    {
      title: "Data Vendor",
      url: "/data-vendor",
      icon: IconBuildingWarehouse,
    },
    {
      title: "Tambah Vendor",
      url: "/tambah-vendor",
      icon: IconCubePlus,
    },
    {
      title: "Data Pembelian",
      url: "/daftar-pembelian",
      icon: IconDatabaseExport,
    },
    {
      title: "Pembelian Barang",
      url: "/tambah-pembelian",
      icon: IconTruckLoading,
    },

  ],
  navSecondary: [
    
    {
      title: "Pengaturan",
      url: "/pengaturan",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
}

import { AppInfo } from "./app-info"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.8"
            >
              <a href="/">
                <IconAppsFilled size={64} />
                <span className="text-base font-semibold">GTSALES LITE </span>
                <AppInfo/>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarSeparator />
        <NavMain items={data.navMain} />
        <SidebarSeparator />
        {/* <span className="px-2">Barang</span> */}
        <NavSecondary items={data.navTambah} className="mt-10px" />
         <SidebarSeparator />
         <NavSecondary items={data.navVendor} className="mt-10px" />
          <SidebarSeparator />
        <NavDocuments items={data.documents} />
         <SidebarSeparator />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
