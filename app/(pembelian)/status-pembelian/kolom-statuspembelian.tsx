"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown} from "lucide-react"
import { Loader2 } from "lucide-react"
import { useTransition } from "react"
import { toast } from "sonner"
import { baseUrl } from "@/lib/base-url"

export type Pembelian = {
  id: number,
  kode:string,
  status:string,
  createdAt: string,
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
  {
  id: "update-selesai",
  header: " ",
  size: 80,  // Fixed width
  cell: ({ row }) => {
        const pembelian = row.original as Pembelian
        const [isPending, startTransition] = useTransition()
        
        const handleSelesai = async () => {
          startTransition(async () => {
            try {
              const res = await fetch(`${baseUrl}/api/status-pembelian`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  id: pembelian.id,
                  status: 'SELESAI'
                })
              })
              
              if (res.ok) {
                toast.success(`Pembelian ${pembelian.kode} selesai!`)
                window.location.reload()
              } else {
                toast.error('Gagal update status')
              }
            } catch (error) {
              toast.error('Error koneksi')
            }
          })
        }
      return (
        <div className="">
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-20 text-xs"
            onClick={handleSelesai}
            disabled={isPending || pembelian.status === 'SELESAI'}
          >
            {isPending ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              'SELESAI'
            )}
          </Button>
        </div>
      )
    }
  },
  {
  id: "update-batal",
  header: " ",
  size: 80,
  cell: ({ row }) => {
        const pembelian = row.original as Pembelian
        const [isPending, startTransition] = useTransition()
        
        const handleSelesai = async () => {
          startTransition(async () => {
            try {
              const res = await fetch(`${baseUrl}/api/status-pembelian`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  id: pembelian.id,
                  status: 'BATAL'
                })
              })
              
              if (res.ok) {
                toast.success(`Pembelian ${pembelian.kode} dibatalkan!`)
                window.location.reload()
              } else {
                toast.error('Gagal update status')
              }
            } catch (error) {
              toast.error('Error koneksi')
            }
          })
        }
      return (
        <div className="">
          <Button
            variant="destructive"
            size="sm"
            className="h-8 w-20 text-xs"
            onClick={handleSelesai}
            disabled={isPending || pembelian.status === 'SELESAI'}
          >
            {isPending ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              'BATALKAN'
            )}
          </Button>
        </div>
      )
    }
  },
]
