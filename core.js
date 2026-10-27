/* Kit Memory 12 — Recall Arena. Original game created by Cornelius Aurelius. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;if(root)root.KitMemoryCore=api;})(typeof window==='undefined'?null:window,function(){
'use strict';
const TOTAL=30;
const PATTERNS=['stripes','hoops','sash','chevron','split','plain'];
const BADGES=['star','shield','diamond','circle'];
const SOCKS=['single','double','centre','none'];
const SLEEVES=['band','cuff','none'];
const PALETTES=[['#20bcb1','#082e42'],['#ea515e','#2e142f'],['#ecbc57','#493339'],['#b79afc','#29264d'],['#69dd8d','#143c3d'],['#6fc9ff','#113d65'],['#f79c65','#492a35'],['#dce7ed','#26364d']];
const KIT_KEYS=['shirt','trim','shorts','pattern','badge','socks','sleeve'];
function rng(seed){let n=(seed>>>0)||1;return ()=>{n^=n<<13;n^=n>>>17;n^=n<<5;return(n>>>0)/4294967296;};}
function shuffle(source,random){const a=source.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function equalKit(a,b){return KIT_KEYS.every(k=>a[k]===b[k]);}
function kitSignature(k){return KIT_KEYS.map(x=>k[x]).join('|');}
function baseKit(level){const pal=PALETTES[(level-1)%PALETTES.length];return {shirt:pal[0],trim:pal[1],shorts:(level%3===0?'#ecedf2':'#172e45'),pattern:PATTERNS[(level-1)%PATTERNS.length],badge:BADGES[(level*3)%BADGES.length],socks:SOCKS[(level+1)%SOCKS.length],sleeve:SLEEVES[level%SLEEVES.length]};}
function variant(base,index,level){let k={...base};const changes=['pattern','badge','socks','shorts','sleeve','trim','shirt'];let key=changes[(index+level)%changes.length];if(level<=4)key=['pattern','socks','badge'][index%3];if(key==='pattern')k.pattern=PATTERNS[(PATTERNS.indexOf(k.pattern)+index%4+1)%PATTERNS.length];
else if(key==='badge')k.badge=BADGES[(BADGES.indexOf(k.badge)+index%3+1)%BADGES.length];
else if(key==='socks')k.socks=SOCKS[(SOCKS.indexOf(k.socks)+index%3+1)%SOCKS.length];
else if(key==='sleeve')k.sleeve=SLEEVES[(SLEEVES.indexOf(k.sleeve)+1)%SLEEVES.length];
else if(key==='shorts')k.shorts=k.shorts==='#172e45'?'#ecedf2':'#172e45';
else if(key==='trim')k.trim=k.trim==='#e6fcff'?'#14233c':'#e6fcff';
else if(key==='shirt')k.shirt=PALETTES[(level+index+2)%PALETTES.length][0];
// Every distractor must differ in a non-colour feature, even on colour-change rounds.
if(k.pattern===base.pattern&&k.badge===base.badge&&k.socks===base.socks&&k.sleeve===base.sleeve){k.badge=BADGES[(BADGES.indexOf(base.badge)+index%3+1)%BADGES.length];}
return k;}
function choiceCount(level){return Math.min(8,3+Math.floor((level-1)/5));}
function previewMs(level,mode='campaign'){if(mode==='practice')return 0;if(mode==='blitz')return 2600;return Math.max(4400,8500-(level-1)*145);}
function makeRound(level,seed=1,mode='campaign'){
if(!Number.isInteger(level)||level<1)throw Error('Invalid stage');
const stage=((level-1)%TOTAL)+1, rand=rng((stage*2654435761+seed*1973)>>>0),base=baseKit(stage),count=choiceCount(stage);
const used=new Set([kitSignature(base)]),nums=shuffle(Array.from({length:30},(_,i)=>i+2).filter(n=>n!==12),rand);
const decoys=[];
for(let i=0;decoys.length<count-1&&i<100;i++){const k=variant(base,i,stage);const sig=kitSignature(k);if(used.has(sig))continue;used.add(sig);decoys.push({kit:k,number:nums[decoys.length+1],target:false});}
if(decoys.length!==count-1)throw Error('Insufficient distinct decoys');
const choices=shuffle([{kit:{...base},number:nums[0],target:true},...decoys],rand).map((p,i)=>({...p,slot:i+1}));
const target=choices.find(p=>p.target).slot;
return {stage,level,mode,chapter:Math.ceil(stage/5),title:['Training Ground','Focus Zone','Kit Lab','Under Pressure','Matchday Lights','Final Whistle'][Math.ceil(stage/5)-1],previewMs:previewMs(stage,mode),choices,target,reference:{...base},count};
}
function scoreAnswer({correct,mode='campaign',streak=0,usedHint=false,previewLeftMs=0}){if(!correct)return 0;const accuracy=usedHint?60:100;const combo=mode==='practice'?0:Math.min(90,Math.max(0,streak)*15);const speed=mode==='blitz'?20:Math.min(40,Math.max(0,Math.floor(previewLeftMs/300)));return accuracy+combo+speed;}
function describeKit(k){return `${k.pattern} shirt, ${k.badge} badge, ${k.socks} sock marking, ${k.sleeve} sleeve marking, ${k.shorts==='#ecedf2'?'light':'dark'} shorts`;}
function bestStars(score,wrong,hints){if(score<=0)return 0;return wrong===0&&hints===0?3:wrong<=1&&hints<=1?2:1;}
return {TOTAL,PATTERNS,BADGES,SOCKS,SLEEVES,KIT_KEYS,makeRound,choiceCount,previewMs,equalKit,kitSignature,scoreAnswer,describeKit,bestStars};
});
