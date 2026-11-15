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
test('publication requires files and a confirmed usage notice',async()=>{const d=structuredClone(source);Object.assign(d.lessons[0],{status:'published',files:[],usage:''});await assert.rejects(validateCatalog(d),e=>/실제 파일/.test(e.message)&&/usage/.test(e.message));});
test('file metadata uses actual bytes and prevents absent files, traversal and format mismatch',async()=>{
  const temp=await mkdtemp(path.join(os.tmpdir(),'class-studio-test-'));
  try{await mkdir(path.join(temp,'files'));await writeFile(path.join(temp,'files','fixture.pdf'),'%PDF-1.4\nTEST FIXTURE ONLY\n');
    const d=structuredClone(source);Object.assign(d.lessons[0],{status:'published',usage:'검증용 파일',files:[{label:'검증용',format:'PDF',path:'files/fixture.pdf',bytes:999}]});
    await validateCatalog(d,temp);assert.equal(d.lessons[0].files[0].bytes,27);
    d.lessons[0].files[0].path='files/missing.pdf';await assert.rejects(validateCatalog(d,temp),/파일이 없습니다/);
    d.lessons[0].files[0].path='files/../../secret.pdf';await assert.rejects(validateCatalog(d,temp),/안전한/);
    d.lessons[0].files[0]={label:'검증용',format:'HWPX',path:'files/fixture.pdf'};await assert.rejects(validateCatalog(d,temp),/확장자와 형식/);
  }finally{await rm(temp,{recursive:true,force:true});}
});
