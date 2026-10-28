# Servis Emas — konteks projek

App web (PWA) untuk seorang dealer emas (Public Gold, akaun GAP) melayan ~600 penyimpan emas melalui WhatsApp:
ilmu ringkas tentang emas, kewangan & kehidupan, diperibadikan ikut kumpulan umur, serta ucapan hari jadi.
Pemilik bukan pengaturcara: semua teks UI, mesej dan penjelasan kepada pemilik dalam **Bahasa Melayu santai**.

## Cara app berfungsi
- Setiap hari ada sesi (lalai: Pagi 09:00 dan Petang 16:00, 30 orang setiap sesi; sesi Malam boleh dihidupkan).
  App pilih penyimpan yang paling lama tidak menerima mesej (`C.ensureBatch`), dan setiap orang dapat mesej
  seterusnya dalam pustaka yang sepadan dengan kumpulan umurnya (`C.nextMessage`).
- **Tiada penghantaran automatik.** Butang Hantar membuka pautan `wa.me` / `whatsapp://` dengan mesej siap ditulis;
  pemilik tekan hantar dalam WhatsApp. Jangan tambah automasi WhatsApp tidak rasmi (melanggar terma, risiko nombor disekat).
- Personalisasi: `{panggilan}` (nama sahaja bawah 30, Tuan/Puan + nama untuk 30 ke atas — tetapan `honorific: 'umur'`),
  ayat pembuka ikut umur (`settings.openersByAge`), set ilmu ikut umur (`message.ages`), ucapan hari jadi ikut umur.
- Kumpulan umur: `muda` (<30), `dewasa` (30–39), `pertengahan` (40–49), `matang` (50–59, label "Pra-bersara"),
  `warga` (60+). Had boleh diubah (`settings.ageBounds`). Penetapan manual per penyimpan: `customer.grp`.
- Penyimpan dalam kumpulan "Bukan Islam" disapa "Salam sejahtera" dan tidak menerima mesej `islamic: true`.
- STOP (opt-out) dihormati: `customer.optOut` tidak pernah direset oleh import.

## Data & privasi
- **Tiada pelayan.** Semua data dalam `localStorage` peranti pemilik (kunci `servisEmas.v1`). Netlify hanya hos fail statik.
- Import Excel/CSV/tampal (`public/xlsx-lite.js` membaca .xlsx tanpa pustaka luar). Import semula **menggabungkan** ikut
  nombor telefon (`C.mergeImport`): rekod sedia ada dikemas kini, sejarah mesej & STOP kekal. Pemilik import semula setiap 2 minggu.
- No. IC hanya digunakan untuk tarikh lahir & jantina, **tidak disimpan**.
- Backup/pulih melalui fail JSON. **Jangan commit data penyimpan sebenar** ke repo ini (lihat `.gitignore`); fixture ujian adalah data rekaan.

## Struktur
```
public/            fail yang diterbitkan (Netlify publish dir)
  index.html       rangka halaman
  core.js          logik tulen tanpa DOM (boleh diuji dalam Node): tarikh, telefon, umur, pemilihan mesej, import, ICS
  content.js       pustaka lalai: 166 mesej (46 umum + 24 setiap kumpulan umur), 12 ucapan hari jadi, ayat pembuka
  app.js           antara muka (render berasaskan string, router hash #/...), keadaan, migrasi
  xlsx-lite.js     pembaca .xlsx/.csv minimum (DecompressionStream)
  style.css, sw.js (cache luar talian), manifest.webmanifest, _headers (CSP & header keselamatan), icons/
  templat-senarai-penyimpan.xlsx
tests/             core.test.js (unit), e2e.js & migrate.e2e.js (Playwright), serve.js, run-e2e.js, fixtures/
tools/             make-template.py, make-icons.py, build-zip.sh
```

## Arahan
- `npm test` — ujian unit teras (Node, tiada kebergantungan).
- `npm run test:e2e` — ujian pelayar (Playwright + Chromium; dalam sesi awan Claude Code sudah terpasang — jangan
  `npm install playwright`; di komputer sendiri: `npx playwright install chromium`).
- `npm run serve` — buka app di http://127.0.0.1:8765/.
- `npm run zip` — bina `servis-emas-netlify.zip` untuk Netlify Drop (jika tidak guna deploy automatik dari GitHub).
- Jalankan `npm test` dan `npm run test:e2e` sebelum setiap commit; semua mesti lulus.

## Peraturan semasa mengubah
- **Setiap keluaran:** naikkan `VERSION` dalam `public/app.js` DAN `public/sw.js` (nama cache), supaya telefon pemilik
  dapat versi baharu. Kemas kini `version` dalam `package.json` juga.
- **Mengubah pustaka mesej (`content.js`):** naikkan `SE_CONTENT.version`; kekalkan ID mesej sedia ada (sejarah hantar
  merujuk ID); mesej yang diubah pengguna ditanda `edited: true` dan tidak ditimpa (`upgradeContent` dalam app.js).
  Mesej yang pengguna padam disimpan dalam `S.removed` dan tidak dikembalikan.
- **Gaya kandungan:** santai, ayat pendek, "..." dan pusingan "Tapi...", guna "kita", sedikit perkataan Inggeris —
  ala Tn Mohd Zulkifli Shafie (mentor pemilik, mohdzulkifli.com). Setiap mesej ≤ 50 patah perkataan (diuji).
  Tiada janji untung/pulangan. Fakta (KWSP, zakat, PERKESO, Public Gold) mesti disemak sumber terkini; jika tak pasti, jangan
  masukkan angka. Kandungan agama → `islamic: true`. Placeholder dibenarkan: `{panggilan} {nama} {nama_pendek} {salam}
  {waktu} {hari} {nama_saya}`. Kandungan mesti siap guna — tiada ruang kosong untuk diisi pemilik.
- UI: mudah alih dahulu (iPhone, 390px), teks ringkas dan jelas, Bahasa Melayu. Ujian e2e mengambil gambar skrin di `tests/shots/`.
- Keserasian: kekalkan migrasi keadaan lama (`migrate()`); jangan ubah kunci `localStorage` tanpa migrasi.

## Deploy
Netlify, folder `public/` (lihat `netlify.toml`). Jika repo ini disambung ke projek Netlify, setiap push ke `main`
deploy automatik. Projek Netlify baharu adalah peribadi secara lalai — pemilik perlu tekan **Make public** sekali.
