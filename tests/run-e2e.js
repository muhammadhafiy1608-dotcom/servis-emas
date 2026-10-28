// Jalankan semua ujian pelayar: hidupkan pelayan, jalankan e2e.js dan migrate.e2e.js.
// Ujian dijalankan sebagai proses anak tak segerak supaya pelayan dalam proses ini terus melayan permintaan.
const { spawn } = require('child_process');
const path = require('path');
const server = require('./serve.js');
const PORT = +(process.env.PORT || 8765);

function run(file) {
  return new Promise(resolve => {
    const p = spawn(process.execPath, [path.join(__dirname, file)], { stdio: 'inherit', env: Object.assign({}, process.env, { PORT: String(PORT) }) });
    p.on('close', code => resolve(code));
  });
}

server.listen(PORT, '127.0.0.1', async () => {
  let failed = 0;
  for (const f of ['e2e.js', 'migrate.e2e.js']) {
    console.log('\n=== ' + f + ' ===');
    if ((await run(f)) !== 0) failed++;
  }
  server.close();
  console.log(failed ? '\n' + failed + ' fail ujian GAGAL' : '\nSemua ujian pelayar LULUS');
  process.exit(failed ? 1 : 0);
});
