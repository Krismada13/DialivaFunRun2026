// ====== DATA REGISTRANT — Dialiva Fun Run 2026 (dari Google Sheet) ======
const DUMMY_REGISTRANTS = [
  { name:"Farih Ibnu Zulfa", bibName:"Farizuulll", phone:"081325372200", jerseySize:"L", bib:"M-001", regid:"M-001", category:"5K", status:"Terverifikasi" },
  { name:"Antonius Abiseka Wiradharma Putra N", bibName:"Abi aja", phone:"085189296181", jerseySize:"L", bib:"M-002", regid:"M-002", category:"5K", status:"Terverifikasi" },
  { name:"Fico Rizki Ikhsan Saputra", bibName:"FICO", phone:"081328488272", jerseySize:"L", bib:"M-003", regid:"M-003", category:"5K", status:"Terverifikasi" },
  { name:"Ayoedya Java Ratu Adil", bibName:"Ratu Adil", phone:"089653410903", jerseySize:"XS", bib:"F-004", regid:"F-004", category:"5K", status:"Terverifikasi" },
  { name:"Intan Yuliastanti", bibName:"INTAN", phone:"085848371110", jerseySize:"S", bib:"F-005", regid:"F-005", category:"5K", status:"Terverifikasi" },
  { name:"Nadin Ranaa Ayu", bibName:"NADIN RANAA", phone:"081231524656", jerseySize:"M", bib:"F-006", regid:"F-006", category:"5K", status:"Terverifikasi" },
  { name:"Nurismi", bibName:"Ismi", phone:"082339078095", jerseySize:"L", bib:"F-007", regid:"F-007", category:"5K", status:"Terverifikasi" },
  { name:"Khoirun Nisa Widyastuti", bibName:"K. Nisa W", phone:"0895391208712", jerseySize:"L", bib:"F-008", regid:"F-008", category:"5K", status:"Terverifikasi" },
  { name:"Siti Nurlaily Apriyatun", bibName:"Nurlaily", phone:"0895391208712", jerseySize:"S", bib:"F-009", regid:"F-009", category:"5K", status:"Terverifikasi" },
  { name:"Isnaini Nurrohmah", bibName:"Isnaini", phone:"0895401096097", jerseySize:"XXL", bib:"F-010", regid:"F-010", category:"5K", status:"Terverifikasi" },
  { name:"Muhammad Shodiq Nur", bibName:"M Shodiq", phone:"0895401096097", jerseySize:"S", bib:"M-011", regid:"M-011", category:"5K", status:"Terverifikasi" },
  { name:"Rohmatul Ummah", bibName:"UMMAH", phone:"082224162895", jerseySize:"XL", bib:"F-012", regid:"F-012", category:"5K", status:"Terverifikasi" },
  { name:"Syaeful Ichwan", bibName:"Ichwan", phone:"08981624782", jerseySize:"M", bib:"M-013", regid:"M-013", category:"5K", status:"Terverifikasi" },
  { name:"Nurmalita Aulia Haz", bibName:"Haz", phone:"087723400005", jerseySize:"S", bib:"F-014", regid:"F-014", category:"5K", status:"Terverifikasi" },
  { name:"Ferdian Achmad", bibName:"Ferdian", phone:"'08156586896", jerseySize:"XXXL", bib:"M-015", regid:"M-015", category:"5K", status:"Terverifikasi" },
  { name:"Agustinus Deri", bibName:"Agustinus Deri", phone:"085702438507", jerseySize:"L", bib:"M-016", regid:"M-016", category:"5K", status:"Terverifikasi" },
  { name:"Miss No Name", bibName:"Miss No Name", phone:"085702438599", jerseySize:"L", bib:"F-017", regid:"F-017", category:"5K", status:"Terverifikasi" },
  { name:"Baharuddin Yusuf", bibName:"Yusuf", phone:"0882008618338", jerseySize:"M", bib:"M-018", regid:"M-018", category:"5K", status:"Terverifikasi" },
];

function normalizePhone(p){
  return p.replace(/[^0-9]/g, "").replace(/^62/, "0");
}

function setState(stateId){
  document.querySelectorAll(".state").forEach(el => el.classList.remove("active"));
  document.getElementById(stateId).classList.add("active");
}

function handleSearch(){
  const nameInput = document.getElementById("fullname").value.trim();
  const phoneInput = document.getElementById("phone").value.trim();
  const btn = document.getElementById("searchBtn");

  if(!nameInput || !phoneInput){
    alert("Isi nama lengkap dan nomor HP dulu ya.");
    return;
  }

  btn.classList.add("loading");
  btn.disabled = true;

  // Simulasi delay pencarian (nanti diganti fetch ke Google Sheet API)
  setTimeout(() => {
    btn.classList.remove("loading");
    btn.disabled = false;

    const normPhone = normalizePhone(phoneInput);
    const match = DUMMY_REGISTRANTS.find(r =>
      r.name.toLowerCase() === nameInput.toLowerCase() &&
      normalizePhone(r.phone) === normPhone
    );

    if(match){
      document.getElementById("r-bib").textContent = match.bib;
      document.getElementById("r-category").textContent = match.category;
      document.getElementById("r-regid").textContent = match.regid;
      document.getElementById("r-name").textContent = match.name;
      document.getElementById("r-status").textContent = match.status;
      setState("state-found");
    } else {
      setState("state-notfound");
    }

    document.getElementById("state-found").scrollIntoView({behavior:"smooth", block:"start"});
  }, 700);
}

function resetSearch(){
  document.getElementById("fullname").value = "";
  document.getElementById("phone").value = "";
  setState("state-idle");
  window.scrollTo({top:0, behavior:"smooth"});
  document.getElementById("fullname").focus();
}

document.getElementById("fullname").addEventListener("keydown", e => { if(e.key === "Enter") handleSearch(); });
document.getElementById("phone").addEventListener("keydown", e => { if(e.key === "Enter") handleSearch(); });