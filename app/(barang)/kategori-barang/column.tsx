"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown} from "lucide-react"

type Kategori = {
  id: number
  nama_kategori: string
  status: string
}

export const columns: ColumnDef<Kategori>[] = [
  {
    accessorKey: "id",
    size: 10,
    header: "ID",
    
  },
  {
    accessorKey: "nama_kategori",
    header: ({ column }) => (
      < Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-8 px-2"
      >
        Nama Kategori
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("nama_kategori")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
  },
]
