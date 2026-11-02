// Laman latihan BHB: tiada pelayan, tiada log masuk; kemajuan dalam telefon pembaca sahaja.
// Setiap langkah: 1 Baca (kad ikut aliran bacaan + bacaan penuh), 2 Ulang (kad imbas), 3 Kuiz (rawak, termasuk Padankan).
const KUNCI = "bhb-latihan-v1", PERCUMA = 4, CINCANG = 3072644580; // kod akses dicetak dalam buku
const app = document.getElementById("app");
const asal = () => ({ hari: [], kata: {}, buka: false, bahasa: "ms", langkah: {} });
const cincang = s => [...s].reduce((h, c) => Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0, 2166136261);
const terkunci = n => n > PERCUMA && !S.buka;
const KUASAI = 3, SESI = 10;
function baca() { try { const d = { ...asal(), ...JSON.parse(localStorage.getItem(KUNCI) || "{}") }; if (!d.langkah || typeof d.langkah !== "object") d.langkah = {}; return d; } catch { return asal(); } }
let S = baca();
function simpan() { try { localStorage.setItem(KUNCI, JSON.stringify(S)); } catch {} }
const rekod = n => (S.langkah[n] = S.langkah[n] || { b: [], s: null });
const TEKS = {
  ms: {
    latihan: "Latihan untuk pembaca", tajuk: "Bila Hamba Berbicara", sub: "Fahami Bicara Solat Anda",
    kuasai: (a, b) => `${a} daripada ${b} kalimah dikuasai`, hari: n => `${n} hari berlatih berturut-turut`,
    mula: "Teruskan belajar", langkah: (n, t) => `Langkah ${n}: ${t}`, kk: "13 Langkah Bacaan Solat",
    ulang: n => `Ulang ${n} kalimah`, belum: n => `${n} kalimah belum dikuasai`, perluKod: "Perlu kod dalam buku",
    ringkas: (a, b, s) => `Dibaca ${a}/${b}${s === null || s === undefined ? "" : ` · Skor terbaik ${s}%`}`,
    nota: "Latihan ini pelengkap buku, bukan pengganti guru. Hukum terperinci, rujuk asatizah bertauliah.", peranti: "Kemajuan disimpan dalam peranti ini sahaja.",
    padam: "Padam kemajuan saya", padam2: "Tekan sekali lagi untuk padam", kod: "Kod akses", pembaca: "Untuk pembaca buku",
    kunciP: `Langkah 1 hingga ${PERCUMA} percuma. Masukkan kod akses dalam buku <i>Bila Hamba Berbicara</i> untuk membuka Langkah ${PERCUMA + 1} hingga 13.`,
    buka: "Buka", dapat: "Dapatkan buku", kodSalah: "Kod belum tepat", kodSemak: "Semak semula kod dalam buku.",
    lgk: n => `Langkah ${n} daripada 13`, buku: h => `Baca penuh dalam buku, hlm ${h}.`,
    tab: ["Baca", "Ulang", "Kuiz"], tabNota: ["Baca setiap kalimah ikut susunan bacaan.", "Lihat kalimah, cuba ingat maknanya, kemudian tekan untuk semak.", "Uji diri: pilih jawapan atau padankan."],
    dibaca: (a, b) => `${a} daripada ${b} kad sudah dibaca`, penuh: "Bacaan penuh", zikir: "Zikir tambahan (pilihan)", keUlang: "Seterusnya: Ulang", keKuiz: "Seterusnya: Kuiz",
    kad: (a, b) => `Kad ${a} daripada ${b}`, tunjuk: "Tekan untuk lihat makna", sebelum: "‹ Sebelum", lepas: "Seterusnya ›", bersama: "Dibaca bersama:",
    tinggal: n => `Tinggal ${n} kalimah`, soalAr: m => `Yang manakah bermaksud “${m}”?`, soalM: "Apakah maksudnya?", betul: "Betul", salah: "Belum tepat", lagi: "Kalimah ini akan keluar semula.",
    padan: "Padankan: tekan kalimah Arab, kemudian tekan maknanya.", padanOk: "Semua sudah dipadankan", padanUlang: n => `${n} kalimah akan keluar semula.`,
    next: "Seterusnya", hasil: "Lihat keputusan", selesai: "Kuiz selesai", perluUlang: n => `${n} kalimah perlu diulang`, semua: "Semua betul pada cubaan pertama", terbaik: s => `Skor terbaik langkah ini: ${s}%`,
    syarat: `Satu kalimah dikuasai selepas ${KUASAI} kali betul berturut-turut. Bawa satu makna ke dalam solat anda yang seterusnya.`,
    kembali: "Kembali", latihLagi: "Kuiz lagi", tiada: "Tiada kalimah untuk diulang", kuiz: t => `Kuiz: ${t}`, ulangT: "Ulang kalimah", label: "Bahasa", maju: "Kemajuan", undur: "Kembali",
  },
  en: {
    latihan: "Practice for readers", tajuk: "The Servant’s Conversation in Prayers", sub: "Living the meaning of every word in Salah",
    kuasai: (a, b) => `${a} of ${b} words mastered`, hari: n => `${n} ${n === 1 ? "day" : "days"} of practice in a row`,
    mula: "Continue learning", langkah: (n, t) => `Step ${n}: ${t}`, kk: "13 Steps of the Salah Recitations",
    ulang: n => `Review ${n} ${n === 1 ? "word" : "words"}`, belum: n => `${n} ${n === 1 ? "word" : "words"} not yet mastered`, perluKod: "Needs the code in the book",
    ringkas: (a, b, s) => `Read ${a}/${b}${s === null || s === undefined ? "" : ` · Best score ${s}%`}`,
    nota: "This practice complements the book; it does not replace a teacher. For detailed rulings, consult qualified teachers (asatizah).", peranti: "Your progress is saved on this device only.",
    padam: "Delete my progress", padam2: "Tap again to delete", kod: "Access code", pembaca: "For readers of the book",
    kunciP: `Steps 1 to ${PERCUMA} are free. Enter the access code printed in the book to open Steps ${PERCUMA + 1} to 13.`,
    buka: "Open", dapat: "Get the book", kodSalah: "That code is not right", kodSemak: "Check the code in the book.",
    lgk: n => `Step ${n} of 13`, buku: h => `Read in full in the book, p. ${h}.`,
    tab: ["Read", "Review", "Quiz"], tabNota: ["Read each word in the order it is recited.", "Look at the word, try to recall its meaning, then tap to check.", "Test yourself: choose an answer or match the pairs."],
    dibaca: (a, b) => `${a} of ${b} cards read`, penuh: "The full recitation", zikir: "Additional dhikr (optional)", keUlang: "Next: Review", keKuiz: "Next: Quiz",
    kad: (a, b) => `Card ${a} of ${b}`, tunjuk: "Tap to see the meaning", sebelum: "‹ Previous", lepas: "Next ›", bersama: "Read together:",
    tinggal: n => `${n} ${n === 1 ? "word" : "words"} left`, soalAr: m => `Which one means “${m}”?`, soalM: "What does it mean?", betul: "Correct", salah: "Not quite", lagi: "This word will come back.",
    padan: "Match: tap an Arabic word, then tap its meaning.", padanOk: "All pairs matched", padanUlang: n => `${n} ${n === 1 ? "word" : "words"} will come back.`,
    next: "Next", hasil: "See the result", selesai: "Quiz complete", perluUlang: n => `${n} ${n === 1 ? "word needs" : "words need"} review`, semua: "All correct on the first try", terbaik: s => `Best score for this step: ${s}%`,
    syarat: `A word is mastered after ${KUASAI} correct answers in a row. Take one meaning into your next Salah.`,
    kembali: "Back", latihLagi: "Quiz again", tiada: "No words to review", kuiz: t => `Quiz: ${t}`, ulangT: "Review words", label: "Language", maju: "Progress", undur: "Back",
  },
};
const T = () => TEKS[S.bahasa] || TEKS.ms;
const EN = () => S.bahasa === "en";
// Kata berhubung (al-, -Nya, wal-) tidak boleh putus baris: peraturan tetap UZB. Jangan guna U+2011, tiada dalam Lora.
// Rangkaian panjang (cth. At-taḥiyyātul-mubārakātuṣ-…) dipecah kepada pasangan: "l-mubārakātu" kekal bersama,
// dan baris boleh patah sebelum huruf al- (atau digraf sy/dz/dh/sh/th/kh/gh) — tidak pernah selepas sempang (PA 2026-11-02).
const nbs = m => `<span class="nb">${m}</span>`;
const hb = s => s.replace(/[^\s()]+-[^\s()]+/g, run => {
  const sp = [...run.matchAll(/-/g)].map(x => x.index); if (sp.length < 2) return nbs(run);
  const cut = [0];
  for (const i of sp.slice(1)) { const c = /^(sy|dz|dh|sh|th|kh|gh)$/i.test(run.slice(i - 2, i)) ? i - 2 : i - 1; if (c > cut[cut.length - 1] + 1) cut.push(c); }
  cut.push(run.length);
  return cut.slice(0, -1).map((a, j) => run.slice(a, cut[j + 1])).map(p => p.includes("-") ? nbs(p) : p).join("<wbr>");
});
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

// Kosa kata: setiap kalimah ada kotak 0..KUASAI; betul naik satu, salah turun ke 0. Kunci = teks Arab (sama seperti versi lama).
const kuncikad = k => k.ar;
// Negasi: kad pecahan unit negasi ditanda "tak" oleh ekstrak_kosakata.py (dibaca, tidak disoal bersendirian, termasuk Padankan);
// unit penuhnya (cth. لَا شَرِيكَ لَهُ) yang disoal. TAK_DISOAL: tambahan ikut rumi jika perlu (kuiz sahaja).
const TAK_DISOAL = [];
const bolehUji = k => k.m !== "Allah" && !k.tak && !TAK_DISOAL.includes(k.r);
const SAMAR = [["aṣ-ṣirāṭa", "ṣirāṭa"], ["wa lā", "wa lam"], ["ghairi", "lam"], ["rabbi", "rabbiya"], ["al-'ālamīn", "al-'ālamīna"], ["kabīrā", "akbaru"],
  ["akbaru", "al-'aẓīm"], ["kabīrā", "al-'aẓīm"], ["al-ḥamdu", "wal-ḥamdu"], ["al-ḥamd", "wal-ḥamdu"], ["subḥāna", "wa subḥāna"], ["iyyāka", "wa iyyāka"], ["lam", "wa lam"], ["ghairi", "wa lā"],
  ["ihdinā", "wahdinī"], ["ihdinī", "wahdinī"], ["ihdinā", "ihdinī"], ["Allāhumma", "iyyāka"], ["al-mubārakātu", "wa barakātuh"], ["al-a'lā", "wa ta'ālait"],
  ["wa tawallanī", "wa qinī"], ["tawallait", "wālait"], ["ṣalli", "wa ṣallā"],
  // ATV 2026-11-02: pasangan hampir sama, tidak boleh menjadi pilihan salah bagi satu sama lain
  ["qaḍait", "taqḍī"], ["hadait", "ihdinī"], ["'āfait", "wa 'āfinī"], ["tawallait", "wa tawallanī"], ["bārakta", "wa bārik"], ["ṣallaita", "ṣalli"],
  ["'alā", "wa 'alā"], ["min", "wa min"], ["asyhadu", "wa asyhadu"], ["innaka", "fa innaka"], ["laka", "fa laka"], ["inna", "wa innahū"],
  // ATV 2026-11-02 (struktur 3 bahagian)
  ["rabbiya", "rabbu"], ["tawallait", "wa qinī"], ["fīmā", "mā"], ["fīman", "man"], ["'alā", "'alaik"], ["mina", "wa min"],
  ["wa maḥyāya", "al-maḥyā"], ["wa mamātī", "wal-mamāt"], ["ḥanīfan", "al-mustaqīm"], ["inna", "innaka"], ["inna", "innī"], ["min", "'annī"],
  // zikir tambahan (n26/n27)
  ["subḥāna", "subḥānaka"], ["subḥānaka", "subbūḥun"], ["subḥāna", "subbūḥun"], ["wa subḥāna", "subbūḥun"], ["rabbu", "rabbi"], ["rabbu", "rabbanā"]];
// Arab yang sama (atau sama tanpa baris, cth. لِلّٰهِ / لِلَّهِ) atau makna yang sama tidak dijadikan pilihan salah.
const asas = s => s.replace(/[ً-ٰٟۖ-ۭـاآأإٱى\s]/g, "");
const samar = (a, b) => a.r.toLowerCase() === b.r.toLowerCase() || asas(a.ar) === asas(b.ar) || a.m.toLowerCase() === b.m.toLowerCase() || SAMAR.some(p => p.includes(a.r) && p.includes(b.r));
const unik = a => [...new Map(a.map(k => [k.ar + "|" + k.m, k])).values()];
const kolam = l => unik([...l.kad.filter(bolehUji), ...l.unit]);
const SEMUA = [...new Map(LANGKAH.flatMap(kolam).map(k => [kuncikad(k), k])).values()];
const kotak = k => S.kata[kuncikad(k)] || 0;
const dikuasai = a => a.filter(k => kotak(k) >= KUASAI).length;
const bt = k => k.bt ? `<sup class="bt">*</sup>` : "";
const arab = k => `<span lang="ar" class="${k.q ? "arq" : "ar"} sebaris">${k.ar}${bt(k)}</span>`;   // tanda * buku (nota di bawah Bacaan penuh)
const notaBt = l => { const n = l.nota && l.nota[EN() ? "en" : "ms"]; return n && n.length ? n.map(x => `<span class="notabt">* ${hb(x).replace(/[؀-ۿ][؀-ۿ\s]*[؀-ۿ]/g, a => `<span lang="ar" class="ar">${a}</span>`)}</span>`).join("") : ""; };
const dibaca = l => new Set(rekod(l.n).b).size;

function cincin(p) {
  const r = 46, c = 2 * Math.PI * r;
  return `<svg class="cincin" viewBox="0 0 110 110" role="img" aria-label="${T().maju} ${p}%"><circle cx="55" cy="55" r="${r}"/>${p ? `<circle class="isi" cx="55" cy="55" r="${r}" stroke-dasharray="${c * p / 100} ${c}"/>` : ""}<text x="55" y="62" text-anchor="middle">${p}%</text></svg>`;
}
function utama() {
  const t = T(), l = LANGKAH.find(x => !terkunci(x.n) && (dibaca(x) < x.kad.length || kolam(x).some(k => kotak(k) < KUASAI))) || LANGKAH.find(x => terkunci(x.n)) || LANGKAH[0];
  app.innerHTML = `<section class="wira"><img src="asset/logo.png" alt="AtTartil Quranic Institute" width="64" height="64"><div><p class="kecil">${t.latihan}</p><h1>${t.tajuk}</h1><p>${t.sub}</p></div>${suis()}</section>
  <section class="kemajuan">${cincin(Math.round(dikuasai(SEMUA) / SEMUA.length * 100))}<div><b>${t.kuasai(dikuasai(SEMUA), SEMUA.length)}</b>${berturut() ? `<p>${t.hari(berturut())}</p>` : ""}</div></section>
  <a class="mulakuiz" href="#/kata/${l.n}"><b>${t.mula}</b><small>${t.langkah(l.n, tajukL(l))}</small></a>
  ${seksyenKata()}
  <footer><p>${t.nota}</p><p>${t.peranti}</p><button class="pautan" id="reset">${t.padam}</button><p><a href="https://www.attartilqi.com">www.attartilqi.com</a></p></footer>`;
  scrollTo(0, 0);
  const r = document.getElementById("reset"); let sah = false;
  r.onclick = () => { if (!sah) { sah = true; r.textContent = t.padam2; return; } S = { ...asal(), buka: S.buka, bahasa: S.bahasa }; simpan(); utama(); };
}
function seksyenKata() {
  const t = T(), lemah = SEMUA.filter(k => S.kata[kuncikad(k)] !== undefined && kotak(k) < KUASAI).length;
  return `<section class="bhg"><h2>${t.kk}</h2>
  ${lemah ? `<a class="ujian" href="#/ulang"><b>${t.ulang(Math.min(lemah, SESI))}</b><small>${t.belum(lemah)}</small></a>` : ""}
  ${LANGKAH.map(l => { const a = kolam(l), d = dikuasai(a), b = dibaca(l), p = a.length ? d / a.length * 100 : 0, siap = d === a.length && b >= l.kad.length;
    return `<a class="topik ${terkunci(l.n) ? "kunci" : ""}" href="#/kata/${l.n}"><span class="no hj ${siap ? "siap" : ""}">${siap ? "✓" : l.n}</span><span class="tt"><b>${tajukL(l)}</b><small>${terkunci(l.n) ? t.perluKod : t.ringkas(b, l.kad.length, rekod(l.n).s)}</small><span class="mini"><i style="width:${p}%"></i></span></span></a>`; }).join("")}</section>`;
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
// Kepala langkah: tajuk + tiga bahagian (Baca, Ulang, Kuiz)
const BHG = ["kata", "kad", "latih"];
function kepala(l, bhg) {
  const t = T();
  return `${atas(t.lgk(l.n))}<h1 class="tj">${tajukL(l)}</h1><nav class="tiga" aria-label="${t.lgk(l.n)}">${BHG.map((b, i) => `<a href="#/${b}/${l.n}" ${i === bhg ? 'aria-current="page"' : ""}><span>${i + 1}</span>${t.tab[i]}</a>`).join("")}</nav><p class="slogan">${t.tabNota[bhg]}</p>`;
}
const nofr = s => s.replace(/(\d+)/g, '<span class="nofr">$1</span>');
function halBaca(l) {
  const t = T(), r = rekod(l.n); let z = false;
  const kad = l.kad.map((k, i) => { const tj = k.z && !z ? (z = true, `<h3 class="zk">${t.zikir}</h3>`) : "";
    return `${tj}<div class="kk${k.tak ? " tak" : ""}" data-i="${i}">${arab(k)}<small>${rumi(k)}</small><b>${hb(makna(k))}</b></div>`; }).join("");
  const frasa = l.baris[EN() ? "en" : "ms"];
  // bacaan penuh: baris Arab + rumi & terjemahan buku; zikir tambahan (pilihan) dalam blok sendiri
  const blok = z => { const a = l.arab.filter(x => !!x.z === z), f = frasa.filter(x => !!x[2] === z); if (!a.length && !f.length) return "";
    return `${z ? `<h3 class="zk">${t.zikir}</h3>` : ""}${a.map(x => `<p lang="ar" class="${x.q ? "arq" : "ar"} baris-ar">${nofr(x.ar)}${bt(x)}</p>`).join("")}<ol class="frasa">${f.map(([rm, tr]) => `<li>${rm ? `<i>${hb(rm)}</i>` : ""}<span>${hb(tr)}</span></li>`).join("")}</ol>`; };
  app.innerHTML = `${kepala(l, 0)}<p class="dibaca" id="dibaca">${t.dibaca(dibaca(l), l.kad.length)}</p>
  <div class="senkad">${kad}</div>
  <section class="penuh"><h2>${t.penuh}</h2>${blok(false)}${blok(true)}${notaBt(l)}</section>
  ${pautanBuku(l.hlm)}<a class="butang" href="#/kad/${l.n}">${t.keUlang}</a>`;
  scrollTo(0, 0);
  // kad dikira "dibaca" apabila kelihatan pada skrin
  const lihat = new IntersectionObserver(es => { let ubah = false;
    es.forEach(e => { if (e.isIntersecting) { const i = +e.target.dataset.i; if (!r.b.includes(i)) { r.b.push(i); ubah = true; } lihat.unobserve(e.target); } });
    if (ubah) { simpan(); const d = document.getElementById("dibaca"); if (d) d.textContent = t.dibaca(dibaca(l), l.kad.length); } }, { threshold: 0.6 });
  app.querySelectorAll(".kk[data-i]").forEach(e => lihat.observe(e));
}
function halUlang(l, i) {
  const t = T(), n = l.kad.length; i = Math.max(0, Math.min(n - 1, +i || 0));
  const k = l.kad[i], u = k.tak ? l.unit[k.u] : null;
  app.innerHTML = `${kepala(l, 1)}<p class="dibaca">${t.kad(i + 1, n)}</p>
  <button class="imbas" id="imbas" aria-expanded="false">${arab(k)}<small>${rumi(k)}</small><span class="dedah" hidden><b>${hb(makna(k))}</b>${u ? `<em>${t.bersama} <span lang="ar" class="${u.q ? "arq" : "ar"}">${u.ar}</span> = ${hb(makna(u))}</em>` : ""}${k.bt ? notaBt(l) : ""}</span><span class="petunjuk">${t.tunjuk}</span></button>
  <div class="navkad">${i > 0 ? `<a class="butang kedua" href="#/kad/${l.n}/${i - 1}">${t.sebelum}</a>` : `<span></span>`}${i < n - 1 ? `<a class="butang" href="#/kad/${l.n}/${i + 1}">${t.lepas}</a>` : `<a class="butang" href="#/latih/${l.n}">${t.keKuiz}</a>`}</div>`;
  const b = document.getElementById("imbas");
  b.onclick = () => { const buka = b.getAttribute("aria-expanded") !== "true"; b.setAttribute("aria-expanded", buka); b.querySelector(".dedah").hidden = !buka; b.querySelector(".petunjuk").hidden = buka; };
  if (!rekod(l.n).b.includes(i)) { rekod(l.n).b.push(i); simpan(); }
  scrollTo(0, 0);
}
function pilihanPalsu(k, medan, kumpulan) {
  const nilai = x => medan === "ar" ? x.ar : maknaK(x);
  const lain = a => rawak(a.filter(x => nilai(x) !== nilai(k) && maknaK(x) !== maknaK(k) && !samar(x, k)));
  return [...new Map([...lain(kumpulan), ...lain(SEMUA)].map(x => [nilai(x), x])).values()].slice(0, 3);
}
// Set Padankan: 4 kalimah, tiada dua yang sama/hampir sama (Arab, rumi atau makna)
function setPadan(k, calon) {
  const set = [k];
  for (const x of calon) { if (set.length === 4) break; if (set.every(y => y !== x && !samar(x, y) && maknaK(x) !== maknaK(y))) set.push(x); }
  return set.length === 4 ? set : null;
}
function latihKata(kad, tajuk, undur, kumpulan, n) {
  const t = T();
  let baris = rawak(kad).sort((a, b) => kotak(a) - kotak(b)).slice(0, SESI), betul = 0, jumlah = 0, ulang = new Set(), ubah = Math.floor(Math.random() * 3);
  const jawab = (k, ok) => { S.kata[kuncikad(k)] = ok ? Math.min(KUASAI, kotak(k) + 1) : 0; jumlah++; if (ok) betul++; else ulang.add(k.ar); };
  const atasK = () => `${atas(tajuk, undur, false)}<section class="kuiz"><div class="palang"><i style="width:${betul / ((betul + baris.length) || 1) * 100}%"></i></div><p class="kecil">${t.tinggal(baris.length)}</p>`;
  function kesan(html) {
    document.getElementById("kesan").innerHTML = `${html}<button class="butang" id="lagi">${baris.length ? t.next : t.hasil}</button>`;
    const l = document.getElementById("lagi"); l.scrollIntoView({ behavior: "smooth", block: "center" });
    l.onclick = () => baris.length ? papar() : tamat();
  }
  function papar() {
    const k = baris[0], jenis = ["m", "ar", "padan"][ubah++ % 3];
    const set = jenis === "padan" && setPadan(k, [...rawak(baris.slice(1)), ...rawak(kumpulan)]);
    if (set) return padankan(set);
    const keArab = jenis === "ar";
    const pil = rawak([k, ...pilihanPalsu(k, keArab ? "ar" : "m", kumpulan)]);
    app.innerHTML = `${atasK()}
    ${keArab ? `<h2>${t.soalAr(hb(maknaK(k)))}</h2>` : `<div class="soal-ar">${arab(k)}<small>${rumi(k)}</small></div><h2>${t.soalM}</h2>`}
    <div class="pilihan ${keArab ? "pil-ar" : ""}">${pil.map(x => `<button data-ok="${x === k ? 1 : ""}">${keArab ? arab(x) : hb(maknaK(x))}</button>`).join("")}</div><div id="kesan" aria-live="polite"></div></section>`;
    app.querySelectorAll(".pilihan button").forEach(b => b.onclick = () => {
      const ok = !!b.dataset.ok;
      app.querySelectorAll(".pilihan button").forEach(x => { x.disabled = true; if (x.dataset.ok) x.classList.add("betul"); });
      jawab(k, ok); tandaHari(); simpan();
      baris.shift();
      if (!ok) { b.classList.add("salah"); baris.splice(Math.min(2, baris.length), 0, k); }
      kesan(`<div class="${ok ? "kbetul" : "ksalah"}"><b>${ok ? t.betul : t.salah}</b><p>${arab(k)} ${rumi(k)}: ${hb(maknaK(k))}</p>${ok ? "" : `<p>${t.lagi}</p>`}</div>`);
    });
    scrollTo(0, 0);
  }
  function padankan(set) {
    const silap = new Set(); let pilih = null, siap = 0;
    const kiri = rawak(set.map((x, i) => i)), kanan = rawak(set.map((x, i) => i));
    app.innerHTML = `${atasK()}<h2>${t.padan}</h2><div class="padan"><div>${kiri.map(i => `<button data-p="${i}" data-s="a" class="pa">${arab(set[i])}</button>`).join("")}</div><div>${kanan.map(i => `<button data-p="${i}" data-s="m">${hb(maknaK(set[i]))}</button>`).join("")}</div></div><div id="kesan" aria-live="polite"></div></section>`;
    const btn = [...app.querySelectorAll(".padan button")];
    btn.forEach(b => b.onclick = () => {
      if (b.disabled) return;
      if (!pilih || pilih.dataset.s === b.dataset.s) { btn.forEach(x => x.classList.remove("dipilih")); pilih = b; b.classList.add("dipilih"); return; }
      const a = pilih; pilih = null; a.classList.remove("dipilih");
      if (a.dataset.p === b.dataset.p) { [a, b].forEach(x => { x.classList.add("betul"); x.disabled = true; }); siap++; }
      else { const ar = a.dataset.s === "a" ? a : b; silap.add(+ar.dataset.p); [a, b].forEach(x => { x.classList.add("salah"); setTimeout(() => x.classList.remove("salah"), 700); }); }
      if (siap === set.length) {
        set.forEach((x, i) => jawab(x, !silap.has(i))); tandaHari(); simpan();
        baris = baris.filter(x => !set.includes(x));
        set.filter((x, i) => silap.has(i)).forEach(x => baris.splice(Math.min(2, baris.length), 0, x));
        kesan(`<div class="${silap.size ? "ksalah" : "kbetul"}"><b>${silap.size ? t.salah : t.padanOk}</b>${set.map((x, i) => `<p>${silap.has(i) ? "✗" : "✓"} ${arab(x)} ${rumi(x)}: ${hb(maknaK(x))}</p>`).join("")}${silap.size ? `<p>${t.padanUlang(silap.size)}</p>` : ""}</div>`);
      }
    });
    scrollTo(0, 0);
  }
  function tamat() {
    const p = jumlah ? Math.round(betul / jumlah * 100) : 0;
    if (n) { const r = rekod(n); r.s = Math.max(r.s ?? 0, p); simpan(); }
    app.innerHTML = `${atas(tajuk, undur, false)}<section class="hasil"><p class="kecil">${t.selesai}</p><div class="skor">${betul}/${jumlah}</div><h2>${ulang.size ? t.perluUlang(ulang.size) : t.semua}</h2>${n ? `<p>${t.terbaik(rekod(n).s)}</p>` : ""}<p>${t.syarat}</p><a class="butang" href="${undur}">${t.kembali}</a><a class="butang kedua" href="${location.hash.split("?")[0]}?${Date.now()}">${t.latihLagi}</a></section>`;
    scrollTo(0, 0);
  }
  if (!baris.length) { app.innerHTML = `${atas(tajuk, undur)}<section class="hasil"><h2>${t.tiada}</h2><a class="butang" href="${undur}">${t.kembali}</a></section>`; return; }
  papar();
}
function hala() {
  document.documentElement.lang = S.bahasa; document.title = EN() ? "Salah Vocabulary Practice" : "Latihan Kosa Kata Solat";
  const [, a, b, c] = location.hash.split("?")[0].split("/");
  const l = LANGKAH.find(x => x.n === +b);
  if (["kata", "kad", "latih"].includes(a)) {
    if (!l) return utama();
    if (terkunci(l.n)) return halKunci();
    if (a === "kata") halBaca(l);
    else if (a === "kad") halUlang(l, c);
    else latihKata(kolam(l), T().kuiz(tajukL(l)), `#/kata/${l.n}`, kolam(l), l.n);
  }
  else if (a === "ulang") latihKata(SEMUA.filter(k => S.kata[kuncikad(k)] !== undefined && kotak(k) < KUASAI), T().ulangT, "#/", SEMUA);
  else utama();
}
app.addEventListener("click", e => { const b = e.target.closest("[data-bh]"); if (b && b.dataset.bh !== S.bahasa) { const kod = document.getElementById("kod")?.value; S.bahasa = b.dataset.bh; simpan(); hala(); if (kod) document.getElementById("kod").value = kod; } });
addEventListener("hashchange", hala); hala();
if ("serviceWorker" in navigator && location.protocol === "https:") navigator.serviceWorker.register("sw.js", { updateViaCache: "none" }).catch(() => {});
