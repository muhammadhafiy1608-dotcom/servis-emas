/* Servis Emas — pustaka kandungan lalai.
 * Setiap mesej ialah "ilmu ringkas" untuk penyimpan emas.
 * ages: [] = semua umur; atau senarai kumpulan: muda, dewasa, pertengahan, matang, warga
 * islamic: true = tidak dihantar kepada penyimpan dalam kumpulan "Bukan Islam"
 * Placeholder yang boleh digunakan: {panggilan} {nama} {nama_pendek} {salam} {waktu} {hari} {nama_saya}
 */
(function (root) {
  'use strict';

  var WELCOME = {
    id: 'S00', cat: 'pengumuman', title: 'Salam perkenalan siri tips',
    body: [
      '*Tips ringkas untuk penyimpan emas* 🌟',
      '',
      'Terima kasih kerana percaya simpan emas bersama saya.',
      '',
      'Mulai hari ni, sekali-sekala saya akan kongsi *tips ringkas* tentang emas, kewangan & kehidupan. Pendek je — boleh habis baca dalam 1 minit.',
      '',
      'Ada soalan tentang akaun atau emas? Balas je mesej ni, saya sedia membantu. 🤝'
    ].join('\n')
  };

  /* ---------- UMUM: EMAS ---------- */
  var E = [
    { id: 'E01', title: 'Kenapa ramai simpan emas?', body: [
      '*Kenapa ramai simpan emas?* 🪙', '',
      'Duit kertas makin lama makin kurang kuasa belinya. RM100 hari ni tak dapat beli barang sebanyak RM100 sepuluh tahun lepas.', '',
      'Emas pula dihargai sejak beribu tahun dulu, di seluruh dunia. Dalam jangka panjang, emas cenderung mengekalkan nilainya berbanding kos hidup.', '',
      'Sebab tu orang simpan emas untuk *jaga nilai*, bukan untuk cepat kaya. 💛'] },
    { id: 'E02', title: 'Emas 999.9 vs 916', body: [
      '*Emas 999.9 vs 916 — apa bezanya?* ✨', '',
      '*999.9 (24K)* — emas tulen 99.99%. Sesuai untuk simpanan sebab nilainya ikut harga emas semasa.', '',
      '*916 (22K)* — emas perhiasan, dicampur logam lain supaya lebih kuat. Harganya termasuk upah tukang, dan upah ni biasanya tak dikira bila dijual semula.', '',
      'Nak bergaya, pakai 916. Nak simpan nilai, pilih 999.9. 😉'] },
    { id: 'E03', title: 'Siapa tentukan harga emas?', body: [
      '*Siapa yang tentukan harga emas?* 📊', '',
      'Harga emas dunia diniagakan dalam *USD per auns* (1 auns troy = 31.1 gram), hampir 24 jam sehari.', '',
      'Harga dalam Ringgit pula bergantung pada 2 perkara:',
      '1️⃣ Harga emas dunia (USD)',
      '2️⃣ Kadar tukaran USD/MYR', '',
      'Sebab tu kadang-kadang harga emas dunia tak banyak berubah, tapi harga dalam Ringgit naik atau turun — puncanya pergerakan Ringgit.'] },
    { id: 'E04', title: 'Konsisten lebih penting daripada timing', body: [
      '*Konsisten lebih penting daripada "timing"* 📅', '',
      'Ramai tunggu harga turun baru nak beli. Akhirnya... tak beli langsung.', '',
      'Cara lebih tenang: simpan *jumlah tetap setiap bulan* — contohnya RM100 atau RM200 — tak kira harga naik atau turun.', '',
      'Harga tinggi, dapat gram sikit. Harga rendah, dapat gram lebih. Lama-lama, harga purata jadi lebih seimbang.', '',
      'Yang penting: mula, dan teruskan. 💪'] },
    { id: 'E05', title: 'Emas bukan untuk untung cepat', body: [
      '*Emas bukan untuk untung cepat* ⏳', '',
      'Setiap produk emas ada *beza harga jual dan harga beli balik* (spread). Kalau beli hari ni dan jual minggu depan, biasanya kita rugi sikit walaupun harga emas tak berubah.', '',
      'Sebab tu emas lebih sesuai disimpan *jangka panjang* — bertahun-tahun, bukan berminggu-minggu.', '',
      'Emas ni macam pokok. Tanam, jaga, sabar. 🌳'] },
    { id: 'E06', title: '4 tips simpan emas fizikal', body: [
      '*Simpan emas fizikal? Ini 4 tips keselamatan* 🔐', '',
      '1️⃣ Jangan hebahkan jumlah emas yang kita simpan — termasuk di media sosial.',
      '2️⃣ Guna peti besi yang dipasang kukuh, atau peti simpanan keselamatan (safe deposit box).',
      '3️⃣ Jangan simpan semua di satu tempat.',
      '4️⃣ Simpan resit & sijil berasingan, dan ambil gambar sebagai salinan.', '',
      'Tak nak pening jaga di rumah? Simpan dalam akaun GAP. 😊'] },
    { id: 'E07', title: 'Resit & sijil emas', body: [
      '*Resit & sijil emas — jangan buang!* 🧾', '',
      'Bila nak jual semula, atau bila waris nak urus pusaka nanti, dokumen ni sangat membantu:',
      '✅ Resit pembelian',
      '✅ Sijil/kad ketulenan',
      '✅ Pembungkus asal', '',
      'Tips: ambil gambar semua dokumen & simpan dalam satu folder di telefon atau storan awan. Beritahu pasangan atau waris di mana dokumen asal disimpan.'] },
    { id: 'E08', title: 'Waspada pelaburan emas untung tetap', body: [
      '*Hati-hati "pelaburan emas" untung tetap!* 🚩', '',
      'Tanda-tanda skim cepat kaya:',
      '❌ Janji untung tetap setiap bulan',
      '❌ "Emas" yang tak boleh dilihat atau ditebus',
      '❌ Pulangan dibayar guna duit ahli baru',
      '❌ Desak bayar cepat — "tawaran terhad"', '',
      'Emas sebenar tak beri untung tetap. Harganya naik turun ikut pasaran.', '',
      'Ragu-ragu? Semak *Senarai Amaran Pengguna Kewangan* Bank Negara dan *Investor Alert List* Suruhanjaya Sekuriti.'] },
    { id: 'E09', title: 'Kenapa emas digelar safe haven', body: [
      '*Kenapa emas digelar "safe haven"?* 🛡️', '',
      'Bila ekonomi tak menentu — perang, krisis, inflasi tinggi — ramai pelabur dan bank pusat beralih kepada emas.', '',
      'Emas tak bergantung pada janji mana-mana syarikat atau kerajaan. Nilainya ada pada logam itu sendiri.', '',
      'Sebab tu ramai simpan sebahagian simpanan dalam emas sebagai *pelindung* — bukan semua, tapi sebahagian.'] },
    { id: 'E10', title: 'Emas masa kecemasan & Ar-Rahnu', body: [
      '*Emas boleh jadi penyelamat masa kecemasan* 🆘', '',
      'Kelebihan emas: mudah dicairkan bila perlu. Ada 2 cara:', '',
      '1️⃣ *Jual* — bila memang perlukan wang dan tak bercadang simpan lagi.',
      '2️⃣ *Ar-Rahnu (pajak gadai Islam)* — dapat wang tunai sementara, emas masih milik kita dan boleh ditebus semula.', '',
      'Tapi ingat, gadai hanya untuk kecemasan sebenar — bukan untuk beli barang kehendak. 😉'] },
    { id: 'E11', islamic: true, title: 'Zakat emas', body: [
      '*Zakat emas — dah semak?* 🕌', '',
      'Emas yang *disimpan* (jongkong, syiling, akaun emas) wajib dizakat apabila:',
      '✅ Cukup *nisab* — 85 gram',
      '✅ Cukup *haul* — disimpan genap setahun (tahun hijrah)',
      '💰 Kadar: *2.5%* daripada nilai semasa', '',
      'Emas *perhiasan yang dipakai* pula ada had *uruf* yang berbeza ikut negeri.', '',
      'Semak dengan pusat zakat negeri masing-masing ya. Harta yang dizakat, lebih berkat. 🤲'] },
    { id: 'E12', title: '"Emas dah mahal sekarang..."', body: [
      '*"Emas dah mahal sekarang..."* 🤔', '',
      'Ayat ni kita dengar sejak dulu — masa 2011, 2020, dan beberapa tahun kebelakangan ni pun sama. Setiap kali emas cecah paras tertinggi, ramai rasa dah terlambat.', '',
      'Hakikatnya, tiada siapa tahu harga esok. Sebab tu cara paling tenang ialah simpan *ikut kemampuan, secara berkala* — bukan tunggu harga "murah".', '',
      'Yang penting bukan beli pada harga paling rendah, tapi kita *ada* emas bila kita perlukannya nanti.'] }
  ];

  /* ---------- UMUM: KEWANGAN ---------- */
  var K = [
    { id: 'K01', title: 'Dana kecemasan dulu', body: [
      '*Dana kecemasan dulu, baru yang lain* 🧯', '',
      'Sebelum fikir pelaburan, pastikan ada *dana kecemasan* — sekurang-kurangnya 3 hingga 6 bulan perbelanjaan.', '',
      'Bila kereta rosak, sakit, atau hilang kerja, kita tak perlu berhutang atau jual aset pada waktu yang tak sesuai.', '',
      'Mula kecil pun tak apa. RM50 seminggu dah jadi RM2,600 setahun. 💪'] },
    { id: 'K02', title: 'Bayar diri sendiri dulu', body: [
      '*Bayar diri sendiri dulu* 💰', '',
      'Ramai simpan *baki* gaji. Masalahnya, selalunya baki tu... tak ada. 😅', '',
      'Cuba terbalikkan: sebaik gaji masuk, terus asingkan 10% (atau berapa yang mampu) untuk simpanan. Baki baru guna untuk belanja.', '',
      'Lagi senang kalau automatik — set auto-debit atau arahan tetap (standing instruction) ke akaun simpanan atau akaun emas.'] },
    { id: 'K03', title: 'Cabaran rekod belanja 30 hari', body: [
      '*Cabaran: rekod belanja 30 hari* 📝', '',
      'Nak tahu ke mana duit "hilang"? Cuba catat semua perbelanjaan selama 30 hari — termasuk kopi, parking & langganan.', '',
      'Biasanya kita akan terkejut dengan "kebocoran kecil" yang kalau dikumpul, besar juga jumlahnya.', '',
      'Bila dah nampak, baru senang nak potong. Guna nota telefon, Excel atau app bajet pun boleh.'] },
    { id: 'K04', title: 'Hutang baik vs hutang buruk', body: [
      '*Hutang "baik" vs hutang "buruk"* ⚖️', '',
      'Tak semua hutang sama.', '',
      '*Lebih munasabah:* hutang untuk keperluan jangka panjang — contohnya rumah untuk didiami atau pendidikan.', '',
      '*Perlu dielak:* hutang untuk gaya hidup — telefon terbaru, percutian, barang yang nilainya cepat jatuh.', '',
      'Tanya diri sebelum berhutang: "Benda ni buat kita lebih kukuh, atau lebih tertekan 2 tahun lagi?"'] },
    { id: 'K05', title: 'Inflasi: pencuri senyap', body: [
      '*Inflasi: pencuri senyap* 🕵️', '',
      'Inflasi buat harga barang naik sedikit demi sedikit setiap tahun. Duit yang "tidur" tanpa pulangan, nilainya terhakis perlahan-lahan.', '',
      'Sebab tu simpanan jangka panjang elok dipelbagaikan — contohnya simpanan tetap, unit amanah, KWSP & emas — ikut matlamat dan kemampuan.', '',
      'Jangan biar duit tidur. Biar duit "bekerja" untuk kita.'] },
    { id: 'K06', title: 'Jaga rekod kredit (CCRIS)', body: [
      '*Rekod kredit (CCRIS) — jaga baik-baik* 📋', '',
      'Bila mohon pinjaman rumah atau kereta, bank akan semak rekod bayaran kita dalam *CCRIS* Bank Negara dan agensi seperti CTOS.', '',
      'Lewat bayar, walaupun sekali-sekala, boleh beri kesan.', '',
      '✅ Set auto-debit untuk bil & ansuran',
      '✅ Bayar penuh kad kredit setiap bulan',
      '✅ Semak laporan CCRIS sendiri secara percuma melalui eCCRIS Bank Negara'] },
    { id: 'K07', title: 'Semak langganan bulanan', body: [
      '*Langganan bulanan — semak sekarang!* 🔍', '',
      'Streaming, storan awan, gim, app yang dah lama tak guna...', '',
      'Satu-satu nampak kecil, RM10–RM50. Tapi kalau ada 5–6 langganan, boleh cecah RM100+ sebulan — lebih RM1,200 setahun!', '',
      'Hari ni, buka penyata bank & kad kredit. Batalkan yang tak perlu. Duit tu boleh terus masuk simpanan. 😉'] },
    { id: 'K08', title: 'Lindungi pencari nafkah', body: [
      '*Lindungi pencari nafkah* ☂️', '',
      'Simpanan & emas penting. Tapi kalau pencari nafkah sakit teruk atau meninggal dunia, siapa yang tanggung keluarga?', '',
      'Perlindungan asas yang perlu disemak:',
      '🩺 Perubatan',
      '🛡️ Hayat & penyakit kritikal — terutama bila ada tanggungan', '',
      'Lindungan bukan pelaburan. Ia "tembok" yang menjaga simpanan kita daripada habis bila musibah datang.'] },
    { id: 'K09', title: 'Selesai hutang: cari punca', body: [
      '*Nak selesai hutang? Cari puncanya dulu* 🔎', '',
      'Hutang selalunya *simptom*. Puncanya mungkin gaya hidup, tiada bajet, atau tiada dana kecemasan — sampai setiap kecemasan jadi hutang baru.', '',
      '1️⃣ Senaraikan semua hutang (baki, ansuran, kadar)',
      '2️⃣ Berhenti tambah hutang baru',
      '3️⃣ Langsaikan satu demi satu',
      '4️⃣ Bina dana kecemasan sedikit demi sedikit', '',
      'Perlukan bantuan? AKPK menyediakan khidmat nasihat kewangan secara percuma.'] }
  ];

  /* ---------- UMUM: KEHIDUPAN ---------- */
  var H = [
    { id: 'H01', islamic: true, title: 'Sedikit tapi berterusan', body: [
      '*Sedikit, tapi berterusan* 🌱', '',
      'Rasulullah SAW bersabda, amalan yang paling disukai Allah ialah yang berterusan walaupun sedikit. (HR Bukhari & Muslim)', '',
      'Begitu juga simpanan, kesihatan & ilmu. RM10 sehari, 10 minit berjalan, 1 muka surat buku — nampak kecil, tapi bila istiqamah, hasilnya besar.', '',
      'Apa satu tabiat kecil yang kita nak mula minggu ni? 😊'] },
    { id: 'H02', title: 'Sihat itu kekayaan', body: [
      '*Sihat itu kekayaan sebenar* 🏃', '',
      'Ada duit tapi tak sihat — susah nak nikmati.', '',
      '3 "pelaburan" kesihatan yang paling murah:',
      '😴 Tidur cukup',
      '🚶 Bergerak 30 minit sehari',
      '💧 Kurangkan minuman manis', '',
      'Jangan lupa buat pemeriksaan kesihatan berkala. Kesan awal, rawatan lebih mudah — dan lebih murah.'] },
    { id: 'H03', title: 'Hati yang cukup', body: [
      '*Hati yang cukup* 🤍', '',
      'Kaya bukan semata-mata banyak harta, tapi hati yang rasa cukup.', '',
      'Cuba amalkan: setiap malam sebelum tidur, ingat 3 perkara yang kita syukuri hari ini. Kecil pun tak apa — secawan kopi panas, anak ketawa, rezeki yang sampai.', '',
      'Hati yang tenang buat keputusan kewangan yang lebih baik. 😊'] },
    { id: 'H04', title: 'Masa keluarga', body: [
      '*Masa tak boleh dibeli semula* 👨‍👩‍👧', '',
      'Duit yang hilang boleh dicari semula. Masa yang berlalu, tak boleh.', '',
      'Minggu ni, luangkan satu masa khas tanpa telefon — makan bersama, bersembang, atau jalan-jalan petang.', '',
      'Kita kerja kuat untuk keluarga. Jangan sampai keluarga cuma dapat "baki" masa kita. ❤️'] },
    { id: 'H05', islamic: true, title: 'Rebut 5 sebelum 5', body: [
      '*Rebut 5 perkara sebelum 5 perkara* ⏰', '',
      'Pesan Rasulullah SAW:',
      '• Muda sebelum tua',
      '• Sihat sebelum sakit',
      '• Kaya sebelum miskin',
      '• Lapang sebelum sibuk',
      '• Hidup sebelum mati',
      '(HR al-Hakim)', '',
      'Masa muda & sihat ialah modal terbesar kita — termasuk untuk mula menyimpan.'] },
    { id: 'H06', islamic: true, title: 'Sedekah tak kurangkan harta', body: [
      '*Sedekah tak mengurangkan harta* 💚', '',
      'Rasulullah SAW bersabda: sedekah tidak akan mengurangkan harta. (HR Muslim)', '',
      'Sedekah tak semestinya banyak. RM1 atau RM5 seminggu, kalau konsisten, besar maknanya — untuk penerima, dan untuk hati kita.', '',
      'Ada yang suka bahagikan setiap kali gaji masuk: simpanan, emas, dan *sedekah*. 🤲'] },
    { id: 'H07', title: 'Belajar sepanjang hayat', body: [
      '*Belajar sepanjang hayat* 📚', '',
      'Pendapatan kita jarang melebihi ilmu & kemahiran kita.', '',
      'Pelaburan yang tak pernah rugi: belajar. Baca buku, dengar podcast, ikut kelas, belajar skill baru — walaupun 15 minit sehari.', '',
      'Ilmu kewangan pula elok dikongsi dengan pasangan & anak-anak. Biar satu keluarga celik duit. 📖'] },
    { id: 'H08', title: 'Kawan sekufu', body: [
      '*Pilih kawan yang tarik kita ke depan* 🤝', '',
      'Orang kata, kita ialah purata 5 orang yang paling rapat dengan kita.', '',
      'Kalau kawan-kawan rajin berbelanja & berhutang, kita pun mudah terikut. Kalau mereka rajin menyimpan & membina, kita pun terdorong sama.', '',
      'Cari kawan sekufu yang bawa kita ke arah lebih baik — dalam kewangan, kesihatan & akhlak.'] },
    { id: 'H09', title: 'Jangan bandingkan bab 1 dengan bab 20', body: [
      '*Jangan bandingkan bab 1 kita dengan bab 20 orang lain* 📱', '',
      'Media sosial tunjuk hasil, jarang tunjuk proses — apatah lagi hutang di sebaliknya. 😅', '',
      'Lebih baik naik perlahan tapi kukuh, daripada nampak hebat tapi tertekan setiap hujung bulan.', '',
      'Ukuran paling adil: bandingkan diri kita hari ini dengan diri kita setahun lepas.'] }
  ];

  /* ---------- IKUT KUMPULAN UMUR ---------- */
  var AGE = {
    muda: [
      { id: 'M01', cat: 'kewangan', title: 'Tabiat duit awal kerjaya (50/30/20)', body: [
        '*Mulakan tabiat duit yang betul* 🎯', '',
        'Cara kita urus gaji di awal kerjaya selalunya jadi tabiat sepanjang hayat.', '',
        'Formula ringkas *50/30/20*:',
        '🏠 50% keperluan',
        '🎉 30% kehendak',
        '💰 20% simpanan & pelaburan', '',
        'Tak cukup 20%? Mula dengan 10%. Yang penting, *simpan dulu* — baru belanja.'] },
      { id: 'M02', cat: 'emas', title: 'Mula simpan emas masa muda', body: [
        '*Kenapa mula simpan emas masa muda?* ⏳', '',
        'Kelebihan terbesar orang muda bukan duit banyak, tapi *masa yang panjang*.', '',
        'Bayangkan simpan RM100 sebulan dari umur 25 hingga 55 — itu 360 bulan, RM36,000 yang ditukar jadi emas sedikit demi sedikit.', '',
        'Mula kecil tak apa, yang penting mula awal. Akaun GAP boleh mula serendah RM100. 😉'] },
      { id: 'M03', cat: 'kewangan', title: 'Hati-hati BNPL', body: [
        '*Hati-hati "Beli Sekarang, Bayar Kemudian"* 🛒', '',
        'BNPL nampak mudah: bayar 3 kali, tiada faedah. Tapi bila banyak app & banyak transaksi, ansuran kecil ni bertindih — dan senyap-senyap "makan" gaji.', '',
        'Lewat bayar pula boleh kena caj, dan rekod bayaran boleh menjejaskan permohonan pinjaman nanti.', '',
        'Peraturan mudah: kalau tak mampu beli tunai sekarang, mungkin kita belum mampu lagi. 🙂'] },
      { id: 'M04', cat: 'kehidupan', title: 'Labur pada diri sendiri', body: [
        '*Labur pada diri sendiri* 🚀', '',
        'Umur 20-an ialah masa terbaik untuk "beli" kemahiran.', '',
        'Komunikasi, jualan, digital, bahasa, atau kemahiran teknikal dalam bidang kita — semua ni boleh naikkan pendapatan bertahun-tahun.', '',
        'Peruntukkan sedikit duit & masa setiap bulan untuk belajar. Pelaburan ni tiada siapa boleh rampas. 💡'] },
      { id: 'M05', cat: 'kewangan', title: 'Kereta pertama', body: [
        '*Kereta pertama: jangan sampai tercekik* 🚗', '',
        'Ansuran kereta nampak OK. Tapi kos sebenar termasuk insurans, cukai jalan, minyak, tol, parking & servis.', '',
        'Panduan yang ramai guna: jumlah kos kereta sebulan tak melebihi 15–20% gaji bersih.', '',
        'Kereta untuk bawa kita ke destinasi — bukan untuk buktikan apa-apa pada sesiapa. 😉'] },
      { id: 'M06', cat: 'emas', title: 'Tabung kahwin dalam emas', body: [
        '*Simpan emas untuk majlis kahwin* 💍', '',
        'Merancang nak berkahwin 2–3 tahun lagi? Hantaran, majlis & barang kemas boleh cecah puluhan ribu ringgit.', '',
        'Satu cara: buat "tabung kahwin" dalam bentuk emas. Simpan sedikit setiap bulan. Bila tiba masanya, emas boleh dijadikan sebahagian hantaran, atau dijual untuk belanja majlis.', '',
        'Kahwin tanpa hutang = rumah tangga lebih tenang. ❤️'] },
      { id: 'M07', cat: 'kehidupan', title: 'Gaji masuk, ingat mak ayah', body: [
        '*Gaji masuk, jangan lupa mak ayah* 🤍', '',
        'Hulur sebahagian gaji kepada mak ayah bukan "kurang duit" — tapi tambah berkat.', '',
        'Jumlah tak perlu besar, ikut kemampuan. Yang penting ikhlas & konsisten.', '',
        'Dan kadang-kadang, mak ayah lebih hargai *masa* kita daripada duit. Telefon, balik jenguk, makan bersama. 😊'] },
      { id: 'M08', cat: 'kewangan', title: 'Pinjaman pendidikan', body: [
        '*Pinjaman pendidikan: jangan tangguh bayar* 🎓', '',
        'Bayar konsisten walaupun sikit, lebih baik daripada tangguh sampai tunggakan menimbun.', '',
        '✅ Set potongan gaji atau auto-debit',
        '✅ Semak baki melalui portal atau app rasmi PTPTN',
        '✅ Pantau tawaran diskaun penyelesaian yang ditawarkan dari semasa ke semasa', '',
        'Bebas hutang lebih awal = lebih banyak ruang untuk menyimpan. 💪'] },
      { id: 'M09', cat: 'emas', title: 'Jangan simpan emas guna hutang', body: [
        '*Jangan simpan emas guna duit hutang* ⚠️', '',
        'Emas elok untuk simpanan — tapi bukan dengan kad kredit, pinjaman peribadi, atau duit yang sepatutnya untuk bil.', '',
        'Kos hutang boleh jadi lebih tinggi daripada kenaikan harga emas. Bila harga turun sementara, kita yang tertekan.', '',
        'Simpan emas guna *duit lebihan*, bukan duit pinjaman. Hati tenang, tidur pun lena. 😴'] },
      { id: 'M10', cat: 'kehidupan', title: 'Jaga kesihatan dari muda', body: [
        '*Jaga kesihatan dari muda* 💪', '',
        'Masa muda, badan rasa kuat — makan apa pun OK, tidur lewat pun OK.', '',
        'Tapi tabiat hari ini ialah "bil kesihatan" 20 tahun akan datang.', '',
        'Mula sekarang: kurangkan minuman manis, bersenam 3 kali seminggu, tidur cukup. Bonus: ambil perlindungan kesihatan semasa muda & sihat — caruman biasanya lebih rendah.'] }
    ],
    dewasa: [
      { id: 'D01', cat: 'kewangan', title: 'Bincang duit berdua', body: [
        '*Bincang duit berdua* 👫', '',
        'Banyak konflik rumah tangga berpunca daripada duit — selalunya sebab tak pernah dibincang.', '',
        'Cuba buat "tarikh duit" sebulan sekali dengan pasangan:',
        '1️⃣ Semak perbelanjaan bulan lepas',
        '2️⃣ Rancang bil & simpanan bulan ini',
        '3️⃣ Tetapkan satu matlamat bersama — rumah, dana anak, percutian keluarga', '',
        'Bila matlamat sama, lebih mudah kawal belanja. ❤️'] },
      { id: 'D02', cat: 'emas', title: 'Dana pendidikan anak dalam emas', body: [
        '*Dana pendidikan anak dalam bentuk emas* 🎓', '',
        'Kos pengajian anak 15–18 tahun akan datang mungkin jauh lebih tinggi daripada hari ini.', '',
        'Ramai ibu bapa mula simpan sedikit emas setiap bulan untuk setiap anak. Bila anak masuk universiti, simpanan tu boleh dijual untuk yuran & keperluan.', '',
        'Nak buka akaun emas untuk anak (GAP Junior)? Tanya saya, saya terangkan caranya. 😊'] },
      { id: 'D03', cat: 'kewangan', title: 'SSPN & pelepasan cukai', body: [
        '*SSPN: simpan untuk anak, dapat pelepasan cukai* 📚', '',
        'Selain emas, ramai ibu bapa guna *SSPN* (PTPTN) untuk dana pendidikan anak.', '',
        'Kelebihannya: simpanan bersih dalam setahun layak untuk *pelepasan cukai sehingga RM8,000* — tertakluk syarat terkini LHDN & PTPTN.', '',
        'Gabungan SSPN + emas = dana pendidikan yang lebih seimbang. 👍'] },
      { id: 'D04', cat: 'kehidupan', title: 'Anak belajar duit daripada kita', body: [
        '*Anak belajar duit daripada kita* 👀', '',
        'Anak jarang dengar nasihat kita tentang duit — tapi mereka *perhati* cara kita guna duit.', '',
        'Libatkan anak dari kecil:',
        '🐷 Tabung untuk simpanan',
        '🛒 Bawa ke kedai, bandingkan harga',
        '🎯 Biar mereka kumpul duit sendiri untuk barang idaman', '',
        'Celik kewangan bermula di rumah. 🏠'] },
      { id: 'D05', cat: 'kewangan', title: 'Rumah pertama: kos tersembunyi', body: [
        '*Beli rumah pertama? Ingat kos tersembunyi* 🏡', '',
        'Selain deposit, ramai terlupa kos lain:',
        '📄 Yuran guaman perjanjian jual beli & pinjaman',
        '🧾 Duti setem (ada pengecualian tertentu untuk pembeli rumah pertama)',
        '🔑 Penilaian, takaful/insurans rumah, ubah suai & perabot', '',
        'Sediakan bajet tambahan, dan pastikan ansuran rumah tak terlalu membebankan gaji bulanan.'] },
      { id: 'D06', cat: 'emas', title: 'Hadiah emas untuk anak', body: [
        '*Hadiah yang mendidik* 🎁', '',
        'Hari jadi, keputusan cemerlang, atau duit raya — cuba jadikan sebahagiannya *emas*.', '',
        'Mainan rosak dalam setahun. Emas boleh disimpan bertahun-tahun. Bila anak besar, kita boleh cerita: "Ini simpanan sejak kamu kecil."', '',
        'Hadiah yang mengajar tentang nilai, sabar & menyimpan. 💛'] },
      { id: 'D07', cat: 'kehidupan', title: 'Rehat, jangan berhenti', body: [
        '*Penat? Rehat, jangan berhenti* 🔋', '',
        'Umur 30-an selalunya fasa paling sibuk — kerjaya, anak kecil, komitmen.', '',
        'Jangan abaikan rehat: tidur cukup, ambil cuti tahunan, dan ada sedikit masa untuk diri sendiri.', '',
        'Burnout bukan tanda kita kuat. Rehat yang cukup buat kita lebih produktif — dan lebih sabar dengan keluarga. 🙂'] },
      { id: 'D08', cat: 'kewangan', title: 'Gaji naik, simpanan naik', body: [
        '*Gaji naik, simpanan pun mesti naik* 📈', '',
        'Gaji naik, kereta naik taraf. Gaji naik lagi, rumah pun lebih besar. Akhirnya simpanan tetap sama — atau berkurang.', '',
        'Cuba amalkan: setiap kali gaji naik, *separuh* daripada kenaikan tu terus ke simpanan atau emas.', '',
        'Gaya hidup tetap boleh bertambah selesa, simpanan pun terus bertambah. ⚖️'] },
      { id: 'D09', cat: 'emas', title: 'Berapa emas patut ada?', body: [
        '*Berapa banyak emas patut kita ada?* 🎯', '',
        'Tiada jawapan tetap, tapi ada sasaran yang mudah difahami.', '',
        'Contohnya: kumpul emas bernilai *6–12 bulan perbelanjaan* sebagai benteng kedua, selepas dana kecemasan tunai.', '',
        'Pecahkan jadi sasaran kecil: 10 gram pertama, kemudian 50 gram, 100 gram... Setiap kali capai, raikan! 🎉'] },
      { id: 'D10', cat: 'kehidupan', title: 'Saringan kesihatan tahunan', body: [
        '*Saringan kesihatan setahun sekali* 🩺', '',
        'Darah tinggi, kencing manis & kolesterol tinggi selalunya tak tunjuk simptom awal.', '',
        'Buat saringan sekurang-kurangnya setahun sekali. Klinik kesihatan kerajaan & sesetengah majikan sediakan saringan pada kos rendah atau percuma.', '',
        'Kesan awal, rawat awal — untuk diri sendiri, dan untuk anak-anak yang bergantung pada kita. ❤️'] }
    ],
    pertengahan: [
      { id: 'P01', cat: 'kewangan', title: 'Semak simpanan persaraan', body: [
        '*Umur 40-an: semak simpanan persaraan* 🧮', '',
        'Dalam 6–15 tahun lagi, kita akan sampai umur 55. Dah cukup ke simpanan persaraan?', '',
        'Mulai 2026, KWSP guna 3 tanda aras simpanan:',
        '• Asas: RM390,000',
        '• Memadai: RM650,000',
        '• Selesa: RM1.3 juta', '',
        'Semak baki dalam app KWSP i-Akaun. Belum capai? Tak apa — yang penting tahu kedudukan & mula tambah dari sekarang.'] },
      { id: 'P02', cat: 'emas', title: 'Emas sebagai pelengkap aset', body: [
        '*Jangan letak semua telur dalam satu bakul* 🧺', '',
        'Di usia 40-an, ramai dah ada beberapa aset — KWSP, rumah, unit amanah, simpanan.', '',
        'Emas boleh jadi pelengkap: tak bergantung pada prestasi mana-mana syarikat, mudah dicairkan, dan secara sejarahnya kekal bernilai dalam jangka panjang.', '',
        'Pelbagaikan simpanan — emas ialah salah satu "bakul" yang kukuh. 🪙'] },
      { id: 'P03', cat: 'kewangan', title: 'Generasi sandwich', body: [
        '*Rasa tersepit? Generasi sandwich* 🥪', '',
        'Tanggung anak yang sedang membesar, dan bantu ibu bapa yang semakin berusia — ramai di usia 40-an rasa tersepit.', '',
        '1️⃣ Bincang dengan adik-beradik, kongsi tanggungjawab',
        '2️⃣ Tetapkan bajet bantuan yang jelas setiap bulan',
        '3️⃣ Jangan korbankan simpanan persaraan sendiri — supaya anak kita nanti tak tersepit pula', '',
        'Bantu keluarga, tapi jaga diri juga. 🤝'] },
      { id: 'P04', cat: 'kehidupan', title: 'Kesihatan selepas 40', body: [
        '*Selepas 40, kesihatan perlu lebih perhatian* 🩺', '',
        'Risiko penyakit kronik meningkat dengan usia. Pekerja berumur 40–59 tahun yang mencarum PERKESO mungkin layak saringan kesihatan *percuma* — semak dalam app SEHATi PERKESO.', '',
        'Periksa tekanan darah, gula & kolesterol.', '',
        'Badan sihat = boleh terus bekerja, menyimpan & menikmati hasil usaha. 💪'] },
      { id: 'P05', cat: 'kewangan', title: 'Kemas kini penama akaun', body: [
        '*Penama akaun — dah kemas kini?* 📝', '',
        'Ramai lupa kemas kini *penama* (nominee) untuk KWSP, takaful/insurans dan akaun simpanan — selepas berkahwin, dapat anak, atau berlaku perubahan dalam keluarga.', '',
        'Tanpa penama atau dokumen yang jelas, waris boleh ambil masa lama untuk menuntut harta.', '',
        'Luangkan sejam minggu ini: senaraikan semua akaun & semak penamanya. Ini hadiah besar untuk keluarga. 🎁'] },
      { id: 'P06', cat: 'emas', islamic: true, title: 'Emas & faraid', body: [
        '*Emas & faraid: waris tahu tak?* 🕌', '',
        'Bila kita meninggal dunia, emas & akaun emas jadi *harta pusaka* — dibahagi mengikut faraid, kecuali yang telah dihibahkan semasa hidup.', '',
        'Masalah biasa: waris tak tahu emas tu wujud, atau tak tahu nak tuntut di mana.', '',
        '✅ Senaraikan emas & akaun emas (termasuk GAP)',
        '✅ Simpan maklumat di tempat yang waris tahu',
        '✅ Pertimbangkan hibah untuk agihan yang dirancang'] },
      { id: 'P07', cat: 'kehidupan', title: 'Separuh perjalanan: refleksi', body: [
        '*Separuh perjalanan: masa untuk refleksi* 🧭', '',
        'Usia 40-an sesuai untuk tanya diri:',
        '• Apa yang benar-benar penting dalam hidup?',
        '• Legasi apa yang kita nak tinggalkan?',
        '• Apa yang perlu dikurangkan, apa yang perlu ditambah?', '',
        'Kerjaya & duit penting — tapi pastikan ia menyokong apa yang kita *hargai*: keluarga, kesihatan, ibadah & manfaat kepada orang lain.'] },
      { id: 'P08', cat: 'kewangan', title: 'Bebas hutang sebelum bersara', body: [
        '*Sasaran: bebas hutang sebelum bersara* 🎯', '',
        'Masuk usia persaraan dengan hutang besar boleh jadi beban — pendapatan berkurang, tapi ansuran masih berjalan.', '',
        '✅ Selesaikan hutang kad kredit & peribadi dulu',
        '✅ Pertimbangkan bayaran tambahan pinjaman rumah (semak caj penyelesaian awal)',
        '✅ Elak hutang baharu yang panjang tempohnya', '',
        'Bebas hutang = bebas tekanan. 🕊️'] },
      { id: 'P09', cat: 'emas', title: 'Labelkan emas ikut tujuan', body: [
        '*Setiap gram ada tugasnya* 🏷️', '',
        'Tips mudah: *labelkan* simpanan emas ikut tujuan.',
        '🎓 Emas untuk pendidikan anak',
        '🏖️ Emas untuk persaraan',
        '🧯 Emas untuk kecemasan keluarga', '',
        'Bila setiap gram ada "tugas", kita lebih berdisiplin — dan tak mudah jual sesuka hati. 💪'] },
      { id: 'P10', cat: 'kehidupan', title: 'Ajar anak remaja tentang duit', body: [
        '*Ajar anak remaja tentang duit* 🧑‍🎓', '',
        'Anak remaja dah boleh diajar perkara "besar":',
        '💳 Cara kad kredit & hutang berfungsi',
        '📈 Kesan menyimpan dari awal',
        '🛍️ Beza keperluan & kehendak', '',
        'Kongsi pengalaman kita — termasuk kesilapan kewangan dulu. Anak lebih ingat cerita daripada ceramah. 😊'] }
    ],
    matang: [
      { id: 'B01', cat: 'kewangan', title: 'Umur 55: jangan habiskan KWSP', body: [
        '*Umur 55: jangan habiskan KWSP sekaligus* 💼', '',
        'Bila sampai 55, godaan besar datang: keluarkan semua untuk beli kereta, renovasi, atau "pelaburan" yang janji untung tinggi.', '',
        'Ingat, simpanan itu perlu bertahan 20 tahun atau lebih.', '',
        'KWSP ada pilihan bayaran bulanan *i-Emas*: duit masuk ke akaun bank setiap bulan, dan baki yang belum dikeluarkan terus menerima dividen. Rancang "gaji" persaraan dulu, baru tentukan berapa yang perlu dikeluarkan.'] },
      { id: 'B02', cat: 'emas', islamic: true, title: 'Emas untuk haji & umrah', body: [
        '*Emas untuk ke Tanah Suci* 🕋', '',
        'Ramai simpan emas khusus untuk *haji & umrah*. Bila tiba masanya, emas dicairkan untuk kos perjalanan.', '',
        'Kelebihannya: simpanan tak "tidur" dalam bentuk tunai, dan kita tak mudah guna untuk perkara lain — sebab niatnya jelas.', '',
        'Semoga dipermudahkan sampai ke Tanah Suci. 🤲'] },
      { id: 'B03', cat: 'kewangan', title: 'Kos hidup selepas bersara', body: [
        '*Berapa kos hidup kita selepas bersara?* 🧾', '',
        'Cuba kira: kalau bersara esok, berapa perbelanjaan bulanan kita?', '',
        'Senaraikan: makan, bil, kesihatan, kenderaan, bantu anak/cucu, ibadah & riadah.', '',
        'Kemudian semak sumber pendapatan nanti — KWSP, pencen, sewa, perniagaan atau simpanan lain. Jurang antara dua angka ni ialah perkara yang perlu dirancang dari sekarang. 📝'] },
      { id: 'B04', cat: 'kehidupan', title: 'Bersara bukan berhenti hidup', body: [
        '*Bersara bukan berhenti hidup* 🌅', '',
        'Ramai teruja nak bersara, tapi selepas beberapa bulan rasa kosong — tiada rutin, tiada tujuan.', '',
        'Rancang dari sekarang: hobi, mengajar, berniaga kecil-kecilan, atau aktif dalam komuniti, rumah ibadah & persatuan.', '',
        'Tubuh & minda yang aktif = persaraan yang lebih sihat & bermakna. 😊'] },
      { id: 'B05', cat: 'kewangan', title: 'Scam sasarkan pesara', body: [
        '*Scam suka sasarkan pesara* 🚨', '',
        'Pesara & bakal pesara sering jadi sasaran — sebab ada simpanan KWSP.', '',
        'Waspada:',
        '❌ Panggilan kononnya polis, bank atau mahkamah yang minta pindah duit',
        '❌ Pelaburan "jaminan untung" dalam masa singkat',
        '❌ Diminta muat turun app atau kongsi OTP/TAC', '',
        'Terkena? Segera hubungi *997* (Pusat Respons Scam Kebangsaan, 24 jam). Lagi cepat lapor, lagi tinggi peluang duit diselamatkan.'] },
      { id: 'B06', cat: 'emas', title: 'Wariskan emas, bukan masalah', body: [
        '*Wariskan emas, bukan masalah* 🗝️', '',
        'Emas mudah diwariskan — tapi hanya jika waris *tahu* dan dokumen *lengkap*.', '',
        '✅ Waris tahu lokasi emas fizikal',
        '✅ Maklumat akaun emas (contohnya GAP) disimpan dengan selamat',
        '✅ Pertimbangkan hibah atau wasiat ikut keperluan',
        '✅ Kongsi rancangan dengan ahli keluarga terdekat', '',
        'Emas yang tak diketahui waris, akhirnya "hilang" begitu saja.'] },
      { id: 'B07', cat: 'kehidupan', title: 'Dari pengurus kepada penasihat', body: [
        '*Dari "pengurus" kepada "penasihat"* 👨‍👩‍👧‍👦', '',
        'Bila anak dah dewasa & berkeluarga, peranan kita berubah.', '',
        'Beri nasihat bila diminta, beri sokongan bila perlu, dan hormati keputusan mereka.', '',
        'Keluarga yang rapat ialah harta paling bernilai di usia emas nanti. ❤️'] },
      { id: 'B08', cat: 'kewangan', title: 'Kos kesihatan selepas bersara', body: [
        '*Kos kesihatan selepas bersara* 🏥', '',
        'Selepas bersara, perlindungan kesihatan daripada majikan biasanya tamat — sedangkan kos rawatan meningkat dengan usia.', '',
        'Semak sekarang:',
        '✅ Ada perlindungan perubatan peribadi?',
        '✅ Polisi boleh diperbaharui sehingga umur berapa?',
        '✅ Ada dana khas untuk kos kesihatan?', '',
        'Bila kesihatan terjaga & ada dana, simpanan persaraan tak cepat habis.'] },
      { id: 'B09', cat: 'emas', title: 'Jangan jual emas kerana panik', body: [
        '*Jangan jual emas kerana panik* 😌', '',
        'Harga emas naik turun — kadang-kadang turun mendadak dalam masa singkat.', '',
        'Kesilapan biasa: panik & jual waktu harga jatuh, kemudian menyesal bila harga naik semula.', '',
        'Jual emas bila ada *keperluan sebenar* atau bila matlamat tercapai — bukan kerana emosi. Simpanan emas ialah perancangan jangka panjang.'] },
      { id: 'B10', cat: 'kehidupan', islamic: true, title: 'Bekal yang kekal', body: [
        '*Bekal yang kekal* 🤲', '',
        'Rasulullah SAW bersabda: apabila mati anak Adam, terputus amalannya kecuali tiga — sedekah jariah, ilmu yang bermanfaat, dan anak soleh yang mendoakannya. (HR Muslim)', '',
        'Usia 50-an ialah masa terbaik untuk tambah bekal: ilmu, solat berjemaah, sedekah & wakaf.', '',
        'Harta yang kita belanjakan di jalan kebaikan, itulah yang kekal bersama kita.'] }
    ],
    warga: [
      { id: 'W01', cat: 'kewangan', title: 'Jangan kongsi OTP/TAC', body: [
        '*Jangan kongsi OTP/TAC dengan sesiapa* 🔐', '',
        'Pihak bank, polis, KWSP atau mana-mana agensi *tidak akan* minta nombor OTP/TAC, kata laluan, atau suruh kita pindahkan duit ke "akaun selamat".', '',
        'Kalau terima panggilan begini — letak telefon. Hubungi sendiri bank melalui nombor rasmi, atau tanya anak cucu dulu.', '',
        'Terkena scam? Segera hubungi *997*.'] },
      { id: 'W02', cat: 'emas', islamic: true, title: 'Hibah emas', body: [
        '*Hibah emas: agih kasih semasa hidup* 🎁', '',
        'Hibah ialah pemberian semasa hidup — boleh diberi kepada sesiapa yang kita sayang, dengan akad yang jelas.', '',
        'Ramai pilih hibah emas kepada anak atau cucu supaya:',
        '✅ Agihan lebih teratur ikut hasrat sendiri',
        '✅ Elak salah faham antara waris', '',
        'Dapatkan nasihat pihak bertauliah tentang dokumentasi hibah supaya jelas & teratur.'] },
      { id: 'W03', cat: 'kewangan', title: 'Gaji bulanan selepas bersara', body: [
        '*"Gaji" bulanan selepas bersara* 💵', '',
        'Walaupun dah bersara, pastikan ada aliran tunai bulanan — daripada pencen, dividen, sewa, atau bayaran bulanan KWSP (i-Emas).', '',
        'Asingkan:',
        '🏦 Akaun untuk perbelanjaan bulanan',
        '🧯 Akaun untuk kecemasan & kesihatan',
        '🎁 Bahagian untuk bantu anak cucu — dengan had yang jelas', '',
        'Bila berstruktur, duit lebih tahan lama. ⏳'] },
      { id: 'W04', cat: 'kehidupan', title: 'Kekal aktif, kekal sihat', body: [
        '*Kekal aktif, kekal sihat* 🚶', '',
        'Berjalan kaki 20–30 minit sehari, berkebun, senaman ringan, atau aktiviti bersama rakan — semuanya bantu kekuatan badan & minda.', '',
        'Makan ubat ikut jadual, minum air secukupnya, dan buat pemeriksaan kesihatan berkala.', '',
        'Sihat di usia emas ialah nikmat yang sangat besar. 🌿'] },
      { id: 'W05', cat: 'kewangan', title: 'Bantu anak, jaga diri', body: [
        '*Bantu anak, tapi jaga diri juga* 🤲', '',
        'Sebagai ibu bapa, kita sentiasa nak bantu anak. Tapi elakkan:',
        '❌ Jadi penjamin pinjaman besar',
        '❌ Keluarkan semua simpanan untuk bisnes atau hutang anak',
        '❌ Beri "pinjam" tanpa had', '',
        'Simpanan persaraan ialah tongkat kita. Kalau tongkat patah, kita yang susah — dan anak pun akhirnya turut terbeban.'] },
      { id: 'W06', cat: 'emas', title: 'Senarai harta untuk waris', body: [
        '*Satu dokumen yang sangat membantu waris* 📋', '',
        'Tuliskan *senarai harta*:',
        '🪙 Emas fizikal (lokasi & anggaran berat)',
        '💳 Akaun emas, bank, KWSP, takaful & simpanan lain',
        '🏠 Hartanah & kenderaan',
        '📞 Orang yang boleh dihubungi — contohnya dealer emas', '',
        'Simpan di tempat selamat & beritahu orang yang dipercayai. Urusan pusaka jadi jauh lebih mudah.'] },
      { id: 'W07', cat: 'kehidupan', islamic: true, title: 'Silaturahim', body: [
        '*Silaturahim, murah rezeki* 🤝', '',
        'Rasulullah SAW bersabda: sesiapa yang ingin dilapangkan rezekinya dan dipanjangkan umurnya, hendaklah dia menyambung silaturahim. (HR Bukhari & Muslim)', '',
        'Telefon adik-beradik, ziarah sahabat lama, hadir majlis keluarga.', '',
        'Hubungan yang baik menggembirakan hati — dan baik untuk kesihatan minda. 😊'] },
      { id: 'W08', cat: 'kewangan', title: 'Hati-hati peluang daripada kenalan', body: [
        '*Hati-hati "peluang" daripada kenalan* ⚠️', '',
        'Ramai pesara kehilangan simpanan bukan kerana orang asing — tapi kerana "peluang" daripada kenalan, saudara atau kawan lama.', '',
        'Sebelum melabur:',
        '✅ Semak syarikat & produk dalam senarai amaran Bank Negara & Suruhanjaya Sekuriti',
        '✅ Faham dari mana datangnya keuntungan',
        '✅ Jangan melabur kerana segan atau terdesak', '',
        'Kalau terlalu indah untuk jadi kenyataan, biasanya memang bukan kenyataan.'] },
      { id: 'W09', cat: 'emas', title: 'Hadiah emas untuk cucu', body: [
        '*Hadiah bermakna untuk cucu* 👶', '',
        'Hadiah yang paling diingati bukan sekadar mainan, tapi *nilai* & *cerita* di sebaliknya.', '',
        'Sekeping emas kecil sempena kelahiran atau hari jadi cucu boleh disimpan bertahun-tahun — kenangan daripada datuk & nenek.', '',
        'Ia juga mengajar generasi baru tentang menyimpan sejak kecil. 💛'] },
      { id: 'W10', cat: 'kehidupan', title: 'Pengalaman ialah warisan', body: [
        '*Pengalaman kita ialah warisan* 📖', '',
        'Jatuh bangun, susah senang yang kita lalui ialah "perpustakaan" yang sangat berharga untuk anak & cucu.', '',
        'Ceritakan bagaimana dulu kita menyimpan, berjimat & berusaha.', '',
        'Ilmu yang dikongsi ialah warisan yang tak akan susut nilainya. 🌳'] }
    ]
  };

  var GROUPS = ['muda', 'dewasa', 'pertengahan', 'matang', 'warga'];

  function finish(m, cat, ages) {
    return {
      id: m.id,
      cat: m.cat || cat,
      title: m.title,
      body: Array.isArray(m.body) ? m.body.join('\n') : m.body,
      ages: ages || [],
      islamic: !!m.islamic,
      opener: m.opener !== false,
      on: true,
      builtin: true
    };
  }

  // Susunan: mesej umum (emas, kewangan, kehidupan bergilir) dengan mesej
  // ikut umur diselitkan setiap mesej ke-3. Setiap penyimpan hanya terima
  // mesej yang sesuai dengan kumpulan umurnya, mengikut susunan ini.
  function buildOrder() {
    // Agih sama rata: setiap kategori diletakkan pada kedudukan pecahan
    // (i + 0.5) / jumlah supaya tiada kategori yang berlonggok di hujung.
    var general = [];
    function spread(list, cat, bias) {
      list.forEach(function (m, i) {
        general.push({ pos: (i + 0.5) / list.length + bias, msg: finish(m, cat) });
      });
    }
    // Susunan pembelajaran: asas dulu, kemudian topik lanjutan.
    function ordered(list, ids) {
      return ids.map(function (id) { return list.filter(function (m) { return m.id === id; })[0]; })
        .concat(list.filter(function (m) { return ids.indexOf(m.id) < 0; }));
    }
    spread(ordered(E, ['E01', 'E04', 'E02', 'E08', 'E05', 'E11', 'E03', 'E06', 'E12', 'E07', 'E09', 'E10']), 'emas', 0);
    spread(ordered(K, ['K01', 'K02', 'K09', 'K03', 'K04', 'K06', 'K05', 'K07', 'K08']), 'kewangan', 0.001);
    spread(ordered(H, ['H03', 'H01', 'H02', 'H04', 'H05', 'H08', 'H06', 'H07', 'H09']), 'kehidupan', 0.002);
    general.sort(function (a, b) { return a.pos - b.pos; });
    general = general.map(function (x) { return x.msg; });
    var nAge = 0;
    GROUPS.forEach(function (g) { nAge = Math.max(nAge, AGE[g].length); });
    var out = [finish(WELCOME, 'pengumuman')];
    var gi = 0, ai = 0;
    for (var k = 0; gi < general.length || ai < nAge; k++) {
      if ((k % 3 === 2 || gi >= general.length) && ai < nAge) {
        GROUPS.forEach(function (g) { if (AGE[g][ai]) out.push(finish(AGE[g][ai], null, [g])); });
        ai++;
      } else if (gi < general.length) {
        out.push(general[gi++]);
      }
    }
    return out;
  }

  var BIRTHDAYS = [
    { id: 'BD1', islamic: true, ages: [], body: [
      '{salam} {panggilan} 🎉', '',
      '*Selamat Hari Lahir!* 🎂',
      'Semoga dipanjangkan umur dalam kesihatan yang baik, dimurahkan rezeki, dan sentiasa dalam rahmat Allah.', '',
      'Terima kasih kerana menjadi sebahagian daripada keluarga penyimpan emas saya. 🤍'] },
    { id: 'BD2', islamic: true, ages: ['muda'], body: [
      'Happy birthday {panggilan}! 🎂🎉', '',
      'Semoga tahun ini penuh rezeki, makin berjaya dalam kerjaya & pelajaran, dan semua impian dipermudahkan Allah.', '',
      'Teruskan menyimpan — diri kita 10 tahun lagi pasti berterima kasih. 😉'] },
    { id: 'BD3', islamic: true, ages: ['dewasa', 'pertengahan'], body: [
      '{salam} {panggilan} 🎂', '',
      'Selamat hari lahir! Semoga Allah kurniakan kesihatan yang baik, keluarga yang bahagia, dan rezeki yang berkat buat {panggilan} sekeluarga.', '',
      'Semoga semua perancangan tahun ini berjalan lancar. 🤲'] },
    { id: 'BD4', islamic: true, ages: ['matang', 'warga'], body: [
      '{salam} {panggilan} 🌷', '',
      'Selamat hari lahir. Semoga dipanjangkan umur dalam keberkatan, dikurniakan kesihatan yang baik, dan sentiasa dikelilingi anak cucu yang menyayangi.', '',
      'Terima kasih atas kepercayaan selama ini. 🤍'] },
    { id: 'BD5', islamic: false, ages: [], body: [
      '{salam} {panggilan}! 🎉', '',
      '*Selamat Hari Lahir — Happy Birthday!* 🎂',
      'Semoga sentiasa sihat, bahagia dan dimurahkan rezeki sepanjang tahun ini.', '',
      'Terima kasih kerana bersama dalam keluarga penyimpan emas saya. 😊'] },
    { id: 'BD6', islamic: false, ages: ['matang', 'warga'], body: [
      '{salam} {panggilan} 🌷', '',
      'Selamat Hari Lahir! Semoga sentiasa sihat, gembira bersama keluarga, dan dikurniakan kebahagiaan pada usia ini.', '',
      'Terima kasih atas kepercayaan & sokongan selama ini. 🤍'] },
    { id: 'BD7', islamic: true, ages: [], body: [
      '{salam} {panggilan} 🎂', '',
      'Selamat ulang tahun kelahiran! Semoga setiap hari dipenuhi keberkatan, setiap usaha dipermudahkan, dan setiap doa dimakbulkan. Aamiin. 🤲'] },
    { id: 'BD8', islamic: false, ages: ['muda', 'dewasa'], body: [
      'Hai {panggilan}! 🎉🎂', '',
      'Selamat hari lahir! Semoga tahun baru dalam hidup ini penuh peluang, kejayaan & kegembiraan.', '',
      'Enjoy your day! 😄'] }
  ].map(function (b) {
    return { id: b.id, body: b.body.join('\n'), ages: b.ages, islamic: !!b.islamic, on: true, builtin: true };
  });

  var OPENERS = [
    '{salam} {panggilan} 😊',
    '{salam} {panggilan}, selamat {waktu}!',
    '{salam} {panggilan}, apa khabar? Semoga sihat selalu 🌿',
    '{salam} {panggilan} 👋',
    '{salam} {panggilan}. Tips ringkas hari {hari} ni 👇'
  ];

  root.SE_CONTENT = {
    version: 1,
    messages: buildOrder(),
    birthdays: BIRTHDAYS,
    openers: OPENERS
  };
})(typeof window !== 'undefined' ? window : globalThis);
