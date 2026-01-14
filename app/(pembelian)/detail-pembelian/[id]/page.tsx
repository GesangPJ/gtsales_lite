// Halaman detail pembelian barang
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { baseUrl } from '@/lib/base-url'
import { DataTable } from "@/components/data-table"
import {columns} from "./kolom-detail-pembelian"
import { formatTanggal } from "@/lib/formattanggal"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {ArrowLeft} from "lucide-react"

interface PageProps {
    params: Promise<{ id: string }>
  }

export default async function HalamanDetailPembelian( {params }: PageProps){

  const { id } = await params
  let pembelian = null
  let detailBarang = []

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value)

  try{
    const response = await fetch(`${baseUrl}/api/detail-pembelian?id=${id}`, {
      next: { revalidate: 120 }  // Cache 1 menit
    })

    if (!response.ok) {
      throw new Error('Gagal ambil data')
    }

    const result = await response.json()
    pembelian = result.data
    detailBarang = pembelian?.pembeliandetail || []


  }catch(error){
    console.error('Error:', error)
  }

  if (!pembelian) {
    return <div className="p-8 text-center">Data Pembelian tidak ditemukan!</div>
  }
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
                <h1 className="text-xl font-bold">Detail Pembelian : {pembelian.kode}</h1>
                <div className="space-y-2 mt-3 mb-5">
                    <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                        <p className="font-medium text-left w-32">Tanggal Pembelian</p>
                        <p className="text-center">:</p>
                        <p>{formatTanggal(pembelian.createdAt)}</p>
                    </div>
                    <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                        <p className="font-medium text-left w-32">Status Pembelian</p>
                        <p className="text-center">:</p>
                        <p>{pembelian.status}</p>
                    </div>
                    <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                        <p className="font-medium text-left w-32">Vendor</p>
                        <p className="text-center">:</p>
                        <p>{pembelian.nama_vendor}</p>
                    </div>
                    <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                        <p className="font-medium text-left w-32">Jumlah Total</p>
                        <p className="text-center">:</p>
                        <p>{formatRupiah(pembelian.jumlahtotalharga)}</p>
                    </div>
                </div>

                <h1 className="text-2xl font-bold mt-3 mb-1">Tabel Barang :</h1>
                
                <div className="mt-3">
                  <DataTable
                  columns={columns}
                  data={detailBarang}
                  />
                  
                </div>

                <Button asChild size="lg" variant="default" className="mt-3">
                  <Link href='/daftar-pembelian'>
                  <ArrowLeft/>
                  Kembali</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
















