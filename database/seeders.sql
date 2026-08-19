USE db_siswa;

INSERT IGNORE INTO jurusan (id, nama, deskripsi, is_active) VALUES 
(1, 'Rekayasa Perangkat Lunak', 'Fokus pada pengembangan software, web, dan mobile app.', TRUE),
(2, 'Teknik Komputer dan Jaringan', 'Fokus pada infrastruktur jaringan, server, dan hardware.', TRUE),
(3, 'Multimedia', 'Fokus pada desain grafis, animasi, dan video editing.', TRUE),


INSERT IGNORE INTO siswa (kode_siswa, nama_siswa, phone, alamat, jurusan_id) VALUES 
            ('SISWA-001', 'Ahmad Fauzi', '081234567890', 'Jl. Merdeka No. 10, Jakarta', 1),
            ('SISWA-002', 'Siti Aminah', '085678901234', 'Jl. Sudirman No. 45, Bandung', 1),
            ('SISWA-003', 'Budi Santoso', '087812345678', 'Jl. Diponegoro No. 12, Surabaya', 2),
            ('SISWA-004', 'Dewi Lestari', '081987654321', 'Jl. Gatot Subroto No. 88, Malang', 3);