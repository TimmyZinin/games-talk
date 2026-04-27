import { readFileSync, writeFileSync } from 'node:fs';
const file = '/Users/timofeyzinin/games-talk/index.html';
let html = readFileSync(file, 'utf8');

// 1) Drop the descriptive EN+TR <p class="what"> and <p class="what-tr"> on every tool slide.
//    They duplicate the WHAT row of quick-ref. Keep the use-case card and tool-meta.
const before = html.length;
html = html.replace(/\n\s*<p><span class="lang-tag">EN<\/span>[^<]*?<\/p>\n\s*<p class="tr"><span class="lang-tag">TR<\/span>[^<]*?<\/p>(?=[\s\S]{0,400}?class="card-(red|yellow)")/g, '');
// remove tool-slide top descriptive lead paragraphs only inside tool slides (between .text > and the use-case card)
html = html.replace(/(<div class="text">\s*<span class="num">[^<]+<\/span>\s*<h2>[\s\S]*?<\/h2>)\s*<p><span class="lang-tag">EN<\/span>[^<]*?<\/p>\s*<p class="what-tr"><span class="lang-tag">TR<\/span>[^<]*?<\/p>/g, '$1');
console.log('shrunk by', before - html.length, 'chars');

// 2) Fix slide overflow + position
html = html.replace(
  ".slide{\n  min-width:100vw;width:100vw;height:100vh;\n  display:flex;flex-direction:column;justify-content:center;\n  padding:80px clamp(36px,7vw,140px);\n  position:relative;overflow:hidden;\n  border-right:4px solid var(--black);flex-shrink:0;\n}",
  ".slide{\n  min-width:100vw;width:100vw;height:100vh;\n  display:flex;flex-direction:column;justify-content:flex-start;\n  padding:90px clamp(36px,7vw,140px) 70px;\n  position:relative;overflow-y:auto;overflow-x:hidden;\n  border-right:4px solid var(--black);flex-shrink:0;\n}\n.slide::-webkit-scrollbar{width:8px}\n.slide::-webkit-scrollbar-thumb{background:var(--red);border:2px solid var(--bg)}\n.slide::-webkit-scrollbar-track{background:var(--bg)}"
);

// 3) Tighten quick-ref vertical density so it fits next to the screenshot
html = html.replace(
  ".quick-ref{margin-top:16px;border:3px solid var(--black);box-shadow:4px 4px 0 var(--black);background:var(--white);overflow:hidden}",
  ".quick-ref{margin-top:14px;border:3px solid var(--black);box-shadow:4px 4px 0 var(--black);background:var(--white);overflow:hidden}"
);
html = html.replace(
  ".qr-row{display:grid;grid-template-columns:96px 1fr;border-bottom:2px solid var(--black)}",
  ".qr-row{display:grid;grid-template-columns:84px 1fr;border-bottom:2px solid var(--black)}"
);
html = html.replace(
  ".qr-label{background:var(--red);color:var(--white);font-family:var(--display);font-size:13px;padding:10px 10px;display:flex;flex-direction:column;justify-content:center;letter-spacing:.04em;text-transform:uppercase;line-height:1.05}",
  ".qr-label{background:var(--red);color:var(--white);font-family:var(--display);font-size:12px;padding:8px 8px;display:flex;flex-direction:column;justify-content:center;letter-spacing:.04em;text-transform:uppercase;line-height:1.05}"
);
html = html.replace(
  ".qr-text{padding:10px 14px;display:flex;flex-direction:column;gap:4px;justify-content:center}",
  ".qr-text{padding:8px 12px;display:flex;flex-direction:column;gap:3px;justify-content:center}"
);
html = html.replace(
  ".qr-en{font-size:13.5px;line-height:1.4;color:var(--black)}",
  ".qr-en{font-size:13px;line-height:1.35;color:var(--black)}"
);
html = html.replace(
  ".qr-tr{font-size:12.5px;line-height:1.4;color:#555;font-style:italic}",
  ".qr-tr{font-size:12px;line-height:1.35;color:#555;font-style:italic}"
);

// 4) Make the use-case card on tool slides tighter
html = html.replace(/<div class="card-(red|yellow)" style="margin-top:14px">/g, '<div class="card-$1" style="margin-top:12px;padding:14px 16px">');

// 5) Slide number z-index + push slide content top so it never collides with slide-number
html = html.replace(
  ".slide-number{position:absolute;top:32px;left:clamp(36px,7vw,140px);font-family:var(--mono);font-size:13px;color:var(--red);letter-spacing:.08em;background:var(--yellow);padding:4px 12px;border:2px solid var(--black);box-shadow:2px 2px 0 var(--black);transform:rotate(-1deg);z-index:5}",
  ".slide-number{position:absolute;top:24px;left:clamp(36px,7vw,140px);font-family:var(--mono);font-size:12px;color:var(--red);letter-spacing:.08em;background:var(--yellow);padding:3px 11px;border:2px solid var(--black);box-shadow:2px 2px 0 var(--black);transform:rotate(-1deg);z-index:5;max-width:calc(100% - 200px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}"
);

writeFileSync(file, html);
console.log('done');
