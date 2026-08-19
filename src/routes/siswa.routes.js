// /src/routes/guest.routes.js

const express = require('express');
const router = express.Router();

const siswaController = require('../controllers/siswa.controller');
const validate = require('../middlewares/validation.middleware');
const { siswaSchema } = require('../schemas/siswa.schema');

// GET semua data tamu
router.get('/', siswaController.getAllSiswa);

// POST Create Tamu
router.post('/', validate(siswaSchema), siswaController.createSiswa);

// GET Detail Tamu
router.get('/:id', siswaController.getSiswa);

// PUT Update Tamu
router.put('/:id', validate(siswaSchema), siswaController.updateSiswa);

// DELETE Hard Delete
router.delete('/:id', siswaController.deleteSiswa);

module.exports = router;