// API Buat transaksi pembelian

import { prisma } from "@/lib/prisma"
import { NextResponse, NextRequest } from "next/server"

export async function POST(req: Request){
    try{
        const body = await req.json()

        const { namavendor, barang, totalharga, biayakirim, jumlahtotalharga } = body

        if (!barang || barang.length === 0) {
            return NextResponse.json({ error: "Data Barang Kosong!" }, { status: 400 })
        }

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
                biayakirim,
                status:status_pembelian,
                jumlahtotalharga: parseInt(jumlahtotalharga || totalharga || '0'),
                pembeliandetail:{
                    create: barang.map((barang: any)=>({
                        barangId: barang.id,
                        jumlah: barang.jumlah,
                        hargabeli: barang.harga_beli,
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

// Ambil data transaksi pembelian barang
export async function GET(_req: NextRequest){

    try{
        const statuspembelian = await prisma.pembelian.findMany({
            select:{
                id:true,
                kode:true,
                status:true,
                nama_vendor:true,
                createdAt:true,
                biayakirim:true,
                jumlahtotalharga:true,
            },
        })

        if(statuspembelian.length === 0){
            return NextResponse.json({ 
                    success: false, 
                    message: "Data Pembelian tidak ditemukan" 
                }, {status: 404})
        }

        return NextResponse.json({ 
                    success: true, 
                    data: statuspembelian, 
                    message: "Data Pembelian berhasil diambil" 
                }, {status: 200})

    }catch(error){
        console.error("Error mengambil data pembelian", error)
        return NextResponse.json(
        { error: "Gagal mengambil data pembelian" }, 
        { status: 500 }
        )

    }

}



