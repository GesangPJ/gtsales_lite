// Komponen tabel kategori barang

import { prisma } from "@/lib/prisma"
import { columns } from "./column"
import { DataTable } from "@/components/data-table"

type Kategori = {
  id: number
  nama_kategori: string
}

async function getKategoris(): Promise<Kategori[]> {
  try {
    return await prisma.kategori.findMany({
      select: {
        id: true,
        nama_kategori: true,
      },
    })
  } catch (error) {
    console.error("Data Kategori tidak dapat diambil", error)
    return []
  }
}

export default async function TabelKategori() {
  const kategoris = await getKategoris()
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


