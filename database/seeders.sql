USE db_siswa;

INSERT INTO jurusan (id, nama, deskripsi) VALUES 
(1, 'Rekayasa Perangkat Lunak', 'Fokus pada pengembangan software, web, dan mobile app.'),
(2, 'Teknik Komputer dan Jaringan', 'Fokus pada infrastruktur jaringan, server, dan hardware.'),
(3, 'Multimedia', 'Fokus pada desain grafis, animasi, dan video editing.');


INSERT INTO siswa (kode_siswa, nama_siswa, phone, alamat, tanggal_lahir, jurusan_id) VALUES 
('SISWA-001', 'Ahmad Fauzi', '081234567890', 'Jl. Merdeka No. 10, Jakarta', '2007-04-12', 1),
('SISWA-002', 'Siti Aminah', '085678901234', 'Jl. Sudirman No. 45, Bandung', '2007-08-23', 1),
('SISWA-003', 'Budi Santoso', '087812345678', 'Jl. Diponegoro No. 12, Surabaya', '2006-11-05', 2),
('SISWA-004', 'Dewi Lestari', '081987654321', 'Jl. Gatot Subroto No. 88, Malang', '2007-01-30', 3),
('SISWA-005', 'Rian Hidayat', '082134567891', 'Jl. Asia Afrika No. 5, Bandung', '2007-05-14', 2),
('SISWA-006', 'Putri Utami', '089512345678', 'Jl. Malioboro No. 22, Yogyakarta', '2006-09-18', 1),
('SISWA-007', 'Fajar Nugraha', '081398765432', 'Jl. Pahlawan No. 17, Semarang', '2007-03-25', 3),
('SISWA-008', 'Citra Kirana', '085211223344', 'Jl. Pemuda No. 9, Medan', '2007-12-02', 2),
('SISWA-009', 'Rizky Pratama', '087755667788', 'Jl. Gajah Mada No. 40, Denpasar', '2006-10-10', 3),
('SISWA-010', 'Lesti Kejora', '081288990011', 'Jl. Melati No. 14, Makassar', '2007-07-07', 1);
