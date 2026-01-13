// API Status Pembelian Barang
import { prisma } from "@/lib/prisma"
import { NextResponse, NextRequest } from "next/server"

// Ambil status pembelian barang
export async function GET(_req: NextRequest){

    try{
        const statuspembelian = await prisma.pembelian.findMany({
            select:{
                id:true,
                kode:true,
                status:true,
                nama_vendor:true,
                biayakirim:true,
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

// Update status pembelian barang
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: "ID dan status kosong" },
        { status: 400 }
      )
    }

    const pembelian = await prisma.pembelian.findUnique({
      where: { id: parseInt(id) }
    })

    if (!pembelian) {
      return NextResponse.json(
        { success: false, message: "Data Pembelian tidak ditemukan di database!" },
        { status: 404 }
      )
    }

    const updated = await prisma.pembelian.update({
      where: { id: parseInt(id) },
      data: { status },
    })

    return NextResponse.json({
      success: true,
      data: updated,
      message: "Status pembelian berhasil diupdate"
    }, {status:201})
  } catch (error) {
    console.error("Update error:", error)
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    )
  }
}



