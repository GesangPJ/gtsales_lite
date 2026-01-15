// API Update stok barang

import { prisma } from "@/lib/prisma"
import { NextResponse, NextRequest } from "next/server"
import { revalidatePath } from "next/cache"

export async function GET(_req: NextRequest){

    try{
        const datastok = await prisma.barang.findMany({
            select:{
                id:true,
                nama_barang:true,
                stok:true,
            }
        })

        if(!datastok){
            return NextResponse.json({
                success:false,
                message:"Tabel Barang Kosong!"
            }, {status:404})
        }

        return NextResponse.json(
        {
            success:true,
            data: datastok,
            message:"Data Stok barang berhasil diambil!"
        },
        {status: 201})

    }catch(error){
        console.error("Update error:", error)
        return NextResponse.json(
        { success: false, message: "Server error" },
        { status: 500 }
        )
    }
}

export async function PUT(req: NextRequest){

    try{
        const body = await req.json()

        const {id, stokbarang} = body

        if(!id || !stokbarang){
            console.log(`Data ID / Stok Kosong!`)
            return NextResponse.json({
                success: false,
                message:"Data ID / Stok Kosong!"}, {status: 400})
        }

        const cekbarang = await prisma.barang.findUnique({
            where:{id: parseInt(id)},
        })

        if(!cekbarang){
            console.log(`Barang dengan ID : ${id} tidak ditemukan!`)
            return NextResponse.json({
                success:false,
                message:"ID Barang tidak ditemukan!",},
                {status:404})
        }

        const UpdateStok = await prisma.barang.update({
            where:{id: parseInt(id),},
            data:{stok:parseInt(stokbarang)}
        })

        revalidatePath("/stok-barang")
        console.log(`Stok barang ${id} diupdate`)
        return NextResponse.json(
            {
                success: true,
                data:UpdateStok,
                message: "Stok Barang berhasil diupdate!"
            },{status: 201}
        )

    }catch(error){
        console.error("Update error:", error)
        return NextResponse.json(
        { success: false, message: "Server error" },
        { status: 500 }
        )
    }


}








