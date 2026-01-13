
// Tabel menampilkan status pembelian Barang

import { DataTable } from "@/components/data-table"
import {columns} from "./kolom-datapembelian"
import { baseUrl } from "@/lib/base-url"

type Pembelian = {
  id: number,
  nama_vendor: string,
  harga_beli: number,
  status: string,
  jumlahtotalharga: number,
  biayakirim: number,
}


export default async function TabelPembelian(){

    let data_pembelian: Pembelian[] = []

    try{
        const res = await fetch(`${baseUrl}/api/status-pembelian`, 
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
















