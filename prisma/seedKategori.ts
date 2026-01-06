// Fungsi seed ke database menggunakan Prisma Client

// import keperluan

import {prisma} from '@/lib/prisma'

async function main() {
    try{
        const kategori = await prisma.kategori.createMany({
        data: [
            { nama_kategori: 'Beras', status: 'AKTIF' },
            { nama_kategori: 'Minyak Goreng', status: 'AKTIF' },
            { nama_kategori: 'Gula', status: 'AKTIF' },
            { nama_kategori: 'Tepung', status: 'AKTIF' },
            { nama_kategori: 'Mie Instan', status: 'AKTIF' },
            { nama_kategori: 'Voucher', status: 'AKTIF'},
            { nama_kategori: 'Topup', status: 'AKTIF' },
            { nama_kategori: 'Kopi', status: 'AKTIF' },
            { nama_kategori: 'Minuman Ringan', status: 'AKTIF'},
            { nama_kategori: 'Buku Tulis', status: 'AKTIF'},
            { nama_kategori: 'Pulpen', status: 'AKTIF' },
            { nama_kategori: 'Pensil', status: 'AKTIF'},
            { nama_kategori: 'Penghapus', status: 'AKTIF'},
            { nama_kategori: 'Penggaris', status: 'AKTIF' },
            { nama_kategori: 'Spidol', status: 'AKTIF'},
            { nama_kategori: 'Buku Gambar', status: 'AKTIF'},
            { nama_kategori: 'Detergent', status: 'AKTIF' },
            { nama_kategori: 'Software', status: 'AKTIF'},
            { nama_kategori: 'Mouse', status: 'AKTIF' },
            { nama_kategori: 'Keyboard', status: 'AKTIF' },
            ],
        })
        console.log('Seed Kategori Selesai', kategori)

    }
    catch (error) {
    console.error('Error seeding database:', error)
    }finally {
        await prisma.$disconnect()
    }
    
} 

main().catch((e) => {
    console.error(e)
    process.exit(1)
})


