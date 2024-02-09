# Dummy Server Login dan Register

Ini adalah aplikasi server sederhana yang menyediakan fitur login dan registrasi. Aplikasi ini ditulis menggunakan Node.js dan Express.js.

## API Spesification

Link doc :https://docs.google.com/document/d/1lXKt7FqT0uXtx-iHRCXAOOigvGl2I74oMwUgMSRCme4/edit?usp=sharing

## Video Installation
https://youtu.be/mgC188b4BXw

## Fitur

- Registrasi pengguna baru dengan validasi username dan password.
- Otentikasi pengguna melalui login dengan token JWT.
- Penanganan kesalahan untuk input yang tidak valid.
- Menampilkan daftar semua pengguna yang terdaftar.

## Instalasi

1. Pastikan Anda memiliki Node.js dan npm terinstal di komputer Anda.
2. Clone repositori ini: https://github.com/attoyibi/express-server.git
3. Install dependensi dengan menjalankan perintah: npm install

## Penggunaan

1. Untuk menjalankan server, jalankan perintah: npm start

2. Server akan berjalan di `http://localhost:3000`.
3. Anda dapat mengakses endpoint berikut:
   - `/register`: Endpoint untuk registrasi pengguna baru. Kirimkan permintaan POST dengan body JSON berisi `username` dan `password`.
   - `/login`: Endpoint untuk login pengguna. Kirimkan permintaan POST dengan body JSON berisi `username` dan `password`. Anda akan menerima token JWT setelah berhasil login.
   - `/user`: Endpoint untuk menampilkan daftar semua pengguna yang terdaftar. Kirimkan permintaan GET untuk mengaksesnya.

## Kontribusi

Kontribusi selalu dipersilakan! Jika Anda menemukan masalah atau ingin menambahkan fitur baru, jangan ragu untuk membuat _pull request_.

## Lisensi

[MIT License](LICENSE)
