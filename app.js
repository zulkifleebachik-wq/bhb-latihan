// Laman latihan BHB: tiada pelayan, tiada log masuk; kemajuan dalam telefon pembaca sahaja.
const KUNCI = "bhb-latihan-v1", PERCUMA = 4, CINCANG = 3072644580; // kod akses dicetak dalam buku
const app = document.getElementById("app");
const asal = () => ({ hari: [], kata: {}, buka: false, bahasa: "ms" });
const cincang = s => [...s].reduce((h, c) => Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0, 2166136261);
const terkunci = n => n > PERCUMA && !S.buka;
const KUASAI = 3, SESI = 10;
function baca() { try { return { ...asal(), ...JSON.parse(localStorage.getItem(KUNCI) || "{}") }; } catch { return asal(); } }
let S = baca();
function simpan() { try { localStorage.setItem(KUNCI, JSON.stringify(S)); } catch {} }
const TEKS = {
  ms: {
    latihan: "Latihan untuk pembaca", tajuk: "Bila Hamba Berbicara", sub: "Fahami Bicara Solat Anda",
    kuasai: (a, b) => `${a} daripada ${b} kalimah dikuasai`, hari: n => `${n} hari berlatih berturut-turut`,
    mula: "Mula Kuiz Kosa Kata", langkah: (n, t) => `Langkah ${n}: ${t}`, kk: "Kosa Kata Bacaan Solat",
    ulang: n => `Ulang ${n} kalimah`, belum: n => `${n} kalimah belum dikuasai`, perluKod: "Perlu kod dalam buku", bil: (a, b) => `${a} daripada ${b} kalimah`,
    nota: "Latihan ini pelengkap buku, bukan pengganti guru. Hukum terperinci, rujuk asatizah bertauliah.", peranti: "Kemajuan disimpan dalam peranti ini sahaja.",
    padam: "Padam kemajuan saya", padam2: "Tekan sekali lagi untuk padam", kod: "Kod akses", pembaca: "Untuk pembaca buku",
    kunciP: `Langkah 1 hingga ${PERCUMA} percuma. Masukkan kod akses dalam buku <i>Bila Hamba Berbicara</i> untuk membuka Langkah ${PERCUMA + 1} hingga 13.`,
    buka: "Buka", dapat: "Dapatkan buku", kodSalah: "Kod belum tepat", kodSemak: "Semak semula kod dalam buku.",
    lgk: n => `Langkah ${n} daripada 13`, baca: "Baca kad, ulang sebutannya, kemudian uji diri.", mulaL: "Mula kuiz kosa kata", ok: "✓ dikuasai", buku: h => `Baca penuh dalam buku, hlm ${h}.`,
    tinggal: n => `Tinggal ${n} kalimah`, soalAr: m => `Yang manakah bermaksud “${m}”?`, soalM: "Apakah maksudnya?", betul: "Betul", salah: "Belum tepat", lagi: "Kalimah ini akan keluar semula.",
    next: "Seterusnya", hasil: "Lihat keputusan", selesai: "Sesi selesai", perluUlang: n => `${n} kalimah perlu diulang`, semua: "Semua betul pada cubaan pertama",
    syarat: `Satu kalimah dikuasai selepas ${KUASAI} kali betul berturut-turut. Bawa satu makna ke dalam solat anda yang seterusnya.`,
    kembali: "Kembali", latihLagi: "Latih lagi", tiada: "Tiada kalimah untuk diulang", kuiz: t => `Kuiz: ${t}`, ulangT: "Ulang kalimah", label: "Bahasa", maju: "Kemajuan", undur: "Kembali",
  },
  en: {
    latihan: "Practice for readers", tajuk: "The Servant’s Conversation in Prayers", sub: "Living the meaning of every word in Salah",
    kuasai: (a, b) => `${a} of ${b} words mastered`, hari: n => `${n} ${n === 1 ? "day" : "days"} of practice in a row`,
    mula: "Start the Vocabulary Quiz", langkah: (n, t) => `Step ${n}: ${t}`, kk: "Vocabulary of the Salah Recitations",
    ulang: n => `Review ${n} ${n === 1 ? "word" : "words"}`, belum: n => `${n} ${n === 1 ? "word" : "words"} not yet mastered`, perluKod: "Needs the code in the book", bil: (a, b) => `${a} of ${b} ${b === 1 ? "word" : "words"}`,
    nota: "This practice complements the book; it does not replace a teacher. For detailed rulings, consult qualified teachers (asatizah).", peranti: "Your progress is saved on this device only.",
    padam: "Delete my progress", padam2: "Tap again to delete", kod: "Access code", pembaca: "For readers of the book",
    kunciP: `Steps 1 to ${PERCUMA} are free. Enter the access code printed in the book to open Steps ${PERCUMA + 1} to 13.`,
    buka: "Open", dapat: "Get the book", kodSalah: "That code is not right", kodSemak: "Check the code in the book.",
    lgk: n => `Step ${n} of 13`, baca: "Read the cards, repeat the words, then test yourself.", mulaL: "Start the vocabulary quiz", ok: "✓ mastered", buku: h => `Read in full in the book, p. ${h}.`,
    tinggal: n => `${n} ${n === 1 ? "word" : "words"} left`, soalAr: m => `Which one means “${m}”?`, soalM: "What does it mean?", betul: "Correct", salah: "Not quite", lagi: "This word will come back.",
    next: "Next", hasil: "See the result", selesai: "Session complete", perluUlang: n => `${n} ${n === 1 ? "word needs" : "words need"} review`, semua: "All correct on the first try",
    syarat: `A word is mastered after ${KUASAI} correct answers in a row. Take one meaning into your next Salah.`,
    kembali: "Back", latihLagi: "Practise again", tiada: "No words to review", kuiz: t => `Quiz: ${t}`, ulangT: "Review words", label: "Language", maju: "Progress", undur: "Back",
  },
};
const T = () => TEKS[S.bahasa] || TEKS.ms;
const EN = () => S.bahasa === "en";
// Kata berhubung (al-, -Nya, wal-) tidak boleh putus baris: peraturan tetap UZB. Jangan guna U+2011, tiada dalam Lora.
const hb = s => s.replace(/[^\s()]+-[^\s()]+/g, m => `<span class="nb">${m}</span>`);
const makna = k => EN() ? k.me : k.m;
const rumi = k => hb(EN() ? k.re : k.r);
const RINGKAS = { "aṣ-ṣirāṭa": "the path", "al-maghḍūbi": "those who have earned anger" }; // dipersetujui UZB, kuiz sahaja
const maknaK = k => EN() ? RINGKAS[k.r] || k.me : k.m;
const tajukL = l => hb(EN() ? l.te : l.tajuk);
const suis = () => `<div class="tukar" role="group" aria-label="${T().label}">${[["ms", "BM"], ["en", "EN"]].map(([b, t]) => `<button type="button" data-bh="${b}" aria-pressed="${S.bahasa === b}">${t}</button>`).join("")}</div>`;
const hariIni = () => new Date().toLocaleDateString("en-CA");
function tandaHari() { const d = hariIni(); if (!S.hari.includes(d)) { S.hari.push(d); simpan(); } }
function berturut() {
  const set = new Set(S.hari); let n = 0, d = new Date();
  if (!set.has(hariIni())) d.setDate(d.getDate() - 1);
  while (set.has(d.toLocaleDateString("en-CA"))) { n++; d.setDate(d.getDate() - 1); }
  return n;
}
const rawak = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const atas = (t, undur = "#/", tukar = true) => `<header class="ats"><a class="undur" href="${undur}" aria-label="${T().undur}">←</a><span>${t}</span>${tukar ? suis() : ""}</header>`;
const pautanBuku = h => `<p class="buku">${T().buku(h)}</p>`;

function cincin(p) {
  const r = 46, c = 2 * Math.PI * r;
  return `<svg class="cincin" viewBox="0 0 110 110" role="img" aria-label="${T().maju} ${p}%"><circle cx="55" cy="55" r="${r}"/>${p ? `<circle class="isi" cx="55" cy="55" r="${r}" stroke-dasharray="${c * p / 100} ${c}"/>` : ""}<text x="55" y="62" text-anchor="middle">${p}%</text></svg>`;
}
function utama() {
  const t = T(), l = LANGKAH.find(x => !terkunci(x.n) && x.kad.filter(bolehUji).some(k => kotak(k) < KUASAI)) || LANGKAH.find(x => terkunci(x.n)) || LANGKAH[0];
  app.innerHTML = `<section class="wira"><img src="asset/logo.png" alt="AtTartil Quranic Institute" width="64" height="64"><div><p class="kecil">${t.latihan}</p><h1>${t.tajuk}</h1><p>${t.sub}</p></div>${suis()}</section>
  <section class="kemajuan">${cincin(Math.round(dikuasai(SEMUA) / SEMUA.length * 100))}<div><b>${t.kuasai(dikuasai(SEMUA), SEMUA.length)}</b>${berturut() ? `<p>${t.hari(berturut())}</p>` : ""}</div></section>
  <a class="mulakuiz" href="#/latih/${l.n}"><b>${t.mula}</b><small>${t.langkah(l.n, tajukL(l))}</small></a>
  ${seksyenKata()}
  <footer><p>${t.nota}</p><p>${t.peranti}</p><button class="pautan" id="reset">${t.padam}</button><p><a href="https://www.attartilqi.com">www.attartilqi.com</a></p></footer>`;
  scrollTo(0, 0);
  const r = document.getElementById("reset"); let sah = false;
  r.onclick = () => { if (!sah) { sah = true; r.textContent = t.padam2; return; } S = { ...asal(), buka: S.buka, bahasa: S.bahasa }; simpan(); utama(); };
}
// Kosa kata: setiap kalimah ada kotak 0..KUASAI; betul naik satu, salah turun ke 0.
const kuncikad = k => k.ar;
// Pecahan ayat ini tidak disoal bersendirian: maknanya terikat pada negasi sebelumnya.
const TAK_DISOAL = ["yalid", "yūlad", "yakun", "lahū", "kufuwan", "allā ilāha", "illallāh"];
const bolehUji = k => k.m !== "Allah" && !k.ulang && !TAK_DISOAL.includes(k.r) && !k.ar.includes("ۢ");
const SAMAR = [["aṣ-ṣirāṭa", "ṣirāṭa"], ["wa lā", "wa lam"], ["ghairi", "lam"], ["rabbi", "rabbiya"], ["al-'ālamīn", "fil-‘ālamīn"], ["kabīrā", "akbaru"],
  ["akbaru", "al-'aẓīm"], ["kabīrā", "al-'aẓīm"], ["al-ḥamdu", "wal-ḥamdu"], ["subḥāna", "wa subḥāna"], ["iyyāka", "wa iyyāka"], ["lam", "wa lam"], ["ghairi", "wa lā"], ["ihdinā", "wahdinī"], ["Allāhumma", "iyyāka"], ["al-mubārakātu", "wa barakātuh"]];
const samar = (a, b) => a.r === b.r || SAMAR.some(p => p.includes(a.r) && p.includes(b.r));
const SEMUA = [...new Map(LANGKAH.flatMap(l => l.kad).filter(bolehUji).map(k => [kuncikad(k), k])).values()];
const kotak = k => S.kata[kuncikad(k)] || 0;
const dikuasai = a => a.filter(k => kotak(k) >= KUASAI).length;
const arab = k => `<span lang="ar" class="${k.q ? "arq" : "ar"} sebaris">${k.ar}</span>`;
function seksyenKata() {
  const t = T(), lemah = SEMUA.filter(k => S.kata[kuncikad(k)] !== undefined && kotak(k) < KUASAI).length;
  return `<section class="bhg"><h2>${t.kk}</h2>
  ${lemah ? `<a class="ujian" href="#/ulang"><b>${t.ulang(Math.min(lemah, SESI))}</b><small>${t.belum(lemah)}</small></a>` : ""}
  ${LANGKAH.map(l => { const a = [...new Set(l.kad.filter(bolehUji))], d = dikuasai(a), p = a.length ? d / a.length * 100 : 0;
    return `<a class="topik ${terkunci(l.n) ? "kunci" : ""}" href="#/kata/${l.n}"><span class="no hj ${d === a.length ? "siap" : ""}">${d === a.length ? "✓" : l.n}</span><span class="tt"><b>${tajukL(l)}</b><small>${terkunci(l.n) ? t.perluKod : t.bil(d, a.length)}</small><span class="mini"><i style="width:${p}%"></i></span></span></a>`; }).join("")}</section>`;
}
function halKunci() {
  const t = T();
  app.innerHTML = `${atas(t.kod)}<section class="hasil kunci-hal"><h1>${t.pembaca}</h1><p>${t.kunciP}</p><label for="kod">${t.kod}</label><input id="kod" autocomplete="off" autocapitalize="characters" spellcheck="false"><div id="kesan" aria-live="polite"></div><button class="butang" id="buka">${t.buka}</button><a class="butang kedua" href="https://www.attartilqi.com">${t.dapat}</a></section>`;
  const cuba = () => {
    if (cincang(document.getElementById("kod").value.trim().toUpperCase()) === CINCANG) { S.buka = true; simpan(); hala(); }
    else document.getElementById("kesan").innerHTML = `<div class="ksalah"><b>${t.kodSalah}</b><p>${t.kodSemak}</p></div>`;
  };
  document.getElementById("buka").onclick = cuba;
  document.getElementById("kod").onkeydown = e => { if (e.key === "Enter") cuba(); };
  scrollTo(0, 0);
}
function halKata(n) {
  const l = LANGKAH.find(x => x.n === +n), t = T(); if (!l) return utama();
  if (terkunci(l.n)) return halKunci();
  app.innerHTML = `${atas(t.lgk(l.n))}<article class="baca"><h1>${tajukL(l)}</h1><p class="slogan">${t.baca}</p><a class="butang" href="#/latih/${l.n}">${t.mulaL}</a><div class="senkad ${l.n >= 12 ? "luas" : ""}">${l.kad.map(k => `<div class="kk">${arab(k)}<small>${rumi(k)}</small><b>${hb(makna(k))}</b>${bolehUji(k) && kotak(k) >= KUASAI ? `<em>${t.ok}</em>` : ""}</div>`).join("")}</div>${pautanBuku(l.hlm)}<a class="butang" href="#/latih/${l.n}">${t.mulaL}</a></article>`;
  scrollTo(0, 0);
}
function pilihanPalsu(k, medan, kumpulan) {
  const nilai = x => medan === "ar" ? x.ar : maknaK(x);
  const lain = a => rawak(a.filter(x => nilai(x) !== nilai(k) && maknaK(x) !== maknaK(k) && !samar(x, k)));
  return [...new Map([...lain(kumpulan), ...lain(SEMUA)].map(x => [nilai(x), x])).values()].slice(0, 3);
}
function latihKata(kad, tajuk, undur, kumpulan) {
  const t = T();
  let baris = rawak(kad).sort((a, b) => kotak(a) - kotak(b)).slice(0, SESI), betul = 0, jumlah = 0, ulang = new Set(), ubah = 0;
  function papar() {
    const k = baris[0], keArab = ubah++ % 3 === 2;
    const pil = rawak([k, ...pilihanPalsu(k, keArab ? "ar" : "m", kumpulan)]);
    app.innerHTML = `${atas(tajuk, undur, false)}<section class="kuiz"><div class="palang"><i style="width:${betul / (betul + baris.length) * 100}%"></i></div><p class="kecil">${t.tinggal(baris.length)}</p>
    ${keArab ? `<h2>${t.soalAr(hb(maknaK(k)))}</h2>` : `<div class="soal-ar">${arab(k)}<small>${rumi(k)}</small></div><h2>${t.soalM}</h2>`}
    <div class="pilihan ${keArab ? "pil-ar" : ""}">${pil.map(x => `<button data-ok="${x === k ? 1 : ""}">${keArab ? arab(x) : hb(maknaK(x))}</button>`).join("")}</div><div id="kesan" aria-live="polite"></div></section>`;
    app.querySelectorAll(".pilihan button").forEach(b => b.onclick = () => {
      const ok = !!b.dataset.ok; jumlah++;
      app.querySelectorAll(".pilihan button").forEach(x => { x.disabled = true; if (x.dataset.ok) x.classList.add("betul"); });
      S.kata[kuncikad(k)] = ok ? Math.min(KUASAI, kotak(k) + 1) : 0; tandaHari(); simpan();
      baris.shift();
      if (ok) betul++; else { b.classList.add("salah"); ulang.add(k.ar); baris.splice(Math.min(2, baris.length), 0, k); }
      document.getElementById("kesan").innerHTML = `<div class="${ok ? "kbetul" : "ksalah"}"><b>${ok ? t.betul : t.salah}</b><p>${arab(k)} ${rumi(k)}: ${hb(maknaK(k))}</p>${ok ? "" : `<p>${t.lagi}</p>`}</div><button class="butang" id="lagi">${baris.length ? t.next : t.hasil}</button>`;
      const l = document.getElementById("lagi"); l.scrollIntoView({ behavior: "smooth", block: "center" });
      l.onclick = () => baris.length ? papar() : tamat();
    });
    scrollTo(0, 0);
  }
  function tamat() {
    app.innerHTML = `${atas(tajuk, undur, false)}<section class="hasil"><p class="kecil">${t.selesai}</p><div class="skor">${betul}/${jumlah}</div><h2>${ulang.size ? t.perluUlang(ulang.size) : t.semua}</h2><p>${t.syarat}</p><a class="butang" href="${undur}">${t.kembali}</a><a class="butang kedua" href="${location.hash.split("?")[0]}?${Date.now()}">${t.latihLagi}</a></section>`;
    scrollTo(0, 0);
  }
  if (!baris.length) { app.innerHTML = `${atas(tajuk, undur)}<section class="hasil"><h2>${t.tiada}</h2><a class="butang" href="${undur}">${t.kembali}</a></section>`; return; }
  papar();
}
function hala() {
  document.documentElement.lang = S.bahasa; document.title = EN() ? "Salah Vocabulary Practice" : "Latihan Kosa Kata Solat";
  const [, a, b] = location.hash.split("?")[0].split("/");
  if (a === "kata") halKata(b);
  else if (a === "latih") { const l = LANGKAH.find(x => x.n === +b); if (l && terkunci(l.n)) halKunci(); else l ? latihKata(l.kad.filter(bolehUji), T().kuiz(tajukL(l)), `#/kata/${l.n}`, l.kad.filter(bolehUji)) : utama(); }
  else if (a === "ulang") latihKata(SEMUA.filter(k => S.kata[kuncikad(k)] !== undefined && kotak(k) < KUASAI), T().ulangT, "#/", SEMUA);
  else utama();
}
app.addEventListener("click", e => { const b = e.target.closest("[data-bh]"); if (b && b.dataset.bh !== S.bahasa) { const kod = document.getElementById("kod")?.value; S.bahasa = b.dataset.bh; simpan(); hala(); if (kod) document.getElementById("kod").value = kod; } });
addEventListener("hashchange", hala); hala();
if ("serviceWorker" in navigator && location.protocol === "https:") navigator.serviceWorker.register("sw.js").catch(() => {});
