// API Ambil data toko dari database

import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function GET(_req: NextRequest) {
  try {
    const tokos = await prisma.toko.findMany()

    return NextResponse.json(tokos, { status: 200 })
  } catch (error: unknown) {
    console.error("Data Kategori tidak dapat diambil", error)

    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengambil data kategori" },
      { status: 500 }
    )
  }
}
