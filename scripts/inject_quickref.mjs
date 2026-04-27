import { readFileSync, writeFileSync } from 'node:fs';

const data = {
  claude_code: {
    id: 's10',
    what_en: "Anthropic's terminal coding agent — edits files, runs commands, ships code from the CLI.",
    what_tr: "Anthropic'in terminal kodlama ajanı — dosya düzenler, komut çalıştırır, CLI'dan kod yollar.",
    for_en: "Game prototypes, refactoring engine code, generating shaders, automating asset pipelines.",
    for_tr: "Oyun prototipi, motor kodu refactor, shader üretimi, asset pipeline otomasyonu.",
    free_en: "No free tier — Pro $20/mo, Max $100–200/mo, or API pay-as-you-go (~$5 trial credit).",
    free_tr: "Ücretsiz plan yok — Pro $20/ay, Max $100–200/ay veya API kullanım bazlı (~$5 deneme).",
  },
  aitmpl: {
    id: 's11',
    what_en: "Open catalog of Claude Code agents, skills, slash commands and MCP servers — install in one line.",
    what_tr: "Açık Claude Code ajan, skill, slash komut ve MCP kataloğu — tek satırlık komutla kurulur.",
    for_en: "Bolting ready-made review, testing, 3D-asset and game-dev workflows onto Claude Code.",
    for_tr: "Hazır review, test, 3D-asset ve oyun-geliştirme workflow'larını Claude Code'a eklemek.",
    free_en: "Fully free and open source (MIT) — you only pay for Claude Code itself.",
    free_tr: "Tamamen ücretsiz ve açık kaynak (MIT) — sadece Claude Code ücreti var.",
  },
  codex: {
    id: 's12',
    what_en: "OpenAI's CLI coding agent — runs in a read-only sandbox for independent code review and audits.",
    what_tr: "OpenAI'nin CLI kodlama ajanı — bağımsız kod review ve denetim için salt-okunur sandbox.",
    for_en: "Adversarial review of game logic, save/load bugs, security audit before shipping a build.",
    for_tr: "Build göndermeden önce oyun mantığı, save/load bug'ları ve güvenlik için adversarial review.",
    free_en: "CLI is open source (Apache 2.0) — usage billed via ChatGPT Plus/Pro or OpenAI API key.",
    free_tr: "CLI açık kaynak (Apache 2.0) — kullanım ChatGPT Plus/Pro veya OpenAI API anahtarıyla.",
  },
  tripo: {
    id: 's13',
    what_en: "Text- or image-to-3D mesh generator with rigging and PBR texturing.",
    what_tr: "Metin veya görselden 3D mesh üreten araç — rigging ve PBR doku desteği var.",
    for_en: "Drafting characters, props and environment assets for Unity / Unreal / Godot from one prompt.",
    for_tr: "Tek prompt'tan Unity / Unreal / Godot için karakter, prop ve çevre asset'i üretmek.",
    free_en: "Free: ~600 credits/month (~24 models), CC BY 4.0 only — no commercial use; Pro $19.90/mo.",
    free_tr: "Ücretsiz: ~600 kredi/ay (~24 model), sadece CC BY 4.0 — ticari yok; Pro $19.90/ay.",
  },
  meshy: {
    id: 's14',
    what_en: "Text- or image-to-3D mesh tool with auto-rigging, retopology and AI texturing.",
    what_tr: "Metin veya görselden 3D mesh — otomatik rigging, retopoloji ve AI doku içerir.",
    for_en: "Game-ready low-poly props and characters; texture maps for existing meshes.",
    for_tr: "Oyuna hazır low-poly prop ve karakter; mevcut mesh'lere doku haritaları.",
    free_en: "Free: 100 credits/month, 10 downloads/month, no commercial rights; Pro $20/mo.",
    free_tr: "Ücretsiz: 100 kredi/ay, 10 indirme/ay, ticari hak yok; Pro $20/ay.",
  },
  rodin: {
    id: 's15',
    what_en: "Hyper3D Rodin Gen-2 — image-to-3D with 4K PBR textures and high-poly meshes.",
    what_tr: "Hyper3D Rodin Gen-2 — görselden 3D, 4K PBR doku ve yüksek poligon mesh.",
    for_en: "Hero assets, hard-surface props and detailed creatures where texture quality matters.",
    for_tr: "Doku kalitesi önemli olan hero asset, hard-surface prop ve detaylı yaratık üretimi.",
    free_en: "Free signup with a few trial credits; Creator $20 first month / $30 after, 30 credits.",
    free_tr: "Kayıtta birkaç deneme kredisi; Creator ilk ay $20, sonra $30/ay (30 kredi).",
  },
  marble: {
    id: 's16',
    what_en: "World Labs Marble — turns a photo or prompt into a walkable, persistent 3D world.",
    what_tr: "World Labs Marble — fotoğraf veya prompt'u gezilebilir, kalıcı 3D dünyaya çevirir.",
    for_en: "Greyboxing levels, concept environments and VR scenes without modeling them by hand.",
    for_tr: "El ile modellemeden level greybox, konsept ortam ve VR sahne hazırlamak.",
    free_en: "Free: 4 worlds/month, no commercial rights; Standard $20/mo, Pro $35/mo (commercial).",
    free_tr: "Ücretsiz: 4 dünya/ay, ticari hak yok; Standard $20/ay, Pro $35/ay (ticari).",
  },
  genie: {
    id: 's17',
    what_en: "DeepMind Genie 3 — a world model that generates real-time playable interactive environments.",
    what_tr: "DeepMind Genie 3 — gerçek zamanlı oynanabilir interaktif ortamlar üreten dünya modeli.",
    for_en: "Prototyping playable game spaces and remixing scenes from a text prompt or reference image.",
    for_tr: "Oynanabilir oyun alanlarını prototiplemek; metin veya görselden sahne remix.",
    free_en: "No free tier — Google AI Ultra $249.99/mo, US-only, 18+; rolling out via Project Genie.",
    free_tr: "Ücretsiz plan yok — Google AI Ultra $249.99/ay, sadece ABD, 18+; Project Genie ile dağıtılıyor.",
  },
  mirage: {
    id: 's18',
    what_en: "Decart Mirage — zero-latency video-to-video model that restyles a live stream in real time.",
    what_tr: "Decart Mirage — canlı yayını gerçek zamanlı yeniden stilleyen sıfır gecikmeli video-to-video modeli.",
    for_en: "Live-restyle gameplay capture, alt visual themes for streams, on-the-fly cutscene looks.",
    for_tr: "Oynanış yayınını canlı stillemek; alternatif görseller; anlık ara sahne görünümleri.",
    free_en: "Free API trial credits for developers; usage-based after that, no public monthly quota.",
    free_tr: "Geliştiriciler için ücretsiz API deneme kredisi; sonrası kullanım bazlı, aylık kota yok.",
  },
  suno: {
    id: 's19',
    what_en: "Text-to-music generator — produces full songs with vocals, lyrics and instrumentation.",
    what_tr: "Metinden müzik üretir — vokal, sözler ve enstrümanlarla tam şarkı çıkarır.",
    for_en: "Game soundtracks, menu themes, trailer music and placeholder vocals for prototypes.",
    for_tr: "Oyun müzikleri, menü teması, fragman müziği ve prototip için yer-tutucu vokal.",
    free_en: "Free: 50 credits/day (~10 songs), no commercial use, no downloads since Nov 2025; Pro $10/mo.",
    free_tr: "Ücretsiz: 50 kredi/gün (~10 şarkı), ticari yok, Kas 2025'ten beri indirme yok; Pro $10/ay.",
  },
  pollinations: {
    id: 's20',
    what_en: "Free URL-based image API powered by FLUX — no signup, just hit a URL with a prompt.",
    what_tr: "FLUX tabanlı ücretsiz URL API'si — kayıt yok, prompt'lu URL'ye istek atınca görsel döner.",
    for_en: "Concept art, mood boards, UI mockups, sprite ideas, instant placeholder textures.",
    for_tr: "Konsept art, mood board, UI mockup, sprite fikri ve anlık yer-tutucu dokular.",
    free_en: "Fully free and unlimited, no API key, no watermark — community-supported, best-effort uptime.",
    free_tr: "Tamamen ücretsiz ve sınırsız, API anahtarı yok, watermark yok — topluluk destekli, garanti yok.",
  },
};

const file = '/Users/timofeyzinin/games-talk/index.html';
let html = readFileSync(file, 'utf8');

function block(t){
  return `      <div class="quick-ref">
        <div class="qr-row"><span class="qr-label">What<br><span class="qr-tag-tr">Nedir</span></span><div class="qr-text"><p class="qr-en"><span class="qr-flag">EN</span>${t.what_en}</p><p class="qr-tr"><span class="qr-flag">TR</span>${t.what_tr}</p></div></div>
        <div class="qr-row"><span class="qr-label">For<br><span class="qr-tag-tr">Ne için</span></span><div class="qr-text"><p class="qr-en"><span class="qr-flag">EN</span>${t.for_en}</p><p class="qr-tr"><span class="qr-flag">TR</span>${t.for_tr}</p></div></div>
        <div class="qr-row"><span class="qr-label">Free<br><span class="qr-tag-tr">Ücretsiz</span></span><div class="qr-text"><p class="qr-en"><span class="qr-flag">EN</span>${t.free_en}</p><p class="qr-tr"><span class="qr-flag">TR</span>${t.free_tr}</p></div></div>
      </div>
`;
}

for (const [k, t] of Object.entries(data)) {
  // Find the slide section by id and inject quick-ref BEFORE the closing </div></section>
  // Strategy: replace the line containing `class="tool-meta"` (or its substitute) by quick-ref + that line.
  // Each tool slide has `<div class="tool-meta">`.
  const re = new RegExp(`(id="${t.id}"[\\s\\S]*?)(\\n\\s*<div class="tool-meta">)`);
  if (!re.test(html)) {
    console.log('SKIP', k, t.id, '— no tool-meta found');
    continue;
  }
  html = html.replace(re, `$1\n${block(t)}$2`);
  console.log('OK  ', k, t.id);
}

// also inject CSS once
const css = `
.quick-ref{margin-top:16px;border:3px solid var(--black);box-shadow:4px 4px 0 var(--black);background:var(--white);overflow:hidden}
.qr-row{display:grid;grid-template-columns:96px 1fr;border-bottom:2px solid var(--black)}
.qr-row:last-child{border-bottom:none}
.qr-label{background:var(--red);color:var(--white);font-family:var(--display);font-size:13px;padding:10px 10px;display:flex;flex-direction:column;justify-content:center;letter-spacing:.04em;text-transform:uppercase;line-height:1.05}
.qr-row:nth-child(2) .qr-label{background:var(--black);color:var(--yellow)}
.qr-row:nth-child(3) .qr-label{background:var(--yellow);color:var(--black)}
.qr-tag-tr{font-family:var(--mono);font-size:9.5px;font-weight:700;letter-spacing:.08em;opacity:.85;text-transform:uppercase;margin-top:3px}
.qr-text{padding:10px 14px;display:flex;flex-direction:column;gap:4px;justify-content:center}
.qr-en{font-size:13.5px;line-height:1.4;color:var(--black)}
.qr-tr{font-size:12.5px;line-height:1.4;color:#555;font-style:italic}
.qr-flag{display:inline-block;font-family:var(--mono);font-size:9px;font-weight:700;letter-spacing:.12em;background:var(--black);color:var(--yellow);padding:1px 5px;margin-right:6px;vertical-align:middle;font-style:normal}
@media(max-width:900px){.qr-row{grid-template-columns:1fr}}
`;
if (!html.includes('.quick-ref{')) {
  html = html.replace('</style>', css + '</style>');
  console.log('CSS injected');
}

writeFileSync(file, html);
console.log('done');
