// Komponen Menampilkan tabel data barang

import { columns } from "./column"
import { DataTable } from "@/components/data-table"

type Kategori = {
  id: number
  nama_kategori: string
}

type Barang = {
  id: number
  nama_barang: string,
  harga_jual: number,
  harga_beli: number,
  kategoriId: number,
  namaKategori?: string,
  stok: number,
  kadaluarsa: string,
  barcode: number,
}

export default async function TabelBarang(){
    let barangs : Barang[] = []
    let kategoris: Kategori[] = []

    try{
        const [respon1, respon2] = await Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ambil-kategori`),
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ambil-barang`)

        ])

        if(!respon1.ok || !respon2.ok) throw new Error('Gagal mengambil data barang dan kategori')

        kategoris = await respon1.json()
        barangs = await respon2.json()

        // Mapping kategoriId → nama_kategori
        const kategoriMap = new Map(kategoris.map(k => [k.id, k.nama_kategori]))
        
        barangs = barangs.map(barang => ({
        ...barang,
        namaKategori: kategoriMap.get(barang.kategoriId) || 'Tidak ada Kategori'
        }))

    }catch (error){
        console.error('Error saat mengambil data', error)
    }

    return(

        <div>
            <div>
                <DataTable
                columns={columns}
                data={barangs}
                />
            </div>

        </div>
    )
}



