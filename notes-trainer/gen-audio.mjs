// Generate caller audio for every scenario with Microsoft neural voices (edge-tts).
// Run: node gen-audio.mjs   (needs `uvx edge-tts`)
import fs from 'fs'; import {execFileSync} from 'child_process'; import vm from 'vm';
const src=fs.readFileSync('scenarios.js','utf8'); const ctx={window:{}}; vm.runInNewContext(src,ctx);
const S=ctx.window.SCENARIOS;
const VOICE={lockout:'en-US-AvaNeural',mfa:'en-US-AndrewNeural',vpn:'en-US-EmmaNeural',printer:'en-US-GuyNeural',
  headset:'en-US-JennyNeural',software:'en-US-BrianNeural',access:'en-US-AriaNeural',outlook:'en-US-ChristopherNeural',
  disk:'en-US-MichelleNeural',phish:'en-US-AvaMultilingualNeural'};
const tts=(voice,text,out)=>{ if(fs.existsSync(out)&&!process.argv.includes('--force'))return;
  execFileSync('uvx',['edge-tts','--voice',voice,'--rate=-5%','--text',text,'--write-media',out],{stdio:'ignore'}); };
const manifest={};
for(const s of S){
  const dir=`audio/${s.id}`; fs.mkdirSync(dir,{recursive:true});
  const v=VOICE[s.id]||'en-US-AvaNeural'; let i=0; manifest[s.id]={voice:v,lines:[]};
  for(const [who,text] of s.lines){ if(who!=='c')continue; const f=`${dir}/c${i}.mp3`; tts(v,text,f); manifest[s.id].lines.push(f); i++; }
  tts(v,s.curve.text,`${dir}/curve.mp3`); manifest[s.id].curve=`${dir}/curve.mp3`;
  console.log(s.id,v,i+1,'clips');
}
tts('en-US-AvaNeural','Hi, this is a sound check. If you can hear me, you are all set.','audio/test.mp3');
