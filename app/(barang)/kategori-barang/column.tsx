"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Kategori } from "./types"
import { Button } from "@/components/ui/button"
import { ArrowUpDown} from "lucide-react"

export const columns: ColumnDef<Kategori>[] = [
  {
    accessorKey: "id",
    // size: 50,
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
