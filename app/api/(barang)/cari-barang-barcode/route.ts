// API Ambil data barang berdasarkan barcode

import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function GET(req: NextRequest) {

  try {

    const body = await req.json()
    const barcodebarang = body as string

    if(!barcodebarang){
        return NextResponse.json(
        { error: "data barcode kosong!" },
        { status: 400 }
      )
    }

    const barangs = await prisma.barang.findFirst({
      where:{
        barcode: barcodebarang,
      },
      select:{
        id: true,
        nama_barang:true,
        harga_jual:true,
      }
    })

    return NextResponse.json(barangs, { status: 200 })
  } catch (error: unknown) {
    console.error("Data Barang tidak dapat diambil", error)

    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengambil data barang" },
      { status: 500 }
    )
  }
}
