// Impor PrismaClient dari paket @prisma/client
import { PrismaClient } from "@prisma/client";

// Buat variabel global bernama globalForPrisma untuk menyimpan instance Prisma Client
// Ditipekan sebagai objek dengan properti prisma yang bisa berisi PrismaClient atau undefined
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Ekspor konstanta prisma yang mencoba mengambil nilai dari globalForPrisma.prisma jika ada
// Jika tidak ada, buat instance PrismaClient baru
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// Di development, set ulang globalForPrisma.prisma ke instance prisma yang diekspor
// Agar selalu dibuat instance baru saat di-import, bukan menggunakan instance global
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
