// Tabel transaksi penjualan

import { baseUrl } from "@/lib/base-url"
import {columns, Penjualan} from "./kolom-data-penjualan"
import { DataTable } from "@/components/data-table"

export default async function TabelTransaksi(){

    let dataTransaksi: Penjualan[] = []

  try{
    const res = await fetch(`${baseUrl}/api/transaksi-penjualan`,
        {next:{revalidate:120}})

    if(!res.ok){
        throw new Error(`Gagal ambil data transaksi penjualan`)
    }

    const response = await res.json()
    dataTransaksi = response.data || []
    
  }catch(error){

  }

    return(
        <div className="w-full overflow-x-auto">
            <DataTable
            columns={columns}
            data={dataTransaksi}
            />
        </div>
    )
}






