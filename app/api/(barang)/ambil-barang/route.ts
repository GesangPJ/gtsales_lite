// API Ambil data kategori dari database

import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function GET(_req: NextRequest) {
  try {
    const barangs = await prisma.barang.findMany({
      select: {
        id: true,
        nama_barang: true,
        harga_jual: true,
        harga_beli: true,
        stok: true,
        status: true,
      },
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
