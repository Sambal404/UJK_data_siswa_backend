const db = require('../config/database');

// Tambahkan tanggalLahir pada mapping response
const mapSiswaResponse = (row) => ({
    id: row.id,
    kodeSiswa: row.kode_siswa,
    namaSiswa: row.nama_siswa,
    phone: row.phone,
    alamat: row.alamat,

    tanggalLahir: row.tanggal_lahir 
        ? (new Date(row.tanggal_lahir).toISOString().length > 10 
            ? new Date(row.tanggal_lahir).toISOString().split('T')[0] 
            : row.tanggal_lahir)
        : null,
        
    jurusanId: row.jurusan_id,
    namaJurusan: row.nama_jurusan || null,
    createdAt: row.created_at,
    updated_at: row.updated_at || null,
});

// READ: Get all data dengan Pagination, Search, dan LEFT JOIN Jurusan
async function getAllSiswa(query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const offset = (page - 1) * limit;

    const search = query.search ? `%${query.search}%` : '%%';

    const [rows] = await db.execute(
        `
        SELECT s.id, s.kode_siswa, s.nama_siswa, s.phone, s.alamat, s.tanggal_lahir, s.jurusan_id, 
               j.nama AS nama_jurusan, s.created_at, s.updated_at
        FROM siswa s
        LEFT JOIN jurusan j ON s.jurusan_id = j.id
        WHERE s.nama_siswa LIKE ? OR s.kode_siswa LIKE ?
        ORDER BY s.id DESC
        LIMIT ${limit} OFFSET ${offset}
        `,
        [search, search]
    );

    const [countResult] = await db.execute(
        `
        SELECT COUNT(*) as total
        FROM siswa s
        WHERE s.nama_siswa LIKE ? OR s.kode_siswa LIKE ?
        `,
        [search, search]
    );

    const totalItems = countResult[0].total;
    const totalPages = Math.ceil(totalItems / limit);

    const mappedSiswa = rows.map(row => mapSiswaResponse(row));

    return {
        data: mappedSiswa,
        pagination: {
            currentPage: page,
            limit: limit,
            totalItems: totalItems,
            totalPages: totalPages
        }
    };
}

// Create: Add new Siswa
async function create(data) {
    // Cek apakah kode_siswa sudah terdaftar
    const [existing] = await db.execute(
        `SELECT id FROM siswa WHERE kode_siswa = ?`, 
        [data.kodeSiswa]
    );

    if (existing.length > 0) {
        const error = new Error("Kode siswa already registered for another student");
        error.statusCode = 409;
        error.code = "DUPLICATE_KODE_SISWA";
        throw error;
    }

    const [result] = await db.execute(
        `INSERT INTO siswa (kode_siswa, nama_siswa, phone, alamat, tanggal_lahir, jurusan_id)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
            data.kodeSiswa, 
            data.namaSiswa, 
            data.phone, 
            data.alamat || null, 
            data.tanggalLahir, // <--- TAMBAH DI SINI
            data.jurusanId || null
        ]
    );

    return getById(result.insertId);
}

// READ: Get data siswa by id
async function getById(id) {
    const [rows] = await db.execute(
        `
        SELECT s.id, s.kode_siswa, s.nama_siswa, s.phone, s.alamat, s.tanggal_lahir, s.jurusan_id, 
               j.nama AS nama_jurusan, s.created_at, s.updated_at
        FROM siswa s
        LEFT JOIN jurusan j ON s.jurusan_id = j.id
        WHERE s.id = ?
        `, [id]
    );

    if (rows.length === 0) {
        const error = new Error("Siswa data not found");
        error.statusCode = 404;
        error.code = "SISWA_NOT_FOUND";
        throw error;
    }

    return mapSiswaResponse(rows[0]);
}

// PUT: Update data Siswa
async function update(id, data) {
    await getById(id); // Cek eksistensi

    // Cek duplikasi kode_siswa pada record lain
    const [existing] = await db.execute(
        `SELECT id FROM siswa WHERE kode_siswa = ? AND id != ?`, 
        [data.kodeSiswa, id]
    );

    if (existing.length > 0) {
        const error = new Error("Kode siswa already listed by other student");
        error.statusCode = 409;
        error.code = "DUPLICATE_KODE_SISWA";
        throw error;
    }

    await db.execute(
        `UPDATE siswa 
         SET kode_siswa = ?, nama_siswa = ?, phone = ?, alamat = ?, tanggal_lahir = ?, jurusan_id = ?
         WHERE id = ?`,
        [
            data.kodeSiswa, 
            data.namaSiswa, 
            data.phone, 
            data.alamat || null, 
            data.tanggalLahir, // <--- TAMBAH DI SINI
            data.jurusanId || null, 
            id
        ]
    );

    return getById(id);
}

// DELETE: Hard delete Siswa
async function hardDelete(id) {
    const [result] = await db.execute(`DELETE FROM siswa WHERE id = ?`, [id]);

    if (result.affectedRows === 0) {
        const error = new Error("Siswa data not found");
        error.statusCode = 404;
        error.code = "SISWA_NOT_FOUND";
        throw error;
    }
    return true;
}

module.exports = {
    getAllSiswa,
    create,
    getById,
    update,
    hardDelete
};