import Head from "next/head";
import { useState } from "react";

// ====== DATA DUMMY — ganti dengan data dari Google Sheet ======
const DUMMY_REGISTRANTS = [
  { name:"Farih Ibnu Zulfa", bibName:"Farizuulll", phone:"081325372200", jerseySize:"L", bib:"M-001", regid:"M-001", category:"5K", cot:"00:00:00", status:"Terverifikasi" },
  { name:"Antonius Abiseka Wiradharma Putra N", bibName:"Abi aja", phone:"085189296181", jerseySize:"L", bib:"M-002", regid:"M-002", category:"5K", cot:"00:00:00", status:"Terverifikasi" },
  { name:"Fico Rizki Ikhsan Saputra", bibName:"FICO", phone:"081328488272", jerseySize:"L", bib:"M-003", regid:"M-003", category:"5K", cot:"00:00:00", status:"Terverifikasi" },
  { name:"Ayoedya Java Ratu Adil", bibName:"Ratu Adil", phone:"089653410903", jerseySize:"XS", bib:"F-004", regid:"F-004", category:"5K", cot:"00:00:00", status:"Terverifikasi" },
  { name:"Intan Yuliastanti", bibName:"INTAN", phone:"085848371110", jerseySize:"S", bib:"F-005", regid:"F-005", category:"5K", cot:"00:00:00", status:"Terverifikasi" },
  { name:"Nadin Ranaa Ayu", bibName:"NADIN RANAA", phone:"081231524656", jerseySize:"M", bib:"F-006", regid:"F-006", category:"5K", cot:"00:00:00", status:"Terverifikasi" },
  { name:"Nurismi", bibName:"Ismi", phone:"082339078095", jerseySize:"L", bib:"F-007", regid:"F-007", category:"5K", cot:"00:00:00", status:"Terverifikasi" },
  { name:"Khoirun Nisa Widyastuti", bibName:"K. Nisa W", phone:"0895391208712", jerseySize:"L", bib:"F-008", regid:"F-008", category:"5K", cot:"00:00:00", status:"Terverifikasi" },
  { name:"Siti Nurlaily Apriyatun", bibName:"Nurlaily", phone:"0895391208712", jerseySize:"S", bib:"F-009", regid:"F-009", category:"5K", cot:"00:00:00", status:"Terverifikasi" },
  { name:"Isnaini Nurrohmah", bibName:"Isnaini", phone:"0895401096097", jerseySize:"XXL", bib:"F-010", regid:"F-010", category:"5K", cot:"00:00:00", status:"Terverifikasi" },
  { name:"Muhammad Shodiq Nur", bibName:"M Shodiq", phone:"0895401096097", jerseySize:"S", bib:"M-011", regid:"M-011", category:"5K", cot:"00:00:00", status:"Terverifikasi" },
  { name:"Rohmatul Ummah", bibName:"UMMAH", phone:"082224162895", jerseySize:"XL", bib:"F-012", regid:"F-012", category:"5K", cot:"00:00:00", status:"Terverifikasi" },
  { name:"Syaeful Ichwan", bibName:"Ichwan", phone:"08981624782", jerseySize:"M", bib:"M-013", regid:"M-013", category:"5K", cot:"00:00:00", status:"Terverifikasi" },
  { name:"Nurmalita Aulia Haz", bibName:"Haz", phone:"087723400005", jerseySize:"S", bib:"F-014", regid:"F-014", category:"5K", cot:"00:00:00", status:"Terverifikasi" },
  { name:"Ferdian Achmad", bibName:"Ferdian", phone:"'08156586896", jerseySize:"XXXL", bib:"M-015", regid:"M-015", category:"5K", cot:"00:00:00", status:"Terverifikasi" },
  { name:"Agustinus Deri", bibName:"Agustinus Deri", phone:"085702438507", jerseySize:"L", bib:"M-016", regid:"M-016", category:"5K", cot:"00:00:00", status:"Terverifikasi" },
  { name:"Miss No Name", bibName:"Miss No Name", phone:"085702438599", jerseySize:"L", bib:"F-017", regid:"F-017", category:"5K", cot:"00:00:00", status:"Terverifikasi" },
  { name:"Baharuddin Yusuf", bibName:"Yusuf", phone:"0882008618338", jerseySize:"M", bib:"M-018", regid:"M-018", category:"5K", cot:"00:00:00", status:"Terverifikasi" },
];

function normalizePhone(p) {
  return p.replace(/[^0-9]/g, "").replace(/^62/, "0");
}

export default function Home() {
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  // state: "idle" | "notfound" | "found"
  const [view, setView] = useState("idle");
  const [result, setResult] = useState(null);

  function handleSearch() {
    if (!fullname.trim() || !phone.trim()) {
      alert("Isi nama lengkap dan nomor HP dulu ya.");
      return;
    }

    setLoading(true);

    // Simulasi delay pencarian (nanti diganti fetch ke Google Sheet API)
    setTimeout(() => {
      setLoading(false);

      const normPhone = normalizePhone(phone);
      const match = DUMMY_REGISTRANTS.find(
        (r) =>
          r.name.toLowerCase() === fullname.trim().toLowerCase() &&
          normalizePhone(r.phone) === normPhone
      );

      if (match) {
        setResult(match);
        setView("found");
      } else {
        setResult(null);
        setView("notfound");
      }

      requestAnimationFrame(() => {
        document.getElementById("state-found")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }, 700);
  }

  function resetSearch() {
    setFullname("");
    setPhone("");
    setView("idle");
    setResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.getElementById("fullname")?.focus();
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSearch();
  }

  return (
    <>
      <Head>
        <title>Cek BIB Number — Dialiva Fun Run</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="noise"></div>
      <div className="wrap">
        <div className="topbar">
          <div className="brand">
            <span className="dot"></span>DIALIVA FUN RUN
          </div>
          <div className="pill-date">19 JULI 2026</div>
        </div>

        <div className="hero">
          <div className="eyebrow">Cek Status Pendaftaran</div>
          <h1 className="hero-title">
            Tinggal cari
            <br />
            nomor <span>BIB</span>-mu.
          </h1>
          <p className="sub">
            Masukkan nama lengkap dan nomor HP yang kamu pakai saat mendaftar. BIB
            number dan jadwal pengambilan race pack akan langsung muncul.
          </p>
        </div>

        <div className="search-card">
          <h2>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
            </svg>
            Cari Data Peserta
          </h2>

          <div className="field">
            <label htmlFor="fullname">Nama lengkap</label>
            <input
              id="fullname"
              type="text"
              placeholder="Contoh: Mada Pratama"
              autoComplete="name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="field">
            <label htmlFor="phone">Nomor HP / WhatsApp</label>
            <input
              id="phone"
              type="tel"
              placeholder="Contoh: 0812xxxxxxxx"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <button
            className={`btn-search${loading ? " loading" : ""}`}
            id="searchBtn"
            onClick={handleSearch}
            disabled={loading}
          >
            <span className="spinner"></span>
            <span className="label" style={{ display: "flex", alignItems: "center", gap: "9px" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
              </svg>
              Cari BIB Number
            </span>
          </button>
          <p className="helper-note">
            Pastikan nama &amp; nomor HP sama seperti saat mengisi formulir pendaftaran.
          </p>
        </div>

        <div className="result-zone">
          <div className={`state${view === "idle" ? " active" : ""}`} id="state-idle">
            <div className="idle-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="3" y="7" width="18" height="11" rx="2" />
                <circle cx="7" cy="5" r="1.4" fill="currentColor" stroke="none" />
                <circle cx="17" cy="5" r="1.4" fill="currentColor" stroke="none" />
                <path d="M9 12h6M9 15h3" />
              </svg>
              <p>Hasil pencarian BIB number kamu akan tampil di sini.</p>
            </div>
          </div>

          <div className={`state${view === "notfound" ? " active" : ""}`} id="state-notfound">
            <div className="nf-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--red-deep)" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <path d="M9.5 9.5l5 5M14.5 9.5l-5 5" strokeLinecap="round" />
              </svg>
              <h3>Data tidak ditemukan</h3>
              <p>Cek kembali ejaan nama dan format nomor HP-mu, lalu coba lagi.</p>
              <p>Kalau sudah benar tapi tetap tidak muncul, kemungkinan pendaftaranmu belum tercatat.</p>
              <a className="wa-link" href="https://wa.me/6285122677799" target="_blank" rel="noopener noreferrer">
                Hubungi panitia via WhatsApp →
              </a>
            </div>
          </div>

          <div className={`state${view === "found" ? " active" : ""}`} id="state-found">
            <div className="bib-card">
              <div className="perforation"></div>
              <div className="bib-top-row">
                <div className="event-tag">Dialiva Fun Run · 2026</div>
                <div className="status-chip" id="r-status">
                  {result?.status ?? "Terverifikasi"}
                </div>
              </div>

              <div className="bib-number-zone">
                <div className="lbl">Nomor BIB kamu</div>
                <div className="bib-number">
                  <span className="hash">#</span>
                  <span id="r-bib">{result?.bib ?? "000"}</span>
                </div>
              </div>

              <div className="bib-meta-grid">
                <div className="meta-item cat">
                  <div className="lbl">Kategori</div>
                  <div className="val" id="r-category">
                    {result?.category ?? "5K"}
                  </div>
                </div>
                <div className="meta-item">
                  <div className="lbl">Nomor Pendaftaran</div>
                  <div className="val" id="r-regid">
                    {result?.regid ?? "M-000 / F-000"}
                  </div>
                </div>
                <div className="meta-item cot">
                  <div className="lbl">Cut-Off Time</div>
                  <div className="val" id="r-cot">
                    {result?.cot ?? "00:00:00"}
                  </div>
                </div>
              </div>

              <div className="pickup-strip">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                <div>
                  <div className="ps-title">Jadwal Pengambilan Race Pack</div>
                  <div className="ps-text" id="r-pickup">
                    <b>15–16 JULI 2026</b> · 09.00–20.00 WIB
                    <br />
                    Klinik Dialiva Istimewa Yogyakarta, Bakungan, Wedomartani, Sleman, Yogyakarta
                  </div>
                </div>
              </div>

              <div className="runner-name">
                Atas nama <b id="r-name">{result?.name ?? "Nama Peserta"}</b>
              </div>

              <div className="actions-row">
                <div className="btn-outline" onClick={() => window.print()}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="6" y="9" width="12" height="8" rx="1" />
                    <path d="M6 9V4h12v5M9 13h6" />
                  </svg>
                  Cetak
                </div>
                <div className="btn-screenshot" id="screenshotHint">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="6" width="18" height="14" rx="2" />
                    <circle cx="12" cy="13" r="3.5" />
                    <path d="M9 6l1-2h4l1 2" />
                  </svg>
                  Simpan Tangkapan Layar
                </div>
              </div>
            </div>

            <div className="search-again">
              <button onClick={resetSearch}>Cari peserta lain →</button>
            </div>
          </div>
        </div>

        <div className="info-strip">
          <div className="info-card">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2l2.6 5.6 6.1.9-4.4 4.3 1 6.1L12 16l-5.3 2.9 1-6.1-4.4-4.3 6.1-.9z" />
            </svg>
            <div className="ic-title">Bawa BIB saat ambil race pack</div>
            <div className="ic-text">Tunjukkan halaman ini atau hasil cetaknya ke panitia.</div>
          </div>
          <div className="info-card">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4.5 8-11.5A8 8 0 004 10.5C4 17.5 12 22 12 22z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            <div className="ic-title">Lokasi pengambilan</div>
            <div className="ic-text">
              <a
                href="https://maps.app.goo.gl/TUX3KyF1bXcya6i39"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "underline" }}
              >
                Klinik Dialiva Istimewa Yogyakarta, Bakungan, Wedomartani, Sleman, Yogyakarta ↗
              </a>
            </div>
          </div>
        </div>

        <footer className="page-footer">
          Ada kendala? Hubungi <b>panitia Dialiva Fun Run</b> via WhatsApp 085122677799.
        </footer>
      </div>
    </>
  );
}