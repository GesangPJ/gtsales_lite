// Tabel menampilkan status pembelian Barang

import { DataTable } from "@/components/data-table"
import {columns} from "./kolom-statuspembelian"

type Pembelian = {
  id: number,
  nama_vendor: string,
  harga_beli: number,
  jumlahtotalharga: number,
  biayakirim: number,
}


export default async function TabelStatus(){

    let status_p: Pembelian[] = []

    try{
        const res = await fetch(`/api/status-pembelian`, 
            {next: {revalidate: 3600} })

        if(!res.ok){
            throw new Error(`Gagal ambil status pembelian`)
        }

        status_p = await res.json()
    
    }catch(error){

    }

    return(
        <div>
            <DataTable
            columns={columns}
            data={status_p}
            />

        </div>
    )
}


