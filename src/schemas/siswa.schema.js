const { z } = require('zod');

const siswaSchema = z.object({
    kodeSiswa: z.string().min(3).max(30),
    namaSiswa: z.string().min(3).max(100),
    phone: z.string().min(10).max(20),
    alamat: z.string().max(255).optional().or(z.literal('')),
    
    // Format YYYY-MM-DD
    tanggalLahir: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format tanggal lahir harus YYYY-MM-DD"),
    
    jurusanId: z.number().int().positive().nullable().optional() 
});

module.exports = {
    siswaSchema
};