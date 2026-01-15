/*
  Warnings:

  - You are about to drop the column `produkId` on the `TransaksiDetail` table. All the data in the column will be lost.
  - Added the required column `barangId` to the `TransaksiDetail` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TransaksiDetail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "transaksiId" INTEGER NOT NULL,
    "barangId" INTEGER NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "harga" INTEGER NOT NULL,
    "total" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "TransaksiDetail_transaksiId_fkey" FOREIGN KEY ("transaksiId") REFERENCES "Transaksi" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TransaksiDetail_barangId_fkey" FOREIGN KEY ("barangId") REFERENCES "Barang" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TransaksiDetail" ("harga", "id", "jumlah", "total", "transaksiId") SELECT "harga", "id", "jumlah", "total", "transaksiId" FROM "TransaksiDetail";
DROP TABLE "TransaksiDetail";
ALTER TABLE "new_TransaksiDetail" RENAME TO "TransaksiDetail";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
