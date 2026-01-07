import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table"

import Link from "next/link"

import { Button } from "@/components/ui/button"

import {SquarePen}  from "lucide-react"

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



export default async function HalamanPengaturan() {
  const datatoko = await getToko()

  // ubah ppn ke format persen
  const tarif_ppn = (datatoko[0]?.ppn || 0 ) * 100 + '%'


  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                    <h1 className="text-2xl font-bold">Pengaturan Toko</h1>
                </div>
              <div className="px-4 lg:px-5">
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
              <div className="px-4 lg:px-6">
                <Button size="lg" className="text-lg" >
                    <SquarePen size={64}/>
                    <Link href="/pengaturan/edit-toko">
                    Ubah Data Toko
                    </Link>
                </Button>

              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
