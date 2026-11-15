import http from 'node:http';
import path from 'node:path';
import { readFile,stat } from 'node:fs/promises';
import { root,base } from './catalog.mjs';
const dir=path.join(root,'dist');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.woff2':'font/woff2','.pdf':'application/pdf','.txt':'text/plain; charset=utf-8','.hwpx':'application/vnd.hancom.hwpx','.hwp':'application/x-hwp'};
http.createServer(async(req,res)=>{
  let url;
  try{url=new URL(req.url,'http://localhost');}catch{res.writeHead(400).end();return;}
  if(url.pathname==='/'){res.writeHead(302,{Location:base}).end();return;}
  let target;
  try{if(!url.pathname.startsWith(base))throw new Error();target=path.resolve(dir,decodeURIComponent(url.pathname.slice(base.length)));if(target!==dir&&!target.startsWith(dir+path.sep))throw new Error();let info=await stat(target);if(info.isDirectory()){if(!url.pathname.endsWith('/')){res.writeHead(301,{Location:url.pathname+'/'+url.search}).end();return;}target=path.join(target,'index.html');}const file=await readFile(target);res.writeHead(200,{'Content-Type':types[path.extname(target)]||'application/octet-stream','Cache-Control':'no-store'});res.end(file);}catch{res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(await readFile(path.join(dir,'404.html')));}
}).listen(4173,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:4173${base}`));
