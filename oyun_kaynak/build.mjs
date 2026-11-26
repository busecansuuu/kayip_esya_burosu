import {build} from 'esbuild';import fs from 'fs';
const r=await build({entryPoints:['src/game.js'],bundle:true,format:'iife',minify:true,write:false,target:'es2020',legalComments:'none'});
let js=r.outputFiles[0].text;
if(js.includes('</script'))js=js.replaceAll('</script','<\\/script');
const html=fs.readFileSync('src/head.html','utf8')+'</head>\n'+fs.readFileSync('src/body.html','utf8')+'<script>\n/* Three.js r160 (MIT) + oyun kodu, tek dosyada paketlendi */\n'+js+'</script>\n</body>\n</html>\n';
fs.mkdirSync('dist',{recursive:true});fs.writeFileSync('dist/index.html',html);console.log('ok',(html.length/1024|0)+'KB');
