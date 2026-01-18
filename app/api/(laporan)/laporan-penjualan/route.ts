// API Laporan penjualan

import { prisma } from "@/lib/prisma"
import { NextResponse, NextRequest } from "next/server"
import { Prisma } from "@/generated/prisma/client"

type TransaksiWithDetails = Prisma.TransaksiGetPayload<{
    include: {
        transaksiDetails: {
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

        const transaksiPenjualan: TransaksiWithDetails[] = await prisma.transaksi.findMany({
            where:{
                status:'LUNAS',
            },
            include: {
            transaksiDetails: {
                include: {
                    barangs: {
                        include: {
                            kategori: true
                        }
                    }
                }
            }
            }
        })

        const transaksiCash: TransaksiWithDetails[] = await prisma.transaksi.findMany({
            where:{
                metode:'CASH',
            },
            include: {
            transaksiDetails: {
                include: {
                    barangs: {
                        include: {
                            kategori: true
                        }
                    }
                }
            }
            }
        })

        const transaksiQR: TransaksiWithDetails[] = await prisma.transaksi.findMany({
            where:{
                metode:'QRIS',
            },
            include: {
            transaksiDetails: {
                include: {
                    barangs: {
                        include: {
                            kategori: true
                        }
                    }
                }
            }
            }
        })

        const transaksiTF: TransaksiWithDetails[] = await prisma.transaksi.findMany({
            where:{
                metode:'TRANSFER',
            },
            include: {
            transaksiDetails: {
                include: {
                    barangs: {
                        include: {
                            kategori: true
                        }
                    }
                }
            }
            }
        })

        // Detail transaksi CASH
        const cashDetails: DetailFlattened[] = []
        transaksiCash.forEach((item: TransaksiWithDetails)=>{
            item.transaksiDetails?.forEach((detail)=>{
                cashDetails.push({
                    id: detail.id,
                    barangId: detail.barangId,
                    jumlah: detail.jumlah,
                    total: detail.total,
                    kategori_nama: detail.barangs.kategori.nama_kategori,
                    nama_barang: detail.barangs.nama_barang,
                })
            })
        })

        const QRDetails: DetailFlattened[] = []
        transaksiQR.forEach((item: TransaksiWithDetails)=>{
            item.transaksiDetails?.forEach((detail)=>{
                QRDetails.push({
                    id: detail.id,
                    barangId: detail.barangId,
                    jumlah: detail.jumlah,
                    total: detail.total,
                    kategori_nama: detail.barangs.kategori.nama_kategori,
                    nama_barang: detail.barangs.nama_barang,
                })
            })
        })

        const TFDetails: DetailFlattened[] = []
        transaksiTF.forEach((item: TransaksiWithDetails)=>{
            item.transaksiDetails?.forEach((detail)=>{
                TFDetails.push({
                    id: detail.id,
                    barangId: detail.barangId,
                    jumlah: detail.jumlah,
                    total: detail.total,
                    kategori_nama: detail.barangs.kategori.nama_kategori,
                    nama_barang: detail.barangs.nama_barang,
                })
            })
        })

        // Detail keseluruhan transaksi
        const allDetails: DetailFlattened[] = []
        transaksiPenjualan.forEach((item: TransaksiWithDetails)=>{
            item.transaksiDetails?.forEach((detail)=>{
                allDetails.push({
                    id: detail.id,
                    barangId: detail.barangId,
                    jumlah: detail.jumlah,
                    total: detail.total,
                    kategori_nama: detail.barangs.kategori.nama_kategori,
                    nama_barang: detail.barangs.nama_barang,
                })
            })
        })

        // Jumlah Total Keseluruhan
        const jmlTotalHarga: number = transaksiPenjualan.reduce((sum, item)=> sum+(item.jumlahTotal || 0), 0)

        // Total nilai transaksi metode QRIS
        const totalNilaiQR: number = transaksiQR.reduce((sum, item)=> sum+(item.jumlahTotal || 0), 0)

        // Total nilai transaksi metode CASH
        const totalNilaiCash: number = transaksiCash.reduce((sum, item)=> sum+(item.jumlahTotal || 0), 0)

        // Total nilai transaksi metode Transfer
        const totalNilaiTF: number = transaksiTF.reduce((sum, item)=> sum+(item.jumlahTotal || 0), 0)

        // Total Barang terjual per Kategori
        const qtyPerKategori: Record<string, number> = {}
        const totalNilaiPerKategori: Record<string, number> = {}
        allDetails.forEach(detail => {
            const kat = detail.kategori_nama
            qtyPerKategori[kat] = (qtyPerKategori[kat] || 0) + (detail.jumlah || 0)
            totalNilaiPerKategori[kat] = (totalNilaiPerKategori[kat] || 0) + (detail.total || 0)
        })

        // Total keseluruhan barang terjual
        const totalBarangQty = allDetails.reduce((sum, detail) => sum + (detail.jumlah || 0), 0)

        // Total Barang terjual per Nama Barang
        const qtyPerBarang: Record<string, number> = {}
        const totalNilaiPerBarang: Record<string, number> = {}
        allDetails.forEach(detail => {
            const barang = detail.nama_barang
            qtyPerBarang[barang] = (qtyPerBarang[barang] || 0) + (detail.jumlah || 0)
            totalNilaiPerBarang[barang] = (totalNilaiPerBarang[barang] || 0) + (detail.total || 0)
        })

        // Total jumlah transaksi penjualan keseluruhan
        const jmlTransaksiPenjualan = transaksiPenjualan.length

        // Total jumlah transaksi QRIS
        const jmlTransaksiQR = transaksiQR.length

        // Total jumlah transaksi CASH
        const jmlTransaksiCash = transaksiCash.length

        // Total jumlah transaksi Transfer
        const jmlTransaksiTF = transaksiTF.length

        // Total jumlah transaksi 

        // Rata-rata total nilai transaksi penjualan
        const rataTotalTransaksi = jmlTransaksiPenjualan > 0 ? jmlTotalHarga / jmlTransaksiPenjualan : 0

        // Top 5 Barang terjual
        const topBarang = Object.entries(qtyPerBarang).sort(([,a], [,b]) => b-a).slice(0,5)

        // Top 5 Kategori terjual
        const topKategori = Object.entries(totalNilaiPerKategori)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)


        return NextResponse.json({
            success:true,
            penjualan:{
                topBarang,
                totalNilaiQR,
                totalNilaiCash,
                totalNilaiTF,
                jmlTransaksiQR,
                jmlTransaksiCash,
                jmlTransaksiTF,
                topKategori,
                rataTotalTransaksi,
                jmlTransaksiPenjualan,
                qtyPerBarang,
                qtyPerKategori,
                totalNilaiPerKategori,
                totalNilaiPerBarang,
                totalBarangQty,
                jmlTotalHarga,
            }
        })


    }catch(error){
        console.error('Error fetch pembelian:', error)
        return NextResponse.json({ 
        success: false, 
        error: 'Gagal ambil data pembelian' 
        }, { status: 500 })
    }
}
