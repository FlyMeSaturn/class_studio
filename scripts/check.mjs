import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { root, base, loadCatalog, visibleLessons } from './catalog.mjs';
const data=await loadCatalog();
const dist=path.join(root,'dist');
const failures=[];
async function walk(dir){let result=[];for(const entry of await readdir(dir,{withFileTypes:true})){const p=path.join(dir,entry.name);result.push(...entry.isDirectory()?await walk(p):[p]);}return result;}
const all=await walk(dist);let bytes=0;
for(const file of all){bytes+=(await stat(file)).size;if(!file.endsWith('.html'))continue;const html=await readFile(file,'utf8');
  if(!html.includes('lang="ko"')||!html.includes('<h1')||!html.includes('name="description"'))failures.push(`${file}: 언어·제목·설명 누락`);
  if(/data-share|class="hero-browse"/.test(html))failures.push(`${file}: 삭제한 주소 복사 또는 메인 바로가기 버튼이 남아 있습니다.`);
  if(/notion\.com|OneDrive|C:\\Users|010-\d/.test(html))failures.push(`${file}: 비공개 출처 또는 로컬 정보 노출`);
  for(const [,value] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
    if(value.startsWith('#')||/^(https:|mailto:)/.test(value))continue;
    if(!value.startsWith(base)){failures.push(`${file}: 하위 경로 오류 ${value}`);continue;}
    const target=path.join(dist,decodeURIComponent(value.slice(base.length).split(/[?#]/)[0]));
    try{const s=await stat(target);if(s.isDirectory())await stat(path.join(target,'index.html'));}catch{failures.push(`${file}: 없는 내부 링크 ${value}`);}
  }
}
const allowed=new Set([...visibleLessons(data),data.collection].filter(x=>x.status==='published').flatMap(x=>[...x.files,...(x.photos || []),...(x.planPages || [])].map(f=>f.path)));
for(const file of all){const rel=path.relative(dist,file).replaceAll('\\','/');if(rel.startsWith('files/')&&!allowed.has(rel))failures.push(`등록되지 않은 공개 파일: ${rel}`);}
if(bytes>950*1024*1024)failures.push('게시 사이트가 950 MB를 초과합니다.');
if(failures.length){console.error(failures.join('\n'));process.exit(1);}
console.log(`PASS: catalog, ${all.filter(f=>f.endsWith('.html')).length} HTML pages, internal asset/link paths, file allowlist; ${(bytes/1024/1024).toFixed(2)} MB.`);
