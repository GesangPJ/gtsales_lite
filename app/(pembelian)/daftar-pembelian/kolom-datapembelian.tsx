"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export type Pembelian = {
  id: number,
  createdAt: string,
  harga_beli: number,
  status: string,
  jumlahtotalharga: number,
  biayakirim: number,
}

export const columns: ColumnDef<Pembelian>[] = [

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
        Kode Pembelian
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
  accessorKey: "createdAt",
  minSize: 80,
  size: 100,  // Lebar cukup untuk tanggal
  header: ({ column }) => (
    <Button 
      variant="ghost" 
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="h-8 px-2"
    >
      Tanggal
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
    ),
    cell: ({ row }) => {
      const isoString = row.getValue("createdAt") as string
      
      let formattedDate = '-'
      if (isoString) {
        // Remove timezone offset untuk parse bersih
        const localIso = isoString.replace(/\+00:00$/, '').replace('Z', '')
        const date = new Date(localIso)
        
        formattedDate = new Intl.DateTimeFormat('id-ID', {
          day: '2-digit',
          month: '2-digit', 
          year: 'numeric'
        }).format(date)
      }
      
      return <div className="pl-2 text-sm">{formattedDate}</div>
    }
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
          case 'DIPESAN':
            return 'default'
          case 'BATAL':
            return 'destructive'
          case 'SELESAI':
            return 'default'  // Background hijau pakai className
          default:
            return 'secondary'
        }
      }
      
      const getBadgeClass = (status: string) => {
        switch (status.toUpperCase()) {
          case 'SELESAI':
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
    accessorKey: "jumlahtotalharga",
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
  {
    accessorKey: "biayakirim",
    size:50,
    minSize:32,
    header: ({ column }) => {
      return (
        <div>
          <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Biaya Kirim
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
        </div>
        
      )
    },
    cell: ({ row }) => {
      const harga = parseFloat(row.getValue("biayakirim"))
      
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
    id: "detail",
    header:" ",
    size:32,
    minSize:20,
    cell: ({row}) => {
      const id = row.getValue("id") as number

      return (
        <div className="flex justify-center">
        <Button asChild size="sm" variant="outline">
          <Link href={`/detail-pembelian/${id}`}>Detail</Link>
        </Button>
      </div>
      )
      
    }

  },
]
