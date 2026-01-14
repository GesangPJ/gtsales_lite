// keranjang menggunakan zustand

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: number
  nama_barang: string
  harga_jual: number
  jumlah: number  // Editable ini
}

interface CartState {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'jumlah'> & { jumlah: number }) => void
  updateQty: (id: number, qty: number) => void
  removeItem: (id: number) => void
  clear: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => ({ items: [...state.items, { ...item }] })),
      updateQty: (id, qty: number) => set((state) => ({  // ✅ number
        items: state.items.map(item => 
          item.id === id ? { ...item, jumlah: qty } : item
        )
      })),
      removeItem: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id)
      })),
      clear: () => set({ items: [] })
    }),
    { name: 'pos-cart' }
  )
)
