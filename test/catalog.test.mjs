import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp,mkdir,writeFile,rm,readFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { root,validateCatalog,visibleLessons } from '../scripts/catalog.mjs';
const source=JSON.parse(await readFile(path.join(root,'content/catalog.json'),'utf8'));
test('catalog has valid metadata and the required two-part structure',async()=>{
  const d=await validateCatalog(structuredClone(source));assert.deepEqual(d.parts.map(p=>p.id),['inquiry','integration']);assert.ok(d.lessons.length>0);
});
test('duplicate IDs and invalid part/grade fail before deployment',async()=>{
  const d=structuredClone(source);d.lessons[1].id=d.lessons[0].id;d.lessons[0].part='other';d.lessons[0].grades=[];await assert.rejects(validateCatalog(d),e=>/중복 ID/.test(e.message)&&/잘못된 part/.test(e.message)&&/grades/.test(e.message));
});
test('draft lesson is absent from public selection',()=>{const d=structuredClone(source);d.lessons[0].status='draft';assert.ok(!visibleLessons(d).some(l=>l.id===d.lessons[0].id));});
test('publication requires real resources; external-only resources are supported',async()=>{const d=structuredClone(source);Object.assign(d.lessons[0],{status:'published',files:[],photos:[],planPages:[],artifacts:[],links:[]});await assert.rejects(validateCatalog(d),/실제 파일/);d.lessons[0].links=[{label:'수업 보드',url:'https://padlet.com/example'}];await validateCatalog(d);d.lessons[0].links[0].url='javascript:alert(1)';await assert.rejects(validateCatalog(d),/HTTPS/);});
test('file metadata uses actual bytes and prevents absent files, traversal and format mismatch',async()=>{
  const temp=await mkdtemp(path.join(os.tmpdir(),'class-studio-test-'));
  try{await mkdir(path.join(temp,'files'));await writeFile(path.join(temp,'files','fixture.pdf'),'%PDF-1.4\nTEST FIXTURE ONLY\n');
    const d=structuredClone(source);for(const l of d.lessons)Object.assign(l,{status:'preparing',files:[],photos:[],planPages:[],artifacts:[],links:[],videos:[],webApps:[]});Object.assign(d.lessons[0],{status:'published',files:[{label:'검증용',format:'PDF',path:'files/fixture.pdf',bytes:999}]});
    await validateCatalog(d,temp);assert.equal(d.lessons[0].files[0].bytes,27);
    d.lessons[0].files[0].path='files/missing.pdf';await assert.rejects(validateCatalog(d,temp),/파일이 없습니다/);
    d.lessons[0].files[0].path='files/../../secret.pdf';await assert.rejects(validateCatalog(d,temp),/안전한/);
    d.lessons[0].files[0]={label:'검증용',format:'HWPX',path:'files/fixture.pdf'};await assert.rejects(validateCatalog(d,temp),/확장자와 형식/);
  }finally{await rm(temp,{recursive:true,force:true});}
});

test('artifact-only lessons support viewers while rejecting route collisions and missing images',async()=>{
  const d=structuredClone(source);const lesson=d.lessons[0];Object.assign(lesson,{files:[],photos:[],planPages:[],links:[]});
  assert.equal(lesson.artifacts.length,4);await validateCatalog(d);
  lesson.artifacts[1].id=lesson.artifacts[0].id;await assert.rejects(validateCatalog(d),/중복 산출물/);
  lesson.artifacts[1].id='../escape';await assert.rejects(validateCatalog(d),/산출물 ID/);
  lesson.artifacts[1].id='second';lesson.artifacts[1].path='files/force-and-change/missing.webp';await assert.rejects(validateCatalog(d),/파일이 없습니다/);
});
