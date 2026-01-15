// API ambil detail transaksi penjualan

import { prisma } from "@/lib/prisma"
import { NextResponse, NextRequest } from "next/server"

export async function GET(req: NextRequest){
    const query = req.nextUrl.searchParams.get('id')

    if (!query){
        return NextResponse.json([], { status: 400 })
    }

    try{
        const datapenjualan = await prisma.transaksi.findUnique({
            where:{id:parseInt(query)},
            include:{
                transaksiDetails:{
                    select:{
                        id:true,
                        barangId:true,
                        harga:true,
                        jumlah:true,
                        total:true,
                        barangs:{
                            select:{
                                nama_barang:true,
                            }
                        }
                    }
                }
            }
        })

        if(!datapenjualan){
            console.log("Data Detail transaksi tidak ditemukan")
            return NextResponse.json({success:false}, {status: 404})
           
        }

        const hasil = {
            ...datapenjualan,
            transaksidetail: datapenjualan.transaksiDetails.map(detail=>({
                id: detail.id,
                barandId: detail.barangId,
                nama_barang: detail.barangs.nama_barang,
                harga: detail.harga,
                jumlah: detail.jumlah,
                total: detail.total,
            }))
        }

        return NextResponse.json({
            success: true,
            data: hasil,
        }, {status: 200})


    }catch(error){
        console.error('Error:', error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}



