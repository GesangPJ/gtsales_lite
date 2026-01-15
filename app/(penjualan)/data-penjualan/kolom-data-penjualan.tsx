"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export type Penjualan = {
  id: number,
  kode: string,
  status: number,
  metode: string,
  jumlahTotal: number,
  keterangan: string,
}

export const columns: ColumnDef<Penjualan>[] = [

  {
  accessorKey: "id",
  size:0,
  minSize:0,
  header: () => <></>,  // ✅ Header kosong (invisible)
  cell: () => <></>,    // ✅ Cell kosong (invisible)
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
    accessorKey: "kode",
    size:150,
    minSize:100,
    header: ({ column }) => (
      <div>
        < Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-8 px-2"
      >
        Kode Penjualan
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>

      </div>
      
    ),
    cell: ({ row }) => (
      <div className="capitalize pl-2">
        {row.getValue("kode")}
      </div>
    ),
  },
  {
  accessorKey: "status",
  size: 50,  // Lebar cukup untuk badge
  minSize: 32,
  header: ({ column }) => (
    <Button 
      variant="ghost" 
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="h-8 px-2"
    >
      Status
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      
      const getBadgeVariant = (status: string) => {
        switch (status.toUpperCase()) {
          case 'HUTANG':
            return 'default'
          case 'BATAL':
            return 'destructive'
          case 'LUNAS':
            return 'default'  // Background hijau pakai className
          default:
            return 'secondary'
        }
      }
      
      const getBadgeClass = (status: string) => {
        switch (status.toUpperCase()) {
          case 'LUNAS':
            return 'bg-green-500 hover:bg-green-500 text-black border-green-500'
          case 'BATAL':
            return 'bg-destructive hover:bg-destructive text-destructive-foreground border-destructive'
          default:
            return ''
        }
      }
      
      return (
        <div className="pl-2">
          <Badge 
            variant={getBadgeVariant(status)}
            className={getBadgeClass(status)}
          >
            {status.toUpperCase()}
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: "metode",
    header: "Metode",
    size:20,
    minSize:10,
  },
  {
    accessorKey: "jumlahTotal",
    size:50,
    minSize:32,
    header: ({ column }) => {
      return (
        <div>
          <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Jumlah Total
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
        </div>
        
      )
    },
    cell: ({ row }) => {
      const harga = parseFloat(row.getValue("jumlahTotal"))
      
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
    accessorKey:"keterangan",
    header:"Keterangan",
    size:70,
    minSize:32,
  },
  
  {
    id: "detail",
    header:" ",
    size:32,
    minSize:20,
    cell: ({row}) => {
      const id = row.getValue("id") as number

      return (
        <div className="flex justify-center">
        <Button asChild size="sm" variant="outline">
          <Link href={`/detail-penjualan/${id}`}>Detail</Link>
        </Button>
      </div>
      )
      
    }

  },
]
