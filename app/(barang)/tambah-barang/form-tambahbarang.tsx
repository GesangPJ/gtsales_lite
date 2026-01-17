// Komponen Form Tambah Barang
"use client"

import { useState, useEffect, useRef } from 'react'
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {IconArrowBadgeDownFilled} from "@tabler/icons-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InputGroup,
        InputGroupAddon, 
        InputGroupText,
        InputGroupInput,
        InputGroupTextarea, } from "@/components/ui/input-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {CirclePlus} from "lucide-react"
import { baseUrl } from '@/lib/base-url'

type Kategori = {
  id: number
  nama_kategori: string
}

export default function FormTambahBarang() {
    const [value, setValue] = useState("")
    const maxLength = 250 // banyaknya kata untuk textarea
    const remaining = maxLength - value.length  //sisa kata untuk textarea
    const [loading, setLoading] = useState(false)
    const [kategoris, setKategoris] = useState<Kategori[]>([])
    const [selectedKategori, setSelectedKategori] = useState<Kategori | null>(null)
    const [selectedKategoriId, setSelectedKategoriId] = useState<string>("")
    const formRef = useRef<HTMLFormElement>(null)

    // reset form jika tombol reset diklik
    const clear = () => {
        formRef.current?.reset() 
        setValue("")   // reset keterangan
        setSelectedKategori(null)  // reset kategori
    }

    // ambil nama kategori dari API
    async function getKategori() {
        try {
        const res = await fetch(`${baseUrl}/api/ambil-kategori`)
        if (!res.ok) throw new Error("Gagal ambil data kategori")
        const data: Kategori[] = await res.json()
        setKategoris(data)
        } catch (error) {
        console.error("Data Kategori tidak dapat diambil dari API", error)
        }
    }

    useEffect(() => {
        getKategori()
    }, [])

    const handleSelectKategori = (id: string) => {
        setSelectedKategoriId(id)
        const kategori = kategoris.find(k => k.id.toString() === id)
        setSelectedKategori(kategori || null)
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)

        const formData = new FormData(event.currentTarget)

        const data_barang = {
            nama_barang: formData.get("nama_barang")?.toString().trim(),
            hargajual: formData.get("harga_jual")?.toString().trim(),
            hargabeli: formData.get("harga_beli")?.toString().trim(),
            barcodebarang: formData.get("barcode")?.toString().trim(),
            idkategori: selectedKategori?.id || 0,
            stokbarang: formData.get("stok")?.toString().trim(),
            keterangan: formData.get("keterangan")?.toString().trim(),
        }

        console.log({ data_barang })

        setLoading(true)

        try{
            const res = await fetch(`${baseUrl}/api/tambah-barang`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data_barang)
            })
            if (!res.ok) {
            toast.error("Terjadi kesalahan saat menyimpan data")
            throw new Error("Gagal menyimpan data barang")
            }
            toast.success("Barang berhasil ditambahkan 🎉")
            formRef.current?.reset()
            setValue("")
            setSelectedKategori(null)
        } catch(error){
            console.error("Error Menyimpan barang", error)
        } finally{
            setLoading(false)
        }
    }

    return(
        <form onSubmit={handleSubmit} ref={formRef} className="text-lg">
            <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="nama_barang" className="text-lg">Nama Barang</Label>
                    <Input type="text" id="nama_barang" name="nama_barang" placeholder="Masukkan Nama Barang"  className="border" required/>
                    <div className="mt-3 mb-3">
                        {/* <Label htmlFor="keterangan" className=" text-lg min-w-0 whitespace-nowrap">Pilih Kategori</Label> */}
                            <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                    {selectedKategori
                                        ? selectedKategori.nama_kategori
                                        : "Pilih Kategori"}{" "}
                                    <IconArrowBadgeDownFilled className="ml-2" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 max-h-60 overflow-y-auto p-1" align="start">
                                {kategoris.map((kategori) => (
                                <DropdownMenuItem
                                    key={kategori.id}
                                    onClick={() => setSelectedKategori(kategori)}
                                >
                                    {kategori.nama_kategori}
                                </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>&nbsp;
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="harga_jual" className="text-lg">Harga Jual</Label>
                    <InputGroup  className="border">
                    <InputGroupInput
                    type="number" 
                    name="harga_jual"
                    id="harga_jual" 
                    placeholder="Masukkan Harga Jual Barang" 
                    required/>
                    <InputGroupAddon align="inline-start">
                        <InputGroupText>Rp</InputGroupText>
                    </InputGroupAddon>
                    </InputGroup>
                    
                </div>&nbsp;
                <div className="flex items-center gap-3">
                        
                </div>&nbsp;
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="harga_beli" className="text-lg">Harga Beli</Label>
                    <InputGroup   className="border">
                    <InputGroupInput type="number" id="harga_beli" name="harga_beli" placeholder="Masukkan Harga Beli Barang" required/>
                    <InputGroupAddon align="inline-start">
                        <InputGroupText>Rp</InputGroupText>
                    </InputGroupAddon>
                    </InputGroup>
                </div>&nbsp;
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="barcode" className="text-lg">Kode Barcode Barang</Label>
                    <InputGroup  className="border">
                    <InputGroupInput 
                    type="number"
                    inputMode='numeric'
                    min={0}
                    minLength={8}
                    maxLength={14}
                    pattern="[0-9]*"
                    id="barcode" 
                    name="barcode" 
                    placeholder="Kode Barcode Opsional"/>
                    </InputGroup>
                </div>&nbsp;
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="stok" className="text-lg">Stok Awal</Label>
                    <Input 
                      className="border"
                    min={0}
                    type="number" 
                    id="stok"
                    name="stok" 
                    placeholder="Masukkan Stok awal barang"/>
                </div>&nbsp;
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="keterangan" className="text-lg">Keterangan</Label>
                    <InputGroup className="border">
                        <InputGroupTextarea
                        name="keterangan"
                        id="keterangan"
                        placeholder="Masukkan Keterangan Barang"
                        value={value}
                        onChange={(e) => setValue(e.target.value.slice(0, maxLength))}  // Enforce limit
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
                </div>&nbsp;
                
                <div className="flex gap-3 mt-6">
                <Button
                    variant="destructive" 
                    className="flex-1 h-14 text-xl"
                    onClick={clear}
                >
                    Reset
                </Button>
                <Button type="submit" disabled={loading || !selectedKategori} className="flex-1 h-14 text-xl" >
                    <CirclePlus className="h-12 w-12" />
                    {loading ? "Menyimpan..." : "Tambah Barang"}
                </Button>
                </div>
                
        </form>
            
    )
}




