
// Tabel menampilkan status pembelian Barang

import { DataTable } from "@/components/data-table"
import {columns} from "./kolom-datapembelian"
import { baseUrl } from "@/lib/base-url"
import { Pembelian } from "./kolom-datapembelian"


export default async function TabelPembelian(){

    let data_pembelian: Pembelian[] = []

    try{
        const res = await fetch(`${baseUrl}/api/transaksi-pembelian`, 
            {next: {revalidate: 3600} })

        if(!res.ok){
            throw new Error(`Gagal ambil data pembelian`)
        }

        const status_p = await res.json()
        data_pembelian = status_p.data || []

    
    }catch(error){

    }

    return(
        <div className="w-full overflow-x-auto">
            <DataTable
            columns={columns}
            data={data_pembelian}
            />

        </div>
    )
}
















