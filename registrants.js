// lib/registrants.js
//
// Sumber data peserta Dialiva Fun Run.
//
// SEKARANG: data dummy/statis di bawah ini.
// NANTI: ganti isi fungsi getRegistrants() untuk fetch dari Google Sheets
// (misalnya pakai Google Sheets API, atau endpoint Apps Script / OpenSheet),
// lalu map hasilnya ke bentuk object yang sama seperti DUMMY_REGISTRANTS.
//
// Bentuk data yang diharapkan tiap peserta:
// {
//   name: string,        // nama lengkap (dicocokkan persis, case-insensitive)
//   bibName: string,     // nama yang dicetak di BIB (opsional, untuk tampilan)
//   phone: string,       // nomor HP, format apa saja — akan dinormalisasi
//   jerseySize: string,
//   bib: string,         // contoh: "M-001" / "F-004"
//   regid: string,       // nomor pendaftaran
//   category: string,    // contoh: "5K"
//   cot: string,         // cut-off time, format "HH:MM:SS"
//   status: string,      // contoh: "Terverifikasi"
// }

const DUMMY_REGISTRANTS = [
  { name: "Farih Ibnu Zulfa", bibName: "Farizuulll", phone: "081325372200", jerseySize: "L", bib: "M-001", regid: "M-001", category: "5K", cot: "00:00:00", status: "Terverifikasi" },
  { name: "Antonius Abiseka Wiradharma Putra N", bibName: "Abi aja", phone: "085189296181", jerseySize: "L", bib: "M-002", regid: "M-002", category: "5K", cot: "00:00:00", status: "Terverifikasi" },
  { name: "Fico Rizki Ikhsan Saputra", bibName: "FICO", phone: "081328488272", jerseySize: "L", bib: "M-003", regid: "M-003", category: "5K", cot: "00:00:00", status: "Terverifikasi" },
  { name: "Ayoedya Java Ratu Adil", bibName: "Ratu Adil", phone: "089653410903", jerseySize: "XS", bib: "F-004", regid: "F-004", category: "5K", cot: "00:00:00", status: "Terverifikasi" },
  { name: "Intan Yuliastanti", bibName: "INTAN", phone: "085848371110", jerseySize: "S", bib: "F-005", regid: "F-005", category: "5K", cot: "00:00:00", status: "Terverifikasi" },
  { name: "Nadin Ranaa Ayu", bibName: "NADIN RANAA", phone: "081231524656", jerseySize: "M", bib: "F-006", regid: "F-006", category: "5K", cot: "00:00:00", status: "Terverifikasi" },
  { name: "Nurismi", bibName: "Ismi", phone: "082339078095", jerseySize: "L", bib: "F-007", regid: "F-007", category: "5K", cot: "00:00:00", status: "Terverifikasi" },
  { name: "Khoirun Nisa Widyastuti", bibName: "K. Nisa W", phone: "0895391208712", jerseySize: "L", bib: "F-008", regid: "F-008", category: "5K", cot: "00:00:00", status: "Terverifikasi" },
  { name: "Siti Nurlaily Apriyatun", bibName: "Nurlaily", phone: "0895391208712", jerseySize: "S", bib: "F-009", regid: "F-009", category: "5K", cot: "00:00:00", status: "Terverifikasi" },
  { name: "Isnaini Nurrohmah", bibName: "Isnaini", phone: "0895401096097", jerseySize: "XXL", bib: "F-010", regid: "F-010", category: "5K", cot: "00:00:00", status: "Terverifikasi" },
  { name: "Muhammad Shodiq Nur", bibName: "M Shodiq", phone: "0895401096097", jerseySize: "S", bib: "M-011", regid: "M-011", category: "5K", cot: "00:00:00", status: "Terverifikasi" },
  { name: "Rohmatul Ummah", bibName: "UMMAH", phone: "082224162895", jerseySize: "XL", bib: "F-012", regid: "F-012", category: "5K", cot: "00:00:00", status: "Terverifikasi" },
  { name: "Syaeful Ichwan", bibName: "Ichwan", phone: "08981624782", jerseySize: "M", bib: "M-013", regid: "M-013", category: "5K", cot: "00:00:00", status: "Terverifikasi" },
  { name: "Nurmalita Aulia Haz", bibName: "Haz", phone: "087723400005", jerseySize: "S", bib: "F-014", regid: "F-014", category: "5K", cot: "00:00:00", status: "Terverifikasi" },
  { name: "Ferdian Achmad", bibName: "Ferdian", phone: "08156586896", jerseySize: "XXXL", bib: "M-015", regid: "M-015", category: "5K", cot: "00:00:00", status: "Terverifikasi" },
  { name: "Agustinus Deri", bibName: "Agustinus Deri", phone: "085702438507", jerseySize: "L", bib: "M-016", regid: "M-016", category: "5K", cot: "00:00:00", status: "Terverifikasi" },
  { name: "Miss No Name", bibName: "Miss No Name", phone: "085702438599", jerseySize: "L", bib: "F-017", regid: "F-017", category: "5K", cot: "00:00:00", status: "Terverifikasi" },
  { name: "Baharuddin Yusuf", bibName: "Yusuf", phone: "0882008618338", jerseySize: "M", bib: "M-018", regid: "M-018", category: "5K", cot: "00:00:00", status: "Terverifikasi" },
];

/**
 * Mengambil seluruh data peserta.
 * Ganti implementasi ini dengan fetch ke Google Sheets saat sudah siap, contoh:
 *
 *   export async function getRegistrants() {
 *     const res = await fetch(process.env.SHEET_API_URL);
 *     const rows = await res.json();
 *     return rows.map(mapRowToRegistrant);
 *   }
 */
export async function getRegistrants() {
  return DUMMY_REGISTRANTS;
}

export function normalizePhone(p) {
  return String(p)
    .replace(/[^0-9]/g, "")
    .replace(/^62/, "0");
}

/**
 * Cari satu peserta berdasarkan nama lengkap + nomor HP.
 * Nama dicocokkan persis (case-insensitive, setelah trim).
 * Nomor HP dinormalisasi (hilangkan karakter non-digit, ubah prefix 62 -> 0).
 */
export async function findRegistrant(fullname, phone) {
  const registrants = await getRegistrants();
  const normName = String(fullname).trim().toLowerCase();
  const normPhone = normalizePhone(phone);

  return (
    registrants.find(
      (r) =>
        r.name.trim().toLowerCase() === normName &&
        normalizePhone(r.phone) === normPhone
    ) || null
  );
}
