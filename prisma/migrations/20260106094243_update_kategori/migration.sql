-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Kategori" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama_kategori" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'AKTIF',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Kategori" ("createdAt", "id", "nama_kategori", "updatedAt") SELECT "createdAt", "id", "nama_kategori", "updatedAt" FROM "Kategori";
DROP TABLE "Kategori";
ALTER TABLE "new_Kategori" RENAME TO "Kategori";
CREATE UNIQUE INDEX "Kategori_nama_kategori_key" ON "Kategori"("nama_kategori");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
