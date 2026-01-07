// Memasukkan data toko default ke dalam database

import {prisma} from '@/lib/prisma'

async function main() {
    try{
        const toko = await prisma.toko.create({
        data: {
            nama: 'Prabu Store',
            alamat: 'BSD City, Tangerang, Banten',
            notelp: '021-12345678',
            email: 'sales@prabu.com',
            npwp: '01.234.567.8-901.000',
            pkp_status: 'Y',
            siup: 'SIUP-1234567890',
            ppn: 0.11,
            },
        })
        console.log('Data Toko berhasil ditambahkan:', toko)
    } catch (error) {
        console.error('Gagal menambahkan data Toko:', error)
    } finally {
        await prisma.$disconnect()
    }
}

main().catch((e) => {
    console.error(e)
    process.exit(1)
})
