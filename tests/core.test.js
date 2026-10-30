const assert = require('assert');
const C = require('../public/core.js');
require('../public/content.js');
const CONTENT = globalThis.SE_CONTENT;
let pass = 0;
function t(name, fn) { try { fn(); pass++; } catch (e) { console.error('FAIL', name, '\n ', e.message); process.exitCode = 1; } }

// ---------- phone ----------
t('phone 012', () => assert.strictEqual(C.normPhone('012-345 6789'), '60123456789'));
t('phone 011', () => assert.strictEqual(C.normPhone('011-2345 6789'), '601123456789'));
t('phone +60', () => assert.strictEqual(C.normPhone('+60 12-345 6789'), '60123456789'));
t('phone 60', () => assert.strictEqual(C.normPhone('60123456789'), '60123456789'));
t('phone excel lost zero', () => assert.strictEqual(C.normPhone(123456789), '60123456789'));
t('phone excel lost zero 011', () => assert.strictEqual(C.normPhone('1123456789'), '601123456789'));
t('phone 0060', () => assert.strictEqual(C.normPhone('0060123456789'), '60123456789'));
t('phone sci', () => assert.strictEqual(C.normPhone('6.01235E+10'), ''));
t('phone .0', () => assert.strictEqual(C.normPhone('60123456789.0'), '60123456789'));
t('phone sg plus', () => assert.strictEqual(C.normPhone('+65 9123 4567'), '6591234567'));
t('phone empty', () => assert.strictEqual(C.normPhone(''), ''));
t('phoneIsMy', () => { assert.ok(C.phoneIsMy('60123456789')); assert.ok(C.phoneIsMy('601123456789')); assert.ok(!C.phoneIsMy('60312345678')); });
t('fmtPhone', () => { assert.strictEqual(C.fmtPhone('60123456789'), '012-345 6789'); assert.strictEqual(C.fmtPhone('601123456789'), '011-2345 6789'); });

// ---------- dob ----------
const yNow = new Date().getFullYear();
t('dob dmy', () => assert.strictEqual(C.parseDob('16/08/1990'), '1990-08-16'));
t('dob dmy dash', () => assert.strictEqual(C.parseDob('16-8-1990'), '1990-08-16'));
t('dob mdy', () => assert.strictEqual(C.parseDob('08/16/1990'), '1990-08-16'));
t('dob ambiguous -> d/m', () => assert.strictEqual(C.parseDob('05/06/1990'), '1990-06-05'));
t('dob iso', () => assert.strictEqual(C.parseDob('1990-08-16'), '1990-08-16'));
t('dob iso time', () => assert.strictEqual(C.parseDob('1990-08-16T00:00:00.000Z'), '1990-08-16'));
t('dob yy', () => assert.strictEqual(C.parseDob('16/08/90'), '1990-08-16'));
t('dob yy 2005', () => assert.strictEqual(C.parseDob('16/08/05'), '2005-08-16'));
t('dob no year', () => assert.strictEqual(C.parseDob('16/08'), '0000-08-16'));
t('dob malay month', () => assert.strictEqual(C.parseDob('16 Ogos 1990'), '1990-08-16'));
t('dob eng month', () => assert.strictEqual(C.parseDob('16 Aug 1990'), '1990-08-16'));
t('dob month first', () => assert.strictEqual(C.parseDob('August 16, 1990'), '1990-08-16'));
t('dob disember', () => assert.strictEqual(C.parseDob('1 Disember'), '0000-12-01'));
t('dob excel serial', () => assert.strictEqual(C.parseDob('33101'), '1990-08-16'));
t('dob excel number', () => assert.strictEqual(C.parseDob(33101), '1990-08-16'));
t('dob 8 digits', () => assert.strictEqual(C.parseDob('19900816'), '1990-08-16'));
t('dob 8 digits dmy', () => assert.strictEqual(C.parseDob('16081990'), '1990-08-16'));
t('dob invalid', () => assert.strictEqual(C.parseDob('31/02/1990'), ''));
t('dob feb29 leap', () => assert.strictEqual(C.parseDob('29/02/1992'), '1992-02-29'));
t('dob feb29 nonleap', () => assert.strictEqual(C.parseDob('29/02/1991'), ''));
t('dob from ic in dob col', () => assert.strictEqual(C.parseDob('900816-14-5678'), '1990-08-16'));
t('dob date obj', () => assert.strictEqual(C.parseDob(new Date(1990, 7, 16)), '1990-08-16'));
t('dob year only -> none', () => assert.strictEqual(C.parseDob('1990'), ''));
t('birthYear', () => assert.strictEqual(C.parseBirthYear('1990'), 1990));
t('age parse', () => { assert.strictEqual(C.parseAge('35'), 35); assert.strictEqual(C.parseAge('30-39'), 35); assert.strictEqual(C.parseAge('35 tahun'), 35); assert.strictEqual(C.parseAge('abc'), null); });

// ---------- IC ----------
t('ic male', () => assert.deepStrictEqual(C.icInfo('900816-14-5671'), { dob: '1990-08-16', gender: 'L' }));
t('ic female', () => assert.deepStrictEqual(C.icInfo('900816145678'), { dob: '1990-08-16', gender: 'P' }));
t('ic 2001', () => assert.deepStrictEqual(C.icInfo('011203-10-1234'), { dob: '2001-12-03', gender: 'P' }));
t('ic bad', () => assert.strictEqual(C.icInfo('901316145678'), null));

// ---------- age ----------
const now = new Date(2026, 9, 28, 9, 30); // 28 Okt 2026, 9:30 pagi (Rabu)
t('age before bday', () => assert.strictEqual(C.ageOf({ dob: '1990-12-01' }, now), 35));
t('age after bday', () => assert.strictEqual(C.ageOf({ dob: '1990-08-16' }, now), 36));
t('age by', () => assert.strictEqual(C.ageOf({ dob: '', by: 1980 }, now), 46));
t('age none', () => assert.strictEqual(C.ageOf({ dob: '0000-08-16' }, now), null));
t('groups', () => {
  assert.strictEqual(C.ageGroupOf(25), 'muda'); assert.strictEqual(C.ageGroupOf(30), 'dewasa');
  assert.strictEqual(C.ageGroupOf(45), 'pertengahan'); assert.strictEqual(C.ageGroupOf(55), 'matang');
  assert.strictEqual(C.ageGroupOf(60), 'warga'); assert.strictEqual(C.ageGroupOf(null), null);
});
t('group labels ikut Category Excel', () => {
  assert.strictEqual(C.groupLabel('muda'), 'MB30 (18–25)'); assert.strictEqual(C.groupLabel('dewasa'), 'CX (26–35)'); assert.strictEqual(C.groupLabel('pertengahan'), 'CY (36–45)');
  assert.strictEqual(C.groupLabel('matang'), 'CZ (46–55)'); assert.strictEqual(C.groupLabel('warga'), 'Pencen (56+)'); assert.strictEqual(C.groupLabel('junior'), 'Junior (bawah 18)');
  assert.strictEqual(C.groupLabel('dewasa', [30, 40, 50, 60]), 'CX (30–39)');
});
t('Category Excel ↔ kumpulan', () => {
  [[17, 'muda'], [18, 'muda'], [25, 'muda'], [26, 'dewasa'], [35, 'dewasa'], [36, 'pertengahan'], [45, 'pertengahan'], [46, 'matang'], [55, 'matang'], [56, 'warga']]
    .forEach(([a, g]) => assert.strictEqual(C.ageGroupOf(a), g, String(a)));
  assert.deepStrictEqual(['MB30', 'CX', 'CY', 'CZ', 'Pencen', 'Junior'].map(C.parseAgeGroup), ['muda', 'dewasa', 'pertengahan', 'matang', 'warga', 'muda']);
  assert.strictEqual(C.viewGroup({ dob: '2015-01-01' }, {}, now), 'junior'); assert.strictEqual(C.viewGroup({ dob: '2003-01-01' }, {}, now), 'muda');
});

// ---------- birthday ----------
t('isBirthday', () => { assert.ok(C.isBirthday('1990-10-28', now)); assert.ok(!C.isBirthday('1990-10-29', now)); });
t('feb29 on 28 nonleap', () => assert.ok(C.isBirthday('1992-02-29', new Date(2027, 1, 28))));
t('feb29 not on 28 leap', () => assert.ok(!C.isBirthday('1992-02-29', new Date(2028, 1, 28))));
t('daysToBirthday', () => { assert.strictEqual(C.daysToBirthday('1990-10-30', now), 2); assert.strictEqual(C.daysToBirthday('1990-10-27', now), 364); assert.strictEqual(C.daysToBirthday('0000-10-28', now), 0); });

// ---------- names ----------
const ni = n => C.nameInfo(n);
t('name bin', () => assert.deepStrictEqual(ni('MUHAMMAD HAFIY BIN ABDULLAH'), { short: 'Hafiy', gender: 'L' }));
t('name binti', () => assert.deepStrictEqual(ni('Siti Nor Hidayah binti Ahmad'), { short: 'Hidayah', gender: 'P' }));
t('name mohd ali', () => assert.strictEqual(ni('Mohd Ali').short, 'Ali'));
t('name ahmad bin', () => assert.strictEqual(ni('Ahmad bin Ismail').short, 'Ahmad'));
t('name ahmad faiz', () => assert.strictEqual(ni('Ahmad Faiz').short, 'Faiz'));
t('name chinese', () => assert.deepStrictEqual(ni('TAN AH KOW'), { short: 'Tan Ah Kow', gender: '', full: true }));
t('name indian', () => assert.deepStrictEqual(ni('Kumar a/l Muthu'), { short: 'Kumar', gender: 'L' }));
t('name indian f', () => assert.deepStrictEqual(ni('Kavitha A/P Subramaniam'), { short: 'Kavitha', gender: 'P' }));
t('name title', () => assert.strictEqual(ni('Dr. Aminah binti Ali').short, 'Aminah'));
t('name haji', () => assert.strictEqual(ni('Hj Mohd Nor Azman bin Hassan').short, 'Azman'));
t('name alias', () => assert.strictEqual(ni('Ahmad Fauzi @ Pojie bin Ali').short, 'Fauzi'));
t('name apostrophe', () => assert.strictEqual(ni("MA'AROF BIN SALLEH").short, "Ma'arof"));
t('name mixed case kept', () => assert.strictEqual(ni('McDonald Ross').short, 'McDonald'));
t('name tan sri', () => assert.strictEqual(ni('Tan Sri Abdul Rahman bin Ali').short, 'Rahman'));
t('name single', () => assert.strictEqual(ni('Nur').short, 'Nur'));
t('name hyphen', () => assert.strictEqual(ni('nurul ainul-mardhiah').short, 'Ainul-Mardhiah'));
t('titlecase markers', () => { assert.strictEqual(C.displayName('SITI AMINAH BINTI ALI'), 'Siti Aminah binti Ali'); assert.strictEqual(C.displayName('KUMAR A/L RAJU'), 'Kumar a/l Raju'); });
t('name empty', () => assert.strictEqual(ni('').short, ''));
t('name b.', () => assert.deepStrictEqual(ni('Ali B. Abu'), { short: 'Ali', gender: 'L' }));
t('name bt', () => assert.deepStrictEqual(ni('Aminah Bt Yusof'), { short: 'Aminah', gender: 'P' }));

const S = { honorific: 'tuanpuan', ageBounds: [30, 40, 50, 60], salam: 'Assalamualaikum', salamNonMuslim: 'Salam sejahtera', nonMuslimTag: 'Bukan Islam',
  myName: 'Hafiy', signature: '– {nama_saya}', stopText: 'Balas STOP jika tak mahu terima tips ini lagi.', stopEvery: 5, openers: CONTENT.openers,
  minGapDays: 7, repeatAfterDays: 180, slots: [{ id: 'pagi', name: 'Pagi', time: '09:00', size: 30, on: true }, { id: 'petang', name: 'Petang', time: '16:00', size: 30, on: true }] };
t('panggilan tuan', () => assert.strictEqual(C.panggilan({ name: 'Ali bin Abu' }, S, now), 'Tuan Ali'));
t('panggilan puan', () => assert.strictEqual(C.panggilan({ name: 'Siti Aminah' }, S, now), 'Puan Aminah'));
t('panggilan nick', () => assert.strictEqual(C.panggilan({ name: 'Siti Aminah', nick: 'Kak Minah' }, S, now), 'Kak Minah'));
t('panggilan unknown gender', () => assert.strictEqual(C.panggilan({ name: 'Hafiy Aiman' }, S, now), 'Hafiy'));
t('panggilan ic gender', () => assert.strictEqual(C.panggilan({ name: 'Hafiy Aiman', gender: 'L' }, S, now), 'Tuan Hafiy'));
t('panggilan nama mode', () => assert.strictEqual(C.panggilan({ name: 'Ali bin Abu' }, Object.assign({}, S, { honorific: 'nama' }), now), 'Ali'));
t('panggilan umur mode young', () => assert.strictEqual(C.panggilan({ name: 'Ali bin Abu', dob: '2000-01-01' }, Object.assign({}, S, { honorific: 'umur' }), now), 'Ali'));
t('panggilan umur mode old', () => assert.strictEqual(C.panggilan({ name: 'Ali bin Abu', dob: '1980-01-01' }, Object.assign({}, S, { honorific: 'umur' }), now), 'Tuan Ali'));
t('panggilan chinese with gender', () => { assert.strictEqual(C.panggilan({ name: 'Lim Chee Keong', gender: 'L' }, S, now), 'Tuan Lim'); assert.strictEqual(C.panggilan({ name: 'Tan Mei Ling' }, S, now), 'Tan Mei Ling'); });
t('panggilan empty', () => assert.strictEqual(C.panggilan({ name: '' }, S, now), 'tuan/puan'));

// ---------- message selection ----------
const msgs = CONTENT.messages;
function cust(o) { return Object.assign({ id: 'c' + Math.random().toString(36).slice(2), name: 'Ali bin Abu', phone: '60123456789', dob: '', by: 0, tags: [], sent: {}, last: null, seq: 1 }, o); }
t('first message is welcome', () => assert.strictEqual(C.nextMessage(cust({}), msgs, S, C.dayNum(now), now).id, 'S00'));
t('age-specific appears', () => {
  const c = cust({ dob: '1990-01-01' }); // 36 -> dewasa
  const seq = []; let d = C.dayNum(now);
  for (let i = 0; i < 6; i++) { const m = C.nextMessage(c, msgs, S, d, now); seq.push(m.id); c.sent[m.id] = d++; }
  assert.deepStrictEqual(seq, ['S00', 'ZB01', 'ZB02', 'ZB03', 'ZB04', 'ZB05']); // skrip kategori Excel dahulu
  for (let i = 0; i < 3; i++) { const m = C.nextMessage(c, msgs, S, d, now); seq.push(m.id); c.sent[m.id] = d++; }
  assert.deepStrictEqual(seq.slice(6), ['ZB06', 'ZB07', 'ZB08']);
  assert.strictEqual(C.nextMessage(c, msgs, S, d, now).id, 'ZB09'); // kemudian Set 2, baru pustaka asal
});
t('no age -> general only', () => {
  const c = cust({}); const all = new Set(); let d = 1000;
  for (;;) { const m = C.nextMessage(c, msgs, Object.assign({}, S, { repeatAfterDays: 0 }), d, now); if (!m) break; all.add(m.id); c.sent[m.id] = d++; }
  assert.strictEqual(all.size, 46);
  for (const id of all) assert.ok(/^[SEKH]/.test(id), id);
});
t('non-muslim skips islamic', () => {
  const c = cust({ tags: ['Bukan Islam'], dob: '1965-03-03' }); let d = 1000; const got = [];
  for (;;) { const m = C.nextMessage(c, msgs, Object.assign({}, S, { repeatAfterDays: 0 }), d, now); if (!m) break; got.push(m); c.sent[m.id] = d++; }
  assert.ok(got.every(m => !m.islamic));
  assert.ok(got.some(m => m.id === 'W01')); // 61 tahun -> warga
});
t('repeat after days', () => {
  const c = cust({}); const s2 = Object.assign({}, S, { repeatAfterDays: 180 });
  msgs.forEach(m => { if (!m.ages.length) c.sent[m.id] = 1000; });
  c.sent.S00 = 900;
  assert.strictEqual(C.nextMessage(c, msgs, s2, 1079, now), null);
  assert.strictEqual(C.nextMessage(c, msgs, s2, 1080, now).id, 'S00');
  assert.strictEqual(C.nextMessage(c, msgs, Object.assign({}, s2, { repeatAfterDays: 0 }), 5000, now), null);
});

// ---------- batches ----------
function mkState(n) {
  const st = { settings: S, messages: msgs, customers: [], batches: {}, seq: 0 };
  for (let i = 0; i < n; i++) {
    const c = C.newCustomer(st, { name: 'Pelanggan ' + i + ' bin Ali', phone: '6012' + String(1000001 + i).slice(-7) }, now);
    st.customers.push(c);
  }
  return st;
}
t('batch size 30 & no overlap', () => {
  const st = mkState(100);
  const a = C.ensureBatch(st, 'pagi', now), b = C.ensureBatch(st, 'petang', now);
  assert.strictEqual(a.ids.length, 30); assert.strictEqual(b.ids.length, 30);
  assert.ok(a.ids.every(id => !b.ids.includes(id)));
  assert.strictEqual(C.ensureBatch(st, 'pagi', now), a); // stabil
});
t('batch excludes optout, dup phone, birthday, recent', () => {
  const st = mkState(5);
  st.customers[0].optOut = true;
  st.customers[1].phone = st.customers[2].phone; // [2] jadi pendua
  st.customers[3].dob = '1990-10-28'; // hari jadi hari ini
  st.customers[4].last = C.dayNum(now) - 3;
  const ctx = C.makeCtx(st, now);
  assert.deepStrictEqual(st.customers.map(c => C.blockReason(c, ctx)), ['stop', null, 'pendua', 'harijadi', 'jarak']);
  const b = C.ensureBatch(st, 'pagi', now);
  assert.deepStrictEqual(b.ids, [st.customers[1].id]);
});
t('batch order never-sent first then oldest', () => {
  const st = mkState(4); const today = C.dayNum(now);
  st.customers[0].last = today - 20; st.customers[0].sent = { S00: today - 20 };
  st.customers[1].last = today - 30; st.customers[1].sent = { S00: today - 30 };
  const b = C.ensureBatch(st, 'pagi', now);
  assert.deepStrictEqual(b.ids, [st.customers[2].id, st.customers[3].id, st.customers[1].id, st.customers[0].id]);
});
t('topUp adds more', () => {
  const st = mkState(50);
  C.ensureBatch(st, 'pagi', now);
  assert.strictEqual(C.topUpBatch(st, 'pagi', 10, now), 10);
  assert.strictEqual(st.batches[C.isoDay(now)].pagi.ids.length, 40);
});
t('batch keeps sent person (no self-skip)', () => {
  const st = mkState(40); const b = C.ensureBatch(st, 'pagi', now); const c = st.customers.find(x => x.id === b.ids[0]);
  const b2 = C.ensureBatch(st, 'pagi', now); c.sent.S00 = C.dayNum(now); c.last = C.dayNum(now); b2.done[c.id] = { m: 'S00', t: 1 };
  const b3 = C.ensureBatch(st, 'pagi', now); assert.ok(!b3.skip[c.id]); assert.strictEqual(b3.ids.length, 30);
});
t('batch skips stop & refills', () => {
  const st = mkState(40); const b = C.ensureBatch(st, 'pagi', now); const c = st.customers.find(x => x.id === b.ids[5]);
  c.optOut = true; const b2 = C.ensureBatch(st, 'pagi', now);
  assert.ok(b2.skip[c.id]); assert.strictEqual(b2.ids.filter(id => !b2.skip[id]).length, 30);
});
t('batch prunes deleted ids', () => {
  const st = mkState(40); C.ensureBatch(st, 'pagi', now); st.customers = st.customers.slice(20);
  const b = C.ensureBatch(st, 'pagi', now); assert.ok(b.ids.every(id => st.customers.some(c => c.id === id))); assert.strictEqual(b.ids.length, 20);
});
t('prune', () => {
  const st = mkState(1); st.batches['2026-01-01'] = {}; st.batches[C.isoDay(now)] = {};
  C.pruneBatches(st, now); assert.deepStrictEqual(Object.keys(st.batches), [C.isoDay(now)]);
});

// ---------- compose ----------
t('compose broadcast', () => {
  const c = cust({ id: 'cX', name: 'Siti Aminah binti Ali' });
  const txt = C.composeBroadcast(c, msgs[0], S, now);
  assert.ok(/^Assalamualaikum Puan Aminah/.test(txt), txt.split('\n')[0]);
  assert.ok(txt.includes('– Hafiy'));
  assert.ok(txt.includes('_Balas STOP'));
  c.sent = { S00: 1 };
  const t2 = C.composeBroadcast(c, msgs[1], S, now);
  assert.ok(!t2.includes('STOP'));
});
t('compose non-muslim salam', () => {
  const c = cust({ id: 'cY', name: 'Lim Kok Wing', tags: ['Bukan Islam'] });
  const txt = C.composeBroadcast(c, msgs[0], S, now);
  assert.ok(/^Salam sejahtera Lim Kok Wing/.test(txt), txt.split('\n')[0]);
});
t('compose no myName -> no signature', () => {
  const txt = C.composeBroadcast(cust({}), msgs[0], Object.assign({}, S, { myName: '' }), now);
  assert.ok(!txt.includes('– '));
});
t('compose waktu & hari', () => {
  const s2 = Object.assign({}, S, { openers: ['{salam} {panggilan}, selamat {waktu}! Hari {hari}.'] });
  const txt = C.composeBroadcast(cust({}), msgs[0], s2, now);
  assert.ok(txt.startsWith('Assalamualaikum Tuan Ali, selamat pagi! Hari Rabu.'), txt.split('\n')[0]);
});
t('compose empty salam tidy', () => {
  const s2 = Object.assign({}, S, { salam: '', openers: ['{salam} {panggilan} 😊'] });
  const txt = C.composeBroadcast(cust({}), msgs[0], s2, now);
  assert.ok(txt.startsWith('Tuan Ali 😊'), txt.split('\n')[0]);
});
t('birthday pick & compose', () => {
  const c = cust({ id: 'cB', name: 'Hasnah binti Omar', dob: '1958-10-28' });
  const opts = C.birthdayOptions(c, CONTENT.birthdays, S, now);
  assert.ok(opts.every(b => !b.ages.length || b.ages.includes('warga')));
  const b = C.pickBirthday(c, CONTENT.birthdays, S, now);
  const txt = C.composeBirthday(c, b, S, now);
  assert.ok(txt.includes('Puan Hasnah'), txt);
  assert.ok(txt.endsWith('– Hafiy'));
});
t('birthday non-muslim only universal', () => {
  const c = cust({ id: 'cN', name: 'Tan Ah Kow', dob: '1980-10-28', tags: ['bukan islam'] });
  const opts = C.birthdayOptions(c, CONTENT.birthdays, S, now);
  assert.ok(opts.length > 0 && opts.every(b => !b.islamic));
});

// ---------- links ----------
t('wa link', () => {
  assert.strictEqual(C.waLink('60123456789', 'Hai *Ali*\nApa khabar?', 'wa'), 'https://wa.me/60123456789?text=Hai%20*Ali*%0AApa%20khabar%3F');
  assert.ok(C.waLink('60123456789', 'x', 'app').startsWith('whatsapp://send?phone=60123456789&text='));
  assert.ok(C.waLink('60123456789', 'x', 'business').includes('package=com.whatsapp.w4b'));
});

// ---------- csv ----------
t('csv basic', () => assert.deepStrictEqual(C.parseCSV('Nama,No Tel\n"Ali, Abu",0123\n\n'), [['Nama', 'No Tel'], ['Ali, Abu', '0123']]));
t('csv semicolon', () => assert.deepStrictEqual(C.parseCSV('Nama;Tel\r\nAli;012\r\n'), [['Nama', 'Tel'], ['Ali', '012']]));
t('csv tab', () => assert.deepStrictEqual(C.parseCSV('Nama\tTel\nAli\t012'), [['Nama', 'Tel'], ['Ali', '012']]));
t('csv quotes', () => assert.deepStrictEqual(C.parseCSV('a,b\n"x ""y""","line1\nline2"'), [['a', 'b'], ['x "y"', 'line1\nline2']]));
t('toCSV injection safe', () => assert.strictEqual(C.toCSV([['=1+1', 'a,b']]), '"=1+1","a,b"'));

// ---------- mapping ----------
t('map headers', () => {
  const r = C.detectMapping([['Bil', 'Nama Penuh', 'Nama Panggilan', 'No. Tel', 'No IC', 'Tarikh Lahir', 'Kumpulan', 'Catatan', 'No Akaun GAP', 'Emel']]);
  assert.ok(r.hasHeader);
  assert.deepStrictEqual(r.map, { name: 1, nick: 2, phone: 3, ic: 4, dob: 5, tags: 6, note: 7 });
});
t('map no headers by content', () => {
  const rows = [['Ali bin Abu', '012-3456789', '16/08/1990'], ['Siti binti Ali', '0198765432', '01/01/1985'], ['Ah Kow', '+60 11-2345 6789', '3/3/1970']];
  const r = C.detectMapping(rows);
  assert.ok(!r.hasHeader);
  assert.deepStrictEqual(r.map, { name: 0, phone: 1, dob: 2 });
});
t('map ic content', () => {
  const rows = [['Ali bin Abu', '900816-14-5671', '0123456789'], ['Siti', '850101-10-5432', '0198765432']];
  assert.deepStrictEqual(C.detectMapping(rows).map, { name: 0, ic: 1, phone: 2 });
});
t('rowToCustomer ic', () => {
  const c = C.rowToCustomer(['ALI BIN ABU', '0123456789', '', '900816-14-5671'], { name: 0, phone: 1, dob: 2, ic: 3 });
  assert.strictEqual(c.name, 'Ali bin Abu'); assert.strictEqual(c.dob, '1990-08-16'); assert.strictEqual(c.gender, 'L'); assert.strictEqual(c.phone, '60123456789');
});
t('rowToCustomer age', () => {
  const c = C.rowToCustomer(['Ali', '0123456789', '35'], { name: 0, phone: 1, age: 2 });
  assert.strictEqual(c.by, yNow - 35);
});

// ---------- merge ----------
t('merge add/update/skip/shared', () => {
  const st = { customers: [], seq: 0 };
  const items = [
    { name: 'Ali Bin Abu', phone: '60123456789', rawPhone: '0123456789', dob: '', tags: [] },
    { name: 'Siti', phone: '', rawPhone: 'abc', tags: [] },
    { name: 'Ali bin Abu', phone: '60123456789', rawPhone: '0123456789', dob: '1990-08-16', tags: ['VIP'] },
    { name: 'Adam bin Ali', phone: '60123456789', rawPhone: '0123456789', dob: '2015-01-01', tags: [] },
    { name: '', phone: '', rawPhone: '', tags: [] }
  ];
  const r = C.mergeImport(st, items, { extraTag: 'Import Okt' });
  assert.strictEqual(r.added, 2); assert.strictEqual(r.updated, 1); assert.strictEqual(r.skipped.length, 1); assert.strictEqual(r.sharedPhone, 1);
  assert.strictEqual(st.customers[0].dob, '1990-08-16');
  assert.deepStrictEqual(st.customers[0].tags, ['Import Okt', 'VIP']);
  const prim = C.primaryIds(st.customers);
  assert.ok(prim[st.customers[0].id] && !prim[st.customers[1].id]);
});

// ---------- ics ----------
t('ics', () => {
  const ics = C.buildICS(S.slots, [1, 1, 1, 1, 1, 0, 0], 'https://x.netlify.app/', now);
  assert.ok(ics.includes('RRULE:FREQ=WEEKLY;BYDAY=SU,MO,TU,WE,TH'));
  assert.ok(ics.includes('DTSTART;TZID=Asia/Kuala_Lumpur:20261028T090000'));
  assert.ok(ics.includes('DTSTART;TZID=Asia/Kuala_Lumpur:20261028T160000'));
  assert.strictEqual((ics.match(/BEGIN:VEVENT/g) || []).length, 2);
});

// ---------- wa preview ----------
t('waToHtml', () => {
  assert.strictEqual(C.waToHtml('*Tebal* dan _condong_ <x>'), '<b>Tebal</b> dan <i>condong</i> &lt;x&gt;');
  assert.strictEqual(C.waToHtml('*"Emas dah mahal..."* 🤔'), '<b>&quot;Emas dah mahal...&quot;</b> 🤔');
  assert.strictEqual(C.waToHtml('a\nb'), 'a<br>b');
});

// ---------- content sanity ----------
t('all placeholders known', () => {
  const known = ['panggilan', 'nama', 'nama_pendek', 'salam', 'waktu', 'hari', 'nama_saya'];
  [...msgs, ...CONTENT.birthdays].forEach(m => (m.body.match(/\{(\w+)\}/g) || []).forEach(p => assert.ok(known.includes(p.slice(1, -1)), m.id + ' ' + p)));
  CONTENT.openers.forEach(o => (o.match(/\{(\w+)\}/g) || []).forEach(p => assert.ok(known.includes(p.slice(1, -1)), o)));
});
t('bold markers balanced', () => {
  msgs.forEach(m => m.body.split('\n').forEach(line => assert.strictEqual((line.match(/\*/g) || []).length % 2, 0, m.id + ': ' + line)));
});
t('every group has 24 asal (8 per kategori) + 16 skrip Excel', () => {
  ['muda', 'dewasa', 'pertengahan', 'matang', 'warga'].forEach(g => {
    assert.strictEqual(msgs.filter(m => m.ages.includes(g) && /^Z/.test(m.id) && m.src).length, 16, g + ' skrip (Set 1 + Set 2)');
    const l = msgs.filter(m => m.ages.includes(g) && !/^Z/.test(m.id));
    assert.strictEqual(l.length, 24, g);
    ['emas', 'kewangan', 'kehidupan'].forEach(cat => assert.strictEqual(l.filter(m => m.cat === cat).length, 8, g + ' ' + cat));
  });
});
t('ilmu ringkas: setiap mesej <= 50 patah perkataan', () => {
  msgs.forEach(m => { const w = m.body.replace(/[*_]/g, '').split(/\s+/).filter(Boolean).length; assert.ok(w <= 50, m.id + ' ' + w); });
});
t('tiada mesej berulang ID', () => { const ids = msgs.map(m => m.id); assert.strictEqual(new Set(ids).size, ids.length); });
t('semua ID v1 kekal', () => { Object.keys(CONTENT.v1.m).forEach(id => assert.ok(msgs.some(m => m.id === id), id)); });
t('tiada placeholder tak dikenali', () => {
  const ok = ['panggilan', 'nama', 'nama_pendek', 'salam', 'waktu', 'hari', 'nama_saya'];
  msgs.concat(CONTENT.birthdays).forEach(m => (m.body.match(/\{(\w+)\}/g) || []).forEach(p => assert.ok(ok.includes(p.slice(1, -1)), m.id + ' ' + p)));
});
t('kategori tak bersebelahan sama terlalu kerap (muda)', () => {
  const c = cust({ dob: (yNow - 25) + '-01-01' }); const seq = msgs.filter(m => C.msgMatches(m, c, S, now));
  let run = 1, maxRun = 1; for (let i = 1; i < seq.length; i++) { run = seq[i].cat === seq[i - 1].cat ? run + 1 : 1; maxRun = Math.max(maxRun, run); }
  assert.ok(maxRun <= 3, 'maxRun ' + maxRun); assert.strictEqual(seq.length, 86);
});

// ---------- kumpulan umur v2 ----------
t('parseAge 30an', () => assert.strictEqual(C.parseAge('30an'), 35));
t('parseAge 30-an', () => assert.strictEqual(C.parseAge('30-an'), 35));
t('parseAge 40s', () => assert.strictEqual(C.parseAge("40's"), 45));
t('parseAge 56+', () => assert.strictEqual(C.parseAge('56+'), 61));
t('parseAge 60 ke atas', () => assert.strictEqual(C.parseAge('60 ke atas'), 65));
t('parseAge range', () => assert.strictEqual(C.parseAge('20-29'), 25));
t('parseAgeGroup labels', () => {
  assert.strictEqual(C.parseAgeGroup('Muda'), 'muda'); assert.strictEqual(C.parseAgeGroup('Belia'), 'muda');
  assert.strictEqual(C.parseAgeGroup('Dewasa'), 'dewasa'); assert.strictEqual(C.parseAgeGroup('Pertengahan'), 'pertengahan');
  assert.strictEqual(C.parseAgeGroup('Pra-bersara'), 'matang'); assert.strictEqual(C.parseAgeGroup('pra pencen'), 'matang');
  assert.strictEqual(C.parseAgeGroup('Warga Emas'), 'warga'); assert.strictEqual(C.parseAgeGroup('Senior'), 'warga');
  assert.strictEqual(C.parseAgeGroup('VIP'), '');
});
t('guessField kumpulan umur', () => {
  assert.strictEqual(C.guessField('Kumpulan Umur'), 'age'); assert.strictEqual(C.guessField('Umur'), 'age');
  assert.strictEqual(C.guessField('Age Group'), 'age'); assert.strictEqual(C.guessField('Tahun Lahir'), 'age');
  assert.strictEqual(C.guessField('Tarikh Lahir'), 'dob'); assert.strictEqual(C.guessField('Kumpulan'), 'tags');
});
t('rowToCustomer label kumpulan -> grp', () => {
  const r = C.rowToCustomer(['Hasnah binti Omar', '0134567788', 'Warga emas'], { name: 0, phone: 1, age: 2 });
  assert.strictEqual(r.grp, 'warga'); assert.strictEqual(r.by, 0);
  const r2 = C.rowToCustomer(['Ali', '0134567788', '30an'], { name: 0, phone: 1, age: 2 });
  assert.strictEqual(r2.grp, ''); assert.strictEqual(r2.by, yNow - 35);
});
t('groupOf manual override', () => {
  assert.strictEqual(C.groupOf({ dob: '', by: 0, grp: 'warga' }, S, now), 'warga');
  assert.strictEqual(C.groupOf({ dob: (yNow - 25) + '-01-01', grp: 'matang' }, S, now), 'matang');
  assert.strictEqual(C.groupOf({ dob: '', grp: 'bukan' }, S, now), null);
});
t('mergeImport bawa grp', () => {
  const st = { customers: [], seq: 0 };
  C.mergeImport(st, [{ name: 'Hasnah binti Omar', phone: '60134567788', rawPhone: '013', grp: 'warga', tags: [] }]);
  assert.strictEqual(st.customers[0].grp, 'warga');
  C.mergeImport(st, [{ name: 'Hasnah binti Omar', phone: '60134567788', rawPhone: '013', dob: '1960-05-05', tags: [] }]);
  assert.strictEqual(st.customers[0].grp, ''); assert.strictEqual(st.customers[0].dob, '1960-05-05');
});
t('pembuka ikut umur', () => {
  const s2 = Object.assign({}, S, { openers: ['UMUM {panggilan}'], openersByAge: { muda: ['MUDA {panggilan}'], warga: [] }, honorific: 'umur' });
  const young = cust({ name: 'Muhammad Hafiz bin Rahman', dob: (yNow - 25) + '-01-01' });
  const old = cust({ name: 'Hasnah binti Omar', dob: (yNow - 65) + '-01-01' });
  const none = cust({ name: 'Farid' });
  const m = msgs[1];
  assert.ok(C.composeBroadcast(young, m, s2, now).startsWith('MUDA Hafiz'), C.composeBroadcast(young, m, s2, now).slice(0, 30));
  assert.ok(C.composeBroadcast(old, m, s2, now).startsWith('UMUM Puan Hasnah'));
  assert.ok(C.composeBroadcast(none, m, s2, now).startsWith('UMUM Farid'));
});
t('pembuka lalai ikut umur wujud untuk semua kumpulan', () => {
  ['muda', 'dewasa', 'pertengahan', 'matang', 'warga'].forEach(g => assert.ok(CONTENT.openersByAge[g].length >= 3, g));
});

// ---------- gelaran (lajur Salutation) + nickname ----------
{
  const U = Object.assign({}, S, { honorific: 'umur' }), TP = Object.assign({}, S, { honorific: 'tuanpuan' });
  const old = '1980-01-01', young = '2003-01-01';
  t('titleKind', () => {
    assert.strictEqual(C.titleKind('Tuan'), 'formal'); assert.strictEqual(C.titleKind('cik'), 'formal'); assert.strictEqual(C.titleKind('Mr.'), 'formal');
    assert.strictEqual(C.titleKind('Cikgu'), 'tetap'); assert.strictEqual(C.titleKind('Boss'), 'tetap'); assert.strictEqual(C.titleKind("Dato'"), 'tetap');
    assert.strictEqual(C.titleKind('Tuan Haji'), 'tetap'); assert.strictEqual(C.titleKind('Tan Sri'), 'tetap'); assert.strictEqual(C.titleKind('Puan Sri'), 'tetap');
    assert.strictEqual(C.titleKind('Mama'), 'sendiri');
    assert.strictEqual(C.titleKind('Danny'), ''); assert.strictEqual(C.titleKind('Tan'), ''); assert.strictEqual(C.titleKind(''), '');
  });
  t('gelaran + nickname, 30 ke atas', () => assert.strictEqual(C.panggilan({ name: 'Wan Ali bin Abu', nick: 'Daniel', title: 'Tuan', dob: old }, U, now), 'Tuan Daniel'));
  t('gelaran dari Excel diikut walau bawah 30', () => {
    assert.strictEqual(C.panggilan({ name: 'Wan Ali bin Abu', nick: 'Daniel', title: 'Tuan', dob: young }, U, now), 'Tuan Daniel');
    assert.strictEqual(C.panggilan({ name: 'Nur Aina binti Abu', nick: 'Aina', title: 'Cik', dob: young }, U, now), 'Cik Aina');
  });
  t('tanpa gelaran: mod umur kekal (bawah 30 nama sahaja)', () => assert.strictEqual(C.panggilan({ name: 'Ali bin Abu', dob: young }, U, now), 'Ali'));
  t('gelaran + nickname, bawah 30 mod tuan/puan', () => assert.strictEqual(C.panggilan({ name: 'Aina binti Abu', nick: 'Aina', title: 'Cik', dob: young }, TP, now), 'Cik Aina'));
  t('gelaran + nickname, mod nama', () => assert.strictEqual(C.panggilan({ name: 'Aina binti Abu', nick: 'Aina', title: 'Puan', dob: old }, Object.assign({}, S, { honorific: 'nama' }), now), 'Aina'));
  t('gelaran tetap dipakai walau muda', () => {
    assert.strictEqual(C.panggilan({ name: 'Rosnah binti Abu', nick: 'Ros', title: 'Cikgu', dob: young }, U, now), 'Cikgu Ros');
    assert.strictEqual(C.panggilan({ name: 'Ali bin Abu', nick: 'Ali', title: 'boss', dob: young }, U, now), 'Boss Ali');
  });
  t('gelaran sendiri tanpa nama', () => assert.strictEqual(C.panggilan({ name: 'Rosnah binti Abu', nick: 'Ros', title: 'Mama', dob: old }, U, now), 'Mama'));
  t('nama kawan dalam lajur gelaran dipakai terus', () => assert.strictEqual(C.panggilan({ name: 'Daniel bin Abu', nick: 'Daniel', title: 'Danny', dob: old }, U, now), 'Danny'));
  t('gelaran tanpa nickname guna nama dari IC', () => assert.strictEqual(C.panggilan({ name: 'Puteri Aisyah binti Omar', title: 'Puan', dob: old }, U, now), 'Puan Aisyah'));
  t('panggilan penuh tidak digandakan gelaran', () => assert.strictEqual(C.panggilan({ name: 'Rosnah binti Abu', nick: 'Kak Ros', title: 'Puan', dob: old }, U, now), 'Kak Ros'));
  t('tanpa gelaran: nickname kekal panggilan penuh', () => assert.strictEqual(C.panggilan({ name: 'Rosnah binti Abu', nick: 'Ros', dob: old }, U, now), 'Ros'));
  t('guessField Master Database', () => {
    assert.strictEqual(C.guessField('SALUTATION'), 'title'); assert.strictEqual(C.guessField('Gelaran'), 'title');
    assert.strictEqual(C.guessField('NICKNAME'), 'nick'); assert.strictEqual(C.guessField('Panggilan'), 'nick');
    assert.strictEqual(C.guessField('Sapaan'), 'salam');
  });
  t('detectMapping Master Database', () => {
    const H = ['NO', 'PG CODE', 'PHONE', 'EMAIL', 'NAME', 'DOB', 'DOB (day)', 'DOB (month)', 'DOB (year)', 'AGE', 'Range Umur', 'Category', 'LOCALITY', 'BRANCH',
      'DATE REGISTER', 'SALUTATION', 'NICKNAME', 'REMARK', 'AUTODEBIT SUBSCRIPTION', 'AMOUNT AUTODEBIT', 'DATE START AUTODEBIT', 'DATE END AUTODEBIT', 'LINK UPDATE LOCALITY', 'First Name', 'Last Name'];
    const m = C.detectMapping([H]).map;
    assert.deepStrictEqual([m.pg, m.phone, m.name, m.dob, m.age, m.title, m.nick, m.note], [1, 2, 4, 5, 9, 15, 16, 17]);
    assert.strictEqual(m.salam, undefined); assert.strictEqual(m.tags, undefined);
  });
  t('dateOrder', () => {
    assert.strictEqual(C.dateOrder(['3/15/1990', '4/5/1991', '']), 'mdy');
    assert.strictEqual(C.dateOrder(['15/3/1990', '4/5/1991']), 'dmy');
    assert.strictEqual(C.dateOrder(['4/5/1991', '1990-01-02']), 'dmy');
  });
  t('dob ambiguous ikut lajur bulan/hari', () => {
    assert.strictEqual(C.parseDob('3/5/1990', 'mdy'), '1990-03-05');
    assert.strictEqual(C.parseDob('3/5/1990'), '1990-05-03');
    assert.strictEqual(C.parseDob('3/15/1990', 'mdy'), '1990-03-15');
    assert.strictEqual(C.parseDob('15/3/1990', 'mdy'), '1990-03-15');
  });
  t('rowToCustomer gelaran + tarikh bulan/hari', () => {
    const it = C.rowToCustomer(['Ali bin Abu', '0123456789', '3/5/1990', 'Tuan', 'Ali'], { name: 0, phone: 1, dob: 2, title: 3, nick: 4 }, { dateOrder: 'mdy' });
    assert.strictEqual(it.dob, '1990-03-05'); assert.strictEqual(it.title, 'Tuan'); assert.strictEqual(it.nick, 'Ali');
  });
  t('mergeImport simpan & kemas kini gelaran', () => {
    const st = { customers: [], seq: 0 };
    C.mergeImport(st, [{ name: 'Ali bin Abu', phone: '60123456789', rawPhone: '0123456789', title: 'Tuan', nick: 'Ali', tags: [] }]);
    assert.strictEqual(st.customers[0].title, 'Tuan');
    C.mergeImport(st, [{ name: 'Ali bin Abu', phone: '60123456789', rawPhone: '0123456789', title: 'Boss', nick: 'Ali', tags: [] }]);
    assert.strictEqual(st.customers.length, 1); assert.strictEqual(st.customers[0].title, 'Boss');
  });
}

// ---------- satu nombor satu mesej, nombor pengganti, Junior ----------
{
  t('nombor pengganti tidak sah', () => {
    ['601000000000', '60120000000', '60130000000'].forEach(p => { assert.ok(C.phoneDummy(p), p); assert.ok(!C.phoneOk(p), p); });
    ['60123000000', '60120000001', '60123456789', '601123456789'].forEach(p => assert.ok(C.phoneOk(p), p));
  });
  t('isJunior', () => {
    assert.ok(C.isJunior({ dob: '2015-01-01' }, now)); assert.ok(!C.isJunior({ dob: '2000-01-01' }, now)); assert.ok(!C.isJunior({ dob: '' }, now));
  });
  const SJ = Object.assign({}, S, { pauseJunior: true });
  function fam() {
    const st = { settings: SJ, messages: msgs, customers: [], batches: {}, seq: 0 };
    [['Adam bin Ali', '60123450001', '2015-03-03'], ['Ali bin Abu', '60123450001', '1980-03-03'], ['Aminah binti Abu', '60123450001', '1982-03-03'],
      ['Siti binti Omar', '60123450002', '1990-03-03'], ['Hana binti Omar', '60123450002', '1992-03-03'], ['Zack bin Omar', '60123450003', '2012-03-03']]
      .forEach(([name, phone, dob]) => st.customers.push(C.newCustomer(st, { name, phone, dob }, now)));
    return st;
  }
  t('Junior ditangguh, nombor dikongsi dihantar kepada ibu bapa', () => {
    const st = fam(); const ctx = C.makeCtx(st, now);
    assert.deepStrictEqual(st.customers.map(c => C.blockReason(c, ctx)), ['junior', null, 'pendua', null, 'pendua', 'junior']);
    const b = C.ensureBatch(st, 'pagi', now);
    assert.deepStrictEqual(b.ids, [st.customers[1].id, st.customers[3].id]);
  });
  t('Junior tidak ditangguh bila tetapan dimatikan', () => {
    const st = fam(); st.settings = Object.assign({}, SJ, { pauseJunior: false });
    const prim = C.primaryIds(st.customers, st.settings, now);
    assert.ok(prim[st.customers[0].id] && !prim[st.customers[1].id] && prim[st.customers[5].id]);
  });
  t('STOP sesiapa = nombor itu tidak dihantar', () => {
    const st = fam(); st.customers[4].optOut = true; const ctx = C.makeCtx(st, now);
    assert.strictEqual(C.blockReason(st.customers[3], ctx), 'stop');
    assert.ok(!C.ensureBatch(st, 'pagi', now).ids.includes(st.customers[3].id));
  });
  t('hari jadi ahli sekeluarga = nombor itu tiada broadcast hari ini', () => {
    const st = fam(); st.customers[2].dob = '1982-10-28'; const ctx = C.makeCtx(st, now);
    assert.strictEqual(C.blockReason(st.customers[1], ctx), 'harijadi');
    st.customers[2].dob = '1982-03-03'; st.customers[0].dob = '2015-10-28'; // hari jadi Junior yang ditangguh tidak menghalang
    assert.strictEqual(C.blockReason(st.customers[1], C.makeCtx(st, now)), null);
  });
}

// ---------- skrip kategori: tanda perlu set baharu ----------
t('scriptStats & scriptsLow', () => {
  const st = { settings: Object.assign({}, S, { pauseJunior: true }), messages: msgs, customers: [], batches: {}, seq: 0 };
  for (let i = 0; i < 10; i++) st.customers.push(C.newCustomer(st, { name: 'Ali ' + i + ' bin Abu', phone: '601234500' + (10 + i), dob: '2003-03-03' }, now));
  const scr = msgs.filter(m => m.src && m.ages.includes('muda'));
  assert.strictEqual(scr.length, 16);
  let x = C.scriptStats(st, now);
  assert.deepStrictEqual(x.muda, { people: 10, done: 0, scripts: 16 }); assert.deepStrictEqual(C.scriptsLow(x), []);
  st.customers.slice(0, 8).forEach(c => scr.forEach((m, j) => { c.sent[m.id] = 100 + j; }));
  x = C.scriptStats(st, now);
  assert.strictEqual(x.muda.done, 8); assert.deepStrictEqual(C.scriptsLow(x), ['muda']);
});
t('Set 2 menyusul selepas Set 1', () => {
  const c = cust({ dob: '2003-01-01' }); let d = C.dayNum(now); const seq = [];
  for (let i = 0; i < 17; i++) { const m = C.nextMessage(c, msgs, S, d, now); seq.push(m.id); c.sent[m.id] = d++; }
  assert.deepStrictEqual(seq.slice(1, 9), ['ZA01', 'ZA02', 'ZA03', 'ZA04', 'ZA05', 'ZA06', 'ZA07', 'ZA08']);
  assert.deepStrictEqual(seq.slice(9, 17), ['ZA09', 'ZA10', 'ZA11', 'ZA12', 'ZA13', 'ZA14', 'ZA15', 'ZA16']);
});

// ---------- PG Code (bakal pelanggan) & broadcast pilihan ----------
{
  t('PG Code: import & bakal pelanggan', () => {
    assert.strictEqual(C.guessField('PG CODE'), 'pg'); assert.strictEqual(C.guessField('Kod PG'), 'pg');
    const a = C.rowToCustomer(['Ali bin Abu', '0123456789', 'pg0123'], { name: 0, phone: 1, pg: 2 });
    const b = C.rowToCustomer(['Ali bin Abu', '0123456789', ''], { name: 0, phone: 1, pg: 2 });
    const c = C.rowToCustomer(['Ali bin Abu', '0123456789'], { name: 0, phone: 1 });
    assert.deepStrictEqual([a.pg, b.pg, c.pg], ['PG0123', '', null]);
    assert.ok(!C.isProspect(a) && C.isProspect(b) && !C.isProspect(c));
  });
  t('PG Code: import semula tidak buang PG Code, bakal pelanggan boleh jadi penyimpan', () => {
    const st = { customers: [], seq: 0 };
    C.mergeImport(st, [{ name: 'Ali bin Abu', phone: '60123456789', rawPhone: '0123456789', pg: '', tags: [] }]);
    assert.strictEqual(st.customers[0].pg, '');
    C.mergeImport(st, [{ name: 'Ali bin Abu', phone: '60123456789', rawPhone: '0123456789', pg: 'PG1', tags: [] }]);
    assert.strictEqual(st.customers[0].pg, 'PG1');
    C.mergeImport(st, [{ name: 'Ali bin Abu', phone: '60123456789', rawPhone: '0123456789', pg: '', tags: [] }]);
    assert.strictEqual(st.customers[0].pg, 'PG1');
  });
  t('skrip bakal pelanggan hanya untuk tiada PG Code; S00 hanya untuk penyimpan', () => {
    const zp = msgs.filter(m => m.aud === 'prospek');
    assert.strictEqual(zp.length, 10);
    const pros = cust({ pg: '', dob: '1990-01-01' }), saver = cust({ pg: 'PG1', dob: '1990-01-01' }), unk = cust({ dob: '1990-01-01' });
    assert.ok(C.msgMatches(zp[0], pros, S, now) && !C.msgMatches(zp[0], saver, S, now) && !C.msgMatches(zp[0], unk, S, now));
    const s00 = msgs.find(m => m.id === 'S00');
    assert.ok(!C.msgMatches(s00, pros, S, now) && C.msgMatches(s00, saver, S, now) && C.msgMatches(s00, unk, S, now));
    assert.strictEqual(C.nextMessage(pros, msgs, S, C.dayNum(now), now).id, 'ZP01');
  });
  function camp() {
    const st = { settings: Object.assign({}, S, { pauseJunior: true }), messages: msgs, customers: [], batches: {}, seq: 0 };
    [['Ali bin Abu', '60123450001', '1990-03-03', 'PG1'], ['Aina binti Abu', '60123450002', '2003-03-03', ''], ['Adam bin Ali', '60123450001', '2015-03-03', ''],
      ['Siti binti Omar', '60123450003', '1980-03-03', ''], ['Hana binti Omar', '60123450003', '1982-03-03', ''], ['Lim Wei', '60123450004', '1970-03-03', '']]
      .forEach(([name, phone, dob, pg]) => st.customers.push(C.newCustomer(st, { name, phone, dob, pg }, now)));
    st.customers[5].tags = ['Bukan Islam'];
    return st;
  }
  t('broadcast pilihan: penapis status, kategori & sebab', () => {
    const st = camp(), zp1 = msgs.find(m => m.id === 'ZP01'), e01 = msgs.find(m => m.id === 'E01');
    let p = C.campaignPreview(st, zp1, { status: 'prospek' }, now);
    assert.deepStrictEqual(p.ids, [st.customers[1].id, st.customers[3].id, st.customers[5].id]);
    assert.strictEqual(p.why.junior, 1); assert.strictEqual(p.why.pendua, 1);
    p = C.campaignPreview(st, zp1, {}, now); assert.strictEqual(p.why.sasaran, 1); // Ali ada PG Code
    p = C.campaignPreview(st, e01, { groups: ['muda'] }, now); assert.deepStrictEqual(p.ids, [st.customers[1].id]);
    st.customers[1].sent.E01 = 1; p = C.campaignPreview(st, e01, { groups: ['muda'] }, now); assert.strictEqual(p.why.diterima, 1);
    p = C.campaignPreview(st, e01, { groups: ['muda'], skipReceived: false }, now); assert.strictEqual(p.ids.length, 1);
    const isl = msgs.find(m => m.islamic && !m.aud);
    p = C.campaignPreview(st, isl, {}, now); assert.strictEqual(p.why.islamik, 1); // Lim (Bukan Islam)
  });
  t('broadcast pilihan: senarai, baki & had harian', () => {
    const st = camp(), zp1 = msgs.find(m => m.id === 'ZP01');
    const k = C.newCampaign(st, zp1, { status: 'prospek' }, now);
    assert.strictEqual(st.campaigns[0], k); assert.strictEqual(k.ids.length, 3); assert.strictEqual(C.campaignPending(st, k).length, 3);
    k.done[k.ids[0]] = { m: 'ZP01', t: now.getTime() }; k.skip[k.ids[1]] = 1;
    assert.deepStrictEqual(C.campaignPending(st, k), [k.ids[2]]);
    assert.strictEqual(C.sentToday(st, now), 1);
    st.customers.find(c => c.id === k.ids[2]).optOut = true; assert.strictEqual(C.campaignPending(st, k).length, 0);
  });
}

console.log(`${pass} tests passed`);
