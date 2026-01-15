// Komponen kolom tabel stok barang

"use client"

import { useState } from 'react'
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown} from "lucide-react"
import { Input } from "@/components/ui/input"
import { baseUrl } from '@/lib/base-url'
import { toast } from "sonner"

export type StokBarang = {
  id: number
  nama_barang: string,
  stok: number,
}

const [editedStok, setEditedStok] = useState<Record<number, number>>({})

export const columns: ColumnDef<StokBarang>[] = [
  {
    accessorKey: "id",
    header:() => <></>,
    cell:() => <></>,
    size:0,
    minSize:0,
  },
  {
    id: "no",
    header: () => {
      return (
          <div className="text-center w-1.5">No.</div>
      )
    },
    size: 10,
    cell: ({ row, table }) => {
      
      const sortedRows = table.getSortedRowModel().flatRows
      const index =
        sortedRows.findIndex((r) => r.id === row.id) 
      return <p className="text-center">{index + 1}.</p>
    },
    enableSorting: false,
  },
  {
    accessorKey: "nama_barang",
    size:150,
    minSize:100,
    header: ({ column }) => (
      < Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-8 px-2"
      >
        Nama Barang
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize pl-2">
        {row.getValue("nama_barang")}
      </div>
    ),
  },

]








