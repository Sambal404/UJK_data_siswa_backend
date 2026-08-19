const db = require('../config/database');

const mapJurusanResponse = (row) => ({
    id: row.id,
    nama: row.nama,
    deskripsi: row.deskripsi,
    createdAt: row.created_at,
    updatedAt: row.updated_at
});

// READ: Get all jurusan (Pagination & Search)
async function getAllJurusan(query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const offset = (page - 1) * limit;

    const search = query.search ? `%${query.search}%` : '%%';

    // Menggunakan string interpolation untuk limit & offset agar aman di mysql2
    const [rows] = await db.execute(
        `
        SELECT id, nama, deskripsi, created_at, updated_at
        FROM jurusan
        WHERE nama LIKE ?
        ORDER BY id DESC
        LIMIT ${limit} OFFSET ${offset}
        `,
        [search]
    );

    const [countResult] = await db.execute(
        `
        SELECT COUNT(*) as total
        FROM jurusan
        WHERE nama LIKE ?
        `,
        [search]
    );

    const totalItems = countResult[0].total;
    const totalPages = Math.ceil(totalItems / limit);

    return {
        data: rows.map(row => mapJurusanResponse(row)),
        pagination: {
            currentPage: page,
            limit: limit,
            totalItems: totalItems,
            totalPages: totalPages
        }
    };
}

// READ: Get Jurusan by ID
async function getById(id) {
    const [rows] = await db.execute(
        `SELECT id, nama, deskripsi, created_at, updated_at FROM jurusan WHERE id = ?`,
        [id]
    );

    if (rows.length === 0) {
        const error = new Error("Jurusan data not found");
        error.statusCode = 404;
        error.code = "JURUSAN_NOT_FOUND";
        throw error;
    }

    return mapJurusanResponse(rows[0]);
}

// CREATE: Add new Jurusan
async function create(data) {
    // Cek duplikasi nama jurusan
    const [existing] = await db.execute(
        `SELECT id FROM jurusan WHERE nama = ?`,
        [data.nama]
    );

    if (existing.length > 0) {
        const error = new Error("Nama jurusan already exists");
        error.statusCode = 409;
        error.code = "DUPLICATE_JURUSAN_NAME";
        throw error;
    }

    const isActive = data.isActive !== undefined ? data.isActive : true;

    const [result] = await db.execute(
        `INSERT INTO jurusan (nama, deskripsi, is_active) VALUES (?, ?, ?)`,
        [data.nama, data.deskripsi || null, isActive]
    );

    return getById(result.insertId);
}

// UPDATE: Update Jurusan
async function update(id, data) {
    await getById(id); // Cek apakah data ada

    // Cek duplikasi nama jurusan pada ID lain
    const [existing] = await db.execute(
        `SELECT id FROM jurusan WHERE nama = ? AND id != ?`,
        [data.nama, id]
    );

    if (existing.length > 0) {
        const error = new Error("Nama jurusan already exists");
        error.statusCode = 409;
        error.code = "DUPLICATE_JURUSAN_NAME";
        throw error;
    }

    const isActive = data.isActive !== undefined ? data.isActive : true;

    await db.execute(
        `UPDATE jurusan SET nama = ?, deskripsi = ?, is_active = ? WHERE id = ?`,
        [data.nama, data.deskripsi || null, isActive, id]
    );

    return getById(id);
}

// DELETE: Hard Delete Jurusan + Set jurusan_id siswa menjadi NULL
async function hardDelete(id) {
    // Set jurusan_id milik siswa yang terikat menjadi NULL
    await db.execute(
        `UPDATE siswa SET jurusan_id = NULL WHERE jurusan_id = ?`,
        [id]
    );

    // Hapus baris jurusan dari database
    const [result] = await db.execute(`DELETE FROM jurusan WHERE id = ?`, [id]);

    if (result.affectedRows === 0) {
        const error = new Error("Jurusan data not found");
        error.statusCode = 404;
        error.code = "JURUSAN_NOT_FOUND";
        throw error;
    }

    return true;
}

module.exports = {
    getAllJurusan,
    getById,
    create,
    update,
    hardDelete
};