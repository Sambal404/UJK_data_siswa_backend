const express = require('express');
const validate = require('../middlewares/validation.middleware');
const jurusanController = require('../controllers/jurusan.controller');
const jurusanSchema = require('../schemas/jurusan.schema');

const router = express.Router();

// GET /api/v1/jurusan - Ambil semua jurusan (dengan pagination & search)
router.get('/', jurusanController.getAllJurusan);

// POST /api/v1/jurusan - Tambah jurusan baru
router.post('/', validate(jurusanSchema), jurusanController.create);

// PUT /api/v1/jurusan/:id - Update jurusan berdasarkan ID
router.put('/:id', validate(jurusanSchema), jurusanController.update);

// DELETE /api/v1/jurusan/:id - Hapus jurusan berdasarkan ID
router.delete('/:id', jurusanController.remove);

module.exports = router;