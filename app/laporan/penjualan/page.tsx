// Laporan penjualan Barang 
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { baseUrl } from "@/lib/base-url"
import ChartTopKategori from "./chart-topkategori"
import ChartTopBarang from "./chart-topbarang"
import TabelJumlahbarang from "./tabel-jumlahbarang"
import TabelQtyKategori from "./tabel-qtykategori"



export default async function HalamanLaporanPenjualan() {
    let laporan: any

    try{
        const res = await fetch(`${baseUrl}/api/laporan-penjualan`,
            {next: {revalidate: 60}})

        const data = await res.json()

        laporan = data.penjualan

    }catch(error){
        console.error("Error mengambil laporan penjualan", error)
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
                    <h1 className="text-2xl font-bold">Laporan penjualan</h1>
                </div>
                {/* Baris pertama */}
              <div className="px-6 lg:px-6 grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                <Card className="w-full hover:bg-accent-foreground border-3">
                    <CardHeader>
                        <CardTitle className="text-center text-lg warp-break-words hyphens-auto leading-relaxed">Total Barang Terjual</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h1 className=" text-center font-bold break-all md:wrap-break-words whitespace-pre-wrap leading-relaxed text-4xl text-blue-500">{laporan.totalBarangQty ? `${laporan.totalBarangQty}` : `Tidak ada Data`}</h1>
                        
                    </CardContent>
                </Card>
                <Card className="w-full hover:bg-accent-foreground border-3">
                    <CardHeader>
                        <CardTitle className="text-center text-lg warp-break-words hyphens-auto leading-relaxed">Total Nilai penjualan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h1 className="font-mono text-center text-4xl text-yellow-500 font-bold break-all md:wrap-break-words whitespace-pre-wrap leading-relaxed">
                        {laporan.jmlTotalHarga ?
                        `Rp${parseInt(laporan.jmlTotalHarga).toLocaleString()}`: 'Tidak ada Data'}
                        </h1>
                    </CardContent>
                </Card>
                <Card className="border-3 w-full hover:bg-accent-foreground">
                    <CardHeader>
                        <CardTitle className="text-center text-lg warp-break-words hyphens-auto leading-relaxed">Jumlah Transaksi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2 text-lg">
                            <p className=" text-left w-24">TOTAL</p>
                            <p className="text-center">:</p>
                            <p className="font-bold">{laporan.jmlTransaksiPenjualan ? `${laporan.jmlTransaksiPenjualan}` : 'Tidak ada Data'}</p>
                        </div>
                        <div className="text-lg grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                            <p className="font-medium text-left w-24">CASH</p>
                            <p className="text-center">:</p>
                            <p className="font-bold">{laporan.jmlTransaksiCash ? `${laporan.jmlTransaksiCash}` : `Tidak ada Data`}</p>
                        </div>
                        <div className="text-lg grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                            <p className="font-medium text-left w-24">QRIS</p>
                            <p className="text-center">:</p>
                            <p className="font-bold">{laporan.jmlTransaksiQR ? `${laporan.jmlTransaksiQR}` : `Tidak ada Data`}</p>
                        </div>
                        <div className="text-lg grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                            <p className="font-medium text-left w-24">Transfer</p>
                            <p className="text-center">:</p>
                            <p className="font-bold">{laporan.jmlTransaksiTF ? `${laporan.jmlTransaksiTF}` : `Tidak ada Data`}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-3 w-full hover:bg-accent-foreground">
                    <CardHeader>
                        <CardTitle className="text-center text-lg warp-break-words hyphens-auto leading-relaxed">Total Nilai Transaksi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                            <p className="font-medium text-left w-24">CASH</p>
                            <p className="text-center">:</p>
                            <p className="text-lg font-bold">{laporan.totalNilaiCash ? `Rp${laporan.totalNilaiCash.toLocaleString()}` : `Tidak ada Data`}</p>
                        </div>
                        <div className="text-lg grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                            <p className="font-medium text-left w-24">QRIS</p>
                            <p className="text-center">:</p>
                            <p className=" text-lg font-bold">{laporan.totalNilaiQR ? `Rp${laporan.totalNilaiQR.toLocaleString()}` : `Tidak ada Data`}</p>
                        </div>
                        <div className="text-lg grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                            <p className="font-medium text-left w-24">Transfer</p>
                            <p className="text-center">:</p>
                            <p className="text-lg font-bold">{laporan.totalNilaiTF ? `Rp${laporan.totalNilaiTF.toLocaleString()}` : `Tidak ada Data`}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-3 w-full hover:bg-accent-foreground">
                    <CardHeader>
                        <CardTitle className="text-center text-lg warp-break-words hyphens-auto leading-relaxed">Rata-Rata Nilai Transaksi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h1 className="text-center text-4xl text-green-600 font-bold font-mono">
                            {laporan.rataTotalTransaksi
                            ? `Rp${parseInt(laporan.rataTotalTransaksi).toLocaleString()}`
                            : 'Tidak ada Data'
                            }
                            </h1>
                    </CardContent>
                </Card>
              </div>
              {/* Baris Kedua */}
              <div className="px-6 lg:px-6 grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <ChartTopKategori laporan={laporan}/>
                <ChartTopBarang laporan={laporan}/>
              </div>
              <div className="px-6 lg:px-6 grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <TabelJumlahbarang laporan={laporan}/>
                <TabelQtyKategori laporan={laporan}/>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
