#!/usr/bin/env node
// Writes the site's HTML pages from the settings below.
// Edit text here, then run:  node scripts/build.mjs
// Add --preview <file> to also write a single-file preview with the data inlined.

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { GUIDES, GUIDES_UPDATED } from './guides.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://eplfanatic.com';
const CONTACT = 'hello@eplfanatic.com';
const FONTS = 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=IBM+Plex+Mono:wght@500&family=Source+Sans+3:wght@400;600;700&display=swap';
// Paste your AdSense publisher ID here once approved, e.g. 'ca-pub-1234567890123456'
const ADSENSE_ID = 'ca-pub-1063483534026275';

const NAV = [
  ['index.html', 'home', 'Home'],
  ['price-changes.html', 'prices', 'Price changes'],
  ['fixture-difficulty.html', 'fixtures', 'Fixtures'],
  ['captain-picks.html', 'captains', 'Captain picks'],
  ['injuries.html', 'injuries', 'Injuries'],
  ['guides.html', 'guides', 'Guides'],
];

const PAGES = [
  {
    file: 'index.html', page: 'home',
    title: 'EPL Fanatic | Free FPL Tools: Price Changes, Fixtures, Captains',
    desc: 'Free Fantasy Premier League tools that update every hour: price change watch, fixture difficulty grid, captain picks and injury news.',
    eyebrow: 'Fantasy Premier League tools', h1: 'Every FPL decision, before the deadline',
    lede: 'Four free tools that update themselves every hour from the official game data. Check them before you make your transfers.',
    body: `<div class="tool-grid">
  <a class="tool-card" href="price-changes.html"><h2>Price changes</h2><p>Who is about to rise or fall in value tonight, based on this gameweek's transfers.</p><div class="teaser" id="teaser-prices">Loading…</div><span class="go">Open price watch →</span></a>
  <a class="tool-card" href="fixture-difficulty.html"><h2>Fixture difficulty</h2><p>Every team's next six games, colour-coded from easiest to hardest.</p><div class="teaser" id="teaser-fixtures">Loading…</div><span class="go">Open fixture grid →</span></a>
  <a class="tool-card" href="captain-picks.html"><h2>Captain picks</h2><p>The best armband options this gameweek, ranked by expected points, form and opponent.</p><div class="teaser" id="teaser-captains">Loading…</div><span class="go">Open captain picks →</span></a>
  <a class="tool-card" href="injuries.html"><h2>Injuries and news</h2><p>Every flagged player, sorted by how many managers own them.</p><div class="teaser" id="teaser-injuries">Loading…</div><span class="go">Open injury list →</span></a>
</div>`,
  },
  {
    file: 'price-changes.html', page: 'prices',
    title: 'FPL Price Changes Tonight | Risers and Fallers | EPL Fanatic',
    desc: 'Which Fantasy Premier League players are likely to rise or fall in price tonight, based on net transfers this gameweek. Updated hourly.',
    eyebrow: 'Price watch', h1: 'FPL price changes',
    lede: 'Players with the most transfers in are the most likely to rise in price. The most transfers out are the most likely to fall. Make your moves before the change, not after.',
  },
  {
    file: 'fixture-difficulty.html', page: 'fixtures',
    title: 'FPL Fixture Difficulty Ticker | Next 6 Gameweeks | EPL Fanatic',
    desc: 'Colour-coded fixture difficulty for every Premier League team over the next six gameweeks, including blank and double gameweeks.',
    eyebrow: 'Fixture ticker', h1: 'Fixture difficulty',
    lede: 'Green is easier, red is harder. Teams are sorted by how kind their run is, so you can spot who to bring in and who to sell.',
  },
  {
    file: 'captain-picks.html', page: 'captains',
    title: 'FPL Captain Picks This Gameweek | EPL Fanatic',
    desc: 'The best Fantasy Premier League captain options for the next gameweek, ranked by expected points, form and fixture difficulty.',
    eyebrow: 'Armband shortlist', h1: 'Captain picks',
    lede: 'The 20 strongest captain options for the next deadline, ranked on expected points, recent form and how tough the opponent is.',
  },
  {
    file: 'injuries.html', page: 'injuries',
    title: 'FPL Injury News and Flagged Players | EPL Fanatic',
    desc: 'Every injured, doubtful and suspended Fantasy Premier League player, sorted by ownership. Updated every hour.',
    eyebrow: 'Team news', h1: 'Injuries and suspensions',
    lede: 'Every player with a flag next to their name in the game, with the latest news. The most-owned players are at the top.',
  },
  {
    file: 'about.html', page: 'about',
    title: 'About EPL Fanatic',
    desc: 'EPL Fanatic is an independent fan site with free Fantasy Premier League tools.',
    eyebrow: 'About', h1: 'About EPL Fanatic',
    body: `<div class="prose">
<p>EPL Fanatic is an independent site built by a fan, for Fantasy Premier League managers who want the key numbers in one place before every deadline.</p>
<p>The tools read the public data from the Fantasy Premier League game and refresh every hour. Nothing here is a guarantee: prices, team news and points can change at any time, so double-check in the official game before you confirm transfers.</p>
<h2>Contact</h2>
<p>Questions, ideas or a mistake you've spotted? Email <strong>${CONTACT}</strong>.</p>
<h2>Not affiliated</h2>
<p>EPL Fanatic is not affiliated with, endorsed by, or connected to the Premier League, Fantasy Premier League or any club. Club names are used only to identify teams.</p>
</div>`,
  },
  {
    file: 'privacy.html', page: 'privacy',
    title: 'Privacy Policy | EPL Fanatic',
    desc: 'How EPL Fanatic handles information, cookies and advertising.',
    eyebrow: 'Legal', h1: 'Privacy policy',
    body: `<div class="prose">
<p><em>Last updated: October 2026</em></p>
<p>This policy explains what information EPL Fanatic ("we") collects when you use eplfanatic.com.</p>
<h2>Information we collect</h2>
<p>We don't ask you to create an account and we don't collect your name or email unless you email us. If you email us, we use your address only to reply.</p>
<h2>Cookies and advertising</h2>
<p>We may show ads served by Google. Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visits to this site and/or other sites on the Internet.</p>
<p>You can opt out of personalised advertising by visiting <a href="https://adssettings.google.com" rel="noopener">Google Ads Settings</a>. You can also opt out of some third-party vendors' use of cookies for personalised advertising at <a href="https://www.aboutads.info/choices/" rel="noopener">aboutads.info</a>.</p>
<h2>Analytics</h2>
<p>If we add visitor statistics, we'll use them only to understand which pages are popular, and we'll update this page to say which service we use.</p>
<h2>Children</h2>
<p>This site is not directed at children under 13, and we don't knowingly collect information from them.</p>
<h2>Changes and contact</h2>
<p>We may update this policy and will change the date above when we do. Questions: <strong>${CONTACT}</strong>.</p>
</div>`,
  },
];


// Guide pages and the guides index
const guideList = () => `<ul class="guide-list">${GUIDES.map(g =>
  `<li><a href="${g.file}"><span class="gl-title">${g.h1}</span><span class="gl-desc">${g.desc}</span></a></li>`).join('')}</ul>`;
PAGES.push({
  file: 'guides.html', page: 'guides',
  title: 'FPL Guides: Chips, Prices, Scoring, Captains | EPL Fanatic',
  desc: 'Plain-English Fantasy Premier League guides for 2026/27: chips, price changes, scoring, blank and double gameweeks, captaincy and transfers.',
  eyebrow: 'Guides', h1: 'FPL guides',
  lede: 'Short, plain-English guides to the rules and decisions that matter most in Fantasy Premier League.',
  body: guideList(),
});
for (const g of GUIDES) {
  const others = GUIDES.filter(o => o !== g);
  PAGES.push({
    file: g.file, page: 'guide', nav: 'guides', title: g.title, desc: g.desc,
    eyebrow: 'FPL guide', h1: g.h1, lede: g.lede,
    body: `<article class="prose">${g.body}
<p class="updated">Last updated ${GUIDES_UPDATED}.</p></article>
<aside class="more-guides"><h2>More guides</h2><ul class="guide-list">${others.map(o =>
  `<li><a href="${o.file}"><span class="gl-title">${o.h1}</span></a></li>`).join('')}</ul></aside>`,
  });
}
// Home page: add the guides list under the tools
PAGES[0].body += `\n<section class="home-guides"><h2>Learn the game</h2>${guideList()}</section>`;

const TOOL_PAGES = new Set(['prices', 'fixtures', 'captains', 'injuries', 'home']);

function header(current) {
  return `<header class="site-head"><div class="wrap head-row">
  <a class="brand" href="index.html">EPL<span>Fanatic</span></a>
  <nav class="nav" aria-label="Main">${NAV.map(([href, id, label]) =>
    `<a href="${href}"${id === current ? ' aria-current="page"' : ''}>${label}</a>`).join('')}</nav>
</div></header>
<div class="band"><div class="wrap gw-band"><span><b>FPL Tools</b> Loading the latest gameweek…</span></div></div>`;
}

function footer() {
  return `<footer class="site-foot"><div class="wrap">
  <nav aria-label="Footer"><a href="about.html">About</a><a href="about.html#contact">Contact</a><a href="privacy.html">Privacy</a></nav>
  <p style="margin:0">EPL Fanatic is an independent fan site. Not affiliated with, endorsed by, or connected to the Premier League or Fantasy Premier League. Data comes from the public FPL game and updates every hour.</p>
  <p style="margin:0">© ${new Date().getFullYear()} EPL Fanatic</p>
</div></footer>`;
}

function pageHead(p) {
  return `<div class="page-head">
  <p class="eyebrow">${p.eyebrow}</p>
  <h1>${p.h1}</h1>
  ${p.lede ? `<p class="lede">${p.lede}</p>` : ''}
</div>`;
}

function mainContent(p) {
  if (p.page === 'home') return `${pageHead(p)}<div id="tool">${p.body}</div>`;
  if (TOOL_PAGES.has(p.page)) return `${pageHead(p)}<div class="ad-slot"></div><div id="tool"><p class="loading">Loading the latest numbers…</p></div><div class="ad-slot"></div>`;
  return `${pageHead(p)}${p.body}`;
}

function fullPage(p) {
  const canonical = `${SITE}/${p.file === 'index.html' ? '' : p.file}`;
  const ads = ADSENSE_ID
    ? `\n<meta name="google-adsense-account" content="${ADSENSE_ID}">\n<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}" crossorigin="anonymous"></script>` : '';
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${p.title}</title>
<meta name="description" content="${p.desc}">
<link rel="canonical" href="${canonical}">
<meta property="og:title" content="${p.title}">
<meta property="og:description" content="${p.desc}">
<meta property="og:url" content="${canonical}">
<meta property="og:type" content="website">
<meta name="theme-color" content="#1d0624">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<link rel="stylesheet" href="assets/style.css">${ads}
</head>
<body data-page="${p.page}">
${header(p.nav || p.page)}
<main class="wrap">
${mainContent(p).replace('<h2>Contact</h2>', '<h2 id="contact">Contact</h2>')}
</main>
${footer()}
<script src="assets/app.js" defer></script>
</body>
</html>
`;
}

async function buildSite() {
  for (const p of PAGES) await writeFile(path.join(ROOT, p.file), fullPage(p));
  const urls = PAGES.map(p => `  <url><loc>${SITE}/${p.file === 'index.html' ? '' : p.file}</loc></url>`).join('\n');
  await writeFile(path.join(ROOT, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  await writeFile(path.join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
  await writeFile(path.join(ROOT, 'CNAME'), 'eplfanatic.com\n');
  if (ADSENSE_ID) await writeFile(path.join(ROOT, 'ads.txt'), `google.com, ${ADSENSE_ID.replace('ca-', '')}, DIRECT, f08c47fec0942fa0\n`);
  await writeFile(path.join(ROOT, '.nojekyll'), '');
  console.log(`Built ${PAGES.length} pages.`);
}

// Single-file preview: every page as a tab, sample data inlined.
async function buildPreview(out) {
  const css = await readFile(path.join(ROOT, 'assets', 'style.css'), 'utf8');
  const js = await readFile(path.join(ROOT, 'assets', 'app.js'), 'utf8');
  const data = await readFile(path.join(ROOT, 'data', 'fpl.json'), 'utf8');
  const views = PAGES.filter(p => p.page !== 'privacy');
  const vid = p => p.file.replace('.html', '');
  const html = `<title>EPL Fanatic Preview</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="${FONTS}">
<style>
${css}
.view[hidden] { display: none !important; }
</style>
<header class="site-head"><div class="wrap head-row">
  <a class="brand" href="#" data-go="index">EPL<span>Fanatic</span></a>
  <nav class="nav" aria-label="Main">${NAV.map(([f, id, label]) => `<button type="button" id="nav-${id}" data-go="${f.replace('.html', '')}"${id === 'home' ? ' aria-current="page"' : ''}>${label}</button>`).join('')}</nav>
</div></header>
<div class="band"><div class="wrap gw-band"></div></div>
<main class="wrap">
${views.map(p => `<section class="view" id="view-${vid(p)}"${p.page === 'home' ? '' : ' hidden'}>
${pageHead(p)}<div class="tool-host" data-tool="${p.page}">${p.page === 'home' ? p.body : p.body || ''}</div>
</section>`).join('\n')}
</main>
${footer()}
<script>window.FPL_DATA = ${data};</script>
<script>
${js}
</script>
<script>
(function () {
  var fileToId = ${JSON.stringify(Object.fromEntries(views.map(p => [p.file, vid(p)]).concat([['privacy.html', 'about']])))};
  function show(id) {
    document.querySelectorAll('.view').forEach(function (v) { v.hidden = v.id !== 'view-' + id; });
    document.querySelectorAll('.nav [data-go]').forEach(function (b) {
      if (b.getAttribute('data-go') === id) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
    });
    window.scrollTo(0, 0);
  }
  document.addEventListener('click', function (e) {
    var go = e.target.closest('[data-go]');
    var a = e.target.closest('a[href]');
    if (go) { e.preventDefault(); show(go.getAttribute('data-go')); return; }
    if (a) {
      var f = a.getAttribute('href').split('#')[0];
      if (fileToId[f]) { e.preventDefault(); show(fileToId[f]); }
    }
  });
  var d = window.FPL_DATA;
  EPLF.band(d);
  document.querySelectorAll('.tool-host').forEach(function (h) {
    var r = EPLF.render[h.getAttribute('data-tool')];
    if (r) r(h, d);
  });
})();
</script>
`;
  await writeFile(out, html);
  console.log(`Preview written to ${out}`);
}

await buildSite();
const i = process.argv.indexOf('--preview');
if (i > -1) await buildPreview(process.argv[i + 1]);
