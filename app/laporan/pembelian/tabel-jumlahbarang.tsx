// Komponen Tabel Jumlah Barang Pembelian per Nama Barang

"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface LaporanSummary {
  qtyPerBarang: Record<string, number>
}

export default function TabelJumlahbarang( {laporan} : {laporan: LaporanSummary }){

    const totalBarang = Object.keys(laporan.qtyPerBarang || {}).length

    // Ambil 5 barang jumlah pembelian terbanyak
    const topBarangData = Object.entries(laporan.qtyPerBarang || {})
    .map(([barang, nilai]: [string, number]) => ({ barang, nilai }))
    .sort((a, b) => b.nilai - a.nilai)
    .slice(0, 5)


    if (topBarangData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top 5 Barang</CardTitle>
        </CardHeader>
        <CardContent className="p-8 text-center text-muted-foreground">
          Belum ada data pembelian
        </CardContent>
      </Card>
    )
  }

    return(
        <Card>
            <CardHeader>
                <CardTitle className="warp-break-words text-center text-xl font-bold">
                    Top 5 Barang
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table className="">
                    <TableCaption>Top 5 dari {totalBarang} barang dibeli</TableCaption>
                    <TableHeader className="bg-secondary hover:bg-accent-foreground">
                        <TableRow>
                            <TableHead className="text-lg max-w-14">Nama Barang</TableHead>
                            <TableHead className="text-lg max-w-14">Jumlah</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        
                        {topBarangData.map(({ barang, nilai }, index) => (
                        <TableRow key={`${barang}-${index}`} className="hover:bg-muted/50">
                            <TableCell className="font-bold wrap-break-words max-w-14">
                            {barang}
                            </TableCell>
                            <TableCell className=" font-bold text-base">
                            {nilai}
                            </TableCell>
                        </TableRow>
                        ))}
                    
                    </TableBody>
                </Table>
            </CardContent>

        </Card>
    )



}





