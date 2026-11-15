import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';

export const root = path.resolve(import.meta.dirname, '..');
export const publicRoot = path.join(root, 'public');
export const base = '/class_studio/';
export const origin = 'https://flymesaturn.github.io';
export const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const href = value => base + value.replace(/^\/+/, '');
export const sizeLabel = bytes => bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(1)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;

export async function validateCatalog(data, assetRoot = publicRoot) {
  const errors = [];
  const requireText = (value, label) => { if (typeof value !== 'string' || !value.trim()) errors.push(`${label}: 텍스트가 필요합니다.`); };
  const ids = new Set();
  const allowedStates = ['preparing', 'published', 'draft'];
  const isDate = v => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v)) && new Date(v).toISOString().slice(0,10) === v;
  const parts = Array.isArray(data.parts) ? data.parts : [];
  if (parts.length !== 2 || parts[0]?.id !== 'inquiry' || parts[1]?.id !== 'integration') errors.push('1부 inquiry와 2부 integration을 순서대로 유지해야 합니다.');
  for (const p of parts) for (const k of ['number','title','subtitle','description']) requireText(p[k], `part.${k}`);
  if (!isDate(data.updated)) errors.push('catalog.updated: 올바른 날짜가 필요합니다.');
  if (!Array.isArray(data.lessons)) errors.push('lessons: 배열이 필요합니다.');
  async function files(item, label) {
    if (!allowedStates.includes(item.status)) errors.push(`${label}: 잘못된 공개 상태`);
    if (!Array.isArray(item.files)) { errors.push(`${label}.files: 배열이 필요합니다.`); return; }
    if (item.status === 'published' && !item.files.length) errors.push(`${label}: 공개 상태에는 실제 파일이 필요합니다.`);
    if (item.status !== 'published' && item.files.length) errors.push(`${label}: 파일은 공개 상태에서만 등록할 수 있습니다.`);
    if (item.status === 'published') requireText(item.usage, `${label}.usage`);
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
  for (const lesson of data.lessons || []) {
    for (const k of ['id','title','summary','author','source','overview']) requireText(lesson[k], `lesson.${k}`);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(lesson.id || '')) errors.push('lesson.id: 영문 소문자·숫자·하이픈만 사용합니다.');
    if (ids.has(lesson.id)) errors.push(`중복 ID: ${lesson.id}`); ids.add(lesson.id);
    if (!parts.some(p => p.id === lesson.part)) errors.push(`${lesson.id}: 잘못된 part`);
    if (!Number.isInteger(lesson.order) || lesson.order < 1) errors.push(`${lesson.id}: 양의 정수 order가 필요합니다.`);
    for (const k of ['subjects','grades','tags','activities']) {
      if (!Array.isArray(lesson[k]) || (k !== 'tags' && !lesson[k].length) || lesson[k].some(x => typeof x !== 'string' || !x.trim())) errors.push(`${lesson.id}.${k}: 텍스트 배열이 필요합니다.`);
    }
    if (!isDate(lesson.updated)) errors.push(`${lesson.id}: 올바른 updated 날짜가 필요합니다.`);
    await files(lesson, lesson.id);
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
