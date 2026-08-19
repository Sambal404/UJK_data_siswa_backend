const { z } = require('zod');

// Schema untuk POST (Create) dan PUT (Update) Siswa
const siswaSchema = z.object({
    kodeSiswa: z.string().min(3, "Kode siswa minimal 3 karakter").max(30, "Kode siswa maksimal 30 karakter"),
    namaSiswa: z.string().min(3, "Nama siswa minimal 3 karakter").max(100, "Nama siswa maksimal 100 karakter"),
    phone: z.string().min(10, "Nomor telepon minimal 10 digit").max(20, "Nomor telepon maksimal 20 karakter"),
    alamat: z.string().max(255, "Alamat maksimal 255 karakter").optional().or(z.literal('')),
    jurusanId: z.number({
        required_error: "Jurusan harus dipilih",
        invalid_type_error: "Jurusan ID harus berupa angka"
    }).int().positive("Jurusan ID tidak valid")
});

module.exports = {
    siswaSchema
};