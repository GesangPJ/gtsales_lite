// Form Pembelian Barang

"use client"

import { useState, useEffect} from 'react'
import { useCartStore } from './keranjang-pembelian'
import { DataTable } from "@/components/data-table"
import { toast } from "sonner"
import { columnpembelian } from './kolom-pembelian'
import { Button } from '@/components/ui/button'
import { Search, InfoIcon, Warehouse } from "lucide-react"
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
import { Label } from "@/components/ui/label"
import { useDebouncedCallback } from "use-debounce" 
import { baseUrl } from '@/lib/base-url'

type Barang = {
    id: number,
    nama_barang: string,
    harga_beli: number,
    stok:number,
    jumlah: number,
    total:number,
    totalharga: number,
}

export default function FormPembelian(){
    const { items, addItem, clear } = useCartStore()
    const [data, setData] = useState(items)
    // const [barcode, setBarcode] = useState("")
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState<Barang[]>([])
    // const barcodeRef = useRef<HTMLInputElement>(null)
    const [loadingBayar, setLoadingBayar] = useState(false)
    const [namaVendor, setNamaVendor] = useState("")
    const [biayaKirim, setBiayaKirim] = useState(0)

    
    const Reset = () => {
        clear()
        setNamaVendor("")
        setBiayaKirim(0)
    }

    const total = items.reduce((sum, item) => sum + (item.harga_beli * item.jumlah), 0)

    const totalsemua = total + biayaKirim

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
        const res = await fetch(`${baseUrl}/api/cari-barang?q=${encodeURIComponent(query)}`)
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

    const handleBayar = async () => {
        setLoadingBayar(true)
        
        // Siapkan data untuk API
        const dataPembelian = {
            namavendor: namaVendor || null,
            biayakirim: biayaKirim || 0,
            totalharga: totalsemua,  // parseInt di server
            barang: items.map(item => ({
                id: item.id,
                jumlah: item.jumlah,
                harga_beli: item.harga_beli,
                total: item.totalharga,
            }))
        }
        
        try {
            const res = await fetch(`${baseUrl}/api/transaksi-pembelian`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataPembelian),
            })
            
            if (res.ok) {
            toast.success('Transaksi Pembelian berhasil! 🎉')
            clear()  // Kosongkan cart
            setNamaVendor("")
            } else {
            toast.error('Gagal membuat pembelian')
            }
        } catch (error) {
            toast.error('Error koneksi')
        } finally {
            setLoadingBayar(false)
        }
    }

    return(
        <div className="space-y-4">
            <InputGroup>
            <InputGroupInput 
            className="font-mono text-xl tracking-widest"
            placeholder="Ketik nama Vendor / distributor" 
            type="text" 
            value={namaVendor}  // ✅ Controlled value
            onChange={(e) => setNamaVendor(e.target.value)}
            />
            <InputGroupAddon align="inline-start">
            <Warehouse/>
            </InputGroupAddon>
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


            <div className="flex max-w-[300px]">
            <InputGroup>
                <InputGroupInput
                id="biayaKirim"
                type="number"
                min={0}
                placeholder='masukkan biaya pengiriman'
                value={biayaKirim}
                onChange={(e) => setBiayaKirim(parseInt(e.target.value) || 0)}
                />
                <InputGroupAddon align="block-start">
                <Label htmlFor="email-2" className="text-foreground">
                    Biaya Kirim
                </Label>
                <Tooltip>
                    <TooltipTrigger asChild>
                    <InputGroupButton
                        variant="ghost"
                        aria-label="Help"
                        className="ml-auto rounded-full"
                        size="icon-xs"
                    >
                        <InfoIcon />
                    </InputGroupButton>
                    </TooltipTrigger>
                    <TooltipContent>
                    <p>Masukkan biaya jika ada biaya pengiriman</p>
                    </TooltipContent>
                </Tooltip>
                </InputGroupAddon>
            </InputGroup>
            </div>
            <div className="text-3xl font-bold text-right mb-4 mr-2">
            Jumlah Total: {formatRupiah(totalsemua)}
            </div>
            <div className="flex gap-3">
            <Button
                variant="destructive" 
                className="flex-1 h-14 text-xl"
                onClick={Reset}
            >
                Reset
            </Button>
            <Button 
                className="flex-1 h-14 text-xl" 
                onClick={handleBayar}
                disabled={loadingBayar || items.length === 0}
            >
                {loadingBayar ? "Memproses..." : "Pesan Barang"}
            </Button>
            </div>
        </div>
    )

}






