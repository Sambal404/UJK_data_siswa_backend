const jurusanService = require('../services/jurusan.service');

// GET: Ambil semua data jurusan beserta pagination
async function getAllJurusan(req, res, next) {
    try {
        const result = await jurusanService.getAllJurusan(req.query);
        
        return res.status(200).json({
            success: true,
            message: "Data jurusan berhasil diambil",
            data: result.data,
            pagination: result.pagination
        });
    } catch (error) {
        next(error)
    }
}

// GET: Ambil data jurusan berdasarkan ID
async function getById(req, res, next) {
    try {
        const { id } = req.params;
        const result = await jurusanService.getById(id);
        
        return res.status(200).json({
            success: true,
            message: "Data jurusan berhasil diambil",
            data: result
        });
    } catch (error) {
        next(error)
    }
}

// POST: Tambah jurusan baru
async function create(req, res, next) {
    try {
        const result = await jurusanService.create(validatedData);
        
        return res.status(201).json({
            success: true,
            message: "Jurusan berhasil ditambahkan",
            data: result
        });
    } catch (error) {
        next(error)
    }
}

// PUT: Update data jurusan
async function update(req, res, next) {
    try {
        const { id } = req.params;

        const result = await jurusanService.update(id, validatedData);
        
        return res.status(200).json({
            success: true,
            message: "Jurusan berhasil diperbarui",
            data: result
        });
    } catch (error) {
        next(error)
    }
}

// DELETE: Hapus jurusan
async function remove(req, res, next) {
    try {
        const { id } = req.params;
        
        await jurusanService.hardDelete(id);
        
        return res.status(200).json({
            success: true,
            message: "Jurusan berhasil dihapus"
        });
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllJurusan,
    getById,
    create,
    update,
    remove
};