// Komponen data toko untuk menampilkan informasi toko dari database

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

type Toko = {
  nama: string,
  alamat: string,
  notelp: string,
  email: string
  npwp: string,
  siup: string,
  ppn: number,

}

export default async function DataToko() {
  let datatoko : Toko[] = []

  try{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/data-toko`, 
      {next: {revalidate: 120},
    })

    if(!res.ok){
      throw new Error('Gagal ambil data Toko')
    }
    datatoko = await res.json()
  } catch(error){
    console.error("Date Toko tidak dapat diambil dari API", error)
  }

  // ubah ppn ke format persen
  const tarif_ppn = (datatoko[0]?.ppn || 0 ) * 100 + '%'

  return(
    <div>
      <div className="space-y-2">
        <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
          <p className="font-medium text-left w-24">Nama Toko</p>
          <p className="text-center">:</p>
          <p>{datatoko[0]?.nama}</p>
        </div>
        <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
          <p className="font-medium text-left w-24">Alamat Toko</p>
          <p className="text-center">:</p>
          <p>{datatoko[0]?.alamat}</p>
        </div>
        <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
          <p className="font-medium text-left w-24">No. Telepon</p>
          <p className="text-center">:</p>
          <p>{datatoko[0]?.notelp}</p>
        </div>
        <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
          <p className="font-medium text-left w-24">Email Toko</p>
          <p className="text-center">:</p>
          <p>{datatoko[0]?.email}</p>
        </div>
        <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
          <p className="font-medium text-left w-24">No. SIUP</p>
          <p className="text-center">:</p>
          <p>{datatoko[0]?.siup}</p>
        </div>
        <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
          <p className="font-medium text-left w-24">NPWP Toko</p>
          <p className="text-center">:</p>
          <p>{datatoko[0]?.npwp}</p>
        </div>
        <div className="grid grid-cols-[auto_auto_1fr] items-center gap-x-2">
          <p className="font-medium text-left w-24">Tarif Ppn</p>
          <p className="text-center">:</p>
          <p>{tarif_ppn}</p>
        </div>

      </div>
    </div>
  )


}



