// Tabel menampilkan status pembelian Barang

import { DataTable } from "@/components/data-table"
import {columns} from "./kolom-statuspembelian"
import { Pembelian } from "./kolom-statuspembelian"
import { baseUrl } from "@/lib/base-url"


export default async function TabelStatus(){

    let status_p: Pembelian[] = []

    try{
        const res = await fetch(`${baseUrl}/api/status-pembelian`, 
            {next: {revalidate: 60} })

        if(!res.ok){
            throw new Error(`Gagal ambil status pembelian`)
        }
        const data_res = await res.json()
        status_p = data_res.data || []
    
    }catch(error){

    }

    return(
        <div className="w-full overflow-x-auto">
            <DataTable
            columns={columns}
            data={status_p}
            />

        </div>
    )
}


