/* Servis Emas — logik teras (tiada DOM). Boleh diuji dalam Node. */
(function (root) {
  'use strict';
  var C = {};

  /* ================= Tarikh & masa ================= */
  var BULAN = ['Januari', 'Februari', 'Mac', 'April', 'Mei', 'Jun', 'Julai', 'Ogos', 'September', 'Oktober', 'November', 'Disember'];
  var BULAN_PENDEK = ['Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun', 'Jul', 'Ogo', 'Sep', 'Okt', 'Nov', 'Dis'];
  var HARI = ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu'];
  C.BULAN = BULAN; C.BULAN_PENDEK = BULAN_PENDEK; C.HARI = HARI;

  C.pad = function (n) { return (n < 10 ? '0' : '') + n; };
  C.dayNum = function (d) {
    d = d || new Date();
    return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000);
  };
  C.dayToDate = function (n) {
    var u = new Date(n * 86400000);
    return new Date(u.getUTCFullYear(), u.getUTCMonth(), u.getUTCDate());
  };
  C.isoDay = function (d) {
    d = d || new Date();
    return d.getFullYear() + '-' + C.pad(d.getMonth() + 1) + '-' + C.pad(d.getDate());
  };
  C.isLeap = function (y) { return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0; };
  C.daysInMonth = function (y, m) { return [31, C.isLeap(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1]; };
  C.fmtDate = function (d) { return HARI[d.getDay()] + ', ' + d.getDate() + ' ' + BULAN[d.getMonth()] + ' ' + d.getFullYear(); };
  C.fmtShort = function (d) { return d.getDate() + ' ' + BULAN_PENDEK[d.getMonth()]; };
  C.waktu = function (d) {
    var h = (d || new Date()).getHours();
    if (h >= 5 && h < 12) return 'pagi';
    if (h >= 12 && h < 14) return 'tengah hari';
    if (h >= 14 && h < 19) return 'petang';
    return 'malam';
  };
  C.fmtTime = function (hhmm) {
    var p = String(hhmm || '').split(':'); var h = +p[0], m = +p[1] || 0;
    if (isNaN(h)) return '';
    var label = h < 12 ? 'pagi' : h < 14 ? 'tengah hari' : h < 19 ? 'petang' : 'malam';
    var h12 = h % 12 === 0 ? 12 : h % 12;
    return h12 + ':' + C.pad(m) + ' ' + label;
  };
  C.fmtClock = function (ts) {
    var d = new Date(ts); var h = d.getHours();
    var h12 = h % 12 === 0 ? 12 : h % 12;
    return h12 + ':' + C.pad(d.getMinutes()) + (h < 12 ? ' pg' : h < 19 ? ' ptg' : ' mlm');
  };
  C.daysAgo = function (n) {
    if (n == null) return 'belum pernah';
    if (n <= 0) return 'hari ini';
    if (n === 1) return 'semalam';
    if (n < 30) return n + ' hari lepas';
    var mo = Math.round(n / 30);
    return mo < 12 ? mo + ' bulan lepas' : Math.round(n / 365) + ' tahun lepas';
  };

  /* ================= Nombor telefon ================= */
  C.normPhone = function (raw) {
    if (raw == null) return '';
    var s = String(raw).trim();
    if (!s) return '';
    if (/^[\d.]+e\+?\d+$/i.test(s)) return ''; // format saintifik Excel — digit dah hilang
    s = s.replace(/\.0+$/, '');
    var plus = s.charAt(0) === '+';
    var d = s.replace(/\D/g, '');
    if (!d) return '';
    if (d.indexOf('00') === 0) d = d.slice(2);
    else if (plus) return d;
    if (d.indexOf('60') === 0) return d;
    if (d.charAt(0) === '0') return '6' + d;
    if (d.charAt(0) === '1' && (d.length === 9 || d.length === 10)) return '60' + d;
    return d;
  };
  // Nombor pengganti dalam Excel (cth 010-000 0000) = tiada nombor sebenar
  C.phoneDummy = function (d) { return /^601\d?0{7,}$/.test(d || ''); };
  C.phoneOk = function (d) { return /^\d{8,15}$/.test(d || '') && !C.phoneDummy(d); };
  C.phoneIsMy = function (d) { return /^601\d{8,9}$/.test(d || ''); };
  C.fmtPhone = function (d) {
    if (!d) return '';
    if (/^601\d{8,9}$/.test(d)) {
      var l = '0' + d.slice(2);
      return l.length === 10 ? l.slice(0, 3) + '-' + l.slice(3, 6) + ' ' + l.slice(6) : l.slice(0, 3) + '-' + l.slice(3, 7) + ' ' + l.slice(7);
    }
    return '+' + d;
  };

  /* ================= Tarikh lahir & IC ================= */
  var MON = { jan: 1, januari: 1, january: 1, feb: 2, februari: 2, february: 2, mac: 3, mar: 3, march: 3, apr: 4, april: 4,
    mei: 5, may: 5, jun: 6, june: 6, jul: 7, julai: 7, july: 7, ogo: 8, ogos: 8, aug: 8, august: 8, sep: 9, sept: 9, september: 9,
    okt: 10, oct: 10, oktober: 10, october: 10, nov: 11, november: 11, dis: 12, dec: 12, disember: 12, december: 12 };
  function monthOf(w) { return MON[w] || MON[w.slice(0, 3)] || 0; }
  function nowYear() { return new Date().getFullYear(); }
  function fixYY(yy) { var cur = nowYear() % 100; return yy > cur ? 1900 + yy : 2000 + yy; }
  function mkDob(y, m, d) {
    m = +m; d = +d; y = (y == null || y === '') ? 0 : +y;
    if (!(m >= 1 && m <= 12)) return '';
    var maxD = m === 2 ? 29 : C.daysInMonth(2001, m);
    if (!(d >= 1 && d <= maxD)) return '';
    if (y && (y < 1900 || y > nowYear())) return '';
    if (y && m === 2 && d === 29 && !C.isLeap(y)) return '';
    return (y ? String(y) : '0000') + '-' + C.pad(m) + '-' + C.pad(d);
  }
  C.mkDob = mkDob;
  C.excelSerialToDob = function (n) {
    var dt = new Date(Date.UTC(1899, 11, 30) + Math.floor(n) * 86400000);
    return mkDob(dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate());
  };
  C.icInfo = function (v) {
    var d = String(v == null ? '' : v).replace(/\D/g, '');
    if (d.length !== 12) return null;
    var dob = mkDob(fixYY(+d.slice(0, 2)), +d.slice(2, 4), +d.slice(4, 6));
    if (!dob) return null;
    return { dob: dob, gender: (+d.charAt(11)) % 2 ? 'L' : 'P' };
  };
  // order 'mdy' = lajur ini format bulan/hari/tahun (lihat C.dateOrder); lalai hari/bulan/tahun
  C.parseDob = function (v, order) {
    if (v == null || v === '') return '';
    if (v instanceof Date && !isNaN(v)) return mkDob(v.getFullYear(), v.getMonth() + 1, v.getDate());
    var s = String(v).trim();
    if (!s) return '';
    var m;
    if (/^\d{5}(\.\d+)?$/.test(s)) { var n = Math.floor(+s); if (n >= 10000 && n < 73051) return C.excelSerialToDob(n); }
    s = s.toLowerCase().replace(/\s+/g, ' ');
    if ((m = s.match(/^(\d{4})[-\/.](\d{1,2})[-\/.](\d{1,2})/))) return mkDob(m[1], m[2], m[3]);
    if ((m = s.match(/^(\d{1,2})[-\/.](\d{1,2})(?:[-\/.](\d{4}|\d{2}))?(?:[\sT]|$)/))) {
      var a = +m[1], b = +m[2], y = m[3];
      if (y && y.length === 2) y = fixYY(+y);
      if (a <= 12 && (b > 12 || order === 'mdy')) return mkDob(y, a, b); // format bulan/hari
      return mkDob(y, b, a);
    }
    if ((m = s.match(/^(\d{1,2})[\s\-\/.]*([a-z]+)\.?[\s\-\/.,]*(\d{4}|\d{2})?$/))) {
      var mo = monthOf(m[2]); var yy = m[3];
      if (yy && yy.length === 2) yy = fixYY(+yy);
      if (mo) return mkDob(yy, mo, m[1]);
    }
    if ((m = s.match(/^([a-z]+)\.?\s*(\d{1,2}),?\s*(\d{4})?$/))) {
      var mo2 = monthOf(m[1]);
      if (mo2) return mkDob(m[3], mo2, m[2]);
    }
    if ((m = s.match(/^(\d{8})$/))) {
      var t = m[1];
      if (+t.slice(0, 4) >= 1900) { var r1 = mkDob(t.slice(0, 4), t.slice(4, 6), t.slice(6, 8)); if (r1) return r1; }
      var r2 = mkDob(t.slice(4, 8), t.slice(2, 4), t.slice(0, 2)); if (r2) return r2;
    }
    var ic = C.icInfo(s);
    if (ic) return ic.dob;
    return '';
  };
  // Format satu lajur tarikh: jika lebih banyak nilai seperti 3/15/1990 (bahagian kedua > 12) daripada 15/3/1990,
  // seluruh lajur dibaca bulan/hari/tahun — termasuk 3/5/1990 yang sebaliknya dibaca 3 Mei.
  C.dateOrder = function (values) {
    var dm = 0, md = 0;
    (values || []).forEach(function (v) {
      var m = String(v == null ? '' : v).trim().match(/^(\d{1,2})[-\/.](\d{1,2})[-\/.](\d{4}|\d{2})$/);
      if (!m) return;
      if (+m[1] > 12) dm++; else if (+m[2] > 12) md++;
    });
    return md > dm ? 'mdy' : 'dmy';
  };
  // Tahun lahir sahaja (cth "1990") atau umur (cth "35", "35 tahun", "30-39")
  C.parseBirthYear = function (v) {
    var s = String(v == null ? '' : v).trim();
    if (/^\d{4}$/.test(s) && +s >= 1900 && +s <= nowYear()) return +s;
    return 0;
  };
  C.parseAge = function (v) {
    var s = String(v == null ? '' : v).trim().toLowerCase();
    var m = s.match(/^(\d{1,3})(?:\s*(?:-|–|hingga|to|ke)\s*(\d{1,3}))?/);
    if (!m) return null;
    var a = +m[1], b = m[2] ? +m[2] : a;
    var age = Math.round((a + b) / 2);
    var rest = s.slice(m[0].length).trim();
    // "30an", "30-an", "30s" = lingkungan 30-39; "56+", "60 ke atas" = sekurang-kurangnya
    if (!m[2] && /^(-?an|'?s)\b/.test(rest)) age = a + 5;
    else if (!m[2] && /^(\+|ke atas|dan ke atas|above|and above)/.test(rest)) age = a + 5;
    return age > 0 && age < 120 ? age : null;
  };
  // Label kumpulan umur bertulis (cth "Muda", "Warga emas") → id kumpulan
  C.parseAgeGroup = function (v) {
    var s = String(v == null ? '' : v).toLowerCase().replace(/[^a-z]/g, '');
    if (!s) return '';
    if (/^(mb|junior)$/.test(s)) return 'muda'; // MB30 (nombor dibuang di atas)
    if (s === 'cx') return 'dewasa';
    if (s === 'cy') return 'pertengahan';
    if (s === 'cz') return 'matang';
    if (s === 'pencen') return 'warga';
    if (/^(muda|belia|remaja|youth|young|anakmuda|gen?z)/.test(s)) return 'muda';
    if (/^(prabersara|prapencen|prapesara|matang|menjelangpencen|preretire)/.test(s)) return 'matang';
    if (/^(wargaemas|warga|senior|pesara|bersara|retire|elder)/.test(s)) return 'warga';
    if (/^(pertengahan|separuhumur|middle|tengah)/.test(s)) return 'pertengahan';
    if (/^(dewasa|adult|berkeluarga|keluargamuda)/.test(s)) return 'dewasa';
    return '';
  };
  C.dobParts = function (dob) {
    if (!dob) return null;
    var p = dob.split('-');
    return { y: +p[0] || 0, m: +p[1], d: +p[2] };
  };
  C.fmtDob = function (dob) {
    var p = C.dobParts(dob); if (!p) return '';
    return p.d + ' ' + BULAN[p.m - 1] + (p.y ? ' ' + p.y : '');
  };
  C.ageOf = function (c, now) {
    now = now || new Date();
    var p = C.dobParts(c.dob);
    if (p && p.y) {
      var a = now.getFullYear() - p.y;
      if (now.getMonth() + 1 < p.m || (now.getMonth() + 1 === p.m && now.getDate() < p.d)) a--;
      return a;
    }
    if (c.by) return now.getFullYear() - c.by;
    return null;
  };
  C.isBirthday = function (dob, date) {
    var p = C.dobParts(dob); if (!p) return false;
    var m = date.getMonth() + 1, d = date.getDate();
    if (p.m === m && p.d === d) return true;
    return p.m === 2 && p.d === 29 && m === 2 && d === 28 && !C.isLeap(date.getFullYear());
  };
  C.daysToBirthday = function (dob, today) {
    var p = C.dobParts(dob); if (!p) return null;
    var y = today.getFullYear();
    for (var i = 0; i < 2; i++) {
      var dd = p.d;
      if (p.m === 2 && p.d === 29 && !C.isLeap(y + i)) dd = 28;
      var t = new Date(y + i, p.m - 1, dd);
      var diff = C.dayNum(t) - C.dayNum(today);
      if (diff >= 0) return diff;
    }
    return null;
  };

  /* ================= Nama & panggilan ================= */
  var TITLES = ['tuan', 'puan', 'encik', 'en', 'cik', 'pn', 'tn', 'mr', 'mrs', 'ms', 'miss', 'madam', 'mdm', 'dr', 'prof',
    'haji', 'hj', 'hajah', 'hjh', 'ustaz', 'ustazah', 'ust', 'cikgu', 'dato', 'datuk', 'datin', 'ir', 'ts', 'sir'];
  var PREFIX = ['muhammad', 'muhamad', 'muhammed', 'mohammad', 'mohamad', 'mohammed', 'mohamed', 'mohd', 'muhd', 'mhd', 'md', 'moh',
    'nur', 'nor', 'noor', 'nurul', 'siti', 'wan', 'nik', 'che', 'tengku', 'tunku', 'engku', 'ungku', 'raja', 'syed', 'sayed',
    'sharifah', 'syarifah', 'megat', 'puteri', 'putri', 'abang', 'awang', 'dayang', 'ahmad', 'ahmed', 'abdul', 'abd', 'ab'];
  var MALE_FIRST = ['muhammad', 'muhamad', 'muhammed', 'mohammad', 'mohamad', 'mohammed', 'mohamed', 'mohd', 'muhd', 'mhd', 'md',
    'syed', 'sayed', 'megat', 'awang', 'abang', 'abdul', 'abd', 'ab', 'ahmad', 'ahmed'];
  var FEMALE_FIRST = ['siti', 'sharifah', 'syarifah', 'puteri', 'putri', 'dayang'];
  var CN = ['tan', 'lim', 'lee', 'ng', 'wong', 'chong', 'chan', 'ong', 'teh', 'goh', 'ooi', 'khoo', 'koh', 'lau', 'liew', 'loh', 'low',
    'lai', 'leong', 'yap', 'yeoh', 'yeo', 'chua', 'chew', 'cheah', 'chin', 'choo', 'foo', 'ho', 'kok', 'kwan', 'lam', 'ling', 'liu',
    'lok', 'loo', 'mah', 'pang', 'phang', 'quek', 'saw', 'sim', 'soh', 'tay', 'teo', 'tee', 'thong', 'toh', 'tong', 'wee', 'woo',
    'yong', 'yee', 'yew', 'yip', 'chai', 'chiam', 'chuah', 'hew', 'hoo', 'hong', 'kang', 'khor', 'kuan', 'lew', 'lian', 'liang',
    'lin', 'liong', 'poh', 'siew', 'soo', 'tai', 'tham', 'tiong', 'chee', 'gan', 'heng', 'hii', 'hiew', 'kee', 'ku', 'neo', 'sia', 'seow'];
  var MALE_MARK = /\s(bin|b\.|a\/l|s\/o)\s/i;
  var FEMALE_MARK = /\s(binti|bte|bt\.?|bint|a\/p|d\/o)\s/i;
  var SPLIT_MARK = /\s(?:bin|binti|bte|bt\.?|bint|b\.|a\/l|a\/p|s\/o|d\/o|anak|ak\.)\s/i;
  function nk(w) { return String(w || '').toLowerCase().replace(/[.'’`]/g, ''); }
  function inList(list, w) { return list.indexOf(nk(w)) >= 0; }

  C.titleCase = function (s) {
    s = String(s || '');
    if (s !== s.toUpperCase() && s !== s.toLowerCase()) return s; // dah bercampur — kekalkan
    return s.toLowerCase().replace(/(^|[\s\-(@])([a-zÀ-ɏ])/g, function (_, p, c) { return p + c.toUpperCase(); })
      .replace(/(\s)(Bin|Binti|Bte|Bt\.?|B\.|A\/l|A\/p|S\/o|D\/o|Anak)(?=\s)/g, function (_, sp, w) { return sp + w.toLowerCase(); });
  };
  C.displayName = function (name) { return C.titleCase(String(name || '').replace(/\s+/g, ' ').trim()); };

  C.nameInfo = function (full) {
    var s = String(full || '').replace(/\s+/g, ' ').trim();
    if (!s) return { short: '', gender: '' };
    var padded = ' ' + s + ' ';
    var gender = MALE_MARK.test(padded) ? 'L' : FEMALE_MARK.test(padded) ? 'P' : '';
    var main = padded.split(SPLIT_MARK)[0].trim();
    main = (main.split('@')[0] || main).trim() || main;
    var words = main.split(' ').map(function (w) { return w.replace(/^[(\[]+|[)\],;]+$/g, ''); }).filter(Boolean);
    if (!words.length) words = s.split(' ');
    while (words.length > 1 && (inList(TITLES, words[0]) || (nk(words[0]) === 'tan' && /^(sri|seri)$/i.test(words[1])))) {
      if (nk(words[0]) === 'tan') words.shift();
      words.shift();
      if (words.length > 1 && /^(sri|seri)$/i.test(words[0])) words.shift();
    }
    var w0 = nk(words[0]);
    if (!gender) gender = MALE_FIRST.indexOf(w0) >= 0 ? 'L' : FEMALE_FIRST.indexOf(w0) >= 0 ? 'P' : '';
    if (words.length >= 2 && CN.indexOf(w0) >= 0) return { short: C.titleCase(words.join(' ')), gender: gender, full: true };
    while (words.length > 1 && inList(PREFIX, words[0])) words.shift();
    return { short: C.titleCase(words[0]), gender: gender };
  };

  /* Gelaran (lajur Salutation/Gelaran):
     formal  = Tuan, Puan, Cik… — sentiasa dipakai, kecuali tetapan panggilan "Nama sahaja"
     tetap   = Cikgu, Dr, Ustaz, Boss, Kak… — sentiasa dipakai di depan nama
     sendiri = Mama, Abah… — dipakai tanpa nama
     Nilai lain dianggap nama yang pemilik mahu guna (kawan-kawan) dan dipakai seperti ditulis. */
  var T_FORMAL = ['tuan', 'tn', 'puan', 'pn', 'cik', 'encik', 'en', 'mr', 'mrs', 'ms', 'miss', 'madam', 'mdm', 'sir'];
  var T_FIXED = ['dr', 'prof', 'haji', 'hj', 'hajah', 'hjh', 'ustaz', 'ustazah', 'ust', 'cikgu', 'dato', 'datuk', 'datin', 'ir', 'ts',
    'boss', 'bos', 'kak', 'kakak', 'abang', 'abg', 'bang', 'pak', 'pakcik', 'makcik', 'bro', 'sis', 'uncle', 'aunty', 'auntie',
    'adik', 'dik', 'along', 'angah', 'tok', 'atuk', 'nenek', 'opah'];
  var T_ALONE = ['mama', 'papa', 'mak', 'emak', 'abah', 'ayah', 'ibu', 'ummi', 'umi', 'mummy', 'mommy', 'daddy', 'bonda', 'ayahanda'];
  C.titleKind = function (t) {
    var w = String(t || '').trim().split(/\s+/).map(nk).filter(Boolean);
    if (!w.length) return '';
    if (w.length === 1 && T_ALONE.indexOf(w[0]) >= 0) return 'sendiri';
    var kind = 'formal';
    for (var i = 0; i < w.length; i++) {
      var x = w[i];
      if (T_FIXED.indexOf(x) >= 0 || (i > 0 && /^(sri|seri)$/.test(x)) || (x === 'tan' && /^(sri|seri)$/.test(w[i + 1] || ''))) kind = 'tetap';
      else if (T_FORMAL.indexOf(x) < 0) return '';
    }
    return kind;
  };

  C.genderOf = function (c) { return c.gender || C.nameInfo(c.name).gender || ''; };

  C.panggilan = function (c, s, now) {
    var nick = String(c.nick || '').trim(), title = String(c.title || '').trim();
    var kind = title ? C.titleKind(title) : '';
    if (title && !kind) return title; // nama yang ditulis dalam lajur gelaran
    if (kind === 'sendiri') return C.titleCase(title);
    // Panggilan penuh (cth "Kak Ros") dipakai terus; dengan gelaran, panggilan = nama pendek yang digabung
    if (nick && (!kind || C.titleKind(nick.split(/\s+/)[0]))) return nick;
    var info = C.nameInfo(c.name);
    var plain = nick || info.short;
    var base = nick || (info.full ? info.short.split(' ')[0] : info.short); // nama Cina: Tuan Lim / Puan Tan
    if (!plain) return kind ? C.titleCase(title) : 'tuan/puan';
    if (kind === 'tetap') return C.titleCase(title) + ' ' + base;
    var mode = (s && s.honorific) || 'tuanpuan';
    if (mode === 'nama') return plain;
    if (kind) return C.titleCase(title) + ' ' + base; // gelaran dari Excel diikut tanpa mengira umur
    if (mode === 'umur') { var age = C.ageOf(c, now); if (age != null && age < 30) return plain; }
    var g = c.gender || info.gender;
    if (g === 'L') return 'Tuan ' + base;
    if (g === 'P') return 'Puan ' + base;
    return plain;
  };

  /* ================= Kumpulan umur ================= */
  // Label ikut lajur Category dalam Excel pemilik: Junior <18, MB30 18–25, CX 26–35, CY 36–45, CZ 46–55, Pencen 56+.
  // Id dalaman dikekalkan (mesej & tetapan merujuk id). Junior bukan kumpulan mesej sendiri: untuk pilihan mesej
  // dia dikira 'muda', tetapi dipaparkan sebagai Junior (C.viewGroup) dan boleh ditangguh (settings.pauseJunior).
  C.AGE_GROUPS = [
    { id: 'muda', label: 'MB30' },
    { id: 'dewasa', label: 'CX' },
    { id: 'pertengahan', label: 'CY' },
    { id: 'matang', label: 'CZ' },
    { id: 'warga', label: 'Pencen' }
  ];
  C.DEFAULT_BOUNDS = [26, 36, 46, 56];
  C.OLD_BOUNDS = [30, 40, 50, 60];
  C.ageGroupOf = function (age, bounds) {
    if (age == null) return null;
    var b = bounds && bounds.length === 4 ? bounds : C.DEFAULT_BOUNDS;
    if (age < b[0]) return 'muda';
    if (age < b[1]) return 'dewasa';
    if (age < b[2]) return 'pertengahan';
    if (age < b[3]) return 'matang';
    return 'warga';
  };
  C.groupOf = function (c, s, now) {
    if (c.grp && C.AGE_GROUPS.some(function (g) { return g.id === c.grp; })) return c.grp; // ditetapkan manual
    return C.ageGroupOf(C.ageOf(c, now), s && s.ageBounds);
  };
  // Kumpulan untuk paparan: Junior diasingkan daripada MB30
  C.viewGroup = function (c, s, now) { return C.isJunior(c, now) ? 'junior' : C.groupOf(c, s, now); };
  C.groupRange = function (id, bounds) {
    var b = bounds && bounds.length === 4 ? bounds : C.DEFAULT_BOUNDS;
    switch (id) {
      case 'junior': return 'bawah ' + C.JUNIOR_AGE;
      case 'muda': return b[0] > C.JUNIOR_AGE ? C.JUNIOR_AGE + '–' + (b[0] - 1) : 'bawah ' + b[0];
      case 'dewasa': return b[0] + '–' + (b[1] - 1);
      case 'pertengahan': return b[1] + '–' + (b[2] - 1);
      case 'matang': return b[2] + '–' + (b[3] - 1);
      case 'warga': return b[3] + '+';
    }
    return '';
  };
  C.groupLabel = function (id, bounds, withRange) {
    if (!id) return 'Tiada umur';
    if (id === 'junior') return withRange === false ? 'Junior' : 'Junior (' + C.groupRange(id, bounds) + ')';
    var g = C.AGE_GROUPS.filter(function (x) { return x.id === id; })[0];
    if (!g) return id;
    return withRange === false ? g.label : g.label + ' (' + C.groupRange(id, bounds) + ')';
  };

  /* ================= Kumpulan / tag ================= */
  C.parseTags = function (v) {
    var out = [];
    String(v == null ? '' : v).split(/[,;|]/).forEach(function (t) {
      t = t.replace(/\s+/g, ' ').trim();
      if (t && !out.some(function (x) { return x.toLowerCase() === t.toLowerCase(); })) out.push(t);
    });
    return out;
  };
  C.hasTag = function (c, tag) {
    if (!tag) return false;
    var t = String(tag).toLowerCase().trim();
    return (c.tags || []).some(function (x) { return String(x).toLowerCase().trim() === t; });
  };
  C.isNonMuslim = function (c, s) { return C.hasTag(c, s && s.nonMuslimTag); };
  C.salamFor = function (c, s) {
    if (c.salam && String(c.salam).trim()) return String(c.salam).trim();
    return (C.isNonMuslim(c, s) ? s.salamNonMuslim : s.salam) || '';
  };

  // Tiada PG Code (lajur PG CODE wujud tetapi kosong) = belum buat belian: bakal pelanggan. null = tidak diketahui.
  C.isProspect = function (c) { return c.pg === ''; };
  // m.aud: 'prospek' = hanya bakal pelanggan, 'penyimpan' = hanya yang dah beli, kosong = semua
  C.audOk = function (m, c) {
    if (m.aud === 'prospek') return C.isProspect(c);
    if (m.aud === 'penyimpan') return !C.isProspect(c);
    return true;
  };

  /* ================= Pemilihan mesej ================= */
  C.msgMatches = function (m, c, s, now) {
    if (m.on === false) return false;
    if (m.islamic && C.isNonMuslim(c, s)) return false;
    if (!C.audOk(m, c)) return false;
    if (m.ages && m.ages.length) {
      var g = C.groupOf(c, s, now);
      if (!g || m.ages.indexOf(g) < 0) return false;
    }
    if (m.tags && m.tags.length && !m.tags.some(function (t) { return C.hasTag(c, t); })) return false;
    return true;
  };
  C.nextMessage = function (c, messages, s, today, now) {
    var oldest = null, oldestDay = Infinity, sent = c.sent || {};
    for (var i = 0; i < messages.length; i++) {
      var m = messages[i];
      if (!C.msgMatches(m, c, s, now)) continue;
      var sd = sent[m.id];
      if (sd == null) return m;
      if (sd < oldestDay) { oldestDay = sd; oldest = m; }
    }
    if (oldest && s.repeatAfterDays > 0 && today - oldestDay >= s.repeatAfterDays) return oldest;
    return null;
  };
  C.remainingFor = function (c, messages, s, now) {
    var sent = c.sent || {}, n = 0, total = 0;
    messages.forEach(function (m) { if (C.msgMatches(m, c, s, now)) { total++; if (sent[m.id] == null) n++; } });
    return { left: n, total: total };
  };

  // Akaun Junior (bawah 18) boleh ditangguh: tiada broadcast & ucapan hari jadi selagi tetapan pauseJunior hidup
  C.JUNIOR_AGE = 18;
  C.isJunior = function (c, now) { var a = C.ageOf(c, now); return a != null && a < C.JUNIOR_AGE; };
  C.paused = function (c, s, now) { return !!(s && s.pauseJunior) && C.isJunior(c, now); };

  // Skrip kategori (mesej yang ada src): berapa penerima dah terima semua skrip kumpulannya.
  // Bila hampir semua dah habis, pemilik perlu minta set skrip baharu.
  C.SCRIPT_LOW = 0.8;
  C.scriptStats = function (state, now) {
    now = now || new Date();
    var s = state.settings, out = {}, prim = C.primaryIds(state.customers, s, now);
    C.AGE_GROUPS.forEach(function (g) { out[g.id] = { people: 0, done: 0, scripts: 0 }; });
    state.messages.forEach(function (m) { if (m.src && m.on !== false) (m.ages || []).forEach(function (g) { if (out[g]) out[g].scripts++; }); });
    state.customers.forEach(function (c) {
      if (!prim[c.id] || !C.phoneOk(c.phone)) return;
      var g = C.groupOf(c, s, now); if (!out[g]) return;
      var mine = state.messages.filter(function (m) { return m.src && C.msgMatches(m, c, s, now); });
      if (!mine.length) return;
      out[g].people++;
      if (mine.every(function (m) { return c.sent && c.sent[m.id] != null; })) out[g].done++;
    });
    return out;
  };
  C.scriptsLow = function (stats) {
    return C.AGE_GROUPS.map(function (g) { return g.id; }).filter(function (g) { var x = stats[g]; return x && x.people >= 5 && x.done / x.people >= C.SCRIPT_LOW; });
  };

  // Satu nombor = satu penerima: rekod pertama yang tidak ditangguh. Nombor yang ada STOP tidak dihantar langsung.
  C.stopPhones = function (customers) {
    var out = {};
    customers.forEach(function (c) { if (c.optOut && c.phone) out[c.phone] = 1; });
    return out;
  };
  C.primaryIds = function (customers, s, now) {
    var stopped = C.stopPhones(customers), seen = {}, ids = {};
    customers.forEach(function (c) {
      if (!c.phone || seen[c.phone] || stopped[c.phone] || C.paused(c, s, now)) return;
      seen[c.phone] = 1; ids[c.id] = 1;
    });
    return ids;
  };

  // Sebab seseorang tidak layak broadcast hari ini (null = layak)
  C.blockReason = function (c, ctx) {
    if (c.optOut) return 'stop';
    if (!C.phoneOk(c.phone)) return 'telefon';
    if (C.paused(c, ctx.s, ctx.now)) return 'junior';
    if (ctx.stopPhones[c.phone]) return 'stop';
    if (!ctx.primary[c.id]) return 'pendua';
    if (ctx.bdayPhones[c.phone]) return 'harijadi'; // nombor ini dapat ucapan hari jadi hari ini — cukup satu mesej
    if (c.last != null && ctx.today - c.last < ctx.s.minGapDays) return 'jarak';
    if (!C.nextMessage(c, ctx.messages, ctx.s, ctx.today, ctx.now)) return 'habis';
    return null;
  };
  C.makeCtx = function (state, now) {
    now = now || new Date();
    var bdayPhones = {};
    state.customers.forEach(function (c) { if (c.phone && C.isBirthday(c.dob, now) && !C.paused(c, state.settings, now)) bdayPhones[c.phone] = 1; });
    return { s: state.settings, messages: state.messages, now: now, today: C.dayNum(now), primary: C.primaryIds(state.customers, state.settings, now),
      stopPhones: C.stopPhones(state.customers), bdayPhones: bdayPhones };
  };
  C.eligiblePool = function (state, exclude, now) {
    var ctx = C.makeCtx(state, now);
    var pool = state.customers.filter(function (c) { return !(exclude && exclude[c.id]) && !C.blockReason(c, ctx); });
    pool.sort(function (a, b) {
      var la = a.last == null ? -1e9 : a.last, lb = b.last == null ? -1e9 : b.last;
      return la - lb || (a.seq || 0) - (b.seq || 0);
    });
    return pool;
  };
  C.takenToday = function (state, key) {
    var taken = {}, b = state.batches[key] || {};
    Object.keys(b).forEach(function (slot) { (b[slot].ids || []).forEach(function (id) { taken[id] = 1; }); });
    return taken;
  };
  // Dapatkan (atau bina) kumpulan sesi hari ini. Rekod yang dah dipadam dibuang,
  // penyimpan yang tak lagi layak (STOP, dah dapat mesej hari ini, dsb.) dilangkau,
  // dan kumpulan diisi semula sehingga mencapai saiz sesi.
  C.ensureBatch = function (state, slotId, now) {
    now = now || new Date();
    var key = C.isoDay(now);
    state.batches[key] = state.batches[key] || {};
    var day = state.batches[key];
    var slot = state.settings.slots.filter(function (x) { return x.id === slotId; })[0];
    var size = slot ? Math.max(1, +slot.size || 30) : 30;
    var b = day[slotId];
    if (!b) b = day[slotId] = { ids: [], done: {}, skip: {}, created: now.getTime() };
    var exists = {};
    state.customers.forEach(function (c) { exists[c.id] = c; });
    b.ids = b.ids.filter(function (id) { return exists[id]; });
    Object.keys(b.done).forEach(function (id) { if (!exists[id]) delete b.done[id]; });
    Object.keys(b.skip).forEach(function (id) { if (!exists[id]) delete b.skip[id]; });
    var ctx = C.makeCtx(state, now);
    b.ids.forEach(function (id) { if (!b.done[id] && !b.skip[id] && C.blockReason(exists[id], ctx)) b.skip[id] = 1; });
    var active = b.ids.filter(function (id) { return !b.skip[id]; }).length;
    if (active < size) {
      var pool = C.eligiblePool(state, C.takenToday(state, key), now);
      b.ids = b.ids.concat(pool.slice(0, size - active).map(function (c) { return c.id; }));
    }
    return b;
  };
  C.topUpBatch = function (state, slotId, n, now) {
    var b = C.ensureBatch(state, slotId, now);
    var pool = C.eligiblePool(state, C.takenToday(state, C.isoDay(now || new Date())), now);
    var add = pool.slice(0, n).map(function (c) { return c.id; });
    b.ids = b.ids.concat(add);
    return add.length;
  };
  C.pruneBatches = function (state, now) {
    var cutoff = C.dayNum(now || new Date()) - 14;
    Object.keys(state.batches || {}).forEach(function (k) {
      var p = k.split('-'); var dn = C.dayNum(new Date(+p[0], +p[1] - 1, +p[2]));
      if (dn < cutoff) delete state.batches[k];
    });
  };

  /* ================= Broadcast pilihan: pemilik pilih skrip & penerima ================= */
  // f = { groups: [] (kosong = semua; 'junior','muda',…,'warga','tiada'), status: 'semua'|'penyimpan'|'prospek',
  //       tags: [], skipReceived: true }. Satu nombor = satu penerima dalam senarai.
  C.campaignPreview = function (state, msg, f, now) {
    now = now || new Date(); f = f || {};
    var s = state.settings, stopped = C.stopPhones(state.customers), seen = {};
    var out = { ids: [], why: { stop: 0, telefon: 0, junior: 0, islamik: 0, sasaran: 0, diterima: 0, pendua: 0 } }, w = out.why;
    state.customers.forEach(function (c) {
      var g = C.viewGroup(c, s, now) || 'tiada';
      if (f.groups && f.groups.length && f.groups.indexOf(g) < 0) return;
      if (f.status === 'prospek' && !C.isProspect(c)) return;
      if (f.status === 'penyimpan' && C.isProspect(c)) return;
      if (f.tags && f.tags.length && !f.tags.some(function (t) { return C.hasTag(c, t); })) return;
      if (c.optOut || stopped[c.phone]) { w.stop++; return; }
      if (!C.phoneOk(c.phone)) { w.telefon++; return; }
      if (C.paused(c, s, now)) { w.junior++; return; }
      if (msg && msg.islamic && C.isNonMuslim(c, s)) { w.islamik++; return; }
      if (msg && !C.audOk(msg, c)) { w.sasaran++; return; }
      if (msg && f.skipReceived !== false && c.sent && c.sent[msg.id] != null) { w.diterima++; return; }
      if (seen[c.phone]) { w.pendua++; return; }
      seen[c.phone] = 1; out.ids.push(c.id);
    });
    return out;
  };
  C.newCampaign = function (state, msg, f, now) {
    now = now || new Date();
    var p = C.campaignPreview(state, msg, f, now);
    state.seq = (state.seq || 0) + 1;
    var k = { id: 'k' + now.getTime().toString(36) + state.seq, msg: msg.id, title: msg.title, filter: f, created: now.getTime(), ids: p.ids, done: {}, skip: {} };
    state.campaigns = state.campaigns || [];
    state.campaigns.unshift(k);
    return k;
  };
  C.campaignPending = function (state, k) {
    var by = {};
    state.customers.forEach(function (c) { by[c.id] = c; });
    var stopped = C.stopPhones(state.customers);
    return k.ids.filter(function (id) { var c = by[id]; return c && !k.done[id] && !k.skip[id] && !c.optOut && !stopped[c.phone]; });
  };
  // Bilangan mesej broadcast dihantar hari ini (sesi + broadcast pilihan) — untuk had harian
  C.sentToday = function (state, now) {
    now = now || new Date();
    var start = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime(), n = 0;
    var day = (state.batches || {})[C.isoDay(now)] || {};
    Object.keys(day).forEach(function (slot) { n += Object.keys(day[slot].done || {}).length; });
    (state.campaigns || []).forEach(function (k) { Object.keys(k.done || {}).forEach(function (id) { if (k.done[id].t >= start) n++; }); });
    return n;
  };

  /* ================= Isi & susun mesej ================= */
  C.fill = function (tpl, vars) {
    return String(tpl || '').replace(/\{(\w+)\}/g, function (m, k) { return Object.prototype.hasOwnProperty.call(vars, k) ? vars[k] : m; });
  };
  C.tidyLine = function (t) {
    return String(t).replace(/[ \t]+/g, ' ').replace(/ ([,.!?])/g, '$1').replace(/^[\s,.]+/, '').trim();
  };
  C.vars = function (c, s, now) {
    now = now || new Date();
    return {
      panggilan: C.panggilan(c, s, now),
      nama: C.displayName(c.name),
      nama_pendek: C.nameInfo(c.name).short || '',
      salam: C.salamFor(c, s),
      waktu: C.waktu(now),
      hari: HARI[now.getDay()],
      nama_saya: s.myName || ''
    };
  };
  C.hash = function (str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  };
  // Senarai ayat pembuka untuk seseorang: ikut kumpulan umurnya jika ada,
  // jika tidak guna senarai umum.
  C.openerList = function (c, s, now) {
    function clean(l) { return (l || []).filter(function (x) { return String(x).trim(); }); }
    var g = C.groupOf(c, s, now);
    var byAge = g && s.openersByAge ? clean(s.openersByAge[g]) : [];
    return byAge.length ? byAge : clean(s.openers);
  };
  C.openerFor = function (c, m, s, now) {
    var list = C.openerList(c, s, now);
    if (!list.length) return '';
    return list[C.hash(c.id + '|' + m.id) % list.length];
  };
  C.signature = function (s, v) {
    if (!s.myName || !s.signature) return '';
    return C.fill(s.signature, v).trim();
  };
  // Salinan mesej dengan teks lain (teks diedit untuk satu broadcast), tanpa mengubah pustaka
  C.withBody = function (m, body) {
    if (!m || body == null || body === m.body) return m;
    var x = {}; Object.keys(m).forEach(function (k) { x[k] = m[k]; }); x.body = body; return x;
  };
  C.composeBroadcast = function (c, m, s, now, opts) {
    var v = C.vars(c, s, now);
    var parts = [];
    if (m.opener !== false) { var op = C.openerFor(c, m, s, now); if (op) parts.push(C.tidyLine(C.fill(op, v))); }
    parts.push(C.fill(m.body, v).trim());
    var foot = [];
    var sig = C.signature(s, v); if (sig) foot.push(sig);
    var count = opts && opts.count != null ? opts.count : Object.keys(c.sent || {}).length;
    if (s.stopEvery > 0 && s.stopText && count % s.stopEvery === 0) foot.push('_' + C.fill(s.stopText, v).trim() + '_');
    var text = parts.join('\n\n');
    if (foot.length) text += '\n\n' + foot.join('\n');
    return text;
  };
  C.birthdayOptions = function (c, list, s, now) {
    return (list || []).filter(function (t) { return C.msgMatches(t, c, s, now); });
  };
  C.pickBirthday = function (c, list, s, now, offset) {
    var opts = C.birthdayOptions(c, list, s, now);
    if (!opts.length) return null;
    var i = (C.hash(c.id + '|' + (now || new Date()).getFullYear()) + (offset || 0)) % opts.length;
    return opts[i];
  };
  C.composeBirthday = function (c, t, s, now) {
    var v = C.vars(c, s, now);
    var text = C.fill(t.body, v).split('\n').map(function (l, i) { return i === 0 ? C.tidyLine(l) : l; }).join('\n').trim();
    var sig = C.signature(s, v);
    return sig ? text + '\n\n' + sig : text;
  };

  /* ================= Pautan WhatsApp ================= */
  C.waLink = function (phone, text, mode) {
    var t = encodeURIComponent(text || '');
    switch (mode) {
      case 'app': return 'whatsapp://send?phone=' + phone + '&text=' + t;
      case 'web': return 'https://web.whatsapp.com/send?phone=' + phone + '&text=' + t;
      case 'api': return 'https://api.whatsapp.com/send?phone=' + phone + '&text=' + t;
      case 'business': return 'intent://send?phone=' + phone + '&text=' + t + '#Intent;scheme=whatsapp;package=com.whatsapp.w4b;end';
      default: return 'https://wa.me/' + phone + '?text=' + t;
    }
  };

  /* ================= CSV ================= */
  C.parseCSV = function (text) {
    text = String(text || '').replace(/^﻿/, '');
    var first = text.split(/\r?\n/)[0] || '';
    var counts = { '\t': (first.match(/\t/g) || []).length, ';': (first.match(/;/g) || []).length, ',': (first.match(/,/g) || []).length };
    var delim = counts['\t'] >= counts[','] && counts['\t'] >= counts[';'] && counts['\t'] > 0 ? '\t' : counts[';'] > counts[','] ? ';' : ',';
    var rows = [], row = [], cell = '', q = false;
    for (var i = 0; i < text.length; i++) {
      var ch = text.charAt(i);
      if (q) {
        if (ch === '"') { if (text.charAt(i + 1) === '"') { cell += '"'; i++; } else q = false; }
        else cell += ch;
      } else if (ch === '"' && cell === '') { q = true; }
      else if (ch === delim) { row.push(cell); cell = ''; }
      else if (ch === '\n' || ch === '\r') {
        if (ch === '\r' && text.charAt(i + 1) === '\n') i++;
        row.push(cell); rows.push(row); row = []; cell = '';
      } else cell += ch;
    }
    if (cell !== '' || row.length) { row.push(cell); rows.push(row); }
    return rows.filter(function (r) { return r.some(function (x) { return String(x).trim() !== ''; }); });
  };
  C.toCSV = function (rows) {
    return rows.map(function (r) {
      return r.map(function (v) {
        v = v == null ? '' : String(v);
        return /[",\n\r]/.test(v) || /^[=+\-@]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
      }).join(',');
    }).join('\r\n');
  };

  /* ================= Import ================= */
  C.FIELDS = [
    { key: 'name', label: 'Nama', req: true },
    { key: 'phone', label: 'No. telefon', req: true },
    { key: 'pg', label: 'PG Code (kosong = bakal pelanggan)' },
    { key: 'dob', label: 'Tarikh lahir' },
    { key: 'ic', label: 'No. IC (untuk tarikh lahir sahaja)' },
    { key: 'age', label: 'Umur / kumpulan umur' },
    { key: 'nick', label: 'Panggilan / nama pendek' },
    { key: 'title', label: 'Gelaran (Tuan/Puan/Cik)' },
    { key: 'gender', label: 'Jantina' },
    { key: 'tags', label: 'Kumpulan' },
    { key: 'note', label: 'Catatan' },
    { key: 'salam', label: 'Sapaan' }
  ];
  function hk(h) { return String(h || '').toLowerCase().replace(/[^a-z0-9]/g, ''); }
  C.guessField = function (header) {
    var k = hk(header);
    if (!k) return '';
    if (/^(pgcode|kodpg|pg|pgno|nopg|pgid)$/.test(k)) return 'pg';
    if (/salutation|gelaran|^title$|honorific/.test(k)) return 'title';
    if (/panggil|nick/.test(k)) return 'nick';
    if (/akaun|account|^acc|ahli|member|kod|code|^pg|emel|email|alamat|address|poskod|negeri|state|bandar|city|baki|balance|gram|tarikhdaftar|daftar|regist/.test(k)) return '';
    if (/^(ic|noic|icno|nric|mykad|nokp|kp|nokadpengenalan|kadpengenalan|pengenalan|identitycard|icnumber|nombuoric|nomboric|noickp)$/.test(k) || /mykad|nric|pengenalan|^noic|^nombor?ic|kp$/.test(k)) return 'ic';
    if (/^(tahunlahir|yearofbirth|birthyear)$/.test(k)) return 'age';
    if (/lahir|dob|birth|harijadi|tarikhjadi/.test(k)) return 'dob';
    if (/umur|usia|^age|agegroup|peringkatusia/.test(k)) return 'age';
    if (/jantina|gender|^sex$/.test(k)) return 'gender';
    if (/kumpulan|group|^tags?$|label|kategori|segmen/.test(k)) return 'tags';
    if (/^catatan|^nota$|^notes?$|^remarks?$|^komen|^ulasan/.test(k)) return 'note';
    if (/sapaan|salam|greeting/.test(k)) return 'salam';
    if (/tel|phone|hp|mobile|whatsapp|^wa$|nombor|contact|nohandphone|bimbit/.test(k)) return 'phone';
    if (/nama|name|pelanggan|customer|penyimpan/.test(k)) return 'name';
    return '';
  };
  function phoneLike(v) {
    var d = String(v).replace(/\D/g, '');
    return (/^01\d/.test(d) && d.length >= 10 && d.length <= 11) || (/^601/.test(d) && d.length >= 11 && d.length <= 12) || (/^1\d/.test(d) && d.length >= 9 && d.length <= 10);
  }
  C.detectMapping = function (rows) {
    var head = rows[0] || [];
    var map = {}, hasHeader = false;
    head.forEach(function (h, i) {
      var f = C.guessField(h);
      if (f && map[f] == null) { map[f] = i; hasHeader = true; }
    });
    // Tiada tajuk dikesan: teka dari isi kandungan
    if (!hasHeader || map.phone == null || map.name == null) {
      var sample = rows.slice(hasHeader ? 1 : 0, (hasHeader ? 1 : 0) + 20);
      var ncol = Math.max.apply(null, rows.map(function (r) { return r.length; }).concat([0]));
      for (var col = 0; col < ncol; col++) {
        var vals = sample.map(function (r) { return String(r[col] == null ? '' : r[col]).trim(); }).filter(Boolean);
        if (!vals.length) continue;
        var ratio = function (fn) { return vals.filter(fn).length / vals.length; };
        var phoneScore = ratio(phoneLike), icScore = ratio(function (v) { return /^\d{6}-?\d{2}-?\d{4}$/.test(v) && C.icInfo(v); });
        if (map.ic == null && icScore > 0.6 && icScore > phoneScore) { map.ic = col; continue; }
        if (map.phone == null && phoneScore > 0.6) { map.phone = col; continue; }
        if (map.dob == null && ratio(function (v) { return /[\/\-.]/.test(v) && C.parseDob(v); }) > 0.6) { map.dob = col; continue; }
        if (map.name == null && ratio(function (v) { return /[a-z]{2,}/i.test(v) && !/\d{3,}/.test(v); }) > 0.6) { map.name = col; continue; }
      }
    }
    return { map: map, hasHeader: hasHeader };
  };
  C.parseGender = function (v) {
    var s = String(v == null ? '' : v).trim().toLowerCase();
    if (/^(l|m|lelaki|male|laki|pria|lelaki\/male)$/.test(s)) return 'L';
    if (/^(p|f|w|perempuan|female|wanita)$/.test(s)) return 'P';
    return '';
  };
  C.rowToCustomer = function (row, map, opts) {
    function g(k) { return map[k] == null ? '' : row[map[k]]; }
    var name = C.displayName(g('name'));
    var phone = C.normPhone(g('phone'));
    var dob = C.parseDob(g('dob'), opts && opts.dateOrder);
    var by = 0;
    var gender = C.parseGender(g('gender'));
    var ic = C.icInfo(g('ic'));
    if (ic) { if (!dob) dob = ic.dob; if (!gender) gender = ic.gender; }
    if (!dob) { by = C.parseBirthYear(g('dob')); }
    var ageRaw = g('age'), grp = '';
    if (!dob && !by && ageRaw != null && ageRaw !== '') {
      by = C.parseBirthYear(ageRaw);
      if (!by) { var age = C.parseAge(ageRaw); if (age != null) by = nowYear() - age; }
      if (!by) grp = C.parseAgeGroup(ageRaw);
    }
    return {
      name: name,
      phone: phone,
      dob: dob,
      by: dob ? 0 : by,
      grp: grp,
      gender: gender,
      nick: String(g('nick') || '').trim(),
      title: String(g('title') || '').trim(),
      pg: map.pg == null ? null : String(g('pg') == null ? '' : g('pg')).trim().toUpperCase(),
      tags: C.parseTags(g('tags')),
      note: String(g('note') || '').trim(),
      salam: String(g('salam') || '').trim(),
      rawPhone: String(g('phone') == null ? '' : g('phone')).trim()
    };
  };
  C.uid = function () { return 'c' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); };
  function sameName(a, b) {
    var x = C.nameInfo(a).short.toLowerCase(), y = C.nameInfo(b).short.toLowerCase();
    return !!x && x === y || String(a).toLowerCase().replace(/\s+/g, ' ') === String(b).toLowerCase().replace(/\s+/g, ' ');
  }
  C.newCustomer = function (state, data, now) {
    state.seq = (state.seq || 0) + 1;
    return {
      id: C.uid(), seq: state.seq, name: data.name || '', phone: data.phone || '', dob: data.dob || '', by: data.by || 0, grp: data.grp || '',
      gender: data.gender || '', nick: data.nick || '', title: data.title || '', pg: data.pg == null ? null : data.pg, tags: data.tags || [], note: data.note || '', salam: data.salam || '',
      optOut: false, demo: !!data.demo, added: C.dayNum(now || new Date()), sent: {}, last: null, bday: {}
    };
  };
  // Gabung baris import ke dalam senarai. Kunci = nombor telefon (+ nama).
  C.mergeImport = function (state, items, opts) {
    opts = opts || {};
    var res = { added: 0, updated: 0, skipped: [], sharedPhone: 0 };
    var byPhone = {};
    state.customers.forEach(function (c) { (byPhone[c.phone] = byPhone[c.phone] || []).push(c); });
    items.forEach(function (it, idx) {
      if (!it.name && !it.rawPhone) return;
      if (!C.phoneOk(it.phone)) { res.skipped.push({ row: idx, name: it.name, phone: it.rawPhone, why: it.rawPhone ? 'nombor tidak sah' : 'tiada nombor' }); return; }
      if (!it.name) it.name = '';
      var list = byPhone[it.phone] || [];
      var match = list.filter(function (c) { return !it.name || !c.name || sameName(c.name, it.name); })[0];
      var tags = (it.tags || []).slice();
      if (opts.extraTag) C.parseTags(opts.extraTag).forEach(function (t) { if (!tags.some(function (x) { return x.toLowerCase() === t.toLowerCase(); })) tags.push(t); });
      if (match) {
        ['name', 'dob', 'gender', 'nick', 'title', 'note', 'salam', 'grp'].forEach(function (k) { if (it[k]) match[k] = it[k]; });
        if (it.pg != null && (it.pg || match.pg == null)) match.pg = it.pg; // PG Code tak dibuang bila sel kosong
        if (it.by && !match.dob) { match.by = it.by; match.grp = ''; }
        if (it.dob) { match.by = 0; match.grp = ''; }
        tags.forEach(function (t) { if (!C.hasTag(match, t)) match.tags.push(t); });
        res.updated++;
      } else {
        if (list.length) res.sharedPhone++;
        var c = C.newCustomer(state, { name: it.name, phone: it.phone, dob: it.dob, by: it.by, grp: it.grp, gender: it.gender, nick: it.nick, title: it.title, pg: it.pg, tags: tags, note: it.note, salam: it.salam });
        state.customers.push(c);
        (byPhone[c.phone] = byPhone[c.phone] || []).push(c);
        res.added++;
      }
    });
    return res;
  };

  /* ================= Peringatan kalendar (.ics) ================= */
  C.buildICS = function (slots, days, url, now) {
    now = now || new Date();
    var BYDAY = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
    var active = [];
    (days || [1, 1, 1, 1, 1, 1, 1]).forEach(function (on, i) { if (on) active.push(BYDAY[i]); });
    function fmtLocal(d) { return d.getFullYear() + C.pad(d.getMonth() + 1) + C.pad(d.getDate()) + 'T' + C.pad(d.getHours()) + C.pad(d.getMinutes()) + '00'; }
    function stamp(d) { return d.getUTCFullYear() + C.pad(d.getUTCMonth() + 1) + C.pad(d.getUTCDate()) + 'T' + C.pad(d.getUTCHours()) + C.pad(d.getUTCMinutes()) + C.pad(d.getUTCSeconds()) + 'Z'; }
    var lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Servis Emas//MS', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
      'BEGIN:VTIMEZONE', 'TZID:Asia/Kuala_Lumpur', 'BEGIN:STANDARD', 'DTSTART:19700101T000000', 'TZOFFSETFROM:+0800', 'TZOFFSETTO:+0800', 'TZNAME:MYT', 'END:STANDARD', 'END:VTIMEZONE'];
    slots.filter(function (s) { return s.on; }).forEach(function (s) {
      var p = String(s.time || '09:00').split(':');
      var start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), +p[0] || 9, +p[1] || 0);
      var end = new Date(start.getTime() + 20 * 60000);
      var link = url + '#/sesi/' + s.id;
      lines.push('BEGIN:VEVENT',
        'UID:servis-emas-' + s.id + '@servis-emas',
        'DTSTAMP:' + stamp(now),
        'DTSTART;TZID=Asia/Kuala_Lumpur:' + fmtLocal(start),
        'DTEND;TZID=Asia/Kuala_Lumpur:' + fmtLocal(end),
        'RRULE:FREQ=WEEKLY;BYDAY=' + (active.length ? active.join(',') : 'MO,TU,WE,TH,FR,SA,SU'),
        'SUMMARY:Servis Emas — Sesi ' + s.name + ' (' + s.size + ' orang)',
        'DESCRIPTION:Buka app dan hantar mesej sesi ' + s.name + '. Semak juga hari jadi hari ini.\\n' + link,
        'URL:' + link,
        'BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:Masa untuk sesi ' + s.name, 'TRIGGER:PT0M', 'END:VALARM',
        'END:VEVENT');
    });
    lines.push('END:VCALENDAR');
    return lines.join('\r\n');
  };

  /* ================= Format WhatsApp → HTML (pratonton) ================= */
  C.escapeHtml = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  };
  C.waToHtml = function (text) {
    var h = C.escapeHtml(text);
    h = h.replace(/```([\s\S]+?)```/g, '<code>$1</code>');
    h = h.replace(/(^|[\s(>])\*([^*\n]+?)\*(?=[\s).,!?:;<]|$)/gm, '$1<b>$2</b>');
    h = h.replace(/(^|[\s(>])_([^_\n]+?)_(?=[\s).,!?:;<]|$)/gm, '$1<i>$2</i>');
    h = h.replace(/(^|[\s(>])~([^~\n]+?)~(?=[\s).,!?:;<]|$)/gm, '$1<s>$2</s>');
    return h.replace(/\n/g, '<br>');
  };

  root.SECore = C;
  if (typeof module !== 'undefined' && module.exports) module.exports = C;
})(typeof window !== 'undefined' ? window : globalThis);
