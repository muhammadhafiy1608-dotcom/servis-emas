# Servis Emas

App untuk servis penyimpan emas melalui WhatsApp:

- ilmu ringkas tentang emas, kewangan dan kehidupan, ikut kumpulan umur
- ucapan hari jadi
- 30 orang setiap sesi, pagi dan petang

Data penyimpan disimpan dalam telefon pengguna sahaja. Tiada pelayan.

## Guna
1. Deploy folder `public/` ke Netlify: sambung repo ini, atau `npm run zip` dan seret zip ke Netlify Drop.
2. Buka link di telefon, kemudian **Tambah ke Skrin Utama**.
3. Isi nama di Tetapan, kemudian import Excel (templat ada dalam app).

## Pembangunan
```
npm test            # ujian unit
npm run test:e2e    # ujian pelayar (Playwright)
npm run serve       # http://127.0.0.1:8765/
```
Lihat `CLAUDE.md` untuk seni bina, peraturan kandungan dan cara buat keluaran baharu.
