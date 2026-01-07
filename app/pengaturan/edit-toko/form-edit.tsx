import Link from "next/link"
import {CircleChevronLeft, CircleCheckBig} from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { InfoIcon } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Label } from "@/components/ui/label"

import {prisma} from '@/lib/prisma'
import { Prisma } from "@/generated/prisma/client"

import { Button } from "@/components/ui/button"

type Toko = Prisma.TokoGetPayload<{
  select: {
  id : true
  nama : true
  alamat : true
  notelp : true
  email : true
  npwp : true
  pkp_status : true
  siup : true
  ppn : true
  }
}>

async function getToko(): Promise<Toko[]> {
  try{
    return await prisma.toko.findMany({
      where: {id: 1},
      select: {
        id : true,
        nama : true,
        alamat : true,
        notelp : true,
        email : true,
        npwp : true,
        pkp_status : true,
        siup : true,
        ppn : true,
      },
    })
  } catch (error) {
    console.error("Data Toko tidak dapat diambil", error)
    return []
  }
}

export default async function FormEditToko() {

    const datatoko = await getToko()

    const pkp_txt = datatoko[0]?.pkp_status === 'Y' ? 'PKP' : 'Non PKP'

  // ubah ppn ke format persen
  const tarif_ppn = (datatoko[0]?.ppn || 0 ) * 100

  return(
    <div className="max-w-200 ">
        <InputGroup className="text-lg">
        <InputGroupInput 
            id="i_namatoko" 
            placeholder="Nama Toko"
            defaultValue={datatoko[0]?.nama ?? ""}
            required
            >

        </InputGroupInput>
        <InputGroupAddon align="block-start">  
            <Label htmlFor="namatoko" className="text-foreground">
                Nama Toko
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
                <p>Nama Toko tidak boleh kosong</p>
                </TooltipContent>
        </Tooltip>
        </InputGroupAddon>
    </InputGroup>
    <p>&nbsp;</p>
    {/* Alamat toko */}
    <InputGroup>
        <InputGroupInput id="i_alamat" 
        placeholder="Alamat Toko"
        defaultValue={datatoko[0]?.alamat ?? ""}
        required></InputGroupInput>
        <InputGroupAddon align="block-start">  
            <Label htmlFor="i_alamat" className="text-foreground">
                Alamat Toko
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
                <p>Alamat Toko tidak boleh kosong</p>
                </TooltipContent>
        </Tooltip>
        </InputGroupAddon>
    </InputGroup>
    <p>&nbsp;</p>
    {/* Email toko */}
    <InputGroup>
        <InputGroupInput id="i_email" 
        placeholder="Email Toko"
        defaultValue={datatoko[0]?.email ?? ""}
        required
        ></InputGroupInput>
        <InputGroupAddon align="block-start">  
            <Label htmlFor="namatoko" className="text-foreground">
                Email Toko
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
                <p>Email tidak boleh kosong</p>
                </TooltipContent>
        </Tooltip>
        </InputGroupAddon>
    </InputGroup>
    <p>&nbsp;</p>
    {/* Nomor telepon toko */}
    <InputGroup>
        <InputGroupInput id="i_notelp" 
        placeholder="Nomor Telepon Toko"
        defaultValue={datatoko[0]?.notelp ?? ""}
        ></InputGroupInput>
        <InputGroupAddon align="block-start">  
            <Label htmlFor="namatoko" className="text-foreground">
                Nomor Telepon Toko
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
                <p>Nomor Telepon opsional</p>
                </TooltipContent>
        </Tooltip>
        </InputGroupAddon>
    </InputGroup>
    <p>&nbsp;</p>
    {/* Nomor NPWP toko */}
    <InputGroup>
        <InputGroupInput id="i_notelp" 
        placeholder="Nomor NPWP Toko"
        defaultValue={datatoko[0]?.npwp ?? ""}
        ></InputGroupInput>
        <InputGroupAddon align="block-start">  
            <Label htmlFor="namatoko" className="text-foreground">
                Nomor NPWP Toko
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
                <p>Nomor NPWP opsional</p>
                </TooltipContent>
        </Tooltip>
        </InputGroupAddon>
    </InputGroup>
    <p>&nbsp;</p>
    {/* Nomor SIUP toko */}
    <InputGroup>
        <InputGroupInput id="i_siup" 
        placeholder="SIUP Toko"
        defaultValue={datatoko[0]?.siup ?? ""}
        ></InputGroupInput>
        <InputGroupAddon align="block-start">  
            <Label htmlFor="i_siup" className="text-foreground">
                Nomor Surat Izin Usaha (SIUP) Toko
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
                <p>Nomor SIUP opsional</p>
                </TooltipContent>
        </Tooltip>
        </InputGroupAddon>
    </InputGroup>
    <p>&nbsp;</p>
    {/* Ppn */}
    <InputGroup>
        <InputGroupInput id="i_ppn" 
        placeholder="Tarif Ppn"
        defaultValue={tarif_ppn ?? ""}
        ></InputGroupInput>
        <InputGroupAddon>  
            <Label htmlFor="i_ppn" className="text-foreground">
                Tarif Ppn
            </Label>
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
            <InputGroupText>%</InputGroupText>
        </InputGroupAddon>
    </InputGroup>
    <p>&nbsp;</p>
    
    <div className="flex items-center gap-4">
        <Button variant="outline" size="lg" className="text-lg flex items-center gap-2" >
            <CircleChevronLeft size={64}/>
            <Link href="/pengaturan">Pengaturan </Link>
        </Button>

    <div className="ml-auto">
        <Button variant="outline" size="lg" className="text-lg flex items-center gap-2">
            Simpan Perubahan
            <CircleCheckBig size={64}/>
        </Button>

    </div>
        

        </div>
    </div>

  )
}