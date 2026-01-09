// Form input kategori barang
"use client"

import { useState } from 'react'
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {CircleCheckBig} from "lucide-react"

export default function FormInputKategori(){
    const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const nama = formData.get("nama")?.toString().trim()

    if (!nama) {
      toast.error("Nama kategori wajib diisi")
      return
    }

    setLoading(true)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/simpan-kategori`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama_kategori: nama,
        }),
      })

      if (!res.ok) {
        toast.error("Terjadi kesalahan saat menyimpan data")
        throw new Error("Gagal menyimpan kategori")
      }

      toast.success("Kategori berhasil ditambahkan 🎉")
      event.currentTarget.reset()
    } catch (error) {
    //   toast.error("Terjadi kesalahan saat menyimpan data")
    } finally {
      setLoading(false)
    }
  }

    return(
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-3">
                <Label htmlFor="nama" className="text-lg">Tambah Kategori Barang</Label>
                <Input
                    id="nama"
                    name="nama"
                    placeholder="Masukkan nama kategori"
                    disabled={loading}
                    />
            </div>

                <Button type="submit" disabled={loading}>
                    <CircleCheckBig className="mr-2 h-4 w-4" />
                    {loading ? "Menyimpan Kategori..." : "Simpan Kategori"}
                </Button>

        </form>
    )
}




