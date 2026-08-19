const siswaService = require('../services/siswa.service');

async function getAllSiswa(req, res, next) {
    try {
        const result = await siswaService.getAllSiswa(req.query);

        return res.status(200).json({
            success: true,
            message: "Get siswa list successfully",
            data: result.data,
            pagination: result.pagination
        });
    } catch (error) {
        next(error);
    }
}

async function createSiswa(req, res, next) {
    try {
        const siswa = await siswaService.create(req.body);
        return res.status(201).json({
            success: true,
            message: "Siswa data added successfully",
            siswa: siswa
        });
    } catch (error) {
        next(error);
    }
}

async function getSiswa(req, res, next) {
    try {
        const siswa = await siswaService.getById(req.params.id);
        return res.status(200).json({
            success: true,
            siswa: siswa
        });
    } catch (error) {
        next(error);
    }
}

async function updateSiswa(req, res, next) {
    try {
        const siswa = await siswaService.update(req.params.id, req.body);
        return res.status(200).json({
            success: true,
            message: "Siswa data changed successfully.",
            siswa: siswa
        });
    } catch (error) {
        next(error);
    }
}

async function deleteSiswa(req, res, next) {
    try {
        await siswaService.hardDelete(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Siswa permanently deleted from database."
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllSiswa,
    createSiswa,
    getSiswa,
    updateSiswa,
    deleteSiswa
};