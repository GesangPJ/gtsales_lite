import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import {prisma} from '@/lib/prisma'
import { Prisma } from "@/generated/prisma/client"



type Toko = Prisma.TokoGetPayload<{
  select: {
  id : true
  nama : true
  alamat : true
  notelp : true
  email : true
  npwp : true
  pkp_status : true
  siup : true
  ppn : true
  }
}>

import FormEditToko from "./form-edit"

async function getToko(): Promise<Toko[]> {
  try{
    return await prisma.toko.findMany({
      where: {id: 1},
      select: {
        id : true,
        nama : true,
        alamat : true,
        notelp : true,
        email : true,
        npwp : true,
        pkp_status : true,
        siup : true,
        ppn : true,
      },
    })
  } catch (error) {
    console.error("Data Toko tidak dapat diambil", error)
    return []
  }
}

export default async function HalamanEditToko() {

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
                    <h1 className="text-2xl font-bold">Ubah Data Toko</h1>
                </div>
              <div className="px-4 lg:px-6">
                <FormEditToko />
              </div>
              
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
