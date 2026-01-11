// API Buat transaksi pembelian

import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request){
    try{
        const body = await req.json()

        const {namavendor, barang, totalharga}= body

        const nama_vendor = namavendor

        const kalender = new Date()
        const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
        const bulan = monthNames[kalender.getMonth()]
        const tahun = kalender.getFullYear()

        // Mengambil nomor urut terakhir dari pembelian bulan dan tahun ini
        const lastPembelian = await prisma.pembelian.findFirst({
        where: {
            createdAt: {
            gte: new Date(tahun, kalender.getMonth(), 1),
            lte: new Date(tahun, kalender.getMonth() + 1, 0),
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
        })

        let newNumber = '00001'
        let status_pembelian = 'DIPESAN'

        // Reset nomor seri jika masuk bulan baru

        if (lastPembelian && lastPembelian.kode) {
        // Cek bulan sama
        const lastDate = new Date(lastPembelian.createdAt)
        const lastBulan = monthNames[lastDate.getMonth()]
        const lastTahun = lastDate.getFullYear()
        
            if (bulan === lastBulan && tahun === lastTahun) {
                // Extract angka 5 digit dari kode, contoh : (GT/PURCHASE/2026JAN/00001)
                const match = lastPembelian.kode.match(/\/(\d{5})$/)  // ✅ Regex safe
                
                if (match) {
                const lastNumber = parseInt(match[1], 10)  // 00001 → 1
                    if (!isNaN(lastNumber)) {
                        newNumber = (lastNumber + 1).toString().padStart(5, '0')  // 00002
                    }
                }
            }
        }
        const kode_pembelian = `GT/PURCHASE/${tahun}${bulan}/${newNumber}`
        const buatPembelian = await prisma.pembelian.create({
            data:{
                kode:kode_pembelian,
                nama_vendor,
                status:status_pembelian,
                jumlahtotalharga:totalharga,
                pembeliandetail:{
                    create: barang.map((barang: any)=>({
                        barangId: barang.id,
                        jumlah: barang.jumlah,
                        hargabeli: barang.harga,
                        total: barang.total,
                    })),
                }
            }
        })
        return NextResponse.json(
                { 
                    success: true, 
                    data: buatPembelian, 
                    message: "Pembelian berhasil dibuat" 
                }, 
                { status: 201 })
    }catch(error){
        console.error("Error membuat pembelian", error)
        return NextResponse.json(
        { error: "Gagal membuat pembelian" }, 
        { status: 500 }
        )
    }
}



