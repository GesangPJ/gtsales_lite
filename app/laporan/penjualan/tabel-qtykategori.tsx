
// Komponen Tabel Top 5 Kategori per QTY

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
  qtyPerKategori: Record<string, number>
}

export default function TabelQtyKategori({laporan}:{laporan: LaporanSummary}){

    // Ambil 5 kategori jumlah qty terbanyak
    const topKategoriData = Object.entries(laporan.qtyPerKategori || {})
    .map(([kategori, nilai]: [string, number]) => ({ kategori, nilai }))
    .sort((a, b) => b.nilai - a.nilai)
    .slice(0, 5)

    if(topKategoriData.length===0){
        return(
            <Card>
                <CardHeader>
                <CardTitle>Top 5 Kategori</CardTitle>
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
                    Top 5 Kategori
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader className="bg-secondary hover:bg-accent-foreground">
                        <TableRow>
                            <TableHead className="text-lg max-w-14">Nama Kategori</TableHead>
                            <TableHead className="text-lg max-w-14">Jumlah</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {topKategoriData.map(({kategori, nilai}, index) => (
                        <TableRow key={`${kategori}-${index}`} className="hover:bg-muted/50">
                            <TableCell className="font-bold wrap-break-words max-w-14">
                            {kategori}
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












