import { mkdir, writeFile, copyFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { root, publicRoot, base, origin, esc, href, sizeLabel, loadCatalog, visibleLessons } from './catalog.mjs';

const data = await loadCatalog();
const lessons = visibleLessons(data);
const hasPending = lessons.some(l => l.status === 'preparing') || data.collection.status === 'preparing';
const dist = path.join(root, 'dist');
// Replace generated output only. The local source-material folder is never copied.
if (dist !== path.join(root, 'dist')) throw new Error('Invalid output directory');
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

const arrow = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>';
const down = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 3v17m-6-6 6 6 6-6"/></svg>';
const download = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/></svg>';
const nav = (key, url, label, current) => `<a href="${url}"${key === current ? ' aria-current="page"' : ''}>${label}</a>`;

function page({ title, description, route = '', current = '', body, home = false }) {
  const libraryUrl = home ? '#lessons' : base + '#lessons';
  return `<!doctype html>
<html lang="ko"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)} · 수업공방</title><meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#17634d"><link rel="canonical" href="${origin}${href(route)}">
<meta property="og:type" content="website"><meta property="og:locale" content="ko_KR">
<meta property="og:title" content="${esc(title)} · 수업공방"><meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${origin}${href(route)}">
<link rel="icon" href="${href('assets/favicon.svg')}" type="image/svg+xml">
${home ? `<link rel="preload" as="image" href="${href('assets/workshop-hero.webp')}">` : ''}
<link rel="stylesheet" href="${href('assets/style.css')}">
<script src="${href('assets/common.js')}" defer></script>
</head><body${home ? ' class="home"' : ''}>
<a class="skip-link" href="${home ? '#lessons' : '#main'}">본문으로 바로가기</a>
<header class="site-header${home ? ' home-header' : ''}"><div class="shell header-inner">
<a class="wordmark" href="${base}" aria-label="수업공방 홈"><span class="brand-logo"><img src="${href('assets/class-studio-logo.png')}" width="1983" height="793" alt="수업공방" fetchpriority="high"></span></a>
<nav aria-label="주 메뉴">${nav('library', libraryUrl, '수업 자료', current)}${nav('collection', href('collection/'), '전체 자료집', current)}${nav('about', href('about/'), '소개', current)}</nav>
</div></header>
<main id="main" tabindex="-1">${body}</main>
<footer class="site-footer"><div class="shell footer-inner"><div><a class="footer-name" href="${base}">수업공방</a><p>2026 교단지원 자료개발 교육연구회</p></div><a href="${href('about/#usage')}">자료 이용 안내</a></div></footer>
</body></html>`;
}

function card(l) {
  return `<li class="lesson-item"><a class="lesson-card" href="${href(`lessons/${l.id}/`)}">
<div class="card-meta">${esc(l.subjects.join(' · '))}<span>${esc(l.grades.join(' · '))}</span></div>
<h3>${esc(l.title)}</h3><p>${esc(l.summary)}</p>
<div class="card-bottom"><span>${l.status === 'published' ? '자료 공개' : '자료 준비 중'}</span><span class="card-action">자료 보기 ${arrow}</span></div>
</a></li>`;
}

function section(p) {
  const items = lessons.filter(l => l.part === p.id);
  return `<section class="part-section" id="${p.id}" aria-labelledby="title-${p.id}">
<h2 id="title-${p.id}"><span class="part-label">${esc(p.number)}</span>${esc(p.title)}</h2>
${items.length ? `<ul class="lesson-grid">${items.map(card).join('')}</ul>` : '<p class="part-empty">등록된 수업이 없습니다.</p>'}
</section>`;
}

const home = page({
  title: '수업 자료',
  description: '수업공방 일반화자료실. 1부 개념 기반 탐구학습, 2부 교과융합 수업 자료.',
  current: 'library', home: true,
  body: `<section class="hero" aria-label="수업공방">
<img class="hero-image" src="${href('assets/workshop-hero.webp')}" width="1672" height="941" alt="수업공방을 표현한 이미지. 햇빛이 드는 나무 작업대에 종이와 수업 카드, 필기도구가 놓여 있습니다." fetchpriority="high" decoding="async">
<span class="hero-credit">AI 생성 이미지</span><a class="hero-browse" href="#lessons">수업 자료 보기 ${down}</a>
</section>
<div class="shell library" id="lessons" tabindex="-1">
<div class="library-heading"><h1>수업 자료</h1><nav class="part-index" aria-label="수업 분류">${data.parts.map(p => `<a href="#${p.id}"><span>${p.number}</span>${esc(p.title)}</a>`).join('')}</nav></div>
${hasPending ? '<p class="preparation-note">자료 파일은 준비 중입니다.</p>' : ''}
${data.parts.map(section).join('')}
<section class="collection-strip"><h2>전체 자료집</h2><a class="text-link" href="${href('collection/')}">자료집 보기 ${arrow}</a></section>
</div>`
});

async function write(route, html) {
  const target = path.join(dist, route);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, html);
}
await write('index.html', home);

function resources(item) {
  if (item.status !== 'published') return '<p class="resource-pending">자료 준비 중입니다.</p>';
  return `<ul class="file-list">${item.files.map(f => `<li>
<div><strong>${esc(f.label)}</strong><span>${esc(f.format)} · ${sizeLabel(f.bytes)}</span></div>
<div class="file-actions">${f.format === 'PDF' ? `<a class="text-link" href="${href(f.path)}" target="_blank" rel="noopener">PDF 열기<span class="sr-only"> (새 탭)</span></a>` : ''}<a class="button" href="${href(f.path)}" download>${download} 다운로드<span class="sr-only">: ${esc(f.label)}</span></a></div>
</li>`).join('')}</ul>`;
}

for (const l of lessons) {
  const p = data.parts.find(p => p.id === l.part);
  await write(`lessons/${l.id}/index.html`, page({
    title: l.title, description: l.summary, route: `lessons/${l.id}/`,
    body: `<div class="shell detail-shell">
<nav class="breadcrumb" aria-label="현재 위치"><a href="${base}#lessons">수업 자료</a><span aria-hidden="true">/</span><a href="${base}#${p.id}">${p.number} ${esc(p.title)}</a></nav>
<header class="lesson-heading"><p class="detail-meta">${esc(l.subjects.join(' · '))}<span>${esc(l.grades.join(' · '))}</span></p><h1>${esc(l.title)}</h1></header>
<section class="resources" aria-labelledby="resource-title"><div class="resource-heading"><h2 id="resource-title">수업 자료</h2>${l.status === 'published' ? `<span>${l.files.length}개 파일</span>` : ''}</div>${resources(l)}</section>
<div class="lesson-body"><article class="lesson-overview"><h2>수업 개요</h2><p>${esc(l.overview)}</p><h2>수업 활동</h2><ol class="activity-list">${l.activities.map(a => `<li>${esc(a)}</li>`).join('')}</ol></article>
<aside class="lesson-info" aria-label="수업 정보"><dl><dt>교과</dt><dd>${esc(l.subjects.join(' · '))}</dd><dt>대상</dt><dd>${esc(l.grades.join(' · '))}</dd><dt>작성</dt><dd>${esc(l.author)}</dd><dt>정보 확인일</dt><dd><time datetime="${l.updated}">${l.updated.replaceAll('-', '. ')}</time></dd></dl>
<button type="button" class="share-button" data-share>수업 주소 복사</button><p class="share-status" role="status" aria-live="polite"></p><label class="share-fallback" hidden>수업 주소<input type="url" readonly value="${origin}${href(`lessons/${l.id}/`)}"></label></aside></div>
<section class="source-note"><h2>출처·이용 안내</h2><p>${esc(l.source)}</p><p>${esc(l.usage || '이용 범위는 자료 공개 시 안내합니다.')}</p><a href="${href('about/#usage')}">자료 이용 안내</a></section>
<a class="back-link" href="${base}#${p.id}">수업 목록으로</a></div>`
  }));
}

await write('collection/index.html', page({
  title: '전체 자료집', description: data.collection.description, route: 'collection/', current: 'collection',
  body: `<div class="shell reading-page"><h1>전체 자료집</h1>
<div class="book-layout"><div class="book-title"><span>${data.collection.year}</span><h2>${esc(data.collection.title)}</h2><p>개념 기반 탐구학습<br>교과융합</p><strong>수업공방</strong></div>
<div class="book-description"><section class="resources" aria-labelledby="collection-files"><div class="resource-heading"><h2 id="collection-files">자료집 다운로드</h2></div>${resources(data.collection)}</section></div></div>
<section class="contents-list"><h2>목차</h2>${data.parts.map(p => `<div><h3>${p.number} ${esc(p.title)}</h3><ol>${lessons.filter(l => l.part === p.id).map(l => `<li><a href="${href(`lessons/${l.id}/`)}">${esc(l.title)}${arrow}</a></li>`).join('')}</ol></div>`).join('')}</section>
<a class="back-link" href="${base}#lessons">수업 목록으로</a></div>`
}));

await write('about/index.html', page({
  title: '수업공방 소개', description: '개념 기반 탐구학습과 교과융합 수업 자료를 개발하는 교육연구회 수업공방.', route: 'about/', current: 'about',
  body: `<div class="shell reading-page"><h1>수업공방 소개</h1><div class="prose">
<p>수업공방은 여러 교과의 교사가 모인 교단지원 자료개발 교육연구회입니다. 개념 기반 탐구학습과 교과융합 수업 자료를 개발합니다.</p>
<h2 id="usage">자료 이용 안내</h2><p>현재 자료집을 편집 중입니다. 파일은 준비되는 대로 공개합니다.</p>
<p>자료를 사용할 때는 출처와 작성자를 밝혀 주십시오. 수정·재배포 범위는 각 자료의 이용 안내를 확인해 주십시오. 외부 이미지와 영상은 원저작자의 이용 조건을 따릅니다.</p>
<h2>출처</h2><p>1부 소개는 수업공방 지도안 취합 원고, 2부 소개는 「전북교육」 제71호 수업공방 원고를 바탕으로 작성했습니다.</p>
<p class="image-attribution">메인 이미지는 수업공방을 표현하기 위해 AI로 제작했습니다.</p>
</div><a class="back-link" href="${base}#lessons">수업 목록으로</a></div>`
}));

await write('404.html', page({
  title: '페이지를 찾을 수 없습니다', description: '주소를 확인하거나 수업 목록으로 이동해 주세요.', route: '404.html',
  body: `<div class="shell error-page"><p class="error-code">404</p><h1>페이지를 찾을 수 없습니다.</h1><p>주소를 확인하거나 수업 목록으로 이동해 주세요.</p><a class="button" href="${base}#lessons">수업 목록으로 ${arrow}</a></div>`
}));

// Copy selected public assets and published teaching files only.
const selected = new Set([
  'assets/style.css', 'assets/common.js', 'assets/favicon.svg',
  'assets/class-studio-logo.png', 'assets/workshop-hero.webp',
  'assets/fonts/PretendardVariable.woff2', 'assets/fonts/OFL.txt'
]);
for (const item of [...lessons, data.collection]) {
  if (item.status === 'published') for (const f of item.files) selected.add(f.path);
}
for (const asset of selected) {
  const target = path.join(dist, asset);
  await mkdir(path.dirname(target), { recursive: true });
  await copyFile(path.join(publicRoot, asset), target);
}
await write('.nojekyll', '');
const routes = ['', 'collection/', 'about/', ...lessons.map(l => `lessons/${l.id}/`)];
await write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(r => `<url><loc>${origin}${href(r)}</loc></url>`).join('')}</urlset>`);
console.log(`Built ${routes.length} pages + 404; ${lessons.length} lessons; ${[...lessons, data.collection].flatMap(x => x.files).length} teaching files. Base: ${base}`);
