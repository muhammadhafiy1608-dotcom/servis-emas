/* Servis Emas — antara muka app */
(function () {
  'use strict';
  var C = window.SECore, X = window.SEXlsx, CONTENT = window.SE_CONTENT;
  var KEY = 'servisEmas.v1';
  var VERSION = '1.2.0';
  var esc = C.escapeHtml;
  var S = null;
  var idx = null;
  var ui = {
    route: ['hari-ini'], q: '', cf: 'semua', climit: 150,
    msgCat: 'semua', msgAge: 'semua', draft: null, draftFor: null, previewAs: '', previewNM: false,
    imp: null, bdayOff: {}, justDone: false, awaiting: null, pendingToast: '', renderDay: null, camp: null
  };

  /* ================= Ikon ================= */
  var P = {
    calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M8 3v4M16 3v4M3.5 10h17"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.3-5.5 6.5-5.5s5.9 1.9 6.5 5.5"/><path d="M16 4.6a3.3 3.3 0 0 1 0 6.6M18 14.8c2 .7 3.2 2.4 3.5 5.2"/>',
    chat: '<path d="M20 12a8 8 0 0 1-11.9 7L4 20l1.1-4A8 8 0 1 1 20 12z"/>',
    sliders: '<path d="M4 7h9M17.5 7H20M4 17h3.5M12 17h8"/><circle cx="15.3" cy="7" r="2.3"/><circle cx="9.8" cy="17" r="2.3"/>',
    send: '<path d="M21 3 10.5 13.5"/><path d="M21 3l-6.5 18-4-7.5L3 9.5z"/>',
    back: '<path d="M15 5l-7 7 7 7"/>',
    more: '<circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>',
    upload: '<path d="M12 15V4M7.5 8.5 12 4l4.5 4.5"/><path d="M4 15v3.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V15"/>',
    download: '<path d="M12 4v11M7.5 10.5 12 15l4.5-4.5"/><path d="M4 15v3.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V15"/>',
    cake: '<path d="M4 20h16M5 20v-6.5A1.5 1.5 0 0 1 6.5 12h11a1.5 1.5 0 0 1 1.5 1.5V20"/><path d="M5 15.5c1.2 1 2.3 1 3.5 0s2.3-1 3.5 0 2.3 1 3.5 0 2.3-1 3.5 0"/><path d="M12 12V8.5"/><path d="M12 4.5c.8.9 1 1.7 0 2.5-1-.8-.8-1.6 0-2.5z"/>',
    book: '<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5z"/><path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5z"/>',
    skip: '<path d="M6 6l8 6-8 6z"/><path d="M18 6v12"/>',
    stop: '<circle cx="12" cy="12" r="8.5"/><path d="M6 6l12 12"/>',
    edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
    trash: '<path d="M5 7h14M10 4h4M7 7l1 13h8l1-13"/>',
    share: '<path d="M12 3v12M8 7l4-4 4 4"/><path d="M5 12v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7"/>',
    up: '<path d="M12 19V5M6 11l6-6 6 6"/>',
    down: '<path d="M12 5v14M6 13l6 6 6-6"/>',
    top: '<path d="M5 4h14M12 20V9M6.5 14.5 12 9l5.5 5.5"/>',
    bottom: '<path d="M5 20h14M12 4v11M6.5 9.5 12 15l5.5-5.5"/>',
    shuffle: '<path d="M16 4h4v4M4 20 20 4M20 16v4h-4M14.5 14.5 20 20M4 4l5 5"/>',
    phone: '<rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M11 18.5h2"/>'
  };
  function icon(n, cls) { return '<svg class="ic' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" aria-hidden="true">' + (P[n] || '') + '</svg>'; }

  /* ================= Keadaan (state) ================= */
  function defaults() {
    return {
      myName: '', myPhone: '', signature: '– {nama_saya}',
      salam: 'Assalamualaikum', nonMuslimTag: 'Bukan Islam', salamNonMuslim: 'Salam sejahtera',
      honorific: 'umur', openers: CONTENT.openers.slice(), openersByAge: clone(CONTENT.openersByAge),
      stopText: 'Balas STOP jika tak mahu terima tips ini lagi.', stopEvery: 5,
      slots: [
        { id: 'pagi', name: 'Pagi', time: '09:00', size: 30, on: true },
        { id: 'petang', name: 'Petang', time: '16:00', size: 30, on: true },
        { id: 'malam', name: 'Malam', time: '20:30', size: 30, on: false }
      ],
      days: [1, 1, 1, 1, 1, 1, 1], minGapDays: 7, repeatAfterDays: 180,
      ageBounds: C.DEFAULT_BOUNDS.slice(), pauseJunior: true, mode: 'pilih', dailyLimit: 60, linkMode: 'auto', autoMark: true, lastBackup: 0
    };
  }
  function clone(x) { return JSON.parse(JSON.stringify(x)); }
  function fresh() {
    return {
      app: 'servis-emas', v: 1, created: Date.now(), settings: defaults(), customers: [],
      messages: clone(CONTENT.messages), bdays: clone(CONTENT.birthdays), batches: {}, campaigns: [],
      contentVersion: CONTENT.version, removed: [], seq: 0
    };
  }
  function migrate() {
    var d = defaults();
    S.settings = Object.assign(d, S.settings || {});
    if (!Array.isArray(S.settings.slots) || !S.settings.slots.length) S.settings.slots = d.slots;
    if (!Array.isArray(S.settings.days) || S.settings.days.length !== 7) S.settings.days = d.days;
    if (!Array.isArray(S.settings.ageBounds) || S.settings.ageBounds.length !== 4) S.settings.ageBounds = d.ageBounds;
    // v1.2: had umur ikut Category Excel pemilik (26/36/46/56) — hanya jika masih guna had lalai lama
    if (!S.settings.boundsV2) { if (String(S.settings.ageBounds) === String(C.OLD_BOUNDS)) S.settings.ageBounds = C.DEFAULT_BOUNDS.slice(); S.settings.boundsV2 = true; }
    if (!Array.isArray(S.settings.openers)) S.settings.openers = d.openers;
    if (!S.settings.openersByAge || typeof S.settings.openersByAge !== 'object') S.settings.openersByAge = d.openersByAge;
    ['customers', 'messages', 'bdays', 'removed'].forEach(function (k) { if (!Array.isArray(S[k])) S[k] = []; });
    S.batches = S.batches || {};
    S.campaigns = Array.isArray(S.campaigns) ? S.campaigns : [];
    if ((S.contentVersion || 0) < CONTENT.version) upgradeContent(S.contentVersion || 0);
    S.customers.forEach(function (c) { c.sent = c.sent || {}; c.tags = c.tags || []; c.bday = c.bday || {}; });
    C.pruneBatches(S, new Date());
    idx = null;
  }
  // Naik taraf pustaka lalai. Mesej lalai yang belum diubah diganti dengan versi
  // baharu (ID kekal, jadi sejarah hantar tak hilang). Mesej yang diubah atau
  // ditulis sendiri oleh pengguna dikekalkan pada kedudukannya.
  function upgradeContent(from) {
    var v1 = CONTENT.v1 || { m: {}, b: {}, openers: [] };
    var removed = S.removed || [];
    function untouched(item, map) {
      if (!item.builtin || item.edited) return false;
      if (from >= 2) return true;
      var h = map[item.id];
      return h != null && C.hash(item.body) === h;
    }
    var newIds = {}; CONTENT.messages.forEach(function (m) { newIds[m.id] = 1; });
    var before = {}; S.messages.forEach(function (m) { before[m.id] = 1; });
    var keep = {}, customs = [];
    S.messages.forEach(function (m, i) {
      if (untouched(m, v1.m)) return;
      if (m.builtin && newIds[m.id]) { m.edited = true; keep[m.id] = m; return; }
      customs.push({ m: m, i: i });
    });
    var list = [], added = 0;
    CONTENT.messages.forEach(function (m) {
      if (removed.indexOf(m.id) >= 0) return;
      if (keep[m.id]) { list.push(keep[m.id]); return; }
      if (!before[m.id]) added++;
      list.push(clone(m));
    });
    customs.forEach(function (x) { list.splice(Math.min(x.i, list.length), 0, x.m); });
    S.messages = list;
    var newB = {}; CONTENT.birthdays.forEach(function (b) { newB[b.id] = 1; });
    var keepB = {}, otherB = [];
    S.bdays.forEach(function (b) {
      if (untouched(b, v1.b)) return;
      if (b.builtin && newB[b.id]) { b.edited = true; keepB[b.id] = b; return; }
      otherB.push(b);
    });
    S.bdays = CONTENT.birthdays.filter(function (b) { return removed.indexOf(b.id) < 0; })
      .map(function (b) { return keepB[b.id] || clone(b); }).concat(otherB);
    if (from < 2) {
      if (JSON.stringify(S.settings.openers) === JSON.stringify(v1.openers)) S.settings.openers = CONTENT.openers.slice();
      if (S.settings.honorific === 'tuanpuan') S.settings.honorific = 'umur';
    }
    S.contentVersion = CONTENT.version;
    if (from > 0) ui.pendingToast = 'Pustaka dikemas kini: ' + S.messages.length + ' ilmu ringkas ikut umur' + (added ? ' (' + added + ' baharu)' : '') + '.';
  }
  function load() {
    var raw = null;
    try { raw = localStorage.getItem(KEY); } catch (e) { raw = null; }
    if (raw) { try { S = JSON.parse(raw); } catch (e) { S = null; } }
    if (!S || S.app !== 'servis-emas') S = fresh();
    migrate();
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); return true; } catch (e) {
      toast('Data tidak dapat disimpan — storan pelayar penuh atau disekat. Buat backup sekarang.', 'err');
      return false;
    }
  }
  function byId(id) {
    if (!idx) { idx = {}; S.customers.forEach(function (c) { idx[c.id] = c; }); }
    return idx[id];
  }
  function msgById(id) { return S.messages.filter(function (m) { return m.id === id; })[0] || null; }
  function now() { return new Date(); }
  function today() { return C.dayNum(new Date()); }
  function pang(c) { return C.panggilan(c, S.settings, now()); }
  function askPersist() { try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e) { /* abaikan */ } }

  /* ================= Utiliti UI ================= */
  function $(s, el) { return (el || document).querySelector(s); }
  function $$(s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); }
  var toastTimer = null;
  function toast(msg, kind, action) {
    var el = $('#toast');
    clearTimeout(toastTimer);
    el.innerHTML = '<div class="toast' + (kind === 'err' ? ' err' : '') + '"><span>' + esc(msg) + '</span>' +
      (action ? '<button type="button" data-act="toastAction">' + esc(action.label) + '</button>' : '') + '</div>';
    ui.toastAction = action ? action.fn : null;
    toastTimer = setTimeout(function () { el.innerHTML = ''; ui.toastAction = null; }, action ? 6000 : 3400);
  }
  function openSheet(html, label) {
    var root = $('#sheet-root');
    root.innerHTML = '<div class="sheet-backdrop" data-act="closeSheet"></div><div class="sheet" role="dialog" aria-modal="true" aria-label="' + esc(label || 'Pilihan') + '"><div class="sheet-grip"></div>' + html + '</div>';
    root.classList.add('open');
    var f = $('.sheet button, .sheet a', root);
    if (f) setTimeout(function () { try { f.focus({ preventScroll: true }); } catch (e) { f.focus(); } }, 30);
  }
  function closeSheet() { var r = $('#sheet-root'); r.classList.remove('open'); r.innerHTML = ''; ui.confirmFn = null; }
  function confirmBox(title, body, okLabel, danger) {
    return new Promise(function (resolve) {
      ui.confirmFn = function (ok) { closeSheet(); resolve(ok); };
      openSheet('<h3>' + esc(title) + '</h3>' + (body ? '<p class="muted">' + esc(body) + '</p>' : '') +
        '<div class="btn-row" style="margin-top:16px"><button class="btn" data-act="confirmNo">Batal</button>' +
        '<button class="btn ' + (danger ? 'danger' : 'primary') + '" data-act="confirmYes">' + esc(okLabel || 'Teruskan') + '</button></div>', title);
    });
  }
  function download(blob, name) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = name; a.rel = 'noopener';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
  }
  function go(path) { location.hash = '#/' + path; }
  function groupChip(c) {
    var g = C.viewGroup(c, S.settings, now());
    return '<span class="chip" data-g="' + (g || 'none') + '">' + esc(g ? C.groupLabel(g, S.settings.ageBounds, false) : 'Tiada umur') + '</span>' +
      (C.isProspect(c) ? '<span class="chip prospek">Tiada PG Code</span>' : '');
  }
  function initials(c) {
    var s = C.nameInfo(c.name).short || c.name || '?';
    return esc(s.charAt(0).toUpperCase());
  }

  /* ================= WhatsApp ================= */
  function isIOS() { return /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); }
  function isStandalone() { return window.navigator.standalone === true || (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches); }
  function isMobile() { return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); }
  function linkMode() {
    var m = S.settings.linkMode;
    if (m && m !== 'auto') return m;
    if (isIOS() && isStandalone()) return 'app';
    if (!isMobile()) return 'web';
    return 'wa';
  }
  function openWa(phone, text) {
    var mode = linkMode(), url = C.waLink(phone, text, mode);
    if (mode === 'web') window.open(url, 'whatsapp'); else location.href = url;
  }
  function prepLink(a, phone, text) {
    var mode = linkMode();
    a.href = C.waLink(phone, text, mode);
    if (mode === 'web') a.target = 'whatsapp'; else a.removeAttribute('target');
  }
  function broadcastText(c, m) { return C.composeBroadcast(c, m, S.settings, now()); }
  function nextMsg(c) { return C.nextMessage(c, S.messages, S.settings, today(), now()); }
  // Broadcast pilihan: slotId 'k:<id>' merujuk senarai broadcast; selain itu sesi biasa (pagi/petang)
  function campById(id) { return (S.campaigns || []).filter(function (k) { return k.id === id; })[0] || null; }
  function campOf(slotId) { return slotId && String(slotId).indexOf('k:') === 0 ? campById(String(slotId).slice(2)) : null; }
  function msgFor(c, slotId) { var k = campOf(slotId); return k ? msgById(k.msg) : nextMsg(c); }

  /* ================= Tindakan hantar ================= */
  function markSent(c, m, slotId) {
    var d = today();
    var rec = { m: m.id, t: Date.now(), prevLast: c.last == null ? null : c.last, prevSent: c.sent[m.id] == null ? null : c.sent[m.id] };
    var k = campOf(slotId);
    var b = k || (slotId ? C.ensureBatch(S, slotId, now()) : null); // ambil kumpulan SEBELUM tarikh hantar dikemas kini
    c.sent[m.id] = d; c.last = d;
    if (b) { b.done[c.id] = rec; delete b.skip[c.id]; }
    save();
    return rec;
  }
  function undoSent(c, slotId) {
    var b = campOf(slotId) || (S.batches[C.isoDay(now())] || {})[slotId];
    if (!b || !b.done[c.id]) return;
    var rec = b.done[c.id];
    if (rec.prevSent == null) delete c.sent[rec.m]; else c.sent[rec.m] = rec.prevSent;
    c.last = rec.prevLast;
    delete b.done[c.id];
    save();
  }

  /* ================= Penghala (router) ================= */
  function parseRoute() {
    var h = location.hash.replace(/^#\/?/, '');
    return h ? h.split('/').map(function (x) { return decodeURIComponent(x); }) : ['hari-ini'];
  }
  function render(keepScroll) {
    var y = window.scrollY;
    var r = parseRoute();
    ui.route = r;
    ui.renderDay = today();
    var out;
    try {
      switch (r[0]) {
        case 'sesi': out = viewSession(r[1]); break;
        case 'broadcast': out = r[1] === 'baru' ? viewCampaignNew() : viewCampaign(r[1]); break;
        case 'penyimpan': out = r[1] ? viewCustomer(r[1]) : viewCustomers(); break;
        case 'import': out = viewImport(); break;
        case 'mesej': out = r[1] ? viewMessageEdit(r[1]) : viewMessages(); break;
        case 'ucapan': out = r[1] ? viewBdayEdit(r[1]) : viewBdays(); break;
        case 'pembuka': out = viewOpeners(); break;
        case 'baca': out = viewRead(r[1]); break;
        case 'tetapan': out = viewSettings(); break;
        case 'panduan': out = viewGuide(); break;
        default: out = viewHome();
      }
    } catch (e) {
      console.error(e);
      out = { top: topBar('Ralat'), html: '<section class="card"><h2>Skrin ini gagal dipaparkan</h2><p class="muted">' + esc(e.message) + '</p><a class="btn primary" href="#/hari-ini">Ke Hari Ini</a></section>' };
    }
    var tb = $('#topbar');
    tb.className = out.hero ? 'tb-hero' : '';
    tb.innerHTML = out.top || '';
    $('#view').innerHTML = out.html;
    renderTabs(r[0]);
    if (keepScroll) window.scrollTo(0, y);
    if (out.after) out.after();
    if (ui.pendingToast) { var t = ui.pendingToast; ui.pendingToast = ''; toast(t); }
  }
  function renderTabs(r0) {
    var map = { 'hari-ini': 'hari-ini', sesi: 'hari-ini', broadcast: 'hari-ini', penyimpan: 'penyimpan', 'import': 'penyimpan', mesej: 'mesej', ucapan: 'mesej', pembuka: 'mesej', baca: 'mesej', tetapan: 'tetapan', panduan: 'tetapan' };
    var cur = map[r0] || 'hari-ini';
    var items = [['hari-ini', 'Hari Ini', 'calendar'], ['penyimpan', 'Penyimpan', 'users'], ['mesej', 'Mesej', 'chat'], ['tetapan', 'Tetapan', 'sliders']];
    $('#tabs').innerHTML = '<div class="tabs-in">' + items.map(function (t) {
      return '<a href="#/' + t[0] + '"' + (cur === t[0] ? ' aria-current="page"' : '') + '>' + icon(t[2]) + '<span>' + t[1] + '</span></a>';
    }).join('') + '</div>';
  }
  function topBar(title, o) {
    o = o || {};
    return '<div class="tb-bar">' + (o.back ? '<a class="icon-btn" href="' + o.back + '" aria-label="Kembali">' + icon('back') + '</a>' : '<span style="width:8px"></span>') +
      '<h1>' + esc(title) + '</h1>' + (o.right || '') + '</div>';
  }

  /* ================= HARI INI ================= */
  function viewHome() {
    var n = now(), s = S.settings;
    var greet = 'Selamat ' + C.waktu(n) + (s.myName ? ', ' + s.myName : '');
    var top = '<div class="hero"><p class="hero-date">' + esc(C.fmtDate(n)) + '</p><h1>' + esc(greet) + '</h1>' +
      (S.customers.length ? '<p class="hero-sub">' + heroSub(n) + '</p>' : '') + '</div>';
    var h = '';
    if (hasDemo()) h += '<div class="banner"><p>Anda sedang guna <b>data contoh</b>. Butang Hantar tidak membuka WhatsApp.</p><button class="btn sm" data-act="clearDemo">Padam contoh</button></div>';
    if (!S.customers.length) h += onboarding();
    else if (!s.myName) h += '<div class="banner"><p>Isi nama anda supaya setiap mesej ada tandatangan.</p><a class="btn sm" href="#/tetapan">Isi nama</a></div>';
    if (S.customers.length) {
      h += birthdayCard(n);
      h += s.mode === 'auto' ? sessionsBlock(n) : campaignsBlock(n);
      h += overviewCard(n);
      if (needsBackup()) h += '<div class="banner"><p>' + backupMsg() + '</p><button class="btn sm" data-act="backup">Backup</button></div>';
      var low = C.scriptsLow(C.scriptStats(S, n));
      if (low.length) h += '<div class="banner"><p><b>Skrip ' + esc(low.map(function (g) { return C.groupLabel(g, s.ageBounds, false); }).join(', ')) + ' hampir habis.</b> Lebih ' + Math.round(C.SCRIPT_LOW * 100) + '% penyimpan dah terima semua skrip kategori ini. Minta set skrip baharu.</p><a class="btn sm" href="#/mesej">Lihat</a></div>';
    }
    return { hero: true, top: top, html: h };
  }
  function heroSub(n) {
    var key = C.isoDay(n), b = S.batches[key] || {}, done = 0, total = 0;
    S.settings.slots.forEach(function (sl) { if (sl.on && b[sl.id]) { var bi = batchInfo(b[sl.id]); total += bi.total; done += bi.done; } });
    var bd = S.customers.filter(function (c) { return c.dob && C.isBirthday(c.dob, n); }).length;
    var parts = [];
    if (total) parts.push(done + ' mesej dihantar hari ini');
    if (bd) parts.push(bd + ' hari jadi hari ini');
    if (!parts.length) parts.push(S.customers.length + ' penyimpan menunggu tips anda');
    return esc(parts.join(', '));
  }
  function onboarding() {
    var s = S.settings;
    return '<section class="card"><h2>Mula di sini</h2><ol class="steps">' +
      '<li class="' + (s.myName ? 'done' : '') + '"><div><b>Isi nama anda</b><span class="muted small">Untuk tandatangan setiap mesej.</span><br><a class="btn sm" href="#/tetapan">Buka Tetapan</a></div></li>' +
      '<li><div><b>Masukkan senarai penyimpan</b><span class="muted small">Fail Excel/CSV, atau salin & tampal dari Google Sheets. Tarikh lahir atau No. IC membolehkan mesej ikut umur.</span><br><a class="btn sm primary" href="#/import">' + icon('upload') + 'Import senarai</a></div></li>' +
      '<li><div><b>Hantar sesi pagi & petang</b><span class="muted small">30 orang setiap sesi. Tekan Hantar, WhatsApp buka dengan mesej siap ditulis.</span></div></li>' +
      '</ol><p class="small muted">Nak cuba dulu tanpa data sebenar? <button class="linkish" data-act="demo">Guna data contoh</button></p></section>';
  }
  function hasDemo() { return S.customers.some(function (c) { return c.demo; }); }
  function needsBackup() {
    if (!S.customers.length || hasDemo()) return false;
    var last = S.settings.lastBackup || 0;
    return Date.now() - last > 7 * 86400000;
  }
  function backupMsg() {
    var last = S.settings.lastBackup;
    if (!last) return 'Data anda hanya disimpan dalam peranti ini. Buat backup supaya tak hilang.';
    return 'Backup terakhir ' + C.daysAgo(Math.floor((Date.now() - last) / 86400000)) + '. Buat backup baharu.';
  }

  function birthdayCard(n) {
    var year = n.getFullYear();
    var todayList = S.customers.filter(function (c) { return c.dob && C.isBirthday(c.dob, n) && !C.paused(c, S.settings, n); });
    var up = [];
    S.customers.forEach(function (c) {
      if (!c.dob || C.paused(c, S.settings, n)) return;
      var d = C.daysToBirthday(c.dob, n);
      if (d != null && d >= 1 && d <= 7) up.push({ c: c, d: d });
    });
    up.sort(function (a, b) { return a.d - b.d; });
    var h = '<section class="card"><div class="card-head"><h2>Hari jadi hari ini</h2><span class="count-pill">' + todayList.length + '</span></div>';
    if (!todayList.length) h += '<p class="empty">Tiada hari jadi hari ini.</p>';
    else {
      h += '<ul class="bday-list">' + todayList.map(function (c) {
        var age = C.ageOf(c, n);
        var wished = c.bday && c.bday[year];
        return '<li><span class="avatar" data-g="' + (C.viewGroup(c, S.settings, n) || 'none') + '">' + initials(c) + '</span>' +
          '<div class="who"><b>' + esc(pang(c)) + '</b><span>' + (age != null ? 'Genap ' + age + ' tahun' : esc(C.displayName(c.name))) + (c.optOut ? ' (minta STOP)' : '') + '</span></div>' +
          (wished ? '<span class="wished">' + icon('check') + C.fmtClock(wished) + '</span><button class="icon-btn" data-act="bday" data-cid="' + c.id + '" aria-label="Hantar lagi">' + icon('more') + '</button>'
            : '<button class="btn send sm" data-act="bday" data-cid="' + c.id + '">' + icon('cake') + 'Ucap</button>') + '</li>';
      }).join('') + '</ul>';
    }
    if (up.length) {
      var names = up.slice(0, 5).map(function (x) {
        var when = x.d === 1 ? 'esok' : C.HARI[C.dayToDate(C.dayNum(n) + x.d).getDay()];
        return '<b>' + esc(pang(x.c)) + '</b> (' + when + ')';
      });
      h += '<p class="upcoming">Minggu ini: ' + names.join(', ') + (up.length > 5 ? ' dan ' + (up.length - 5) + ' lagi' : '') + '</p>';
    }
    return h + '</section>';
  }

  function batchInfo(b) {
    var ids = b.ids.filter(function (id) { return byId(id) && !b.skip[id]; });
    return { total: ids.length, done: ids.filter(function (id) { return b.done[id]; }).length };
  }
  function currentSlotId(n) {
    var mins = n.getHours() * 60 + n.getMinutes(), cur = null;
    var on = S.settings.slots.filter(function (s) { return s.on; });
    on.forEach(function (s) { var p = String(s.time).split(':'); if (mins >= (+p[0]) * 60 + (+p[1] || 0) - 30) cur = s.id; });
    return cur || (on[0] && on[0].id);
  }
  function sessionsBlock(n) {
    var s = S.settings, key = C.isoDay(n);
    var on = s.slots.filter(function (x) { return x.on; });
    if (!on.length) return '<section class="card"><h2>Tiada sesi aktif</h2><p class="muted">Hidupkan sekurang-kurangnya satu sesi dalam Tetapan.</p><a class="btn sm" href="#/tetapan">Buka Tetapan</a></section>';
    var activeDay = !!s.days[n.getDay()];
    var dayBatches = S.batches[key] || {};
    if (!activeDay && !Object.keys(dayBatches).length) {
      return '<section class="card"><h2>Hari ini hari rehat</h2><p class="muted">Tiada sesi broadcast dijadualkan pada hari ' + C.HARI[n.getDay()] + '. Ubah hari aktif dalam Tetapan.</p>' +
        '<a class="btn sm" href="#/sesi/' + on[0].id + '">Buka sesi juga</a></section>';
    }
    var changed = false;
    on.forEach(function (slot) { if (dayBatches[slot.id]) { C.ensureBatch(S, slot.id, n); changed = true; } });
    if (changed) save();
    var pool = C.eligiblePool(S, C.takenToday(S, key), n).length;
    var cur = currentSlotId(n);
    return on.map(function (slot) {
      var b = dayBatches[slot.id];
      var bi = b ? batchInfo(b) : null;
      var total = b ? bi.total : Math.min(+slot.size || 30, pool);
      var done = b ? bi.done : 0;
      if (!b) pool = Math.max(0, pool - total);
      var isNow = slot.id === cur && (!b || done < total);
      var label, meta;
      if (b && total && done >= total) { label = 'Lihat sesi'; meta = 'Selesai. ' + done + ' mesej dihantar.'; }
      else if (b) { label = 'Teruskan sesi'; meta = done + ' daripada ' + total + ' dihantar'; }
      else if (total) { label = 'Mula sesi ' + slot.name.toLowerCase(); meta = total + ' orang menunggu'; }
      else { label = 'Lihat sebab'; meta = 'Tiada penyimpan untuk sesi ini'; }
      return '<section class="card session' + (isNow ? ' is-now' : '') + (b && total && done >= total ? ' done-all' : '') + '">' +
        '<div class="card-head"><h2>Sesi ' + esc(slot.name) + (isNow ? '<span class="now-tag">sekarang</span>' : '') + '</h2><span class="time">' + C.fmtTime(slot.time) + '</span></div>' +
        ingot(done, total || +slot.size || 30, false) +
        '<p class="meta">' + esc(meta) + '</p>' +
        '<a class="btn ' + (isNow ? 'primary' : '') + ' block" href="#/sesi/' + slot.id + '">' + esc(label) + '</a></section>';
    }).join('');
  }
  function ingot(done, total, just) {
    total = Math.max(0, total || 0);
    var label = done + ' daripada ' + total + ' dihantar';
    if (!total || total > 60) {
      var pct = total ? Math.round(done / total * 100) : 0;
      return '<div class="ingot" role="img" aria-label="' + label + '"><div class="ingot-bar"><span style="width:' + pct + '%"></span></div></div>';
    }
    var h = '';
    for (var i = 0; i < total; i++) h += '<i' + (i < done ? (just && i === done - 1 ? ' class="on just"' : ' class="on"') : '') + '></i>';
    return '<div class="ingot" role="img" aria-label="' + label + '"><div class="notches">' + h + '</div></div>';
  }
  function overviewCard(n) {
    var s = S.settings, counts = { junior: 0, muda: 0, dewasa: 0, pertengahan: 0, matang: 0, warga: 0, none: 0 }, stop = 0, active = 0, junior = 0, shared = 0;
    var prim = C.primaryIds(S.customers, s, n), perPhone = {}, prospects = S.customers.filter(C.isProspect).length;
    S.customers.forEach(function (c) {
      counts[C.viewGroup(c, s, n) || 'none']++;
      if (c.phone) perPhone[c.phone] = (perPhone[c.phone] || 0) + 1;
      if (c.optOut) stop++; else if (C.paused(c, s, n)) junior++; else if (prim[c.id] && C.phoneOk(c.phone)) active++;
    });
    Object.keys(perPhone).forEach(function (p) { if (perPhone[p] > 1) shared += perPhone[p]; });
    var total = S.customers.length;
    var perDay = s.slots.filter(function (x) { return x.on; }).reduce(function (a, x) { return a + (+x.size || 0); }, 0) * (s.days.filter(Boolean).length / 7);
    var cycle = perDay > 0 ? Math.max(s.minGapDays, Math.ceil(active / perDay)) : null;
    var order = ['junior', 'muda', 'dewasa', 'pertengahan', 'matang', 'warga'];
    var dist = order.concat(['none']).map(function (g) { return counts[g] ? '<span class="' + g + '" style="width:' + (counts[g] / total * 100).toFixed(2) + '%"></span>' : ''; }).join('');
    var legend = order.map(function (g) {
      return '<li><span class="sw" style="background:var(--g-' + g + ')"></span><span class="lg-l">' + esc(C.groupLabel(g, s.ageBounds, false)) + '<small>' + esc(C.groupRange(g, s.ageBounds)) + ' tahun</small></span><b>' + counts[g] + '</b></li>';
    }).join('') + '<li><span class="sw" style="background:var(--g-none);opacity:.55"></span><span class="lg-l">Tiada umur<small>tiada tarikh lahir</small></span><b>' + counts.none + '</b></li>';
    return '<section class="card"><div class="card-head"><h2>Penyimpan anda</h2><a class="linkish" href="#/penyimpan" data-act="setFilter" data-f="semua">Lihat semua</a></div>' +
      '<div class="stat-line"><span class="big-num">' + total + '</span><span class="muted">penyimpan' + (cycle ? '. Setiap seorang terima tips lebih kurang setiap ' + cycle + ' hari.' : '.') + '</span></div>' +
      '<div class="dist" aria-hidden="true">' + dist + '</div><ul class="legend">' + legend + '</ul>' +
      (counts.none ? '<p class="small muted" style="margin-top:12px">' + counts.none + ' orang tiada tarikh lahir, jadi mereka terima mesej umum sahaja. <a class="linkish" href="#/penyimpan" data-act="setFilter" data-f="tiada">Lengkapkan</a></p>' : '') +
      (stop ? '<p class="small muted">' + stop + ' orang minta berhenti (STOP) dan tidak dihantar mesej.</p>' : '') +
      (prospects ? '<p class="small muted" style="margin-top:10px">' + prospects + ' bakal pelanggan (tiada PG Code). <a class="linkish" href="#/penyimpan" data-act="setFilter" data-f="prospek">Lihat</a></p>' : '') +
      (junior ? '<p class="small muted" style="margin-top:10px">' + junior + ' akaun Junior (bawah ' + C.JUNIOR_AGE + ' tahun) ditangguh. <a class="linkish" href="#/tetapan">Ubah</a></p>' : '') +
      (shared ? '<p class="small muted" style="margin-top:10px">' + shared + ' orang berkongsi nombor dengan ahli keluarga. Setiap nombor terima satu mesej sahaja.</p>' : '') + '</section>';
  }

  /* ================= BROADCAST PILIHAN ================= */
  // Pemilik pilih skrip & penerima dahulu; app hanya bawa ke penerima seterusnya selepas setiap Hantar.
  function campStats(k) {
    var done = Object.keys(k.done).length, pending = C.campaignPending(S, k).length;
    return { done: done, pending: pending, total: done + pending };
  }
  function filterSummary(f) {
    var parts = [];
    parts.push(f.status === 'prospek' ? 'Tiada PG Code' : f.status === 'penyimpan' ? 'Ada PG Code' : 'Semua status');
    parts.push(f.groups && f.groups.length ? f.groups.map(function (g) { return g === 'tiada' ? 'Tiada umur' : C.groupLabel(g, S.settings.ageBounds, false); }).join(', ') : 'Semua kategori');
    if (f.tags && f.tags.length) parts.push(f.tags.join(', '));
    return parts.join(' · ');
  }
  function campaignsBlock(n) {
    var list = S.campaigns || [], sent = C.sentToday(S, n), lim = +S.settings.dailyLimit || 0;
    var active = list.filter(function (k) { return campStats(k).pending > 0; });
    var finished = list.filter(function (k) { return campStats(k).pending === 0; }).slice(0, 3);
    var h = '<section class="card"><div class="card-head"><h2>Broadcast</h2><span class="time">' + sent + (lim ? '/' + lim : '') + ' hari ini</span></div>' +
      '<p class="muted small" style="margin:0 0 12px">Anda pilih skrip dan penerima. App bawa anda dari seorang ke seorang; WhatsApp buka dengan mesej siap ditulis.</p>' +
      '<a class="btn primary block" href="#/broadcast/baru">' + icon('plus') + 'Sediakan broadcast</a></section>';
    h += active.map(function (k) {
      var st = campStats(k);
      return '<section class="card session"><div class="card-head"><h2>' + esc(k.title) + '</h2><span class="time">' + st.done + '/' + st.total + '</span></div>' +
        ingot(st.done, st.total, false) + '<p class="meta">' + esc(filterSummary(k.filter || {})) + '. Baki ' + st.pending + ' orang.</p>' +
        '<a class="btn block" href="#/broadcast/' + k.id + '">' + (st.done ? 'Teruskan' : 'Mula hantar') + '</a></section>';
    }).join('');
    if (finished.length) h += '<h3 class="sub-h">Broadcast selesai</h3><ul class="dlist">' + finished.map(function (k) {
      return '<li><span class="tick">' + icon('check') + '</span><div class="who"><b><a href="#/broadcast/' + k.id + '">' + esc(k.title) + '</a></b><span>' + campStats(k).done + ' dihantar</span></div></li>';
    }).join('') + '</ul>';
    return h;
  }
  function campDraft() {
    if (!ui.camp) ui.camp = { msg: '', groups: [], status: 'semua', tags: [], skipReceived: true };
    return ui.camp;
  }
  function msgOptions(cur) {
    var groups = [
      ['Skrip bakal pelanggan (tiada PG Code)', function (m) { return m.aud === 'prospek'; }],
      ['Skrip ikut kategori (MB30, CX, CY, CZ, Pencen)', function (m) { return m.src && m.aud !== 'prospek'; }],
      ['Mesej lain dalam pustaka', function (m) { return !m.src && m.aud !== 'prospek'; }]
    ];
    return '<option value="">Pilih skrip…</option>' + groups.map(function (g) {
      var list = S.messages.filter(function (m) { return m.on !== false && g[1](m); });
      return list.length ? '<optgroup label="' + esc(g[0]) + '">' + list.map(function (m) {
        var who = m.ages && m.ages.length ? ' (' + m.ages.map(function (x) { return C.groupLabel(x, S.settings.ageBounds, false); }).join(', ') + ')' : '';
        return '<option value="' + esc(m.id) + '"' + (cur === m.id ? ' selected' : '') + '>' + esc(m.id + ' · ' + m.title + who) + '</option>';
      }).join('') + '</optgroup>' : '';
    }).join('');
  }
  function viewCampaignNew() {
    var d = campDraft(), n = now(), s = S.settings, m = d.msg ? msgById(d.msg) : null;
    var top = topBar('Sediakan broadcast', { back: '#/hari-ini' });
    var statusT = [['semua', 'Semua'], ['penyimpan', 'Ada PG Code'], ['prospek', 'Tiada PG Code']].map(function (x) {
      return '<button type="button" data-act="campStatus" data-v="' + x[0] + '" aria-pressed="' + (d.status === x[0]) + '">' + x[1] + '</button>';
    }).join('');
    var gl = ['junior'].concat(C.AGE_GROUPS.map(function (g) { return g.id; })).concat(['tiada']);
    var groupT = '<button type="button" data-act="campGroup" data-g="" aria-pressed="' + (!d.groups.length) + '">Semua</button>' + gl.map(function (g) {
      return '<button type="button" data-act="campGroup" data-g="' + g + '" aria-pressed="' + (d.groups.indexOf(g) >= 0) + '">' + esc(g === 'tiada' ? 'Tiada umur' : C.groupLabel(g, s.ageBounds, false)) + '</button>';
    }).join('');
    var allTags = {};
    S.customers.forEach(function (c) { (c.tags || []).forEach(function (t) { allTags[t] = 1; }); });
    var tagT = Object.keys(allTags).sort().slice(0, 30).map(function (t) {
      return '<button type="button" data-act="campTag" data-t="' + esc(t) + '" aria-pressed="' + (d.tags.indexOf(t) >= 0) + '">' + esc(t) + '</button>';
    }).join('');
    var p = C.campaignPreview(S, m, d, n), w = p.why;
    var why = [[w.stop, 'minta STOP'], [w.telefon, 'tiada nombor sah'], [w.junior, 'akaun Junior (ditangguh)'], [w.islamik, 'kumpulan bukan Islam (skrip Islamik)'],
      [w.sasaran, m && m.aud === 'prospek' ? 'dah ada PG Code (skrip khas bakal pelanggan)' : 'tiada PG Code (skrip khas penyimpan)'], [w.diterima, 'dah terima skrip ini'], [w.pendua, 'berkongsi nombor (dihantar sekali)']]
      .filter(function (x) { return x[0]; }).map(function (x) { return '<li>' + x[0] + ' ' + esc(x[1]) + '</li>'; }).join('');
    var first = p.ids.slice(0, 3).map(byId).filter(Boolean);
    var sample = first[0] || sampleCustomer('dewasa');
    var h = '<section class="card"><h2 style="margin-bottom:12px">1. Pilih skrip</h2>' +
      '<label class="field"><span class="sr">Skrip</span><select data-change="campMsg">' + msgOptions(d.msg) + '</select></label>' +
      (m ? '<div class="bubble">' + C.waToHtml(broadcastText(sample, m)) + '</div><p class="small muted" style="margin-top:6px">Contoh untuk ' + esc(pang(sample)) + '. Nama, gelaran dan sapaan ikut setiap penerima.</p>' : '<p class="muted small">Pilih skrip untuk lihat pratonton.</p>') +
      '</section>' +
      '<section class="card"><h2 style="margin-bottom:12px">2. Pilih penerima</h2>' +
      '<fieldset class="field"><legend>Status pembelian</legend><div class="toggles">' + statusT + '</div></fieldset>' +
      '<fieldset class="field"><legend>Kategori umur</legend><div class="toggles">' + groupT + '</div></fieldset>' +
      (tagT ? '<fieldset class="field"><legend>Kumpulan (pilihan)</legend><div class="toggles">' + tagT + '</div></fieldset>' : '') +
      '<label class="switch"><input type="checkbox" data-change="campSkipRecv"' + (d.skipReceived !== false ? ' checked' : '') + '><span class="sw-text"><b>Langkau yang dah terima skrip ini</b><small>Supaya tiada siapa terima skrip yang sama dua kali.</small></span></label></section>' +
      '<section class="card"><h2>3. Semakan</h2><p style="margin-top:8px"><span class="big-num">' + p.ids.length + '</span> <span class="muted">penerima' + (first.length ? ': ' + esc(first.map(pang).join(', ')) + (p.ids.length > 3 ? ' dan lain-lain' : '') : '') + '</span></p>' +
      (why ? '<p class="small muted" style="margin:10px 0 4px">Tidak dimasukkan:</p><ul class="problems">' + why + '</ul>' : '') +
      (S.settings.dailyLimit ? '<p class="small muted" style="margin-top:10px">Cadangan had: ' + S.settings.dailyLimit + ' mesej sehari, supaya nombor anda tidak disekat. Broadcast besar boleh disambung esok.</p>' : '') +
      '<div class="btn-row" style="margin-top:14px"><button class="btn primary" data-act="campCreate"' + (m && p.ids.length ? '' : ' disabled') + '>Sediakan broadcast (' + p.ids.length + ' orang)</button></div></section>';
    return { top: top, html: h };
  }
  function viewCampaign(id) {
    var k = campById(id), n = now();
    if (!k) return { top: topBar('Broadcast', { back: '#/hari-ini' }), html: '<section class="card"><h2>Broadcast tidak dijumpai</h2><a class="btn" href="#/hari-ini">Ke Hari Ini</a></section>' };
    var slotId = 'k:' + k.id, m = msgById(k.msg);
    var pending = C.campaignPending(S, k).map(byId).filter(Boolean);
    var done = Object.keys(k.done).map(byId).filter(Boolean).sort(function (x, y) { return k.done[y.id].t - k.done[x.id].t; });
    var total = done.length + pending.length, sent = C.sentToday(S, n), lim = +S.settings.dailyLimit || 0;
    var top = topBar('Broadcast', { back: '#/hari-ini', right: '<span class="tb-count">' + done.length + '/' + total + '&nbsp;</span>' });
    var h = '<div class="session-head">' + ingot(done.length, total, ui.justDone) + '<p>' + esc(k.title) + ' · ' + esc(filterSummary(k.filter || {})) + '</p></div>';
    ui.justDone = false;
    if (!m) h += '<section class="card"><h2>Skrip tidak dijumpai</h2><p class="muted">Skrip untuk broadcast ini telah dipadam.</p></section>';
    else if (pending.length) {
      if (lim && sent >= lim) h += '<div class="banner warn"><p>Hari ini dah ' + sent + ' mesej (cadangan had ' + lim + '). Elok sambung esok supaya nombor anda tidak disekat.</p></div>';
      h += focusCard(pending[0], slotId);
      if (pending.length > 1) {
        h += '<h3 class="sub-h">Giliran seterusnya (' + (pending.length - 1) + ')</h3><ol class="qlist">' + pending.slice(1, 31).map(function (c, i) {
          return '<li><span class="qnum">' + (done.length + i + 2) + '</span><div class="who"><b>' + esc(pang(c)) + '</b><span>' + esc(C.fmtPhone(c.phone)) + '</span></div>' + sendLink(c, slotId, true) + '</li>';
        }).join('') + '</ol>' + (pending.length > 31 ? '<p class="hint">dan ' + (pending.length - 31) + ' orang lagi.</p>' : '');
      }
    } else {
      h += '<section class="card finish"><h2>Broadcast selesai</h2><p class="muted">' + done.length + ' mesej dihantar.</p><a class="btn primary" href="#/broadcast/baru">Sediakan broadcast lain</a></section>';
    }
    if (done.length) {
      h += '<h3 class="sub-h">Dah dihantar</h3><ul class="dlist">' + done.slice(0, 30).map(function (c) {
        var rec = k.done[c.id];
        return '<li><span class="tick">' + icon('check') + '</span><div class="who"><b>' + esc(pang(c)) + '</b><span>' + esc(C.fmtShort(new Date(rec.t))) + ' ' + C.fmtClock(rec.t) + '</span></div>' +
          '<button class="linkish" data-act="undo" data-cid="' + c.id + '" data-slot="' + slotId + '">Batal</button></li>';
      }).join('') + '</ul>';
    }
    h += '<p style="text-align:center;margin:18px 0 8px"><button class="btn danger sm" data-act="campDelete" data-id="' + k.id + '">' + icon('trash') + 'Padam broadcast ini</button></p>';
    return { top: top, html: h };
  }

  /* ================= SESI ================= */
  function viewSession(slotId) {
    var s = S.settings, slot = s.slots.filter(function (x) { return x.id === slotId; })[0];
    if (!slot) return { top: topBar('Sesi', { back: '#/hari-ini' }), html: '<section class="card"><h2>Sesi tidak dijumpai</h2><a class="btn" href="#/hari-ini">Ke Hari Ini</a></section>' };
    var n = now();
    var b = C.ensureBatch(S, slotId, n);
    save();
    var people = b.ids.filter(function (id) { return !b.skip[id]; }).map(byId).filter(Boolean);
    var pending = people.filter(function (c) { return !b.done[c.id]; });
    var done = people.filter(function (c) { return b.done[c.id]; }).sort(function (x, y) { return b.done[y.id].t - b.done[x.id].t; });
    var total = people.length;
    var top = topBar('Sesi ' + slot.name, { back: '#/hari-ini', right: '<span class="tb-count">' + done.length + '/' + total + '&nbsp;</span>' });
    var help = !done.length && pending.length
      ? 'Tekan Hantar dan WhatsApp akan buka dengan mesej siap ditulis. Tekan hantar di WhatsApp, kemudian kembali ke sini.'
      : pending.length ? 'Baki ' + pending.length + ' orang lagi.' : '';
    var h = '<div class="session-head">' + ingot(done.length, total, ui.justDone) + (help ? '<p>' + help + '</p>' : '') + '</div>';
    ui.justDone = false;
    if (!total) h += emptySession();
    else if (pending.length) {
      h += focusCard(pending[0], slotId);
      if (pending.length > 1) {
        h += '<h3 class="sub-h">Giliran seterusnya</h3><ol class="qlist">' + pending.slice(1).map(function (c, i) {
          var m = nextMsg(c);
          return '<li><span class="qnum">' + (done.length + i + 2) + '</span><div class="who"><b>' + esc(pang(c)) + '</b><span>' + esc(m ? m.title : 'Tiada mesej sesuai') + '</span></div>' +
            (m ? sendLink(c, slotId, true) : '') + '</li>';
        }).join('') + '</ol>';
      }
    } else {
      var nextSlot = s.slots.filter(function (x) { return x.on && x.time > slot.time; })[0];
      h += '<section class="card finish"><h2>Sesi ' + esc(slot.name.toLowerCase()) + ' selesai</h2><p class="muted">' + done.length + ' mesej dihantar. ' +
        (nextSlot ? 'Sesi seterusnya: ' + esc(nextSlot.name) + ', ' + C.fmtTime(nextSlot.time) + '.' : 'Jumpa esok.') + '</p><a class="btn primary" href="#/hari-ini">Ke Hari Ini</a></section>';
    }
    var more = C.eligiblePool(S, C.takenToday(S, C.isoDay(n)), n).length;
    if (total && more > 0) h += '<p style="text-align:center;margin:4px 0 6px"><button class="linkish" data-act="topup" data-slot="' + slotId + '">Tambah ' + Math.min(10, more) + ' orang lagi ke sesi ini</button></p>';
    if (done.length) {
      h += '<h3 class="sub-h">Dah dihantar</h3><ul class="dlist">' + done.map(function (c) {
        var rec = b.done[c.id], m = msgById(rec.m);
        return '<li><span class="tick">' + icon('check') + '</span><div class="who"><b>' + esc(pang(c)) + '</b><span>' + esc(m ? m.title : rec.m) + '</span></div>' +
          '<span class="muted small">' + C.fmtClock(rec.t) + '</span><button class="linkish" data-act="undo" data-cid="' + c.id + '" data-slot="' + slotId + '">Batal</button></li>';
      }).join('') + '</ul>';
    }
    return { top: top, html: h };
  }
  function sendLink(c, slotId, small) {
    var m = msgFor(c, slotId);
    var href = m ? C.waLink(c.phone, broadcastText(c, m), linkMode()) : '#';
    return '<a class="btn send' + (small ? ' sm' : ' big') + '" href="' + esc(href) + '" data-act="send" data-cid="' + c.id + '" data-slot="' + (slotId || '') + '">' + icon('send') + (small ? 'Hantar' : 'Hantar WhatsApp') + '</a>';
  }
  function focusCard(c, slotId) {
    var m = msgFor(c, slotId), n = now();
    if (!m) {
      return '<article class="focus"><h2 class="focus-name">' + esc(pang(c)) + '</h2><p class="muted">Tiada mesej yang sesuai untuk penyimpan ini sekarang.</p><button class="btn" data-act="skip" data-cid="' + c.id + '" data-slot="' + slotId + '">Langkau</button></article>';
    }
    var text = broadcastText(c, m);
    var awaiting = ui.awaiting && ui.awaiting.cid === c.id;
    return '<article class="focus arrive" data-cid="' + c.id + '">' +
      '<h2 class="focus-name">' + esc(pang(c)) + '</h2>' +
      '<p class="focus-meta"><span>' + esc(C.displayName(c.name)) + '</span><span>' + esc(C.fmtPhone(c.phone)) + '</span></p>' +
      '<div class="chips">' + groupChip(c) + '<span class="chip gold"><span class="dot ' + m.cat + '"></span>' + esc(m.title) + '</span></div>' +
      '<div class="bubble clamp" id="fbubble">' + C.waToHtml(text) + '</div>' +
      '<button class="linkish" data-act="expand">Lihat mesej penuh</button>' +
      (awaiting ? '<div class="confirm-row"><p>Dah tekan hantar di WhatsApp?</p><button class="btn sm send" data-act="confirmSent" data-cid="' + c.id + '" data-slot="' + slotId + '">Ya, dah</button><button class="btn sm" data-act="notSent">Belum</button></div>' : '') +
      '<div class="focus-actions">' + sendLink(c, slotId, false) +
      '<button class="icon-btn" data-act="personMenu" data-cid="' + c.id + '" data-slot="' + slotId + '" aria-label="Pilihan lain untuk ' + esc(pang(c)) + '">' + icon('more') + '</button></div>' +
      '</article>';
  }
  function emptySession() {
    var ctx = C.makeCtx(S, now()), why = { stop: 0, telefon: 0, junior: 0, pendua: 0, harijadi: 0, jarak: 0, habis: 0 };
    var taken = C.takenToday(S, C.isoDay(now()));
    S.customers.forEach(function (c) { var r = C.blockReason(c, ctx); if (r) why[r]++; });
    var lines = [];
    if (!S.customers.length) lines.push('Belum ada penyimpan. Import senarai dulu.');
    if (why.jarak) lines.push(why.jarak + ' orang dah terima mesej dalam ' + S.settings.minGapDays + ' hari lepas.');
    if (why.habis) lines.push(why.habis + ' orang dah terima semua mesej dalam pustaka. Tambah mesej baharu atau hidupkan ulangan dalam Tetapan.');
    if (Object.keys(taken).length) lines.push(Object.keys(taken).length + ' orang dah dimasukkan dalam sesi lain hari ini.');
    if (why.stop) lines.push(why.stop + ' orang minta STOP.');
    if (why.telefon) lines.push(why.telefon + ' orang tiada nombor telefon yang sah.');
    if (why.junior) lines.push(why.junior + ' akaun Junior ditangguh (Tetapan → Kumpulan umur).');
    if (why.pendua) lines.push(why.pendua + ' rekod berkongsi nombor dengan penyimpan lain (dihantar sekali sahaja).');
    if (why.harijadi) lines.push(why.harijadi + ' orang berhari jadi hari ini. Ucap hari jadi mereka di skrin Hari Ini.');
    return '<section class="card"><h2>Tiada penyimpan untuk sesi ini</h2><ul class="problems">' + lines.map(function (l) { return '<li>' + esc(l) + '</li>'; }).join('') + '</ul></section>';
  }

  /* ================= PENYIMPAN ================= */
  var FILTERS = [
    { id: 'semua', label: 'Semua' }, { id: 'junior', label: 'Junior' }, { id: 'muda', label: 'MB30' }, { id: 'dewasa', label: 'CX' }, { id: 'pertengahan', label: 'CY' },
    { id: 'matang', label: 'CZ' }, { id: 'warga', label: 'Pencen' }, { id: 'tiada', label: 'Tiada umur' }, { id: 'prospek', label: 'Tiada PG Code' },
    { id: 'harijadi', label: 'Hari jadi bulan ini' }, { id: 'stop', label: 'STOP' }
  ];
  function matchFilter(c, f, n) {
    if (f === 'semua') return true;
    if (f === 'stop') return !!c.optOut;
    if (f === 'prospek') return C.isProspect(c);
    if (f === 'harijadi') { var p = C.dobParts(c.dob); return !!p && p.m === n.getMonth() + 1; }
    var g = C.viewGroup(c, S.settings, n);
    if (f === 'tiada') return !g;
    return g === f;
  }
  function viewCustomers() {
    var n = now();
    var top = topBar('Penyimpan', { right: '<a class="tb-action" href="#/import">' + icon('upload') + 'Import</a>' });
    if (!S.customers.length) {
      return { top: top, html: '<section class="card"><h2>Belum ada penyimpan</h2><p class="muted">Import senarai daripada Excel atau Google Sheets, atau tambah seorang demi seorang.</p>' +
        '<div class="btn-row"><a class="btn primary" href="#/import">' + icon('upload') + 'Import senarai</a><a class="btn" href="#/penyimpan/baru">' + icon('plus') + 'Tambah seorang</a></div></section>' };
    }
    var chips = FILTERS.map(function (f) {
      var cnt = S.customers.filter(function (c) { return matchFilter(c, f.id, n); }).length;
      if (!cnt && f.id !== 'semua' && f.id !== ui.cf) return '';
      return '<button class="fchip" data-act="filter" data-f="' + f.id + '" aria-pressed="' + (ui.cf === f.id) + '">' + f.label + '<span class="n">' + cnt + '</span></button>';
    }).join('');
    var h = '<div class="search">' + icon('search') + '<input type="search" placeholder="Cari nama atau nombor" value="' + esc(ui.q) + '" data-input="search" aria-label="Cari penyimpan" autocomplete="off"></div>' +
      '<div class="filter-row" role="group" aria-label="Tapis penyimpan">' + chips + '</div>' +
      '<div id="clist-wrap">' + customerList(n) + '</div>' +
      '<a class="fab" href="#/penyimpan/baru">' + icon('plus') + 'Tambah</a>';
    return { top: top, html: h };
  }
  function customerList(n) {
    var q = ui.q.trim().toLowerCase(), qd = q.replace(/\D/g, '');
    var list = S.customers.filter(function (c) {
      if (!matchFilter(c, ui.cf, n)) return false;
      if (!q) return true;
      if ((c.name || '').toLowerCase().indexOf(q) >= 0 || (c.nick || '').toLowerCase().indexOf(q) >= 0) return true;
      if (qd.length >= 3 && (c.phone.indexOf(qd) >= 0 || ('0' + c.phone.slice(2)).indexOf(qd) >= 0)) return true;
      return (c.tags || []).some(function (t) { return t.toLowerCase().indexOf(q) >= 0; });
    });
    if (ui.cf === 'harijadi') list.sort(function (a, b) { return C.dobParts(a.dob).d - C.dobParts(b.dob).d; });
    else list.sort(function (a, b) { return (a.name || '').localeCompare(b.name || '', 'ms'); });
    var td = today();
    var rows = list.slice(0, ui.climit).map(function (c) {
      var p = C.dobParts(c.dob);
      var side = ui.cf === 'harijadi' && p ? '<span class="chip gold">' + p.d + ' ' + C.BULAN_PENDEK[p.m - 1] + '</span>' : groupChip(c);
      return '<li><a href="#/penyimpan/' + c.id + '"><span class="avatar" data-g="' + (C.viewGroup(c, S.settings, n) || 'none') + '">' + initials(c) + '</span>' +
        '<span class="who"><b>' + esc(C.displayName(c.name) || '(tiada nama)') + '</b><span>' + esc(pang(c)) + '&ensp;' + esc(C.fmtPhone(c.phone)) + '</span></span>' +
        '<span class="c-side">' + (c.optOut ? '<span class="chip stop">STOP</span>' : side) + '<span class="c-last">' + (c.last == null ? 'belum dihantar' : esc(C.daysAgo(td - c.last))) + '</span></span></a></li>';
    }).join('');
    return '<p class="list-count">' + list.length + ' penyimpan</p><ul class="clist">' + (rows || '<li class="muted" style="padding:14px 4px">Tiada padanan.</li>') + '</ul>' +
      (list.length > ui.climit ? '<p style="text-align:center"><button class="btn sm" data-act="more">Tunjuk ' + Math.min(150, list.length - ui.climit) + ' lagi</button></p>' : '');
  }

  function dobInputValue(c) {
    var p = C.dobParts(c.dob);
    if (p) return C.pad(p.d) + '/' + C.pad(p.m) + (p.y ? '/' + p.y : '');
    return c.by ? String(c.by) : '';
  }
  function viewCustomer(id) {
    var isNew = id === 'baru';
    var c = isNew ? { id: '', name: '', phone: '', dob: '', by: 0, grp: '', gender: '', nick: '', title: '', pg: '', tags: [], note: '', salam: '', optOut: false, sent: {}, last: null, bday: {} } : byId(id);
    if (!c) return { top: topBar('Penyimpan', { back: '#/penyimpan' }), html: '<section class="card"><h2>Penyimpan tidak dijumpai</h2><a class="btn" href="#/penyimpan">Kembali ke senarai</a></section>' };
    var n = now(), s = S.settings;
    var allTags = {};
    S.customers.forEach(function (x) { (x.tags || []).forEach(function (t) { allTags[t] = 1; }); });
    if (s.nonMuslimTag) allTags[s.nonMuslimTag] = 1;
    var tagChips = Object.keys(allTags).sort().slice(0, 20).map(function (t) { return '<button type="button" class="chip line" data-act="addTag" data-tag="' + esc(t) + '">+ ' + esc(t) + '</button>'; }).join('');
    var info = C.nameInfo(c.name);
    var autoG = C.ageGroupOf(C.ageOf(c, n), s.ageBounds);
    var grpSel = '<select data-cf="grp"><option value="">Automatik' + (autoG ? ' (' + esc(C.groupLabel(autoG, s.ageBounds)) + ')' : ' (ikut tarikh lahir)') + '</option>' +
      C.AGE_GROUPS.map(function (g) { return '<option value="' + g.id + '"' + (c.grp === g.id ? ' selected' : '') + '>' + esc(C.groupLabel(g.id, s.ageBounds)) + '</option>'; }).join('') + '</select>';
    var h = '<section class="card"><form id="cform" autocomplete="off">' +
      fld('Nama penuh', '<input data-cf="name" value="' + esc(c.name) + '" required autocapitalize="words">') +
      fld('No. telefon (WhatsApp)', '<input data-cf="phone" type="tel" inputmode="tel" value="' + esc(c.phone ? C.fmtPhone(c.phone) : '') + '" placeholder="cth: 012-345 6789">') +
      fld('PG Code', '<input data-cf="pg" value="' + esc(c.pg || '') + '" placeholder="cth: PG01234567" autocapitalize="characters">', 'Kosong = belum buat belian (bakal pelanggan).') +
      fld('Tarikh lahir', '<input data-cf="dob" value="' + esc(dobInputValue(c)) + '" placeholder="cth: 16/08/1990" inputmode="numeric">', 'Hari/bulan/tahun. Tahun diperlukan untuk kumpulan umur.') +
      fld('No. IC (pilihan)', '<input data-cf="ic" inputmode="numeric" placeholder="cth: 900816-14-5678">', 'Hanya untuk isi tarikh lahir & jantina secara automatik. No. IC tidak disimpan.') +
      fld('Kumpulan umur', grpSel, 'Menentukan set ilmu, ayat pembuka dan ucapan hari jadi. Tetapkan sendiri jika tiada tarikh lahir.') +
      fld('Gelaran', '<input data-cf="title" value="' + esc(c.title || '') + '" placeholder="cth: Tuan, Puan, Cik, Cikgu" autocapitalize="words">', 'Dari lajur Salutation. Dipakai di depan panggilan: Tuan + Daniel = Tuan Daniel. Tulis nama jika mahu panggil dengan nama itu sahaja.') +
      fld('Panggilan', '<input data-cf="nick" value="' + esc(c.nick) + '" placeholder="Automatik: ' + esc(C.panggilan({ name: c.name, gender: c.gender, dob: c.dob, by: c.by, title: c.title }, s, n)) + '">', 'Nama pendek, cth: Daniel. Jika ada gelaran, app gabungkan: Tuan + Daniel = Tuan Daniel. Kosongkan untuk automatik.') +
      fld('Jantina', '<select data-cf="gender"><option value="">Automatik' + (info.gender ? ' (' + (info.gender === 'L' ? 'lelaki' : 'perempuan') + ')' : '') + '</option><option value="L"' + (c.gender === 'L' ? ' selected' : '') + '>Lelaki (Tuan)</option><option value="P"' + (c.gender === 'P' ? ' selected' : '') + '>Perempuan (Puan)</option></select>') +
      fld('Kumpulan', '<input data-cf="tags" value="' + esc((c.tags || []).join(', ')) + '" placeholder="cth: VIP, Johor">', 'Pisahkan dengan koma. Kumpulan "' + esc(s.nonMuslimTag) + '" disapa "' + esc(s.salamNonMuslim) + '" dan tak terima mesej Islamik.') +
      (tagChips ? '<div class="chips" style="margin:-6px 0 14px">' + tagChips + '</div>' : '') +
      fld('Sapaan khas (pilihan)', '<input data-cf="salam" value="' + esc(c.salam) + '" placeholder="Lalai: ' + esc(C.salamFor({ tags: c.tags, salam: '' }, s)) + '">') +
      fld('Catatan', '<textarea data-cf="note" rows="3" placeholder="cth: Simpan untuk haji 2030">' + esc(c.note) + '</textarea>') +
      '<label class="switch"><input type="checkbox" data-cf="optOut"' + (c.optOut ? ' checked' : '') + '><span class="sw-text"><b>Minta berhenti (STOP)</b><small>Tidak dimasukkan dalam sesi broadcast.</small></span></label>' +
      '<div class="btn-row" style="margin-top:14px"><button class="btn primary" data-act="saveCustomer" data-id="' + esc(c.id) + '">Simpan</button></div>' +
      '</form></section>';
    if (!isNew) {
      var g = C.viewGroup(c, s, n), age = C.ageOf(c, n), m = nextMsg(c), rem = C.remainingFor(c, S.messages, s, n);
      var dtb = c.dob ? C.daysToBirthday(c.dob, n) : null;
      h += '<section class="card"><h2 style="margin-bottom:12px">Ringkasan</h2><dl class="kv">' +
        '<dt>Kumpulan umur</dt><dd>' + (g ? esc(C.groupLabel(g, s.ageBounds)) + (age != null ? ', ' + age + ' tahun' : '') + (c.grp ? ' (ditetapkan manual)' : '') : 'Tiada. Terima set umum sahaja') + '</dd>' +
        '<dt>Hari jadi</dt><dd>' + (c.dob ? esc(C.fmtDob(c.dob)) + (dtb === 0 ? ' (hari ini)' : dtb != null ? ' (' + dtb + ' hari lagi)' : '') : 'Tiada') + '</dd>' +
        '<dt>Mesej seterusnya</dt><dd>' + (m ? esc(m.title) : 'Semua mesej dah diterima') + '</dd>' +
        '<dt>Kemajuan</dt><dd>' + (rem.total - rem.left) + ' daripada ' + rem.total + ' mesej</dd>' +
        '<dt>Terakhir dihantar</dt><dd>' + esc(C.daysAgo(c.last == null ? null : today() - c.last)) + '</dd></dl>' +
        '<div class="btn-row" style="margin-top:14px">' +
        (m && !c.optOut ? '<a class="btn send" href="#" data-act="sendDirect" data-cid="' + c.id + '">' + icon('send') + 'Hantar mesej seterusnya</a>' : '') +
        (c.dob ? '<button class="btn" data-act="bday" data-cid="' + c.id + '">' + icon('cake') + 'Ucapan hari jadi</button>' : '') +
        '</div></section>';
      var hist = Object.keys(c.sent || {}).map(function (k) { return { id: k, d: c.sent[k] }; }).sort(function (a, b) { return b.d - a.d; });
      h += '<section class="card"><h2 style="margin-bottom:8px">Sejarah mesej</h2>' + (hist.length ? '<ul class="hlist">' + hist.map(function (x) {
        var mm = msgById(x.id), d = C.dayToDate(x.d);
        return '<li><span class="h-date">' + C.fmtShort(d) + ' ' + String(d.getFullYear()).slice(2) + '</span><span class="h-title">' + esc(mm ? mm.title : x.id) + '</span>' +
          '<button class="linkish" data-act="delHist" data-cid="' + c.id + '" data-mid="' + esc(x.id) + '">Buang</button></li>';
      }).join('') + '</ul>' : '<p class="empty">Belum ada mesej dihantar.</p>') + '</section>';
      h += '<p style="text-align:center;margin:18px 0 8px"><button class="btn danger sm" data-act="delCustomer" data-cid="' + c.id + '">' + icon('trash') + 'Padam penyimpan ini</button></p>';
    }
    return { top: topBar(isNew ? 'Tambah penyimpan' : (C.displayName(c.name) || 'Penyimpan'), { back: '#/penyimpan' }), html: h };
  }
  function fld(label, control, help) {
    return '<label class="field"><span>' + esc(label) + '</span>' + control + (help ? '<small>' + help + '</small>' : '') + '</label>';
  }

  /* ================= IMPORT ================= */
  function viewImport() {
    var top = topBar('Import senarai', { back: '#/penyimpan' });
    var imp = ui.imp;
    if (imp && imp.step === 'siap') return { top: top, html: importDone(imp) };
    if (imp && imp.step === 'padan') return { top: top, html: importMap(imp) };
    var h = '<section class="card"><h2>Pilih fail</h2><p class="muted small" style="margin-top:6px">Excel (.xlsx) atau CSV. App akan cari lajur Nama, No. Telefon, Tarikh Lahir atau No. IC, Kumpulan Umur, Gelaran (Salutation), Panggilan (Nickname), Kumpulan dan Catatan secara automatik.</p>' +
      '<div class="btn-row"><label class="btn primary file-btn">' + icon('upload') + 'Pilih fail Excel / CSV<input type="file" data-change="importFile" accept=".xlsx,.csv,.tsv,.txt,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"></label>' +
      '<a class="btn" href="templat-senarai-penyimpan.xlsx" download>' + icon('download') + 'Templat Excel</a></div></section>' +
      '<section class="card"><h2>Atau tampal dari Excel / Google Sheets</h2><p class="muted small" style="margin-top:6px">Pilih baris termasuk tajuk lajur, salin, kemudian tampal di sini.</p>' +
      '<label class="field"><span class="sr">Data yang ditampal</span><textarea id="paste" rows="6" placeholder="Nama&#9;No Telefon&#9;Tarikh Lahir"></textarea></label>' +
      '<button class="btn" data-act="importPaste">Semak data</button></section>' +
      '<p class="small muted" style="margin:0 6px 16px">No. IC hanya digunakan untuk dapatkan tarikh lahir dan jantina, dan tidak disimpan. Penyimpan dengan nombor yang sama akan dikemas kini, bukan digandakan.</p>';
    return { top: top, html: h };
  }
  function letter(i) { var s = ''; i++; while (i > 0) { var r = (i - 1) % 26; s = String.fromCharCode(65 + r) + s; i = Math.floor((i - 1) / 26); } return s; }
  function impRows(imp) { return imp.header ? imp.rows.slice(1) : imp.rows; }
  function impDateOrder(imp) {
    var di = imp.map.dob;
    return di == null ? 'dmy' : C.dateOrder(impRows(imp).map(function (r) { return r[di]; }));
  }
  function impItems(imp) {
    var order = impDateOrder(imp);
    return impRows(imp).map(function (r) { return C.rowToCustomer(r, imp.map, { dateOrder: order }); });
  }
  function importMap(imp) {
    var rows = imp.rows, head = rows[0] || [];
    var ncol = Math.max.apply(null, rows.slice(0, 50).map(function (r) { return r.length; }).concat([0]));
    var opts = '';
    for (var i = 0; i < ncol; i++) {
      var lab = imp.header ? String(head[i] || '').trim() : String((rows[0] || [])[i] || '').trim();
      opts += '<option value="' + i + '">' + letter(i) + (lab ? ': ' + esc(lab.slice(0, 28)) : '') + '</option>';
    }
    var sel = function (key) {
      var cur = imp.map[key];
      return '<select data-change="impMap" data-key="' + key + '" aria-label="Lajur untuk ' + key + '"><option value="">Tiada</option>' +
        opts.replace('value="' + cur + '"', 'value="' + cur + '" selected') + '</select>';
    };
    var items = impItems(imp);
    var valid = items.filter(function (x) { return C.phoneOk(x.phone); });
    var bad = items.filter(function (x) { return (x.name || x.rawPhone) && !C.phoneOk(x.phone); });
    var withDob = valid.filter(function (x) { return x.dob && x.dob.slice(0, 4) !== '0000' || x.by || x.grp; }).length;
    var existing = {};
    S.customers.forEach(function (c) { existing[c.phone] = 1; });
    var upd = valid.filter(function (x) { return existing[x.phone]; }).length;
    var n = now();
    var perPhone = {}, sharedPeople = 0, sharedNums = 0;
    valid.forEach(function (x) { perPhone[x.phone] = (perPhone[x.phone] || 0) + 1; });
    Object.keys(perPhone).forEach(function (p) { if (perPhone[p] > 1) { sharedNums++; sharedPeople += perPhone[p]; } });
    var pgOn = imp.map.pg != null, pgNone = pgOn ? valid.filter(function (x) { return !x.pg; }).length : 0;
    var juniors = S.settings.pauseJunior ? valid.filter(function (x) { return C.isJunior({ dob: x.dob, by: x.by }, n); }).length : 0;
    var dummy = bad.filter(function (x) { return C.phoneDummy(x.phone); }).length;
    var gcount = {};
    valid.forEach(function (x) { var g = C.viewGroup({ dob: x.dob, by: x.by, grp: x.grp }, S.settings, n) || 'none'; gcount[g] = (gcount[g] || 0) + 1; });
    var gsum = ['junior'].concat(C.AGE_GROUPS.map(function (g) { return g.id; })).concat(['none']).filter(function (g) { return gcount[g]; }).map(function (g) {
      return '<span class="chip" data-g="' + g + '">' + esc(g === 'none' ? 'Tiada umur' : C.groupLabel(g, S.settings.ageBounds, false)) + ' ' + gcount[g] + '</span>';
    }).join('');
    var prev = valid.slice(0, 5).map(function (x) {
      var cust = { id: 'p', name: x.name, dob: x.dob, by: x.by, grp: x.grp, gender: x.gender, nick: x.nick, title: x.title, tags: x.tags };
      var g = C.viewGroup(cust, S.settings, n);
      return '<li><b>' + esc(C.panggilan(cust, S.settings, n)) + '</b><span class="pv-name">' + esc(x.name) + '</span><span class="pv-meta"><span>' + esc(C.fmtPhone(x.phone)) + '</span>' +
        '<span>' + (x.dob ? 'Lahir ' + esc(C.fmtDob(x.dob)) : x.by ? 'Lahir ' + x.by : x.grp ? 'Kumpulan dari senarai' : 'Tiada tarikh lahir') + '</span><span class="chip" data-g="' + (g || 'none') + '">' + (g ? esc(C.groupLabel(g, S.settings.ageBounds, false)) : 'Tiada umur') + '</span></span></li>';
    }).join('');
    var sheetSel = imp.sheets.length > 1 ? '<label class="field"><span>Helaian</span><select data-change="impSheet">' + imp.sheets.map(function (s, i) {
      return '<option value="' + i + '"' + (i === imp.si ? ' selected' : '') + '>' + esc(s.name) + '</option>';
    }).join('') + '</select></label>' : '';
    var fields = C.FIELDS.map(function (f) { return '<div class="map-row"><span>' + esc(f.label) + (f.req ? ' *' : '') + '</span>' + sel(f.key) + '</div>'; }).join('');
    return '<section class="card"><h2>Padankan lajur</h2><p class="muted small" style="margin-top:6px">' + esc(imp.name) + '. Semak lajur yang dikesan, betulkan jika perlu.</p>' + sheetSel +
      '<label class="switch"><input type="checkbox" data-change="impHeader"' + (imp.header ? ' checked' : '') + '><span class="sw-text"><b>Baris pertama ialah tajuk lajur</b></span></label>' +
      fields +
      '<label class="field" style="margin-top:12px"><span>Tambah kumpulan untuk semua (pilihan)</span><input data-change="impTag" value="' + esc(imp.tag || '') + '" placeholder="cth: Import Okt 2026"></label></section>' +
      '<section class="card"><h2>Semakan</h2><p style="margin-top:8px"><span class="good">' + valid.length + ' sah</span>' + (upd ? ', ' + upd + ' akan dikemas kini' : '') +
      (bad.length ? ', <span class="bad">' + bad.length + ' tiada nombor yang sah</span>' : '') + '. ' + withDob + ' ada tarikh lahir atau umur.</p>' +
      (dummy ? '<p class="small muted">' + dummy + ' daripada yang dilangkau guna nombor pengganti (contoh 010-000 0000). Isi nombor sebenar dalam Excel jika mahu mereka dimasukkan.</p>' : '') +
      (pgOn ? '<p class="small muted">' + (valid.length - pgNone) + ' ada PG Code, <b>' + pgNone + ' tiada PG Code</b> (bakal pelanggan, diasingkan).</p>' : '') +
      (sharedNums ? '<p class="small muted">' + sharedPeople + ' orang berkongsi ' + sharedNums + ' nombor. Setiap nombor terima satu mesej sahaja.</p>' : '') +
      (juniors ? '<p class="small muted">' + juniors + ' akaun Junior (bawah ' + C.JUNIOR_AGE + ' tahun) akan disimpan tetapi ditangguh.</p>' : '') +
      (impDateOrder(imp) === 'mdy' ? '<p class="small muted">Tarikh lahir dalam fail ini ditulis bulan/hari/tahun (contoh 3/15/1990 = 15 Mac 1990), jadi semua tarikh dibaca begitu.</p>' : '') +
      (gsum ? '<p class="small muted" style="margin:10px 0 6px">Pembahagian umur (menentukan set ilmu yang diterima):</p><div class="chips">' + gsum + '</div>' : '') +
      (imp.map.phone == null ? '<p class="bad">Pilih lajur nombor telefon dahulu.</p>' : '') +
      (prev ? '<p class="small muted" style="margin:12px 0 0">Contoh (5 pertama), dengan panggilan yang akan digunakan:</p><ul class="prevlist">' + prev + '</ul>' : '') +
      (bad.length ? '<p class="small muted" style="margin:12px 0 0">Akan dilangkau:</p><ul class="problems">' + bad.slice(0, 5).map(function (x) { return '<li>' + esc(x.name || '(tiada nama)') + ': ' + (C.phoneDummy(x.phone) ? 'nombor pengganti, bukan nombor sebenar' : x.rawPhone ? '"' + esc(x.rawPhone) + '" bukan nombor telefon yang sah' : 'tiada nombor telefon') + '</li>'; }).join('') + (bad.length > 5 ? '<li>dan ' + (bad.length - 5) + ' lagi</li>' : '') + '</ul>' : '') +
      '<div class="btn-row" style="margin-top:14px"><button class="btn" data-act="impCancel">Batal</button><button class="btn primary" data-act="importGo"' + (valid.length ? '' : ' disabled') + '>Import ' + valid.length + ' penyimpan</button></div></section>';
  }
  function importDone(imp) {
    var r = imp.result;
    return '<section class="card finish"><h2>Import selesai</h2><p class="muted">' + r.added + ' ditambah, ' + r.updated + ' dikemas kini' + (r.skipped.length ? ', ' + r.skipped.length + ' dilangkau' : '') + '.</p>' +
      (r.sharedPhone ? '<p class="small muted">' + r.sharedPhone + ' rekod berkongsi nombor dengan penyimpan lain. Mereka dihantar mesej sekali sahaja, tetapi hari jadi masing-masing tetap diingatkan.</p>' : '') +
      (imp.demoCleared ? '<p class="small muted">Data contoh telah dipadam.</p>' : '') +
      '<div class="btn-row" style="margin-top:12px"><a class="btn primary" href="#/hari-ini" data-act="impClose">Ke Hari Ini</a><a class="btn" href="#/penyimpan" data-act="impClose">Lihat senarai</a></div></section>' +
      '<div class="banner"><p>Data hanya disimpan dalam peranti ini. Buat backup sekarang supaya selamat.</p><button class="btn sm" data-act="backup">Backup</button></div>';
  }
  function startMapping(sheets, name) {
    var si = 0;
    for (var i = 0; i < sheets.length; i++) { if (cleanRows(sheets[i].rows).length) { si = i; break; } }
    ui.imp = { step: 'padan', name: name, sheets: sheets, si: si, tag: '' };
    detectImp();
    if (!ui.imp.rows.length) { ui.imp = null; toast('Tiada data dalam fail ini.', 'err'); return; }
    render();
    window.scrollTo(0, 0);
  }
  function cleanRows(rows) {
    return (rows || []).filter(function (r) { return r && r.some(function (v) { return String(v == null ? '' : v).trim() !== ''; }); })
      .map(function (r) { return Array.prototype.map.call(r, function (v) { return v == null ? '' : v; }); });
  }
  function detectImp() {
    var rows = cleanRows(ui.imp.sheets[ui.imp.si].rows);
    var d = C.detectMapping(rows);
    ui.imp.rows = rows; ui.imp.map = d.map; ui.imp.header = d.hasHeader;
  }

  /* ================= MESEJ ================= */
  function seg(cur) {
    var tabs = [['mesej', 'Pustaka (' + S.messages.length + ')'], ['ucapan', 'Hari jadi (' + S.bdays.length + ')'], ['pembuka', 'Ayat pembuka']];
    return '<nav class="seg" aria-label="Jenis mesej">' + tabs.map(function (t) { return '<a href="#/' + t[0] + '"' + (cur === t[0] ? ' aria-current="page"' : '') + '>' + t[1] + '</a>'; }).join('') + '</nav>';
  }
  var CATS = [['semua', 'Semua'], ['emas', 'Emas'], ['kewangan', 'Kewangan'], ['kehidupan', 'Kehidupan'], ['pengumuman', 'Pengumuman']];
  function catLabel(id) { var x = CATS.filter(function (c) { return c[0] === id; })[0]; return x ? x[1] : id; }
  function ageChips(ages) {
    if (!ages || !ages.length) return '<span class="chip line">Semua umur</span>';
    return ages.map(function (g) { return '<span class="chip" data-g="' + g + '">' + esc(C.groupLabel(g, S.settings.ageBounds)) + '</span>'; }).join('');
  }
  function sentCounts() {
    var cnt = {};
    S.customers.forEach(function (c) { Object.keys(c.sent || {}).forEach(function (k) { cnt[k] = (cnt[k] || 0) + 1; }); });
    return cnt;
  }
  // Kemajuan skrip kategori (Set 1, Set 2…): bila hampir semua dah terima, tiba masa set baharu
  function scriptCard() {
    var st = C.scriptStats(S, now()), low = C.scriptsLow(st);
    var rows = C.AGE_GROUPS.map(function (g) {
      var x = st[g.id], pct = x.people ? Math.round(x.done / x.people * 100) : 0;
      return '<li><span class="chip" data-g="' + g.id + '">' + esc(C.groupLabel(g.id, S.settings.ageBounds, false)) + '</span><span class="muted small">' + x.scripts + ' skrip</span><b' + (low.indexOf(g.id) >= 0 ? ' class="bad"' : '') + '>' + x.done + '/' + x.people + ' habis (' + pct + '%)</b></li>';
    }).join('');
    return '<section class="card scripts"><h2>Skrip kategori</h2><p class="muted small" style="margin:6px 0 10px">Skrip ringkas ikut kategori Excel, dihantar dahulu sebelum pustaka asal. Bila lebih ' + Math.round(C.SCRIPT_LOW * 100) + '% penyimpan sesuatu kategori dah terima semua, minta set skrip baharu.</p><ul class="scriptlist">' + rows + '</ul></section>';
  }
  function viewMessages() {
    var cnt = sentCounts();
    var list = S.messages.map(function (m, i) { return { m: m, i: i }; }).filter(function (x) {
      if (ui.msgCat !== 'semua' && x.m.cat !== ui.msgCat) return false;
      if (ui.msgAge === 'semua') return true;
      if (ui.msgAge === 'umum') return !x.m.ages.length;
      return x.m.ages.indexOf(ui.msgAge) >= 0;
    });
    var cats = CATS.map(function (c) { return '<button class="fchip" data-act="msgCat" data-f="' + c[0] + '" aria-pressed="' + (ui.msgCat === c[0]) + '">' + c[1] + '</button>'; }).join('');
    var ageSel = '<select data-change="msgAge" aria-label="Tapis ikut umur" class="fchip" style="padding-right:8px">' +
      [['semua', 'Semua umur'], ['umum', 'Mesej umum'], ['muda', 'MB30'], ['dewasa', 'CX'], ['pertengahan', 'CY'], ['matang', 'CZ'], ['warga', 'Pencen']]
        .map(function (o) { return '<option value="' + o[0] + '"' + (ui.msgAge === o[0] ? ' selected' : '') + '>' + o[1] + '</option>'; }).join('') + '</select>';
    var rows = list.map(function (x) {
      var m = x.m;
      return '<li class="' + (m.on === false ? 'off' : '') + '"><a href="#/mesej/' + encodeURIComponent(m.id) + '"><span class="mnum">' + (x.i + 1) + '</span>' +
        '<span class="m-main"><b><span class="dot ' + m.cat + '"></span>' + esc(m.title) + '</b><span class="chips">' + ageChips(m.ages) +
        (m.islamic ? '<span class="chip line">Islamik</span>' : '') + (m.on === false ? '<span class="chip line">Tidak aktif</span>' : '') + '</span></span>' +
        '<span class="m-count"><b>' + (cnt[m.id] || 0) + '</b>terima</span></a></li>';
    }).join('');
    var on = S.messages.filter(function (m) { return m.on !== false; });
    var nGen = on.filter(function (m) { return !m.ages.length; }).length;
    var sets = C.AGE_GROUPS.map(function (g) {
      return '<li><span class="chip" data-g="' + g.id + '">' + esc(C.groupLabel(g.id, S.settings.ageBounds)) + '</span><b>' + (nGen + on.filter(function (m) { return m.ages.indexOf(g.id) >= 0; }).length) + '</b></li>';
    }).join('');
    var h = seg('mesej') + '<section class="card sets"><h2>Set ilmu ikut umur</h2><p class="muted small" style="margin:6px 0 10px">Setiap penyimpan terima ' + nGen + ' ilmu umum, ditambah set khas untuk kumpulan umurnya. Jumlah mesej setiap kumpulan:</p><ul class="setlist">' + sets + '</ul></section>' + scriptCard() +
      '<div class="filter-row" role="group" aria-label="Tapis kategori">' + cats + ageSel + '</div>' +
      '<p class="hint">Mesej dihantar ikut susunan ini, hanya yang sesuai dengan kumpulan umur penyimpan. Nombor di kanan ialah bilangan penyimpan yang dah terima. ' +
      '<a class="linkish" href="#/baca/' + (C.AGE_GROUPS.some(function (g) { return g.id === ui.msgAge; }) ? ui.msgAge : 'dewasa') + '">Baca semua ikut kumpulan umur</a></p>' +
      '<ol class="mlist">' + (rows || '<li class="muted" style="padding:14px 4px">Tiada mesej dalam tapisan ini.</li>') + '</ol>' +
      '<a class="fab" href="#/mesej/baru">' + icon('plus') + 'Mesej baharu</a>';
    return { top: topBar('Mesej'), html: h };
  }
  var SAMPLE_NAMES = {
    muda: ['Muhammad Hafiz bin Rahman', 22], dewasa: ['Siti Aminah binti Ali', 31], pertengahan: ['Zulkifli bin Hassan', 41],
    matang: ['Rosnah binti Abdullah', 51], warga: ['Hasnah binti Omar', 64], tiada: ['Farid Iskandar', null]
  };
  function sampleCustomer(g, nm) {
    var x = SAMPLE_NAMES[g] || SAMPLE_NAMES.dewasa, y = new Date().getFullYear();
    return { id: 'sample-' + g, name: nm ? 'Tan Mei Ling' : x[0], dob: x[1] ? (y - x[1]) + '-01-15' : '', by: 0, gender: nm ? 'P' : '', nick: '', tags: nm ? [S.settings.nonMuslimTag] : [], salam: '', sent: {}, last: null };
  }
  function previewSelect(ages) {
    var cur = ui.previewAs || (ages && ages[0]) || 'dewasa';
    ui.previewAs = cur;
    return '<label class="field"><span>Pratonton untuk</span><select data-change="previewAs">' +
      ['muda', 'dewasa', 'pertengahan', 'matang', 'warga', 'tiada'].map(function (g) {
        var x = SAMPLE_NAMES[g];
        return '<option value="' + g + '"' + (cur === g ? ' selected' : '') + '>' + esc(x[0].split(' bin')[0]) + ' (' + (g === 'tiada' ? 'tiada umur' : esc(C.groupLabel(g, S.settings.ageBounds))) + ')</option>';
      }).join('') + '</select></label>' +
      '<label class="switch"><input type="checkbox" data-change="previewNM"' + (ui.previewNM ? ' checked' : '') + '><span class="sw-text"><b>Pratonton sebagai penyimpan bukan Islam</b></span></label>';
  }
  function draftPreview(d) {
    var c = sampleCustomer(ui.previewAs || 'dewasa', ui.previewNM);
    var ok = C.msgMatches(Object.assign({}, d, { on: true }), c, S.settings, now());
    var text = C.composeBroadcast(c, d, S.settings, now(), { count: 1 });
    return (ok ? '' : '<p class="small bad">Penyimpan ini tidak akan terima mesej ini (umur atau kumpulan tidak sepadan).</p>') +
      '<div class="bubble" id="dbubble">' + C.waToHtml(text) + '</div>';
  }
  function viewMessageEdit(id) {
    var isNew = id === 'baru';
    var m = isNew ? null : msgById(id);
    if (!isNew && !m) return { top: topBar('Mesej', { back: '#/mesej' }), html: '<section class="card"><h2>Mesej tidak dijumpai</h2><a class="btn" href="#/mesej">Kembali</a></section>' };
    if (ui.draftFor !== id) {
      ui.draft = isNew ? { id: '', cat: 'pengumuman', title: '', body: '', ages: [], islamic: false, opener: true, on: true, top: true } : clone(m);
      ui.draftFor = id; ui.previewAs = (ui.draft.ages && ui.draft.ages[0]) || 'dewasa';
    }
    var d = ui.draft, pos = isNew ? -1 : S.messages.indexOf(m);
    var ageT = '<button type="button" data-act="draftAge" data-g="" aria-pressed="' + (!d.ages.length) + '">Semua umur</button>' +
      C.AGE_GROUPS.map(function (g) { return '<button type="button" data-act="draftAge" data-g="' + g.id + '" aria-pressed="' + (d.ages.indexOf(g.id) >= 0) + '">' + esc(C.groupLabel(g.id, S.settings.ageBounds)) + '</button>'; }).join('');
    var h = '<section class="card">' +
      (d.src ? '<p class="small muted" style="margin:0 0 12px">Sumber idea: <a class="linkish" href="' + esc(d.src) + '" target="_blank" rel="noopener noreferrer">artikel di mohdzulkifli.com</a></p>' : '') +
      fld('Tajuk (untuk rujukan anda)', '<input data-input="draft" data-k="title" value="' + esc(d.title) + '" placeholder="cth: Promosi hujung tahun">') +
      fld('Kategori', '<select data-change="draft" data-k="cat">' + CATS.slice(1).map(function (c) { return '<option value="' + c[0] + '"' + (d.cat === c[0] ? ' selected' : '') + '>' + c[1] + '</option>'; }).join('') + '</select>') +
      '<fieldset class="field"><legend>Untuk kumpulan umur</legend><div class="toggles">' + ageT + '</div></fieldset>' +
      fld('Isi mesej', '<textarea data-input="draft" data-k="body" rows="12" id="dbody" placeholder="Tulis tips anda di sini. Guna *teks* untuk huruf tebal.">' + esc(d.body) + '</textarea>') +
      '<div class="inserts" aria-label="Sisip">' + ['{panggilan}', '{nama}', '{salam}', '{waktu}', '{hari}', '{nama_saya}'].map(function (p) { return '<button type="button" data-act="insert" data-v="' + p + '">' + p + '</button>'; }).join('') +
      '<button type="button" data-act="wrap" data-v="*">*tebal*</button><button type="button" data-act="wrap" data-v="_">_condong_</button></div>' +
      '<label class="switch"><input type="checkbox" data-change="draft" data-k="opener"' + (d.opener !== false ? ' checked' : '') + '><span class="sw-text"><b>Guna ayat pembuka automatik</b><small>Contoh: "' + esc(C.fill(S.settings.openers[0] || '', C.vars(sampleCustomer('dewasa'), S.settings, now()))) + '"</small></span></label>' +
      '<label class="switch"><input type="checkbox" data-change="draft" data-k="islamic"' + (d.islamic ? ' checked' : '') + '><span class="sw-text"><b>Kandungan Islamik</b><small>Tidak dihantar kepada kumpulan "' + esc(S.settings.nonMuslimTag) + '".</small></span></label>' +
      '<label class="switch"><input type="checkbox" data-change="draft" data-k="on"' + (d.on !== false ? ' checked' : '') + '><span class="sw-text"><b>Aktif</b><small>Mesej tidak aktif dilangkau dalam sesi.</small></span></label>' +
      (isNew ? '<label class="switch"><input type="checkbox" data-change="draft" data-k="top"' + (d.top ? ' checked' : '') + '><span class="sw-text"><b>Letak paling atas</b><small>Dihantar dulu kepada semua penyimpan sebelum tips biasa.</small></span></label>' : '') +
      '<div class="btn-row" style="margin-top:12px"><button class="btn primary" data-act="saveMsg">Simpan</button></div></section>' +
      '<section class="card"><h2 style="margin-bottom:12px">Pratonton</h2>' + previewSelect(d.ages) + '<div id="dprev">' + draftPreview(d) + '</div>' +
      '<div class="btn-row" style="margin-top:12px"><a class="btn" href="#" data-act="testSend">' + icon('phone') + 'Uji hantar ke nombor saya</a></div></section>';
    if (!isNew) {
      h += '<section class="card"><h2>Susunan</h2><p class="muted small" style="margin-top:6px">Nombor ' + (pos + 1) + ' daripada ' + S.messages.length + '.</p><div class="btn-row">' +
        '<button class="btn sm" data-act="moveMsg" data-dir="top">' + icon('top') + 'Paling atas</button><button class="btn sm" data-act="moveMsg" data-dir="up">' + icon('up') + 'Naik</button>' +
        '<button class="btn sm" data-act="moveMsg" data-dir="down">' + icon('down') + 'Turun</button><button class="btn sm" data-act="moveMsg" data-dir="bottom">' + icon('bottom') + 'Paling bawah</button></div></section>' +
        '<p style="text-align:center;margin:18px 0 8px"><button class="btn danger sm" data-act="delMsg">' + icon('trash') + 'Padam mesej ini</button></p>';
    }
    return { top: topBar(isNew ? 'Mesej baharu' : 'Edit mesej', { back: '#/mesej' }), html: h };
  }

  function viewBdays() {
    var rows = S.bdays.map(function (b, i) {
      var first = (b.body || '').split('\n').filter(function (l) { return l.trim(); })[1] || b.body || '';
      return '<li class="' + (b.on === false ? 'off' : '') + '"><a href="#/ucapan/' + encodeURIComponent(b.id) + '"><span class="mnum">' + (i + 1) + '</span><span class="m-main"><b>' + esc(C.fill(first.replace(/\*/g, ''), { panggilan: '…', salam: '…', nama_saya: '…' }).slice(0, 70)) + '</b>' +
        '<span class="chips">' + ageChips(b.ages) + (b.islamic ? '<span class="chip line">Islamik</span>' : '') + (b.on === false ? '<span class="chip line">Tidak aktif</span>' : '') + '</span></span></a></li>';
    }).join('');
    return { top: topBar('Mesej'), html: seg('ucapan') + '<p class="hint">App pilih satu ucapan yang sesuai dengan umur penyimpan, dan berbeza setiap tahun. Anda boleh tukar ayat sebelum hantar.</p><ol class="mlist">' + rows + '</ol><a class="fab" href="#/ucapan/baru">' + icon('plus') + 'Ucapan baharu</a>' };
  }
  function viewBdayEdit(id) {
    var isNew = id === 'baru';
    var b = isNew ? null : S.bdays.filter(function (x) { return x.id === id; })[0];
    if (!isNew && !b) return { top: topBar('Ucapan', { back: '#/ucapan' }), html: '<section class="card"><h2>Ucapan tidak dijumpai</h2></section>' };
    if (ui.draftFor !== 'bd:' + id) {
      ui.draft = isNew ? { id: '', body: '{salam} {panggilan} 🎂\n\nSelamat hari lahir! ', ages: [], islamic: false, on: true } : clone(b);
      ui.draftFor = 'bd:' + id; ui.previewAs = (ui.draft.ages && ui.draft.ages[0]) || 'dewasa';
    }
    var d = ui.draft;
    var ageT = '<button type="button" data-act="draftAge" data-g="" aria-pressed="' + (!d.ages.length) + '">Semua umur</button>' +
      C.AGE_GROUPS.map(function (g) { return '<button type="button" data-act="draftAge" data-g="' + g.id + '" aria-pressed="' + (d.ages.indexOf(g.id) >= 0) + '">' + esc(C.groupLabel(g.id, S.settings.ageBounds)) + '</button>'; }).join('');
    var c = sampleCustomer(ui.previewAs || 'dewasa', ui.previewNM);
    var h = '<section class="card">' +
      '<fieldset class="field"><legend>Untuk kumpulan umur</legend><div class="toggles">' + ageT + '</div></fieldset>' +
      fld('Ucapan', '<textarea data-input="draft" data-k="body" rows="9" id="dbody">' + esc(d.body) + '</textarea>') +
      '<div class="inserts">' + ['{panggilan}', '{salam}', '{nama}', '{nama_saya}'].map(function (p) { return '<button type="button" data-act="insert" data-v="' + p + '">' + p + '</button>'; }).join('') + '</div>' +
      '<label class="switch"><input type="checkbox" data-change="draft" data-k="islamic"' + (d.islamic ? ' checked' : '') + '><span class="sw-text"><b>Ucapan Islamik</b><small>Tidak digunakan untuk kumpulan "' + esc(S.settings.nonMuslimTag) + '".</small></span></label>' +
      '<label class="switch"><input type="checkbox" data-change="draft" data-k="on"' + (d.on !== false ? ' checked' : '') + '><span class="sw-text"><b>Aktif</b></span></label>' +
      '<div class="btn-row" style="margin-top:12px"><button class="btn primary" data-act="saveBday">Simpan</button></div></section>' +
      '<section class="card"><h2 style="margin-bottom:12px">Pratonton</h2>' + previewSelect(d.ages) + '<div id="dprev"><div class="bubble" id="dbubble">' + C.waToHtml(C.composeBirthday(c, d, S.settings, now())) + '</div></div></section>' +
      (isNew ? '' : '<p style="text-align:center;margin:18px 0 8px"><button class="btn danger sm" data-act="delBday">' + icon('trash') + 'Padam ucapan ini</button></p>');
    return { top: topBar(isNew ? 'Ucapan baharu' : 'Edit ucapan', { back: '#/ucapan' }), html: h };
  }
  function viewOpeners() {
    var s = S.settings, n = now(), g = ui.openerAge || 'semua';
    var opts = [['semua', 'Semua umur (lalai)']].concat(C.AGE_GROUPS.map(function (x) { return [x.id, C.groupLabel(x.id, s.ageBounds)]; }));
    var cur = g === 'semua' ? s.openers : ((s.openersByAge || {})[g] || []);
    var sel = '<label class="field"><span>Untuk kumpulan</span><select data-change="openerAge">' + opts.map(function (o) {
      return '<option value="' + o[0] + '"' + (g === o[0] ? ' selected' : '') + '>' + esc(o[1]) + '</option>';
    }).join('') + '</select></label>';
    var samples = C.AGE_GROUPS.map(function (x, i) {
      var c = sampleCustomer(x.id, false), list = C.openerList(c, s, n);
      var line = list.length ? C.tidyLine(C.fill(list[i % list.length], C.vars(c, s, n))) : '(tiada ayat pembuka)';
      return '<p class="small muted" style="margin:12px 0 4px">' + esc(C.groupLabel(x.id, s.ageBounds)) + '</p><div class="bubble">' + C.waToHtml(line) + '</div>';
    }).join('');
    var help = g === 'semua' ? 'Untuk penyimpan tanpa umur, dan kumpulan umur yang tiada ayat sendiri.' : 'Kosongkan untuk guna ayat "Semua umur".';
    var h = seg('pembuka') + '<section class="card"><h2>Ayat pembuka</h2><p class="muted small" style="margin-top:6px">Baris pertama setiap mesej. Setiap kumpulan umur boleh ada nada sendiri, contohnya "Hai {panggilan}!" untuk orang muda. Satu ayat setiap baris; app pilih bergilir supaya mesej tak sama sebiji. Guna {salam}, {panggilan}, {waktu} dan {hari}.</p>' + sel +
      '<label class="field"><span class="sr">Ayat pembuka</span><textarea id="openers" rows="6">' + esc(cur.join('\n')) + '</textarea><small>' + help + '</small></label>' +
      '<div class="btn-row"><button class="btn primary" data-act="saveOpeners">Simpan</button><button class="btn" data-act="resetOpeners">Guna asal</button></div></section>' +
      '<section class="card"><h2>Contoh ikut umur</h2>' + samples + '</section>';
    return { top: topBar('Mesej'), html: h };
  }

  function cycleDays() {
    var s = S.settings, prim = C.primaryIds(S.customers);
    var active = S.customers.filter(function (c) { return !c.optOut && prim[c.id] && C.phoneOk(c.phone); }).length;
    var perDay = s.slots.filter(function (x) { return x.on; }).reduce(function (a, x) { return a + (+x.size || 0); }, 0) * (s.days.filter(Boolean).length / 7);
    return perDay > 0 ? Math.max(s.minGapDays, Math.ceil(active / perDay)) : s.minGapDays;
  }
  function viewRead(g) {
    var groups = ['muda', 'dewasa', 'pertengahan', 'matang', 'warga', 'tiada'];
    if (groups.indexOf(g) < 0) g = 'dewasa';
    var n = now(), c = sampleCustomer(g, ui.previewNM);
    var list = S.messages.filter(function (m) { return m.on !== false && C.msgMatches(m, c, S.settings, n); });
    var months = Math.round(list.length * cycleDays() / 30);
    var sel = '<label class="field"><span>Kumpulan umur</span><select data-change="readGroup">' + groups.map(function (x) {
      return '<option value="' + x + '"' + (x === g ? ' selected' : '') + '>' + (x === 'tiada' ? 'Tiada umur (mesej umum sahaja)' : esc(C.groupLabel(x, S.settings.ageBounds))) + '</option>';
    }).join('') + '</select></label>' +
      '<label class="switch"><input type="checkbox" data-change="readNM"' + (ui.previewNM ? ' checked' : '') + '><span class="sw-text"><b>Sebagai penyimpan bukan Islam</b></span></label>';
    var items = list.map(function (m, i) {
      return '<article class="read-item"><p class="read-meta"><span class="mnum">' + (i + 1) + '</span><span class="dot ' + m.cat + '"></span>' + esc(m.title) +
        '<a class="linkish" href="#/mesej/' + encodeURIComponent(m.id) + '">Edit</a></p><div class="bubble">' + C.waToHtml(C.composeBroadcast(c, m, S.settings, n, { count: i })) + '</div></article>';
    }).join('');
    var h = '<section class="card">' + sel + '<p class="small muted" style="margin-top:10px">' + list.length + ' mesej untuk ' + esc(pang(c)) + ', kira-kira ' + months + ' bulan pada kadar sekarang (seorang setiap ' + cycleDays() + ' hari).</p></section>' + items;
    return { top: topBar('Baca semua mesej', { back: '#/mesej' }), html: h };
  }

  /* ================= TETAPAN ================= */
  function sfield(label, key, val, attrs, help) {
    return fld(label, '<input data-s="' + key + '" value="' + esc(val == null ? '' : val) + '" ' + (attrs || '') + '>', help);
  }
  function viewSettings() {
    var s = S.settings, n = now();
    var dayNames = ['Ahd', 'Isn', 'Sel', 'Rab', 'Kha', 'Jum', 'Sab'];
    var dayOrder = [1, 2, 3, 4, 5, 6, 0];
    var slots = s.slots.map(function (sl, i) {
      return '<div class="slot' + (sl.on ? '' : ' off') + '"><div class="slot-top"><label class="switch" aria-label="Hidupkan sesi ' + esc(sl.name) + '"><input type="checkbox" data-s="slots.' + i + '.on" data-type="bool"' + (sl.on ? ' checked' : '') + '></label>' +
        '<input type="text" data-s="slots.' + i + '.name" value="' + esc(sl.name) + '" aria-label="Nama sesi"></div>' +
        '<div class="slot-bottom"><label>Masa (' + esc(C.fmtTime(sl.time)) + ')<input type="time" data-s="slots.' + i + '.time" value="' + esc(sl.time) + '"></label>' +
        '<label>Bilangan orang<input type="number" min="1" max="200" inputmode="numeric" data-s="slots.' + i + '.size" data-type="num" value="' + esc(sl.size) + '"></label></div></div>';
    }).join('');
    var days = dayOrder.map(function (d) { return '<button type="button" data-act="toggleDay" data-d="' + d + '" aria-pressed="' + (!!s.days[d]) + '">' + dayNames[d] + '</button>'; }).join('');
    var stopOpts = [[1, 'Setiap mesej'], [3, 'Setiap 3 mesej'], [5, 'Setiap 5 mesej'], [100000, 'Mesej pertama sahaja'], [0, 'Tidak sama sekali']];
    var modeOpts = [['auto', 'Automatik (disyorkan)'], ['wa', 'Pautan wa.me'], ['app', 'Terus ke app WhatsApp'], ['business', 'WhatsApp Business (Android)'], ['web', 'WhatsApp Web (komputer)']];
    var sampleC = sampleCustomer('dewasa');
    var h = '<section class="card"><h2 style="margin-bottom:14px">Profil anda</h2>' +
      sfield('Nama anda', 'myName', s.myName, 'placeholder="cth: Hafiy" autocapitalize="words"', 'Digunakan dalam tandatangan dan ucapan "Selamat pagi" di skrin utama.') +
      sfield('Tandatangan mesej', 'signature', s.signature, 'placeholder="– {nama_saya}"', 'Contoh hasil: ' + esc(C.signature(s, C.vars(sampleC, s, n)) || '(isi nama anda dulu)')) +
      sfield('Nombor WhatsApp anda', 'myPhone', s.myPhone ? C.fmtPhone(s.myPhone) : '', 'type="tel" inputmode="tel" placeholder="cth: 012-345 6789"', 'Untuk butang "Uji hantar ke nombor saya" — semak rupa mesej sebelum hantar kepada pelanggan.') +
      '</section>' +
      '<section class="card"><h2 style="margin-bottom:14px">Sapaan & panggilan</h2>' +
      sfield('Sapaan lalai', 'salam', s.salam, 'placeholder="Assalamualaikum"') +
      fld('Panggilan automatik', '<select data-s="honorific">' + [['tuanpuan', 'Tuan/Puan + nama (cth: Puan Aminah)'], ['umur', 'Ikut umur: bawah 30 nama sahaja'], ['nama', 'Nama sahaja (cth: Aminah)']].map(function (o) {
        return '<option value="' + o[0] + '"' + (s.honorific === o[0] ? ' selected' : '') + '>' + o[1] + '</option>';
      }).join('') + '</select>', 'Untuk penyimpan tanpa gelaran sahaja. Gelaran dari Excel (Tuan, Puan, Cik…) sentiasa diikut. Jantina dikesan daripada "bin/binti", "a/l, a/p" atau No. IC.') +
      sfield('Nama kumpulan bukan Islam', 'nonMuslimTag', s.nonMuslimTag, '', 'Letak kumpulan ini pada penyimpan bukan Islam. Mereka tidak akan terima mesej Islamik (zakat, faraid, hadis).') +
      sfield('Sapaan untuk kumpulan ini', 'salamNonMuslim', s.salamNonMuslim) +
      '</section>' +
      '<section class="card"><h2 style="margin-bottom:14px">Cara broadcast</h2>' +
      fld('Siapa pilih penerima & skrip?', '<select data-s="mode">' + [['pilih', 'Saya pilih sendiri (broadcast pilihan)'], ['auto', 'Automatik ikut sesi pagi & petang']].map(function (o) {
        return '<option value="' + o[0] + '"' + (s.mode === o[0] ? ' selected' : '') + '>' + o[1] + '</option>';
      }).join('') + '</select>', 'Pilih sendiri: di Hari Ini, tekan "Sediakan broadcast", pilih skrip dan penerima. Automatik: app pilih ' + 'penerima dan mesej seterusnya untuk setiap sesi.') +
      sfield('Cadangan had mesej sehari', 'dailyLimit', s.dailyLimit, 'type="number" min="0" max="500" inputmode="numeric" data-type="num"', 'Amaran bila melebihi had ini, supaya nombor anda tidak disekat. 0 = tiada amaran.') + '</section>' +
      '<section class="card"><h2>Jadual sesi</h2><p class="muted small" style="margin:6px 0 4px">' + (s.mode === 'auto' ? 'Hidupkan, namakan, tetapkan masa dan bilangan orang bagi setiap sesi.' : 'Digunakan dalam mod automatik sahaja (dan untuk peringatan kalendar).') + '</p>' + slots +
      '<fieldset class="field" style="margin-top:14px"><legend>Hari aktif</legend><div class="toggles">' + days + '</div></fieldset>' +
      sfield('Jarak minimum antara mesej (hari)', 'minGapDays', s.minGapDays, 'type="number" min="1" max="60" inputmode="numeric" data-type="num"', 'Penyimpan tidak akan terima mesej lagi sebelum tempoh ini.') +
      sfield('Ulang mesej lama selepas (hari)', 'repeatAfterDays', s.repeatAfterDays, 'type="number" min="0" max="1000" inputmode="numeric" data-type="num"', 'Bila semua mesej dah diterima, mesej paling lama dihantar semula selepas tempoh ini. 0 = tidak diulang.') +
      '<div class="btn-row"><button class="btn" data-act="ics">' + icon('calendar') + 'Tambah peringatan ke kalendar</button></div></section>' +
      '<section class="card"><h2 style="margin-bottom:14px">Pilihan berhenti (STOP)</h2>' +
      sfield('Ayat', 'stopText', s.stopText) +
      fld('Kekerapan', '<select data-s="stopEvery" data-type="num">' + stopOpts.map(function (o) { return '<option value="' + o[0] + '"' + (+s.stopEvery === o[0] ? ' selected' : '') + '>' + o[1] + '</option>'; }).join('') + '</select>',
        'Memberi pilihan berhenti mengurangkan risiko nombor anda di-report sebagai spam.') + '</section>' +
      '<section class="card"><h2>Kumpulan umur</h2><p class="muted small" style="margin:6px 0 10px">Had umur bagi setiap kumpulan. Mesej dalam pustaka ditulis untuk peringkat hidup ini.</p><div class="bounds">' +
      ['MB30: bawah', 'CX: bawah', 'CY: bawah', 'CZ: bawah'].map(function (l, i) {
        return '<label>' + l + '<input type="number" min="15" max="99" inputmode="numeric" data-s="ageBounds.' + i + '" data-type="num" value="' + s.ageBounds[i] + '"></label>';
      }).join('') + '</div><p class="small muted" style="margin-top:8px">Pencen: ' + s.ageBounds[3] + ' tahun ke atas. Junior: bawah ' + C.JUNIOR_AGE + ' tahun.</p>' +
      '<label class="switch" style="margin-top:6px"><input type="checkbox" data-s="pauseJunior" data-type="bool"' + (s.pauseJunior ? ' checked' : '') + '><span class="sw-text"><b>Tangguh akaun Junior (bawah ' + C.JUNIOR_AGE + ' tahun)</b><small>Tidak dimasukkan dalam sesi dan ucapan hari jadi. Nombor yang dikongsi dengan ibu bapa tetap terima mesej ibu bapa.</small></span></label></section>' +
      '<section class="card"><h2 style="margin-bottom:14px">WhatsApp</h2>' +
      fld('Cara buka WhatsApp', '<select data-s="linkMode">' + modeOpts.map(function (o) { return '<option value="' + o[0] + '"' + (s.linkMode === o[0] ? ' selected' : '') + '>' + o[1] + '</option>'; }).join('') + '</select>',
        'Automatik: telefon guna wa.me (iPhone yang dipasang di skrin utama terus ke app WhatsApp), komputer guna WhatsApp Web. Guna WhatsApp Business? Pilih "WhatsApp Business (Android)" di telefon Android.') +
      '<label class="switch"><input type="checkbox" data-s="autoMark" data-type="bool"' + (s.autoMark ? ' checked' : '') + '><span class="sw-text"><b>Tanda "dah hantar" sebaik tekan Hantar</b><small>Matikan jika anda mahu sahkan sendiri setiap kali.</small></span></label></section>' +
      '<section class="card"><h2>Data & backup</h2><p class="muted small" style="margin:6px 0 12px">Semua data disimpan dalam pelayar peranti ini sahaja — tiada pelayan. ' + (s.lastBackup ? 'Backup terakhir: ' + esc(C.fmtDate(new Date(s.lastBackup))) + '.' : 'Belum pernah backup.') + '</p>' +
      '<div class="btn-row"><button class="btn primary" data-act="backup">' + icon('download') + 'Muat turun backup</button>' +
      (navigator.share ? '<button class="btn" data-act="shareBackup">' + icon('share') + 'Kongsi backup</button>' : '') + '</div>' +
      '<div class="btn-row" style="margin-top:10px"><label class="btn file-btn">' + icon('upload') + 'Pulihkan backup<input type="file" accept=".json,application/json" data-change="restore"></label>' +
      '<button class="btn" data-act="exportCsv">' + icon('download') + 'Eksport senarai (CSV)</button></div>' +
      (hasDemo() ? '<div class="btn-row" style="margin-top:10px"><button class="btn" data-act="clearDemo">Padam data contoh</button></div>' : '') +
      '<p style="margin-top:16px"><button class="btn danger sm" data-act="resetAll">' + icon('trash') + 'Padam semua data</button></p></section>' +
      '<section class="card"><div class="btn-row"><a class="btn" href="#/panduan">' + icon('book') + 'Panduan & tips elak disekat</a></div><p class="small muted" style="margin-top:12px">Servis Emas versi ' + VERSION + '</p></section>';
    return { top: topBar('Tetapan'), html: h };
  }

  /* ================= PANDUAN ================= */
  function viewGuide() {
    var s = S.settings;
    var perDay = s.slots.filter(function (x) { return x.on; }).reduce(function (a, x) { return a + (+x.size || 0); }, 0);
    var h = '<section class="card guide"><h2>Cara app ini berfungsi</h2>' +
      '<p>Setiap hari, app pilih ' + perDay + ' penyimpan (' + s.slots.filter(function (x) { return x.on; }).map(function (x) { return x.size + ' ' + x.name.toLowerCase(); }).join(', ') + ') yang paling lama tidak menerima mesej. Setiap orang dapat tips yang sesuai dengan umurnya, mengikut susunan dalam pustaka, dengan nama dan sapaan masing-masing.</p>' +
      '<h3>Mesej peribadi ikut umur</h3><ul>' +
      '<li><b>Panggilan:</b> ' + (s.honorific === 'umur' ? 'gelaran dari Excel (Tuan, Puan, Cik, Cikgu…) + nama panggilan; jika tiada gelaran, nama sendiri untuk bawah 30 tahun dan Tuan/Puan + nama untuk yang lebih berusia' : s.honorific === 'nama' ? 'nama sahaja untuk semua' : 'Tuan/Puan + nama untuk semua') + ' (tukar dalam Tetapan).</li>' +
      '<li><b>Ayat pembuka:</b> nada berbeza ikut umur, contohnya "Hai Hafiz! 👋" untuk orang muda dan "Assalamualaikum Puan Hasnah, semoga sihat dan ceria selalu 🌷" untuk warga emas.</li>' +
      '<li><b>Set ilmu:</b> semua dapat ilmu umum, ditambah set khas peringkat hidup: kerjaya & mula menyimpan (MB30, 18–25), kahwin, anak & rumah (CX, 26–35), pendidikan anak & generasi sandwich (CY, 36–45), KWSP 55 & pusaka (CZ, 46–55), scam & waris (Pencen, 56+). Akaun Junior (bawah 18) boleh ditangguh dalam Tetapan.</li>' +
      '<li><b>Hari jadi:</b> ucapan dipilih ikut umur, dan berubah setiap tahun.</li></ul>' +
      '<p>App tidak menghantar mesej secara automatik. WhatsApp tidak membenarkan penghantaran automatik daripada app biasa, dan cara ini juga paling selamat untuk nombor anda. Anda hanya tekan Hantar, kemudian tekan hantar sekali lagi dalam WhatsApp.</p>' +
      (s.mode === 'auto'
        ? '<h3>Rutin harian</h3><ol><li>Buka app pada waktu sesi pagi. Ucap hari jadi dahulu jika ada.</li><li>Tekan <b>Mula sesi pagi</b>, kemudian Hantar untuk setiap orang (kira-kira 5–10 minit).</li><li>Ulang untuk sesi petang.</li><li>Seminggu sekali: <b>Tetapan → Muat turun backup</b>.</li></ol>'
        : '<h3>Rutin harian (broadcast pilihan)</h3><ol><li>Ucap hari jadi dahulu jika ada.</li><li>Tekan <b>Sediakan broadcast</b>: pilih skrip, kemudian pilih penerima (status PG Code, kategori umur, kumpulan).</li><li>Tekan Hantar untuk setiap orang. App terus ke penerima seterusnya. Broadcast besar boleh disambung esok.</li><li>Seminggu sekali: <b>Tetapan → Muat turun backup</b>.</li></ol>') +
      '<h3>Tips elak nombor disekat WhatsApp</h3><ul>' +
      '<li>Hantar hanya kepada penyimpan anda sendiri — orang yang kenal anda.</li>' +
      '<li>Minta pelanggan simpan nombor anda. Mesej daripada nombor yang disimpan jarang di-report.</li>' +
      '<li>Hormati permintaan STOP serta-merta (tekan ⋯ dan Tanda STOP).</li>' +
      '<li>Jangan tergesa-gesa. 30 orang setiap sesi sudah memadai, dan setiap mesej berbeza (nama, sapaan, ayat pembuka).</li>' +
      '<li>Balas soalan pelanggan. Perbualan dua hala menunjukkan nombor anda bukan spam.</li>' +
      '<li>Elak hantar pautan yang sama berulang kali kepada ramai orang dalam masa singkat.</li></ul>' +
      '<h3>Data & privasi</h3><p>Senarai penyimpan disimpan dalam peranti ini sahaja, tidak dihantar ke mana-mana pelayan. Kalau tukar telefon atau padam data pelayar, data akan hilang, jadi buat backup secara berkala dan simpan di Google Drive atau iCloud. Gunakan backup yang sama untuk pindahkan data ke peranti lain.</p>' +
      '<p>Di bawah Akta Perlindungan Data Peribadi (PDPA), pelanggan berhak meminta anda berhenti menghantar mesej pemasaran. Sebab itu app ini ada pilihan STOP.</p>' +
      '<h3>Pasang di skrin utama</h3><ul><li><b>iPhone:</b> buka dalam Safari, tekan butang Kongsi, pilih <b>Tambah ke Skrin Utama</b>.</li><li><b>Android:</b> buka dalam Chrome, tekan ⋮, pilih <b>Pasang app</b> atau <b>Tambah ke skrin utama</b>.</li></ul>' +
      '<p class="small muted">Data dalam Safari dan dalam app di skrin utama adalah berasingan di iPhone. Pilih satu sahaja untuk kegunaan harian, atau pindahkan dengan backup.</p></section>';
    return { top: topBar('Panduan', { back: '#/tetapan' }), html: h };
  }

  /* ================= Helaian (sheet) ================= */
  function bdaySheet(cid) {
    var c = byId(cid); if (!c) return;
    var n = now(), off = ui.bdayOff[cid] || 0;
    var t = C.pickBirthday(c, S.bdays, S.settings, n, off);
    if (!t) { toast('Tiada templat ucapan yang sesuai. Tambah dalam Mesej → Hari jadi.', 'err'); return; }
    var text = C.composeBirthday(c, t, S.settings, n);
    var age = C.ageOf(c, n), opts = C.birthdayOptions(c, S.bdays, S.settings, n).length;
    var wished = c.bday && c.bday[n.getFullYear()];
    openSheet('<h3>Ucapan hari jadi untuk ' + esc(pang(c)) + '</h3><p class="muted small">' + esc(C.displayName(c.name)) + (age != null ? ', genap ' + age + ' tahun' : '') + (wished ? '. Dah diucap pada ' + C.fmtClock(wished) + '.' : '') + '</p>' +
      '<div class="bubble">' + C.waToHtml(text) + '</div>' +
      '<div class="btn-row">' + (opts > 1 ? '<button class="btn" data-act="bdayNext" data-cid="' + cid + '">' + icon('shuffle') + 'Tukar ayat</button>' : '') +
      '<a class="btn send" href="' + esc(C.waLink(c.phone, text, linkMode())) + '" data-act="sendBday" data-cid="' + cid + '">' + icon('send') + 'Hantar WhatsApp</a></div>', 'Ucapan hari jadi');
  }
  function personMenu(cid, slotId) {
    var c = byId(cid); if (!c) return;
    var s = S.settings;
    openSheet('<h3>' + esc(pang(c)) + '</h3><p class="muted small">' + esc(C.displayName(c.name)) + ', ' + esc(C.fmtPhone(c.phone)) + '</p><ul class="menu">' +
      (campOf(slotId) ? '<li><button data-act="skip" data-cid="' + cid + '" data-slot="' + slotId + '">' + icon('skip') + '<span>Buang dari senarai ini<small>Dia tidak akan terima broadcast ini.</small></span></button></li>'
        : '<li><button data-act="skip" data-cid="' + cid + '" data-slot="' + slotId + '">' + icon('skip') + '<span>Langkau hari ini<small>Dia akan masuk sesi lain nanti.</small></span></button></li>' +
        '<li><button data-act="skipMsg" data-cid="' + cid + '">' + icon('shuffle') + '<span>Tukar ke mesej seterusnya<small>Mesej ini tidak sesuai untuk dia.</small></span></button></li>') +
      (s.myPhone ? '<li><button data-act="testPerson" data-cid="' + cid + '" data-slot="' + slotId + '">' + icon('phone') + '<span>Uji hantar ke nombor saya</span></button></li>' : '') +
      '<li><button data-act="editPerson" data-cid="' + cid + '">' + icon('edit') + '<span>Edit maklumat penyimpan</span></button></li>' +
      '<li><button class="danger" data-act="markStop" data-cid="' + cid + '" data-slot="' + slotId + '">' + icon('stop') + '<span>Tanda STOP<small>Dia minta berhenti terima mesej.</small></span></button></li>' +
      '</ul>', 'Pilihan penyimpan');
  }

  /* ================= Tindakan (klik) ================= */
  var ACT = {
    closeSheet: function () { closeSheet(); },
    confirmYes: function () { if (ui.confirmFn) ui.confirmFn(true); },
    confirmNo: function () { if (ui.confirmFn) ui.confirmFn(false); },
    toastAction: function () { var fn = ui.toastAction; $('#toast').innerHTML = ''; ui.toastAction = null; if (fn) fn(); },
    demo: function () { loadDemo(); },
    clearDemo: function () {
      confirmBox('Padam data contoh?', 'Hanya penyimpan contoh dipadam. Data sebenar tidak terjejas.', 'Padam', true).then(function (ok) {
        if (!ok) return;
        clearDemo(); save(); render(); toast('Data contoh dipadam.');
      });
    },
    send: function (a, e) {
      var c = byId(a.dataset.cid); if (!c) { e.preventDefault(); return; }
      var slotId = a.dataset.slot;
      var m = msgFor(c, slotId);
      if (!m) { e.preventDefault(); toast('Tiada mesej yang sesuai untuk penyimpan ini.', 'err'); return; }
      if (c.demo) {
        e.preventDefault();
        markSent(c, m, slotId); ui.justDone = true; render(true);
        toast('Data contoh: WhatsApp tidak dibuka. Ditanda dihantar.');
        return;
      }
      prepLink(a, c.phone, broadcastText(c, m));
      if (S.settings.autoMark) {
        setTimeout(function () {
          markSent(c, m, slotId); ui.justDone = true; render(true);
          toast('Ditanda dihantar kepada ' + pang(c) + '.', null, { label: 'Batal', fn: function () { undoSent(c, slotId); render(true); } });
        }, 0);
      } else {
        ui.awaiting = { cid: c.id, slot: slotId, m: m.id };
        setTimeout(function () { render(true); }, 0);
      }
    },
    confirmSent: function (a) {
      var c = byId(a.dataset.cid), m = ui.awaiting && msgById(ui.awaiting.m);
      ui.awaiting = null;
      if (c && m) { markSent(c, m, a.dataset.slot); ui.justDone = true; }
      render(true);
    },
    notSent: function () { ui.awaiting = null; render(true); },
    undo: function (a) { var c = byId(a.dataset.cid); if (c) { undoSent(c, a.dataset.slot); render(true); toast('Dibatalkan. ' + pang(c) + ' kembali dalam giliran.'); } },
    expand: function (a) { var b = $('#fbubble'); if (b) { b.classList.remove('clamp'); a.remove(); } },
    personMenu: function (a) { personMenu(a.dataset.cid, a.dataset.slot); },
    skip: function (a) {
      var k = campOf(a.dataset.slot);
      var b = k || C.ensureBatch(S, a.dataset.slot, now()); b.skip[a.dataset.cid] = 1; save(); closeSheet(); render(true);
      toast(k ? 'Dibuang daripada senarai broadcast ini.' : 'Dilangkau untuk hari ini.');
    },
    skipMsg: function (a) {
      var c = byId(a.dataset.cid), m = c && nextMsg(c); closeSheet();
      if (!c || !m) return;
      c.sent[m.id] = today(); save(); render(true);
      toast('"' + m.title + '" dilangkau untuk ' + pang(c) + '.');
    },
    testPerson: function (a) {
      var c = byId(a.dataset.cid), m = c && msgFor(c, a.dataset.slot); closeSheet();
      if (!c || !m) return;
      openWa(S.settings.myPhone, broadcastText(c, m));
    },
    editPerson: function (a) { closeSheet(); go('penyimpan/' + a.dataset.cid); },
    markStop: function (a) {
      var c = byId(a.dataset.cid); if (!c) return;
      c.optOut = true;
      var b = campOf(a.dataset.slot) || C.ensureBatch(S, a.dataset.slot, now()); b.skip[c.id] = 1;
      save(); closeSheet(); render(true);
      toast(pang(c) + ' ditanda STOP.', null, { label: 'Batal', fn: function () { c.optOut = false; delete b.skip[c.id]; save(); render(true); } });
    },
    campStatus: function (a) { campDraft().status = a.dataset.v; render(true); },
    campGroup: function (a) {
      var d = campDraft(), g = a.dataset.g;
      if (!g) d.groups = []; else { var i = d.groups.indexOf(g); if (i >= 0) d.groups.splice(i, 1); else d.groups.push(g); }
      render(true);
    },
    campTag: function (a) { var d = campDraft(), t = a.dataset.t, i = d.tags.indexOf(t); if (i >= 0) d.tags.splice(i, 1); else d.tags.push(t); render(true); },
    campCreate: function () {
      var d = campDraft(), m = msgById(d.msg); if (!m) return;
      var k = C.newCampaign(S, m, { groups: d.groups.slice(), status: d.status, tags: d.tags.slice(), skipReceived: d.skipReceived !== false }, now());
      if (!k.ids.length) { S.campaigns.shift(); toast('Tiada penerima untuk pilihan ini.', 'err'); return; }
      ui.camp = null; save(); go('broadcast/' + k.id);
      ui.pendingToast = 'Broadcast "' + k.title + '" disediakan untuk ' + k.ids.length + ' orang.';
    },
    campDelete: function (a) {
      var k = campById(a.dataset.id); if (!k) return;
      confirmBox('Padam broadcast ini?', 'Senarai penerima "' + k.title + '" dibuang. Sejarah mesej yang dah dihantar kekal.', 'Padam', true).then(function (ok) {
        if (!ok) return;
        S.campaigns = S.campaigns.filter(function (x) { return x !== k; }); save(); go('hari-ini'); toast('Broadcast dipadam.');
      });
    },
    topup: function (a) {
      var added = C.topUpBatch(S, a.dataset.slot, 10, now()); save(); render(true);
      toast(added + ' orang ditambah ke sesi ini.');
    },
    bday: function (a) { bdaySheet(a.dataset.cid); },
    bdayNext: function (a) { ui.bdayOff[a.dataset.cid] = (ui.bdayOff[a.dataset.cid] || 0) + 1; bdaySheet(a.dataset.cid); },
    sendBday: function (a, e) {
      var c = byId(a.dataset.cid); if (!c) return;
      var t = C.pickBirthday(c, S.bdays, S.settings, now(), ui.bdayOff[c.id] || 0);
      if (!t) { e.preventDefault(); return; }
      if (c.demo) { e.preventDefault(); }
      else prepLink(a, c.phone, C.composeBirthday(c, t, S.settings, now()));
      c.bday = c.bday || {}; c.bday[now().getFullYear()] = Date.now(); save();
      setTimeout(function () { closeSheet(); render(true); if (c.demo) toast('Data contoh: WhatsApp tidak dibuka.'); }, 0);
    },
    sendDirect: function (a, e) {
      var c = byId(a.dataset.cid), m = c && nextMsg(c);
      if (!c || !m) { e.preventDefault(); return; }
      if (c.demo) { e.preventDefault(); markSent(c, m, null); render(true); toast('Data contoh: WhatsApp tidak dibuka. Ditanda dihantar.'); return; }
      prepLink(a, c.phone, broadcastText(c, m));
      setTimeout(function () { markSent(c, m, null); render(true); toast('Ditanda dihantar: ' + m.title); }, 0);
    },
    setFilter: function (a) { ui.cf = a.dataset.f || 'semua'; ui.q = ''; ui.climit = 150; },
    filter: function (a) { ui.cf = a.dataset.f; ui.climit = 150; render(true); },
    more: function () { ui.climit += 150; refreshList(); },
    addTag: function (a) {
      var inp = $('[data-cf="tags"]'); var tags = C.parseTags(inp.value);
      if (!tags.some(function (t) { return t.toLowerCase() === a.dataset.tag.toLowerCase(); })) tags.push(a.dataset.tag);
      inp.value = tags.join(', ');
    },
    saveCustomer: function (a, e) { e.preventDefault(); saveCustomer(a.dataset.id); },
    delCustomer: function (a) {
      var c = byId(a.dataset.cid); if (!c) return;
      confirmBox('Padam ' + (C.displayName(c.name) || 'penyimpan ini') + '?', 'Rekod dan sejarah mesejnya akan dipadam.', 'Padam', true).then(function (ok) {
        if (!ok) return;
        S.customers = S.customers.filter(function (x) { return x.id !== c.id; }); idx = null; save(); go('penyimpan'); toast('Penyimpan dipadam.');
      });
    },
    delHist: function (a) {
      var c = byId(a.dataset.cid); if (!c) return;
      delete c.sent[a.dataset.mid];
      var vals = Object.keys(c.sent).map(function (k) { return c.sent[k]; });
      c.last = vals.length ? Math.max.apply(null, vals) : null;
      save(); render(true);
    },
    importPaste: function () {
      var t = ($('#paste') || {}).value || '';
      var rows = C.parseCSV(t);
      if (!rows.length) { toast('Tampal data dahulu.', 'err'); return; }
      startMapping([{ name: 'Data ditampal', rows: rows }], 'Data ditampal');
    },
    impCancel: function () { ui.imp = null; render(); },
    impClose: function () { ui.imp = null; },
    importGo: function () {
      var imp = ui.imp; if (!imp) return;
      if (hasDemo()) { clearDemo(); imp.demoCleared = true; }
      var res = C.mergeImport(S, impItems(imp), { extraTag: imp.tag });
      idx = null; imp.result = res; imp.step = 'siap';
      save(); askPersist(); render(); window.scrollTo(0, 0);
    },
    msgCat: function (a) { ui.msgCat = a.dataset.f; render(true); },
    draftAge: function (a) {
      var d = ui.draft, g = a.dataset.g;
      if (!g) d.ages = [];
      else { var i = d.ages.indexOf(g); if (i >= 0) d.ages.splice(i, 1); else d.ages.push(g); d.ages.sort(function (x, y) { return groupIndex(x) - groupIndex(y); }); }
      if (g && d.ages.indexOf(g) >= 0) ui.previewAs = g;
      render(true);
    },
    insert: function (a) { insertAtCursor(a.dataset.v, ''); },
    wrap: function (a) { insertAtCursor(a.dataset.v, a.dataset.v); },
    saveMsg: function () { saveMsg(); },
    moveMsg: function (a) {
      var m = msgById(ui.draftFor); if (!m) return;
      var i = S.messages.indexOf(m), L = S.messages.length, j = i;
      if (a.dataset.dir === 'top') j = 0; else if (a.dataset.dir === 'bottom') j = L - 1; else if (a.dataset.dir === 'up') j = Math.max(0, i - 1); else j = Math.min(L - 1, i + 1);
      S.messages.splice(i, 1); S.messages.splice(j, 0, m); save(); render(true); toast('Dipindahkan ke nombor ' + (j + 1) + '.');
    },
    delMsg: function () {
      var m = msgById(ui.draftFor); if (!m) return;
      confirmBox('Padam mesej ini?', '"' + m.title + '" akan dikeluarkan daripada pustaka.', 'Padam', true).then(function (ok) {
        if (!ok) return;
        S.messages = S.messages.filter(function (x) { return x !== m; });
        if (m.builtin) S.removed.push(m.id);
        ui.draftFor = null; save(); go('mesej'); toast('Mesej dipadam.');
      });
    },
    testSend: function (a, e) {
      e.preventDefault();
      if (!S.settings.myPhone) { toast('Isi nombor WhatsApp anda dalam Tetapan dahulu.', 'err'); return; }
      var c = sampleCustomer(ui.previewAs || 'dewasa', ui.previewNM);
      var text = ui.draftFor && ui.draftFor.indexOf('bd:') === 0 ? C.composeBirthday(c, ui.draft, S.settings, now()) : C.composeBroadcast(c, ui.draft, S.settings, now(), { count: 1 });
      openWa(S.settings.myPhone, text);
    },
    saveBday: function () { saveBday(); },
    delBday: function () {
      var id = ui.draftFor.slice(3), b = S.bdays.filter(function (x) { return x.id === id; })[0]; if (!b) return;
      confirmBox('Padam ucapan ini?', '', 'Padam', true).then(function (ok) {
        if (!ok) return;
        S.bdays = S.bdays.filter(function (x) { return x !== b; }); if (b.builtin) S.removed.push(b.id);
        ui.draftFor = null; save(); go('ucapan'); toast('Ucapan dipadam.');
      });
    },
    saveOpeners: function () {
      var v = ($('#openers').value || '').split('\n').map(function (x) { return x.trim(); }).filter(Boolean);
      var g = ui.openerAge || 'semua';
      if (g === 'semua') S.settings.openers = v; else S.settings.openersByAge[g] = v;
      save(); render(true); toast('Ayat pembuka disimpan.');
    },
    resetOpeners: function () {
      var g = ui.openerAge || 'semua';
      if (g === 'semua') S.settings.openers = CONTENT.openers.slice(); else S.settings.openersByAge[g] = (CONTENT.openersByAge[g] || []).slice();
      save(); render(true); toast('Ayat pembuka asal digunakan.');
    },
    toggleDay: function (a) { var d = +a.dataset.d; S.settings.days[d] = S.settings.days[d] ? 0 : 1; save(); render(true); },
    ics: function () {
      var url = location.origin + location.pathname;
      var ics = C.buildICS(S.settings.slots, S.settings.days, url, now());
      download(new Blob([ics], { type: 'text/calendar;charset=utf-8' }), 'peringatan-servis-emas.ics');
      toast('Buka fail .ics untuk tambah peringatan harian ke kalendar.');
    },
    backup: function () { doBackup(); },
    shareBackup: function () { shareBackup(); },
    exportCsv: function () { exportCsv(); },
    resetAll: function () {
      confirmBox('Padam SEMUA data?', 'Semua penyimpan, sejarah mesej, mesej yang diubah dan tetapan akan dipadam daripada peranti ini. Tindakan ini tidak boleh dibatalkan. Buat backup dahulu jika perlu.', 'Padam semua', true).then(function (ok) {
        if (!ok) return;
        S = fresh(); idx = null; save(); go('hari-ini'); toast('Semua data dipadam.');
      });
    }
  };
  function groupIndex(g) { for (var i = 0; i < C.AGE_GROUPS.length; i++) if (C.AGE_GROUPS[i].id === g) return i; return 9; }

  /* ================= Perubahan (change/input) ================= */
  var CHG = {
    importFile: function (el) {
      var f = el.files && el.files[0]; if (!f) return;
      X.readFile(f, C.parseCSV).then(function (sheets) { startMapping(sheets, f.name); })
        .catch(function (e) { toast((e && e.message) || 'Fail tidak dapat dibaca.', 'err'); });
      el.value = '';
    },
    impMap: function (el) { var v = el.value; if (v === '') delete ui.imp.map[el.dataset.key]; else ui.imp.map[el.dataset.key] = +v; render(true); },
    impHeader: function (el) { ui.imp.header = el.checked; render(true); },
    impSheet: function (el) { ui.imp.si = +el.value; detectImp(); render(true); },
    impTag: function (el) { ui.imp.tag = el.value; },
    msgAge: function (el) { ui.msgAge = el.value; render(true); },
    campMsg: function (el) { campDraft().msg = el.value; render(true); },
    campSkipRecv: function (el) { campDraft().skipReceived = el.checked; render(true); },
    openerAge: function (el) { ui.openerAge = el.value; render(true); },
    previewAs: function (el) { ui.previewAs = el.value; refreshPreview(); },
    previewNM: function (el) { ui.previewNM = el.checked; refreshPreview(); },
    readGroup: function (el) { go('baca/' + el.value); },
    readNM: function (el) { ui.previewNM = el.checked; render(true); },
    draft: function (el) {
      var k = el.dataset.k;
      ui.draft[k] = el.type === 'checkbox' ? el.checked : el.value;
      refreshPreview();
    },
    restore: function (el) {
      var f = el.files && el.files[0]; if (!f) return;
      el.value = '';
      f.text().then(function (t) {
        var data;
        try { data = JSON.parse(t); } catch (e) { throw new Error('Fail ini bukan backup Servis Emas.'); }
        var st = data && data.state;
        if (!st || st.app !== 'servis-emas' || !Array.isArray(st.customers)) throw new Error('Fail ini bukan backup Servis Emas.');
        return confirmBox('Pulihkan backup?', 'Backup bertarikh ' + (data.exported ? C.fmtDate(new Date(data.exported)) : '(tiada tarikh)') + ' mengandungi ' + st.customers.length + ' penyimpan. Semua data sekarang dalam peranti ini akan diganti.', 'Pulihkan').then(function (ok) {
          if (!ok) return;
          S = st; migrate(); save(); askPersist(); go('hari-ini'); render(); toast('Backup dipulihkan: ' + S.customers.length + ' penyimpan.');
        });
      }).catch(function (e) { toast(e.message || 'Backup tidak dapat dibaca.', 'err'); });
    },
    setting: function (el) { applySetting(el); }
  };
  var INP = {
    search: function (el) { ui.q = el.value; ui.climit = 150; refreshList(); },
    draft: function (el) { ui.draft[el.dataset.k] = el.value; refreshPreview(); }
  };
  function refreshList() { var w = $('#clist-wrap'); if (w) w.innerHTML = customerList(now()); }
  function refreshPreview() {
    var p = $('#dprev'); if (!p || !ui.draft) return;
    if (ui.draftFor && ui.draftFor.indexOf('bd:') === 0) {
      var c = sampleCustomer(ui.previewAs || 'dewasa', ui.previewNM);
      p.innerHTML = '<div class="bubble" id="dbubble">' + C.waToHtml(C.composeBirthday(c, ui.draft, S.settings, now())) + '</div>';
    } else p.innerHTML = draftPreview(ui.draft);
  }
  function insertAtCursor(before, after) {
    var ta = $('#dbody'); if (!ta) return;
    var s = ta.selectionStart || 0, e = ta.selectionEnd || 0, v = ta.value;
    var sel = v.slice(s, e);
    ta.value = v.slice(0, s) + before + sel + after + v.slice(e);
    var pos = s + before.length + sel.length + (sel ? after.length : 0);
    ta.focus(); try { ta.setSelectionRange(pos, pos); } catch (err) { /* abaikan */ }
    ui.draft.body = ta.value; refreshPreview();
  }
  function setPath(obj, path, val) {
    var parts = path.split('.'), o = obj;
    for (var i = 0; i < parts.length - 1; i++) o = o[parts[i]];
    o[parts[parts.length - 1]] = val;
  }
  function applySetting(el) {
    var key = el.dataset.s, type = el.dataset.type, v;
    if (type === 'bool') v = el.checked;
    else if (type === 'num') { v = parseInt(el.value, 10); if (isNaN(v)) { toast('Masukkan nombor.', 'err'); return; } }
    else v = el.value.trim();
    if (key === 'myPhone') { v = C.normPhone(v); if (v && !C.phoneOk(v)) { toast('Nombor telefon tidak sah.', 'err'); return; } }
    if (key.indexOf('ageBounds.') === 0) {
      var i = +key.split('.')[1], b = S.settings.ageBounds.slice(); b[i] = v;
      for (var k = 1; k < 4; k++) if (b[k] <= b[k - 1]) { toast('Had umur mesti bertambah: ' + b.join(' < '), 'err'); render(true); return; }
    }
    if (key === 'minGapDays' && v < 1) v = 1;
    if (/^slots\.\d+\.size$/.test(key)) v = Math.max(1, Math.min(200, v));
    if (key === 'dailyLimit') v = Math.max(0, Math.min(500, v));
    setPath(S.settings, key, v);
    save();
    if (type === 'bool' || /^slots\.\d+\.(size|time)$/.test(key) || /^(ageBounds|honorific|myName|signature|mode)$|^ageBounds\./.test(key)) render(true);
    toast('Tetapan disimpan.');
  }

  /* ================= Simpan borang ================= */
  function saveCustomer(id) {
    var f = {};
    $$('[data-cf]').forEach(function (el) { f[el.dataset.cf] = el.type === 'checkbox' ? el.checked : el.value; });
    var name = C.displayName(f.name), phone = C.normPhone(f.phone);
    if (!name) { toast('Isi nama penyimpan.', 'err'); return; }
    if (!C.phoneOk(phone)) { toast('Nombor telefon tidak sah. Contoh: 012-345 6789', 'err'); return; }
    var c0 = id ? byId(id) : null; // PG Code tidak diketahui kekal tidak diketahui jika medan dibiar kosong
    var dob = C.parseDob(f.dob), by = 0, gender = f.gender;
    if (String(f.dob).trim() && !dob) { by = C.parseBirthYear(f.dob); if (!by) { toast('Tarikh lahir tidak difahami. Contoh: 16/08/1990', 'err'); return; } }
    var ic = C.icInfo(f.ic);
    if (String(f.ic || '').trim() && !ic) { toast('No. IC tidak sah. Contoh: 900816-14-5678', 'err'); return; }
    if (ic) { if (!dob) { dob = ic.dob; by = 0; } if (!gender) gender = ic.gender; }
    var data = { name: name, phone: phone, dob: dob, by: by, grp: f.grp || '', gender: gender, nick: String(f.nick || '').trim(), title: String(f.title || '').trim(),
      pg: String(f.pg || '').trim().toUpperCase() || (c0 && c0.pg == null ? null : ''), tags: C.parseTags(f.tags), note: String(f.note || '').trim(), salam: String(f.salam || '').trim() };
    var c = id ? byId(id) : null;
    var dupe = S.customers.filter(function (x) { return x.phone === phone && x !== c; })[0];
    if (!c) {
      c = C.newCustomer(S, data, now());
      S.customers.push(c); idx = null;
    } else Object.keys(data).forEach(function (k) { c[k] = data[k]; });
    c.optOut = !!f.optOut;
    save(); askPersist();
    toast(dupe ? 'Disimpan. Nombor ini sama dengan ' + C.displayName(dupe.name) + ' — mesej dihantar sekali sahaja.' : 'Disimpan.');
    go('penyimpan');
  }
  function saveMsg() {
    var d = ui.draft;
    if (!String(d.body || '').trim()) { toast('Isi mesej masih kosong.', 'err'); return; }
    if (!String(d.title || '').trim()) d.title = String(d.body).split('\n')[0].replace(/[*_~]/g, '').slice(0, 60) || 'Mesej tanpa tajuk';
    if (ui.draftFor === 'baru') {
      var m = { id: 'U' + Date.now().toString(36), cat: d.cat, title: d.title.trim(), body: d.body, ages: d.ages.slice(), islamic: !!d.islamic, opener: d.opener !== false, on: d.on !== false, builtin: false };
      if (d.top) S.messages.unshift(m); else S.messages.push(m);
    } else {
      var orig = msgById(ui.draftFor); if (!orig) return;
      ['cat', 'title', 'body', 'ages', 'islamic', 'opener', 'on'].forEach(function (k) { orig[k] = k === 'ages' ? d.ages.slice() : d[k]; });
      orig.title = String(orig.title).trim();
      if (orig.builtin) orig.edited = true;
    }
    ui.draftFor = null; save(); go('mesej'); toast('Mesej disimpan.');
  }
  function saveBday() {
    var d = ui.draft;
    if (!String(d.body || '').trim()) { toast('Ucapan masih kosong.', 'err'); return; }
    if (ui.draftFor === 'bd:baru') S.bdays.push({ id: 'UB' + Date.now().toString(36), body: d.body, ages: d.ages.slice(), islamic: !!d.islamic, on: d.on !== false, builtin: false });
    else {
      var id = ui.draftFor.slice(3), b = S.bdays.filter(function (x) { return x.id === id; })[0];
      if (b) { b.body = d.body; b.ages = d.ages.slice(); b.islamic = !!d.islamic; b.on = d.on !== false; if (b.builtin) b.edited = true; }
    }
    ui.draftFor = null; save(); go('ucapan'); toast('Ucapan disimpan.');
  }

  /* ================= Backup & eksport ================= */
  function backupFile() {
    var data = { app: 'servis-emas', kind: 'backup', v: 1, exported: new Date().toISOString(), state: S };
    var name = 'servis-emas-backup-' + C.isoDay(new Date()) + '.json';
    return { blob: new Blob([JSON.stringify(data)], { type: 'application/json' }), name: name };
  }
  function doBackup() {
    var f = backupFile();
    download(f.blob, f.name);
    S.settings.lastBackup = Date.now(); save();
    toast('Backup dimuat turun. Simpan fail ini di Google Drive atau iCloud.');
    if (parseRoute()[0] === 'hari-ini') render(true);
  }
  function shareBackup() {
    var f = backupFile();
    var file = new File([f.blob], f.name, { type: 'application/json' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share({ files: [file], title: 'Backup Servis Emas' }).then(function () {
        S.settings.lastBackup = Date.now(); save(); toast('Backup dikongsi.');
      }).catch(function () { /* dibatalkan */ });
    } else doBackup();
  }
  function exportCsv() {
    var n = now(), s = S.settings;
    var rows = [['Nama', 'No Telefon', 'Tarikh Lahir', 'Umur', 'Kumpulan Umur', 'Panggilan', 'Gelaran', 'PG Code', 'Jantina', 'Kumpulan', 'Catatan', 'STOP', 'Mesej Diterima', 'Terakhir Dihantar']];
    S.customers.forEach(function (c) {
      var p = C.dobParts(c.dob), g = C.viewGroup(c, s, n);
      rows.push([C.displayName(c.name), c.phone ? '0' + c.phone.slice(2) : '', p ? C.pad(p.d) + '/' + C.pad(p.m) + (p.y ? '/' + p.y : '') : (c.by ? String(c.by) : ''),
        C.ageOf(c, n) == null ? '' : C.ageOf(c, n), g ? C.groupLabel(g, s.ageBounds) : '', pang(c), c.title || '', c.pg || '', c.gender === 'L' ? 'Lelaki' : c.gender === 'P' ? 'Perempuan' : '',
        (c.tags || []).join(', '), c.note || '', c.optOut ? 'Ya' : '', Object.keys(c.sent || {}).length, c.last == null ? '' : C.isoDay(C.dayToDate(c.last))]);
    });
    download(new Blob(['﻿' + C.toCSV(rows)], { type: 'text/csv;charset=utf-8' }), 'senarai-penyimpan-' + C.isoDay(n) + '.csv');
  }

  /* ================= Data contoh ================= */
  function loadDemo() {
    var n = now(), y = n.getFullYear();
    function dobFor(age, offsetDays) {
      var d = new Date(n.getFullYear(), n.getMonth(), n.getDate() + (offsetDays || 0));
      return (y - age) + '-' + C.pad(d.getMonth() + 1) + '-' + C.pad(d.getDate());
    }
    var people = [
      ['Siti Aminah binti Ali', 35, 0], ['Muhammad Hafiz bin Rahman', 27, 2], ['Hasnah binti Omar', 64, 0], ['Zulkifli bin Hassan', 46, 5],
      ['Nurul Izzah binti Kamal', 24, 40], ['Ahmad Faiz bin Ismail', 31, 90], ['Rosnah binti Abdullah', 55, 120], ['Kamarul Ariffin bin Yusof', 52, 200],
      ['Farah Nadia binti Yusof', 29, 160], ['Abdul Rahman bin Salleh', 61, 250], ['Noraini binti Mat Isa', 43, 300], ['Mohd Amir bin Zainal', 38, 330],
      ['Tan Mei Ling', 41, 70, 'P', 'Bukan Islam'], ['Kumar a/l Raju', 48, 15, '', 'Bukan Islam'], ['Wan Nur Aisyah binti Wan Ahmad', 33, 100],
      ['Faridah binti Hamzah', 58, 210], ['Syed Hakim bin Syed Ali', 26, 280], ['Azlina binti Rashid', 47, 140], ['Ismail bin Daud', 67, 6],
      ['Nur Syafiqah binti Azmi', 22, 190], ['Lim Chee Keong', 36, 220, 'L', 'Bukan Islam'], ['Haslinda binti Mokhtar', 39, 260], ['Roslan bin Kadir', 53, 30], ['Farid Iskandar', null, 0]
    ];
    people.forEach(function (p, i) {
      var c = C.newCustomer(S, { name: p[0], phone: '6010000' + C.pad(Math.floor(i / 10)) + (i % 10) + '0' + (i % 7), dob: p[1] != null ? dobFor(p[1], p[2]) : '', gender: p[3] || '', tags: ['DEMO'].concat(p[4] ? [p[4]] : []), demo: true }, n);
      S.customers.push(c);
    });
    idx = null; save(); render(); toast('Data contoh dimuatkan: ' + people.length + ' penyimpan.');
  }
  function clearDemo() { S.customers = S.customers.filter(function (c) { return !c.demo; }); idx = null; }

  /* ================= Pendengar acara ================= */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act]');
    if (!el) return;
    var fn = ACT[el.dataset.act];
    if (fn) fn(el, e);
  });
  document.addEventListener('change', function (e) {
    var el = e.target;
    if (el.dataset && el.dataset.s) { CHG.setting(el); return; }
    var c = el.closest && el.closest('[data-change]');
    if (c && CHG[c.dataset.change]) CHG[c.dataset.change](c, e);
  });
  document.addEventListener('input', function (e) {
    var el = e.target.closest && e.target.closest('[data-input]');
    if (el && INP[el.dataset.input]) INP[el.dataset.input](el, e);
  });
  document.addEventListener('submit', function (e) { e.preventDefault(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && $('#sheet-root').classList.contains('open')) closeSheet(); });
  window.addEventListener('hashchange', function () {
    var r = parseRoute();
    if (r[0] !== 'mesej' && r[0] !== 'ucapan') ui.draftFor = null;
    if (r[0] !== 'import') ui.imp = ui.imp && ui.imp.step === 'siap' ? null : ui.imp;
    ui.awaiting = null;
    closeSheet();
    render();
    window.scrollTo(0, 0);
  });
  function onReturn() {
    if (document.visibilityState !== 'visible') return;
    var r = parseRoute()[0];
    if (ui.renderDay !== today() || r === 'sesi' || r === 'hari-ini') {
      render(r === 'sesi');
      var f = $('.focus');
      if (f && r === 'sesi') { var top = f.getBoundingClientRect().top + window.scrollY - 140; if (top < window.scrollY || top > window.scrollY + window.innerHeight * 0.6) window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' }); }
    }
  }
  document.addEventListener('visibilitychange', onReturn);
  // Jika app dibuka dalam lebih satu tab, selaraskan supaya tab lama tak tulis ganti data baharu
  window.addEventListener('storage', function (e) {
    if (e.key !== KEY || e.newValue == null) return;
    try { S = JSON.parse(e.newValue); migrate(); } catch (err) { return; }
    var r = parseRoute()[0];
    if (r !== 'mesej' && r !== 'ucapan' && r !== 'penyimpan' && r !== 'tetapan') render(true);
  });
  window.addEventListener('pageshow', function (e) { if (e.persisted) onReturn(); });

  /* ================= Mula ================= */
  load();
  render();
  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    navigator.serviceWorker.register('sw.js').catch(function () { /* abaikan */ });
  }
  window.SEApp = { state: function () { return S; }, render: render, version: VERSION };
})();
