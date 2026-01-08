/*
  Warnings:

  - You are about to drop the `Vendor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `vendorId` on the `Barang` table. All the data in the column will be lost.
  - You are about to drop the column `vendorId` on the `Pembelian` table. All the data in the column will be lost.
  - You are about to drop the column `pkp_status` on the `Toko` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Vendor_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Vendor";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Barang" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama_barang" TEXT NOT NULL,
    "harga_jual" INTEGER NOT NULL,
    "harga_beli" INTEGER NOT NULL,
    "stok" INTEGER NOT NULL DEFAULT 0,
    "kategoriId" INTEGER NOT NULL DEFAULT 1,
    "barcode" TEXT,
    "kadaluarsa" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'Aktif',
    "keterangan" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Barang_kategoriId_fkey" FOREIGN KEY ("kategoriId") REFERENCES "Kategori" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Barang" ("barcode", "createdAt", "harga_beli", "harga_jual", "id", "kadaluarsa", "kategoriId", "keterangan", "nama_barang", "status", "stok", "updatedAt") SELECT "barcode", "createdAt", "harga_beli", "harga_jual", "id", "kadaluarsa", "kategoriId", "keterangan", "nama_barang", "status", "stok", "updatedAt" FROM "Barang";
DROP TABLE "Barang";
ALTER TABLE "new_Barang" RENAME TO "Barang";
CREATE TABLE "new_Pembelian" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kode" TEXT NOT NULL,
    "status" TEXT DEFAULT 'LUNAS',
    "biayakirim" INTEGER,
    "nama_vendor" TEXT,
    "jumlahtotalharga" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Pembelian" ("biayakirim", "createdAt", "id", "jumlahtotalharga", "kode", "status", "updatedAt") SELECT "biayakirim", "createdAt", "id", "jumlahtotalharga", "kode", "status", "updatedAt" FROM "Pembelian";
DROP TABLE "Pembelian";
ALTER TABLE "new_Pembelian" RENAME TO "Pembelian";
CREATE UNIQUE INDEX "Pembelian_kode_key" ON "Pembelian"("kode");
CREATE TABLE "new_Toko" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "notelp" TEXT,
    "alamat" TEXT,
    "npwp" TEXT,
    "siup" TEXT,
    "ppn" REAL NOT NULL DEFAULT 0.11,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Toko" ("alamat", "email", "id", "nama", "notelp", "npwp", "ppn", "siup", "updatedAt") SELECT "alamat", "email", "id", "nama", "notelp", "npwp", "ppn", "siup", "updatedAt" FROM "Toko";
DROP TABLE "Toko";
ALTER TABLE "new_Toko" RENAME TO "Toko";
CREATE UNIQUE INDEX "Toko_email_key" ON "Toko"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
