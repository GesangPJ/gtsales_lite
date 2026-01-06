import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { DataTable } from "@/components/data-table"
import { columns } from "./column"
import {prisma} from '@/lib/prisma'

type Kategori = {
  id: number
  nama_kategori: string
  status: string
}

async function getKategoris(): Promise<Kategori[]> {
  try {
    return await prisma.kategori.findMany({
      select: {
        id: true,
        nama_kategori: true,
        status: true,
      },
    })
  } catch (error) {
    console.error("Data Kategori tidak dapat diambil", error)
    return []
  }
}

export default async function HalamanKategori() {
  const kategoris = await getKategoris()

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
                <h1 className="text-2xl font-bold">
                  Kategori Barang
                </h1>
              </div>

              <div className="px-4 lg:px-6">
                <DataTable
                  columns={columns}
                  data={kategoris}
                />
              </div>

            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}