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
    header: "No",
    size: 10,
    cell: ({ row, table }) => {
      // Index berdasarkan row yang sedang ditampilkan (respect sorting & filtering)
      const sortedRows = table.getSortedRowModel().flatRows
      const index =
        sortedRows.findIndex((r) => r.id === row.id) // posisi row saat ini
      return <span>{index + 1}</span>
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
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left"
        >
          Harga Jual
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
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
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Harga Beli
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
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
      < Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-8 px-2"
      >
        Kategori
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize pl-2">
        {row.getValue("namaKategori")}
      </div>
    ),
  },
  {
    accessorKey: "stok",
    header: "Stok",
  },
  {
    accessorKey: "barcode",
    header: "Barcode",
  },
//   {
//     accessorKey: "kadaluarsa",
//     header: ({ column }) => (
//       <Button
//         variant="ghost"
//         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         className="h-8 px-2"
//       >
//         Kadaluarsa
//         <ArrowUpDown className="ml-2 h-4 w-4" />
//       </Button>
//     ),
//     cell: ({ row }) => {
//       const value = row.getValue("kadaluarsa") as string
      
//       // ✅ Fallback "-" kalau kosong/null
//       if (!value || value === "null") {
//         return <div className="pl-2 text-left">tidak ada data</div>
//       }
      
//       // Format ISO → DD-MM-YYYY
//       const [datePart] = value.split("T")
//       const [year, month, day] = datePart.split("-")
      
//       return <div>{`${day}-${month}-${year}`}</div>
//   },
// },
]
