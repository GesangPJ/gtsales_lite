// Komponen Form Tambah Barang

import Link from "next/link"
import {CircleChevronLeft, CircleCheckBig} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InputGroup,
        InputGroupAddon, 
        InputGroupText,
        InputGroupInput,
        InputGroupTextarea, } from "@/components/ui/input-group"

export default function FormTambahBarang() {

    return(
        <div className="text-lg">
            <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="nama_barang" className="text-lg">Nama Barang</Label>
                    <Input type="text" id="nama_barang" placeholder="Masukkan Nama Barang" className="border border-primary" required/>
                </div>&nbsp;
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="harga_jual" className="text-lg">Harga Jual</Label>
                    <InputGroup className="border border-primary">
                    <InputGroupInput
                    type="number" 
                    id="harga_jual" 
                    placeholder="Masukkan Harga Jual Barang" 
                    required/>
                    <InputGroupAddon align="inline-start">
                        <InputGroupText>Rp</InputGroupText>
                    </InputGroupAddon>
                    </InputGroup>
                </div>&nbsp;
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="harga_beli" className="text-lg">Harga Beli</Label>
                    <InputGroup  className="border border-primary">
                    <InputGroupInput type="number" id="harga_beli" placeholder="Masukkan Harga Beli Barang" required/>
                    <InputGroupAddon align="inline-start">
                        <InputGroupText>Rp</InputGroupText>
                    </InputGroupAddon>
                    </InputGroup>
                </div>&nbsp;
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="stok" className="text-lg">Stok Awal</Label>
                    <Input 
                     className="border border-primary"
                    defaultValue="0" 
                    type="number" 
                    id="stok" 
                    placeholder="Masukkan Stok awal barang"/>
                </div>&nbsp;
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="keterangan" className="text-lg">Keterangan</Label>
                    <InputGroup  className="border border-primary">
                    <InputGroupTextarea placeholder="Masukkan Keterangan Barang" id="keterangan" />
                    <InputGroupAddon align="block-end">
                    <InputGroupText className="text-muted-foreground text-xs">
                        .
                    </InputGroupText>
                    </InputGroupAddon>
                    </InputGroup>
                </div>&nbsp;
                
        </div>
            
    )
}




