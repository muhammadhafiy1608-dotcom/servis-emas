# Servis Emas — konteks projek

App web (PWA) untuk seorang dealer emas (Public Gold, akaun GAP) melayan ~600 penyimpan emas melalui WhatsApp:
ilmu ringkas tentang emas, kewangan & kehidupan, diperibadikan ikut kumpulan umur, serta ucapan hari jadi.
Pemilik bukan pengaturcara: semua teks UI, mesej dan penjelasan kepada pemilik dalam **Bahasa Melayu santai**.

## Cara app berfungsi
- **Mod lalai = pilih sendiri** (`settings.mode: 'pilih'`, permintaan pemilik Okt 2026: "biar aku yang pilih"). Pemilik
  sediakan broadcast di Hari Ini → pilih skrip + penerima (status PG Code, kategori, kumpulan) → app bawa dari seorang
  ke seorang (`S.campaigns`, `C.campaignPreview`/`newCampaign`/`campaignPending`; slotId `k:<id>` dalam app.js).
  Satu nombor sekali; STOP, Junior ditangguh, skrip Islamik/bukan Islam, dan "dah terima skrip ini" dikecualikan.
  Had harian (`settings.dailyLimit`, lalai 60) hanya amaran. Jangan tukar balik ke automatik tanpa arahan pemilik.
- Mod automatik (`mode: 'auto'`): setiap hari ada sesi (lalai: Pagi 09:00 dan Petang 16:00, 30 orang setiap sesi).
  App pilih penyimpan yang paling lama tidak menerima mesej (`C.ensureBatch`), dan setiap orang dapat mesej
  seterusnya dalam pustaka yang sepadan dengan kumpulan umurnya (`C.nextMessage`).
- **Tiada PG Code = bakal pelanggan** (`customer.pg === ''`, `C.isProspect`; `null` = lajur PG tiada/tidak diketahui).
  Diasingkan (penapis "Tiada PG Code"). Skrip khas ZP01–ZP10 `aud: 'prospek'`; S00 `aud: 'penyimpan'`. `aud` menapis dalam
  mod automatik sahaja. Dalam broadcast pilihan, pilihan status pemilik DIIKUT (v1.3.3, pemilik pilih "Ada PG Code" untuk skrip
  ZP dan dapat 0): `aud` hanya pilih status lalai bila skrip dipilih + amaran `campaignPreview().mismatch`. Butang tunjuk bilangan.
  Import semula tidak membuang PG Code yang dah ada.
- **Mesej penuh dalam broadcast (v1.3.2):** kotak edit di Sediakan broadcast tunjuk mesej PENUH (`C.fullTemplate`: pembuka
  umum + isi + tandatangan + STOP) dan broadcast simpan `campaign.full = true` — pratonton = apa yang dihantar, tiada baris
  tambahan automatik (`composeBroadcast` dengan `m.full`). Pemilik minta "selaraskan" (Okt 2026). Jangan tambah baris tersembunyi.
- **Edit sebelum hantar (v1.3):** teks skrip boleh diubah untuk satu broadcast (`campaign.body`, pustaka tak berubah
  kecuali pemilik pilih "Simpan juga dalam pustaka") dan untuk seorang (`campaign.personal[cid]`; sesi auto: `ui.edits`).
  `textFor()` dalam app.js menentukan teks sebenar yang dihantar. `C.withBody` = salinan mesej dengan teks lain.
- **Gambar/infografik (v1.3):** satu gambar setiap broadcast (`campaign.img` = kunci IndexedDB `servisEmasMedia`, PNG ≤1600px;
  tidak termasuk dalam backup JSON). `wa.me` tak boleh lampir gambar, jadi app **Salin gambar** (ClipboardItem PNG) →
  pemilik Tampal dalam WhatsApp; atau **Kongsi** (Web Share dengan fail + teks; tanda dihantar selepas kongsi).
- **Tiada penghantaran automatik.** Butang Hantar membuka pautan `wa.me` / `whatsapp://` dengan mesej siap ditulis;
  pemilik tekan hantar dalam WhatsApp. Jangan tambah automasi WhatsApp tidak rasmi (melanggar terma, risiko nombor disekat).
- Personalisasi: `{panggilan}` (nama sahaja bawah 30, Tuan/Puan + nama untuk 30 ke atas — tetapan `honorific: 'umur'`),
  gelaran per penyimpan `customer.title` daripada lajur SALUTATION (`C.titleKind`): gelaran dari Excel SENTIASA dipakai tanpa
  mengira umur (pemilik mahu broadcast ikut Excel; hanya tetapan "Nama sahaja" membuangnya), Mama/Abah = tanpa nama,
  nilai lain = nama kawan dipakai seperti ditulis. Peraturan "bawah 30 nama sahaja" hanya untuk penyimpan tanpa gelaran.
  Dengan gelaran, `customer.nick` (lajur NICKNAME) ialah nama pendek yang digabung: Tuan + Daniel = Tuan Daniel.
  ayat pembuka ikut umur (`settings.openersByAge`), set ilmu ikut umur (`message.ages`), ucapan hari jadi ikut umur.
- Kumpulan umur ikut lajur Category dalam Excel pemilik (v1.2): `muda` = **MB30** (18–25), `dewasa` = **CX** (26–35),
  `pertengahan` = **CY** (36–45), `matang` = **CZ** (46–55), `warga` = **Pencen** (56+); had lalai `[26, 36, 46, 56]`
  (`settings.ageBounds`, boleh diubah; had lama 30/40/50/60 dipindah sekali melalui `boundsV2`). **Junior** (<18) dipapar
  berasingan (`C.viewGroup`) tetapi dikira `muda` untuk pilihan mesej. Penetapan manual per penyimpan: `customer.grp`.
- Penyimpan dalam kumpulan "Bukan Islam" disapa "Salam sejahtera" dan tidak menerima mesej `islamic: true`.
- STOP (opt-out) dihormati: `customer.optOut` tidak pernah direset oleh import. STOP seorang = nombor itu tidak dihantar langsung.
- **Satu nombor, satu mesej** (`C.primaryIds`): rekod berkongsi nombor (keluarga) — hanya rekod pertama yang layak dihantar;
  jika ahli sekeluarga berhari jadi, nombor itu tiada broadcast hari itu. Nombor pengganti (cth 010-000 0000, `C.phoneDummy`)
  dikira tiada nombor dan dilangkau semasa import.
- **Akaun Junior (bawah 18) ditangguh** (`settings.pauseJunior`, lalai hidup, permintaan pemilik Okt 2026): tiada broadcast dan
  ucapan hari jadi; nombor yang dikongsi dengan ibu bapa beralih kepada ibu bapa.

## Data & privasi
- **Tiada pelayan.** Semua data dalam `localStorage` peranti pemilik (kunci `servisEmas.v1`). Netlify hanya hos fail statik.
- Import Excel/CSV/tampal (`public/xlsx-lite.js` membaca .xlsx tanpa pustaka luar). Excel pemilik ("Master Database", Google
  Sheets) ada lajur PG CODE, PHONE, NAME, DOB (bulan/hari/tahun!), AGE, Range Umur, Category (MB30/CX/CY/CZ/Junior/Pencen),
  SALUTATION, NICKNAME, REMARK… Format tarikh dikesan per lajur (`C.dateOrder`). Fixture rekaan: `tests/fixtures/master-database-rekaan.csv`. Import semula **menggabungkan** ikut
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
  ala Tn Mohd Zulkifli Shafie (mentor pemilik, www.mohdzulkifli.com). Setiap mesej ≤ 50 patah perkataan (diuji).
  Analisis blog (Okt 2026, ~300 artikel): baris pendek (purata 12 perkataan), "..." kerap, "saya" + "kita" (hampir tiada
  "anda"), kontras ringkas ("Gaji – Simpan = Belanja", "fokus gram, bukan harga", "gold saver, bukan gold investor",
  "kaya lain, mewah lain"), emoji sedikit. Set `SKRIP` dalam content.js (ZA–ZE, 8 setiap kategori, `src` = artikel
  rujukan) dihantar dahulu selepas S00. Tulis semula dengan ayat sendiri; jangan salin artikel; tiada angka pulangan.
- **Skrip kategori — cara kerja yang pemilik minta (Okt 2026):**
  - Ubah **hanya** skrip yang pemilik sebut (ikut ID, cth ZB03). Skrip lain jangan diusik. Kekalkan ID supaya yang dah
    terima tak dapat lagi; jika pemilik mahu versi baharu dihantar semula, beri ID baharu.
  - Set seterusnya disediakan **sebelum** set lama habis: Set 1 = ZA01–08…ZE01–08, Set 2 = ZA09–16…ZE09–16. Set baharu
    disisip selepas set terakhir setiap kumpulan (sebelum pustaka asal). Guna artikel yang belum dipakai (semak `src`).
  - App beri amaran di Hari Ini dan kad "Skrip kategori" (Mesej → Pustaka) bila ≥80% penerima sesuatu kategori dah
    terima semua skrip (`C.scriptStats`, `C.SCRIPT_LOW`) — itu masa sediakan set seterusnya.
  Tiada janji untung/pulangan. Fakta (KWSP, zakat, PERKESO, Public Gold) mesti disemak sumber terkini; jika tak pasti, jangan
  masukkan angka. Kandungan agama → `islamic: true`. Placeholder dibenarkan: `{panggilan} {nama} {nama_pendek} {salam}
  {waktu} {hari} {nama_saya}`. Kandungan mesti siap guna — tiada ruang kosong untuk diisi pemilik.
- UI: mudah alih dahulu (iPhone, 390px), teks ringkas dan jelas, Bahasa Melayu. Ujian e2e mengambil gambar skrin di `tests/shots/`.
- Keserasian: kekalkan migrasi keadaan lama (`migrate()`); jangan ubah kunci `localStorage` tanpa migrasi.

## Deploy
Netlify, folder `public/` (lihat `netlify.toml`). Jika repo ini disambung ke projek Netlify, setiap push ke `main`
deploy automatik. Projek Netlify baharu adalah peribadi secara lalai — pemilik perlu tekan **Make public** sekali.
