import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { StokBarang } from "./stok-column"
import TabelStokBarang from "./tabel-stok"
import { baseUrl } from "@/lib/base-url"


export default async function HalamanStokBarang() {

  const res = await fetch(`${baseUrl}/api/update-stok`, {
    cache: "force-cache",
    next: { revalidate: 10 },
  })

  const json = await res.json()
  
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
                    <h1 className="text-2xl font-bold">Edit Stok Barang</h1>
                </div>
             
              <div className="px-4 lg:px-6">
                <TabelStokBarang initialData={json.data ?? []} />
              
              </div>
              
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
