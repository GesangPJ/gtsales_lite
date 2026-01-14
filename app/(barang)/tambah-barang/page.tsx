import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import FormTambahBarang from "./form-tambahbarang"
import { Form } from "lucide-react"

export default function HalamanTambahBarang() {
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
                    <h1 className="text-2xl font-bold mb-4">Tambah Barang</h1>
                    <FormTambahBarang />
                </div>
             
              <div className="grid w-full max-w-sm gap-6">

              </div>
              
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
