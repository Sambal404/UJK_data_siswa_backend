const { z } = require('zod');

// Schema untuk Create & Update Jurusan
const jurusanSchema = z.object({
    nama: z.string().min(2).max(50),
    deskripsi: z.string().optional().or(z.literal('')),
});

module.exports = {
    jurusanSchema
};