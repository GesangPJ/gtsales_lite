// API Ambil data kategori dari database

import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function GET(_req: NextRequest) {
  try {
    const kategoris = await prisma.kategori.findMany({
      select: {
        id: true,
        nama_kategori: true,
        status: true,
      },
    })

    return NextResponse.json(kategoris, { status: 200 })
  } catch (error: unknown) {
    console.error("Data Kategori tidak dapat diambil", error)

    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengambil data kategori" },
      { status: 500 }
    )
  }
}
