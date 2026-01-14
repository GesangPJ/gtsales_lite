"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown} from "lucide-react"

export type Pembelian = {
  id: number,
  kode:string,
  status:string,
  jumlahtotalharga: number,
}

export const columns: ColumnDef<Pembelian>[] = [


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
    accessorKey: "kode",
    minSize:50,
    size:100,
    header: ({ column }) => (
      < Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-8 px-2"
      >
        Kode Pembelian
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize pl-2">
        {row.getValue("kode")}
      </div>
    ),
  },
  // {
  //   accessorKey: "nama_vendor",
  //   size:50,
  //   header: ({ column }) => (
  //     < Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       className="h-8 px-2"
  //     >
  //       Vendor / Distributor
  //       <ArrowUpDown className="ml-2 h-4 w-4" />
  //     </Button>
  //   ),
  //   cell: ({ row }) => (
  //     <div className="capitalize pl-2">
  //       {row.getValue("nama_vendor")}
  //     </div>
  //   ),
  // },
  {
    accessorKey: "status",
    minSize:32,
    size:50,
    header: ({ column }) => (
      < Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-8 px-2"
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize pl-2">
        {row.getValue("status")}
      </div>
    ),
  },

  {
    accessorKey: "jumlahtotalharga",
    size:50,
    minSize:32,
    header: ({ column }) => {
      return (
        
          <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Jumlah Total
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
        
        
      )
    },
    cell: ({ row }) => {
      const harga = parseFloat(row.getValue("jumlahtotalharga"))
      
      // Format ke Rp
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(harga)

      return <div className="text-left font-medium pl-2">{formatted}</div>
    },
  },
  // {
  //   accessorKey: "biayakirim",
  //   header: ({ column }) => {
  //     return (
  //       <div className="w-8">
  //         <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Biaya Kirim
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //       </div>
        
  //     )
  //   },
  //   cell: ({ row }) => {
  //     const harga = parseFloat(row.getValue("biayakirim"))
      
  //     // Format ke Rp
  //     const formatted = new Intl.NumberFormat("id-ID", {
  //       style: "currency",
  //       currency: "IDR",
  //       minimumFractionDigits: 0,
  //     }).format(harga)

  //     return <div className="text-left font-medium pl-2">{formatted}</div>
  //   },
  // },
]
