// Komponen form update stok barang
"use client"

import { useState } from "react"
import { DataTable } from "@/components/data-table"
import { stokColumns, StokBarang } from "./stok-column"

type Props = {
  initialData: StokBarang[]
}

export default function TabelStokBarang({ initialData }: Props){
  const [data, setData] = useState<StokBarang[]>(initialData)
  const [editedStok, setEditedStok] = useState<Record<number, number>>({})

    return(
        <div className="">
            <DataTable
            columns={stokColumns(editedStok, setEditedStok)}
            data={data}
            />

        </div>
    )
}





