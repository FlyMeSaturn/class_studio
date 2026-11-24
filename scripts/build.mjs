import { mkdir, writeFile, copyFile, rm, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { root, publicRoot, base, origin, esc, href, sizeLabel, loadCatalog, visibleLessons, resourcePaths } from './catalog.mjs';

const data = await loadCatalog();
const lessons = visibleLessons(data);
const assetVersions = Object.fromEntries(await Promise.all(['style.css', 'common.js', 'favicon.svg'].map(async name => [name, createHash('sha256').update(await readFile(path.join(publicRoot, 'assets', name))).digest('hex').slice(0, 10)])));
const versionedAsset = name => `${href(`assets/${name}`)}?v=${assetVersions[name]}`;
const navigationVersion = createHash('sha256').update(await readFile(new URL(import.meta.url))).update(JSON.stringify(data)).update(JSON.stringify(assetVersions)).digest('hex').slice(0, 12);
const dist = path.join(root, 'dist');
// Replace generated output only. The local source-material folder is never copied.
if (dist !== path.join(root, 'dist')) throw new Error('Invalid output directory');
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

const arrow = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>';
const backArrow = '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M20 12H5m6-6-6 6 6 6"/></svg>';
const download = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/></svg>';
const linkIcon = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.1 0l3-3a5 5 0 0 0-7.1-7.1l-1.7 1.7M14 11a5 5 0 0 0-7.1 0l-3 3a5 5 0 0 0 7.1 7.1l1.7-1.7"/></svg>';
const playIcon = '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M8 4.8v14.4L20 12z"/></svg>';
const songGalleryTitle = '학생 개사곡 듣기';
const webAppsTitle = '음량조절웹앱 예시';
const nav = (key, url, label, current) => `<a data-nav="${key}" href="${url}"${key === current ? ' aria-current="page"' : ''}>${label}</a>`;

function page({ title, description, route = '', current = '', body, home = false, backHref = '' }) {
  const libraryUrl = href('library/');
  const aboutUrl = href('about/');
  const html = `<!doctype html>
<html lang="ko"${route === 'library/' ? ' class="library-page"' : ''}><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)} · 수업공방</title><meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#6b4b36"><link rel="canonical" href="${origin}${href(route)}">
<meta property="og:type" content="website"><meta property="og:locale" content="ko_KR">
<meta property="og:title" content="${esc(title)} · 수업공방"><meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${origin}${href(route)}">
<link rel="icon" href="${versionedAsset('favicon.svg')}" type="image/svg+xml">
${home ? `<link rel="preload" as="image" href="${href('assets/workshop-hero.webp')}">` : ''}
${home ? `<link rel="preload" as="font" href="${href('assets/fonts/NotoSerifKR-Slogan600.woff2')}" type="font/woff2" crossorigin>` : ''}
<link rel="stylesheet" href="${versionedAsset('style.css')}">
<script src="${versionedAsset('common.js')}" defer></script>
</head><body${home ? ' class="home"' : ''}>
<a class="skip-link" href="#main">본문으로 바로가기</a>
<header class="site-header${home ? ' home-header' : ''}"><div class="shell header-inner">
<a class="wordmark" href="${base}" aria-label="교단지원 자료개발 교육연구회 수업공방 홈"><span class="brand-caption" aria-hidden="true"><svg viewBox="0 0 949 102" width="949" height="102" focusable="false"><text x="0" y="82" font-size="82" font-weight="500" textLength="949" lengthAdjust="spacing">교단지원 자료개발 교육연구회</text></svg></span><span class="brand-logo"><img src="${href('assets/class-studio-logo.png')}" width="1983" height="793" alt="수업공방" fetchpriority="high"></span></a>
<nav aria-label="주 메뉴">${nav('about', aboutUrl, '소개', current)}${nav('library', libraryUrl, '수업자료', current)}${nav('collection', href('collection/'), '자료집', current)}</nav>
</div></header>
<main id="main" tabindex="-1">${body}</main>
${home ? '' : `<footer class="site-footer"><div class="shell footer-inner"><div><a class="footer-name" href="${base}">수업공방</a><p>2026 교단지원 자료개발 교육연구회</p></div><a href="${href('about/')}">수업공방 소개</a></div></footer>
<a class="floating-back" href="${href(backHref)}" aria-label="뒤로 가기: ${backHref.startsWith('lessons/') ? '수업 페이지로 이동' : backHref.startsWith('library/') ? '수업 목록으로 이동' : '메인 페이지로 이동'}">${backArrow}<span>뒤로 가기</span></a>
<a class="floating-home" href="${base}" aria-label="HOME: 메인 페이지로 이동" data-home><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m3 11 9-8 9 8M5 9v12h5v-7h4v7h5V9"/></svg><span>HOME</span></a>`}
</body></html>`;
  // Version document links as well as assets to avoid mixing cached HTML with a new release.
  // Canonical URLs and downloadable files retain their stable paths.
  return html.replace(/href="([^"]+)"/g, (attribute, url) => {
    const [route, fragment] = url.split('#');
    if (!route.startsWith(base) || !route.endsWith('/')) return attribute;
    return `href="${route}?v=${navigationVersion}${fragment ? `#${fragment}` : ''}"`;
  });
}

function card(l) {
  return `<li class="lesson-item"><a class="lesson-card" data-subject="${esc(l.subjects.length > 1 ? '융합' : l.subjects[0])}" href="${href(`lessons/${l.id}/`)}">
<div class="card-meta lesson-meta"><span class="card-labels"><span class="card-subjects">${l.subjects.map(subject => `<span class="card-subject" data-subject="${esc(subject)}">${esc(subject)}</span>`).join(' ')} </span><span class="card-grade">${esc(l.grades.join(' · '))}</span></span><span class="card-open">${arrow}</span></div>
<h3>${esc(l.title)}</h3><p>${esc(l.summary)}</p>
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
  title: '홈',
  description: '수업공방 일반화자료실. 1부 개념 기반 탐구학습, 2부 교과융합 수업 자료.',
  current: '', home: true,
  body: `<section class="hero" aria-label="수업공방">
<h1 class="sr-only">수업공방</h1>
<img class="hero-image" src="${href('assets/workshop-hero.webp')}" width="1672" height="941" alt="수업공방을 표현한 이미지. 햇빛이 드는 나무 작업대에 종이와 수업 카드, 필기도구가 놓여 있습니다." fetchpriority="high" decoding="async">
<p class="hero-slogan"><span>장인이 정성껏 물건을 만들 듯,</span> <span>선생님들이 모여 정성스럽게</span> <span>수업 자료를 빚어내는 공간</span></p>
</section>`
});

const library = page({
  title: '수업 자료', description: '수업공방의 개념 기반 탐구학습과 교과융합 수업 자료.', route: 'library/', current: 'library',
  body: `<div class="shell library">
<div class="library-heading" id="lessons" tabindex="-1"><h1>수업 자료</h1><nav class="part-index" aria-label="수업 분류">${data.parts.map(p => `<a href="#${p.id}"><span>${p.number}</span>${esc(p.title)}</a>`).join('')}</nav></div>
${data.parts.map(section).join('')}
</div>`
});

async function write(route, html) {
  const target = path.join(dist, route);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, html);
}
await write('index.html', home);
await write('library/index.html', library);

function resources(item) {
  if (item.status !== 'published') return '<p class="resource-pending">자료 준비 중입니다.</p>';
  return `<ul class="file-list">${item.files.map(f => `<li>
<div><strong>${esc(f.label)}</strong><span>${esc(f.format)} · ${sizeLabel(f.bytes)}</span></div>
<div class="file-actions">${f.format === 'PDF' ? `<a class="text-link" href="${href(f.path)}" target="_blank" rel="noopener">PDF 열기<span class="sr-only"> (새 탭)</span></a>` : ''}<a class="button" href="${href(f.path)}" download>${download} 다운로드<span class="sr-only">: ${esc(f.label)}</span></a></div>
</li>`).join('')}</ul>`;
}

function lessonResources(l) {
  if (l.status !== 'published') return resources(l);
  const plan = l.files.find(f => f.format === 'HWPX');
  const pdf = l.planPages?.length ? l.files.find(f => f.format === 'PDF') : null;
  const additionalFiles = l.files.filter(f => f !== plan && f !== pdf);
  const action = (label, url, attributes = '', icon = arrow) => `<li><a class="resource-action" href="${url}"${attributes}><span>${esc(label)}</span>${icon}</a></li>`;
  const externalAction = link => action(link.label, esc(link.url), ' target="_blank" rel="noopener noreferrer" aria-label="' + esc(link.label) + ' (새 탭)"', linkIcon);
  return `<ul class="resource-actions">
${l.planPages?.length ? action('지도안 바로 보기', href(`lessons/${l.id}/plan/`)) : ''}
${plan ? action('지도안 다운받기', href(plan.path), ` download="${esc(`수업공방_${l.title}.hwpx`)}"`, download) : ''}
${l.photos?.length ? action(l.photoSubject ? '활동 사진 보기' : '수업 사진 보기', href(`lessons/${l.id}/photos/`)) : ''}
${(l.links || []).filter(link => link.position === 'before-artifacts').map(externalAction).join('')}
${l.artifacts?.length && l.showArtifactGalleryLink !== false ? action('학생 산출물 보기', href(`lessons/${l.id}/artifacts/`)) : ''}
${l.videos?.length ? action(songGalleryTitle, href(`lessons/${l.id}/songs/`), '', playIcon) : ''}
${additionalFiles.map(f => `${f.format === 'PDF' ? action(`${f.label} 바로 보기`, href(f.path), ' target="_blank" rel="noopener"') : ''}${f.download !== false ? action(`${f.label} 다운받기`, href(f.path), ' download', download) : ''}`).join('')}
${(l.links || []).filter(link => link.position !== 'before-artifacts').map(externalAction).join('')}
${l.webApps?.length ? action(webAppsTitle, href(`lessons/${l.id}/apps/`)) : ''}
</ul>`;
}

for (const l of lessons) {
  const p = data.parts.find(p => p.id === l.part);
  if (l.status === 'published' && l.webApps?.length) {
    const route = `lessons/${l.id}/apps/`;
    await write(`${route}index.html`, page({
      title: webAppsTitle, description: `${l.title} 수업에서 활용하는 소리 조절 웹앱 두 가지`, route, current: 'library', backHref: `lessons/${l.id}/`,
      body: `<div class="shell reading-page"><p>${esc(l.subjects.join(' · '))} · ${esc(l.grades.join(' · '))}</p><h1>${webAppsTitle}</h1><p>사용할 웹앱을 선택해 열어 보세요.</p><ul class="lesson-grid app-grid">${l.webApps.map(app => `<li class="lesson-item"><a class="lesson-card" href="${href(app.path)}" target="_blank" rel="noopener" aria-label="${esc(app.title)} (새 탭)"><div class="card-meta">웹앱 열기<span class="card-open">${linkIcon}</span></div><h2>${esc(app.title)}</h2><p>${esc(app.description)}</p></a></li>`).join('')}</ul></div>`
    }));
  }
  await write(`lessons/${l.id}/index.html`, page({
    title: l.title, description: l.summary, route: `lessons/${l.id}/`, current: 'library', backHref: `library/#${p.id}`,
    body: `<div class="shell detail-shell">
<nav class="breadcrumb" aria-label="현재 위치"><a href="${href('library/')}">수업 자료</a><span aria-hidden="true">/</span><a href="${href('library/')}#${p.id}">${p.number} ${esc(p.title)}</a></nav>
<header class="lesson-heading"><p class="detail-meta"><span>${esc(l.subjects.join(' · '))}</span><span>${esc(l.grades.join(' · '))}</span></p><h1>${esc(l.title)}</h1></header>
<div class="lesson-layout"><article class="lesson-overview"><h2>수업 개요</h2><p>${esc(l.overview)}</p><h2>수업 활동</h2><ol class="activity-list">${l.activities.map(a => `<li>${esc(a)}</li>`).join('')}</ol><p class="lesson-author"><span>작성자</span> ${esc(l.author)}</p></article>
<aside class="lesson-resources" aria-label="수업 자료 바로가기">${lessonResources(l)}</aside></div>
</div>`
  }));
  if (l.status === 'published' && l.planPages?.length) {
    await write(`lessons/${l.id}/plan/index.html`, page({
      title: `${l.title} · 지도안`, description: `${l.title} 수업 지도안 바로 보기`, route: `lessons/${l.id}/plan/`, current: 'library', backHref: `lessons/${l.id}/`,
      body: `<div class="shell viewer-shell"><div class="viewer-heading"><p>${esc(l.subjects.join(' · '))} · ${esc(l.grades.join(' · '))}</p><h1>${esc(l.title)}</h1><div class="viewer-tools"><span>지도안 · ${l.planPages.length}쪽</span><label>쪽 이동 <select data-page-select aria-label="지도안 쪽 이동">${l.planPages.map((_,i) => `<option value="plan-page-${i+1}">${i+1}쪽</option>`).join('')}</select></label><button type="button" class="text-link" data-plan-zoom aria-pressed="false">크게 보기</button><a class="text-link" href="${href(l.files.find(f => f.format === 'PDF').path)}" target="_blank" rel="noopener">PDF 열기<span class="sr-only"> (새 탭)</span></a></div></div>
<div class="plan-document">${l.planPages.map((p,i) => `<figure id="plan-page-${i+1}" class="plan-page"><figcaption>${i+1} / ${l.planPages.length}쪽</figcaption><img src="${href(p.path)}" width="${p.width}" height="${p.height}" alt="${esc(l.title)} 지도안 ${i+1}쪽" ${i ? 'loading="lazy"' : 'fetchpriority="high"'} decoding="async"></figure>`).join('')}</div></div>`
    }));
  }
  if (l.status === 'published' && l.videos?.length) {
    const route = `lessons/${l.id}/songs/`;
    await write(`${route}index.html`, page({
      title: songGalleryTitle, description: `${l.title} 학생 개사곡 영상`, route, current: 'library', backHref: `lessons/${l.id}/`,
      body: `<div class="shell viewer-shell">
<div class="viewer-heading"><p>${esc(l.title)}</p><h1>${songGalleryTitle}</h1></div>
<ul class="song-gallery">${l.videos.map(video => `<li>
<a class="song-card" href="${href(video.path)}" data-video-title="${esc(video.title)}" aria-label="${esc(video.title)} 재생">
<span class="song-thumbnail"><img src="${href(video.poster)}" alt="" decoding="async"><span class="song-play">${playIcon}</span></span>
<span class="song-title">${esc(video.title)}</span>
</a></li>`).join('')}</ul>
<dialog class="song-dialog" aria-labelledby="song-dialog-title">
<div class="song-toolbar"><h2 id="song-dialog-title"></h2><button type="button" data-video-close autofocus>닫기 ×</button></div>
<video controls playsinline preload="none"></video>
</dialog>
</div>`
    }));
  }
  for (const a of l.status === 'published' ? (l.artifacts || []) : []) {
    const route = `lessons/${l.id}/artifacts/${a.id}/`;
    await write(`${route}index.html`, page({
      title: `${l.title} · ${a.label}`, description: a.alt, route, current: 'library', backHref: `lessons/${l.id}/`,
      body: `<div class="shell viewer-shell"><div class="viewer-heading"><p>${esc(l.title)}</p><h1>${esc(a.label)}</h1><div class="viewer-tools"><button type="button" class="text-link" data-plan-zoom aria-pressed="false">크게 보기</button></div></div>
<div class="plan-document"><figure class="plan-page"><img src="${href(a.path)}" width="${a.width}" height="${a.height}" alt="${esc(a.alt)}" fetchpriority="high" decoding="async"></figure></div></div>`
    }));
  }
  for (const gallery of [{key:'photos', label:'수업 사진', noun:'사진'}, {key:'artifacts', label:'학생 산출물', noun:'산출물'}]) {
    const pictures = l[gallery.key];
    if (l.status !== 'published' || !pictures?.length) continue;
    const defaultSubject = gallery.key === 'photos' ? l.photoSubject : undefined;
    const galleryTitle = defaultSubject ? '활동 사진 보기' : gallery.label;
    const cards = pictures.map((photo, index) => {
      const subject = gallery.key === 'photos' ? (photo.subject ?? defaultSubject) : undefined;
      const tag = subject ? `[${esc(subject)}] ` : '';
      const prefix = subject ? `<span class="photo-subject" data-photo-subject="${esc(subject)}">[${esc(subject)}]</span> ` : '';
      const label = photo.label || photo.alt;
      const caption = `<figcaption>${prefix}${esc(label)}</figcaption>`;
      const img = `<img src="${href(photo.path)}" width="${photo.width}" height="${photo.height}" alt="${esc(photo.alt)}" ${index > 2 ? 'loading="lazy"' : ''} decoding="async">`;
      return `<li><a class="photo-link" href="${href(photo.path)}" data-photo-index="${index}" aria-label="${tag}${esc(label)} 크게 보기"><figure>${img}${caption}</figure></a></li>`;
    }).join('');
    const route = `lessons/${l.id}/${gallery.key}/`;
    await write(`${route}index.html`, page({
      title: `${l.title} · ${galleryTitle}`, description: `${l.title} ${defaultSubject ? '활동 사진' : gallery.label} 갤러리`, route, current: 'library', backHref: `lessons/${l.id}/`,
      body: `<div class="shell viewer-shell"><div class="viewer-heading"><p>${esc(defaultSubject ? l.title : `${l.subjects.join(' · ')} · ${l.grades.join(' · ')}`)}</p><h1>${defaultSubject ? galleryTitle : esc(l.title)}</h1><p class="gallery-intro">${defaultSubject ? '' : `${gallery.label} · `}${pictures.length}장<span>${gallery.noun}을 누르면 크게 볼 수 있습니다.</span></p></div>
<ul class="photo-gallery">${cards}</ul>
<dialog class="photo-dialog" aria-label="${defaultSubject ? '활동 사진' : gallery.label} 확대 보기"><div class="photo-toolbar"><span data-photo-counter aria-live="polite"></span><button type="button" data-photo-close>닫기 ×</button></div><div class="photo-stage"><button type="button" data-photo-prev aria-label="이전 ${gallery.noun}">←</button><figure><img data-photo-full alt=""><figcaption data-photo-caption></figcaption></figure><button type="button" data-photo-next aria-label="다음 ${gallery.noun}">→</button></div></dialog>
</div>`
    }));
  }
}

await write('collection/index.html', page({
  title: '전체 자료집', description: data.collection.description, route: 'collection/', current: 'collection',
  body: `<div class="shell reading-page"><h1>전체 자료집</h1>
<div class="book-layout"><div class="book-title"><span>${data.collection.year}</span><h2>${esc(data.collection.title)}</h2><p>개념 기반 탐구학습<br>교과융합</p><strong>수업공방</strong></div>
<div class="book-description"><section class="resources" aria-labelledby="collection-files"><div class="resource-heading"><h2 id="collection-files">자료집 다운로드</h2></div>${resources(data.collection)}</section></div></div>
<section class="contents-list"><h2>목차</h2>${data.parts.map(p => `<div><h3>${p.number} ${esc(p.title)}</h3><ol>${lessons.filter(l => l.part === p.id).map(l => `<li><a href="${href(`lessons/${l.id}/`)}">${esc(l.title)}${arrow}</a></li>`).join('')}</ol></div>`).join('')}</section>
</div>`
}));

await write('about/index.html', page({
  title: '수업공방 소개', description: '개념 기반 탐구학습과 교과융합 수업 자료를 개발하는 교육연구회 수업공방.', route: 'about/', current: 'about',
  body: `<div class="shell reading-page"><h1>수업공방 소개</h1><div class="prose">
<p>수업공방은 여러 교과의 교사가 모인 교단지원 자료개발 교육연구회입니다. 개념 기반 탐구학습과 교과융합 수업 자료를 개발합니다.</p>
</div></div>`
}));

await write('404.html', page({
  title: '페이지를 찾을 수 없습니다', description: '주소를 확인하거나 수업 목록으로 이동해 주세요.', route: '404.html', backHref: 'library/',
  body: `<div class="shell error-page"><p class="error-code">404</p><h1>페이지를 찾을 수 없습니다.</h1><p>주소를 확인하거나 수업 목록으로 이동해 주세요.</p></div>`
}));

// Copy selected public assets and published teaching files only.
const selected = new Set([
  'assets/style.css', 'assets/common.js', 'assets/favicon.svg',
  'assets/class-studio-logo.png', 'assets/workshop-hero.webp',
  'assets/fonts/PretendardVariable.woff2', 'assets/fonts/OFL.txt',
  'assets/fonts/NotoSerifKR-Slogan600.woff2', 'assets/fonts/NotoSerifKR-OFL.txt',
  'assets/fonts/NotoSerifKR-Slogan.woff2' // Keep the previous face available for cached stylesheets.
]);
for (const item of [...lessons, data.collection]) {
  if (item.status === 'published') for (const asset of resourcePaths(item)) selected.add(asset);
}
for (const asset of selected) {
  const target = path.join(dist, asset);
  await mkdir(path.dirname(target), { recursive: true });
  await copyFile(path.join(publicRoot, asset), target);
}
await write('.nojekyll', '');
const routes = ['', 'library/', 'collection/', 'about/', ...lessons.flatMap(l => [`lessons/${l.id}/`, ...(l.status === 'published' && l.planPages?.length ? [`lessons/${l.id}/plan/`] : []), ...(l.status === 'published' && l.photos?.length ? [`lessons/${l.id}/photos/`] : []), ...(l.status === 'published' && l.artifacts?.length ? [`lessons/${l.id}/artifacts/`, ...l.artifacts.map(a => `lessons/${l.id}/artifacts/${a.id}/`)] : []), ...(l.status === 'published' && l.videos?.length ? [`lessons/${l.id}/songs/`] : []), ...(l.status === 'published' && l.webApps?.length ? [`lessons/${l.id}/apps/`] : [])])];
await write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(r => `<url><loc>${origin}${href(r)}</loc></url>`).join('')}</urlset>`);
console.log(`Built ${routes.length} pages + 404; ${lessons.length} lessons; ${[...lessons, data.collection].flatMap(x => x.files).length} teaching files. Base: ${base}`);
