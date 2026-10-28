/* Servis Emas — pustaka kandungan lalai (versi 2).
 * Ilmu ringkas: emas, kewangan & kehidupan. Satu set umum untuk semua,
 * dan satu set khas untuk setiap kumpulan umur.
 * ages: [] = semua umur; atau senarai kumpulan: muda, dewasa, pertengahan, matang, warga
 * islamic: true = tidak dihantar kepada penyimpan dalam kumpulan "Bukan Islam"
 * Placeholder: {panggilan} {nama} {nama_pendek} {salam} {waktu} {hari} {nama_saya}
 * Ayat pembuka (salam + nama) ditambah automatik di atas setiap mesej.
 */
(function (root) {
  'use strict';

  function x(id, cat, title, lines, islamic) {
    return { id: id, cat: cat, title: title, body: lines, islamic: !!islamic };
  }

  var WELCOME = x('S00', 'pengumuman', 'Salam perkenalan siri tips', [
    '*Tips ringkas untuk penyimpan emas* 🌟', '',
    'Terima kasih kerana percaya simpan emas bersama saya.', '',
    'Mulai sekarang, sekali-sekala saya kongsi *ilmu ringkas* tentang emas, kewangan & kehidupan. Pendek je, 1 minit baca.', '',
    'Tolong *save nombor saya* ya, supaya mesej sampai dengan elok. Ada soalan? Balas je terus 🤝']);

  /* ======================= SET UMUM: EMAS ======================= */
  var E = [
    x('E01', 'emas', 'Kenapa orang simpan emas?', [
      '*Kenapa orang simpan emas?* 🪙', '',
      'Duit kertas... makin lama makin "kecut" kuasa belinya.', '',
      'Emas pula dah dihargai beribu tahun, di seluruh dunia.', '',
      'Sebab tu kita simpan emas untuk *jaga nilai*. Bukan untuk cepat kaya.']),
    x('E13', 'emas', 'Emas: simpanan atau pelaburan?', [
      '*Emas: simpanan atau pelaburan?* 💭', '',
      'Kalau niat nak untung cepat, kita akan stres tengok harga setiap hari.', '',
      'Tapi kalau niat *menyimpan*... harga turun pun kita tenang, malah tambah gram.', '',
      'Niat menentukan cara kita bertindak. Anggap emas sebagai simpanan jangka panjang.']),
    x('E04', 'emas', 'Tunggu harga turun?', [
      '*Tunggu harga turun?* 📅', '',
      'Ramai tunggu... tunggu... akhirnya tak beli langsung.', '',
      'Cara lebih tenang: simpan *jumlah tetap setiap bulan*. Harga tinggi, dapat gram sikit. Harga rendah, dapat lebih.', '',
      'Lama-lama purata jadi seimbang. Yang penting, mula dan teruskan.']),
    x('E02', 'emas', '999.9 vs 916', [
      '*999.9 vs 916, apa beza?* ✨', '',
      '*999.9 (24K)*: hampir tulen. Sesuai untuk simpan.', '',
      '*916 (22K)*: barang kemas. Harganya termasuk upah tukang, dan upah ni biasanya tak dikira bila jual balik.', '',
      'Nak bergaya, pakai 916. Nak simpan nilai, pilih 999.9 😉']),
    x('E05', 'emas', 'Kenapa jual beli cepat selalu rugi?', [
      '*Kenapa jual beli cepat selalu rugi?* ⏳', '',
      'Sebab ada *spread*, iaitu beza harga jual dan harga beli balik.', '',
      'Beli hari ni, jual minggu depan... selalunya rugi walaupun harga tak banyak berubah.', '',
      'Emas ni macam pokok. Tanam, jaga, sabar 🌳']),
    x('E14', 'emas', 'Kira simpanan dalam gram', [
      '*Kira simpanan dalam gram* ⚖️', '',
      'Kalau kira dalam Ringgit, hari-hari rasa naik turun.', '',
      'Cuba tukar cara kira: *berapa gram* yang dah terkumpul?', '',
      'Gram tak susut. Sasaran pun lebih jelas: 10g, 50g, 100g... 🎯']),
    x('E03', 'emas', 'Siapa tentukan harga emas?', [
      '*Siapa tentukan harga emas?* 🌍', '',
      'Dua benda je:',
      '1️⃣ Harga emas dunia (USD)',
      '2️⃣ Kadar tukaran USD/Ringgit', '',
      'Kadang harga dunia tak gerak, tapi harga kita naik... sebab Ringgit lemah. Faham ni, kita tak mudah panik.']),
    x('E11', 'emas', 'Zakat emas', [
      '*Zakat emas, dah semak?* 🤲', '',
      'Emas simpanan wajib zakat bila:',
      '✅ Cukup *nisab* 85 gram',
      '✅ Cukup *haul* (genap setahun)',
      '💰 Kadar *2.5%* ikut nilai semasa', '',
      'Emas perhiasan yang dipakai ikut *uruf* negeri (contoh Selangor: 800g). Semak dengan pusat zakat negeri ya.'], true),
    x('E06', 'emas', 'Simpan emas fizikal di rumah', [
      '*Simpan emas fizikal di rumah?* 🔐', '',
      '✅ Jangan hebah, termasuk di media sosial',
      '✅ Guna peti besi yang dipasang kukuh',
      '✅ Jangan simpan semua di satu tempat',
      '✅ Resit & sijil simpan berasingan', '',
      'Tak nak pening jaga? Simpan dalam akaun GAP 😊']),
    x('E08', 'emas', 'Emas untung tetap bulanan?', [
      '*"Simpan emas, dapat untung tetap bulanan"* 🚩', '',
      'Hati-hati. Emas sendiri tak bayar untung bulanan. Harganya naik turun ikut pasaran.', '',
      'Kalau ada yang janji untung tetap, tanya: *duit tu datang dari mana?*', '',
      'Ragu? Semak Senarai Amaran Pengguna Kewangan Bank Negara dulu.']),
    x('E12', 'emas', '"Emas dah mahal sekarang..."', [
      '*"Emas dah mahal sekarang..."* 🤔', '',
      'Ayat ni kita dengar sejak dulu. Setiap kali harga cecah paras tinggi, ramai rasa dah terlambat.', '',
      'Tapi tiada siapa tahu harga esok.', '',
      'Yang penting bukan beli paling murah... tapi kita *ada* emas bila kita perlukannya nanti.']),
    x('E10', 'emas', 'Kecemasan? Ada Ar-Rahnu', [
      '*Kecemasan? Tak semestinya kena jual emas* 🆘', '',
      'Ada pilihan *Ar-Rahnu*: emas dicagar, dapat tunai, emas masih milik kita dan boleh ditebus semula.', '',
      'Tapi ingat... untuk kecemasan sebenar. Bukan untuk beli barang kehendak 😉']),
    x('E15', 'emas', 'Barang kemas pun boleh jadi simpanan', [
      '*Barang kemas pun boleh jadi simpanan* 💍', '',
      'Asalkan pilih dengan bijak:',
      '✅ Upah berpatutan',
      '✅ Ketulenan jelas (cth: 916)',
      '✅ Mudah dijual semula dengan harga adil', '',
      'Cantik dipakai, ada nilai bila perlu. Tak rasa ralat 😊']),
    x('E07', 'emas', 'Resit emas, jangan buang', [
      '*Resit emas, jangan buang!* 🧾', '',
      'Resit, sijil dan pembungkus asal sangat membantu bila nak jual semula... atau bila waris urus pusaka.', '',
      'Tip: ambil gambar semua, simpan dalam satu folder di telefon. Beritahu pasangan di mana dokumen asal disimpan.']),
    x('E09', 'emas', 'Kenapa emas digelar safe haven?', [
      '*Kenapa emas digelar "safe haven"?* 🛡️', '',
      'Bila dunia bergolak (perang, krisis, inflasi), ramai beralih kepada emas. Termasuk bank pusat.', '',
      'Sebabnya simple: nilai emas tak bergantung pada janji mana-mana syarikat.', '',
      'Simpan *sebahagian* dalam emas. Bukan semua, tapi ada.'])
  ];

  /* ======================= SET UMUM: KEWANGAN ======================= */
  var K = [
    x('K01', 'kewangan', 'Dana kecemasan dulu', [
      '*Dana kecemasan dulu* 🧯', '',
      'Sasaran: *3 hingga 6 bulan* perbelanjaan.', '',
      'Bila kereta rosak atau tiba-tiba sakit, kita tak perlu berhutang... atau jual aset masa harga tak cantik.', '',
      'Mula kecil pun OK. RM50 seminggu = RM2,600 setahun 💪']),
    x('K02', 'kewangan', 'Gaji masuk, siapa dapat dulu?', [
      '*Gaji masuk, siapa dapat dulu?* 💰', '',
      'Kebanyakan kita: bil, hutang, belanja... baki baru simpan. Selalunya baki tu tak ada 😅', '',
      'Terbalikkan: *asingkan simpanan dulu*, baru belanja.', '',
      'Lagi mudah kalau automatik. Set arahan tetap pada hari gaji.']),
    x('K09', 'kewangan', 'Selesai hutang: fokus punca', [
      '*Nak selesai hutang? Fokus punca, bukan hutang* 🔎', '',
      'Hutang selalunya *simptom*. Puncanya gaya hidup, tiada bajet, atau tiada dana kecemasan.', '',
      'Tutup punca dulu, baru hutang tak datang balik.', '',
      'Perlukan bantuan? AKPK beri khidmat nasihat kewangan *percuma*.']),
    x('K03', 'kewangan', 'Cabaran catat belanja 30 hari', [
      '*Cabaran 30 hari: catat semua belanja* 📝', '',
      'Kopi, parking, Grab, langganan app... semua.', '',
      'Hujung bulan, ramai terkejut. Duit bukan hilang, tapi *bocor* sikit-sikit.', '',
      'Bila dah nampak bocor, baru boleh tampal.']),
    x('K04', 'kewangan', 'Satu soalan sebelum berhutang', [
      '*Sebelum berhutang, tanya satu soalan* ⚖️', '',
      '"Benda ni buat aku lebih kukuh... atau lebih tertekan 2 tahun lagi?"', '',
      'Hutang untuk rumah didiami atau pendidikan, lebih munasabah.', '',
      'Hutang untuk gaya hidup? Itu yang selalu menjerut.']),
    x('K10', 'kewangan', 'Nak bebas masa? Bebas hutang dulu', [
      '*Nak bebas masa? Bebaskan diri dari hutang* ☕', '',
      'Setiap ansuran ialah "bos kecil" yang ikat kita untuk terus bekerja.', '',
      'Makin kurang hutang, makin banyak pilihan: nak rehat, nak bercuti, nak tukar kerjaya.', '',
      'Kebebasan sebenar bermula bila cashflow tak lagi tersepit.']),
    x('K05', 'kewangan', 'Petua 72', [
      '*Petua 72* 📉', '',
      '72 ÷ kadar inflasi = berapa tahun nilai duit jadi separuh.', '',
      'Inflasi 3%? 72 ÷ 3 = *24 tahun*.', '',
      'Duit yang "tidur" tanpa pulangan, kuasa belinya terhakis perlahan-lahan. Jangan biar duit tidur.']),
    x('K11', 'kewangan', 'Asingkan akaun', [
      '*Satu akaun untuk semua? Patutlah cepat habis* 🏦', '',
      'Cuba asingkan:',
      '1️⃣ Akaun bil & belanja',
      '2️⃣ Akaun simpanan (jangan bawa kad ATM-nya)',
      '3️⃣ Simpanan emas', '',
      'Duit yang tak nampak, kurang diusik 😉']),
    x('K06', 'kewangan', 'Jaga rekod kredit', [
      '*Jaga rekod kredit* 📋', '',
      'Bila mohon pinjaman rumah atau kereta, bank semak rekod bayaran kita dalam *CCRIS*.', '',
      '✅ Set auto-debit untuk bil & ansuran',
      '✅ Bayar penuh kad kredit',
      '✅ Semak laporan sendiri, percuma di eCCRIS Bank Negara']),
    x('K12', 'kewangan', 'Simpanan yang ada nama', [
      '*Simpanan yang ada nama* 🎯', '',
      'Simpanan tanpa tujuan, senang diusik.', '',
      'Bagi nama: "Dana Anak", "Deposit Rumah", "Dana Pencen".', '',
      'Bila ada nama dan tarikh, kita lebih berdisiplin. Rasa sayang nak keluarkan untuk benda remeh.']),
    x('K07', 'kewangan', 'Semak langganan bulanan', [
      '*Langganan bulanan, semak sekarang* 🔍', '',
      'Streaming, storan awan, gim, app yang dah lama tak buka...', '',
      'Satu-satu nampak kecil. Tapi 5–6 langganan boleh cecah RM100+ sebulan. Lebih RM1,200 setahun!', '',
      'Batalkan yang tak perlu, masukkan ke simpanan 😉']),
    x('K13', 'kewangan', 'Kad kredit: alat, bukan duit tambahan', [
      '*Kad kredit: alat, bukan duit tambahan* 💳', '',
      'Guna kad kredit OK, untuk ganjaran atau kemudahan.', '',
      'Syaratnya satu: *bayar penuh setiap bulan*.', '',
      'Kalau mula bayar minimum je, itu tanda kita dah berbelanja lebih daripada kemampuan.']),
    x('K08', 'kewangan', 'Lindungi pencari nafkah', [
      '*Kalau pencari nafkah jatuh sakit, siapa tanggung?* ☂️', '',
      'Simpanan dan emas penting. Tapi perlindungan pun sama penting: perubatan, hayat & penyakit kritikal, ikut kemampuan.', '',
      'Ia "tembok" yang jaga simpanan kita daripada habis bila musibah datang.']),
    x('K14', 'kewangan', 'Dapat duit lebih? 50:50', [
      '*Dapat duit lebih? Peraturan 50:50* 🎁', '',
      'Bonus, duit raya, elaun lebih... selalunya "hilang" tanpa sedar.', '',
      'Cuba: *separuh enjoy, separuh simpan*, contohnya dalam emas.', '',
      'Hati puas, masa depan pun terjaga.']),
    x('K15', 'kewangan', 'Barang mahal? Tunggu 7 hari', [
      '*Barang mahal? Tunggu 7 hari* ⏸️', '',
      'Nak beli sesuatu yang mahal tapi bukan keperluan? Tangguh seminggu.', '',
      'Kalau masih rasa perlu, baru fikir semula.', '',
      'Selalunya... keinginan tu dah reda sendiri. Duit selamat 😄'])
  ];

  /* ======================= SET UMUM: KEHIDUPAN ======================= */
  var H = [
    x('H03', 'kehidupan', 'Kaya itu hati yang cukup', [
      '*Kaya itu hati yang cukup* 🤍', '',
      'Sebelum tidur, ingat 3 perkara yang kita syukuri hari ni. Kecil pun tak apa.', '',
      'Secawan kopi panas. Anak ketawa. Rezeki yang sampai.', '',
      'Hati yang tenang buat keputusan kewangan yang lebih baik 😊']),
    x('H01', 'kehidupan', 'Sedikit, tapi berterusan', [
      '*Sedikit, tapi berterusan* 🌱', '',
      'Amalan yang paling disukai Allah ialah yang berterusan walaupun sedikit. (HR Bukhari & Muslim)', '',
      'Simpanan, kesihatan, ilmu... sama. RM10 sehari, 10 minit berjalan, 1 muka surat buku.', '',
      'Kecil, tapi bila istiqamah, hasilnya besar.'], true),
    x('H02', 'kehidupan', 'Sihat itu kekayaan', [
      '*Sihat itu kekayaan* 🏃', '',
      'Ada duit tapi tak sihat... susah nak nikmati.', '',
      '3 "pelaburan" kesihatan paling murah:',
      '😴 Tidur cukup',
      '🚶 Bergerak 30 minit sehari',
      '💧 Kurangkan air manis']),
    x('H10', 'kehidupan', 'Duit, masa, kawan sekufu', [
      '*Duit, masa, kawan sekufu* ☕', '',
      'Ada duit tapi tiada masa... penat.',
      'Ada masa tapi tiada duit... risau.',
      'Ada dua-dua tapi tiada kawan untuk berkongsi... sunyi.', '',
      'Hidup bermakna bila ketiga-tiganya seimbang.']),
    x('H04', 'kehidupan', 'Masa tak boleh dibeli semula', [
      '*Masa tak boleh dibeli semula* 👨‍👩‍👧', '',
      'Duit hilang boleh dicari. Masa yang berlalu, tak boleh.', '',
      'Minggu ni, luangkan satu masa tanpa telefon bersama keluarga.', '',
      'Jangan sampai keluarga cuma dapat "baki" masa kita ❤️']),
    x('H05', 'kehidupan', 'Rebut 5 sebelum 5', [
      '*Rebut 5 sebelum 5* ⏰', '',
      'Muda sebelum tua. Sihat sebelum sakit. Kaya sebelum miskin. Lapang sebelum sibuk. Hidup sebelum mati. (HR al-Hakim)', '',
      'Masa sihat dan lapang ialah modal terbesar kita, termasuk untuk mula menyimpan.'], true),
    x('H08', 'kehidupan', 'Kita purata 5 orang terdekat', [
      '*Kita purata 5 orang terdekat* 🤝', '',
      'Kawan rajin berhutang, kita mudah terikut.', '',
      'Kawan rajin menyimpan dan membina, kita pun terdorong.', '',
      'Cari kawan *sekufu* yang tarik kita ke depan.']),
    x('H11', 'kehidupan', 'Jaga lidah, jaga rezeki', [
      '*Jaga lidah, jaga rezeki* 🤐', '',
      'Kata-kata boleh buka pintu peluang... atau tutup terus.', '',
      'Elak mengumpat, merungut, dan berjanji benda yang tak mampu ditunaikan.', '',
      'Orang ingat bagaimana kita buat mereka rasa.']),
    x('H06', 'kehidupan', 'Sedekah tak kurangkan harta', [
      '*Sedekah tak kurangkan harta* 💚', '',
      'Pesan Rasulullah SAW. (HR Muslim)', '',
      'Tak perlu banyak. RM1 sehari pun, kalau konsisten, besar maknanya.', '',
      'Ada yang bahagi setiap gaji: simpanan, emas dan *sedekah* 🤲'], true),
    x('H07', 'kehidupan', 'Pendapatan jarang melebihi ilmu', [
      '*Pendapatan jarang melebihi ilmu* 📚', '',
      'Luangkan 15 minit sehari untuk belajar: buku, podcast, kelas.', '',
      '15 minit × 365 hari = lebih 90 jam setahun. Macam satu kursus penuh!', '',
      'Pelaburan pada diri sendiri tak pernah rugi.']),
    x('H12', 'kehidupan', 'Kaya itu boleh jadi mulia', [
      '*Kaya itu boleh jadi mulia* 🌟', '',
      'Bila ada lebih, kita boleh bantu keluarga, bersedekah, dan buka peluang kerja untuk orang lain.', '',
      'Jadi berusaha untuk kaya bukan salah.', '',
      'Yang penting: cara dapat yang betul, dan guna untuk kebaikan.']),
    x('H09', 'kehidupan', 'Bab 1 kita vs bab 20 orang lain', [
      '*Jangan bandingkan bab 1 kita dengan bab 20 orang lain* 📱', '',
      'Media sosial tunjuk hasil, jarang tunjuk proses... apatah lagi hutang di sebaliknya 😅', '',
      'Ukuran paling adil: kita hari ni vs kita setahun lepas.']),
    x('H13', 'kehidupan', 'Rehat pun produktif', [
      '*Rehat pun produktif* 🔋', '',
      'Kita bukan mesin. Badan penat, fikiran serabut, keputusan pun jadi silap. Termasuk keputusan kewangan.', '',
      'Tidur cukup. Cuti yang betul-betul cuti.', '',
      'Itu "servis" untuk diri sendiri 🙂']),
    x('H14', 'kehidupan', 'Soalan: topik apa seterusnya?', [
      '*Satu soalan ringkas* 💬', '',
      'Topik apa yang paling nak tahu lepas ni?',
      '1️⃣ Emas & akaun GAP',
      '2️⃣ Hutang & bajet',
      '3️⃣ Persaraan',
      '4️⃣ Pendidikan anak', '',
      'Balas nombor je. Saya baca semua 😊']),
    x('H15', 'kehidupan', 'Rancang esok, malam ni', [
      '*Rancang esok, malam ni* 🗒️', '',
      'Sebelum tidur, tulis 3 perkara penting untuk esok.', '',
      'Bangun pagi, kita dah tahu arah. Kurang membazir masa, kurang stres.', '',
      'Hidup yang teratur, kewangan pun lebih teratur.'])
  ];

  /* ======================= SET IKUT KUMPULAN UMUR ======================= */
  var AGE = {
    /* ---------- MUDA (bawah 30) ---------- */
    muda: {
      emas: [
        x('M02', 'emas', 'Mula simpan emas masa muda', [
          '*Kelebihan terbesar orang muda?* ⏳', '',
          'Bukan duit banyak... tapi *masa yang panjang*.', '',
          'Akaun GAP boleh mula serendah RM100. Kecil? Ya. Tapi buat setiap bulan selama 10 tahun, bezanya besar.', '',
          'Yang kaya ialah yang mula awal dan tak berhenti.']),
        x('M11', 'emas', 'Phone baru vs 1 gram', [
          '*Phone baru vs 1 gram emas* 📱', '',
          'Gajet baru, tahun depan nilainya dah jatuh.', '',
          'Tak salah nak upgrade. Tapi cuba peraturan ni: *setiap kali beli gajet, simpan emas sekali*.', '',
          'Satu untuk enjoy hari ni, satu untuk masa depan. Adil kan? 😄']),
        x('M06', 'emas', 'Tabung kahwin dalam emas', [
          '*Tabung kahwin dalam emas* 💍', '',
          'Hantaran, majlis, cincin... boleh cecah puluhan ribu.', '',
          'Contoh: simpan 2 gram sebulan. Dalam 3 tahun, dah ada *72 gram*.', '',
          'Bila sampai masa, boleh jadi hantaran atau dijual untuk belanja majlis. Kahwin tanpa hutang ❤️']),
        x('M12', 'emas', 'Set peringatan hari gaji', [
          '*Disiplin paling mudah: jangan harap ingatan* ⏰', '',
          'Set peringatan di telefon pada *hari gaji*: "Top up emas".', '',
          'Gaji masuk, simpan, siap. Tak perlu fikir panjang.', '',
          'Orang yang berjaya menyimpan bukan sebab gaji besar... tapi sebab *sistem* yang mudah.']),
        x('M09', 'emas', 'Jangan ganggu duit keperluan', [
          '*Simpan emas guna duit lebihan* ⚠️', '',
          'Emas bagus untuk simpanan. Tapi jangan sampai guna duit sewa, bil atau duit makan.', '',
          'Kalau ambil pelan ansuran, pastikan mampu bayar *penuh* setiap bulan tanpa ganggu keperluan.', '',
          'Perlahan tak apa. Asalkan tenang 😴']),
        x('M13', 'emas', 'Raikan pencapaian dengan 1 gram', [
          '*Raikan pencapaian dengan 1 gram* 🏅', '',
          'Naik pangkat? Habis belajar? Dapat projek besar?', '',
          'Selain belanja makan, hadiahkan diri sendiri *1 gram emas*.', '',
          'Bertahun nanti, setiap gram tu ada cerita. Kenangan yang ada nilai 😊']),
        x('M14', 'emas', 'Rumah pertama: mula simpan sekarang', [
          '*Rumah pertama: mula simpan sekarang* 🏠', '',
          'Deposit, yuran guaman, duti setem... kos awal rumah bukan sikit.', '',
          'Kumpul sedikit demi sedikit dalam bentuk emas. Bila cukup masa, cairkan untuk kos tu.', '',
          'Simpanan dalam emas tak mudah "tercicir" macam duit dalam akaun biasa.']),
        x('M15', 'emas', 'Sasaran 10 gram pertama', [
          '*Sasaran pertama: 10 gram* 🎯', '',
          'Sasaran besar buat kita rasa jauh. Pecahkan jadi kecil.', '',
          '10 gram pertama dulu. Lepas tu 20g, 50g, 100g.', '',
          'Setiap kali capai, raikan. Momentum tu yang buat kita terus menyimpan 💪'])
      ],
      kewangan: [
        x('M01', 'kewangan', 'Formula 50/30/20', [
          '*Formula gaji 50/30/20* 🎯', '',
          '🏠 50% keperluan',
          '🎉 30% kehendak',
          '💰 20% simpanan & pelaburan', '',
          'Tak cukup 20%? Mula dengan 10%. Yang penting *simpan dulu*, baru belanja.']),
        x('M16', 'kewangan', 'Gaji pertama paling "bahaya"', [
          '*Gaji pertama selalunya paling "bahaya"* 💼', '',
          'Sebab teruja. Terus ambil kereta, telefon baru, ansuran sana sini.', '',
          'Cuba *hidup macam gaji pelatih* untuk setahun pertama. Beza gaji tu terus simpan.', '',
          'Gaya hidup naik perlahan, simpanan naik laju.']),
        x('M03', 'kewangan', 'Hati-hati BNPL', [
          '*"Bayar 3 kali je, tak terasa"* 🛒', '',
          'Itulah perangkap BNPL. Satu tak terasa... tapi lima serentak, gaji habis bayar barang yang dah lama dipakai.', '',
          'Sebelum tekan butang, tanya: "Kalau kena bayar penuh hari ni, aku masih nak beli?"', '',
          'Kalau tak... tak payah beli 🙂']),
        x('M17', 'kewangan', 'Bina pendapatan kedua', [
          '*Satu sumber pendapatan = satu risiko* 💡', '',
          'Masa muda, tenaga banyak. Cuba bina pendapatan kedua: jual online, freelance, ajar skil.', '',
          'RM300 sebulan pun dah cukup jadi simpanan tetap.', '',
          'Dan ilmu berniaga tu... tak ternilai.']),
        x('M05', 'kewangan', 'Kereta pertama', [
          '*Kereta pertama: jangan sampai tercekik* 🚗', '',
          'Kos sebenar bukan ansuran je. Tambah insurans, cukai jalan, minyak, tol, parking & servis.', '',
          'Panduan ramai guna: jumlah kos kereta tak lebih *15–20% gaji bersih*.', '',
          'Kereta idaman boleh datang kemudian, bila aset dah kukuh.']),
        x('M18', 'kewangan', 'Mula 25 vs mula 35', [
          '*Mula 25 vs mula 35* ⏱️', '',
          'Simpan RM200 sebulan:',
          '• Mula umur 25 hingga 55 = *RM72,000*',
          '• Mula umur 35 hingga 55 = *RM48,000*', '',
          'Beza RM24,000... belum kira pulangan. Masa ialah aset paling mahal orang muda.']),
        x('M08', 'kewangan', 'Pinjaman pendidikan: jangan tangguh', [
          '*Pinjaman pendidikan: jangan tangguh bayar* 🎓', '',
          'Bayar konsisten walaupun sikit. Lebih baik daripada tunggakan menimbun.', '',
          '✅ Set potongan gaji atau auto-debit',
          '✅ Pantau tawaran diskaun penyelesaian dari semasa ke semasa', '',
          'Bebas hutang awal = lebih ruang untuk menyimpan.']),
        x('M19', 'kewangan', 'Kopi harian', [
          '*Kopi RM12 sehari* ☕', '',
          'Bukan salah minum kopi. Tapi kira sekejap: RM12 × 22 hari kerja = *RM264 sebulan*.', '',
          'Kurangkan separuh pun, dah ada RM132 untuk simpanan setiap bulan.', '',
          'Duit besar selalunya bocor melalui benda kecil.'])
      ],
      kehidupan: [
        x('M04', 'kehidupan', 'Labur pada diri sendiri', [
          '*Labur pada diri sendiri* 🚀', '',
          'Umur 20-an ialah masa terbaik untuk "beli" skil.', '',
          'Komunikasi, jualan, digital, bahasa... semua boleh naikkan pendapatan bertahun-tahun.', '',
          'Tahun ni, pilih *satu skil* untuk dikuasai. Satu je dulu.']),
        x('M07', 'kehidupan', 'Gaji masuk, ingat mak ayah', [
          '*Gaji masuk, jangan lupa mak ayah* 🤍', '',
          'Hulur sikit pun tak apa. Bukan jumlah yang mak ayah nilai, tapi ingatan kita.', '',
          'Masukkan dalam bajet. Jadikan "wajib", bukan "kalau ada lebih".', '',
          'Dan kadang-kadang, mak ayah lebih hargai *masa* kita 😊']),
        x('M20', 'kehidupan', 'Network is net worth', [
          '*Network is net worth* 🤝', '',
          'Peluang kerja, bisnes dan ilmu selalunya datang melalui *orang*.', '',
          'Rajin hadir program, kenal orang baru, bantu tanpa minta balasan.', '',
          'Hari ni kita bantu orang. Esok, mungkin dia yang buka pintu untuk kita.']),
        x('M10', 'kehidupan', 'Jaga kesihatan dari muda', [
          '*Tabiat hari ni = bil kesihatan 20 tahun lagi* 💪', '',
          'Masa muda, makan apa pun OK, tidur lewat pun OK.', '',
          'Tapi badan simpan semua rekod.', '',
          'Kurangkan air manis, bersenam 3 kali seminggu, tidur cukup. Mula sekarang.']),
        x('M21', 'kehidupan', 'Gagal tu guru', [
          '*Gagal tu guru, bukan penamat* 📖', '',
          'Bisnes tak jadi? Kerja tak dapat? Duit hilang?', '',
          'Tanya satu soalan: "Apa yang aku belajar?"', '',
          'Orang berjaya bukan tak pernah jatuh. Mereka cuma bangun lebih cepat.']),
        x('M22', 'kehidupan', 'Cari mentor', [
          '*Cari mentor, jimat 10 tahun* 🧭', '',
          'Belajar dari kesilapan sendiri memang berkesan... tapi mahal dan lambat.', '',
          'Belajar dari pengalaman orang yang dah lalui, lebih cepat.', '',
          'Cari seorang mentor dalam kerjaya atau kewangan. Tanya, dengar, buat.']),
        x('M23', 'kehidupan', 'Pasangan yang sefahaman tentang duit', [
          '*Cari pasangan yang sefahaman tentang duit* 💑', '',
          'Cinta penting. Tapi cara urus duit pun penting.', '',
          'Sebelum kahwin, bincang terus terang: hutang, simpanan, impian.', '',
          'Rumah tangga yang tenang bermula dengan kewangan yang telus.']),
        x('M24', 'kehidupan', 'Tabiat kecil, kesan besar', [
          '*Tak perlu berubah drastik* 📈', '',
          'Cukup jadi *1% lebih baik* setiap hari.', '',
          'Simpan sikit setiap bulan. Baca sikit setiap hari. Gerak badan sikit setiap pagi.', '',
          'Setahun nanti, kita sendiri terkejut tengok bezanya.'])
      ]
    },

    /* ---------- DEWASA (30-39) ---------- */
    dewasa: {
      emas: [
        x('D02', 'emas', 'Dana pendidikan anak dalam emas', [
          '*Dana pendidikan anak dalam emas* 🎓', '',
          'Kos belajar 15–18 tahun lagi mungkin jauh lebih tinggi.', '',
          'Ramai ibu bapa simpan sedikit emas setiap bulan untuk setiap anak. Bila anak masuk universiti, cairkan untuk yuran.', '',
          'Nak mula untuk anak? Tanya saya, saya terangkan caranya 😊']),
        x('D11', 'emas', 'Simpanan berlapis untuk keluarga', [
          '*Simpanan berlapis untuk keluarga* 🛡️', '',
          '1️⃣ Tunai 3 bulan belanja, untuk kecemasan segera',
          '2️⃣ Emas, lapisan kedua yang tahan nilai',
          '3️⃣ Simpanan jangka panjang: persaraan & pendidikan', '',
          'Bila kecemasan besar datang, emas boleh dicairkan tanpa perlu berhutang.']),
        x('D12', 'emas', 'Rumah dengan bantuan emas', [
          '*Rumah dengan bantuan emas* 🏡', '',
          'Ada yang kumpul emas bertahun-tahun, kemudian cairkan untuk deposit... malah ada yang langsaikan rumah.', '',
          'Rahsianya bukan modal besar. Tapi *konsisten* dan *sabar*.', '',
          'Tetapkan sasaran gram dan tarikh. Rumah idaman lebih dekat dari yang kita sangka.']),
        x('D06', 'emas', 'Hadiah emas untuk anak', [
          '*Hadiah yang mendidik* 🎁', '',
          'Hari jadi, keputusan cemerlang, duit raya... cuba jadikan sebahagiannya *emas*.', '',
          'Mainan rosak dalam setahun. Emas boleh disimpan bertahun-tahun.', '',
          'Bila anak besar: "Ini simpanan sejak kamu kecil." 💛']),
        x('D09', 'emas', 'Berapa emas patut ada?', [
          '*Berapa banyak emas patut ada?* 🎯', '',
          'Satu sasaran mudah: emas bernilai *6–12 bulan perbelanjaan*, sebagai benteng kedua selepas dana kecemasan tunai.', '',
          'Pecahkan jadi kecil: 10g, 50g, 100g... Setiap kali capai, raikan! 🎉']),
        x('D13', 'emas', 'Hadiah untuk pasangan', [
          '*Ulang tahun perkahwinan? Hadiah yang kekal* 💞', '',
          'Bunga layu dalam seminggu. Makan malam habis sejam.', '',
          'Sekeping emas kecil? Kekal bertahun-tahun, dan nilainya ada.', '',
          'Hadiah yang romantik... dan bijak 😉']),
        x('D14', 'emas', 'Jangan cairkan emas untuk kehendak', [
          '*Emas ada tugas. Jangan curi tugasnya* 🏷️', '',
          'Emas untuk pendidikan anak, jangan dijual untuk belanja raya atau cuti.', '',
          'Bila emas dicairkan untuk kehendak, simpanan bertahun hilang dalam seminggu.', '',
          'Belanja kehendak, guna tabung kehendak.']),
        x('D15', 'emas', 'Ajak anak tengok gram bertambah', [
          '*Ajak anak tengok gram bertambah* 👀', '',
          'Sebulan sekali, tunjuk pada anak: "Tengok, emas kita dah naik 2 gram."', '',
          'Anak belajar sendiri apa itu menyimpan, sabar dan matlamat.', '',
          'Pelajaran kewangan paling berkesan ialah yang mereka *nampak*.'])
      ],
      kewangan: [
        x('D01', 'kewangan', 'Tarikh duit berdua', [
          '*"Tarikh duit" sebulan sekali* 👫', '',
          'Banyak konflik rumah tangga berpunca daripada duit... selalunya sebab tak pernah dibincang.', '',
          'Duduk berdua sebulan sekali: semak belanja, rancang bil & simpanan, tetapkan satu matlamat bersama.', '',
          'Satu pasukan, satu matlamat ❤️']),
        x('D08', 'kewangan', 'Gaji naik, simpanan naik', [
          '*Gaji naik, tapi kenapa rasa sama je?* 📈', '',
          'Gaji naik RM500, belanja naik RM600 😅', '',
          'Amalkan: setiap kali gaji naik, *separuh kenaikan terus ke simpanan*.', '',
          'Gaya hidup tetap boleh naik, tapi simpanan naik lebih laju.']),
        x('D16', 'kewangan', 'Had selamat hutang bulanan', [
          '*Berapa hutang yang "selamat"?* 🧾', '',
          'Panduan kasar: jumlah ansuran bulanan (rumah, kereta, peribadi, kad) *tak lebih sepertiga gaji bersih*.', '',
          'Dah lebih? Jangan tambah hutang baru dulu. Langsaikan yang paling mahal kosnya.', '',
          'Ruang dalam cashflow = ruang untuk menyimpan.']),
        x('D03', 'kewangan', 'SSPN untuk anak', [
          '*SSPN: simpan untuk anak, dapat pelepasan cukai* 📚', '',
          'Selain emas, ramai guna *SSPN* (PTPTN) untuk dana pendidikan anak.', '',
          'Simpanan bersih setahun layak pelepasan cukai (semak had & syarat terkini LHDN).', '',
          'SSPN + emas = dana pendidikan yang lebih seimbang 👍']),
        x('D05', 'kewangan', 'Rumah pertama: kos tersembunyi', [
          '*Beli rumah? Ingat kos tersembunyi* 🔑', '',
          'Selain deposit: yuran guaman, duti setem, penilaian, insurans rumah, ubah suai & perabot.', '',
          'Sediakan bajet tambahan. Dan pastikan ansuran tak terlalu membebankan gaji.']),
        x('D17', 'kewangan', 'Rancang harta seawal 30-an', [
          '*Wasiat & hibah bukan untuk orang tua je* 📜', '',
          'Umur 30-an, tanggungan paling ramai: pasangan, anak kecil, mungkin mak ayah.', '',
          'Harta yang tak dirancang boleh tersekat bertahun-tahun. Keluarga susah nak tuntut.', '',
          'Faham pilihan perancangan harta dari sekarang. Ia satu bentuk kasih sayang.']),
        x('D18', 'kewangan', 'Pencen awal? Kira dari sekarang', [
          '*Pencen awal: mimpi atau rancangan?* 🏖️', '',
          'Pencen awal bukan mustahil. Tapi ia perlukan nombor, bukan harapan.', '',
          'Mula dengan 3 soalan: berapa belanja sebulan, berapa simpanan sekarang, berapa yang boleh disimpan setiap bulan.', '',
          'Bila nombor jelas, jalan pun jelas.']),
        x('D19', 'kewangan', 'Bajet kos anak kecil', [
          '*Kos anak kecil, dah masuk bajet?* 🍼', '',
          'Susu, lampin, pengasuh, tadika, vaksin, pakaian yang cepat tak muat...', '',
          'Asingkan satu "akaun anak" untuk kos bulanan ni.', '',
          'Bila kos jelas, kita tak terpaksa korek simpanan setiap bulan.'])
      ],
      kehidupan: [
        x('D04', 'kehidupan', 'Anak belajar duit daripada kita', [
          '*Anak belajar duit daripada kita* 👀', '',
          'Anak jarang dengar nasihat kita tentang duit. Tapi mereka *perhati* cara kita guna duit.', '',
          'Bawa ke kedai, bandingkan harga. Biar mereka kumpul duit sendiri untuk barang idaman.', '',
          'Celik kewangan bermula di rumah 🏠']),
        x('D20', 'kehidupan', 'Anak ingat masa, bukan hadiah', [
          '*Anak jarang ingat hadiah mahal* 👨‍👩‍👧', '',
          'Tapi mereka ingat siapa yang main dengan mereka, siapa yang dengar cerita mereka.', '',
          'Luangkan *20 minit tanpa telefon* setiap hari.', '',
          'Itu "simpanan" yang nilainya kekal sepanjang hayat ❤️']),
        x('D07', 'kehidupan', 'Penat? Rehat, jangan berhenti', [
          '*Penat? Rehat, jangan berhenti* 🔋', '',
          'Umur 30-an selalunya fasa paling sibuk: kerjaya, anak kecil, komitmen.', '',
          'Burnout bukan tanda kita kuat.', '',
          'Rehat yang cukup buat kita lebih produktif... dan lebih sabar dengan keluarga 🙂']),
        x('D21', 'kehidupan', 'Ajar anak 3 tabung', [
          '*Ajar anak 3 tabung* 🐷', '',
          '1️⃣ Simpan',
          '2️⃣ Belanja',
          '3️⃣ Kongsi / sedekah', '',
          'Setiap kali dapat duit, bahagi tiga. Tabiat kecil masa kecil = kewangan sihat bila dewasa.']),
        x('D10', 'kehidupan', 'Saringan kesihatan tahunan', [
          '*Saringan kesihatan setahun sekali* 🩺', '',
          'Darah tinggi, kencing manis, kolesterol... selalunya tiada simptom awal.', '',
          'Klinik kesihatan kerajaan dan sesetengah majikan sediakan saringan pada kos rendah.', '',
          'Kesan awal, rawat awal. Untuk kita, dan untuk anak-anak yang bergantung pada kita.']),
        x('D22', 'kehidupan', 'Hargai pasangan', [
          '*Ucap terima kasih pada pasangan hari ni* 💐', '',
          'Penat kerja, penat urus rumah, penat jaga anak... dua-dua penat.', '',
          'Satu ucapan terima kasih yang ikhlas boleh ringankan beban yang tak nampak.', '',
          'Rumah tangga kuat dibina dengan benda-benda kecil.']),
        x('D23', 'kehidupan', 'Mak ayah makin berusia', [
          '*Mak ayah makin berusia* 🤍', '',
          'Kita sibuk membina keluarga sendiri... sampai lupa mak ayah pun makin tua.', '',
          'Telefon lebih kerap. Balik jenguk walau sekejap. Bawa cucu jumpa atuk nenek.', '',
          'Masa bersama mereka tak boleh ditangguh selamanya.']),
        x('D24', 'kehidupan', 'Tambah nilai diri dalam kerjaya', [
          '*Gaji naik ikut nilai yang kita bawa* 📊', '',
          'Bukan ikut berapa lama kita kerja.', '',
          'Tambah skil, ambil tanggungjawab lebih, selesaikan masalah orang lain.', '',
          'Bila nilai kita naik, rezeki pun ikut naik.'])
      ]
    },

    /* ---------- PERTENGAHAN (40-49) ---------- */
    pertengahan: {
      emas: [
        x('P02', 'emas', 'Emas sebagai pelengkap aset', [
          '*Jangan letak semua telur dalam satu bakul* 🧺', '',
          'Umur 40-an, ramai dah ada KWSP, rumah, unit amanah, simpanan.', '',
          'Emas boleh jadi pelengkap: tak bergantung pada prestasi mana-mana syarikat, dan mudah dicairkan.', '',
          'Bila satu aset bergoyang, yang lain menstabilkan.']),
        x('P11', 'emas', 'Emas sebagai legasi', [
          '*Apa yang kita nak tinggalkan?* 🏛️', '',
          'Umur 40-an, mula terfikir tentang legasi.', '',
          'Emas sesuai jadi warisan: mudah dibahagi, nilainya tahan lama, dan ada makna.', '',
          'Contoh: hadiah emas bila anak masuk universiti, atau bila mereka berkahwin.']),
        x('P09', 'emas', 'Labelkan emas ikut tujuan', [
          '*Setiap gram ada tugasnya* 🏷️', '',
          '🎓 Emas untuk pendidikan anak',
          '🏖️ Emas untuk persaraan',
          '🧯 Emas untuk kecemasan keluarga', '',
          'Bila setiap gram ada "tugas", kita tak mudah jual sesuka hati 💪']),
        x('P12', 'emas', 'Tarikh tetap kira zakat', [
          '*Simpanan emas dah lebih 85 gram?* 🤲', '',
          'Bila cukup nisab dan haul, ada zakat *2.5%* yang perlu ditunaikan.', '',
          'Tip: pilih *satu tarikh tetap* setiap tahun untuk kira, contohnya awal Ramadan. Senang ingat, senang urus.', '',
          'Harta yang dizakatkan lebih berkat 🌿'], true),
        x('P06', 'emas', 'Emas & faraid', [
          '*Emas & faraid: waris tahu tak?* 🕌', '',
          'Emas dan akaun emas jadi *harta pusaka*, dibahagi ikut faraid, kecuali yang dah dihibahkan semasa hidup.', '',
          'Masalah biasa: waris tak tahu emas tu wujud.', '',
          'Senaraikan emas & akaun emas, dan simpan maklumatnya di tempat yang waris tahu.'], true),
        x('P13', 'emas', 'Kos universiti anak: cair berperingkat', [
          '*Guna emas untuk yuran anak? Cair berperingkat* 🎓', '',
          'Tak perlu jual semua sekali gus.', '',
          'Jual ikut keperluan setiap semester. Baki terus disimpan.', '',
          'Cara ni kurangkan risiko jual semua pada harga yang kurang cantik.']),
        x('P14', 'emas', 'Fizikal atau akaun?', [
          '*Emas fizikal atau akaun emas?* ⚖️', '',
          '*Fizikal*: boleh pegang, tapi kena fikir keselamatan simpanan.', '',
          '*Akaun*: tak perlu jaga di rumah, mudah tambah sedikit demi sedikit.', '',
          'Ramai guna kedua-duanya, ikut tujuan. Yang penting, rekod tersusun.']),
        x('P15', 'emas', 'Komitmen banyak, tetap konsisten', [
          '*Komitmen banyak, tapi jangan berhenti* 🔁', '',
          'Umur 40-an: yuran anak, ansuran, mak ayah... memang banyak.', '',
          'Kalau tak mampu simpan banyak, *kurangkan jumlah, jangan berhenti*.', '',
          'Tabiat yang terputus susah nak disambung semula.'])
      ],
      kewangan: [
        x('P01', 'kewangan', 'Semak simpanan persaraan', [
          '*Umur 40-an: semak simpanan persaraan* 🧮', '',
          'Mulai 2026, KWSP guna 3 tanda aras simpanan pada umur 55:',
          '• Asas: RM390,000',
          '• Mencukupi: RM650,000',
          '• Dipertingkatkan: RM1.3 juta', '',
          'Semak baki dalam app KWSP i-Akaun. Belum capai? Yang penting tahu kedudukan, dan mula tambah sekarang.']),
        x('P03', 'kewangan', 'Generasi sandwich', [
          '*Rasa tersepit? Generasi sandwich* 🥪', '',
          'Tanggung anak, bantu mak ayah... dan diri sendiri?', '',
          'Bincang dengan adik-beradik, tetapkan bajet bantuan yang jelas, dan *jangan korbankan simpanan persaraan sendiri*.', '',
          'Supaya anak kita nanti tak tersepit pula 🤝']),
        x('P16', 'kewangan', 'Jangan jadi penjamin', [
          '*"Tolong jadi penjamin, sekejap je"* ✋', '',
          'Ayat ni dah ramai yang menyesal.', '',
          'Bila peminjam gagal bayar, *penjamin yang dikejar*. Rekod kredit kita pun terjejas.', '',
          'Nak bantu? Bantu ikut kemampuan sendiri, jumlah yang kita sanggup lepaskan.']),
        x('P08', 'kewangan', 'Bebas hutang sebelum bersara', [
          '*Sasaran: bebas hutang sebelum bersara* 🎯', '',
          'Pendapatan berkurang bila bersara, tapi ansuran masih berjalan... berat.', '',
          '✅ Langsaikan kad kredit & pinjaman peribadi dulu',
          '✅ Bayar lebih sikit pinjaman rumah (semak caj penyelesaian awal)',
          '✅ Elak hutang baru yang panjang']),
        x('P05', 'kewangan', 'Kemas kini penama', [
          '*Penama akaun, dah kemas kini?* 📝', '',
          'KWSP, takaful, akaun simpanan... ramai lupa kemas kini *penama* selepas kahwin atau dapat anak.', '',
          'Tanpa penama, waris boleh ambil masa lama untuk menuntut.', '',
          'Luangkan sejam minggu ni. Hadiah besar untuk keluarga 🎁']),
        x('P17', 'kewangan', 'Kos universiti anak: bincang awal', [
          '*Anak dah dekat umur universiti?* 🎒', '',
          'Jangan tunggu surat tawaran baru kira kos.', '',
          'Senaraikan: yuran, kediaman, laptop, pengangkutan, belanja bulanan.', '',
          'Bincang awal dengan anak tentang biasiswa, pinjaman dan simpanan keluarga.']),
        x('P18', 'kewangan', 'Bina pendapatan pasif', [
          '*Gaji berhenti bila kita berhenti kerja* 💡', '',
          'Umur 40-an masa terbaik bina sumber pendapatan yang tak bergantung pada tenaga kita setiap hari.', '',
          'Sewa, dividen, bisnes yang ada sistem... mula kecil, ikut ilmu dan kemampuan.', '',
          'Pencen yang selesa dibina dari sekarang.']),
        x('P19', 'kewangan', 'Semak perlindungan perubatan', [
          '*Perlindungan perubatan: semak sebelum terlambat* 🏥', '',
          'Makin berusia, makin mahal caruman. Ada penyakit, makin susah nak dapat perlindungan baru.', '',
          'Semak sekarang: had tahunan cukup? Boleh diperbaharui sampai umur berapa?', '',
          'Masa sihat ialah masa terbaik untuk semak.'])
      ],
      kehidupan: [
        x('P04', 'kehidupan', 'Kesihatan selepas 40', [
          '*Selepas 40, badan mula bagi "signal"* 🩺', '',
          'Pekerja berumur 40–59 yang mencarum PERKESO mungkin layak saringan kesihatan *percuma*. Semak dalam app SEHATi PERKESO.', '',
          'Periksa tekanan darah, gula & kolesterol.', '',
          'Badan sihat = boleh terus bekerja, menyimpan & menikmati hasil usaha 💪']),
        x('P07', 'kehidupan', 'Separuh perjalanan: refleksi', [
          '*Separuh perjalanan: masa refleksi* 🧭', '',
          'Tanya diri:',
          '• Apa yang benar-benar penting?',
          '• Legasi apa yang kita nak tinggalkan?',
          '• Apa perlu dikurangkan, apa perlu ditambah?', '',
          'Pastikan kerjaya & duit menyokong apa yang kita *hargai*.']),
        x('P10', 'kehidupan', 'Ajar anak remaja tentang duit', [
          '*Ajar anak remaja tentang duit* 🧑‍🎓', '',
          'Remaja dah boleh faham benda "besar": cara hutang berfungsi, kesan menyimpan awal, beza keperluan & kehendak.', '',
          'Kongsi juga kesilapan kewangan kita dulu.', '',
          'Anak lebih ingat cerita daripada ceramah 😊']),
        x('P20', 'kehidupan', 'Jadi mentor', [
          '*Pengalaman kita = ilmu mahal untuk orang muda* 🌳', '',
          'Kita dah lalui jatuh bangun kerjaya, kewangan, keluarga.', '',
          'Kongsilah. Bimbing adik-adik, anak saudara, staf muda.', '',
          'Satu nasihat kita mungkin selamatkan mereka daripada kesilapan bertahun-tahun.']),
        x('P21', 'kehidupan', 'Belajar benda baru', [
          '*"Dah 40 lebih, nak belajar apa lagi?"* 🔄', '',
          'Banyak lagi! Dunia berubah laju: teknologi, cara kerja, cara berniaga.', '',
          'Orang yang terus belajar kekal relevan, dan pendapatannya terus berkembang.', '',
          'Pilih satu benda baru tahun ni. Umur bukan penghalang.']),
        x('P22', 'kehidupan', 'Lebih dengar, kurang leter', [
          '*Anak remaja makin kurang bercakap?* 🗣️', '',
          'Cuba lebih banyak *dengar*, kurang nasihat.', '',
          'Remaja buka hati bila rasa difahami, bukan dihakimi.', '',
          'Masa dalam kereta dan waktu makan ialah peluang terbaik untuk berbual.']),
        x('P23', 'kehidupan', 'Jaga hubungan suami isteri', [
          '*Jangan tunggu anak besar baru ada masa berdua* 💞', '',
          'Sibuk dengan anak dan kerja, pasangan selalu jadi "nombor terakhir".', '',
          'Sekali sebulan, keluar berdua. Minum petang pun jadilah.', '',
          'Bila anak-anak dah keluar rumah nanti, yang tinggal ialah kita berdua.']),
        x('P24', 'kehidupan', 'Jaga kawan baik', [
          '*Kawan baik makin susah dicari* ☕', '',
          'Umur makin meningkat, bulatan kawan makin kecil.', '',
          'Jaga yang ada. Hubungi kawan lama, tanya khabar, ajak minum.', '',
          'Kawan sekufu yang jujur ialah harta yang tak dijual di mana-mana.'])
      ]
    },

    /* ---------- PRA-BERSARA (50-59) ---------- */
    matang: {
      emas: [
        x('B11', 'emas', 'Emas sebagai simpanan cair', [
          '*Dekat pencen, perlukan aset yang mudah dicairkan* 💧', '',
          'Emas boleh jadi "simpanan cair". Bila perlu, jual sebahagian atau guna Ar-Rahnu tanpa menjual.', '',
          'Ambil ikut keperluan. Baki terus disimpan.', '',
          'Fleksibel macam ni sangat membantu bila pendapatan bulanan dah tak macam dulu.']),
        x('B02', 'emas', 'Emas untuk ke Tanah Suci', [
          '*Emas untuk ke Tanah Suci* 🕋', '',
          'Ramai simpan emas khusus untuk *haji & umrah*. Niatnya jelas, jadi tak mudah diguna untuk perkara lain.', '',
          'Bila tiba masanya, emas dicairkan untuk kos perjalanan.', '',
          'Semoga dipermudahkan sampai ke Tanah Suci 🤲'], true),
        x('B12', 'emas', 'Rahsiakan simpanan', [
          '*Simpanan emas tak perlu dihebahkan* 🤫', '',
          'Penjahat suka sasarkan mereka yang hampir atau baru pencen, sebab tahu ada simpanan.', '',
          'Jangan cerita jumlah simpanan di kenduri atau media sosial.', '',
          'Hanya orang yang betul-betul dipercayai perlu tahu. Diam-diam, selamat.']),
        x('B13', 'emas', 'Duit KWSP & "skim emas"', [
          '*Umur 55, KWSP masuk... tiba-tiba ramai "kawan" datang* ⚠️', '',
          '❌ "Letak duit KWSP dalam skim emas, dapat pulangan bulanan"',
          '❌ "Pelaburan khas pesara, untung terjamin"', '',
          'Duit persaraan dikumpul 30 tahun. Jangan hilang dalam 30 hari.', '',
          'Nak simpan dalam emas? Buat berperingkat, dengan pihak yang sah dan telus.']),
        x('B06', 'emas', 'Wariskan emas, bukan masalah', [
          '*Wariskan emas, bukan masalah* 🗝️', '',
          'Emas mudah diwariskan... tapi hanya jika waris *tahu* dan dokumen *lengkap*.', '',
          '✅ Waris tahu lokasi emas fizikal',
          '✅ Maklumat akaun emas disimpan dengan selamat',
          '✅ Pertimbang hibah atau wasiat ikut keperluan']),
        x('B09', 'emas', 'Jangan jual emas kerana panik', [
          '*Jangan jual emas kerana panik* 😌', '',
          'Harga emas kadang turun mendadak dalam masa singkat.', '',
          'Kesilapan biasa: panik, jual, kemudian menyesal bila harga naik semula.', '',
          'Jual emas bila ada *keperluan sebenar* atau matlamat dah tercapai. Bukan kerana emosi.']),
        x('B14', 'emas', 'Hibah: agihan ikut hasrat', [
          '*Nak agih emas ikut hasrat sendiri?* 🎁', '',
          'Selain faraid, ada pilihan *hibah*, iaitu pemberian semasa hidup dengan akad yang jelas.', '',
          'Ramai pilih hibah emas kepada anak atau pasangan untuk elak salah faham kemudian hari.', '',
          'Dapatkan nasihat pihak bertauliah supaya dokumentasinya teratur.'], true),
        x('B15', 'emas', 'Akaun emas: tenang bila bercuti', [
          '*Nak pergi jauh lama-lama? Fikir keselamatan emas* ✈️', '',
          'Rumah kosong lama, emas fizikal di rumah jadi risiko.', '',
          'Sebab tu ramai pesara simpan sebahagian dalam *akaun emas* atau peti simpanan keselamatan.', '',
          'Bercuti atau ke Tanah Suci pun hati lebih tenang.'])
      ],
      kewangan: [
        x('B01', 'kewangan', 'Umur 55: jangan habiskan KWSP', [
          '*Umur 55: jangan habiskan KWSP sekali gus* 💼', '',
          'Simpanan persaraan perlu bertahan 20 tahun atau lebih.', '',
          'KWSP ada pilihan bayaran bulanan *i-Emas*: duit masuk ke akaun bank setiap bulan, baki terus terima dividen.', '',
          'Rancang "gaji" persaraan dulu, baru tentukan berapa nak keluarkan.']),
        x('B03', 'kewangan', 'Kos hidup selepas bersara', [
          '*Kalau bersara esok, berapa belanja sebulan?* 🧾', '',
          'Senaraikan: makan, bil, kesihatan, kenderaan, bantu anak cucu, ibadah & riadah.', '',
          'Kemudian semak sumber pendapatan nanti.', '',
          'Jurang antara dua angka ni ialah perkara yang perlu dirancang dari sekarang.']),
        x('B05', 'kewangan', 'Scam suka sasarkan pesara', [
          '*Scam suka sasarkan pesara* 🚨', '',
          '❌ Panggilan kononnya polis, bank atau mahkamah minta pindah duit',
          '❌ Pelaburan "jaminan untung" dalam masa singkat',
          '❌ Diminta muat turun app atau kongsi OTP/TAC', '',
          'Terkena? Segera hubungi *997* (Pusat Respons Scam Kebangsaan). Lagi cepat lapor, lagi tinggi peluang duit diselamatkan.']),
        x('B16', 'kewangan', 'Anak minta modal bisnes', [
          '*"Mak, ayah... boleh pinjam modal?"* 👨‍👩‍👦', '',
          'Memang nak tolong. Tapi duit persaraan susah nak dikumpul semula.', '',
          'Tetapkan *had* yang kita sanggup lepaskan. Tulis perjanjian ringkas. Jangan usik dana kecemasan & kesihatan.', '',
          'Bantu anak tanpa korbankan masa depan sendiri.']),
        x('B08', 'kewangan', 'Kos kesihatan selepas bersara', [
          '*Kos terbesar masa pencen selalunya kesihatan* 🏥', '',
          'Bila bersara, perlindungan daripada majikan biasanya tamat.', '',
          'Semak: ada perlindungan perubatan sendiri? Boleh diperbaharui sampai umur berapa?', '',
          'Asingkan juga *dana kesihatan khas*. Emas boleh jadi sebahagian daripadanya.']),
        x('B17', 'kewangan', 'Sifarkan hutang 5 tahun sebelum pencen', [
          '*Sasaran: sifar hutang sebelum pencen* ✂️', '',
          'Senaraikan semua hutang. Langsaikan yang paling tinggi kos dulu.', '',
          'Setiap ansuran yang habis = "gaji" yang bertambah bila pencen nanti.', '',
          'Masuk alam pencen dengan beban ringan, hati pun lapang.']),
        x('B18', 'kewangan', 'Latih hidup dengan bajet pencen', [
          '*Cuba hidup dengan bajet pencen dari sekarang* 🧪', '',
          'Kalau selesa, bagus. Kalau sempit, masih ada masa untuk ubah.', '',
          'Beza "gaji" sekarang dengan bajet pencen? Terus masuk simpanan.', '',
          'Dua kebaikan sekali gus: simpanan bertambah, dan kita dah biasa.']),
        x('B19', 'kewangan', 'Jangan renovate habis duit pencen', [
          '*Renovate besar guna duit pencen?* 🏚️', '',
          'Ramai pesara habiskan simpanan untuk ubah suai rumah... kemudian sesak bertahun-tahun.', '',
          'Baiki yang perlu: bumbung bocor, tandas selamat untuk warga emas.', '',
          'Yang cantik-cantik, boleh tunggu. Duit pencen untuk hidup, bukan untuk dekorasi.'])
      ],
      kehidupan: [
        x('B04', 'kehidupan', 'Bersara bukan berhenti hidup', [
          '*Bersara bukan berhenti hidup* 🌅', '',
          'Ramai teruja nak bersara... tapi lepas beberapa bulan rasa kosong. Tiada rutin, tiada tujuan.', '',
          'Rancang dari sekarang: hobi, mengajar, berniaga kecil, aktif dalam komuniti.', '',
          'Minda aktif = persaraan yang lebih bermakna 😊']),
        x('B20', 'kehidupan', 'Badan aktif, hidup berdikari', [
          '*Badan aktif = hidup berdikari* 🚶', '',
          'Selepas 50, otot dan tulang cepat lemah kalau tak digunakan.', '',
          'Jalan pagi, regangan ringan, berkebun, naik tangga. Konsisten lebih penting dari berat.', '',
          'Kita simpan emas supaya tak bergantung pada orang. Jaga badan pun sama.']),
        x('B07', 'kehidupan', 'Dari pengurus kepada penasihat', [
          '*Dari "pengurus" kepada "penasihat"* 👨‍👩‍👧‍👦', '',
          'Bila anak dah dewasa dan berkeluarga, peranan kita berubah.', '',
          'Beri nasihat bila diminta. Beri sokongan bila perlu. Hormati keputusan mereka.', '',
          'Keluarga yang rapat ialah harta paling bernilai di usia emas ❤️']),
        x('B21', 'kehidupan', 'Fasa kedua perkahwinan', [
          '*Anak dah besar, rumah makin sunyi* 💞', '',
          'Ini masa untuk kenal semula pasangan. Jalan berdua, makan berdua, rancang impian bersama.', '',
          'Bincang juga pelan pencen: nak tinggal di mana, nak buat apa, berapa bajet.', '',
          'Fasa kedua boleh jadi fasa paling manis 😊']),
        x('B22', 'kehidupan', 'Anak tahu urusan kewangan keluarga?', [
          '*Anak tahu tak urusan kewangan keluarga?* 🗂️', '',
          'Bukan nak serah semua. Tapi pastikan seorang anak yang dipercayai tahu:',
          '• Dokumen penting di mana',
          '• Akaun & simpanan apa yang ada',
          '• Siapa nak dihubungi bila perlu', '',
          'Bila tiba masanya, mereka tak teraba-raba.']),
        x('B23', 'kehidupan', 'Saringan kesihatan 50-an', [
          '*Saringan kesihatan jangan ditangguh* 🩺', '',
          'Pencarum PERKESO berumur 40–59 mungkin layak saringan *percuma*. Semak dalam app SEHATi PERKESO.', '',
          'Kesan awal, rawatan lebih mudah... dan simpanan persaraan tak habis di hospital.']),
        x('B10', 'kehidupan', 'Bekal yang kekal', [
          '*Bekal yang kekal* 🤲', '',
          'Bila mati anak Adam, terputus amalannya kecuali tiga: sedekah jariah, ilmu yang bermanfaat, anak soleh yang mendoakan. (HR Muslim)', '',
          'Usia 50-an masa terbaik tambah bekal: ilmu, sedekah, wakaf.'], true),
        x('B24', 'kehidupan', 'Kongsi ilmu kepada generasi muda', [
          '*Ilmu kita jangan dibawa pergi* 📖', '',
          'Pengalaman 30 tahun bekerja ialah "universiti" untuk orang muda.', '',
          'Ajar anak, anak saudara, jiran. Cara berjimat, cara bekerja, cara bangkit bila jatuh.', '',
          'Ilmu yang dikongsi tak pernah susut.'])
      ]
    },

    /* ---------- WARGA EMAS (60+) ---------- */
    warga: {
      emas: [
        x('W11', 'emas', 'Anak tahu di mana emas disimpan?', [
          '*Anak tahu tak di mana emas disimpan?* 🗂️', '',
          'Ramai simpan emas dengan baik... sampaikan tiada siapa tahu.', '',
          'Tulis senarai emas & akaun, simpan resit dalam satu fail, dan beritahu seorang anak yang dipercayai.', '',
          'Supaya simpanan bertahun sampai kepada orang yang kita sayang ❤️']),
        x('W09', 'emas', 'Hadiah emas untuk cucu', [
          '*Hadiah bermakna untuk cucu* 👶', '',
          'Mainan rosak, baju tak muat. Tapi emas... kekal.', '',
          'Sekeping emas kecil sempena hari jadi atau kejayaan cucu boleh disimpan bertahun-tahun.', '',
          'Kenangan daripada atuk dan nenek, sambil ajar mereka menyimpan 💛']),
        x('W12', 'emas', 'Jual emas di tempat sah', [
          '*Nak jual emas? Pastikan di tempat yang sah* 🏪', '',
          '❌ "Pembeli" yang datang ke rumah',
          '❌ Tawaran harga luar biasa melalui telefon',
          '❌ Pihak yang tak beri resit', '',
          'Bawa anak bila nak buat urus niaga besar. Minta resit, semak kiraan.']),
        x('W13', 'emas', '"Tukar emas lama, percuma upah!"', [
          '*"Emas lama boleh tukar baru, percuma upah!"* 🚫', '',
          'Hati-hati dengan tawaran begini, terutama yang datang ketuk pintu atau melalui telefon.', '',
          'Jangan serahkan emas kepada sesiapa di luar kedai atau syarikat yang sah.', '',
          'Bila ragu, telefon anak dulu.']),
        x('W02', 'emas', 'Hibah emas', [
          '*Hibah emas: agih kasih semasa hidup* 🎁', '',
          'Hibah ialah pemberian semasa hidup, dengan akad yang jelas.', '',
          'Ramai pilih hibah emas kepada anak atau cucu supaya agihan ikut hasrat sendiri dan elak salah faham.', '',
          'Dapatkan nasihat pihak bertauliah supaya dokumentasinya teratur.'], true),
        x('W14', 'emas', 'Satu fail untuk dokumen emas', [
          '*Resit & sijil emas: satu fail sahaja* 📁', '',
          'Satu fail khas. Tulis ringkasan: jenis, berat, tarikh beli.', '',
          'Minta anak ambil gambar semua dokumen dan simpan dalam telefon mereka juga.', '',
          'Kemas hari ni, mudah di kemudian hari.']),
        x('W06', 'emas', 'Senarai harta untuk waris', [
          '*Satu dokumen yang sangat membantu waris* 📋', '',
          '🪙 Emas (lokasi & anggaran berat)',
          '💳 Akaun emas, bank, KWSP, takaful',
          '🏠 Rumah, tanah & kenderaan',
          '📞 Orang yang boleh dihubungi, contohnya dealer emas', '',
          'Simpan di tempat selamat, beritahu orang yang dipercayai.']),
        x('W15', 'emas', 'Jangan pinjamkan emas', [
          '*"Pinjam emas sekejap, nak cagar"* 🙅', '',
          'Niat nak tolong. Tapi bila emas dah dicagar atas nama orang lain, susah nak dapat balik.', '',
          'Kalau nak bantu, bantu dengan jumlah yang kita sanggup lepaskan.', '',
          'Emas simpanan kita ialah tongkat kita.'])
      ],
      kewangan: [
        x('W01', 'kewangan', 'Jangan kongsi OTP/TAC', [
          '*Jangan kongsi OTP/TAC dengan sesiapa* 🔐', '',
          'Bank, polis, KWSP atau mana-mana agensi *tidak akan* minta OTP, kata laluan, atau suruh pindah duit ke "akaun selamat".', '',
          'Terima panggilan begini? Letak telefon. Tanya anak cucu dulu.', '',
          'Terkena scam? Segera hubungi *997*.']),
        x('W16', 'kewangan', 'Panggilan "polis" atau "mahkamah"', [
          '*"Ini pegawai polis. Akaun anda terlibat kes..."* 📞', '',
          'Ingat baik-baik: polis, mahkamah dan bank *tak akan* minta pindah duit melalui telefon.', '',
          'Letak telefon. Hubungi anak, atau pergi sendiri ke balai polis.', '',
          'Simpan nasihat ni, dan kongsikan dengan kawan-kawan sebaya 🙏']),
        x('W03', 'kewangan', 'Gaji bulanan selepas bersara', [
          '*"Gaji" bulanan selepas bersara* 💵', '',
          'Pastikan ada duit masuk setiap bulan: pencen, dividen, sewa, atau bayaran bulanan KWSP (i-Emas).', '',
          'Asingkan akaun belanja bulanan, akaun kecemasan & kesihatan, dan bahagian untuk bantu anak cucu (dengan had).', '',
          'Bila berstruktur, duit lebih tahan lama ⏳']),
        x('W17', 'kewangan', 'Kenalan online & hadiah luar negara', [
          '*"Saya kirim hadiah dari luar negara, tapi kena bayar cukai dulu..."* 💌', '',
          'Ini antara penipuan paling biasa. Mula dengan kenalan mesra di media sosial, akhirnya minta duit.', '',
          'Peraturan mudah: *kenalan online yang minta duit = penipu*. Tak kira betapa baik bahasanya.']),
        x('W05', 'kewangan', 'Bantu anak, jaga diri', [
          '*Bantu anak, tapi jaga diri juga* 🤲', '',
          '❌ Jadi penjamin pinjaman besar',
          '❌ Keluarkan semua simpanan untuk hutang anak',
          '❌ Beri "pinjam" tanpa had', '',
          'Simpanan persaraan ialah tongkat kita. Kalau tongkat patah, kita yang susah... dan anak pun turut terbeban.']),
        x('W18', 'kewangan', 'Semak Mule sebelum pindah duit', [
          '*Sebelum pindah duit, semak dulu* 🔎', '',
          'PDRM ada portal *Semak Mule* untuk semak sama ada nombor akaun atau telefon pernah dilaporkan terlibat penipuan.', '',
          'Ambil masa 1 minit. Boleh selamatkan simpanan bertahun.', '',
          'Tak pasti cara guna? Minta anak cucu tolong.']),
        x('W08', 'kewangan', 'Peluang daripada kenalan', [
          '*Hati-hati "peluang" daripada kenalan* ⚠️', '',
          'Ramai pesara hilang simpanan bukan kerana orang asing... tapi kerana "peluang" daripada saudara atau kawan lama.', '',
          'Faham dari mana datangnya untung. Jangan melabur kerana segan.', '',
          'Terlalu indah untuk jadi kenyataan? Biasanya memang bukan kenyataan.']),
        x('W19', 'kewangan', 'Kemas kini dokumen penting', [
          '*Bila kali terakhir semak dokumen penting?* ✍️', '',
          'Wasiat, hibah, penama KWSP & takaful: masih tepat?', '',
          'Ada perubahan dalam keluarga? Cucu baru, ahli keluarga meninggal dunia?', '',
          'Kemas kini hari ni, elak kekeliruan esok.'])
      ],
      kehidupan: [
        x('W04', 'kehidupan', 'Kekal aktif, kekal sihat', [
          '*Ubat paling murah: jalan pagi* 🌤️', '',
          '15 hingga 30 minit, ikut kemampuan. Hirup udara segar, tegur jiran.', '',
          'Badan bergerak, hati gembira, tidur pun lebih lena.', '',
          'Jangan lupa bawa air dan pakai kasut yang selesa 👟']),
        x('W10', 'kehidupan', 'Pengalaman ialah warisan', [
          '*Kisah hidup kita ialah harta untuk cucu* 📖', '',
          'Macam mana dulu susah senang, macam mana menyimpan, macam mana bangkit bila jatuh...', '',
          'Ceritakan pada anak cucu. Atau minta mereka rakam dalam video.', '',
          'Pengalaman ni tak boleh dibeli di mana-mana 😊']),
        x('W07', 'kehidupan', 'Silaturahim', [
          '*Silaturahim, murah rezeki* 🤝', '',
          'Sesiapa yang ingin dilapangkan rezeki dan dipanjangkan umur, hendaklah menyambung silaturahim. (HR Bukhari & Muslim)', '',
          'Telefon adik-beradik. Ziarah sahabat lama. Hadir majlis keluarga.'], true),
        x('W20', 'kehidupan', 'Minda cergas', [
          '*Otak pun perlu "senaman"* 🧩', '',
          'Baca surat khabar, isi teka silang kata, belajar benda baru, berbual dengan kawan.', '',
          'Minda yang selalu digunakan kekal cergas lebih lama.', '',
          'Hari ni, cuba satu benda baru. Kecil pun jadi.']),
        x('W21', 'kehidupan', 'Syukur setiap pagi', [
          '*Setiap pagi yang kita bangun ialah nikmat* 🌸', '',
          'Masih boleh bernafas, berjalan, berbual dengan keluarga.', '',
          'Luangkan sedikit masa setiap hari untuk bersyukur.', '',
          'Hati yang bersyukur ialah hati yang paling kaya ❤️']),
        x('W22', 'kehidupan', 'Ubat & air ikut jadual', [
          '*Ubat ikut jadual, air secukupnya* 💊', '',
          'Guna kotak ubat ikut hari. Set penggera di telefon kalau perlu.', '',
          'Minum air sedikit demi sedikit sepanjang hari, walaupun tak rasa dahaga.', '',
          'Benda kecil, tapi besar kesannya pada kesihatan.']),
        x('W23', 'kehidupan', 'Ceria bersama cucu', [
          '*Cucu ialah "vitamin" warga emas* 👵👴', '',
          'Main, bercerita, masak bersama, ajar mengaji atau menjahit.', '',
          'Kita dapat gembira. Mereka dapat ilmu dan kasih sayang.', '',
          'Kenangan dengan atuk nenek dibawa sampai mereka tua.']),
        x('W24', 'kehidupan', 'Doa untuk anak cucu', [
          '*Doa ibu bapa, antara doa yang mustajab* 🤲', '',
          'Harta mungkin habis. Tapi doa kita untuk anak cucu terus mengiringi mereka.', '',
          'Selitkan nama mereka satu per satu dalam doa setiap hari.', '',
          'Itulah hadiah paling berharga daripada kita.'], true)
      ]
    }
  };

  var GROUPS = ['muda', 'dewasa', 'pertengahan', 'matang', 'warga'];

  function finish(m, ages) {
    return {
      id: m.id,
      cat: m.cat,
      title: m.title,
      body: Array.isArray(m.body) ? m.body.join('\n') : m.body,
      ages: ages || [],
      islamic: !!m.islamic,
      opener: m.opener !== false,
      on: true,
      builtin: true
    };
  }

  // Selang-seli tiga senarai ikut kategori: a1, b1, c1, a2, b2, c2...
  function weave(lists) {
    var out = [], n = Math.max.apply(null, lists.map(function (l) { return l.length; }));
    for (var i = 0; i < n; i++) lists.forEach(function (l) { if (l[i]) out.push(l[i]); });
    return out;
  }

  // Susunan: mesej umum (emas, kewangan, kehidupan bergilir), dan setiap
  // mesej ke-3 ialah mesej khas ikut umur. Setiap penyimpan hanya terima
  // mesej umum + mesej kumpulan umurnya, mengikut susunan ini.
  function buildOrder() {
    var general = weave([E, K, H]).map(function (m) { return finish(m); });
    var byAge = {};
    GROUPS.forEach(function (g) {
      // emas, kehidupan, kewangan — supaya kategori tak berulang bersebelahan
      byAge[g] = weave([AGE[g].emas, AGE[g].kehidupan, AGE[g].kewangan]).map(function (m) { return finish(m, [g]); });
    });
    var nAge = Math.max.apply(null, GROUPS.map(function (g) { return byAge[g].length; }));
    var out = [finish(WELCOME)];
    var gi = 0, ai = 0;
    for (var k = 0; gi < general.length || ai < nAge; k++) {
      if ((k % 3 === 2 || gi >= general.length) && ai < nAge) {
        GROUPS.forEach(function (g) { if (byAge[g][ai]) out.push(byAge[g][ai]); });
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
      'Terima kasih kerana menjadi sebahagian daripada keluarga penyimpan emas saya 🤍'] },
    { id: 'BD2', islamic: true, ages: ['muda'], body: [
      'Happy birthday {panggilan}! 🎂🎉', '',
      'Semoga tahun ni penuh rezeki, makin berjaya dalam kerjaya & pelajaran, dan semua impian dipermudahkan Allah.', '',
      'Teruskan menyimpan. Diri kita 10 tahun lagi pasti berterima kasih 😉'] },
    { id: 'BD3', islamic: true, ages: ['dewasa', 'pertengahan'], body: [
      '{salam} {panggilan} 🎂', '',
      'Selamat hari lahir! Semoga Allah kurniakan kesihatan yang baik, keluarga yang bahagia, dan rezeki yang berkat buat {panggilan} sekeluarga.', '',
      'Semoga semua perancangan tahun ni berjalan lancar 🤲'] },
    { id: 'BD4', islamic: true, ages: ['matang', 'warga'], body: [
      '{salam} {panggilan} 🌷', '',
      'Selamat hari lahir. Semoga dipanjangkan umur dalam keberkatan, dikurniakan kesihatan yang baik, dan sentiasa dikelilingi anak cucu yang menyayangi.', '',
      'Terima kasih atas kepercayaan selama ini 🤍'] },
    { id: 'BD5', islamic: false, ages: [], body: [
      '{salam} {panggilan}! 🎉', '',
      '*Selamat Hari Lahir, Happy Birthday!* 🎂',
      'Semoga sentiasa sihat, bahagia dan dimurahkan rezeki sepanjang tahun ni.', '',
      'Terima kasih kerana bersama dalam keluarga penyimpan emas saya 😊'] },
    { id: 'BD6', islamic: false, ages: ['matang', 'warga'], body: [
      '{salam} {panggilan} 🌷', '',
      'Selamat Hari Lahir! Semoga sentiasa sihat, gembira bersama keluarga, dan dikurniakan kebahagiaan pada usia ini.', '',
      'Terima kasih atas kepercayaan & sokongan selama ini 🤍'] },
    { id: 'BD7', islamic: true, ages: [], body: [
      '{salam} {panggilan} 🎂', '',
      'Selamat ulang tahun kelahiran! Semoga setiap hari dipenuhi keberkatan, setiap usaha dipermudahkan, dan setiap doa dimakbulkan. Aamiin 🤲'] },
    { id: 'BD8', islamic: false, ages: ['muda', 'dewasa'], body: [
      'Hai {panggilan}! 🎉🎂', '',
      'Selamat hari lahir! Semoga tahun baru dalam hidup ni penuh peluang, kejayaan & kegembiraan.', '',
      'Enjoy your day! 😄'] },
    { id: 'BD9', islamic: false, ages: ['muda'], body: [
      'Happy birthday {panggilan}! 🥳', '',
      'Umur baru, semangat baru. Semoga tahun ni kerjaya makin naik dan simpanan makin tebal 💪', '',
      'Enjoy puas-puas hari ni. Hadiah terbaik untuk diri sendiri? Masa depan yang kukuh 😉'] },
    { id: 'BD10', islamic: false, ages: ['dewasa', 'pertengahan'], body: [
      '{salam} {panggilan} 🎂', '',
      'Selamat hari lahir! Semoga sihat selalu, keluarga bahagia, dan setiap usaha untuk keluarga dipermudahkan.', '',
      'Hari ni, rehat sekejap dan raikan diri sendiri. {panggilan} layak 😊'] },
    { id: 'BD11', islamic: true, ages: ['pertengahan', 'matang'], body: [
      '{salam} {panggilan} 🤲', '',
      'Selamat hari lahir! Semoga dipanjangkan umur dalam ketaatan, disihatkan tubuh badan, dan diberkati rezeki serta keluarga.', '',
      'Terima kasih kerana terus bersama saya dalam perjalanan menyimpan emas 😊'] },
    { id: 'BD12', islamic: true, ages: ['warga'], body: [
      '{salam} {panggilan} 🌸', '',
      'Selamat hari lahir. Semoga Allah panjangkan umur dalam kesihatan dan keimanan, diberi ketenangan hati, dan diberkati seluruh keluarga.', '',
      'Doa saya untuk {panggilan} sekeluarga 🌿'] }
  ].map(function (b) {
    return { id: b.id, body: b.body.join('\n'), ages: b.ages, islamic: !!b.islamic, on: true, builtin: true };
  });

  // Ayat pembuka lalai (untuk semua umur)
  var OPENERS = [
    '{salam} {panggilan} 😊',
    '{salam} {panggilan}, selamat {waktu}!',
    '{salam} {panggilan}, apa khabar? Semoga sihat selalu 🌿',
    '{salam} {panggilan} 👋',
    '{salam} {panggilan}. Tips ringkas hari {hari} ni 👇'
  ];

  // Ayat pembuka ikut kumpulan umur — nada berbeza untuk setiap peringkat hidup
  var OPENERS_BY_AGE = {
    muda: [
      'Hai {panggilan}! 👋',
      '{salam} {panggilan}, selamat {waktu}! ☀️',
      '{salam} {panggilan}! Ada 1 minit? Ilmu ringkas untuk kita yang muda 👇',
      '{salam} {panggilan} 😊 Semoga hari ni produktif!'
    ],
    dewasa: [
      '{salam} {panggilan}, semoga sihat sekeluarga 🌿',
      '{salam} {panggilan} 😊',
      '{salam} {panggilan}, selamat {waktu}! Tips ringkas hari {hari} ni 👇',
      '{salam} {panggilan}. Sibuk macam mana pun, 1 minit untuk ni ya 😉'
    ],
    pertengahan: [
      '{salam} {panggilan}, semoga dipermudahkan urusan hari ni 🌿',
      '{salam} {panggilan} 😊',
      '{salam} {panggilan}, selamat {waktu}. Perkongsian ringkas untuk kita 👇'
    ],
    matang: [
      '{salam} {panggilan}, semoga sentiasa sihat 🌿',
      '{salam} {panggilan}, selamat {waktu} 😊',
      '{salam} {panggilan}. Ada perkongsian ringkas hari {hari} ni 👇'
    ],
    warga: [
      '{salam} {panggilan}, semoga sihat dan ceria selalu 🌷',
      '{salam} {panggilan}, apa khabar hari ni? 😊',
      '{salam} {panggilan}. Ada sedikit perkongsian, semoga bermanfaat 👇'
    ]
  };

  // Cap jari kandungan versi 1 — untuk kenal pasti mesej lalai yang belum
  // diubah oleh pengguna semasa naik taraf (yang diubah dikekalkan).
  var V1 = {"m":{"S00":3247842959,"E01":1125120570,"K01":2003055928,"M01":3943291689,"D01":3359548571,"P01":152495305,"B01":2722417947,"W01":854201218,"H03":1608761186,"E04":2307102540,"M02":3879950022,"D02":394975810,"P02":4030402612,"B02":2738656753,"W02":3922615109,"K02":1100056704,"H01":572028354,"M03":3327484756,"D03":1294345359,"P03":108871219,"B03":1414094393,"W03":869934768,"E02":903744753,"K09":965511780,"M04":4034100926,"D04":993813223,"P04":1123031181,"B04":1847590004,"W04":3136829219,"H02":1174694985,"E08":3531709224,"M05":3335732621,"D05":2784754474,"P05":1039558734,"B05":4133758178,"W05":371419563,"E05":1311230658,"K03":709131413,"M06":2447067775,"D06":1508335969,"P06":2216081143,"B06":4256926510,"W06":3759594249,"H04":345249222,"E11":1867311809,"M07":4291023923,"D07":445433768,"P07":1402911199,"B07":1400122702,"W07":3213556586,"K04":1328389693,"H05":606073723,"M08":1144008438,"D08":1922245538,"P08":3646137365,"B08":1337406333,"W08":2328458664,"E03":1734981314,"K06":267071540,"M09":4112431353,"D09":1645678976,"P09":711532189,"B09":3608978326,"W09":271789162,"H08":1136976769,"E06":4144733412,"M10":1133184935,"D10":700300598,"P10":2179801959,"B10":2642243513,"W10":3307850237,"E12":1373421733,"K05":3734797076,"H06":2548370514,"E07":4062455504,"K07":913765450,"H07":4042986908,"E09":2419431619,"K08":3733668929,"H09":2095137235,"E10":878364878},"b":{"BD1":3826179875,"BD2":2328815684,"BD3":975176027,"BD4":13365720,"BD5":3894644599,"BD6":1424963857,"BD7":3877202448,"BD8":1987142361},"openers":["{salam} {panggilan} 😊","{salam} {panggilan}, selamat {waktu}!","{salam} {panggilan}, apa khabar? Semoga sihat selalu 🌿","{salam} {panggilan} 👋","{salam} {panggilan}. Tips ringkas hari {hari} ni 👇"]};

  root.SE_CONTENT = {
    version: 2,
    messages: buildOrder(),
    birthdays: BIRTHDAYS,
    openers: OPENERS,
    openersByAge: OPENERS_BY_AGE,
    v1: V1
  };
})(typeof window !== 'undefined' ? window : globalThis);
