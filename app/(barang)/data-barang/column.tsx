"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown} from "lucide-react"

type Barang = {
  id: number
  nama_barang: string,
  harga_jual: number,
  harga_beli: number,
  stok: number,
  namaKategori?: string,
  kadaluarsa:string,
  barcode: number,
}

export const columns: ColumnDef<Barang>[] = [


  {
    id: "no",
    // header: "No",
    header: () => {
      return (
          <div className="text-center w-1.5">No.</div>
      )
    },
    size: 10,
    cell: ({ row, table }) => {
      // Index berdasarkan row yang sedang ditampilkan (respect sorting & filtering)
      const sortedRows = table.getSortedRowModel().flatRows
      const index =
        sortedRows.findIndex((r) => r.id === row.id) // posisi row saat ini
      return <p className="text-center">{index + 1}.</p>
    },
    enableSorting: false, // nomor urut tidak perlu disort
  },
  {
    accessorKey: "nama_barang",
    size:50,
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
  {
    accessorKey: "harga_jual",
    header: ({ column }) => {
      return (
        <div className="w-8">
          <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left"
        >
          Harga Jual
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const harga = parseFloat(row.getValue("harga_jual"))
      
      // Format ke Rp
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,  // Hilangkan .00
      }).format(harga)

      return <div className="text-left font-medium pl-2">{formatted}</div>
    },
  },
  {
    accessorKey: "harga_beli",
    header: ({ column }) => {
      return (
        <div className="w-8">
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
      const harga = parseFloat(row.getValue("harga_beli"))
      
      // Format ke Rp
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,  // Hilangkan .00
      }).format(harga)

      return <div className="text-left font-medium pl-2">{formatted}</div>
    },
  },
  {
    accessorKey: "namaKategori",
    size:30,
    header: ({ column }) => (
      <div className="w-8">
        < Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2"
        >
        Kategori
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
      </div>
      
    ),
    cell: ({ row }) => (
      <div className="capitalize pl-2">
        {row.getValue("namaKategori")}
      </div>
    ),
  },
  {
    accessorKey: "stok",
    // header: "Stok",
    header: () => {
      return ( <div className="w-3 text-center">Stok Barang</div>  )
    },
    cell: ({row}) => {
      return(
        <div className="text-center">
          {row.getValue("stok")}
        </div>
      )
    }
  },
  {
    accessorKey: "barcode",
    header: () => {
      return ( <div className="text-center">Barcode</div>  )
    },
  },
]
