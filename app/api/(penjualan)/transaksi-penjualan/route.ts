// API Transaksi penjualan

import { prisma } from "@/lib/prisma"
import { NextResponse, NextRequest } from "next/server"

export async function POST(req: Request){

    try{
        const body = await req.json()

        const{ 
            barang, 
            status_transaksi,
            metode_transaksi,
            diskon_transaksi,
            keterangan,
            jumlahtotal} = body

        if(!barang || barang.length === 0){
            return NextResponse.json({error: "Data barang kosong!"}, {status: 400})
        
        }

        const kalender = new Date()
        const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
        const bulan = monthNames[kalender.getMonth()]
        const tahun = kalender.getFullYear()

        const lastPenjualan = await prisma.transaksi.findFirst({
            where:{
                createdAt:{
                    gte: new Date(tahun, kalender.getMonth(), 1),
                    lte: new Date(tahun, kalender.getMonth()+1, 0),
                },
            },
            orderBy:{
                createdAt: 'desc',
            },
        })

        let kodeBaru = '00001'
        // let status_transaksi = ''

        if(lastPenjualan && lastPenjualan.kode){
            const lastDate = new Date(lastPenjualan.createdAt)
            const lastBulan = monthNames[lastDate.getMonth()]
            const lastTahun = lastDate.getFullYear()

            if(bulan === lastBulan && tahun === lastTahun){
                const match = lastPenjualan.kode.match(/\/(\d{5})$/)

                if(match){
                    const lastAngka = parseInt(match[1], 10)
                    if(!isNaN(lastAngka)){
                        kodeBaru = (lastAngka +1).toString().padStart(5, '0')
                    }

                }
            }          
        }

        const kodePenjualan = `GT/SALES/${tahun}${bulan}/${kodeBaru}`

        const result = await prisma.$transaction(async (tx) => {
            // Buat transaksi + detail transaksi
            const buatTransaksi = await tx.transaksi.create({
                data: {
                kode: kodePenjualan,
                status: status_transaksi,
                metode: metode_transaksi,
                diskon: diskon_transaksi,
                keterangan,
                jumlahTotal: parseInt(jumlahtotal),
                transaksiDetails: {
                    create: barang.map((barang: any) => ({
                    barangId: barang.id,
                    jumlah: barang.jumlah,
                    harga: barang.harga_jual,
                    total: barang.harga_jual * barang.jumlah,
                    })),
                }
                }
            })

            // Kurangi stok barang
            for (const item of barang) {
                await tx.barang.update({
                where: { id: item.id },
                data: {
                    stok: {
                    decrement: parseInt(item.jumlah)
                    }
                }
                })
            }

            return buatTransaksi
        })

        return NextResponse.json({
            success: true,
            data: result,
            message: "Transaksi Penjualan berhasil dibuat"
        }, {status: 201})


    }catch(error){
        console.error("Error membuat transaksi", error)
        return NextResponse.json(
        { error: "Gagal membuat transaksi penjualan" }, 
        { status: 500 }
        )
    }

}


export async function GET(_req: NextRequest){

    try{
        const penjualan = await prisma.transaksi.findMany({
            select:{
                id:true,
                kode:true,
                status:true,
                metode: true,
                diskon: true,
                keterangan:true,
                jumlahTotal:true,
            }
        })

        if(penjualan.length === 0){
            return NextResponse.json({
                success: false,
                message:"Data Pembelian kosong",   
            }, {status: 404})
        }

        return NextResponse.json({
            success:true,
            data: penjualan,
            message: "Data penjualan diambil"
        }, {status:200})


    }catch(error){
        console.error("Error mengambil data penjualan", error)
        return NextResponse.json(
        { error: "Gagal mengambil data penjualan" }, 
        { status: 500 }
        )
    }
}





