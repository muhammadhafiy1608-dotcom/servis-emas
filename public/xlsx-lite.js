/* Servis Emas — pembaca fail Excel (.xlsx) & CSV ringkas, tanpa pustaka luar.
 * Guna DecompressionStream('deflate-raw') + DOMParser (Safari 16.4+, Chrome 80+).
 */
(function (root) {
  'use strict';
  var X = {};

  function byTag(el, name) { return el.getElementsByTagNameNS('*', name); }

  async function inflateRaw(u8) {
    var ds = new DecompressionStream('deflate-raw');
    var stream = new Blob([u8]).stream().pipeThrough(ds);
    return new Uint8Array(await new Response(stream).arrayBuffer());
  }

  function readZip(buf) {
    var u8 = new Uint8Array(buf), dv = new DataView(buf);
    var eocd = -1;
    for (var i = u8.length - 22; i >= Math.max(0, u8.length - 65557); i--) {
      if (dv.getUint32(i, true) === 0x06054b50) { eocd = i; break; }
    }
    if (eocd < 0) throw new Error('Fail ini bukan Excel (.xlsx) yang sah.');
    var count = dv.getUint16(eocd + 10, true);
    var p = dv.getUint32(eocd + 16, true);
    var td = new TextDecoder();
    var files = {};
    for (var n = 0; n < count; n++) {
      if (dv.getUint32(p, true) !== 0x02014b50) break;
      var method = dv.getUint16(p + 10, true);
      var csize = dv.getUint32(p + 20, true);
      var nameLen = dv.getUint16(p + 28, true), extraLen = dv.getUint16(p + 30, true), commLen = dv.getUint16(p + 32, true);
      var lho = dv.getUint32(p + 42, true);
      var name = td.decode(u8.subarray(p + 46, p + 46 + nameLen));
      var lname = dv.getUint16(lho + 26, true), lextra = dv.getUint16(lho + 28, true);
      var start = lho + 30 + lname + lextra;
      files[name] = { method: method, data: u8.subarray(start, start + csize) };
      p += 46 + nameLen + extraLen + commLen;
    }
    return files;
  }

  async function getText(files, name) {
    var f = files[name];
    if (!f) {
      var lower = name.toLowerCase();
      Object.keys(files).some(function (k) { if (k.toLowerCase() === lower) { f = files[k]; return true; } return false; });
    }
    if (!f) return null;
    var raw;
    if (f.method === 0) raw = f.data;
    else if (f.method === 8) raw = await inflateRaw(f.data);
    else throw new Error('Format mampatan fail tidak disokong.');
    return new TextDecoder('utf-8').decode(raw);
  }

  function colIndex(ref) {
    var m = /^([A-Z]+)/i.exec(ref || ''); if (!m) return -1;
    var n = 0, s = m[1].toUpperCase();
    for (var i = 0; i < s.length; i++) n = n * 26 + (s.charCodeAt(i) - 64);
    return n - 1;
  }

  function isDateFmt(id, code) {
    if ((id >= 14 && id <= 22) || (id >= 27 && id <= 36) || (id >= 50 && id <= 58)) return true;
    if (!code) return false;
    var c = String(code).replace(/"[^"]*"/g, '').replace(/\[[^\]]*\]/g, '').replace(/\\./g, '');
    return /[dy]/i.test(c) && /[dmy]/i.test(c);
  }

  function serialToISO(n) {
    var ms = Math.round((n - 25569) * 86400000);
    var d = new Date(ms);
    if (isNaN(d)) return String(n);
    return d.toISOString().slice(0, 10);
  }

  X.supported = function () { return typeof DecompressionStream !== 'undefined' && typeof DOMParser !== 'undefined'; };

  X.readXlsx = async function (buf) {
    if (!X.supported()) throw new Error('Pelayar ini tidak boleh baca .xlsx. Simpan fail sebagai CSV, atau guna pilihan Tampal.');
    var files = readZip(buf);
    var parser = new DOMParser();
    function parse(s) { return parser.parseFromString(s, 'application/xml'); }
    var wbText = await getText(files, 'xl/workbook.xml');
    if (!wbText) throw new Error('Fail Excel tidak lengkap (tiada workbook).');
    var wb = parse(wbText);
    var relsText = await getText(files, 'xl/_rels/workbook.xml.rels');
    var relMap = {};
    if (relsText) {
      var rels = byTag(parse(relsText), 'Relationship');
      for (var r = 0; r < rels.length; r++) relMap[rels[r].getAttribute('Id')] = rels[r].getAttribute('Target');
    }
    var ss = [];
    var ssText = await getText(files, 'xl/sharedStrings.xml');
    if (ssText) {
      var sis = byTag(parse(ssText), 'si');
      for (var i = 0; i < sis.length; i++) {
        var ts = byTag(sis[i], 't'), t = '';
        for (var j = 0; j < ts.length; j++) { if (ts[j].parentNode && ts[j].parentNode.localName === 'rPh') continue; t += ts[j].textContent; }
        ss.push(t);
      }
    }
    var dateXf = {};
    var stText = await getText(files, 'xl/styles.xml');
    if (stText) {
      var st = parse(stText);
      var custom = {};
      var nfs = byTag(st, 'numFmt');
      for (var a = 0; a < nfs.length; a++) custom[nfs[a].getAttribute('numFmtId')] = nfs[a].getAttribute('formatCode');
      var cellXfs = byTag(st, 'cellXfs')[0];
      if (cellXfs) {
        var idx = 0;
        for (var b = 0; b < cellXfs.childNodes.length; b++) {
          var xf = cellXfs.childNodes[b];
          if (xf.nodeType !== 1 || xf.localName !== 'xf') continue;
          var fid = +xf.getAttribute('numFmtId') || 0;
          if (isDateFmt(fid, custom[fid])) dateXf[idx] = true;
          idx++;
        }
      }
    }
    var sheetEls = byTag(wb, 'sheet');
    var out = [];
    for (var s = 0; s < sheetEls.length; s++) {
      var el = sheetEls[s];
      var rid = el.getAttribute('r:id') || el.getAttributeNS('http://schemas.openxmlformats.org/officeDocument/2006/relationships', 'id');
      var target = relMap[rid] || ('worksheets/sheet' + (s + 1) + '.xml');
      target = target.charAt(0) === '/' ? target.slice(1) : 'xl/' + target.replace(/^\.\//, '');
      var xml = await getText(files, target);
      if (!xml) continue;
      var doc = parse(xml);
      var rowsEl = byTag(doc, 'row');
      var rows = [];
      for (var ri = 0; ri < rowsEl.length; ri++) {
        var rowEl = rowsEl[ri];
        var rIndex = (+rowEl.getAttribute('r') || (rows.length + 1)) - 1;
        var arr = [];
        var cells = byTag(rowEl, 'c');
        var ci = 0;
        for (var k = 0; k < cells.length; k++) {
          var c = cells[k];
          var ref = c.getAttribute('r');
          if (ref) ci = colIndex(ref);
          var type = c.getAttribute('t');
          var sIdx = +c.getAttribute('s') || 0;
          var vEl = byTag(c, 'v')[0];
          var v = vEl ? vEl.textContent : '';
          var val;
          if (type === 's') val = ss[+v] != null ? ss[+v] : '';
          else if (type === 'inlineStr') { var its = byTag(c, 't'), tt = ''; for (var q = 0; q < its.length; q++) tt += its[q].textContent; val = tt; }
          else if (type === 'b') val = v === '1' ? 'TRUE' : 'FALSE';
          else if (type === 'str' || type === 'e' || type === 'd') val = v;
          else if (v !== '' && dateXf[sIdx] && !isNaN(+v)) val = serialToISO(+v);
          else val = v;
          arr[ci] = val;
          ci++;
        }
        for (var z = 0; z < arr.length; z++) if (arr[z] == null) arr[z] = '';
        rows[rIndex] = arr;
      }
      var clean = [];
      for (var y = 0; y < rows.length; y++) clean.push(rows[y] || []);
      out.push({ name: el.getAttribute('name') || ('Sheet' + (s + 1)), rows: clean });
    }
    if (!out.length) throw new Error('Tiada helaian (sheet) dalam fail ini.');
    return out;
  };

  X.decodeText = function (buf) {
    var u8 = new Uint8Array(buf);
    if (u8[0] === 0xFF && u8[1] === 0xFE) return new TextDecoder('utf-16le').decode(u8);
    if (u8[0] === 0xFE && u8[1] === 0xFF) return new TextDecoder('utf-16be').decode(u8);
    var t = new TextDecoder('utf-8').decode(u8);
    if (t.indexOf('�') >= 0) { try { t = new TextDecoder('windows-1252').decode(u8); } catch (e) { /* kekal utf-8 */ } }
    return t;
  };

  // Baca fail (File) → [{name, rows}]
  X.readFile = async function (file, parseCSV) {
    var buf = await file.arrayBuffer();
    var u8 = new Uint8Array(buf, 0, Math.min(4, buf.byteLength));
    var isZip = u8[0] === 0x50 && u8[1] === 0x4B;
    var name = (file.name || '').toLowerCase();
    if (/\.numbers$/.test(name)) throw new Error('Fail Apple Numbers belum disokong. Dalam Numbers, pilih Kongsi/Eksport → Excel atau CSV.');
    if (/\.xls$/.test(name) && !isZip) throw new Error('Format .xls lama tidak disokong. Buka dalam Excel dan simpan sebagai .xlsx atau CSV.');
    if (isZip) return X.readXlsx(buf);
    return [{ name: file.name || 'CSV', rows: parseCSV(X.decodeText(buf)) }];
  };

  root.SEXlsx = X;
})(typeof window !== 'undefined' ? window : globalThis);
