// API ambil barang untuk POS

import { prisma } from "@/lib/prisma"
import { NextResponse, NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('q')

  if (!query || query.length < 2) {
    return NextResponse.json([], { status: 400 })
  }
  
  try {
    const barangs = await prisma.barang.findMany({
      where: {
        nama_barang: {
          contains: query,  // LIKE '%laptop%'
        }
      },
      select: {
        id: true,
        nama_barang: true,
        harga_jual: true,
        harga_beli: true,
        stok: true,
      },
      take: 10  // Max 10 hasil
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
