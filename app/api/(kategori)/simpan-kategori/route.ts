// API menyimpan kategori barang

import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { nama_kategori } = body

    if (!nama_kategori) {
      return NextResponse.json(
        { error: "Nama kategori wajib diisi" },
        { status: 400 }
      )
    }

    const kategori = await prisma.kategori.create({
      data: {
        nama_kategori,
        status: "AKTIF",
      },
    })

    return NextResponse.json(kategori, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Gagal menyimpan kategori" },
      { status: 500 }
    )
  }
}




