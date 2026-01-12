// API Status Pembelian Barang
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Ambil status pembelian

export async function GET(_req: NextRequest){

    try{
        const statuspembelian = await prisma.pembelian.findMany({
            select:{
                id:true,
                kode:true,
                status:true,
                nama_vendor:true,
                jumlahtotalharga:true,
            }

        })

    }catch(error){

    }

}



