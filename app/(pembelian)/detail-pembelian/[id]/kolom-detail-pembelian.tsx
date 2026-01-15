// Kolom data tabel detail pembelian barang

"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown} from "lucide-react"

export type BarangPembelian = {
  id: number,
  nama_barang: string,
  hargabeli: number,
  jumlah: number,
  total: number,
}

export const columns: ColumnDef<BarangPembelian>[] = [

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
      <div>
        < Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-8 px-2"
      >
        Nama Barang
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>

      </div>
      
    ),
    cell: ({ row }) => (
      <div className="capitalize pl-2">
        {row.getValue("nama_barang")}
      </div>
    ),
  },

  {
    accessorKey: "hargabeli",
    size:50,
    minSize:32,
    header: ({ column }) => {
      return (
        <div>
          <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Harga Beli
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
        </div>
        
      )
    },
    cell: ({ row }) => {
      const harga = parseFloat(row.getValue("hargabeli"))
      
      // Format ke Rp
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(harga)

      return <div className="text-left font-medium pl-2">{formatted}</div>
    },
  },
  {
    accessorKey: "jumlah",
    size: 32,
    minSize:12,
    header: "Jumlah"
  },
  {
    accessorKey: "total",
    size:50,
    minSize:32,
    header: ({ column }) => {
      return (
        <div>
          <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Harga
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
        </div>
        
      )
    },
    cell: ({ row }) => {
      const harga = parseFloat(row.getValue("total"))
      
      // Format ke Rp
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(harga)

      return <div className="text-left font-medium pl-2">{formatted}</div>
    },
  },
]

















