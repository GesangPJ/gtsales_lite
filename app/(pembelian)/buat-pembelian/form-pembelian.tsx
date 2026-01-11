// Form Pembelian Barang

"use client"

import { useState, useEffect, useRef } from 'react'
import { useCartStore } from './keranjang-pembelian'
import { DataTable } from "@/components/data-table"
import { toast } from "sonner"
import { columnpembelian } from './kolom-pembelian'
import { Button } from '@/components/ui/button'
import { Search, InfoIcon } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton,
} from "@/components/ui/input-group"
import { useDebouncedCallback } from "use-debounce" 

type Barang = {
    id: number,
    nama_barang: string,
    harga_beli: number,
    stok:number,
    jumlah: number,
    total: number,
    totalharga: number, 
}

export default function FormPembelian(){
    const { items, addItem, clear } = useCartStore()
    const [data, setData] = useState(items)
    // const [barcode, setBarcode] = useState("")
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState<Barang[]>([])
    // const barcodeRef = useRef<HTMLInputElement>(null)

    const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value)

    // Sync data dengan store
    useEffect(() => {
        setData(items)
    }, [items])

    const debouncedSearch = useDebouncedCallback(async (query: string) => {
        if (query.length < 2) {
        setSearchResults([])
        return
        }
        
        try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cari-barang?q=${encodeURIComponent(query)}`)
        if (res.ok) {
            const results = await res.json()
            setSearchResults(results)
        }
        } catch (error) {
        console.error("Search error:", error)
        }
    }, 300)

    const handleNamaSelect = (barang: Barang) => {
        addItem({ ...barang, jumlah: 1 })
        setSearch("")
        setSearchResults([])
    }
    return(
        <div className="space-y-4">
            <InputGroup>
            <InputGroupInput 
            className="font-mono text-xl tracking-widest"
            placeholder="Ketik nama Vendor / distributor" 
            type="text" />
                <InputGroupAddon align="inline-end">
                <Tooltip>
                    <TooltipTrigger asChild>
                    <InputGroupButton
                        variant="ghost"
                        aria-label="Info"
                        size="icon-xs"
                    >
                        <InfoIcon />
                    </InputGroupButton>
                    </TooltipTrigger>
                    <TooltipContent>
                    <p>Nama vendor / distributor opsional</p>
                    </TooltipContent>
                </Tooltip>
                </InputGroupAddon>
            
            </InputGroup>
            <InputGroup>
            <InputGroupInput
            className="font-mono text-xl tracking-widest"
            placeholder="Ketik Nama Barang..."
            value={search}
            onChange={(e) => {
                setSearch(e.target.value)
                debouncedSearch(e.target.value)
            }}
            />
            <InputGroupAddon>
            <Search className="h-5 w-5" />
            </InputGroupAddon>
        </InputGroup>
        
        {/* Dropdown hasil search */}
        {searchResults.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-64 overflow-y-auto border rounded-lg p-2 bg-background">
            {searchResults.slice(0, 9).map((barang) => (
                <div
                key={barang.id}
                className="p-3 hover:bg-accent rounded-md cursor-pointer border flex items-center space-x-3"
                onClick={() => handleNamaSelect(barang)}
                >
                <div className="font-medium">{barang.nama_barang}</div>
                <div className="text-sm text-muted-foreground ml-1">stok:{barang.stok}</div>
                <div className="text-sm text-muted-foreground ml-1">
                    {new Intl.NumberFormat("id-ID", { 
                    style: "currency", 
                    currency: "IDR", 
                    minimumFractionDigits: 0 
                    }).format(barang.harga_beli)}
                </div>
                </div>
            ))}
            </div>
        )}

        <DataTable columns={columnpembelian as any} data={data} />

        <div className="sticky bottom-0 left-0 right-0 bg-background p-6 shadow-2xl">

        </div>

        </div>
    )

}






