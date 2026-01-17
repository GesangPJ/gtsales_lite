// API Ambil laporan pembelian

import { prisma } from "@/lib/prisma"
import { NextResponse, NextRequest } from "next/server"
import { Prisma, Pembelian } from "@/generated/prisma/client"

type PembelianWithDetails = Prisma.PembelianGetPayload<{
    include: {
        pembeliandetail: {
        include: {
            barangs: {
            include: {
                kategori: true
            }
            }
        }
        }
    }
}>

// Type untuk flattened detail
interface DetailFlattened {
    id: number
    barangId: number
    jumlah: number
    total: number
    kategori_nama: string
    nama_barang: string
}


export async function GET(req: NextRequest){
    

    try{
    
        // Secara default ambil data dengan status SELESAI
        const pembelianBarang: PembelianWithDetails[] = await prisma.pembelian.findMany({
            where:{
                status:'SELESAI',
            },
        include:{
            pembeliandetail: {
                include: {
                    barangs: {
                        include: {
                            kategori:true,
                        }
                    }
                }
            }
        }
        })

        const pembelianPesan = await prisma.pembelian.findMany({
            where:{
                status:'DIPESAN',
            },
            include:{
            pembeliandetail: {
                include: {
                    barangs: {
                        include: {
                            kategori:true,
                        }
                    }
                }
            }
        }
        })

        const pembelianBatal = await prisma.pembelian.findMany({
            where:{
                status:'BATAL',
            },
            include:{
            pembeliandetail: {
                include: {
                    barangs: {
                        include: {
                            kategori:true,
                        }
                    }
                }
            }
        }
        })

        const allDetails: DetailFlattened[] = []
        pembelianBarang.forEach((item: PembelianWithDetails) => {
        item.pembeliandetail?.forEach((detail) => {
            allDetails.push({
            id: detail.id,
            barangId: detail.barangId,
            jumlah: detail.jumlah || 0,
            total: detail.total || 0,
            kategori_nama: detail.barangs.kategori.nama_kategori,
            nama_barang: detail.barangs.nama_barang
            })
        })
        })

        const detailBatal: DetailFlattened[] = []
        pembelianBatal.forEach((item: PembelianWithDetails)=>{
            item.pembeliandetail?.forEach((detail)=>{
                detailBatal.push({
                    id: detail.id,
                    barangId: detail.barangId,
                    jumlah: detail.jumlah || 0,
                    total: detail.total || 0,
                    kategori_nama: detail.barangs.kategori.nama_kategori,
                    nama_barang: detail.barangs.nama_barang
                })
            })
        })

        const detailDipesan: DetailFlattened[] = []
        pembelianPesan.forEach((item: PembelianWithDetails)=>{
            item.pembeliandetail?.forEach((detail)=>{
                detailDipesan.push({
                    id: detail.id,
                    barangId: detail.barangId,
                    jumlah: detail.jumlah || 0,
                    total: detail.total || 0,
                    kategori_nama: detail.barangs.kategori.nama_kategori,
                    nama_barang: detail.barangs.nama_barang
                })
            })
        })


        // TOTAL BIAYA KIRIM
        const totalBiayaKirim:number = pembelianBarang.reduce((sum, item) => sum + (item.biayakirim || 0), 0)

        // TOTAL JUMLAH TOTALHARGA
        const totalJumlahTotalHarga:number = pembelianBarang.reduce((sum, item) => sum + (item.jumlahtotalharga || 0), 0)

        // TOTAL BARANG (QTY) PER KATEGORI
        const qtyPerKategori: Record<string, number> = {}
        const totalNilaiPerKategori: Record<string, number> = {}
        allDetails.forEach(detail => {
            const kat = detail.kategori_nama
            qtyPerKategori[kat] = (qtyPerKategori[kat] || 0) + (detail.jumlah || 0)
            totalNilaiPerKategori[kat] = (totalNilaiPerKategori[kat] || 0) + (detail.total || 0)
        })

        // TOTAL BARANG LUNAS DIBELI (SELURUH QTY)
        const totalBarangQty = allDetails.reduce((sum, detail) => sum + (detail.jumlah || 0), 0)

        // TOTAL BARANG BATAL
        const totalBarangBatal = detailBatal.reduce((sum, detail)=>sum+(detail.jumlah || 0), 0)

        // TOTAL BARANG DIPESAN
        const totalBarangDipesan = detailDipesan.reduce((sum, detail)=>sum+(detail.jumlah || 0), 0)

        // TOTAL BARANG PER NAMA BARANG
        const qtyPerBarang: Record<string, number> = {}
        const totalNilaiPerBarang: Record<string, number> = {}
        allDetails.forEach(detail => {
            const barang = detail.nama_barang
            qtyPerBarang[barang] = (qtyPerBarang[barang] || 0) + (detail.jumlah || 0)
            totalNilaiPerBarang[barang] = (totalNilaiPerBarang[barang] || 0) + (detail.total || 0)
        })

        // TAMBAHAN
        const jmltransaksiDipesan = pembelianPesan.length
        const jmltransaksiBatal = pembelianBatal.length
        const jmlTransaksi = pembelianBarang.length
        const rataTotalPerTransaksi = jmlTransaksi > 0 ? totalJumlahTotalHarga / jmlTransaksi : 0
        const totalBiayaLain = totalBiayaKirim
        const topBarang = Object.entries(qtyPerBarang).sort(([,a], [,b]) => b-a).slice(0,5)
        const topKategori = Object.entries(totalNilaiPerKategori)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)  // Top 5 kategori berdasarkan nilai

        return NextResponse.json({
        success: true,
        // data: pembelianBarang,
        summary: {
            totalBarangDipesan,
            totalBarangBatal,
            jmltransaksiDipesan,
            jmltransaksiBatal,
            totalBiayaKirim,
            totalJumlahTotalHarga,
            totalBarangQty,
            qtyPerKategori,
            totalNilaiPerKategori,
            qtyPerBarang,
            totalNilaiPerBarang,
            jmlTransaksi,
            rataTotalPerTransaksi,
            totalBiayaLain,
            topKategori,
            topBarang
        }
        })

  } catch (error) {
    console.error('Error fetch pembelian:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Gagal ambil data pembelian' 
    }, { status: 500 })
  }
}









