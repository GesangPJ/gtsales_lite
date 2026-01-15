// Halaman detail transaksi penjualan

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { baseUrl } from '@/lib/base-url'
import { DataTable } from "@/components/data-table"
import {columns} from "./kolom-detail-transaksi"
import { formatTanggal } from "@/lib/formattanggal"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {ArrowLeft} from "lucide-react"

interface PageProps {
    params: Promise<{ id: string }>
  }

export default async function HalamanDetailpenjualan( {params }: PageProps){

  const { id } = await params
  let penjualan = null
  let detailBarang = []

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value)

  try{
    const response = await fetch(`${baseUrl}/api/detail-transaksi?id=${id}`, {
      next: { revalidate: 120 } 
    })

    if (!response.ok) {
      throw new Error('Gagal ambil data')
    }

    const result = await response.json()
    penjualan = result.data
    detailBarang = penjualan?.transaksidetail || []


  }catch(error){
    console.error('Error:', error)
  }

  if (!penjualan) {
    return <div className="p-8 text-center">Data penjualan tidak ditemukan!</div>
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
                <h1 className="text-xl font-bold">Detail penjualan : {penjualan.kode}</h1>
                <div className="space-y-2 mt-3 mb-5">
                    <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                        <p className="font-medium text-left w-32">Tanggal</p>
                        <p className="text-center">:</p>
                        <p>{formatTanggal(penjualan.createdAt)}</p>
                    </div>
                    <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                        <p className="font-medium text-left w-32">Status</p>
                        <p className="text-center">:</p>
                        <p>{penjualan.status}</p>
                    </div>
                    <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                        <p className="font-medium text-left w-32">Metode Pembayaran</p>
                        <p className="text-center">:</p>
                        <p>{penjualan.metode}</p>
                    </div>
                    <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                        <p className="font-medium text-left w-32">Diskon</p>
                        <p className="text-center">:</p>
                        <p>{penjualan.diskon}</p>
                    </div>
                    <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                        <p className="font-medium text-left w-32">Jumlah Total</p>
                        <p className="text-center">:</p>
                        <p>{formatRupiah(penjualan.jumlahTotal)}</p>
                    </div>
                    <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                        <p className="font-medium text-left w-32">Keterangan</p>
                        <p className="text-center">:</p>
                        <p>{penjualan.keterangan}</p>
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
                  <Link href='/data-penjualan'>
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

