// Pelayan statik untuk ujian: servis folder public/ dengan header dari public/_headers
// (sama seperti Netlify), supaya CSP turut diuji.
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..', 'public');
const PORT = +(process.env.PORT || 8765);
const hdr = fs.readFileSync(path.join(ROOT, '_headers'), 'utf8');
const csp = (hdr.match(/Content-Security-Policy: (.+)/) || [])[1];
const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'application/javascript', '.css': 'text/css', '.png': 'image/png',
  '.webmanifest': 'application/manifest+json', '.json': 'application/json',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
};
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const f = path.join(ROOT, p);
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, {
    'Content-Type': types[path.extname(f)] || 'application/octet-stream',
    'Content-Security-Policy': csp, 'Referrer-Policy': 'no-referrer', 'X-Frame-Options': 'DENY'
  });
  fs.createReadStream(f).pipe(res);
});
if (require.main === module) server.listen(PORT, '127.0.0.1', () => console.log('Servis Emas di http://127.0.0.1:' + PORT + '/'));
module.exports = server;
