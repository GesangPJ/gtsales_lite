"use client"

import { useState } from 'react'
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, X} from "lucide-react"
import { Input } from "@/components/ui/input"
import { useCartStore } from './keranjang-pembelian'


type CartItem = {
  id: number,
  nama_barang: string,
  harga_beli: number,
  stok:number,
  jumlah: number,
  totalharga: number,

}

export const columnpembelian : ColumnDef<CartItem>[] = [

    {
        accessorKey: "id",
        header: "ID",
        size: 10,
      },
      {
        accessorKey: "nama_barang",
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
        accessorKey: "harga_beli",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="text-left"
            >
              Harga Beli
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => {
          const itemId = row.original.id
          const hargaBeli = row.original.harga_beli
          const [editing, setEditing] = useState(false)
          const [harga, setHarga] = useState(hargaBeli)
          
          const formatRupiah = (value: number) =>
            new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(value)

          const updateHargaBeli = () => {
            const finalHarga = parseInt(harga.toString()) || hargaBeli
            useCartStore.getState().updateHargaBeli(itemId, finalHarga)  // Update store
            setEditing(false)
          }
    
          return (
            <div className="text-left font-medium pl-2">
              {editing ? (
                // Edit mode: input number
                <Input
                  type="number"
                  min="0"
                  value={harga}
                  onChange={(e) => setHarga(parseInt(e.target.value) || 0)}
                  onBlur={updateHargaBeli}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      updateHargaBeli()
                    } else if (e.key === 'Escape') {
                      setHarga(hargaBeli)
                      setEditing(false)
                    }
                  }}
                  className="w-28 h-9 p-2 text-right bg-transparent hover:bg-transparent focus:bg-transparent focus:ring-1 focus:ring-ring focus:border-ring"
                  autoFocus
                />
              ) : (
                <div
                  className="font-medium text-left cursor-pointer hover:bg-accent p-2 rounded hover:opacity-80 transition-all"
                  onDoubleClick={() => setEditing(true)}  // Double-click untuk edit kolom
                >
                  {formatRupiah(hargaBeli)}
                </div>
              )}
            </div>
            )
          },
      },
     {
        accessorKey: "jumlah",
        header: "Jumlah",
        cell: ({ row }) => {
          const itemId = row.original.id
          const [qty, setQty] = useState(row.original.jumlah)
          
          const updateQty = () => {
            useCartStore.getState().updateQty(itemId, qty || 1)
          }
          
          return (
            <Input
              className="w-20 h-8 border-0 bg-transparent hover:bg-transparent focus:bg-transparent focus:ring-0 p-0"
              type="number"
              min="1"
              value={qty || ""}
              onChange={(e) => {
    
                const newQty = parseInt(e.target.value) || 0
                setQty(newQty)
                }}
                onBlur={updateQty}
                onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    updateQty()
                    e.currentTarget.blur()  // Keluar input
                }
                }}
            />
          )
        },
      },
      {
        accessorKey: "totalharga",
        header: "Total Harga",
        cell: ({ row }) => {
          const harga = row.original.harga_beli
          const jumlah = row.original.jumlah  // Dari store
          const total = harga * jumlah
          
          const formatted = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(total)
          
          return <div className="text-right font-medium">{formatted}</div>
        },
      },
      {
        id: "delete",
        header: " ",
        cell: ({ row }) => {
          return (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => useCartStore.getState().removeItem(row.original.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          )
        },
      },

]