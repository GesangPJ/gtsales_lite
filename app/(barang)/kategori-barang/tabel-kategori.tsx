// Komponen tabel kategori barang

import { columns } from "./column"
import { DataTable } from "@/components/data-table"

type Kategori = {
  id: number
  nama_kategori: string
}

export default async function TabelKategori() {

    let kategoris: Kategori[] = []
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ambil-kategori`, {
        next: { revalidate: 120 }, // Revalidate setiap X detik
      })
      
      if (!res.ok) {       
        throw new Error('Gagal ambil data kategori')
      }    
      kategoris = await res.json()
    } catch (error) {
      console.error("Data Kategori tidak dapat diambil dari API", error)
    }

    return(
        <div>
          <div className="">
            <DataTable
            columns={columns}
            data={kategoris}
            />
          </div>
        </div>
    )
}


