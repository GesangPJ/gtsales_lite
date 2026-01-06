-- CreateTable
CREATE TABLE "Barang" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama_barang" TEXT NOT NULL,
    "harga_jual" INTEGER NOT NULL,
    "harga_beli" INTEGER NOT NULL,
    "stok" INTEGER NOT NULL DEFAULT 0,
    "kategoriId" INTEGER NOT NULL DEFAULT 1,
    "vendorId" INTEGER,
    "barcode" TEXT,
    "kadaluarsa" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'Aktif',
    "keterangan" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Barang_kategoriId_fkey" FOREIGN KEY ("kategoriId") REFERENCES "Kategori" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Barang_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TransaksiDetail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "transaksiId" INTEGER NOT NULL,
    "produkId" INTEGER NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "harga" INTEGER NOT NULL,
    "total" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "TransaksiDetail_transaksiId_fkey" FOREIGN KEY ("transaksiId") REFERENCES "Transaksi" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TransaksiDetail_produkId_fkey" FOREIGN KEY ("produkId") REFERENCES "Barang" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Transaksi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kode" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'LUNAS',
    "pelanggan" TEXT,
    "metode" TEXT NOT NULL DEFAULT 'CASH',
    "jumlahTotal" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Pembelian" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kode" TEXT NOT NULL,
    "status" TEXT DEFAULT 'LUNAS',
    "biayakirim" INTEGER,
    "vendorId" INTEGER NOT NULL,
    "jumlahtotalharga" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Pembelian_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PembelianDetail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pembelianId" INTEGER NOT NULL,
    "barangId" INTEGER NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "hargabeli" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    CONSTRAINT "PembelianDetail_pembelianId_fkey" FOREIGN KEY ("pembelianId") REFERENCES "Pembelian" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PembelianDetail_barangId_fkey" FOREIGN KEY ("barangId") REFERENCES "Barang" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Kategori" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama_kategori" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Vendor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "notelp" TEXT,
    "alamat" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Toko" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "notelp" TEXT,
    "alamat" TEXT,
    "npwp" TEXT,
    "siup" TEXT,
    "pkp_status" TEXT DEFAULT 'N',
    "ppn" REAL NOT NULL DEFAULT 0.11,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Transaksi_kode_key" ON "Transaksi"("kode");

-- CreateIndex
CREATE UNIQUE INDEX "Pembelian_kode_key" ON "Pembelian"("kode");

-- CreateIndex
CREATE UNIQUE INDEX "Kategori_nama_kategori_key" ON "Kategori"("nama_kategori");

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_email_key" ON "Vendor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Toko_email_key" ON "Toko"("email");
