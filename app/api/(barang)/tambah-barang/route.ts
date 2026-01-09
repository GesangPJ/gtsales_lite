// API menyimpan data barang

import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { nama_barang, 
            hargajual, 
            hargabeli,
            idkategori,
            keterangan,
            stokbarang,
            barcodebarang,
         } = body

    if (!nama_barang || !hargabeli || !hargajual) {
      return NextResponse.json(
        { error: "Ada data yang kosong!" },
        { status: 400 }
      )
    }

    const harga_beli = parseInt(hargabeli as string)
    const harga_jual = parseInt(hargajual as string)
    const kategoriId = parseInt(idkategori as any)
    const stok = parseInt(stokbarang)
    const barcode = barcodebarang as string

    const barang = await prisma.barang.create({
      data: {
        nama_barang,
        harga_jual,
        harga_beli,
        stok,
        barcode,
        kategoriId,
        keterangan,
      },
    })

    console.log("Barang berhasil ditambahkan 🎉")
    return NextResponse.json(barang, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Gagal menyimpan data barang" },
      { status: 500 }
    )
  }
}




