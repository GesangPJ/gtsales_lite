"use client"

import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { baseUrl } from "@/lib/base-url"

type Props = {
  id: number
  stok: number
  onSuccess: () => void
}

export default function UpdateStokButton({
  id,
  stok,
  onSuccess,
}: Props) {

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/update-stok`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          stokbarang: stok,
        }),
      })

      if (!res.ok) throw new Error()

      toast.success(`Stok barang ${id} berhasil diupdate`)
      onSuccess()
    } catch {
      toast.error("Gagal update stok")
    }
  }

  return (
    <Button size="sm" onClick={handleUpdate}>
      Update Stok
    </Button>
  )
}
