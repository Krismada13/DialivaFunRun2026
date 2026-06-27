# Dialiva Fun Run — BIB Number Searcher

Halaman pencarian nomor BIB untuk peserta Dialiva Fun Run, dibangun dengan Next.js (Pages Router).

## Struktur Proyek

```
dialiva-fun-run/
├── pages/
│   ├── _app.js          # Load global CSS
│   ├── _document.js     # <html lang="id">, font Google
│   ├── index.js         # Halaman utama (form + hasil pencarian)
│   └── api/
│       └── search.js    # API route: POST { fullname, phone } -> hasil pencarian
├── lib/
│   └── registrants.js   # Sumber data peserta (saat ini dummy, siap diganti Google Sheets)
├── styles/
│   └── globals.css      # Semua styling (desain "race bib")
└── package.json
```

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## Cara kerja

1. User mengisi nama lengkap + nomor HP di form.
2. Frontend (`pages/index.js`) mengirim `POST /api/search`.
3. API route (`pages/api/search.js`) memanggil `findRegistrant()` dari `lib/registrants.js`.
4. Hasil dikembalikan sebagai JSON: `{ found: true, registrant }` atau `{ found: false }`.
5. Frontend menampilkan salah satu dari 4 state: idle, notfound, found, atau error.

Pencarian nama bersifat **exact match** (case-insensitive, setelah di-trim). Nomor HP dinormalisasi
dulu (hapus karakter non-digit, ubah prefix `62` jadi `0`) sebelum dibandingkan — jadi `+6281234...`,
`6281234...`, dan `081234...` semua dianggap sama.

## Menghubungkan ke Google Sheets

Saat ini `lib/registrants.js` memakai data dummy (array statis `DUMMY_REGISTRANTS`).
Untuk mengganti ke data live dari Google Sheets, edit fungsi `getRegistrants()`:

### Opsi A — Google Sheets API (lebih aman, butuh service account)

```js
import { google } from "googleapis";

export async function getRegistrants() {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON),
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: "Registrants!A2:I", // sesuaikan dengan kolom sheet kamu
  });

  return (res.data.values || []).map((row) => ({
    name: row[0],
    bibName: row[1],
    phone: row[2],
    jerseySize: row[3],
    bib: row[4],
    regid: row[5],
    category: row[6],
    cot: row[7],
    status: row[8],
  }));
}
```

Tambahkan `GOOGLE_SERVICE_ACCOUNT_JSON` dan `SHEET_ID` ke `.env.local`, dan jalankan
`npm install googleapis`.

### Opsi B — Sheet yang dipublish sebagai CSV/JSON (lebih simpel, sheet harus publik)

Jika sheet di-publish ke web (File → Share → Publish to web) sebagai CSV, atau dipasang lewat
layanan seperti [opensheet.elk.sh](https://github.com/benborgers/opensheet), kamu bisa langsung
fetch tanpa kredensial:

```js
export async function getRegistrants() {
  const res = await fetch(
    "https://opensheet.elk.sh/<SHEET_ID>/Registrants",
    { cache: "no-store" }
  );
  const rows = await res.json();
  return rows.map((row) => ({
    name: row["Nama Lengkap"],
    bibName: row["Nama BIB"],
    phone: row["No HP"],
    jerseySize: row["Ukuran Jersey"],
    bib: row["BIB"],
    regid: row["No Pendaftaran"],
    category: row["Kategori"],
    cot: row["Cut-Off Time"],
    status: row["Status"],
  }));
}
```

Sesuaikan nama kolom dengan header asli di Google Sheet kamu.

> Tip: tambahkan caching ringan (misalnya `revalidate` beberapa menit) jika sheet besar atau
> trafik tinggi, supaya tidak fetch sheet di setiap request.

## Catatan desain

- Font: Archivo Black, Archivo Expanded, Plus Jakarta Sans (Google Fonts).
- Warna brand utama: merah (`--red`) dan biru (`--blue`), sesuai identitas Dialiva Fun Run.
- Komponen utama "BIB card" didesain meniru kartu nomor lari fisik (perforasi, lubang gantungan, dsb).
- Sudah responsive untuk mobile (breakpoint 420px).
