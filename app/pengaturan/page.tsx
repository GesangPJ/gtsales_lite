import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import DataToko from "./data-toko"

import Link from "next/link"

import { Button } from "@/components/ui/button"

import {SquarePen}  from "lucide-react"

export default function HalamanPengaturan() {

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                    <h1 className="text-2xl font-bold">Detail Toko</h1>
                </div>
              <div className="px-6 lg:px-6">
                <DataToko />
              </div>
              <div className="px-4 lg:px-6">
                <Button size="sm" className="text-sm" >
                    <SquarePen className="h-12 w-12"/>
                    <Link href="/pengaturan/edit-toko">
                    Ubah Data Toko
                    </Link>
                </Button>

              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
