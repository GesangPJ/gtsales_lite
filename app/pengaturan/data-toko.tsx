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
    <div className="">
        <Table className="border-none ">
                  <TableBody className="text-sm">
                    <TableRow>
                      <TableCell className="w-15">Nama Toko</TableCell>
                      <TableCell className="w-2">:</TableCell>
                      <TableCell>{datatoko[0]?.nama}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-15">Alamat</TableCell>
                      <TableCell className="w-2">:</TableCell>
                      <TableCell >{datatoko[0]?.alamat}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-15">Telepon</TableCell>
                      <TableCell className="w-2">:</TableCell>
                      <TableCell>{datatoko[0]?.notelp}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-15">Email</TableCell>
                      <TableCell className="w-2">:</TableCell>
                      <TableCell>{datatoko[0]?.email}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-15">No. NPWP</TableCell>
                      <TableCell className="w-2">:</TableCell>
                      <TableCell>{datatoko[0]?.npwp}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-15">No. SIUP</TableCell>
                      <TableCell className="w-2">:</TableCell>
                      <TableCell>{datatoko[0]?.siup}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-15">Tarif Ppn</TableCell>
                      <TableCell className="w-2">:</TableCell>
                      <TableCell>{tarif_ppn}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
    </div>
  )


}



