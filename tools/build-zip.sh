#!/usr/bin/env bash
# Bina servis-emas-netlify.zip daripada folder public/ (untuk Netlify Drop).
set -euo pipefail
cd "$(dirname "$0")/../public"
OUT="../servis-emas-netlify.zip"
rm -f "$OUT"
zip -X -r "$OUT" . -x '.*' >/dev/null
echo "Siap: $(cd .. && pwd)/servis-emas-netlify.zip"
