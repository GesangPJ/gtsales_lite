// API ambil detail pembelian barang
import { prisma } from "@/lib/prisma"
import { NextResponse, NextRequest } from "next/server"

// Ambil sesuai parameter id di url
export async function GET(req: NextRequest){
    const query = req.nextUrl.searchParams.get('id')

    if (!query){
        return NextResponse.json([], { status: 400 })
    }

    try{
        const datapembelian = await prisma.pembelian.findUnique({
            where:{ id: parseInt(query)},

            include:{
                pembeliandetail:{
                    select:{
                        id:true,
                        barangId:true,
                        hargabeli:true,
                        jumlah:true,
                        total:true,
                        // ambil nama barang
                        barangs:{
                            select:{
                                nama_barang:true,
                            },
                        },
                    },
                }
            }

        })

        if(!datapembelian){
            throw new Error(`Detail pembelian tidak ditemukan`)
        }

        const hasil = {
            ...datapembelian,
            pembeliandetail: datapembelian?.pembeliandetail.map(detail => ({
            id: detail.id,
            barangId: detail.barangId,
            nama_barang: detail.barangs.nama_barang,
            hargabeli: detail.hargabeli,
            jumlah: detail.jumlah,
            total: detail.total,
            }))
        }

        return NextResponse.json({ success: true, data: hasil })

    }catch(error){
        console.error('Error:', error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }

}







