// Laporan Pembelian Barang 
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



export default async function HalamanLaporanPembelian() {
    let laporan: any

    try{
        const res = await fetch(`${baseUrl}/api/laporan-pembelian`,
            {next: {revalidate: 60}})

        const data = await res.json()

        laporan = data.summary

    }catch(error){
        console.error("Error mengambil laporan pembelian", error)
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
                    <h1 className="text-2xl font-bold">Laporan Pembelian</h1>
                </div>
                {/* Baris pertama */}
              <div className="px-6 lg:px-6 grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                <Card className="w-full hover:bg-accent-foreground">
                    <CardHeader>
                        <CardTitle className="text-center text-xl warp-break-words hyphens-auto leading-relaxed">Total Barang Pembelian</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2 text-lg">
                            <p className=" text-left w-24">SELESAI</p>
                            <p className="text-center">:</p>
                            <p>{laporan.totalBarangQty ? `${laporan.totalBarangQty}` : 'Tidak ada Data'}</p>
                        </div>
                        <div className="text-lg grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                            <p className="font-medium text-left w-24">DIPESAN</p>
                            <p className="text-center">:</p>
                            <p>{laporan.totalBarangDipesan ? `${laporan.totalBarangDipesan}` : `Tidak ada Data`}</p>
                        </div>
                        <div className="text-lg grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                            <p className="font-medium text-left w-24">BATAL</p>
                            <p className="text-center">:</p>
                            <p>{laporan.totalBarangBatal ? `${laporan.totalBarangBatal}` : `Tidak ada Data`}</p>
                        </div>
                        
                    </CardContent>
                </Card>
                <Card className="w-full hover:bg-accent-foreground">
                    <CardHeader>
                        <CardTitle className="text-center text-xl warp-break-words hyphens-auto leading-relaxed">Total Nilai Pembelian</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h1 className="text-center text-xl font-bold break-all md:break-words whitespace-pre-wrap leading-relaxed">
                        {laporan.totalJumlahTotalHarga ?
                        `Rp${parseInt(laporan.totalJumlahTotalHarga).toLocaleString()}`: 'Tidak ada Data'}
                        </h1>
                    </CardContent>
                </Card>
                <Card className="w-full hover:bg-accent-foreground">
                    <CardHeader>
                        <CardTitle className="text-center text-xl warp-break-words hyphens-auto leading-relaxed">Total Transaksi Pembelian</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                            <p className="font-medium text-left w-24">SELESAI</p>
                            <p className="text-center">:</p>
                            <p>{laporan.jmlTransaksi ? `${laporan.jmlTransaksi}` : `Tidak ada Data`}</p>
                        </div>
                        <div className="text-lg grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                            <p className="font-medium text-left w-24">DIPESAN</p>
                            <p className="text-center">:</p>
                            <p>{laporan.jmltransaksiDipesan ? `${laporan.jmltransaksiDipesan}` : `Tidak ada Data`}</p>
                        </div>
                        <div className="text-lg grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
                            <p className="font-medium text-left w-24">BATAL</p>
                            <p className="text-center">:</p>
                            <p>{laporan.jmltransaksiBatal ? `${laporan.jmltransaksiBatal}` : `Tidak ada Data`}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="w-full hover:bg-accent-foreground">
                    <CardHeader>
                        <CardTitle className="text-center text-xl warp-break-words hyphens-auto leading-relaxed">Total Biaya Kirim</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h1 className="text-center text-xl font-bold">
                            {laporan.totalBiayaKirim ? `Rp${parseInt(laporan.totalBiayaKirim).toLocaleString()}`:'Tidak ada Data' }
                            </h1>
                    </CardContent>
                </Card>
                <Card className="w-full hover:bg-accent-foreground">
                    <CardHeader>
                        <CardTitle className="text-center text-xl warp-break-words hyphens-auto leading-relaxed">Rata-Rata Nilai Pembelian</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h1 className="text-center text-xl font-bold">
                            {laporan.rataTotalPerTransaksi 
                            ? `Rp${parseInt(laporan.rataTotalPerTransaksi).toLocaleString()}`
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
