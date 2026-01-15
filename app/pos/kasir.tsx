// Komponen Kasir
"use client"

import { useState, useEffect, useRef, useMemo } from 'react'
import { useCartStore } from './keranjang'
import { DataTable } from "@/components/data-table"
import { toast } from "sonner"
import { columns } from "./kolom-kasir"
import { Button } from '@/components/ui/button'
import { ScanQrCode, Search } from "lucide-react"
import {IconArrowBadgeDownFilled} from "@tabler/icons-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
  InputGroupText,
} from "@/components/ui/input-group"
import {
  ButtonGroup,
  ButtonGroupText,
} from "@/components/ui/button-group"
import { Label } from "@/components/ui/label"
import { useDebouncedCallback } from "use-debounce" 
import { baseUrl } from '@/lib/base-url'

type Barang = {
    id: number,
    nama_barang: string,
    harga_jual: number,
    jumlah: number,
}


export default function FormKasir(){
    const [value, setValue] = useState("")
    const maxLength = 250 // banyaknya kata untuk textarea
    const remaining = maxLength - value.length
    const { items, addItem, clear } = useCartStore()
    const [data, setData] = useState(items)
    const [barcode, setBarcode] = useState("")
    const [search, setSearch] = useState("")
    const [diskon, setDiskon] = useState(0)
    const [searchResults, setSearchResults] = useState<Barang[]>([])
    const barcodeRef = useRef<HTMLInputElement>(null)
    const [metodeTransaksi, setMetodeTransaksi] = useState("")
    const [loadingTransaksi, setLoadingTransaksi] = useState(false)

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
        const res = await fetch(`${baseUrl}/api/cari-barang?q=${encodeURIComponent(query)}`)
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
      const res = await fetch(`${baseUrl}/api/car-barang-barcode`, {
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
  const status = "LUNAS"

  const handleTransaksi = async () => {
    setLoadingTransaksi(true)

    const datatransaksi = {
        status_transaksi:status || null,
        diskon_transaksi:diskon || 0,
        metode_transaksi:metodeTransaksi || null,
        keterangan: value || null,
        jumlahtotal:totalFinal,
        barang: items.map(item=>({
            id: item.id,
            jumlah: item.jumlah,
            harga_jual: item.harga_jual,
        }))

    }

    try{
        const res = await fetch(`${baseUrl}/api/transaksi-penjualan`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datatransaksi),
            })

            if(res.ok){
            toast.success('Transaksi Penjualan berhasil! 🎉')
            clear()
            setMetodeTransaksi("")
            setDiskon(0)
            setValue("")

            }else{
                toast.error('Gagal membuat transaksi')
            }


    }catch(error){
        toast.error('Error koneksi')
    }finally {
            setLoadingTransaksi(false)
        }
  }

    return(
        <div className="space-y-4">
        
        <InputGroup className="mb-4">
            <InputGroupInput
            ref={barcodeRef}
            placeholder="Barcode (min 8 digit)"
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
        <DataTable columns={columns as any} data={data} />
        <div className="sticky bottom-0 left-0 right-0 bg-background p-6 shadow-2xl">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 max-w-full mx-auto">
            <div className="space-y-3 md:max-w-md">
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
                    <InputGroup className="border w-full mt-5 mb-5">
                    <InputGroupTextarea
                        className="w-full max-w-xl"   // <= batasi lebar textarea
                        name="keterangan"
                        id="keterangan"
                        placeholder="Masukkan Keterangan Transaksi (opsional)"
                        value={value}
                        onChange={(e) => setValue(e.target.value.slice(0, maxLength))}
                        maxLength={maxLength}
                        rows={3}
                    />
                    <InputGroupAddon align="block-end">
                        <InputGroupText className="text-muted-foreground text-xs">
                        {remaining}/{maxLength} karakter
                        {remaining < 20 && <span className="text-destructive ml-1">!</span>}
                        </InputGroupText>
                    </InputGroupAddon>
                    </InputGroup>
            </div>

            <div className="text-right md:text-right space-y-2 md:max-w-md md:ml-auto">
                <div className='ml-auto md:w-48 mb-10'>
                    <Select value={metodeTransaksi}
                            onValueChange={setMetodeTransaksi}>
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih Metode Pembayaran" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Metode Pembayaran</SelectLabel>  
                                <SelectItem value="CASH">
                                    CASH
                                </SelectItem>
                                <SelectItem value="QRIS">
                                    QRIS
                                </SelectItem>
                                <SelectItem value="TRANSFER">
                                    TRANSFER
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="text-sm text-right text-muted-foreground">
                    Total sebelum diskon: {formatRupiah(total)}
                </div>
                <div className="text-3xl font-bold">
                    Jumlah Total: {formatRupiah(totalFinal)}
                </div>
                </div>
            </div>
            <div className="flex gap-3 pt-4 border-t">
            <Button variant="destructive" className="flex-1 h-14 text-xl" onClick={clear}>
                Hapus
            </Button>
             <Button className="flex-1 h-14 text-xl" 
                onClick={handleTransaksi}
                disabled={loadingTransaksi || items.length === 0}
             >
                {loadingTransaksi ? "Memproses..." : "Bayar"}
            </Button>
            </div>
        </div>
        </div>
    )
}




