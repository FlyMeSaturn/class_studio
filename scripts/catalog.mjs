import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';

export const root = path.resolve(import.meta.dirname, '..');
export const publicRoot = path.join(root, 'public');
export const base = '/class_studio/';
export const origin = 'https://flymesaturn.github.io';
export const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const href = value => base + value.replace(/^\/+/, '');
export const sizeLabel = bytes => bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(1)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;

export const resourcePaths = item => [
  ...item.files.map(file => file.path),
  ...['photos', 'planPages', 'artifacts'].flatMap(key => (item[key] || []).map(media => media.path)),
  ...(item.videos || []).flatMap(video => [video.path, video.poster]),
  ...(item.webApps || []).map(app => app.path),
];

export async function validateCatalog(data, assetRoot = publicRoot) {
  const errors = [];
  const requireText = (value, label) => { if (typeof value !== 'string' || !value.trim()) errors.push(`${label}: 텍스트가 필요합니다.`); };
  const ids = new Set();
  const allowedStates = ['preparing', 'published', 'draft'];
  const isDate = v => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v)) && new Date(v).toISOString().slice(0,10) === v;
  const parts = Array.isArray(data.parts) ? data.parts : [];
  if (parts.length !== 2 || parts[0]?.id !== 'inquiry' || parts[1]?.id !== 'integration') errors.push('1부 inquiry와 2부 integration을 순서대로 유지해야 합니다.');
  for (const p of parts) for (const k of ['number','title']) requireText(p[k], `part.${k}`);
  if (!isDate(data.updated)) errors.push('catalog.updated: 올바른 날짜가 필요합니다.');
  if (!Array.isArray(data.lessons)) errors.push('lessons: 배열이 필요합니다.');
  async function files(item, label) {
    if (!allowedStates.includes(item.status)) errors.push(`${label}: 잘못된 공개 상태`);
    if (!Array.isArray(item.files)) { errors.push(`${label}.files: 배열이 필요합니다.`); return; }
    if (item.status === 'published' && !item.files.length && !item.links?.length && !item.photos?.length && !item.artifacts?.length && !item.videos?.length) errors.push(`${label}: 공개 상태에는 실제 파일 또는 자료 링크가 필요합니다.`);
    if (item.status !== 'published' && item.files.length) errors.push(`${label}: 파일은 공개 상태에서만 등록할 수 있습니다.`);
    for (const file of item.files) {
      for (const key of ['label','format','path']) requireText(file[key], `${label}.files.${key}`);
      const rel = file.path || '';
      const absolute = path.resolve(assetRoot, rel);
      if (!/^files\/[a-zA-Z0-9_./-]+$/.test(rel) || rel.split('/').includes('..') || !absolute.startsWith(path.resolve(assetRoot) + path.sep)) { errors.push(`${label}: 안전한 files/ 경로가 필요합니다.`); continue; }
      if (path.extname(rel).slice(1).toUpperCase() !== file.format) errors.push(`${label}: 확장자와 형식이 다릅니다.`);
      try {
        const info = await stat(absolute);
        if (!info.isFile() || !info.size) errors.push(`${label}: 빈 파일 또는 일반 파일이 아닙니다.`);
        if (info.size > 50 * 1024 * 1024) errors.push(`${label}: 50 MB 초과 파일은 게시 방식을 먼저 검토하세요.`);
        file.bytes = info.size;
      } catch { errors.push(`${label}: 파일이 없습니다: ${rel}`); }
    }
  }
  async function media(item, label) {
    for (const key of ['photos', 'planPages', 'artifacts']) {
      if (item[key] === undefined) continue;
      if (!Array.isArray(item[key])) { errors.push(`${label}.${key}: 배열이 필요합니다.`); continue; }
      if (item.status !== 'published' && item[key].length) errors.push(`${label}: 이미지는 공개 상태에서만 등록할 수 있습니다.`);
      const pictureIds = new Set();
      for (const picture of item[key]) {
        if (key !== 'planPages') requireText(picture.alt, `${label}.${key}.alt`);
        if (key === 'artifacts') {
          requireText(picture.label, `${label}.artifacts.label`);
          if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(picture.id || '')) errors.push(`${label}: 산출물 ID는 영문 소문자·숫자·하이픈만 사용합니다.`);
          if (pictureIds.has(picture.id)) errors.push(`${label}: 중복 산출물 ID`);
          pictureIds.add(picture.id);
        }
        if (![picture.width, picture.height].every(n => Number.isInteger(n) && n > 0)) errors.push(`${label}: 이미지 크기가 필요합니다.`);
        await files({status:'published', files:[{label:'이미지',format:path.extname(picture.path || '').slice(1).toUpperCase(),path:picture.path}]}, label);
        if (!/\.(webp|png|jpg|jpeg)$/i.test(picture.path || '')) errors.push(`${label}: 지원하지 않는 이미지 형식`);
      }
    }
    if (item.planPages?.length && !item.files.some(f => f.format === 'PDF')) errors.push(`${label}: 지도안 보기에는 PDF 원본이 필요합니다.`);
    if (item.links !== undefined && !Array.isArray(item.links)) errors.push(`${label}.links: 배열이 필요합니다.`);
    for (const link of Array.isArray(item.links) ? item.links : []) {
      requireText(link.label, `${label}.links.label`);
      try { const url = new URL(link.url); if (url.protocol !== 'https:' || url.username || url.password) throw new Error(); }
      catch { errors.push(`${label}: 올바른 HTTPS 자료 링크가 필요합니다.`); }
      if (item.status !== 'published') errors.push(`${label}: 링크는 공개 상태에서만 등록할 수 있습니다.`);
    }
  }
  async function videos(lesson) {
    if (lesson.videos === undefined) return;
    if (!Array.isArray(lesson.videos)) { errors.push(`${lesson.id}.videos: 배열이 필요합니다.`); return; }
    if (!lesson.videos.length) return;
    if (lesson.status !== 'published') errors.push(`${lesson.id}: 영상은 공개 상태에서만 등록할 수 있습니다.`);
    for (const video of lesson.videos) {
      requireText(video.title, `${lesson.id}.videos.title`);
      await files({ status: 'published', files: [
        { label: video.title, format: 'MP4', path: video.path },
        { label: '썸네일', format: 'WEBP', path: video.poster },
      ] }, lesson.id);
    }
  }
  async function webApps(lesson) {
    if (lesson.webApps === undefined) return;
    if (!Array.isArray(lesson.webApps)) { errors.push(`${lesson.id}.webApps: 배열이 필요합니다.`); return; }
    if (lesson.webApps.length && lesson.status !== 'published') errors.push(`${lesson.id}: 웹앱은 공개 상태에서만 등록할 수 있습니다.`);
    for (const app of lesson.webApps) {
      requireText(app.title, `${lesson.id}.webApps.title`);
      requireText(app.description, `${lesson.id}.webApps.description`);
      await files({status:'published', files:[{label:app.title, format:'HTML', path:app.path}]}, lesson.id);
    }
  }
  for (const lesson of data.lessons || []) {
    for (const k of ['id','title','summary','author','source','overview']) requireText(lesson[k], `lesson.${k}`);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(lesson.id || '')) errors.push('lesson.id: 영문 소문자·숫자·하이픈만 사용합니다.');
    if (ids.has(lesson.id)) errors.push(`중복 ID: ${lesson.id}`); ids.add(lesson.id);
    if (!parts.some(p => p.id === lesson.part)) errors.push(`${lesson.id}: 잘못된 part`);
    if (!Number.isInteger(lesson.order) || lesson.order < 1) errors.push(`${lesson.id}: 양의 정수 order가 필요합니다.`);
    for (const k of ['subjects','grades','tags','activities']) {
      if (!Array.isArray(lesson[k]) || (k !== 'tags' && !lesson[k].length) || lesson[k].some(x => typeof x !== 'string' || !x.trim())) errors.push(`${lesson.id}.${k}: 텍스트 배열이 필요합니다.`);
    }
    if (lesson.photoSubject !== undefined && (!lesson.photos?.length || !Array.isArray(lesson.subjects) || !lesson.subjects.includes(lesson.photoSubject))) {
      errors.push(`${lesson.id}.photoSubject: 활동 사진과 수업에 포함된 교과가 필요합니다.`);
    }
    if (!isDate(lesson.updated)) errors.push(`${lesson.id}: 올바른 updated 날짜가 필요합니다.`);
    await files(lesson, lesson.id);
    await media(lesson, lesson.id);
    await videos(lesson);
    await webApps(lesson);
  }
  if (!data.collection) errors.push('collection이 필요합니다.');
  else {
    for (const k of ['title','description']) requireText(data.collection[k], `collection.${k}`);
    if (!Number.isInteger(data.collection.year)) errors.push('collection.year: 연도가 필요합니다.');
    await files(data.collection, 'collection');
  }
  if (errors.length) throw new Error(errors.join('\n'));
  return data;
}

export async function loadCatalog() {
  return validateCatalog(JSON.parse(await readFile(path.join(root, 'content/catalog.json'), 'utf8')));
}

export const visibleLessons = data => data.lessons.filter(l => l.status !== 'draft').sort((a,b) => data.parts.findIndex(p=>p.id===a.part) - data.parts.findIndex(p=>p.id===b.part) || a.order-b.order || a.id.localeCompare(b.id));
