// API Ganti Status Pembelian Barang

import { prisma } from "@/lib/prisma"
import { NextResponse, NextRequest } from "next/server"

// Ambil status pembelian barang
export async function GET(_req: NextRequest){

    try{
        const statuspembelian = await prisma.pembelian.findMany({
            where:{
                status:'DIPESAN',
            },
            select:{
                id:true,
                kode:true,
                status:true,
                createdAt: true,
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




