/*
  Warnings:

  - You are about to drop the column `pelanggan` on the `Transaksi` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaksi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kode" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'LUNAS',
    "metode" TEXT NOT NULL DEFAULT 'CASH',
    "diskon" INTEGER,
    "jumlahTotal" INTEGER NOT NULL,
    "keterangan" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Transaksi" ("createdAt", "diskon", "id", "jumlahTotal", "keterangan", "kode", "metode", "status", "updatedAt") SELECT "createdAt", "diskon", "id", "jumlahTotal", "keterangan", "kode", "metode", "status", "updatedAt" FROM "Transaksi";
DROP TABLE "Transaksi";
ALTER TABLE "new_Transaksi" RENAME TO "Transaksi";
CREATE UNIQUE INDEX "Transaksi_kode_key" ON "Transaksi"("kode");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
