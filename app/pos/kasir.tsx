// Komponen Kasir
"use client"

import { useState, useEffect, useRef, useMemo } from 'react'
import { useCartStore } from './keranjang'
import { DataTable } from "@/components/data-table"
import { toast } from "sonner"
import { columns } from "./kolom-kasir"
import { Button } from '@/components/ui/button'
import { ScanQrCode, Search } from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  ButtonGroup,
  ButtonGroupText,
} from "@/components/ui/button-group"
import { Label } from "@/components/ui/label"
import { useDebouncedCallback } from "use-debounce" 

type Barang = {
    id: number,
    nama_barang: string,
    harga_jual: number,
    jumlah: number,
}


export default function FormKasir(){
    const { items, addItem, clear } = useCartStore()
    const [data, setData] = useState(items)
    const [barcode, setBarcode] = useState("")
    const [search, setSearch] = useState("")
    const [diskon, setDiskon] = useState(0)
    const [searchResults, setSearchResults] = useState<Barang[]>([])
    const barcodeRef = useRef<HTMLInputElement>(null)

    // Total kotor (sebelum diskon)
    const total = useMemo(
        () => items.reduce((sum, item) => sum + item.harga_jual * item.jumlah, 0),
        [items]
    )

    const maxDiskon = total * 0.5  // 50% batas
    const totalFinal = Math.max(total - diskon, 0)

    const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value)

    const formatTotal = (items: Barang[]) => {
        const total = items.reduce((sum, item) => sum + (item.harga_jual * item.jumlah), 0)
        return new Intl.NumberFormat("id-ID", { 
            style: "currency", 
            currency: "IDR", 
            minimumFractionDigits: 0 
        }).format(total)
    }
    
    // Sync data dengan store
    useEffect(() => {
        setData(items)
    }, [items])

    //barcode
    useEffect(() => {
        if (barcode.length >= 8) {
        handleBarcodeScan(barcode)
        }
    }, [barcode])

    // Debounce search nama barang
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

    // Barcode Scan
    const handleBarcodeScan = async (code: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/car-barang-barcode`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ barcodebarang: code })
      })
      
      if (res.ok) {
        const barang = await res.json()
        if (barang.id) {
          addItem({ ...barang, jumlah: 1 })
          toast.success(`Ditambahkan: ${barang.nama_barang}`)
        } else {
          toast.error("Barang tidak ditemukan")
        }
      }
    } catch (error) {
      toast.error("Error scan barcode")
    } finally {
      setBarcode("")  // clear barcode
      barcodeRef.current?.focus()
    }
    }

    const handleNamaSelect = (barang: Barang) => {
    addItem({ ...barang, jumlah: 1 })
    setSearch("")
    setSearchResults([])
    barcodeRef.current?.focus()  // Kembali ke barcode
  }

    return(
        <div className="space-y-4">
        {/* Recent Items (opsional) */}
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-2 mb-4">
            {/* 12 item terakhir */}
        </div>
        
        {/* Barcode Scanner (prioritas #1) */}
        <InputGroup className="mb-4">
            <InputGroupInput
            ref={barcodeRef}
            placeholder="Masukkan Barcode (min 8 digit)"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            className="text-xl tracking-widest font-mono"
            autoFocus
            />
            <InputGroupAddon>
            <ScanQrCode className="h-5 w-5" />
            </InputGroupAddon>
        </InputGroup>
        
        {/* Nama Search (fallback) */}
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
                <div className="text-sm text-muted-foreground ml-auto">
                    {new Intl.NumberFormat("id-ID", { 
                    style: "currency", 
                    currency: "IDR", 
                    minimumFractionDigits: 0 
                    }).format(barang.harga_jual)}
                </div>
                </div>
            ))}
            </div>
        )}
        
        {/* Cart Table */}
        <DataTable columns={columns as any} data={data} />
        
        {/* Footer Total & Bayar */}
        <div className="sticky bottom-0 left-0 right-0 bg-background p-6 shadow-2xl">
            <div className="">
                <ButtonGroup>
                <ButtonGroupText asChild>
                    <Label htmlFor="diskon">Diskon</Label>
                </ButtonGroupText>
                <InputGroup>
                    <InputGroupInput
                    id="diskon"
                    type="number"
                    min={0}
                    value={diskon || ""}
                    onChange={(e) => {
                        const raw = e.target.value
                        if (raw === "") {
                        setDiskon(0)
                        return
                        }
                        const value = parseInt(raw, 10) || 0
                        // Batasi max 50% total
                        const clamped = Math.min(value, maxDiskon)
                        setDiskon(clamped)
                    }}
                    />
                </InputGroup>
                </ButtonGroup>

                <span className="text-xs text-muted-foreground">
                Maks diskon: {formatRupiah(maxDiskon)}
                </span>
                
            </div>
            <div className="text-right mb-1 text-sm text-muted-foreground">
                Total sebelum diskon: {formatRupiah(total)}
            </div>
            <div className="text-3xl font-bold text-right mb-4">
            Jumlah Total: {formatRupiah(totalFinal)}
            </div>
            <div className="flex gap-3">
            <Button variant="destructive" className="flex-1 h-14 text-xl" onClick={clear}>
                Hapus
            </Button>
             <Button className="flex-1 h-14 text-xl" >
                Bayar (Ctrl+Enter)
            </Button>
            </div>
        </div>
        </div>
    )
}




