// Komponen data toko untuk menampilkan informasi toko dari database

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

import { Prisma } from "@/generated/prisma/client"
import {prisma} from '@/lib/prisma'

type Toko = Prisma.TokoGetPayload<{
  select: {
  nama : true
  alamat : true
  notelp : true
  email : true
  npwp : true
  siup : true
  ppn : true
  }
}>

async function getToko(): Promise<Toko[]> {
  try{
    return await prisma.toko.findMany({
      where: {id: 1},
      select: {
        nama : true,
        alamat : true,
        notelp : true,
        email : true,
        npwp : true,
        siup : true,
        ppn : true,
      },
    })
  } catch (error) {
    console.error("Data Toko tidak dapat diambil", error)
    return []
  }
}

export default async function DataToko() {
    const datatoko = await getToko()

  // ubah ppn ke format persen
  const tarif_ppn = (datatoko[0]?.ppn || 0 ) * 100 + '%'

  return(
    <div>
        <Table className="border-none ">
                  <TableBody className="text-lg">
                    <TableRow>
                      <TableCell className="max-w-5 truncate">Nama Toko</TableCell>
                      <TableCell className="max-w-1 truncate">:</TableCell>
                      <TableCell>{datatoko[0]?.nama}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="max-w-5 truncate">Alamat</TableCell>
                      <TableCell className="max-w-1 truncate">:</TableCell>
                      <TableCell >{datatoko[0]?.alamat}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="max-w-5 truncate">Telepon</TableCell>
                      <TableCell className="max-w-1 truncate">:</TableCell>
                      <TableCell>{datatoko[0]?.notelp}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="max-w-5 truncate">Email</TableCell>
                      <TableCell className="max-w-1 truncate">:</TableCell>
                      <TableCell>{datatoko[0]?.email}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="max-w-5 truncate">No. NPWP</TableCell>
                      <TableCell className="max-w-1 truncate">:</TableCell>
                      <TableCell>{datatoko[0]?.npwp}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="max-w-5 truncate">No. SIUP</TableCell>
                      <TableCell className="max-w-1 truncate">:</TableCell>
                      <TableCell>{datatoko[0]?.siup}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="max-w-5 truncate">Tarif Ppn</TableCell>
                      <TableCell className="max-w-1 truncate">:</TableCell>
                      <TableCell>{tarif_ppn}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
    </div>
  )


}



