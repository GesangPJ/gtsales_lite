// API Ambil data kategori dari database

import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
 const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")
  try {
    if (!id) {

      return NextResponse.json({ error: "Id produk kosong" }, { status: 400 })
    }

    const detail_barangs = await prisma.barang.findUnique({
      where: { id: parseInt(id) },

      // termasuk kategori dan user
      include: {
        kategori:{select:{nama_kategori:true}},
        vendor:{select:{nama:true}},
      },
    })

    if(!detail_barangs){
      return NextResponse.json({ error: "Data tidak ditemukan" }, { status: 404 })
    }

    const formatDetailBarang = {
        ...detail_barangs,
        createdAt: detail_barangs.createdAt.toISOString(),
        updatedAt: detail_barangs.updatedAt.toISOString(),
        kadaluarsa: detail_barangs.kadaluarsa ? detail_barangs.kadaluarsa.toISOString() : null,
        kategori: detail_barangs.kategori ? detail_barangs.kategori : null,
        vendor: detail_barangs.vendor ? detail_barangs.vendor : null,
    }


    return NextResponse.json(formatDetailBarang, { status: 200 })
  } catch (error: unknown) {
    console.error("Data Detail Barang tidak dapat diambil", error)

    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengambil data detail barang" },
      { status: 500 }
    )
  }
}
