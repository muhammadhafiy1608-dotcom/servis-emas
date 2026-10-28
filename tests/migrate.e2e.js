// Ujian migrasi: keadaan v1 (pustaka lama) dimuatkan oleh app v1.1
const { chromium } = require('playwright');
const path = require('path');
const URL = 'http://127.0.0.1:' + (process.env.PORT || 8765) + '/';
let fails = 0;
function ok(cond, msg) { if (!cond) { fails++; console.log('  FAIL:', msg); } else console.log('  ok:', msg); }

// Bina keadaan v1 menggunakan kandungan v1 sebenar
delete globalThis.SE_CONTENT;
require(path.join(__dirname, 'fixtures', 'content-v1.js'));
const V1 = JSON.parse(JSON.stringify(globalThis.SE_CONTENT));
const day = Math.floor(Date.UTC(2026, 9, 27) / 864e5);
const msgs = V1.messages.map(m => Object.assign({}, m));
const editedId = msgs[5].id;
msgs[5].body = msgs[5].body + '\n\nVersi saya sendiri.';
msgs.splice(2, 0, { id: 'Uabc', cat: 'pengumuman', title: 'Promosi saya', body: 'Promosi khas!', ages: [], islamic: false, opener: true, on: true, builtin: false });
const removedId = 'E09';
const v1State = {
  app: 'servis-emas', v: 1, created: Date.now(), contentVersion: 1, removed: [removedId], seq: 2, batches: {},
  settings: {
    myName: 'Hafiy', myPhone: '', signature: '– {nama_saya}', salam: 'Assalamualaikum', nonMuslimTag: 'Bukan Islam', salamNonMuslim: 'Salam sejahtera',
    honorific: 'tuanpuan', openers: V1.openers.slice(), stopText: 'Balas STOP jika tak mahu terima tips ini lagi.', stopEvery: 5,
    slots: [{ id: 'pagi', name: 'Pagi', time: '09:00', size: 30, on: true }, { id: 'petang', name: 'Petang', time: '16:00', size: 30, on: true }, { id: 'malam', name: 'Malam', time: '20:30', size: 30, on: false }],
    days: [1, 1, 1, 1, 1, 1, 1], minGapDays: 7, repeatAfterDays: 180, ageBounds: [30, 40, 50, 60], linkMode: 'auto', autoMark: true, lastBackup: 0
  },
  messages: msgs.filter(m => m.id !== removedId),
  bdays: V1.birthdays.map(b => Object.assign({}, b)),
  customers: [
    { id: 'c1', seq: 1, name: 'Muhammad Hafiz bin Rahman', phone: '60123456789', dob: '2000-03-03', by: 0, gender: '', nick: '', tags: [], note: '', salam: '', optOut: false, added: day - 5, sent: { S00: day - 1 }, last: day - 1, bday: {} },
    { id: 'c2', seq: 2, name: 'Hasnah binti Omar', phone: '60134567788', dob: '', by: 0, gender: '', nick: '', tags: [], note: '', salam: '', optOut: false, added: day - 5, sent: {}, last: null, bday: {} }
  ]
};

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, timezoneId: 'Asia/Kuala_Lumpur' });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error' && !/fonts\.g|ERR_FAILED|net::/.test(m.text())) errors.push(m.text()); });
  await page.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
  await page.clock.setFixedTime(new Date('2026-10-28T21:00:00+08:00'));
  await page.addInitScript(s => { if (!sessionStorage.getItem('seeded')) { localStorage.setItem('servisEmas.v1', s); sessionStorage.setItem('seeded', '1'); } }, JSON.stringify(v1State));
  await page.goto(URL);
  await page.waitForSelector('.hero h1');
  const toast = await page.textContent('#toast').catch(() => '');
  console.log('   toast:', toast);
  ok(/Pustaka dikemas kini/.test(toast), 'toast kemas kini muncul');
  const S = await page.evaluate(() => window.SEApp.state());
  const ids = S.messages.map(m => m.id);
  ok(S.contentVersion === 2, 'contentVersion 2');
  ok(S.messages.length === 166 - 1 + 1, 'jumlah = 166 - 1 dipadam + 1 sendiri: ' + S.messages.length);
  ok(!ids.includes(removedId), 'mesej yang pengguna padam tidak kembali');
  ok(ids.indexOf('Uabc') === 2, 'mesej sendiri kekal pada kedudukan: ' + ids.indexOf('Uabc'));
  const ed = S.messages.find(m => m.id === editedId);
  ok(ed && ed.body.includes('Versi saya sendiri') && ed.edited === true, 'mesej yang diubah dikekalkan: ' + editedId);
  const e01 = S.messages.find(m => m.id === 'E01');
  ok(e01 && e01.body.includes('kecut'), 'mesej lalai tak diubah diganti versi baharu');
  ok(S.customers.length === 2 && S.customers[0].sent.S00 === day - 1, 'penyimpan & sejarah kekal');
  ok(S.settings.honorific === 'umur', 'panggilan bertukar ke ikut umur');
  ok(S.settings.openersByAge && S.settings.openersByAge.muda.length === 4, 'pembuka ikut umur ditambah');
  ok(S.bdays.length === 12, 'ucapan hari jadi 12: ' + S.bdays.length);
  // Muat semula: tiada migrasi berulang
  await page.reload();
  await page.waitForSelector('.hero h1');
  const S2 = await page.evaluate(() => window.SEApp.state());
  ok(S2.messages.length === S.messages.length && JSON.stringify(S2.messages.map(m => m.id)) === JSON.stringify(ids), 'muat semula stabil');
  // Mesej seterusnya Hafiz (muda) ikut pustaka baharu, pembuka muda
  await page.goto(URL + '#/penyimpan/c1');
  await page.waitForSelector('#cform');
  const sum = await page.textContent('.kv');
  console.log('   ringkasan Hafiz:', sum.replace(/\s+/g, ' ').slice(0, 160));
  ok(/Muda/.test(sum), 'Hafiz dalam kumpulan Muda');
  ok(errors.length === 0, 'tiada ralat: ' + errors.join(' | '));
  await browser.close();
  console.log(fails ? fails + ' FAILED' : 'ALL PASSED');
  process.exit(fails ? 1 : 0);
})();
