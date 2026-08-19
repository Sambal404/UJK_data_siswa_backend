
# 📑 DOKUMENTASI BACKEND API DATA SISWA

## ⚙️ 1. Konfigurasi Environment (`.env`)

Buat file bernama `.env` di direktori root folder backend, lalu isi dengan konfigurasi berikut:

```env
NODE_ENV=development
APP_NAME="Latihan UJK"
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USER=user
DB_PASSWORD=password
DB_NAME=db_siswa

JWT_SECRET="Rahasia_bersama_dijaga_bersama"
JWT_EXPIRES_IN=24h

FRONTEND_URL=http://localhost:5173

```

---

## 🚀 2. Alur Cara Menjalankan Backend

1. **Inisialisasi Database:** 
* Import file struktur database `init.sql` ke MySQL.
* Import file data awal `seeder.sql` ke database `db_siswa`.


2. **Install Dependencies:**
```bash
npm install

```


3. **Jalankan Server:**
```bash
npm start

```


*Server otomatis berjalan di: `http://localhost:3000/api/v1*`

---

## 🔌 3. API Endpoints, Request, & Response

---

### A. Modul Jurusan (`/api/v1/jurusan`)

| Method | Endpoint | Deskripsi | Query / Body |
| --- | --- | --- | --- |
| **GET** | `/api/v1/jurusan` | Ambil semua jurusan | Query: `page`, `limit`, `search` |
| **POST** | `/api/v1/jurusan` | Tambah jurusan baru | JSON Body |
| **PUT** | `/api/v1/jurusan/:id` | Update jurusan by ID | JSON Body |
| **DELETE** | `/api/v1/jurusan/:id` | Hapus jurusan by ID | - |

#### 📝 Contoh Request & Response Jurusan:

* **POST / PUT Body (JSON):**
```json
{
  "nama": "Teknik Komputer dan Jaringan",
  "deskripsi": "Mempelajari jaringan komputer & server"
}

```


* **GET Response (Success):**
```json
{
  "data": [
    {
      "id": 1,
      "nama": "Teknik Komputer dan Jaringan",
      "deskripsi": "Mempelajari jaringan komputer & server",
      "createdAt": "2026-08-19T00:00:00.000Z",
      "updatedAt": "2026-08-19T00:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "limit": 10,
    "totalItems": 1,
    "totalPages": 1
  }
}

```



---

### B. Modul Siswa (`/api/v1/siswa`)

| Method | Endpoint | Deskripsi | Query / Body |
| --- | --- | --- | --- |
| **GET** | `/api/v1/siswa` | Ambil semua data siswa | Query: `page`, `limit`, `search` |
| **GET** | `/api/v1/siswa/:id` | Ambil detail siswa by ID | - |
| **POST** | `/api/v1/siswa` | Tambah siswa baru | JSON Body |
| **PUT** | `/api/v1/siswa/:id` | Update siswa by ID | JSON Body |
| **DELETE** | `/api/v1/siswa/:id` | Hapus siswa by ID (Hard Delete) | - |

#### 📝 Contoh Request & Response Siswa:

* **POST / PUT Body (JSON):**
```json
{
  "kodeSiswa": "SISWA001",
  "namaSiswa": "Budi Santoso",
  "phone": "081234567890",
  "alamat": "Jl. Merdeka No. 10",
  "tanggalLahir": "2005-08-17",
  "jurusanId": 1
}

```


*(Catatan Zod Schema: Format `tanggalLahir` wajib `YYYY-MM-DD`)*
* **GET Detail / POST Response (Success):**
```json
{
  "id": 1,
  "kodeSiswa": "SISWA001",
  "namaSiswa": "Budi Santoso",
  "phone": "081234567890",
  "alamat": "Jl. Merdeka No. 10",
  "tanggalLahir": "2005-08-17",
  "jurusanId": 1,
  "createdAt": "2026-08-19T00:00:00.000Z",
  "updatedAt": "2026-08-19T00:00:00.000Z"
}

```
