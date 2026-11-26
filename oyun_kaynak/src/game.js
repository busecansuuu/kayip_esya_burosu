import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
{
const $=id=>document.getElementById(id);
const R=a=>a[Math.floor(Math.random()*a.length)];
const rnd=(a,b)=>a+Math.random()*(b-a);
const cap=s=>s.charAt(0).toLocaleUpperCase('tr')+s.slice(1);
const V=(x,y,z)=>new THREE.Vector3(x,y,z);
const NATIVE=!!window.AdBridge;
const native=o=>{try{window.AdBridge&&window.AdBridge.postMessage(JSON.stringify(o))}catch(e){}};
const haptic=k=>native({t:'haptic',k});

/* ---------- veriler ---------- */
const CATS={giyim:{n:'Giyim',ph:'giydiğim bir şeyi',d:1},tasinan:{n:'Aksesuar',ph:'hep yanımda taşıdığım bir şeyi',d:1},hatira:{n:'Hatıralar',ph:'benim için çok değerli bir şeyi',d:1},
 oyuncak:{n:'Oyuncaklar',ph:'çocukların oynadığı bir şeyi',d:3},mutfak:{n:'Mutfak',ph:'mutfakta kullandığım bir şeyi',d:5},bahce:{n:'Bahçe',ph:'bahçede kullandığım bir şeyi',d:7}};
const CORDER=['giyim','tasinan','hatira','oyuncak','mutfak','bahce'];
const TYPES={eldiven:{n:'Eldiven',acc:'eldivenimi',cat:'giyim'},atki:{n:'Atkı',acc:'atkımı',cat:'giyim'},sapka:{n:'Bere',acc:'beremi',cat:'giyim'},corap:{n:'Çorap',acc:'çorabımı',cat:'giyim'},
 semsiye:{n:'Şemsiye',acc:'şemsiyemi',cat:'tasinan'},gozluk:{n:'Gözlük',acc:'gözlüğümü',cat:'tasinan'},anahtar:{n:'Anahtar',acc:'anahtarımı',cat:'tasinan'},cuzdan:{n:'Cüzdan',acc:'cüzdanımı',cat:'tasinan'},
 gunluk:{n:'Günlük',acc:'günlüğümü',cat:'hatira'},muzik:{n:'Müzik kutusu',acc:'müzik kutumu',cat:'hatira'},kupa:{n:'Kupa',acc:'kupamı',cat:'hatira'},cerceve:{n:'Fotoğraf çerçevesi',acc:'fotoğraf çerçevemi',cat:'hatira'},
 ayicik:{n:'Oyuncak ayı',acc:'oyuncak ayımı',cat:'oyuncak'},top:{n:'Top',acc:'topumu',cat:'oyuncak'},araba:{n:'Oyuncak araba',acc:'oyuncak arabamı',cat:'oyuncak'},topac:{n:'Topaç',acc:'topacımı',cat:'oyuncak'},
 caydanlik:{n:'Çaydanlık',acc:'çaydanlığımı',cat:'mutfak'},kavanoz:{n:'Kavanoz',acc:'kavanozumu',cat:'mutfak'},termos:{n:'Termos',acc:'termosumu',cat:'mutfak'},
 sulama:{n:'Sulama kabı',acc:'sulama kabımı',cat:'bahce'},saksi:{n:'Saksı',acc:'saksımı',cat:'bahce'},kurek:{n:'Bahçe küreği',acc:'bahçe küreğimi',cat:'bahce'}};
const COL={kirmizi:{n:'kırmızı',was:'kırmızıydı',h:'#e4574b',alt:'kiraz kırmızısı',altw:'kiraz kırmızısıydı'},mavi:{n:'mavi',was:'maviydi',h:'#4d8fd6',alt:'gökyüzü mavisi',altw:'gökyüzü mavisiydi'},
 sari:{n:'sarı',was:'sarıydı',h:'#f2c14e',alt:'limon sarısı',altw:'limon sarısıydı'},yesil:{n:'yeşil',was:'yeşildi',h:'#5fb36b',alt:'çimen yeşili',altw:'çimen yeşiliydi'},
 mor:{n:'mor',was:'mordu',h:'#9a6fd0',alt:'leylak moru',altw:'leylak moruydu'},pembe:{n:'pembe',was:'pembeydi',h:'#f09bb5',alt:'pamuk şeker pembesi',altw:'pamuk şeker pembesiydi'},
 turuncu:{n:'turuncu',was:'turuncuydu',h:'#f08a3c',alt:'mandalina turuncusu',altw:'mandalina turuncusuydu',d:3},lacivert:{n:'lacivert',was:'lacivertti',h:'#2f4a7a',alt:'gece laciverti',altw:'gece lacivertiydi',d:4},
 kahve:{n:'kahverengi',was:'kahverengiydi',h:'#8a5a3a',alt:'tarçın kahvesi',altw:'tarçın kahvesiydi',d:5}};
const SIMILAR={kirmizi:['turuncu','pembe'],turuncu:['kirmizi','sari'],mavi:['lacivert','mor'],lacivert:['mavi','mor'],pembe:['kirmizi','mor'],mor:['pembe','lacivert'],sari:['turuncu','yesil'],yesil:['sari','mavi'],kahve:['turuncu','kirmizi']};
const PAT={yildiz:{n:'yıldızlı',s:'Üzerinde küçük yıldızlar vardı.'},kalp:{n:'kalpli',s:'Üzerinde minik kalpler vardı.'},puan:{n:'puantiyeli',s:'Puantiyeliydi.'},cizgi:{n:'çizgili',s:'Çizgiliydi.'},sade:{n:'desensiz',s:'Hiç deseni yoktu, düz renkti.'},ekose:{n:'ekoseli',s:'Ekose desenliydi, kareli yani.',d:3}};
const PLACE={park:{n:'Park',loc:'parkta',i:'<circle cx="26" cy="20" r="13" fill="#5fa55f"/><rect x="23" y="29" width="6" height="14" fill="#7a5230"/>'},
 istasyon:{n:'İstasyon',loc:'tren istasyonunda',i:'<rect x="12" y="10" width="28" height="28" rx="7" fill="#d9534f"/><rect x="17" y="15" width="18" height="10" rx="2" fill="#cfe9f5"/><circle cx="19" cy="41" r="4" fill="#333"/><circle cx="33" cy="41" r="4" fill="#333"/>'},
 kafe:{n:'Kafe',loc:'kafede',i:'<path d="M14 28H38L34 43H18Z" fill="#c98c55"/><path d="M12 29Q12 13 26 12Q40 13 40 29Z" fill="#f3a6c0"/><circle cx="26" cy="10" r="4" fill="#e2543a"/>'},
 otobus:{n:'Otobüs',loc:'otobüste',i:'<rect x="8" y="12" width="36" height="26" rx="5" fill="#f2c14e"/><rect x="12" y="16" width="12" height="9" fill="#cfe9f5"/><rect x="28" y="16" width="12" height="9" fill="#cfe9f5"/><circle cx="16" cy="40" r="4" fill="#333"/><circle cx="36" cy="40" r="4" fill="#333"/>'},
 kutuphane:{n:'Kütüphane',loc:'kütüphanede',d:4,i:'<rect x="10" y="30" width="32" height="8" rx="2" fill="#4d8fd6"/><rect x="13" y="22" width="28" height="8" rx="2" fill="#e2543a"/><rect x="11" y="14" width="30" height="8" rx="2" fill="#5fb36b"/>'},
 pazar:{n:'Pazar',loc:'pazarda',d:4,i:'<path d="M8 20H44L40 14H12Z" fill="#e2543a"/><path d="M12 20Q14 26 18 20Q22 26 26 20Q30 26 34 20Q38 26 40 20" fill="#fff"/><rect x="12" y="26" width="28" height="16" rx="3" fill="#c98c55"/><circle cx="20" cy="27" r="4" fill="#f2c14e"/><circle cx="30" cy="27" r="4" fill="#5fb36b"/>'}};
const plIcon=k=>`<svg viewBox="0 0 52 52" aria-hidden="true">${PLACE[k].i}</svg>`;
const plChip=k=>`<span class="pl">${plIcon(k)}${PLACE[k].n}</span>`;
const ANI={tavsan:{n:'Pamuk Tavşan',c:'#f4ede6',d:'#d9b8b8',s:'#7fb8d8'},kedi:{n:'Tarçın Kedi',c:'#f0a35e',d:'#cf7c3a',s:'#5fb36b'},ayi:{n:'Bal Ayı',c:'#b07a4f',d:'#8a5c37',s:'#e2543a'},tilki:{n:'Kızıl Tilki',c:'#ea7a3c',d:'#bf5a24',s:'#4d8fd6'},baykus:{n:'Hoca Baykuş',c:'#a08a76',d:'#7a6553',s:'#f2c14e'},fare:{n:'Fındık Fare',c:'#c3bccf',d:'#9890aa',s:'#e2543a'},kurbaga:{n:'Nane Kurbağa',c:'#86c98a',d:'#5a9e60',s:'#f09bb5'},kirpi:{n:'Diken Kirpi',c:'#c9a27a',d:'#6e5238',s:'#9a6fd0'}};
const THANKS={gunluk:'Günlüğümün son sayfasını yarın yazacaktım!',muzik:'Ninnisini dinlemeden uyuyamıyordum.',gozluk:'Artık her şeyi yine net göreceğim!',semsiye:'Yarın yağmur varmış, tam zamanında!',anahtar:'Sonunda evime girebileceğim!',kupa:'Sabah çayım bu kupa olmadan olmuyor.',atki:'Boynum üşüyordu, çok sağ ol!',eldiven:'Tekini bulunca öbürü de çok sevinecek!',
 cuzdan:'İçinde annemin fotoğrafı vardı!',cerceve:'Dedemle son fotoğrafımız bu.',ayicik:'Yavrum bu ayı olmadan uyumuyor!',top:'Maç yarın, top geldi!',araba:'Oğlum çok sevinecek!',topac:'Dedemin yaptığı topaç bu!',caydanlik:'Misafirlerim gelmeden yetişti!',kavanoz:'Büyükannemin reçeli bu!',termos:'Sabah treninde çayımı bununla içiyorum.',sulama:'Çiçeklerim susamıştı!',saksi:'Kaktüsüm, nasılsın?',kurek:'Lalelerimi dikebilirim artık!'};
const HELLO=['Merhaba!','İyi günler!','Pardon, bakar mısınız?','Selam!','Kolay gelsin!'];
const EVENTS={yagmur:{n:'Yağmurlu gün',d:'Eşyalar çamurlu geliyor, lekeler çok.'},tren:{n:'Tren rötarlı',d:'Müşteriler aceleci, sabırları daha kısa.'},pazar:{n:'Pazar kalabalığı',d:'Bugün 2 müşteri fazla gelecek.'},fuar:{n:'Antika fuarı',d:'Bugün antika eşya çok geliyor.'},sakin:{n:'Sakin bir gün',d:'Kasaba bugün sakin, biraz nefes al.'}};
const TOOLS=[{k:'hand',n:'El'},{k:'brush',n:'Fırça'},{k:'cloth',n:'Bez'},{k:'glue',n:'Tutkal'},{k:'driver',n:'Tornavida'},{k:'clamp',n:'Sıkıştırma'},
 {k:'needle',n:'İğne',d:2,w:'kumaş eşyalardaki yırtıkları noktaları sırayla geçerek dik'},{k:'paint',n:'Boya',d:3,w:'solmuş yerleri eşyanın kendi rengiyle rötuşla'},
 {k:'sand',n:'Zımpara',d:4,w:'paslı yerleri ov'},{k:'polish',n:'Cila',d:4,w:'zımparalanan yeri parlat'},{k:'part',n:'Parça',d:5,w:'eksik düğme, süs taşı ya da topuzu yerine tak'}];
const TOOLMSG={hand:'Eşyayı parmağınla sürükleyerek her yöne çevir.',brush:'Fırça kuru tozu süpürür.',cloth:'Bez lekeleri ovarak çıkarır. Biraz emek ister!',glue:'Tutkalı çatlağın üzerinden baştan sona sür.',driver:'Gevşek vidaya bastır ve çevresinde daire çizerek sık.',clamp:'Tutkallanmış çatlağın üstüne bas ve kuruyana kadar basılı tutarak sıkıştır.',
 needle:'Yırtığın parlayan ucundan başla, noktaları sırayla geçerek dik.',paint:'Aşağıdan eşyanın rengini seç, sonra solmuş yeri boya.',sand:'Paslı yeri zımparayla ov.',polish:'Zımparalanmış yeri cilayla ovarak parlat.',part:'Aşağıdan doğru parçayı seç, sonra boş yuvaya dokun.'};
const NEED={brush:'Burada toz var, fırçayı al.',cloth:'Bu leke fırçayla çıkmaz, beze geç.',glue:'Bu çatlak için tutkal lazım.',clamp:'Tutkal sürülmüş, şimdi Sıkıştırma aletiyle bastır.',driver:'Gevşek vida! Tornavidayı al.',needle:'Bu bir yırtık, iğneyle dikmelisin.',paint:'Boyası solmuş, Boya ile rötuşla.',sand:'Paslanmış! Önce zımparayla ov.',polish:'Zımparalandı, şimdi cilayla parlat.',part:'Bir parçası eksik, Parça aletiyle tak.'};
const FAB=['eldiven','atki','sapka','corap','ayicik'],METAL=['anahtar','termos','sulama','kurek','caydanlik','araba','muzik','gozluk'];
const PARTS={dugme:{n:'Düğme',i:'<circle r="36" fill="#f6f0e2" stroke="#c9b48f" stroke-width="6"/><g fill="#2b1d17"><circle cx="-11" cy="-11" r="6"/><circle cx="11" cy="-11" r="6"/><circle cx="-11" cy="11" r="6"/><circle cx="11" cy="11" r="6"/></g>'},
 tas:{n:'Süs taşı',i:'<circle r="38" fill="none" stroke="#d6a640" stroke-width="8"/><path d="M0 -28L24 0L0 28L-24 0Z" fill="#7fd3e6"/><path d="M0 -28L8 0L0 28Z" fill="#c4f0f7"/>'},
 topuz:{n:'Topuz',i:'<rect x="-10" y="4" width="20" height="38" rx="4" fill="#c28a55"/><circle cy="-10" r="30" fill="#b07a4f"/><circle cx="-10" cy="-20" r="8" fill="#d6a378"/>'}};
const partKind=it=>FAB.includes(it.type)?'dugme':['mutfak','bahce'].includes(TYPES[it.type].cat)?'topuz':'tas';
/* kozmetik: ilk seçenek her zaman ücretsiz */
const WALLS={adacayi:{n:'Adaçayı çiçekli',a:'#b7cda9',b:'#adc4a0',f:'#f3ead2',c:'#e3a23c'},pembe:{n:'Pembe çiçekli',a:'#f1cfd2',b:'#eac3c7',f:'#fffaf2',c:'#e2543a'},mavi:{n:'Gök mavisi',a:'#b9d3e6',b:'#aecbe0',f:'#fffaf0',c:'#f2c14e'},
 krem:{n:'Krem lale',a:'#efe2c4',b:'#e6d7b6',f:'#c9533c',c:'#f6d04d'},lavanta:{n:'Lavanta',a:'#cfc3e3',b:'#c4b7da',f:'#fffaf0',c:'#9a6fd0'},
 kis:{n:'Kış masalı',a:'#dbe8f2',b:'#d0e0ec',f:'#ffffff',c:'#7fb8d8',season:[11,0,1]},yildiz:{n:'Yıldızlı gece',a:'#34406b',b:'#2e3961',f:'#f6e7a8',c:'#f2c14e',ex:1}};
const MATS={yesil:{n:'Yeşil kesim matı',a:'#2e6a4c',l:'#4d906d',e:'#5fa37f',bg:'#2a5c44'},lacivert:{n:'Lacivert',a:'#2d4a6e',l:'#4a6d96',e:'#6a8fbb',bg:'#26405e'},bordo:{n:'Bordo',a:'#6e2d36',l:'#934a54',e:'#b56a73',bg:'#5c262e'},
 mor:{n:'Mor',a:'#4e3a6e',l:'#6e5896',e:'#8f7ab8',bg:'#42315e'},kahve:{n:'Kahve',a:'#5a4030',l:'#7a5a44',e:'#9a7a5e',bg:'#4a3428'},
 bahar:{n:'Bahar çimeni',a:'#6e8f4a',l:'#8fb06a',e:'#f09bb5',bg:'#5e7c3e',season:[2,3,4]}};
const BOXES={ceviz:{n:'Ceviz',a:'#6e4426',s:'#57341c',t:'#8e5c37',ts:'#4e2f19'},kirmizi:{n:'Domates kırmızısı',a:'#8e2f22',s:'#6a2118',t:'#b8473a',ts:'#5a1a12'},lacivert:{n:'Lacivert',a:'#2a3f63',s:'#1e2e4a',t:'#3f5a88',ts:'#18243a'},
 yesil:{n:'Orman yeşili',a:'#2f5e45',s:'#224633',t:'#41805f',ts:'#1b3a2a'},pembe:{n:'Gül pembesi',a:'#a8566e',s:'#87425a',t:'#c97790',ts:'#6e3346'},
 balkabagi:{n:'Balkabağı',a:'#c4621f',s:'#9a4a15',t:'#e07f33',ts:'#7a3a10',season:[8,9,10]},deniz:{n:'Deniz mavisi',a:'#1f7a8c',s:'#155a68',t:'#2f9cb0',ts:'#10444f',season:[5,6,7]}};
const COS={wall:{n:'Duvar kâğıdı',o:WALLS,p:60,sw:x=>x.a},mat:{n:'Masa örtüsü',o:MATS,p:45,sw:x=>x.a},box:{n:'Alet kutusu',o:BOXES,p:30,sw:x=>x.t}};
/* seviyeli geliştirmeler (en fazla 3) */
const UPG=[{k:'brush',n:'Fırça',d:'Her seviyede toz %40 daha hızlı çıkar, antika daha zor çizilir'},{k:'cloth',n:'Bez ve cila',d:'Her seviyede leke ve cila %40 daha hızlı'},{k:'clamp',n:'Hızlı kuruyan tutkal',d:'Her seviyede sıkıştırma süresi %20 kısalır'},
 {k:'driver',n:'Elektrikli tornavida',d:'Her seviyede vidalar %20 daha az turda oturur'},{k:'needle',n:'Altın iğne',d:'Dikiş noktaları daha kolay yakalanır',day:2},{k:'paint',n:'Boya fırçası',d:'Her seviyede rötuş %40 daha hızlı',day:3},
 {k:'sand',n:'Zımpara makinesi',d:'Her seviyede pas %40 daha hızlı çıkar',day:4},{k:'tea',n:'Semaver',d:'Her seviyede müşteriler %15 daha sabırlı',p:[60,130,220]}];
const UPP=[40,90,160];
const MONTH=new Date().getMonth(),SEASON=[11,0,1].includes(MONTH)?'kis':[2,3,4].includes(MONTH)?'bahar':[5,6,7].includes(MONTH)?'yaz':'sonbahar';
const QUESTS=[{k:'give',n:g=>`${g} eşyayı sahibine teslim et`,g:d=>Math.min(8,2+Math.ceil(d/2)),v:st=>st.given},{k:'placed',n:g=>`${g} eşyayı rafa yerleştir`,g:d=>Math.min(8,3+Math.floor(d/2)),v:st=>st.placed},
 {k:'screw',n:g=>`${g} vida sık`,g:()=>3,v:st=>st.c.screw},{k:'crack',n:g=>`${g} çatlak yapıştır`,g:()=>2,v:st=>st.c.crack},{k:'combo',n:g=>`${g} kusursuz teslimatlık seri yap`,g:()=>3,v:st=>st.maxCombo},
 {k:'tear',n:g=>`${g} yırtık dik`,g:()=>2,v:st=>st.c.tear,d:2},{k:'antique',n:()=>'Bir antikayı hiç çizmeden teslim et',g:()=>1,v:st=>st.cleanAnt,d:2},{k:'fade',n:g=>`${g} solmuş yeri boya`,g:()=>2,v:st=>st.c.fade,d:3},
 {k:'rust',n:g=>`${g} paslı yeri temizle`,g:()=>1,v:st=>st.c.rust,d:4},{k:'fake',n:g=>`${g} sahtekâr yakala`,g:()=>1,v:st=>st.fakes,d:4},{k:'part',n:g=>`${g} eksik parça tak`,g:()=>1,v:st=>st.c.part,d:5}];
const STREAK=[{n:'10 altın',f:()=>{S.coins+=10}},{n:'2 tutkal',f:()=>{S.glue+=2}},{n:'20 altın',f:()=>{S.coins+=20}},{n:'2 sprey',f:()=>{S.spray+=2}},{n:'30 altın',f:()=>{S.coins+=30}},{n:'3 tutkal ve 2 sprey',f:()=>{S.glue+=3;S.spray+=2}},
 {n:'Yıldızlı gece duvar kâğıdı',f:()=>{if(owns('wall:yildiz'))S.coins+=80;else S.meta.own.push('wall:yildiz')}}];
const FRL=[3,6,10,15],FGIFT=[{n:'20 altın',f:()=>{S.coins+=20}},{n:'3 tutkal',f:()=>{S.glue+=3}},{n:'3 sprey',f:()=>{S.spray+=3}},{n:'60 altın',f:()=>{S.coins+=60}}];
const FRIEND={tavsan:['Burası en sevdiğim dükkân oldu!','Bahçemden sana havuç getirdim, al bakalım.','Eskiden her şeyi kaybederdim. Hâlâ öyleyim ama artık sen varsın!','Sen bu kasabanın kahramanısın!'],
 kedi:['Mırr... yine mi buradayım?','Sana yün yumağı getirdim, canın sıkılırsa oynarsın.','Kuyrukta beklerken uyuyakalmışım, kusura bakma.','En sevdiğim insan sensin, kimseye söyleme.'],
 ayi:['Bal kavanozumu da kaybedersem hemen gelirim!','Al, taze bal. Ellerin yapış yapış olmasın ama.','Kış uykusuna yatmadan son kez uğradım.','Sensiz bu kasaba eksik kalırdı.'],
 tilki:['Bugün dürüst müşteriyim, söz!','Pazardan sana bir şey aldım, bu sefer parasını ödedim!','Sahtekârları nasıl yakaladığını çok merak ediyorum.','Senin gibi zeki birine az rastlanır.'],
 baykus:['Gözlüğümü yine kaybettim sanırım.','Kütüphaneden sana bir kitap ayırdım.','Bilgelik, kaybettiğini bulmaktan geçer derler.','Öğrencim olmanı isterdim ama sen zaten ustasın.'],
 fare:['Ufacık eşyalarımı hep sen buluyorsun!','Sana peynirden bir hediye var.','Kuyrukta beni kimse görmüyor, sen hep görüyorsun.','Büyüyünce senin gibi olmak istiyorum!'],
 kurbaga:['Vırak! Yine geldim!','Gölden sana parlak bir taş getirdim.','Yağmurlu günleri severim ama eşyalar çamurlanıyor.','Senin büron, kasabanın kalbi!'],
 kirpi:['Dikenlerime takılan her şeyi kaybediyorum.','Sana elma getirdim, dikenlerimde taşıdım.','Kimse bana sarılmıyor ama sen hep gülümsüyorsun.','En iyi arkadaşım sensin!']};
const TOWN=[{d:3,n:'Kasabaya bir <b>fırın</b> açıldı, pencereden bak!'},{d:6,n:'Köşeye bir <b>çiçekçi</b> geldi.'},{d:10,n:'<b>Saat kulesi</b> tamamlandı!'},{d:15,n:'Tepeye <b>dönme dolap</b> kuruldu!'},{d:20,n:'Kasabanın üstünde <b>sıcak hava balonu</b> uçuyor!'}];
const GIFTS=[{n:'3 tutkal tüpü',f:()=>{S.glue+=3}},{n:'2 parlatma spreyi',f:()=>{S.spray+=2}},{n:'25 altın',f:()=>{S.coins+=25}}];
function toolShape(k){
 if(k==='needle')return `<g transform="rotate(35)"><path d="M-4 0L4 0L3.5 -168Q0 -182 -3.5 -168Z" fill="url(#metal)"/><ellipse cx="0" cy="-158" rx="2.2" ry="8" fill="#2e2520"/></g><path d="M91 -129Q140 -100 110 -60Q80 -20 125 10" stroke="#e2543a" stroke-width="5" fill="none" stroke-linecap="round"/>`;
 if(k==='paint')return `<g transform="rotate(30)"><rect x="-9" y="-190" width="18" height="118" rx="8" fill="#f2c14e"/><rect x="-13" y="-78" width="26" height="22" rx="3" fill="url(#metal)"/><path d="M-13 -56H13Q11 -14 0 0Q-11 -14 -13 -56Z" fill="${S.paintCol?COL[S.paintCol].h:'#e8cf98'}"/></g>`;
 if(k==='sand')return `<g transform="rotate(-15)"><rect x="-60" y="-56" width="120" height="48" rx="10" fill="#c98c55"/><rect x="-40" y="-70" width="80" height="18" rx="9" fill="#a3683a"/><rect x="-64" y="-12" width="128" height="14" rx="3" fill="#d9c08f"/><path d="M-54 -5h4M-36 -3h4M-18 -6h4M0 -4h4M18 -5h4M36 -3h4M50 -6h4" stroke="#8a6a3a" stroke-width="4"/></g>`;
 if(k==='polish')return `<g transform="rotate(25)"><path d="M-30 -40H30V-150Q30 -165 15 -170H-15Q-30 -165 -30 -150Z" fill="#9a6fd0"/><rect x="-22" y="-130" width="44" height="50" rx="6" fill="#fff"/><path d="M-12 -112L0 -100L12 -112M0 -100V-88" stroke="#9a6fd0" stroke-width="4" fill="none"/><rect x="-10" y="-42" width="20" height="18" fill="#e8e8e8"/><path d="M-8 -24H8L4 0H-4Z" fill="#7fb8d8"/></g>`;
 if(k==='part')return `<g transform="translate(0 -44)">${PARTS.dugme.i}</g>`;
 if(k==='hand')return `<g fill="#f3c9a0" stroke="#8a5a36" stroke-width="5"><rect x="-38" y="-52" width="17" height="60" rx="8"/><rect x="-18" y="-66" width="17" height="72" rx="8"/><rect x="2" y="-62" width="17" height="68" rx="8"/><rect x="22" y="-48" width="16" height="54" rx="8"/><rect x="-66" y="-6" width="34" height="17" rx="8" transform="rotate(-40 -49 2)"/><rect x="-40" y="-12" width="80" height="70" rx="28"/></g>`;
 if(k==='brush')return `<g transform="rotate(30)"><rect x="-14" y="-190" width="28" height="112" rx="12" fill="#b5532f"/><rect x="-24" y="-84" width="48" height="34" rx="4" fill="url(#metal)"/><path d="M-26 -50H26L22 0H-22Z" fill="#e8cf98"/><path d="M-16 -48V-2M-6 -48V0M4 -48V0M14 -48V-2" stroke="#c9a96a" stroke-width="3"/></g>`;
 if(k==='cloth')return `<path d="M-62 -20Q-72 -62 -30 -70Q0 -92 30 -66Q72 -60 62 -20Q72 22 30 30Q0 46 -30 30Q-74 24 -62 -20Z" fill="#7fb8d8"/><path d="M-40 -40Q0 -20 40 -46M-44 0Q0 14 44 -6" stroke="#5d97b8" stroke-width="5" fill="none"/>`;
 if(k==='glue')return `<g transform="rotate(35)"><path d="M-6 0H6L11 -42H-11Z" fill="#fafafa" stroke="#bbb" stroke-width="2"/><rect x="-18" y="-62" width="36" height="22" rx="4" fill="#e2543a"/><path d="M-30 -62H30L36 -170H-36Z" fill="#f6d04d"/><rect x="-24" y="-140" width="48" height="50" rx="4" fill="#fff"/><path d="M-14 -115H14M-14 -104H8" stroke="#e2543a" stroke-width="5"/><rect x="-40" y="-186" width="80" height="18" rx="3" fill="#d9b13a"/></g>`;
 if(k==='driver')return `<g transform="rotate(35)"><path d="M-6 -2H6L5 -110H-5Z" fill="url(#metal)"/><rect x="-21" y="-205" width="42" height="100" rx="16" fill="#e2543a"/><path d="M-10 -190V-120M0 -194V-116M10 -190V-120" stroke="#a3341f" stroke-width="4"/></g>`;
 return `<path d="M-90 -64H40V-42H-68V42H40V64H-90Z" fill="#6b7785"/><rect x="34" y="-134" width="12" height="94" fill="url(#metal)"/><rect x="0" y="-146" width="80" height="16" rx="6" fill="#e2543a"/><rect x="20" y="-42" width="40" height="14" rx="3" fill="#3d4652"/><rect x="20" y="28" width="40" height="14" rx="3" fill="#3d4652"/>`}
const toolVB={hand:[-80,-80,140,150],brush:[-70,-200,200,210],cloth:[-80,-100,160,150],glue:[-80,-200,220,220],driver:[-80,-200,220,220],clamp:[-100,-150,200,220],needle:[-80,-200,220,220],paint:[-70,-200,200,210],sand:[-80,-100,160,120],polish:[-80,-190,200,210],part:[-60,-100,120,120]};
const S={meta:{streak:0,last:'',album:{},fr:{},sets:{},own:[],snd:2,asked:false},hard:false,rep:3,glue:3,lv:{},cos:{wall:'adacayi',mat:'yesil',box:'ceviz'},own:[],paintCol:null,partSel:null,time:480,rate:3,perf:0,combo:0,carry:[],patT:30,day:1,coins:0,spray:2,sh:{},cap:{},box:[],cur:null,cust:[],cc:null,uid:0,st:{given:0,total:0,earned:0,ads:0},mode:'start',view:'scene',tool:'brush',hold:null,drv:null,speed:0,ev:null,paused:false};
for(const k of CORDER){S.sh[k]=[];S.cap[k]=2}
window.S=S;
const owns=id=>S.own.includes(id)||S.meta.own.includes(id);

/* ---------- ses: WebAudio ile üretilir, dosya gerekmez ---------- */
const SND={ctx:null,master:null};let noiseBuf=null;
function actx(){if(!SND.ctx){try{const C=window.AudioContext||window.webkitAudioContext;SND.ctx=new C();SND.master=SND.ctx.createGain();SND.master.gain.value=.55;SND.master.connect(SND.ctx.destination)}catch(e){return null}}
 if(SND.ctx.state==='suspended'&&!S.paused)SND.ctx.resume();return SND.ctx}
function tone(f,d,o={}){const c=SND.ctx;if(!c||S.meta.snd<(o.mus?2:1))return;const t=o.t0??c.currentTime+(o.at||0),os=c.createOscillator(),g=c.createGain();os.type=o.type||'sine';os.frequency.setValueAtTime(f,t);if(o.slide)os.frequency.exponentialRampToValueAtTime(f*o.slide,t+d);
 g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(o.v??.15,t+.012);g.gain.exponentialRampToValueAtTime(.0008,t+d);os.connect(g).connect(SND.master);os.start(t);os.stop(t+d+.05)}
function noise(d,o={}){const c=SND.ctx;if(!c||S.meta.snd<1)return;if(!noiseBuf){noiseBuf=c.createBuffer(1,c.sampleRate,c.sampleRate);const a=noiseBuf.getChannelData(0);for(let i=0;i<a.length;i++)a[i]=Math.random()*2-1}
 const t=c.currentTime+(o.at||0),sr=c.createBufferSource(),fl=c.createBiquadFilter(),g=c.createGain();sr.buffer=noiseBuf;sr.loop=true;fl.type=o.type||'bandpass';fl.frequency.value=o.f||2000;fl.Q.value=o.q||1;g.gain.setValueAtTime(o.v??.1,t);g.gain.exponentialRampToValueAtTime(.0008,t+d);sr.connect(fl).connect(g).connect(SND.master);sr.start(t,Math.random()*.5);sr.stop(t+d+.02)}
const sfx={brush:()=>noise(.13,{v:.07,f:3200,q:.7}),cloth:()=>noise(.16,{v:.06,f:900,q:.8}),sand:()=>noise(.11,{v:.08,f:1700,q:2.5}),squish:()=>tone(320,.1,{v:.08,slide:.6}),
 stitch:()=>tone(1400,.05,{type:'square',v:.04}),click:()=>{tone(1900,.04,{type:'square',v:.07});tone(950,.07,{type:'square',v:.05,at:.03})},pop:()=>tone(520,.13,{v:.14,slide:1.9}),
 tick:()=>tone(820,.03,{type:'triangle',v:.06}),good:()=>[523,659,784,1047].forEach((f,i)=>tone(f,.3,{v:.11,at:i*.08,type:'triangle'})),bad:()=>tone(230,.28,{type:'sawtooth',v:.05,slide:.7}),
 coin:()=>{tone(988,.08,{v:.09,type:'square'});tone(1319,.28,{v:.09,type:'square',at:.07})},bell:()=>{tone(1568,.7,{v:.1});tone(2093,.55,{v:.05,at:.02})},spray:()=>noise(.55,{v:.09,f:5000,q:.5,type:'highpass'})};
let sndLast=0;const rub=k=>{const n=performance.now();if(n-sndLast>110){sndLast=n;sfx[k]()}};
/* arka plan müziği: 8 ölçülük, kendini tekrarlayan müzik kutusu ezgisi */
const MUS=(()=>{let sd=11;const r=()=>(sd=(sd*16807)%2147483647)/2147483647,ch=[[0,4,7],[9,12,16],[5,9,12],[7,11,14]],sc=[0,2,4,7,9,12,14,16],n=[];
 for(let b=0;b<8;b++){const c=ch[b%4];for(let i=0;i<8;i++)n.push(i===0?c[0]+12:i%2&&r()<.4?null:(r()<.5?c[Math.floor(r()*3)]:sc[Math.floor(r()*sc.length)])+12)}return{n,ch}})();
let musT=0,musI=0;
setInterval(()=>{const c=SND.ctx;if(!c||c.state!=='running'||S.meta.snd<2||S.paused){musT=0;return}if(musT<c.currentTime)musT=c.currentTime+.05;
 while(musT<c.currentTime+.45){const i=musI%64,nt=MUS.n[i];if(nt!=null)tone(261.6*2**(nt/12),.55,{v:.028,type:'triangle',t0:musT,mus:1});if(i%8===0)tone(65.4*2**(MUS.ch[Math.floor(i/8)%4][0]/12),1.6,{v:.05,t0:musT,mus:1});if(i%8===4)tone(130.8*2**(MUS.ch[Math.floor(i/8)%4][2]/12),.9,{v:.025,t0:musT,mus:1});musI++;musT+=.3}},100);
document.addEventListener('pointerdown',()=>actx(),{capture:true});
const openCats=()=>CORDER.filter(k=>CATS[k].d<=S.day);
const avail=o=>Object.keys(o).filter(k=>(o[k].d||1)<=S.day);

/* ---------- üç boyut temeli ---------- */
const stage=$('stage'),cv=$('cv');
let renderer;
try{renderer=new THREE.WebGLRenderer({canvas:cv,antialias:true})}catch(e){$('loading').textContent='Bu cihaz 3D grafikleri (WebGL) desteklemiyor.';throw e}
renderer.setPixelRatio(Math.min(2,window.devicePixelRatio||1));
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
const scene=new THREE.Scene();scene.background=new THREE.Color('#2a1f1a');
const cam=new THREE.PerspectiveCamera(46,.7,.1,60);
const bscene=new THREE.Scene();bscene.background=new THREE.Color('#2a5c44');bscene.fog=new THREE.Fog('#2a5c44',4,9);
const bcam=new THREE.PerspectiveCamera(36,.7,.05,30);
const hfov=(c,deg,a)=>{c.fov=THREE.MathUtils.radToDeg(2*Math.atan(Math.tan(THREE.MathUtils.degToRad(deg/2))/a))};
function resize(){const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);const a=w/h;cam.aspect=bcam.aspect=a;
 const t=Math.min(1,Math.max(0,(.714-a)/(.714-.46))),L=(x,y)=>x+(y-x)*t;
 hfov(cam,L(37,25),a);cam.position.set(L(.45,-.85),L(3.7,4.5),L(10.6,11.4));cam.lookAt(L(-.4,-.85),L(2.05,1.6),-1);
 hfov(bcam,L(27,19),a);bcam.position.set(0,2.55,2.95);bcam.lookAt(0,L(.12,-.05),0);cam.updateProjectionMatrix();bcam.updateProjectionMatrix()}
new ResizeObserver(resize).observe(stage);
const mat=(c,o={})=>new THREE.MeshStandardMaterial({color:c,roughness:.8,...o});
function canvasTex(w,h,draw,rep){const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');draw(g,w,h);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;if(rep){t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(rep[0],rep[1])}t.userData={c,g,draw};return t}
function redraw(t,...a){t.userData.g.clearRect(0,0,t.userData.c.width,t.userData.c.height);t.userData.draw(t.userData.g,t.userData.c.width,t.userData.c.height,...a);t.needsUpdate=true}
function shade(h,f){const n=parseInt(h.slice(1),16);return '#'+[n>>16,n>>8&255,n&255].map(v=>Math.min(255,Math.round(v*f)).toString(16).padStart(2,'0')).join('')}
function woodTex(base,rep=[1,1]){return canvasTex(512,512,(g,w,h)=>{g.fillStyle=base;g.fillRect(0,0,w,h);for(let i=0;i<80;i++){const y=Math.random()*h;g.strokeStyle=`rgba(50,25,8,${Math.random()*.2})`;g.lineWidth=1+Math.random()*3;g.beginPath();g.moveTo(0,y);for(let x=0;x<=w;x+=32)g.lineTo(x,y+Math.sin(x/70+i)*7);g.stroke()}},rep)}
function rrect(g,x,y,w,h,r){g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
const FONT='Fredoka, system-ui, sans-serif';
function mesh(geo,m,par,x=0,y=0,z=0,o={}){const me=new THREE.Mesh(geo,m);me.position.set(x,y,z);if(o.r)me.rotation.set(...o.r);if(o.s)me.scale.set(...o.s);me.castShadow=o.cast!==false;me.receiveShadow=true;par.add(me);return me}
const BX=(w,h,d)=>new THREE.BoxGeometry(w,h,d);
const M={wood:mat('#fff',{map:woodTex('#9a6136'),roughness:.65}),woodL:mat('#fff',{map:woodTex('#c28a55'),roughness:.55}),woodD:mat('#fff',{map:woodTex('#6a4024'),roughness:.7}),
 wains:mat('#6f8f6a',{roughness:.85}),green:mat('#2f7d63',{roughness:.5}),brass:mat('#d6a640',{metalness:.85,roughness:.3}),metal:mat('#c9ccd4',{metalness:.9,roughness:.25}),
 cream:mat('#f6f0e2',{roughness:.85}),card:mat('#c99358',{roughness:.9}),cardD:mat('#a8763f',{roughness:.9}),terra:mat('#c9533c',{roughness:.8}),leaf:mat('#5fa55f',{roughness:.7}),ink:mat('#2b1d17',{roughness:.3}),glass:new THREE.MeshStandardMaterial({color:'#dff1f7',transparent:true,opacity:.4,roughness:.05})};

/* ---------- oda ---------- */
const WCL=[],BCL=[];const wallTex=canvasTex(256,256,g=>{const W=WALLS[S.cos.wall]||WALLS.adacayi;g.fillStyle=W.a;g.fillRect(0,0,256,256);g.fillStyle=W.b;g.fillRect(0,0,128,256);const fl=(x,y)=>{g.fillStyle=W.f;for(const[a,b]of[[0,-9],[9,0],[0,9],[-9,0]]){g.beginPath();g.arc(x+a,y+b,8,0,7);g.fill()}g.fillStyle=W.c;g.beginPath();g.arc(x,y,6,0,7);g.fill()};fl(192,64);fl(64,192)},[.7,.7]);
{const sh=new THREE.Shape();sh.moveTo(-7,0);sh.lineTo(7,0);sh.lineTo(7,7);sh.lineTo(-7,7);sh.closePath();const ho=new THREE.Path();ho.moveTo(.2,1.55);ho.lineTo(2.6,1.55);ho.lineTo(2.6,3.65);ho.lineTo(.2,3.65);ho.closePath();sh.holes.push(ho);
 const w=new THREE.Mesh(new THREE.ShapeGeometry(sh),mat('#fff',{map:wallTex,roughness:.95}));w.position.z=-2;w.receiveShadow=true;scene.add(w)}
{const t=wallTex.clone();WCL.push(t);t.needsUpdate=true;t.repeat.set(7,5);mesh(new THREE.PlaneGeometry(10,7),mat('#fff',{map:t,roughness:.95}),scene,-3.5,3.5,3,{r:[0,Math.PI/2,0],cast:false})}
mesh(new THREE.PlaneGeometry(14,14),mat('#fff',{map:woodTex('#7b5133',[3,3]),roughness:.7}),scene,0,0,3,{r:[-Math.PI/2,0,0],cast:false});
mesh(new THREE.PlaneGeometry(14,14),mat('#efe4d0'),scene,0,6,3,{r:[Math.PI/2,0,0],cast:false});
mesh(BX(14,1.3,.06),M.wains,scene,0,.65,-1.97);mesh(BX(14,.08,.1),M.woodL,scene,0,1.33,-1.95);
mesh(BX(.06,1.3,10),M.wains,scene,-3.47,.65,3);mesh(BX(.1,.08,10),M.woodL,scene,-3.45,1.33,3);
mesh(BX(14,.18,.18),M.wood,scene,0,5.9,-1.92);mesh(BX(.18,.18,10),M.wood,scene,-3.42,5.9,3);
const outTex=canvasTex(512,448,(g,w,h,t=0)=>{const rain=S.ev==='yagmur',noon=S.mode==='cust'||S.mode==='end',sk=g.createLinearGradient(0,0,0,h);sk.addColorStop(0,rain?'#9fb0bd':noon?'#f4b98a':'#9fd3ef');sk.addColorStop(1,rain?'#dfe4e7':noon?'#fde3c0':'#fdf0cf');g.fillStyle=sk;g.fillRect(0,0,w,h);
 if(S.day>=20){const bx=(t/40)%(w+120)-60,by=70+Math.sin(t/900)*10;g.fillStyle='#e2543a';g.beginPath();g.arc(bx,by,26,Math.PI,0);g.quadraticCurveTo(bx+26,by+22,bx+6,by+36);g.lineTo(bx-6,by+36);g.quadraticCurveTo(bx-26,by+22,bx-26,by);g.fill();g.fillStyle='#f2c14e';g.fillRect(bx-26,by-4,52,7);g.fillStyle='#8a5a36';g.fillRect(bx-7,by+42,14,11);g.strokeStyle='#6e4426';g.lineWidth=1.5;g.beginPath();g.moveTo(bx-6,by+36);g.lineTo(bx-6,by+42);g.moveTo(bx+6,by+36);g.lineTo(bx+6,by+42);g.stroke()}
 g.fillStyle='#fff1b8';g.beginPath();g.arc(420,80,36,0,7);g.fill();g.fillStyle='rgba(255,255,255,.8)';for(const[x,y]of[[120,90],[150,80],[180,92]]){g.beginPath();g.arc((x+t*.01)%560-30,y,22,0,7);g.fill()}
 if(S.day>=15){g.save();g.translate(390,232);g.strokeStyle='#e9e1d0';g.lineWidth=3;g.beginPath();g.arc(0,0,42,0,7);g.stroke();const a0=t/4000;for(let i=0;i<8;i++){const a=a0+i*Math.PI/4,x=Math.cos(a)*42,y=Math.sin(a)*42;g.beginPath();g.moveTo(0,0);g.lineTo(x,y);g.stroke();g.fillStyle=['#e2543a','#f2c14e','#4d8fd6','#5fb36b'][i%4];g.fillRect(x-5,y,10,9)}g.beginPath();g.moveTo(0,0);g.lineTo(-18,60);g.moveTo(0,0);g.lineTo(18,60);g.stroke();g.restore()}
 if(S.day>=10){g.fillStyle='#d9c9a8';g.fillRect(470,180,24,110);g.fillStyle='#8a5a3a';g.beginPath();g.moveTo(466,182);g.lineTo(482,150);g.lineTo(498,182);g.fill();g.fillStyle='#fffaf0';g.beginPath();g.arc(482,200,8,0,7);g.fill();g.strokeStyle='#2e2520';g.lineWidth=1.5;g.beginPath();g.moveTo(482,200);g.lineTo(482,194);g.moveTo(482,200);g.lineTo(486,202);g.stroke()}
 g.fillStyle=SEASON==='kis'?'#eef3f5':SEASON==='sonbahar'?'#c9b46a':'#8fc48a';g.beginPath();g.moveTo(0,300);g.quadraticCurveTo(140,220,280,280);g.quadraticCurveTo(400,240,512,270);g.lineTo(512,448);g.lineTo(0,448);g.fill();
 g.fillStyle='#f0dcc0';g.fillRect(60,250,220,150);g.fillStyle='#c9533c';g.beginPath();g.moveTo(45,255);g.lineTo(170,185);g.lineTo(295,255);g.fill();
 if(S.day>=3){g.fillStyle='#f6d6a8';g.fillRect(300,300,84,96);g.fillStyle='#8a5a3a';g.fillRect(296,292,92,12);for(let i=0;i<6;i++){g.fillStyle=i%2?'#fffaf0':'#e2543a';g.fillRect(300+i*14,304,14,14)}g.fillStyle='#a7d7ee';g.fillRect(310,330,30,26);g.fillStyle='#6e4426';g.fillRect(350,336,24,60);g.fillStyle='#c98c55';g.beginPath();g.ellipse(325,350,10,5,0,0,7);g.fill()}
 if(S.day>=6){g.fillStyle='#fffaf0';g.fillRect(2,340,50,56);g.fillStyle='#5fb36b';g.beginPath();g.moveTo(0,342);g.lineTo(54,342);g.lineTo(48,326);g.lineTo(6,326);g.fill();for(let i=0;i<5;i++){g.fillStyle=['#f09bb5','#f2c14e','#e2543a','#9a6fd0','#fff'][i];g.beginPath();g.arc(9+i*9,368,5,0,7);g.fill()}g.fillStyle='#5a9e60';g.fillRect(4,372,46,4)}
 g.fillStyle='#fffaf0';g.beginPath();g.arc(170,285,24,0,7);g.fill();g.strokeStyle='#2e2520';g.lineWidth=4;g.beginPath();g.moveTo(170,285);g.lineTo(170,270);g.moveTo(170,285);g.lineTo(181,292);g.stroke();
 g.fillStyle='#6e4426';g.fillRect(90,320,38,80);g.fillStyle='#a7d7ee';g.fillRect(160,325,38,34);g.fillRect(215,325,38,34);
 g.fillStyle='#b9a58c';g.fillRect(0,395,w,12);g.fillStyle='#9b8a74';g.fillRect(0,407,w,41);
 const x=((t/18)%1400)-420;const car=(cx,c)=>{g.fillStyle=c;rrect(g,cx,345,160,58,14);g.fill();g.fillStyle='#d9f0f6';for(let i=0;i<3;i++){rrect(g,cx+16+i*46,357,34,22,5);g.fill()}g.fillStyle='#2e2520';g.beginPath();g.arc(cx+28,405,9,0,7);g.arc(cx+132,405,9,0,7);g.fill()};car(w-x,'#2f7d63');car(w-x+170,'#e2543a');
 g.fillStyle=SEASON==='sonbahar'?'#e08a3c':SEASON==='kis'?'#dfe9ee':'#5fa55f';g.beginPath();g.arc(450,300,38,0,7);g.fill();if(SEASON==='bahar'){g.fillStyle='#f6c3d3';for(let i=0;i<9;i++){g.beginPath();g.arc(450+Math.cos(i*2.4)*24,300+Math.sin(i*2.4)*22,5,0,7);g.fill()}}g.fillStyle='#6e4426';g.fillRect(444,330,12,70);
 if(rain){g.strokeStyle='rgba(255,255,255,.55)';g.lineWidth=1.5;g.beginPath();for(let i=0;i<70;i++){const x=(i*73+t/6)%w,y=(i*131+t/2.2)%h;g.moveTo(x,y);g.lineTo(x-5,y+16)}g.stroke()}
 else if(SEASON==='kis'){g.fillStyle='#fff';for(let i=0;i<45;i++){const y=(i*97+t/28)%h,x=(i*53+Math.sin(t/900+i)*14+w)%w;g.beginPath();g.arc(x,y,2+i%3,0,7);g.fill()}}
 else if(SEASON==='sonbahar'){for(let i=0;i<12;i++){const y=(i*67+t/22)%h,x=(i*91+Math.sin(t/700+i)*30+w)%w;g.fillStyle=i%2?'#e08a3c':'#c9533c';g.save();g.translate(x,y);g.rotate(t/500+i);g.beginPath();g.ellipse(0,0,6,3,0,0,7);g.fill();g.restore()}}
 else if(SEASON==='bahar'){g.fillStyle='#f6c3d3';for(let i=0;i<16;i++){const y=(i*77+t/26)%h,x=(i*61+Math.sin(t/600+i)*24+w)%w;g.beginPath();g.ellipse(x,y,4,2.5,t/400+i,0,7);g.fill()}}
 if(SEASON==='kis'){for(let i=0;i<14;i++){g.fillStyle=['#e2543a','#f2c14e','#5fb36b','#4d8fd6'][i%4];g.globalAlpha=.6+.4*Math.sin(t/300+i);g.beginPath();g.arc(18+i*36,14+Math.sin(i*1.3)*6,6,0,7);g.fill()}g.globalAlpha=1}});
mesh(new THREE.PlaneGeometry(3.4,2.98),new THREE.MeshBasicMaterial({map:outTex}),scene,1.4,2.55,-2.9,{cast:false});
{const wt=wallTex.clone();WCL.push(wt);const wm=mat('#fff',{map:wt,roughness:.95}),F=M.woodL;mesh(BX(2.4,.02,.9),wm,scene,1.4,3.65,-2.45,{cast:false});mesh(BX(2.4,.02,.9),wm,scene,1.4,1.55,-2.45,{cast:false});mesh(BX(.02,2.1,.9),wm,scene,.2,2.6,-2.45,{cast:false});mesh(BX(.02,2.1,.9),wm,scene,2.6,2.6,-2.45,{cast:false});
 mesh(BX(2.72,.16,.16),F,scene,1.4,3.73,-1.94);mesh(BX(.16,2.3,.16),F,scene,.12,2.6,-1.94);mesh(BX(.16,2.3,.16),F,scene,2.68,2.6,-1.94);mesh(BX(3.0,.1,.42),F,scene,1.4,1.5,-1.82);
 mesh(BX(.07,2.1,.07),F,scene,1.4,2.6,-2.02);mesh(BX(2.4,.07,.07),F,scene,1.4,2.72,-2.02);
 mesh(new THREE.CylinderGeometry(.14,.11,.24,16),M.terra,scene,2.35,1.67,-1.8);for(const[a,b]of[[0,.1],[.1,.04],[-.1,.06],[.04,-.08]])mesh(new THREE.SphereGeometry(.12,12,10),M.leaf,scene,2.35+a,1.88+Math.random()*.08,-1.8+b)}
const signTex=canvasTex(256,96,(g,w,h,open)=>{g.fillStyle=open?'#2f7d63':'#7a3b2a';rrect(g,4,4,w-8,h-8,16);g.fill();g.fillStyle='#fff8ea';g.font=`700 52px ${FONT}`;g.textAlign='center';g.textBaseline='middle';g.fillText(open?'AÇIK':'KAPALI',w/2,h/2+3)});
mesh(new THREE.PlaneGeometry(.9,.34),mat('#fff',{map:signTex,roughness:.6}),scene,1.4,3.22,-1.86);
for(const x of[1.05,1.75])mesh(new THREE.CylinderGeometry(.008,.008,.35,6),M.ink,scene,x,3.5,-1.88,{r:[0,0,x<1.4?.5:-.5]});
mesh(new THREE.CylinderGeometry(.012,.012,1.5,6),M.ink,scene,1.1,5.25,.3);
{const pts=[];for(let i=0;i<=10;i++){const a=i/10*Math.PI/2;pts.push(new THREE.Vector2(Math.sin(a)*.5+.02,Math.cos(a)*.32))}const sm=M.green.clone();sm.side=THREE.DoubleSide;mesh(new THREE.LatheGeometry(pts,32),sm,scene,1.1,4.2,.3);
 mesh(new THREE.SphereGeometry(.1,16,12),new THREE.MeshBasicMaterial({color:'#fff3c4'}),scene,1.1,4.2,.3,{cast:false})}
mesh(BX(2.4,.5,.08),M.wood,scene,-1.65,4.62,-1.92);
const titleTex=canvasTex(1024,214,(g,w,h)=>{g.strokeStyle='#e8c27a';g.lineWidth=8;rrect(g,14,14,w-28,h-28,26);g.stroke();g.fillStyle='#fff3dc';g.font=`700 100px ${FONT}`;g.textAlign='center';g.textBaseline='middle';g.fillText('Kayıp Eşya Bürosu',w/2,h/2+6)});
mesh(new THREE.PlaneGeometry(2.34,.48),new THREE.MeshStandardMaterial({map:titleTex,transparent:true,roughness:.6}),scene,-1.65,4.62,-1.875,{cast:false});
for(const x of[-2.6,-.7])mesh(new THREE.CylinderGeometry(.01,.01,1.1,6),M.ink,scene,x,5.4,-1.93);

/* ---------- dolap: 3 sıra x 2 sütun ---------- */
const COMP={};
CORDER.forEach((k,i)=>{const row=Math.floor(i/2),col=i%2;COMP[k]={x0:col?-1.62:-3.05,x1:col?-.25:-1.68,yb:[2.91,1.91,.91][row],yt:[3.85,2.85,1.85][row]}});
mesh(BX(3.0,3.1,.05),M.woodD,scene,-1.65,2.4,-1.96);
for(const x of[-3.15,-.15])mesh(BX(.1,3.2,.66),M.wood,scene,x,2.45,-1.66);
mesh(BX(.06,3.0,.6),M.wood,scene,-1.65,2.38,-1.66);
mesh(BX(3.2,.14,.78),M.wood,scene,-1.65,3.98,-1.62);mesh(BX(3.1,.88,.68),M.wood,scene,-1.65,.44,-1.66);
for(const x of[-2.4,-.9]){mesh(BX(1.3,.55,.03),M.woodL,scene,x,.47,-1.31);mesh(new THREE.SphereGeometry(.04,10,8),M.brass,scene,x,.47,-1.28)}
for(const y of[1.88,2.88])mesh(BX(2.96,.06,.6),M.woodL,scene,-1.65,y,-1.66);
mesh(BX(2.96,.04,.6),M.woodL,scene,-1.65,.9,-1.66);
mesh(new THREE.CylinderGeometry(.14,.11,.22,16),M.terra,scene,-.5,4.16,-1.65);for(const[a,b,c]of[[0,.25,0],[-.12,.18,.05],[.12,.2,-.04],[.05,.32,.06]])mesh(new THREE.SphereGeometry(.12,12,10),M.leaf,scene,-.5+a,4.05+b,-1.65+c);
for(const[i,c]of['#e2543a','#4d8fd6','#f2c14e'].entries())mesh(BX(.55,.1,.36),mat(c,{roughness:.7}),scene,-2.8+i*.02,4.1+i*.1,-1.65,{r:[0,i*.2-.2,0]});
const shelfRoot=new THREE.Group();scene.add(shelfRoot);
const SH={};
for(const k of CORDER){const C=COMP[k],w=C.x1-C.x0,h=C.yt-C.yb,cx=(C.x0+C.x1)/2,grp=new THREE.Group();shelfRoot.add(grp);
 const lt=document.createElement('div');lt.className='clabel';stage.appendChild(lt);lt.userData=V(cx,C.yt-.16,-1.9);
 const hit=mesh(BX(w,h-.02,.6),new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}),grp,cx,C.yb+h/2,-1.66,{cast:false});hit.userData.pick={cat:k};
 const hl=new THREE.Group();hl.visible=false;grp.add(hl);const hg=BX(w-.02,h-.04,.58);mesh(hg,new THREE.MeshBasicMaterial({color:'#ffe07a',transparent:true,opacity:.12,depthWrite:false}),hl,cx,C.yb+h/2,-1.66,{cast:false});
 const ln=new THREE.LineSegments(new THREE.EdgesGeometry(hg),new THREE.LineBasicMaterial({color:'#ffe07a'}));ln.position.set(cx,C.yb+h/2,-1.66);hl.add(ln);
 const lock=mesh(BX(w-.01,h-.03,.02),new THREE.MeshBasicMaterial({color:'#1e140e',transparent:true,opacity:.55}),grp,cx,C.yb+h/2,-1.36,{cast:false});
 const items=new THREE.Group();grp.add(items);SH[k]={lt,hl,items,hit,lock}}

/* ---------- tezgâh ---------- */
mesh(BX(6.8,.12,1.08),M.woodL,scene,0,1.06,1.75);mesh(BX(6.6,1.0,.95),M.wood,scene,0,.5,1.78);
for(const x of[-2.5,-.85,.85,2.5])mesh(BX(1.4,.62,.03),M.woodD,scene,x,.52,2.27);
const TOP=1.12;
{const b=new THREE.Group();b.position.set(-1.35,TOP,1.6);scene.add(b);mesh(new THREE.CylinderGeometry(.2,.22,.05,24),mat('#4b3220'),b,0,.025,0);
 const pts=[];for(let i=0;i<=12;i++){const a=i/12*Math.PI/2;pts.push(new THREE.Vector2(Math.cos(a)*.16+.001,Math.sin(a)*.17))}mesh(new THREE.LatheGeometry(pts,32),M.brass,b,0,.05,0);mesh(new THREE.SphereGeometry(.035,12,10),M.brass,b,0,.24,0)}
{const l=new THREE.Group();l.position.set(2.5,TOP,1.62);l.rotation.y=-.25;scene.add(l);mesh(BX(.72,.05,.52),M.green,l,0,.025,0);mesh(BX(.68,.035,.48),M.cream,l,0,.06,0);mesh(BX(.012,.04,.48),mat('#c9b48f'),l,0,.07,0);mesh(new THREE.CylinderGeometry(.018,.018,.6,8),mat('#f2c14e'),l,.05,.1,.32,{r:[0,0,Math.PI/2]})}
const boxG=new THREE.Group();boxG.position.set(-2.5,TOP,1.7);boxG.rotation.y=.15;scene.add(boxG);
{mesh(BX(.82,.02,.6),M.cardD,boxG,0,.01,0);mesh(BX(.82,.5,.02),M.card,boxG,0,.25,.3);mesh(BX(.82,.5,.02),M.cardD,boxG,0,.25,-.3);mesh(BX(.02,.5,.6),M.cardD,boxG,-.41,.25,0);mesh(BX(.02,.5,.6),M.cardD,boxG,.41,.25,0);
 const fl=(x,z,ry,rx)=>{const p=new THREE.Group();p.position.set(x,.5,z);p.rotation.set(rx,ry,0);boxG.add(p);mesh(BX(ry?.6:.82,.015,.28),M.card,p,0,0,.14)};fl(0,.3,0,.9);fl(0,-.3,Math.PI,.6);fl(-.41,0,-Math.PI/2,.7);fl(.41,0,Math.PI/2,1.1);
 mesh(BX(.12,.5,.005),mat('#e3c48f'),boxG,0,.25,.312,{cast:false})}
const boxTex=canvasTex(160,120,(g,w,h,n)=>{g.fillStyle='#5a3a1d';g.font=`700 92px ${FONT}`;g.textAlign='center';g.textBaseline='middle';g.fillText(String(n??''),w/2,h/2+6)});
mesh(new THREE.PlaneGeometry(.26,.2),new THREE.MeshStandardMaterial({map:boxTex,transparent:true}),boxG,.22,.27,.313,{cast:false});
const peek=new THREE.Group();peek.position.y=.32;boxG.add(peek);
const gridTex=canvasTex(256,256,(g,w,h)=>{const G=MATS[S.cos.mat]||MATS.yesil;g.fillStyle=G.a;g.fillRect(0,0,w,h);g.strokeStyle=G.l;g.lineWidth=2;for(let i=0;i<=w;i+=32){g.beginPath();g.moveTo(i,0);g.lineTo(i,h);g.moveTo(0,i);g.lineTo(w,i);g.stroke()}g.lineWidth=4;g.strokeStyle=G.e;g.strokeRect(0,0,w,h)},[1,1]);
const matG=new THREE.Group();matG.position.set(-.05,TOP,1.75);scene.add(matG);
const matMesh=mesh(BX(1.45,.012,.82),mat('#fff',{map:gridTex,roughness:.6}),matG,0,.006,0,{cast:false});matMesh.userData.pick={act:'inspect'};
const matHold=new THREE.Group();matHold.position.y=.014;matHold.userData.pick={act:'inspect'};matG.add(matHold);
const ringM=new THREE.MeshBasicMaterial({color:'#ffe07a',transparent:true,opacity:.8});const ring3=mesh(new THREE.TorusGeometry(.46,.014,8,64),ringM,matG,0,.03,0,{r:[-Math.PI/2,0,0],cast:false});
const spkG=new THREE.Group();matG.add(spkG);for(let i=0;i<5;i++){const s=mesh(new THREE.OctahedronGeometry(.045),new THREE.MeshBasicMaterial({color:'#ffe27a'}),spkG,0,0,0,{cast:false});s.userData.a=i/5*Math.PI*2}
const custHold=new THREE.Group();custHold.position.set(1.05,0,.15);scene.add(custHold);

/* ---------- ışıklar ---------- */
scene.add(new THREE.HemisphereLight('#fff4e0','#5a4030',1.15));
const sun=new THREE.DirectionalLight('#fff0d8',2.3);sun.position.set(4,7.5,7);sun.target.position.set(-.6,1.8,-1.2);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-5,right:5,top:5,bottom:-3,near:1,far:25});sun.shadow.bias=-.0004;sun.shadow.normalBias=.02;scene.add(sun,sun.target);
const lampL=new THREE.PointLight('#ffd9a0',9,9,1.6);lampL.position.set(1.1,4.05,.35);scene.add(lampL);
const fillL=new THREE.PointLight('#ffe8c8',5,7,1.5);fillL.position.set(-1.6,2.4,1.2);scene.add(fillL);
const winL=new THREE.PointLight('#cfe8ff',4,6,1.5);winL.position.set(1.4,2.6,-1.4);scene.add(winL);
{const t=gridTex.clone();BCL.push(t);t.needsUpdate=true;t.repeat.set(30,30);mesh(new THREE.PlaneGeometry(30,30),mat('#fff',{map:t,roughness:.6}),bscene,0,0,0,{r:[-Math.PI/2,0,0],cast:false})}
bscene.add(new THREE.HemisphereLight('#fff8ec','#2f5a45',1.3));
const bsun=new THREE.DirectionalLight('#fff3e0',2.4);bsun.position.set(1.6,4,2.6);bsun.castShadow=true;bsun.shadow.mapSize.set(1024,1024);Object.assign(bsun.shadow.camera,{left:-1.5,right:1.5,top:1.5,bottom:-1.5,near:.5,far:10});bsun.shadow.normalBias=.02;bscene.add(bsun);
const brim=new THREE.PointLight('#ffe0b0',3,6,1.5);brim.position.set(-1.6,1.6,1.2);bscene.add(brim);
const pivot=new THREE.Group();pivot.position.y=.62;bscene.add(pivot);

/* ---------- desen dokuları ---------- */
function star(g,x,y,R,r){g.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,q=i%2?r:R;g.lineTo(x+Math.cos(a)*q,y+Math.sin(a)*q)}g.closePath();g.fill()}
function heart(g,x,y,s){g.beginPath();g.moveTo(x,y+s);g.bezierCurveTo(x-s*1.6,y-s*.2,x-s*.8,y-s*1.4,x,y-s*.45);g.bezierCurveTo(x+s*.8,y-s*1.4,x+s*1.6,y-s*.2,x,y+s);g.fill()}
const patCache={};
function patTex(c,p,fab){const k=c+p+fab;if(patCache[k])return patCache[k];
 return patCache[k]=canvasTex(256,256,(g,w,h)=>{g.fillStyle=c;g.fillRect(0,0,w,h);if(fab){g.strokeStyle='rgba(0,0,0,.08)';g.lineWidth=2;for(let i=0;i<w;i+=7){g.beginPath();g.moveTo(i,0);g.lineTo(i,h);g.stroke()}}
  g.fillStyle='#fffaf0';
  if(p==='yildiz')for(const[x,y]of[[64,70],[192,190]])star(g,x,y,30,13);
  if(p==='kalp')for(const[x,y]of[[64,70],[192,190]])heart(g,x,y,24);
  if(p==='puan')for(let x=32;x<w;x+=64)for(let y=32;y<h;y+=64){g.beginPath();g.arc(x+(y%128?32:0),y,12,0,7);g.fill()}
  if(p==='cizgi')for(let y=16;y<h;y+=64)g.fillRect(0,y,w,22);
  if(p==='ekose'){g.fillStyle='rgba(255,250,240,.45)';for(let i=20;i<w;i+=64){g.fillRect(i,0,20,h);g.fillRect(0,i,w,20)}g.fillStyle='rgba(30,20,10,.25)';for(let i=50;i<w;i+=64){g.fillRect(i,0,6,h);g.fillRect(0,i,w,6)}}},[2,2])}
const dustTex=canvasTex(128,128,g=>{const gr=g.createRadialGradient(64,64,6,64,64,62);gr.addColorStop(0,'rgba(135,108,80,.95)');gr.addColorStop(.6,'rgba(150,124,95,.75)');gr.addColorStop(1,'rgba(150,124,95,0)');g.fillStyle=gr;g.fillRect(0,0,128,128);
 for(let i=0;i<300;i++){const a=Math.random()*6.28,r=Math.random()*56;g.fillStyle=Math.random()<.5?`rgba(90,68,48,${Math.random()*.7})`:`rgba(210,195,170,${Math.random()*.7})`;g.fillRect(64+Math.cos(a)*r,64+Math.sin(a)*r,2.5,2.5)}});
function blobTex(col){return canvasTex(128,128,g=>{g.filter='blur(5px)';g.fillStyle=col;for(let i=0;i<7;i++){g.beginPath();g.arc(64+rnd(-22,22),64+rnd(-22,22),rnd(16,28),0,7);g.fill()}g.filter='none'})}
const stainTexs=[blobTex('rgba(70,40,20,.75)'),blobTex('rgba(60,45,90,.7)')],mudTex=blobTex('rgba(85,62,35,.85)'),glueTex=blobTex('rgba(225,170,50,.9)');
const fadeTex=canvasTex(128,128,g=>{g.filter='blur(4px)';g.fillStyle='rgba(246,241,230,.92)';for(let i=0;i<8;i++){g.beginPath();g.arc(64+rnd(-24,24),64+rnd(-24,24),rnd(14,26),0,7);g.fill()}g.filter='none';g.strokeStyle='rgba(150,130,110,.55)';g.lineWidth=2;for(let i=0;i<6;i++){const x=rnd(36,92),y=rnd(36,92);g.beginPath();g.moveTo(x,y);g.lineTo(x+rnd(-14,14),y+rnd(-14,14));g.stroke()}});
const rustTex=canvasTex(128,128,g=>{g.filter='blur(3px)';g.fillStyle='rgba(160,78,36,.92)';for(let i=0;i<8;i++){g.beginPath();g.arc(64+rnd(-24,24),64+rnd(-24,24),rnd(12,24),0,7);g.fill()}g.filter='none';for(let i=0;i<260;i++){const a=Math.random()*6.28,r=Math.random()*46;g.fillStyle=Math.random()<.5?`rgba(110,48,18,${Math.random()*.8})`:`rgba(214,128,60,${Math.random()*.8})`;g.fillRect(64+Math.cos(a)*r,64+Math.sin(a)*r,3,3)}});
const dullTex=canvasTex(128,128,g=>{g.filter='blur(4px)';g.fillStyle='rgba(196,194,188,.9)';for(let i=0;i<7;i++){g.beginPath();g.arc(64+rnd(-22,22),64+rnd(-22,22),rnd(14,24),0,7);g.fill()}g.filter='none';g.strokeStyle='rgba(255,255,255,.5)';g.lineWidth=1;for(let i=0;i<24;i++){const y=rnd(36,92),x=rnd(30,60);g.beginPath();g.moveTo(x,y);g.lineTo(x+rnd(20,40),y+rnd(-3,3));g.stroke()}});
const holeTex=canvasTex(128,128,g=>{g.fillStyle='rgba(38,26,18,.92)';g.beginPath();g.arc(64,64,40,0,7);g.fill();g.strokeStyle='rgba(255,240,210,.55)';g.lineWidth=5;g.setLineDash([10,8]);g.beginPath();g.arc(64,64,52,0,7);g.stroke()});
const tagTexCache={};
function tagTex(place,anti){const k=place+anti;if(tagTexCache[k])return tagTexCache[k];const t=canvasTex(128,128,g=>{g.fillStyle='#f7efd9';rrect(g,6,6,116,116,14);g.fill();g.lineWidth=anti?10:4;g.strokeStyle=anti?'#d6a640':'#c9b48f';g.stroke()});
 const img=new Image();img.onload=()=>{t.userData.g.drawImage(img,14,14,100,100);t.needsUpdate=true};img.src='data:image/svg+xml,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">${PLACE[place].i}</svg>`);return tagTexCache[k]=t}

/* ---------- eşya modelleri ---------- */
const ray=new THREE.Raycaster();
function buildModel(it){const c=COL[it.color].h,fab=['eldiven','atki','sapka','corap','ayicik'].includes(it.type);
 const rough={kupa:.22,anahtar:.35,muzik:.4,gozluk:.3,semsiye:.55,gunluk:.6,cuzdan:.55,cerceve:.5,top:.45,araba:.35,topac:.35,caydanlik:.25,kavanoz:.1,termos:.3,sulama:.35,saksi:.85,kurek:.4}[it.type]??.95;
 const metal={anahtar:.45,termos:.5,sulama:.4,kurek:.3}[it.type]||0;
 const main=new THREE.MeshStandardMaterial({map:patTex(c,it.pattern,fab),roughness:rough,metalness:metal});
 const dark=mat(shade(c,.7),{roughness:rough}),light=mat(shade(c,1.2),{roughness:rough}),brown=mat('#6b5444',{roughness:.6}),wood=mat('#b07a4f',{roughness:.6});
 const g=new THREE.Group(),parts=[],sc=[];const A=(geo,m,x,y,z,o)=>{const me=mesh(geo,m,g,x,y,z,o);parts.push(me);return me};
 const P=Math.PI;
 switch(it.type){
 case'eldiven':A(new THREE.CapsuleGeometry(.3,.42,8,20),main,0,.66,0,{s:[1,1,.5]});A(new THREE.CapsuleGeometry(.11,.2,6,12),main,-.32,.56,0,{r:[0,0,.7],s:[1,1,.6]});A(new THREE.CylinderGeometry(.31,.31,.26,28),dark,0,.15,0,{s:[1,1,.55]});break;
 case'atki':A(new RoundedBoxGeometry(1.2,.1,.34,3,.045),main,0,.05,0);A(new RoundedBoxGeometry(1.0,.1,.34,3,.045),main,.12,.15,.05,{r:[0,.45,0]});for(let i=0;i<6;i++)A(new THREE.CylinderGeometry(.016,.016,.14,6),dark,.67,.05,-.14+i*.056,{r:[0,0,P/2]});break;
 case'sapka':A(new THREE.SphereGeometry(.42,32,16,0,P*2,0,P/2),main,0,.2,0,{s:[1,1.15,1]});A(new THREE.CylinderGeometry(.435,.44,.22,32),dark,0,.11,0);A(new THREE.SphereGeometry(.14,16,12),light,0,.73,0);break;
 case'corap':A(new THREE.CylinderGeometry(.16,.16,.62,20),main,0,.56,0);A(new THREE.CapsuleGeometry(.16,.34,8,16),main,.2,.17,0,{r:[0,0,P/2]});A(new THREE.SphereGeometry(.175,16,12),dark,-.01,.2,0);A(new THREE.SphereGeometry(.166,16,12),dark,.48,.17,0,{s:[.9,1,1]});A(new THREE.CylinderGeometry(.175,.175,.12,20),dark,0,.86,0);break;
 case'semsiye':{const cm=main.clone();cm.side=THREE.DoubleSide;A(new THREE.ConeGeometry(.62,.32,8,1,true),cm,0,.82,0);A(new THREE.CylinderGeometry(.02,.02,.82,8),brown,0,.4,0);A(new THREE.TorusGeometry(.07,.022,8,16,P),brown,-.07,0,0,{r:[0,0,P]});A(new THREE.SphereGeometry(.035,8,8),M.metal,0,.99,0);sc.push([0,.99,0,0,1,0]);break}
 case'gozluk':for(const s of[-1,1]){A(new THREE.TorusGeometry(.2,.04,12,32),main,s*.25,.3,0);mesh(new THREE.CylinderGeometry(.19,.19,.01,32),M.glass,g,s*.25,.3,0,{r:[P/2,0,0],cast:false});A(BX(.035,.035,.6),dark,s*.47,.33,-.3)}A(new THREE.TorusGeometry(.06,.025,8,12,P),main,0,.36,0);sc.push([-.47,.33,.02,-1,0,0],[.47,.33,.02,1,0,0]);break;
 case'anahtar':A(new THREE.TorusGeometry(.17,.07,12,28),main,-.32,.3,0);A(BX(.6,.09,.07),main,.15,.3,0);A(BX(.06,.12,.07),main,.3,.2,0);A(BX(.06,.08,.07),main,.4,.22,0);break;
 case'cuzdan':A(new RoundedBoxGeometry(.9,.55,.12,3,.04),main,0,.28,0);A(new RoundedBoxGeometry(.9,.3,.025,2,.01),dark,0,.42,.07,{r:[.15,0,0]});A(new THREE.CylinderGeometry(.04,.04,.03,16),M.brass,0,.36,.09,{r:[P/2,0,0]});sc.push([0,.36,.1,0,0,1]);break;
 case'gunluk':A(new RoundedBoxGeometry(.72,.92,.04,2,.015),main,0,.46,.1);A(new RoundedBoxGeometry(.72,.92,.04,2,.015),main,0,.46,-.1);A(BX(.06,.92,.24),dark,-.34,.46,0);A(BX(.66,.86,.16),M.cream,.02,.46,0);A(BX(.13,.15,.25),dark,.34,.46,0);A(new THREE.CylinderGeometry(.03,.03,.02,12),M.brass,.41,.46,0,{r:[0,0,P/2]});sc.push([.42,.46,0,1,0,0]);break;
 case'muzik':{A(new RoundedBoxGeometry(.9,.42,.6,3,.03),main,0,.21,0);A(BX(.92,.04,.62),M.brass,0,.03,0);A(BX(.92,.04,.62),M.brass,0,.37,0);
  const lid=new THREE.Group();lid.position.set(0,.43,-.3);lid.rotation.x=-.8;g.add(lid);const lm=mesh(new RoundedBoxGeometry(.92,.07,.62,3,.03),main,lid,0,.035,.31);parts.push(lm);
  A(new THREE.CylinderGeometry(.025,.025,.22,8),M.brass,0,.52,0);A(new THREE.SphereGeometry(.065,12,10),mat('#f09bb5'),0,.66,0);A(new THREE.CylinderGeometry(.02,.02,.12,8),brown,.5,.22,0,{r:[0,0,P/2]});A(BX(.03,.12,.03),brown,.56,.27,0);
  sc.push([-.3,.3,-.305,0,0,-1],[.3,.3,-.305,0,0,-1]);break}
 case'kupa':A(new THREE.CylinderGeometry(.3,.27,.62,32),main,0,.31,0);A(new THREE.TorusGeometry(.29,.022,8,32),light,0,.62,0,{r:[P/2,0,0]});mesh(new THREE.CircleGeometry(.26,32),mat('#5a3420',{roughness:.15}),g,0,.624,0,{r:[-P/2,0,0],cast:false});A(new THREE.TorusGeometry(.15,.045,12,20,P),main,.3,.32,0,{r:[0,0,-P/2]});break;
 case'cerceve':A(BX(.8,.1,.62),main,0,.31,0,{s:[1,1,1],r:[P/2-.25,0,0]});{const ph=canvasTex(128,100,gg=>{gg.fillStyle='#bfe0f0';gg.fillRect(0,0,128,100);gg.fillStyle='#8fc48a';gg.fillRect(0,62,128,38);gg.fillStyle='#b07a4f';gg.beginPath();gg.arc(52,58,16,0,7);gg.arc(80,52,20,0,7);gg.fill();gg.fillStyle='#f4ede6';gg.beginPath();gg.arc(52,38,12,0,7);gg.arc(80,28,14,0,7);gg.fill()});
  const pm=mesh(new THREE.PlaneGeometry(.6,.44),mat('#fff',{map:ph,roughness:.4}),g,0,.33,.056,{r:[-.25,0,0],cast:false});pm.position.z=.05;}A(BX(.06,.42,.06),dark,0,.2,-.17,{r:[.5,0,0]});sc.push([0,.6,-.02,0,1,0]);break;
 case'ayicik':A(new THREE.SphereGeometry(.3,24,18),main,0,.3,0,{s:[1,1.05,.9]});A(new THREE.SphereGeometry(.22,24,18),main,0,.72,0);for(const s of[-1,1]){A(new THREE.SphereGeometry(.08,12,10),main,s*.16,.9,0);A(new THREE.CapsuleGeometry(.07,.14,6,10),main,s*.3,.38,.06,{r:[0,0,s*.8]});A(new THREE.CapsuleGeometry(.08,.1,6,10),main,s*.15,.08,.16,{r:[P/2,0,0]});mesh(new THREE.SphereGeometry(.03,8,8),M.ink,g,s*.08,.76,.2)}A(new THREE.SphereGeometry(.08,12,10),light,0,.67,.17,{s:[1,.8,.8]});mesh(new THREE.SphereGeometry(.03,8,8),M.ink,g,0,.7,.24);sc.push([0,.3,.27,0,0,1]);break;
 case'top':A(new THREE.SphereGeometry(.45,32,24),main,0,.45,0);A(new THREE.TorusGeometry(.452,.02,8,48),light,0,.45,0,{r:[P/2,0,0]});A(new THREE.TorusGeometry(.452,.02,8,48),light,0,.45,0);break;
 case'araba':A(new RoundedBoxGeometry(.9,.22,.44,3,.05),main,0,.22,0);A(new RoundedBoxGeometry(.5,.2,.4,3,.06),light,-.05,.42,0);for(const x of[-.28,.28])for(const z of[-.23,.23])A(new THREE.CylinderGeometry(.1,.1,.06,16),M.ink,x,.1,z,{r:[P/2,0,0]});mesh(BX(.42,.13,.41),M.glass,g,-.05,.43,0,{cast:false});sc.push([.28,.1,.27,0,0,1],[-.28,.1,.27,0,0,1]);break;
 case'topac':A(new THREE.ConeGeometry(.35,.45,24),main,0,.3,0,{r:[P,0,0]});A(new THREE.CylinderGeometry(.35,.35,.12,24),main,0,.58,0);A(new THREE.CylinderGeometry(.04,.04,.3,10),wood,0,.78,0);A(new THREE.SphereGeometry(.03,8,8),M.ink,0,.06,0);break;
 case'caydanlik':A(new THREE.SphereGeometry(.38,28,20),main,0,.36,0,{s:[1,.85,1]});A(new THREE.CylinderGeometry(.04,.07,.4,12),main,.42,.42,0,{r:[0,0,-.9]});A(new THREE.TorusGeometry(.2,.035,10,20,P),dark,0,.62,0,{r:[0,P/2,0]});A(new THREE.CylinderGeometry(.16,.18,.06,20),dark,0,.66,0);A(new THREE.SphereGeometry(.05,10,8),dark,0,.72,0);sc.push([0,.69,0,0,1,0]);break;
 case'kavanoz':mesh(new THREE.CylinderGeometry(.28,.28,.6,28),M.glass,g,0,.3,0,{cast:false});A(new THREE.CylinderGeometry(.25,.25,.42,24),mat(shade(c,.85),{roughness:.2}),0,.22,0);A(new THREE.CylinderGeometry(.3,.3,.12,28),main,0,.66,0);A(new THREE.CylinderGeometry(.27,.27,.6,24),new THREE.MeshStandardMaterial({transparent:true,opacity:0,depthWrite:false}),0,.3,0);sc.push([0,.72,0,0,1,0]);break;
 case'termos':A(new THREE.CylinderGeometry(.2,.2,.9,24),main,0,.45,0);A(new THREE.CylinderGeometry(.21,.21,.2,24),dark,0,1.0,0);A(new THREE.TorusGeometry(.2,.015,8,24),M.metal,0,.9,0,{r:[P/2,0,0]});A(new THREE.TorusGeometry(.12,.03,8,16,P),dark,.2,.55,0,{r:[0,0,-P/2]});sc.push([0,1.1,0,0,1,0]);break;
 case'sulama':A(new THREE.CylinderGeometry(.3,.32,.5,24),main,0,.25,0);A(new THREE.CylinderGeometry(.03,.06,.55,12),main,.42,.42,0,{r:[0,0,-.9]});A(new THREE.CylinderGeometry(.08,.05,.06,12),dark,.62,.58,0,{r:[0,0,-.9]});A(new THREE.TorusGeometry(.22,.03,8,20,P),dark,-.05,.5,0,{r:[0,P/2,0]});sc.push([.32,.32,0,1,0,0]);break;
 case'saksi':{A(new THREE.CylinderGeometry(.3,.22,.45,20),main,0,.22,0);A(new THREE.CylinderGeometry(.32,.32,.08,20),dark,0,.44,0);mesh(new THREE.CircleGeometry(.29,20),mat('#4a3020'),g,0,.47,0,{r:[-P/2,0,0],cast:false});
  A(new THREE.CapsuleGeometry(.11,.32,8,12),mat('#4f9a5a',{roughness:.7}),0,.75,0);A(new THREE.CapsuleGeometry(.07,.14,6,10),mat('#4f9a5a',{roughness:.7}),.14,.75,0,{r:[0,0,-.9]});A(new THREE.SphereGeometry(.05,8,8),mat('#f09bb5'),0,1.0,0);break}
 case'kurek':A(new THREE.CylinderGeometry(.05,.05,.5,12),wood,0,.75,0);A(BX(.28,.06,.06),M.metal,0,.5,0);A(new THREE.ConeGeometry(.2,.5,4,1),main,0,.25,0,{r:[P,P/4,0],s:[1,1,.3]});sc.push([0,.5,.035,0,0,1]);break}
 g.updateMatrixWorld(true);const bb=new THREE.Box3().setFromObject(g),size=bb.getSize(V()),ctr=bb.getCenter(V()),s=1/Math.max(size.x,size.y,size.z);
 g.scale.setScalar(s);g.position.set(-ctr.x*s,-bb.min.y*s,-ctr.z*s);const o=new THREE.Group();o.add(g);o.updateMatrixWorld(true);
 o.userData={parts,h:size.y*s,anchors:sc.map(a=>({p:g.localToWorld(V(a[0],a[1],a[2])),n:V(a[3],a[4],a[5]).normalize()}))};return o}
function sample(m){const h=m.userData.h,c=V(0,h/2,0);
 for(let t=0;t<60;t++){const d=V().randomDirection();const o=c.clone().addScaledVector(d,1.8),tg=c.clone().add(V(rnd(-.3,.3),rnd(-.4,.4)*h,rnd(-.2,.2)));
  ray.set(o,tg.sub(o).normalize());const hit=ray.intersectObjects(m.userData.parts,false)[0];if(!hit||!hit.face||hit.object.material.opacity===0)continue;const n=hit.face.normal.clone().transformDirection(hit.object.matrixWorld);if(n.dot(ray.ray.direction)>0)n.negate();const pp=hit.point.clone();ray.set(pp.clone().addScaledVector(n,1.2),n.clone().negate());const h2=ray.intersectObjects(m.userData.parts,false).find(x=>x.object.material.opacity!==0);if(h2&&h2.distance<1.17)continue;return{p:pp,n}}
 return{p:c.clone(),n:V(0,0,1)}}
function decal(m,p,n,r,map,op=1){const me=new THREE.Mesh(new THREE.CircleGeometry(r,20),new THREE.MeshStandardMaterial({map,transparent:true,opacity:op,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-4,roughness:1}));
 me.position.copy(p).addScaledVector(n,.006);m.add(me);me.lookAt(m.localToWorld(p.clone().addScaledVector(n,1)));me.rotateZ(Math.random()*6.28);me.userData.dmg=true;return me}
function surfPath(m){for(let t=0;t<14;t++){const s=sample(m);const tg=V().crossVectors(s.n,Math.abs(s.n.y)<.9?V(0,1,0):V(1,0,0)).normalize(),bt=V().crossVectors(s.n,tg);const pts=[];
  for(let i=-3;i<=3;i++){const q=s.p.clone().addScaledVector(tg,i*.045).addScaledVector(bt,(i%2?1:-1)*.016);ray.set(q.clone().addScaledVector(s.n,.2),s.n.clone().negate());const h=ray.intersectObjects(m.userData.parts,false)[0];if(!h||h.distance>.35)break;pts.push(h.point.clone().addScaledVector(s.n,.005))}
  if(pts.length===7)return{pts,c:pts[3].clone(),n:s.n.clone()}}return null}
function makeCrack(m){const s=surfPath(m);if(!s)return null;const c={pts:s.pts.map(p=>({p,g:false})),st:'open',c:s.c,n:s.n,grp:new THREE.Group()};m.add(c.grp);drawCrack(c);return c}
function makeTear(m){const s=surfPath(m);if(!s)return null;const t={pts:s.pts,k:0,done:false,c:s.c,n:s.n,grp:new THREE.Group()};m.add(t.grp);drawTear(t);return t}
const crackM={open:mat('#2b1a12',{roughness:.4}),bead:new THREE.MeshStandardMaterial({color:'#ffcf6b',roughness:.1,transparent:true,opacity:.9}),wet:new THREE.MeshStandardMaterial({color:'#ffc94d',roughness:.05,transparent:true,opacity:.85,emissive:'#5a3a00',emissiveIntensity:.4}),done:new THREE.MeshStandardMaterial({color:'#fff',transparent:true,opacity:.35}),hint:new THREE.MeshBasicMaterial({color:'#ffe07a',transparent:true,opacity:.35,depthWrite:false})};
function drawCrack(c){c.grp.clear();const curve=new THREE.CatmullRomCurve3(c.pts.map(q=>q.p),false,'centripetal');const tube=r=>new THREE.TubeGeometry(curve,30,r,6);
 if(c.st==='done')c.grp.add(new THREE.Mesh(tube(.004),crackM.done));
 else if(c.st==='wet')c.grp.add(new THREE.Mesh(tube(.02),crackM.wet));
 else{c.grp.add(new THREE.Mesh(tube(.009),crackM.open));if(S.tool==='glue'&&S.view==='bench')c.grp.add(new THREE.Mesh(tube(.026),crackM.hint));for(const q of c.pts)if(q.g){const b=new THREE.Mesh(new THREE.SphereGeometry(.022,10,8),crackM.bead);b.position.copy(q.p);c.grp.add(b)}}
 if(c.st==='wet'&&S.tool==='clamp'&&S.view==='bench'){const r=new THREE.Mesh(new THREE.TorusGeometry(.11,.007,6,32),crackM.hint);r.position.copy(c.c).addScaledVector(c.n,.01);c.grp.add(r);r.lookAt(c.grp.localToWorld(c.c.clone().addScaledVector(c.n,1)))}
 c.grp.traverse(o=>o.userData.dmg=true)}
const tearM={open:mat('#2a1a12',{roughness:.9}),thread:mat('#fff6e0',{roughness:.6})},stitchG=new THREE.CylinderGeometry(.005,.005,.06,6),hintSphG=new THREE.SphereGeometry(.026,10,8);
function drawTear(t){t.grp.clear();const P=t.pts;
 if(t.k<P.length){const rest=P.slice(Math.max(0,t.k-1));if(rest.length>=2)t.grp.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(rest,false,'centripetal'),20,.012,6),tearM.open))}
 if(t.k>=2)t.grp.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(P.slice(0,t.k),false,'centripetal'),16,.004,5),tearM.thread));
 for(let i=0;i<t.k;i++){const a=P[Math.max(0,i-1)],b=P[Math.min(P.length-1,i+1)],cr=V().crossVectors(t.n,b.clone().sub(a)).normalize();const st=new THREE.Mesh(stitchG,tearM.thread);st.position.copy(P[i]).addScaledVector(t.n,.004);st.quaternion.setFromUnitVectors(V(0,1,0),cr);t.grp.add(st)}
 if(!t.done&&S.tool==='needle'&&S.view==='bench')for(const i of t.k?[t.k]:[0,P.length-1]){const h=new THREE.Mesh(hintSphG,crackM.hint);h.position.copy(P[i]);t.grp.add(h)}}
const holeM=new THREE.MeshStandardMaterial({map:holeTex,transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-4,roughness:1});
function partMesh(kind,par){const P=Math.PI;
 if(kind==='dugme'){mesh(new THREE.CylinderGeometry(.045,.045,.016,20),mat('#f6f0e2',{roughness:.4}),par,0,0,.008,{r:[P/2,0,0]});for(const[a,b]of[[-1,-1],[1,-1],[-1,1],[1,1]])mesh(new THREE.CylinderGeometry(.006,.006,.018,6),M.ink,par,a*.013,b*.013,.009,{r:[P/2,0,0],cast:false})}
 else if(kind==='tas'){mesh(new THREE.TorusGeometry(.042,.009,8,20),M.brass,par,0,0,.006);mesh(new THREE.OctahedronGeometry(.036),mat('#7fd3e6',{roughness:.05,metalness:.3}),par,0,0,.02,{s:[1,1,.6]})}
 else{mesh(new THREE.CylinderGeometry(.018,.022,.03,10),M.woodL,par,0,0,.015,{r:[P/2,0,0]});mesh(new THREE.SphereGeometry(.04,14,10),mat('#b07a4f',{roughness:.5}),par,0,0,.05)}}
function makeSocket(m,kind){const s=sample(m),grp=new THREE.Group();grp.position.copy(s.p).addScaledVector(s.n,.004);grp.quaternion.setFromUnitVectors(V(0,0,1),s.n);m.add(grp);const so={p:s.p,n:s.n,kind,done:false,grp};drawPart(so);return so}
function drawPart(s){s.grp.clear();if(s.done){partMesh(s.kind,s.grp);return}s.grp.add(new THREE.Mesh(new THREE.CircleGeometry(.05,20),holeM));if(S.tool==='part'&&S.view==='bench')s.grp.add(new THREE.Mesh(new THREE.TorusGeometry(.075,.006,6,28),crackM.hint))}
function makeScrew(m,a){const grp=new THREE.Group(),spin=new THREE.Group();grp.add(spin);m.add(grp);grp.quaternion.setFromUnitVectors(V(0,1,0),a.n);
 mesh(new THREE.CylinderGeometry(.038,.038,.018,20),M.metal,spin,0,0,0);mesh(BX(.052,.008,.011),M.ink,spin,0,.01,0,{cast:false});const th=mesh(new THREE.CylinderGeometry(.013,.013,.06,8),mat('#9aa0ab',{metalness:.7,roughness:.4}),grp,0,-.03,0);
 const hint=mesh(new THREE.TorusGeometry(.07,.006,6,28),crackM.hint,grp,0,0,0,{r:[Math.PI/2,0,0],cast:false});
 const s={a,t:0,done:false,grp,spin,th,hint};updScrew(s);grp.traverse(o=>o.userData.dmg=true);return s}
const screwNeed=()=>4*Math.PI*(1-.2*(S.lv.driver||0));
function updScrew(s){const lift=s.done?0:1-Math.min(1,s.t/screwNeed());s.grp.position.copy(s.a.p).addScaledVector(s.a.n,.012+lift*.05);s.spin.rotation.y=s.done?.8:s.t;s.th.visible=lift>.05;s.th.scale.y=Math.max(.01,lift);s.hint.visible=!s.done&&S.tool==='driver'&&S.view==='bench'}
function genDmg(it){const m=it.model=buildModel(it),d=S.day,ev=S.ev,X=!!it.special;
 const dust=[];const nd=Math.round(Math.min(32,rnd(12,17)+2*(d-1)));for(let i=0;i<nd;i++){const s=sample(m),r=rnd(.07,.12);dust.push({p:s.p,n:s.n,r,o:1,mesh:decal(m,s.p,s.n,r,dustTex,.95)})}
 const stains=[];const sp=Math.min(.9,.35+.08*d+(ev==='yagmur'?.35:0));if(X||Math.random()<sp){const n=1+Math.floor(Math.random()*Math.min(3,1+Math.floor(d/3)));for(let i=0;i<n;i++){const s=sample(m),r=rnd(.09,.13);stains.push({p:s.p,n:s.n,r,o:1,mesh:decal(m,s.p,s.n,r,ev==='yagmur'?mudTex:R(stainTexs))})}}
 const fab=FAB.includes(it.type),cracks=[];if(!(fab&&d>=2)&&(X||Math.random()<Math.min(.8,.25+.08*d))){const n=1+Math.floor(Math.random()*Math.min(3,1+Math.floor(d/4)));for(let i=0;i<n;i++){const c=makeCrack(m);if(c)cracks.push(c)}}
 const screws=m.userData.anchors.length&&(X||Math.random()<Math.min(.85,.45+.05*d))?m.userData.anchors.map(a=>makeScrew(m,a)):[];
 const tears=[];if(fab&&d>=2&&Math.random()<Math.min(.75,.35+.06*d)){const n=Math.random()<.35?2:1;for(let i=0;i<n;i++){const t=makeTear(m);if(t)tears.push(t)}}
 const fades=[];if(d>=3&&(X||Math.random()<Math.min(.6,.25+.05*d))){const n=Math.random()<.4?2:1;for(let i=0;i<n;i++){const s=sample(m),r=rnd(.08,.11);fades.push({p:s.p,n:s.n,r,o:1,mesh:decal(m,s.p,s.n,r,fadeTex,.95)})}}
 const rusts=[];if(d>=4&&METAL.includes(it.type)&&(X||Math.random()<.65)){const n=Math.random()<.4?2:1;for(let i=0;i<n;i++){const s=sample(m),r=rnd(.08,.11);rusts.push({p:s.p,n:s.n,r,o:1,st:'rust',mesh:decal(m,s.p,s.n,r,rustTex,.95)})}}
 const parts=d>=5&&X||d>=5&&Math.random()<Math.min(.5,.25+.03*d)?[makeSocket(m,partKind(it))]:[];
 if(fades.length){const cols=avail(COL),pal=[it.color];for(const c of[...(SIMILAR[it.color]||[]).filter(c=>cols.includes(c)),...cols.slice().sort(()=>Math.random()-.5)])if(pal.length<3&&!pal.includes(c))pal.push(c);it.pal=pal.sort(()=>Math.random()-.5)}
 it.dmg={dust,stains,cracks,screws,tears,fades,rusts,parts};it.broken=cracks.length+screws.length+tears.length+fades.length+rusts.length+parts.length>0;it.ready=false}
function cleanModel(it){it.model=buildModel(it);it.dmg={dust:[],stains:[],cracks:[],screws:[],tears:[],fades:[],rusts:[],parts:[]};it.ready=true}
function dmgDone(d){return d.dust.every(b=>b.o<=0)&&d.stains.every(s=>s.o<=0)&&d.cracks.every(c=>c.st==='done')&&d.screws.every(s=>s.done)&&d.tears.every(t=>t.done)&&d.fades.every(f=>f.o<=0)&&d.rusts.every(r=>r.st==='done')&&d.parts.every(s=>s.done)}
function needTool(d){return d.dust.some(x=>x.o>0)?'brush':d.stains.some(x=>x.o>0)?'cloth':d.cracks.some(x=>x.st==='open')?'glue':d.cracks.some(x=>x.st==='wet')?'clamp':d.screws.some(x=>!x.done)?'driver':d.tears.some(x=>!x.done)?'needle':d.fades.some(x=>x.o>0)?'paint':d.rusts.some(x=>x.st==='rust')?'sand':d.rusts.some(x=>x.st==='dull')?'polish':d.parts.some(x=>!x.done)?'part':'hand'}
function fixAll(d){d.cracks.forEach(c=>c.st='done');d.screws.forEach(s=>{s.done=true});d.tears.forEach(t=>{t.k=t.pts.length;t.done=true});d.fades.forEach(f=>f.o=0);d.rusts.forEach(r=>{r.st='done';r.o=0});d.parts.forEach(s=>{s.done=true})}

/* ---------- hayvanlar ---------- */
function animal3D(sp){const a=ANI[sp],g=new THREE.Group(),head=new THREE.Group();head.position.y=1.55;g.add(head);
 const fur=mat(a.c,{roughness:.9}),dk=mat(a.d,{roughness:.9}),pink=mat('#f3a6b4',{roughness:.8}),wh=mat('#fff',{roughness:.3}),scm=mat(a.s,{roughness:.95});
 mesh(new THREE.SphereGeometry(.55,32,24),dk,g,0,.62,0,{s:[1,1.2,.85]});mesh(new THREE.TorusGeometry(.36,.1,12,32),scm,g,0,1.13,0,{r:[Math.PI/2,0,0],s:[1,.85,1]});mesh(BX(.14,.42,.06),scm,g,.18,.92,.4,{r:[.15,0,.2]});
 mesh(new THREE.SphereGeometry(.5,32,24),fur,head,0,0,0,{s:[1,.95,.92]});
 const eye=(x,y,z,r)=>{mesh(new THREE.SphereGeometry(r,16,12),M.ink,head,x,y,z);mesh(new THREE.SphereGeometry(r*.35,8,8),wh,head,x+r*.3,y+r*.35,z+r*.75)};
 if(sp==='baykus'){for(const s of[-1,1]){mesh(new THREE.SphereGeometry(.15,16,12),wh,head,s*.17,.06,.36,{s:[1,1,.5]});eye(s*.17,.06,.43,.075)}mesh(new THREE.ConeGeometry(.05,.12,8),mat('#f2b84e'),head,0,-.07,.47,{r:[Math.PI/2,0,0]})}
 else if(sp==='kurbaga'){for(const s of[-1,1]){mesh(new THREE.SphereGeometry(.16,16,12),fur,head,s*.22,.38,.16);mesh(new THREE.SphereGeometry(.1,16,12),wh,head,s*.22,.42,.28);eye(s*.22,.42,.35,.055)}}
 else for(const s of[-1,1])eye(s*.17,.06,.43,.06);
 for(const s of[-1,1])mesh(new THREE.SphereGeometry(.085,12,10),pink,head,s*.3,-.1,.36,{s:[1,.8,.4]});
 if(sp!=='baykus')mesh(new THREE.SphereGeometry(.05,12,10),sp==='tavsan'||sp==='fare'?pink:M.ink,head,0,-.06,.47,{s:[1.2,.9,1]});
 if(sp==='tavsan')for(const s of[-1,1]){mesh(new THREE.CapsuleGeometry(.09,.42,6,12),fur,head,s*.17,.62,0,{r:[0,0,s*-.12]});mesh(new THREE.CapsuleGeometry(.05,.34,6,10),pink,head,s*.17,.62,.06,{r:[0,0,s*-.12],s:[1,1,.5]})}
 if(sp==='kedi'||sp==='tilki')for(const s of[-1,1])mesh(new THREE.ConeGeometry(.15,.32,12),fur,head,s*.27,.45,0,{r:[0,0,s*-.35],s:[1,1,.6]});
 if(sp==='tilki')mesh(new THREE.SphereGeometry(.22,16,12),mat('#fff4ea',{roughness:.9}),head,0,-.13,.3,{s:[1,.7,.8]});
 if(sp==='ayi'){for(const s of[-1,1])mesh(new THREE.SphereGeometry(.14,16,12),fur,head,s*.33,.36,0,{s:[1,1,.6]});mesh(new THREE.SphereGeometry(.17,16,12),mat('#e2c09c',{roughness:.9}),head,0,-.12,.34,{s:[1,.75,.8]})}
 if(sp==='fare')for(const s of[-1,1]){mesh(new THREE.SphereGeometry(.24,20,14),fur,head,s*.4,.32,0,{s:[1,1,.3]});mesh(new THREE.SphereGeometry(.16,16,12),pink,head,s*.4,.32,.05,{s:[1,1,.2]})}
 if(sp==='baykus')for(const s of[-1,1])mesh(new THREE.ConeGeometry(.08,.22,8),dk,head,s*.28,.42,0,{r:[0,0,s*-.5]});
 if(sp==='kirpi')for(let i=0;i<30;i++){const th=rnd(-1.4,1.4),ph=rnd(.15,1.5),v=V(Math.sin(th)*Math.sin(ph),Math.cos(ph),-Math.abs(Math.cos(th))*Math.sin(ph)-.1).normalize();const c=mesh(new THREE.ConeGeometry(.06,.3,6),dk,head,v.x*.45,v.y*.45,v.z*.45);c.quaternion.setFromUnitVectors(V(0,1,0),v)}
 g.userData={head,sp};setMood(g,'neutral');return g}
function setMood(g,m){const h=g.userData.head;if(h.userData.mouth)h.remove(h.userData.mouth);const grp=new THREE.Group(),dy=m==='happy'?-.06:m==='sad'?.05:0;
 grp.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(V(-.08,-.2,.43),V(0,-.2+dy,.46),V(.08,-.2,.43)),12,.014,6),M.ink));
 if(m==='sad'){const t=new THREE.Mesh(new THREE.SphereGeometry(.03,8,8),mat('#7cc4f0',{roughness:.1}));t.position.set(.19,-.03,.42);grp.add(t)}
 h.add(grp);h.userData.mouth=grp;g.userData.mood=m;g.userData.mt=performance.now()}
let cust=null;
function drawCust(mood,enter){const sp=S.cc.owner;if(!cust||cust.userData.sp!==sp||enter){custHold.clear();cust=animal3D(sp);custHold.add(cust);cust.userData.t0=performance.now()}setMood(cust,mood);$('cname').textContent=ANI[sp].n}

/* ---------- yardımcılar ---------- */
const all=()=>Object.values(S.sh).flat();
const val=(it,a)=>a==='category'?TYPES[it.type].cat:it[a];
const label=it=>`${cap(COL[it.color].n)} ${TYPES[it.type].n.toLocaleLowerCase('tr')}, ${PAT[it.pattern].n}, ${PLACE[it.place].n}`;
function wpick(keys,w){let t=w.reduce((a,b)=>a+b,0)*Math.random();for(let i=0;i<keys.length;i++){t-=w[i];if(t<=0)return keys[i]}return keys[keys.length-1]}
function newItem(){const ex=[...all(),...S.box,...S.carry],cats=openCats(),types=Object.keys(TYPES).filter(t=>cats.includes(TYPES[t].cat)),cols=avail(COL),pats=avail(PAT),pls=avail(PLACE);
 const cnt=t=>ex.filter(e=>e.type===t).length;let it,tries=0;
 do{const base=ex.length&&Math.random()<Math.min(.45,.12+.06*S.day)?R(ex):null;let type,color;
  if(base){type=base.type;color=Math.random()<.5?base.color:(R((SIMILAR[base.color]||[]).filter(c=>cols.includes(c)))||R(cols))}
  else{type=wpick(types,types.map(t=>1/(1+cnt(t)*3)));color=R(cols)}
  it={id:++S.uid,type,color,pattern:R(pats),place:R(pls),owner:R(Object.keys(ANI)),ry:rnd(-.5,.5)}}
 while(tries++<60&&ex.some(e=>e.type===it.type&&e.color===it.color&&e.pattern===it.pattern&&e.place===it.place));
 it.antique=S.day>=2&&Math.random()<(S.ev==='fuar'?.45:.2);genDmg(it);return it}
function toast(m){const t=$('toast');t.textContent=m;t.classList.add('on');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('on'),2400)}
function modal(html){$('mcard').innerHTML=html;$('modal').hidden=false}
const close=()=>{$('modal').hidden=true};
let adSeq=0;const adCbs={};
function showAd(what,cb,back){S.st.ads++;
 if(NATIVE){const id=++adSeq;adCbs[id]={cb,back};modal(`<h2>Reklam açılıyor…</h2><p>Ödül: <b>${what}</b></p>`);native({t:'rewarded',id});return}
 modal(`<h2>Ödüllü reklam</h2><p>Ödül: <b>${what}</b></p><div class="bar"><b id="adbar"></b></div><p>Uygulamada burada AdMob ödüllü reklamı oynar.</p><div class="row"><button class="main" id="adok" disabled>Ödülü al</button></div>`);
 let t=0;const iv=setInterval(()=>{t+=100;$('adbar').style.width=Math.min(100,t/30)+'%';if(t>=3000){clearInterval(iv);$('adok').disabled=false;$('adok').focus()}},100);
 $('adok').onclick=()=>{close();cb()}}
window.onAdResult=(id,ok)=>{const a=adCbs[id]||{};delete adCbs[id];close();if(ok&&a.cb)a.cb();else{S.st.ads=Math.max(0,S.st.ads-1);toast('Reklam şu an hazır değil, birazdan tekrar dene.');if(a.back)a.back()}};
window.onPause=()=>{S.paused=true;if(SND.ctx)SND.ctx.suspend()};window.onResume=()=>{S.paused=false;if(SND.ctx)SND.ctx.resume();resize()};
window.onBack=()=>{if(!$('modal').hidden&&$('mcard').querySelector('#qClose,#aClose')){close();return'ok'}if(!$('modal').hidden&&!$('mcard').querySelector('#go,#shopB,#nd,#begin'))return'busy';if(S.view==='peek'){closePeek();return'ok'}if(S.view==='bench'){closeBench();return'ok'}return'exit'};
const fmt=m=>String(Math.floor(m/60)).padStart(2,'0')+':'+String(Math.floor(m%60)).padStart(2,'0');
function resetM(m){m.position.set(0,0,0);m.rotation.set(0,0,0);m.quaternion.identity();m.scale.setScalar(1)}
const comboMul=()=>1+.1*Math.min(S.combo,5);

/* ---------- sahne senkronu ---------- */
function renderHUD(){const q=S.st&&S.st.q;$('qN').textContent=q?q.filter(x=>x.done).length+'/'+q.length:'0/0';$('cQuest').classList.toggle('alldone',!!q&&q.every(x=>x.done));sndIcon();$('sTime').textContent=S.mode==='cust'?'Açık':S.mode==='morning'?fmt(S.time):'Kapalı';$('sCoin').textContent=S.coins;$('sRep').textContent=S.rep;
 const cc=$('cCombo');if(cc){cc.hidden=S.combo<2;cc.querySelector('b').textContent='×'+comboMul().toFixed(1)}
 const open=S.mode==='cust';redraw(signTex,open);sun.color.set(open?'#ffd6a8':'#fff0d8');sun.intensity=open?2.0:2.3}
const HBG=BX(.46,.44,.5),HBM=new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false});
function syncShelf(){const pick=!!(S.mode==='morning'&&S.cur&&S.cur.ready&&S.view==='scene');
 for(const k of CORDER){const sh=SH[k],list=S.sh[k],C=COMP[k],locked=CATS[k].d>S.day;sh.lt.className='clabel'+(locked?' lock':'');sh.lt.innerHTML=locked?`${CATS[k].n} · ${CATS[k].d}. gün`:`${CATS[k].n} <span>${list.length}/${S.cap[k]}</span>`;
  sh.lock.visible=locked;sh.hl.visible=pick&&!locked;sh.hit.userData.pick=locked?null:{cat:k};sh.items.clear();
  list.forEach((it,i)=>{const m=it.model,x=C.x0+.25+i*.44;resetM(m);m.scale.setScalar(.38);m.position.set(x,C.yb+.004,-1.64);m.userData.by=C.yb+.004;m.rotation.y=it.ry;m.userData.pick={id:it.id};sh.items.add(m);
   if(!it.tag){it.tag=new THREE.Mesh(new THREE.PlaneGeometry(.16,.16),new THREE.MeshStandardMaterial({map:tagTex(it.place,it.antique),roughness:.8}));it.tag.castShadow=true;it.tag.userData.pick={id:it.id}}
   it.tag.position.set(x+.17,C.yb+.09,-1.37);it.tag.rotation.set(-.15,0,.12);sh.items.add(it.tag);
   if(!it.hb){it.hb=new THREE.Mesh(HBG,HBM);it.hb.userData.pick={id:it.id}}it.hb.position.set(x+.02,C.yb+.22,-1.6);sh.items.add(it.hb)})}}
function syncDesk(){redraw(boxTex,S.box.length||'');peek.clear();S.box.slice(0,2).forEach((b,i)=>{resetM(b.model);b.model.scale.setScalar(.34);b.model.position.set(i?.16:-.16,0,i?.06:-.06);b.model.rotation.set(i?.3:-.2,i*1.3,i?.25:-.2);peek.add(b.model)});
 matHold.clear();const it=S.cur,show=!!(it&&S.mode==='morning'&&S.view==='scene');if(show){resetM(it.model);it.model.scale.setScalar(.72);matHold.add(it.model)}
 ring3.visible=show&&!it.ready;spkG.visible=show&&!!it.ready}
function queueInfo(){const w=S.cust.filter(c=>c.pat<.35).length;return S.cust.length?` Kuyrukta ${S.cust.length} kişi${w?`, <b style="color:#a3341f">${w} kişi sabırsızlanıyor!</b>`:'.'}`:' Kuyruk boş.'}
function renderNote(){const t=$('ntext'),b=$('nbtn');
 if(S.mode==='morning'&&S.cur&&S.cur.special){const it=S.cur;if(!it.ready){t.innerHTML='<b>Müze antikası!</b> Müze müdürü bunu bekliyor. Her hasarı dikkatle onar, çizik ödülü düşürür.';b.innerHTML='<button class="main" id="insp">İncele</button>';$('insp').onclick=openBench}
  else{t.innerHTML='<b>Müze antikası hazır!</b> Müdür kapıda bekliyor.';b.innerHTML='<button class="main" id="mus">Müdüre teslim et</button><button id="insp">Tekrar incele</button>';$('insp').onclick=openBench;
   $('mus').onclick=()=>{const g=Math.round((40+8*S.day)*Math.max(.1,1-.3*(it.scr||0))*(S.hard?1.5:1));S.coins+=g;S.st.earned+=g;S.st.museum=g;sfx.coin();sfx.good();toast(it.scr?`Müdür biraz üzgün ama memnun: +${g} altın`:`Kusursuz! Müze müdürü çok mutlu: +${g} altın`);nextItem()}}}
 else if(S.mode==='morning'&&S.cur){if(!S.cur.ready){t.innerHTML=`<b>${S.day}. gün · kolide ${S.box.length+1} eşya.</b> Büro 12:00'de açılıyor. ${S.cur.antique?'Bu bir <b>antika</b>, nazik davran!':'Masadaki eşyaya dokun ve aletlerle hazırla.'}`;b.innerHTML='<button class="main" id="insp">İncele</button>'+(S.st.timeAd?'':'<button class="ad" id="tad">+1 saat</button>');$('insp').onclick=openBench;if($('tad'))$('tad').onclick=()=>showAd('+1 saat çalışma süresi',()=>{S.time=Math.max(480,S.time-60);S.st.timeAd=true;renderNote();renderHUD()})}
  else{t.innerHTML='<b>Hazır!</b> Parlayan raflardan doğru olanına dokunup eşyayı yerleştir. Yanlış raf 8 dakika kaybettirir.';b.innerHTML='<button id="insp">Tekrar incele</button>';$('insp').onclick=openBench}}
 else if(S.mode==='cust'&&S.cc){const c=S.cc,left=['type','color','pattern','place'].some(a=>!c.attrs.includes(a));
  t.innerHTML=`<b>Müşteri bekliyor.</b> Doğru eşyaya dokun${S.day>=4?' ya da eşya bizde değilse söyle':''}.${queueInfo()}`;
  b.innerHTML=(S.day>=4&&!c.done?'<button id="nope">Bizde yok</button>':'')+(left&&!c.done?'<button class="ad" id="hint">İpucu</button>':'')+(!c.done&&c.pat<.4&&!c.ext?'<button class="ad" id="ext">Ek süre</button>':'')+(!c.done&&!c.tea?'<button class="ad" id="tea">Çay ikram et</button>':'');
  if($('ext'))$('ext').onclick=()=>showAd('müşteriye ek süre',()=>{c.pat=Math.min(1,c.pat+.5);c.ext=true;patUI();say('Peki, biraz daha bekleyebilirim. '+clueHTML(c));renderNote()});
  if($('nope'))$('nope').onclick=refuse;
  if($('tea'))$('tea').onclick=()=>showAd('çay ikramı: herkesin sabrı dolar',()=>{c.pat=1;c.tea=true;S.cust.forEach(w=>w.pat=Math.min(1,w.pat+.4));patUI();say('Oh, mis gibi çay! Acele etme, beklerim. '+clueHTML(c));renderNote()});
  if($('hint'))$('hint').onclick=()=>showAd('müşteriden ekstra ipucu',()=>{c.attrs.push(['type','color','pattern','place'].find(a=>!c.attrs.includes(a)));c.hint=true;c.plain=true;S.perf=0;say(clueHTML(c));renderNote()})}
 else{t.innerHTML='<b>Büro sessiz.</b>';b.innerHTML=''}}
function renderAll(){renderHUD();syncShelf();syncDesk();renderNote()}

/* ---------- çalışma masası ---------- */
const B={q:new THREE.Quaternion()},ptrs=new Map();
function rotBy(dx,dy){B.q.premultiply(new THREE.Quaternion().setFromAxisAngle(V(0,1,0),dx*.011)).premultiply(new THREE.Quaternion().setFromAxisAngle(V(1,0,0),dy*.011))}
$('rL').onclick=()=>rotBy(-95,0);$('rR').onclick=()=>rotBy(95,0);$('rT').onclick=()=>rotBy(0,140);
function openBench(){if(!S.cur)return;S.view='bench';stage.classList.add('inbench');$('bench').hidden=false;const m=S.cur.model;resetM(m);m.position.y=-m.userData.h/2;pivot.clear();ptrs.clear();B.down=false;B.rot=false;
 B.q.setFromEuler(new THREE.Euler(.35,-.4,0));pivot.quaternion.copy(B.q);pivot.add(m);
 S.tool=needTool(S.cur.dmg);S.paintCol=null;S.partSel=null;
 renderTools();refresh();renderTasks();bmsg(S.cur.ready?'Bu eşya zaten pırıl pırıl.':'El aletiyle ya da iki parmakla eşyayı her yöne çevir. Arkasını ve altını da kontrol et!')}
function closeBench(){$('bench').hidden=true;stage.classList.remove('inbench');S.view='scene';S.hold=null;S.drv=null;$('ring').hidden=true;$('cur').style.display='none';pivot.clear();refresh();renderAll()}
$('bclose').onclick=closeBench;
let msgT=0;function bmsg(m,th){const n=Date.now();if(th&&n-msgT<1600)return;msgT=n;$('bmsg').textContent=m}
function renderTools(){const tl=TOOLS.filter(t=>(t.d||1)<=S.day);$('tools').classList.toggle('many',tl.length>6);$('tools').innerHTML=tl.map(t=>`<button class="tool${S.tool===t.k?' on':''}" data-tool="${t.k}" aria-pressed="${S.tool===t.k}"><svg viewBox="${toolVB[t.k].join(' ')}" aria-hidden="true">${toolShape(t.k)}</svg>${t.k==='glue'?'Tutkal '+S.glue:t.n}</button>`).join('');renderPal()}
function renderPal(){const el=$('pal'),it=S.cur;let h='';
 if(it&&S.view==='bench'){const d=it.dmg;
  if(S.tool==='paint'&&it.pal&&d.fades.some(f=>f.o>0))h=it.pal.map(k=>`<button class="sw${S.paintCol===k?' on':''}" data-col="${k}" aria-pressed="${S.paintCol===k}"><i style="background:${COL[k].h}"></i>${cap(COL[k].n)}</button>`).join('');
  if(S.tool==='part'&&d.parts.some(s=>!s.done))h=Object.keys(PARTS).map(k=>`<button class="sw${S.partSel===k?' on':''}" data-part="${k}" aria-pressed="${S.partSel===k}"><svg viewBox="-50 -50 100 100" aria-hidden="true">${PARTS[k].i}</svg>${PARTS[k].n}</button>`).join('')}
 if(el.dataset.w===h)return;el.dataset.w=h;el.innerHTML=h;el.hidden=!h}
$('pal').addEventListener('click',e=>{const b=e.target.closest('[data-col],[data-part]');if(!b)return;
 if(b.dataset.col){S.paintCol=b.dataset.col;bmsg(`${cap(COL[S.paintCol].n)} boya seçildi. Solmuş yeri boya.`)}else{S.partSel=b.dataset.part;bmsg(`${PARTS[S.partSel].n} seçildi. Boş yuvaya dokun.`)}renderPal()});
$('tools').addEventListener('click',e=>{const b=e.target.closest('[data-tool]');if(!b)return;S.tool=b.dataset.tool;sfx.tick();renderTools();refresh();
 bmsg(TOOLMSG[S.tool])});
function refresh(){const it=S.cur;if(!it)return;const d=it.dmg;for(const b of[...d.dust,...d.stains,...d.fades]){b.mesh.visible=b.o>0;b.mesh.material.opacity=b.o*.95}
 for(const r of d.rusts){r.mesh.visible=r.st!=='done';r.mesh.material.opacity=r.st==='rust'?.3+.65*r.o:.9*r.o}d.cracks.forEach(drawCrack);d.screws.forEach(updScrew);d.tears.forEach(drawTear);d.parts.forEach(drawPart)}
function counts(){const m=S.cur.dmg;return{dustP:m.dust.length?Math.round(100*(1-m.dust.reduce((s,b)=>s+b.o,0)/m.dust.length)):100,st:[m.stains.filter(s=>s.o<=0).length,m.stains.length],cr:[m.cracks.filter(c=>c.st==='done').length,m.cracks.length],sc:[m.screws.filter(s=>s.done).length,m.screws.length],te:[m.tears.filter(t=>t.done).length,m.tears.length],fa:[m.fades.filter(f=>f.o<=0).length,m.fades.length],ru:[m.rusts.filter(r=>r.st==='done').length,m.rusts.length],pa:[m.parts.filter(s=>s.done).length,m.parts.length]}}
function renderTasks(){const c=counts(),it=S.cur,ch=(ok,t)=>`<span class="task${ok?' ok':''}">${ok?'✓ ':''}${t}</span>`;
 $('tasks').innerHTML=`<span class="task${S.time>=660?' late':''}" id="bt">${fmt(S.time)}</span>`+(it.antique?`<span class="task warn">Antika · çizik ${it.scr||0}/3</span>`:'')+ch(c.dustP>=100,`Toz %${c.dustP}`)+(c.st[1]?ch(c.st[0]===c.st[1],`Leke ${c.st[0]}/${c.st[1]}`):'')+(c.cr[1]?ch(c.cr[0]===c.cr[1],`Çatlak ${c.cr[0]}/${c.cr[1]}`):'')+(c.sc[1]?ch(c.sc[0]===c.sc[1],`Vida ${c.sc[0]}/${c.sc[1]}`):'')+[['te','Yırtık'],['fa','Boya'],['ru','Pas'],['pa','Parça']].map(([k,n])=>c[k][1]?ch(c[k][0]===c[k][1],`${n} ${c[k][0]}/${c[k][1]}`):'').join('');
 $('bclose').textContent=it.ready?'Masaya bırak':'Kapat';$('bclose').className=it.ready?'main':'';renderAds();renderPal()}
function renderAds(){const d=S.cur.dmg,dirty=d.dust.some(b=>b.o>0)||d.stains.some(s=>s.o>0),broken=!dmgDone({...d,dust:[],stains:[]}),noGlue=d.cracks.some(c=>c.st==='open'&&!c.paid)&&S.glue<=0;
 const want=S.cur.id+(S.cur.gen||0)+':'+(dirty?(S.spray>0?'s'+S.spray:'a'):'')+(broken?'k':'')+(noGlue?'g':'');if($('bads').dataset.w===want)return;$('bads').dataset.w=want;
 $('bads').innerHTML=(dirty?(S.spray>0?`<button id="useSpray">Sprey kullan (${S.spray})</button>`:'<button class="ad" id="getSpray">+3 sprey</button>'):'')+(noGlue?'<button class="ad" id="getGlue">+2 tutkal</button>':'')+(broken?'<button class="ad" id="kit">Tamir kiti</button>':'');
 if($('useSpray'))$('useSpray').onclick=()=>{S.spray--;sfx.spray();d.dust.forEach(b=>b.o=0);d.stains.forEach(s=>s.o=0);sparkle();bmsg('Fıssss! Toz ve lekeler bir anda gitti.');refresh();renderTasks();check()};
 if($('getSpray'))$('getSpray').onclick=()=>showAd('3 parlatma spreyi',()=>{S.spray+=3;renderAds()});
 if($('getGlue'))$('getGlue').onclick=()=>showAd('2 tutkal tüpü',()=>{S.glue+=2;renderTools();renderAds()});
 if($('kit'))$('kit').onclick=()=>showAd('tamir kiti',()=>{fixAll(d);bmsg('Tamir kiti işini yaptı!');refresh();renderTasks();check()})}
function fx(cls,x,y,style=''){const e=document.createElement('div');e.className=cls;e.style.cssText=`left:${x}px;top:${y}px;${style}`;stage.appendChild(e);setTimeout(()=>e.remove(),1200);return e}
function puff(x,y){const r=stage.getBoundingClientRect();fx('dot',x-r.left+rnd(-12,12),y-r.top+rnd(-12,12),`--dx:${rnd(-60,60)}px;--dy:${rnd(-70,-15)}px`)}
function sparkle(){const w=stage.clientWidth,h=stage.clientHeight;for(const[a,b]of[[.25,.25],[.72,.3],[.68,.52],[.28,.5],[.5,.18]]){const e=fx('spk',w*a,h*b);e.innerHTML='<svg viewBox="-30 -30 60 60"><path d="M0 -30L9 -9L30 0L9 9L0 30L-9 9L-30 0L-9 -9Z" fill="#ffe27a"/></svg>'}}
function check(){const it=S.cur,d=it.dmg;if(it.ready)return;
 if(d.dust.some(b=>b.o>0)&&d.dust.reduce((s,b)=>s+b.o,0)/d.dust.length<.08){d.dust.forEach(b=>b.o=0);refresh()}
 if(dmgDone(d)){it.ready=true;sparkle();celebrate();haptic('heavy');bmsg(it.broken?'Tamir edildi, yepyeni gibi! Masaya bırakıp rafa koyabilirsin.':'Pırıl pırıl! Masaya bırakıp rafa koyabilirsin.');renderTasks()}}
const nd=new THREE.Vector2();
function ndcAt(x,y){const r=cv.getBoundingClientRect();nd.set((x-r.left)/r.width*2-1,-(y-r.top)/r.height*2+1);return nd}
function benchHit(x,y){const m=S.cur.model;ray.setFromCamera(ndcAt(x,y),bcam);const h=ray.intersectObjects(m.userData.parts,false).find(h=>h.object.material.opacity!==0);if(!h||!h.face)return null;
 const nw=h.face.normal.clone().transformDirection(h.object.matrixWorld),inv=m.matrixWorld.clone().invert();return{p:m.worldToLocal(h.point.clone()),n:nw.transformDirection(inv),x,y}}
function scrPos(o){const v=o.getWorldPosition(V()).project(bcam),r=cv.getBoundingClientRect();return{x:r.left+(v.x+1)/2*r.width,y:r.top+(1-v.y)/2*r.height}}
function scratch(h){const it=S.cur;if(!it.antique||S.speed<(.9+.25*(S.lv.brush||0))||(it.scr||0)>=3)return;const now=Date.now();if(now-(B.ls||0)<700)return;B.ls=now;it.scr=(it.scr||0)+1;haptic('heavy');
 const s=new THREE.Mesh(new THREE.PlaneGeometry(.12,.007),new THREE.MeshBasicMaterial({color:'#fff',transparent:true,opacity:.85,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-4}));s.position.copy(h.p).addScaledVector(h.n,.008);it.model.add(s);s.lookAt(it.model.localToWorld(h.p.clone().addScaledVector(h.n,1)));s.rotateZ(rnd(0,3));
 bmsg(it.scr<3?`Yavaş! Antika çiziliyor (${it.scr}/3). Her çizik değerini düşürür.`:'Antika fena çizildi, değeri epey düştü.');renderTasks()}
function nearNeed(p){const d=S.cur.dmg;
 if(d.dust.some(b=>b.o>0&&p.distanceTo(b.p)<b.r+.05))return'brush';
 if(d.stains.some(s=>s.o>0&&p.distanceTo(s.p)<s.r+.05))return'cloth';
 for(const c of d.cracks)if(c.st!=='done'&&p.distanceTo(c.c)<.2)return c.st==='open'?'glue':'clamp';
 if(d.screws.some(s=>!s.done&&p.distanceTo(s.a.p)<.12))return'driver';
 if(d.tears.some(t=>!t.done&&p.distanceTo(t.c)<.22))return'needle';
 if(d.fades.some(f=>f.o>0&&p.distanceTo(f.p)<f.r+.05))return'paint';
 for(const r of d.rusts)if(r.st!=='done'&&p.distanceTo(r.p)<r.r+.05)return r.st==='rust'?'sand':'polish';
 if(d.parts.some(s=>!s.done&&p.distanceTo(s.p)<.14))return'part';return null}
function tip(p){const w=nearNeed(p);if(w&&w!==S.tool)bmsg(NEED[w],1);return w}
function act(h,type){const it=S.cur,d=it.dmg,hard=1+.1*(S.day-1),L=k=>1+.4*(S.lv[k]||0);let ch=false;const p=h.p;
 if(S.tool==='brush'){const br=L('brush')*.065/hard;d.dust.forEach(b=>{if(b.o>0&&p.distanceTo(b.p)<b.r+.07){b.o=Math.max(0,b.o-br);if(b.o<.06)b.o=0;ch=true}});
  if(ch){rub('brush');scratch(h);if(Math.random()<.25)puff(h.x,h.y)}else tip(p)}
 else if(S.tool==='cloth'){d.stains.forEach(s=>{if(s.o>0&&p.distanceTo(s.p)<s.r+.05){s.o=Math.max(0,s.o-(s.glue?.035:.022/hard)*L('cloth'));if(s.o<.05)s.o=0;ch=true}});d.dust.forEach(b=>{if(b.o>0&&p.distanceTo(b.p)<b.r+.04){b.o=Math.max(0,b.o-.03);if(b.o<.06)b.o=0;ch=true}});
  if(ch){rub('cloth');scratch(h)}else if(d.rusts.some(r=>r.st==='dull'&&p.distanceTo(r.p)<r.r+.05))bmsg('Cilalamak için Cila aletini al.',1);else tip(p)}
 else if(S.tool==='glue'){let near=false,draw=false;
  d.cracks.forEach(c=>{if(c.st!=='open')return;draw=false;for(const q of c.pts){if(p.distanceTo(q.p)<.055){near=true;if(!q.g){if(!c.paid){if(S.glue<=0){bmsg('Tutkal bitti! Reklam izleyerek ya da dükkândan alabilirsin.',1);renderAds();return}S.glue--;c.paid=true;renderTools()}q.g=true;ch=draw=true;rub('squish')}}}
   if(c.pts.every(q=>q.g)){c.st='wet';haptic('light');bmsg('Harika! Şimdi tutkal kurumadan Sıkıştırma aletiyle bastır.')}if(draw)drawCrack(c)});
  if(!near&&type==='move'&&d.cracks.some(c=>c.paid&&c.st==='open')){B.smear=(B.smear||0)+1;if(B.smear>=7&&d.stains.length<8){B.smear=0;const r=rnd(.045,.065);d.stains.push({p:p.clone(),n:h.n.clone(),r,o:1,glue:1,mesh:decal(it.model,p,h.n,r,glueTex)});ch=true;bmsg('Dikkat! Tutkal taştı, bezle silmen gerekecek.')}}
  if(!ch&&type==='down'){const w=tip(p);if((!w||w==='glue')&&d.cracks.every(c=>c.st!=='open'))bmsg('Sürülecek açık çatlak kalmadı.',1)}}
 else if(S.tool==='clamp'){if(type==='down'){const c=d.cracks.find(c=>c.st==='wet'&&p.distanceTo(c.c)<.2);if(c){S.hold={c,t0:performance.now(),k:0};$('ring').hidden=false;placeRing(h.x,h.y);requestAnimationFrame(tick)}else{const w=tip(p);if(!w||w==='clamp'){if(d.cracks.some(c=>c.st==='open'))bmsg('Önce çatlağa tutkal sür.',1);else bmsg('Sıkıştırılacak tutkallı çatlak yok.',1)}}}
  else if(S.hold&&p.distanceTo(S.hold.c.c)>.3){S.hold=null;$('ring').hidden=true;bmsg('Kaydı! Tekrar bas ve sabit tut.')}}
 else if(S.tool==='needle'){const R=.055*(1+.3*(S.lv.needle||0));let near=false;
  for(const t of d.tears){if(t.done)continue;if(p.distanceTo(t.c)<.25)near=true;
   if(t.k===0&&p.distanceTo(t.pts[t.pts.length-1])<R&&p.distanceTo(t.pts[0])>=R)t.pts.reverse();
   if(p.distanceTo(t.pts[t.k])<R){t.k++;ch=true;haptic('light');sfx.stitch();if(t.k>=t.pts.length){t.done=true;haptic('heavy');sfx.pop();cnt('tear');bmsg('Dikiş tamam, yırtık kapandı!')}break}}
  if(!ch&&type==='down'){if(near)bmsg('Parlayan noktadan başla, noktaları sırayla geç.',1);else tip(p)}}
 else if(S.tool==='paint'){const on=d.fades.filter(f=>f.o>0&&p.distanceTo(f.p)<f.r+.05);
  if(!on.length)tip(p);else if(!S.paintCol)bmsg('Önce aşağıdan bir renk seç.',1);else if(S.paintCol!==it.color)bmsg('Bu renk tutmadı! Eşyanın kendi rengini seç.',1);
  else{for(const f of on){f.o=Math.max(0,f.o-.04*L('paint')/hard);if(f.o<.05){f.o=0;cnt('fade')}}ch=true;rub('cloth');if(d.fades.every(f=>f.o<=0)){haptic('light');bmsg('Rengi yepyeni gibi oldu!')}}}
 else if(S.tool==='sand'){for(const r of d.rusts){if(r.st!=='rust'||p.distanceTo(r.p)>=r.r+.05)continue;r.o=Math.max(0,r.o-.03*L('sand')/hard);ch=true;
   if(r.o<=.04){r.st='dull';r.o=1;r.mesh.material.map=dullTex;r.mesh.material.needsUpdate=true;haptic('light');bmsg('Pas gitti! Şimdi Cila ile parlat.')}}
  if(ch){rub('sand');scratch(h);if(Math.random()<.3)puff(h.x,h.y)}else if(d.rusts.some(r=>r.st==='dull'&&p.distanceTo(r.p)<r.r+.05))bmsg(NEED.polish,1);else tip(p)}
 else if(S.tool==='polish'){for(const r of d.rusts){if(r.st!=='dull'||p.distanceTo(r.p)>=r.r+.05)continue;r.o=Math.max(0,r.o-.035*L('cloth')/hard);ch=true;rub('cloth');if(r.o<=.04){r.st='done';r.o=0;haptic('light');sfx.pop();cnt('rust')}}
  if(!ch){if(d.rusts.some(r=>r.st==='rust'&&p.distanceTo(r.p)<r.r+.05))bmsg('Önce zımparala, sonra cilala.',1);else tip(p)}}
 else if(S.tool==='part'&&type==='down'){const s=d.parts.find(s=>!s.done&&p.distanceTo(s.p)<.14);
  if(!s)tip(p);else if(!S.partSel)bmsg('Önce aşağıdan bir parça seç.',1);else if(S.partSel!==s.kind){haptic('heavy');sfx.bad();bmsg(`${PARTS[S.partSel].n} buraya uymuyor. Eşyaya bak, hangisi yakışır?`,1)}
  else{s.done=true;ch=true;haptic('heavy');sfx.click();cnt('part');bmsg(`Tık! ${PARTS[s.kind].n} yerine oturdu.`)}}
 if(ch){refresh();renderTasks();check()}}
function placeRing(x,y){const r=stage.getBoundingClientRect(),g=$('ring');g.style.left=(x-r.left)+'px';g.style.top=(y-r.top)+'px'}
function tick(){if(!S.hold)return;S.hold.k=(performance.now()-S.hold.t0)/((1300+80*S.day)*(1-.2*(S.lv.clamp||0)));$('ring').style.setProperty('--k',Math.min(1,S.hold.k));
 if(S.hold.k>=1){S.hold.c.st='done';S.hold=null;$('ring').hidden=true;haptic('heavy');sfx.click();cnt('crack');bmsg('Sımsıkı yapıştı!');refresh();renderTasks();check();return}requestAnimationFrame(tick)}
function cursor(x,y,show){const c=$('cur');if(!show||S.hold||S.tool==='hand'){c.style.display='none';return}const r=stage.getBoundingClientRect(),vb=toolVB[S.tool],sz=c.offsetWidth||stage.clientWidth*.24;
 const ck=S.tool+(S.tool==='paint'?S.paintCol:'');if(c.dataset.t!==ck){c.innerHTML=`<svg viewBox="${vb.join(' ')}">${toolShape(S.tool)}</svg>`;c.dataset.t=ck}c.style.display='block';const s=sz/Math.max(vb[2],vb[3]);c.style.left=(x-r.left+vb[0]*s-(sz-vb[2]*s)/2)+'px';c.style.top=(y-r.top+vb[1]*s-(sz-vb[3]*s)/2)+'px'}
function benchDown(e){try{cv.setPointerCapture(e.pointerId)}catch(_){}ptrs.set(e.pointerId,{x:e.clientX,y:e.clientY});
 if(ptrs.size>1||S.tool==='hand'||e.button===2){B.rot=true;B.down=true;S.drv=null;if(S.hold){S.hold=null;$('ring').hidden=true}cursor(0,0,false);return}
 B.down=true;B.rot=false;B.lx=e.clientX;B.ly=e.clientY;B.lt=e.timeStamp;S.speed=0;
 if(S.tool==='driver'){const s=S.cur.dmg.screws.find(s=>{if(s.done)return false;const q=scrPos(s.grp);return Math.hypot(q.x-e.clientX,q.y-e.clientY)<48});if(s){const q=scrPos(s.grp);S.drv={s,a:Math.atan2(e.clientY-q.y,e.clientX-q.x)};cursor(e.clientX,e.clientY,true);return}}
 const h=benchHit(e.clientX,e.clientY);cursor(e.clientX,e.clientY,true);if(h)act(h,'down')}
function benchMove(e){const pp=ptrs.get(e.pointerId);
 if(B.rot){if(pp){const k=ptrs.size>1?.5:1;rotBy((e.clientX-pp.x)*k,(e.clientY-pp.y)*k);pp.x=e.clientX;pp.y=e.clientY}return}
 if(pp){pp.x=e.clientX;pp.y=e.clientY}
 if(e.pointerType==='mouse'||B.down)cursor(e.clientX,e.clientY,true);if(!B.down)return;
 const dx=e.clientX-B.lx,dy=e.clientY-B.ly,dt=Math.max(1,e.timeStamp-B.lt);S.speed=S.speed*.6+Math.hypot(dx,dy)/dt*.4;
 if(S.drv){const s=S.drv.s,q=scrPos(s.grp),a=Math.atan2(e.clientY-q.y,e.clientX-q.x);let da=a-S.drv.a;if(da>Math.PI)da-=2*Math.PI;if(da<-Math.PI)da+=2*Math.PI;S.drv.a=a;
  if(Math.hypot(e.clientX-q.x,e.clientY-q.y)>8){s.t+=Math.abs(da)/(1+.05*(S.day-1));if(s.t>=screwNeed()){s.done=true;S.drv=null;haptic('heavy');sfx.click();cnt('screw');bmsg('Çıt! Vida yerine oturdu.');renderTasks();check()}updScrew(s)}}
 else{const n=Math.max(1,Math.ceil(Math.hypot(dx,dy)/8));for(let i=1;i<=n;i++){const x=B.lx+dx*i/n,y=B.ly+dy*i/n,h=benchHit(x,y);if(h)act(h,'move')}}
 B.lx=e.clientX;B.ly=e.clientY;B.lt=e.timeStamp}
function benchUp(e){ptrs.delete(e.pointerId);if(ptrs.size>0)return;B.down=false;B.rot=false;S.drv=null;if(S.hold&&S.hold.k<1){S.hold=null;$('ring').hidden=true;bmsg('Bıraktın! Kuruyana kadar basılı tutmalısın.')}if(e.pointerType!=='mouse')cursor(0,0,false)}

/* ---------- sahne tıklama ---------- */
let downP=null;
cv.addEventListener('pointerdown',e=>{if(S.view==='peek'){try{cv.setPointerCapture(e.pointerId)}catch(_){}ptrs.set(e.pointerId,{x:e.clientX,y:e.clientY});B.rot=true;B.down=true;return}if(S.view==='bench')return benchDown(e);downP={x:e.clientX,y:e.clientY}});
cv.addEventListener('pointermove',e=>{if(S.view==='peek'){const pp=ptrs.get(e.pointerId);if(pp){rotBy((e.clientX-pp.x)/ptrs.size,(e.clientY-pp.y)/ptrs.size);pp.x=e.clientX;pp.y=e.clientY;B.lastRot=performance.now()}return}if(S.view==='bench')return benchMove(e);if(e.pointerType==='mouse'){const pk=pickAt(e.clientX,e.clientY);cv.style.cursor=pk?'pointer':''}});
cv.addEventListener('pointerup',e=>{if(S.view==='peek'){ptrs.delete(e.pointerId);if(!ptrs.size){B.rot=false;B.down=false}return}if(S.view==='bench')return benchUp(e);if(downP&&Math.hypot(e.clientX-downP.x,e.clientY-downP.y)<14)scenePick(e.clientX,e.clientY);downP=null});
cv.addEventListener('contextmenu',e=>e.preventDefault());
cv.addEventListener('pointercancel',e=>{if(S.view==='bench')benchUp(e)});
cv.addEventListener('pointerleave',e=>{if(S.view==='bench'&&e.pointerType==='mouse'&&!B.down)cursor(0,0,false)});
function pickAt(x,y){ray.setFromCamera(ndcAt(x,y),cam);for(const h of ray.intersectObjects([shelfRoot,matG],true)){let o=h.object;while(o&&!o.userData.pick)o=o.parent;if(!o)continue;const pk=o.userData.pick;
 if(S.mode==='morning'&&(pk.act||(pk.cat&&S.cur)))return pk;if(S.mode==='cust'&&pk.id)return pk}return null}
function scenePick(x,y){const pk=pickAt(x,y);if(!pk)return;
 if(S.mode==='morning'){if(pk.act){openBench();return}if(!S.cur.ready){toast('Önce masadaki eşyayı hazırla');return}place(pk.cat)}
 else if(S.mode==='cust')openPeek(pk.id)}

/* ---------- eşyaya yakından bakma ---------- */
function openPeek(id){const it=all().find(x=>x.id===id);if(!it||!S.cc||S.cc.done)return;S.view='peek';S.peek=it;stage.classList.add('inpeek');$('peek').hidden=false;
 $('pkTag').innerHTML=`Etiket: ${plChip(it.place)}${it.antique?' · <b>antika</b>':''}`;const m=it.model;resetM(m);m.position.y=-m.userData.h/2;pivot.clear();ptrs.clear();B.down=false;B.rot=false;B.q.setFromEuler(new THREE.Euler(.3,-.5,0));pivot.quaternion.copy(B.q);pivot.add(m);haptic('light')}
function closePeek(){$('peek').hidden=true;stage.classList.remove('inpeek');S.view='scene';pivot.clear();ptrs.clear();const it=S.peek;S.peek=null;renderAll();return it}
$('pkBack').onclick=()=>closePeek();
$('pkGive').onclick=()=>{const it=closePeek();if(it)give(it.id)};
/* ---------- kayıt ---------- */
const SAVE='keb3d-v2';
const slim=it=>({type:it.type,color:it.color,pattern:it.pattern,place:it.place,owner:it.owner,antique:it.antique,scr:it.scr||0,ry:it.ry,broken:it.broken});
function writeSave(str){if(NATIVE){native({t:'save',d:str});window.__save=str;return}try{str?localStorage.setItem(SAVE,str):localStorage.removeItem(SAVE)}catch(e){}}
function saveGame(){try{writeSave(JSON.stringify({day:S.day,coins:S.coins,rep:S.rep,glue:S.glue,spray:S.spray,lv:S.lv,cos:S.cos,own:S.own,meta:S.meta,hard:S.hard,cap:S.cap,uid:S.uid,sh:Object.fromEntries(CORDER.map(k=>[k,S.sh[k].map(slim)])),carry:S.carry.map(slim)}))}catch(e){}}
function readSave(){try{return JSON.parse(NATIVE?window.__save||'null':localStorage.getItem(SAVE))}catch(e){return null}}
function loadGame(d){Object.assign(S,{day:d.day,coins:d.coins,rep:d.rep,glue:d.glue,spray:d.spray,uid:d.uid,lv:d.lv||{brush:d.upg&&d.upg.brush?1:0,tea:d.upg&&d.upg.tea?2:0},cos:{...S.cos,...(d.cos||{})},own:d.own||[],hard:!!d.hard});applyCos();for(const k of CORDER){S.cap[k]=d.cap[k]||2;S.sh[k]=(d.sh[k]||[]).filter(a=>TYPES[a.type]).map(a=>{const it={...a,id:++S.uid};cleanModel(it);return it})}
 S.carry=(d.carry||[]).filter(a=>TYPES[a.type]).map(a=>{const it={...a,id:++S.uid};genDmg(it);return it})}

/* ---------- gün döngüsü ---------- */
function startDay(){S.mode='brief';S.st={given:0,total:0,earned:0,ads:0,angry:0,early:0,coinAds:0,shopAds:0,fakes:0,placed:0,maxCombo:0,cleanAnt:0,wrongShelf:0,c:{screw:0,crack:0,tear:0,fade:0,rust:0,part:0}};
 S.st.q=QUESTS.filter(q=>(q.d||1)<=S.day).sort(()=>Math.random()-.5).slice(0,3).map(q=>({k:q.k,g:q.g(S.day),done:false}));S.cc=null;S.combo=0;$('bubble').hidden=true;custHold.clear();cust=null;
 S.ev=S.day>=2?R(Object.keys(EVENTS)):null;saveGame();
 const n=Math.min(10,3+S.day);S.box=[...S.carry];S.carry=[];const add=Math.min(12-S.box.length,Math.max(2,n-Math.floor(S.box.length/2)));for(let i=0;i<add;i++)S.box.push(newItem());
 if(S.day%7===0){const ts=['muzik','kupa','cerceve','gozluk','termos','caydanlik'].filter(t=>openCats().includes(TYPES[t].cat)),it=newItem();it.type=R(ts);it.antique=true;it.special=true;genDmg(it);S.box.unshift(it)}
 S.time=480;S.rate=240/(S.box.length*Math.max(14,30-2*(S.day-1)))*(S.hard?1.2:1);
 native({t:'remind',b:S.meta.streak>1?`${S.meta.streak} günlük serin seni bekliyor! Büroya uğra, bugünün ödülünü al.`:`${S.day}. gün başlıyor! Kuyrukta müşteriler var, kayıp eşyalar seni bekliyor.`});renderAll();
 const nc=CORDER.filter(k=>CATS[k].d===S.day&&S.day>1),ncol=Object.keys(COL).filter(k=>COL[k].d===S.day),npl=Object.keys(PLACE).filter(k=>PLACE[k].d===S.day),npat=Object.keys(PAT).filter(k=>PAT[k].d===S.day);
 const news=[...nc.map(k=>`Yeni raf açıldı: <b>${CATS[k].n}</b>`),...ncol.map(k=>`Yeni renk: <b>${COL[k].n}</b>`),...npat.map(k=>`Yeni desen: <b>${PAT[k].n}</b>`),...npl.map(k=>`Yeni yer: ${plChip(k)}`),...TOOLS.filter(t=>t.d===S.day).map(t=>`Yeni alet: <b>${t.n}</b>, ${t.w}.`),...TOWN.filter(x=>x.d===S.day).map(x=>x.n),...(S.day%7===0?['Bugün <b>müze müdürü</b> çok değerli bir antika getirdi! Çizmeden onar, müdür cömert öder.']:[]),...(S.day===20&&!S.hard?['20. gün! Artık gerçek bir ustasın. Yeni oyunda <b>Zor mod</b>u da dene.']:[]),
 ...Object.entries(COS).flatMap(([g,c])=>Object.entries(c.o).filter(([k,o])=>o.season&&o.season.includes(MONTH)&&!owns(g+':'+k)).map(([k,o])=>`Mevsimlik: dükkânda sınırlı süre <b>${o.n}</b> ${c.n.toLocaleLowerCase('tr')} var.`)),...(S.day===4?['Bazı müşteriler eşyanın sahibi değil! Tarifine uyan eşya yoksa <b>Bizde yok</b> de.','Müşteriler renkleri artık süslü anlatıyor: "gökyüzü mavisi" gibi.']:[])];
 S.news=news;brief()}
function brief(){const news=S.news||[];
 modal(`<h2>${S.day}. gün${S.hard?' <small class="hardtag">Zor mod</small>':''}</h2>${S.ev?`<p><b>${EVENTS[S.ev].n}:</b> ${EVENTS[S.ev].d}</p>`:''}<p>Kolide <b>${S.box.length}</b> eşya var. Büro <b>12:00</b>'de açılıyor.</p>${news.length?`<ul>${news.map(x=>`<li>${x}</li>`).join('')}</ul>`:''}<p><b>Bugünün görevleri</b></p><ul class="qs">${S.st.q.map(q=>`<li>${QUESTS.find(x=>x.k===q.k).n(q.g)}</li>`).join('')}</ul>${S.st.gift?`<p>Bugünkü hediyen: <b>${S.st.gift}</b></p>`:''}<div class="row">${S.st.gift?'':'<button class="ad" id="gift">Günlük hediye</button>'}<button class="main" id="begin">İşe başla</button></div>`);
 $('begin').onclick=()=>{close();S.mode='morning';nextItem()};
 if($('gift'))$('gift').onclick=()=>showAd('günlük hediye',()=>{const g=R(GIFTS);g.f();S.st.gift=g.n;renderAll();brief()},brief)}
function nextItem(){S.cur=S.box.shift()||null;if(!S.cur){S.st.early=Math.floor((720-S.time)/15);startCustomers();return}renderAll()}
function morningOver(){if(S.mode!=='morning')return;if(S.view==='bench')closeBench();const left=[S.cur,...S.box].filter(Boolean);S.carry=left;S.cur=null;S.box=[];
 toast(left.length?`Saat 12:00! ${left.length} eşya yarına kaldı.`:'Saat 12:00!');startCustomers()}
function place(cat){const it=S.cur;if(it.special){toast('Bu antika müze müdürüne teslim edilecek, aşağıdaki düğmeye bas.');return}
 if(TYPES[it.type].cat!==cat){S.time+=8;haptic('heavy');sfx.bad();S.st.wrongShelf=(S.st.wrongShelf||0)+1;toast(`${TYPES[it.type].n} bu rafa ait değil (−8 dk)`);const m=SH[cat].hl.children[0].material;m.color.set('#e2543a');setTimeout(()=>m.color.set('#ffe07a'),500);renderHUD();return}
 if(S.sh[cat].length>=S.cap[cat]){const more=S.cap[cat]<3;
  const old=S.sh[cat][0],back=()=>place(cat),arch=()=>{S.sh[cat]=S.sh[cat].filter(x=>x!==old);toast(`${TYPES[old.type].n} arşive kaldırıldı`);place(cat)};
  modal(`<h2>Raf dolu!</h2><p>${CATS[cat].n} rafında yer kalmadı.${more?' Yeni bir bölme açabilirsin.':' Bu raf en büyük hâlinde.'} Ya da en eski eşyayı (<b>${label(old)}</b>) arşive kaldırıp yer açabilirsin.</p><div class="row">${more?`<button class="ad" id="m1">+1 bölme</button><button id="m2" ${S.coins<20?'disabled':''}>Bölme · 20 altın</button>`:''}<button class="ad" id="m4">Yer aç</button><button id="m5" ${S.coins<10?'disabled':''}>Yer aç · 10 altın</button><button id="m3">Bu eşyayı depoya kaldır</button></div>`);
  if(more){$('m1').onclick=()=>showAd('+1 raf bölmesi',()=>{S.cap[cat]++;place(cat)},back);$('m2').onclick=()=>{S.coins-=20;S.cap[cat]++;close();place(cat)}}
  $('m4').onclick=()=>showAd('rafta yer açma',arch,back);$('m5').onclick=()=>{S.coins-=10;close();arch()};
  $('m3').onclick=()=>{close();toast('Eşya depoya kaldırıldı');nextItem()};return}
 S.sh[cat].push(it);it.model.userData.drop=performance.now();haptic('light');sfx.pop();S.st.placed++;toast(`${TYPES[it.type].n} rafa kondu`);checkQuests();nextItem()}
function patUI(){const c=S.cc;if(!c)return;const v=Math.max(0,c.pat);$('patb').style.width=(v*100).toFixed(0)+'%';$('patb').style.background=v>.5?'#5fb36b':v>.25?'#f2b84e':'#e2543a'}
function fakeFor(){const pool=all();if(pool.length<2)return null;for(let t=0;t<20;t++){const b=R(pool),f={type:b.type,color:b.color,pattern:b.pattern,place:b.place};const k=R(['color','pattern','place']);
  const opts=k==='color'?avail(COL):k==='pattern'?avail(PAT):avail(PLACE);f[k]=R(opts.filter(o=>o!==b[k]));if(!pool.some(it=>it.type===f.type&&it.color===f.color&&it.pattern===f.pattern&&it.place===f.place))return f}return null}
function startCustomers(){S.mode='cust';S.patT=Math.max(12,30-2.5*(S.day-1))*(1+.15*(S.lv.tea||0))*(S.hard?.75:1)*(S.ev==='tren'?.8:1);
 const pool=all().slice().sort(()=>Math.random()-.5),n=Math.min(pool.length,2+S.day+(S.ev==='pazar'?2:0));
 S.cust=pool.slice(0,n).map(it=>({item:it,owner:it.owner,pat:1}));
 if(S.day>=4){const nf=Math.min(3,Math.floor(S.day/4)+(Math.random()<.5?1:0));for(let i=0;i<nf;i++){const f=fakeFor();if(f)S.cust.splice(Math.floor(Math.random()*(S.cust.length+1)),0,{item:{...f,id:-1},owner:R(Object.keys(ANI)),pat:1,fake:true})}}
 S.st.total=S.cust.length;
 toast(`Büro açıldı! Hedef: kimseyi kızdırma (+${15+5*S.day} altın)`);renderAll();setTimeout(nextCustomer,600)}
function pref(){return S.day===1?['type','color','pattern','place']:S.day===2?['color','pattern','type','place']:S.day<6?['category','pattern','place','color','type']:['category','place','pattern','color','type']}
function clueAttrs(t,fake){if(fake)return['type','color','pattern','place'];const list=pref(),attrs=list.slice(0,2),pool=all();const cnt=()=>pool.filter(it=>attrs.every(a=>val(it,a)===val(t,a))).length;
 for(const a of[...list,'type','color','pattern','place']){if(cnt()===1)break;if(!attrs.includes(a))attrs.push(a)}
 if(S.day>=4&&attrs.length<4&&Math.random()<.4){const extra=['type','color','pattern','place'].find(a=>!attrs.includes(a));if(extra)attrs.push(extra)}return attrs}
function clueHTML(c){const t=c.item,has=a=>c.attrs.includes(a),fancy=S.day>=4&&!c.plain,cn=fancy?COL[t.color].alt:COL[t.color].n;
 const obj=has('type')?(has('color')?cn+' ':'')+TYPES[t.type].acc:has('category')?CATS[TYPES[t.type].cat].ph:'bir eşyamı';
 let s=has('place')?`Dün ${PLACE[t.place].loc} ${obj} düşürdüm. ${plChip(t.place)}`:`${cap(obj)} kaybettim.`;
 if(has('color')&&!has('type'))s+=` Rengi ${fancy?COL[t.color].altw:COL[t.color].was}.`;if(has('pattern'))s+=' '+PAT[t.pattern].s;return c.hi+' '+s}
function say(h){$('ctext').innerHTML=h;$('bubble').hidden=false}
function nextCustomer(){const q=S.cust.shift();if(!q){endDay();return}
 sfx.bell();const c=S.cc={...q,attrs:clueAttrs(q.item,q.fake),wrong:0,hint:false,hi:R(HELLO),pat:Math.max(.35,q.pat),arrived:false};drawCust('neutral',true);say(clueHTML(c));patUI();renderNote();setTimeout(()=>{if(S.cc===c)c.arrived=true},700)}
function angry(){const c=S.cc;c.done=true;if(S.view==='peek')closePeek();drawCust('sad');say('Bu kadar beklenir mi! Ben gidiyorum.');haptic('heavy');sfx.bad();S.rep=Math.max(0,S.rep-1);S.perf=0;S.combo=0;S.st.angry++;toast('Müşteri kızıp gitti, itibar −1');renderAll();
 if(S.rep<=0){setTimeout(gameOver,1400);return}setTimeout(nextCustomer,2000)}
function gameOver(){modal(`<h2>Büro kapanmak üzere!</h2><p>İtibarın sıfıra düştü, kasabalılar artık büroya güvenmiyor.</p><div class="row"><button class="ad" id="again">İkinci şans: itibar 2</button><button id="reset">Baştan başla</button></div>`);
 $('again').onclick=()=>showAd('ikinci şans',()=>{S.rep=2;renderHUD();if(S.mode==='cust')nextCustomer()},gameOver);$('reset').onclick=()=>{writeSave(null);setTimeout(()=>location.reload(),150)}}
function reward(base){const gain=Math.round(base*(.5+.15*S.rep)*comboMul()*(S.hard?1.5:1));S.coins+=gain;S.st.earned+=gain;return gain}
function refuse(){const c=S.cc;if(!c||c.done)return;
 if(c.fake){c.done=true;S.st.fakes++;S.combo++;S.st.maxCombo=Math.max(S.st.maxCombo,S.combo);sfx.coin();checkQuests();const g=reward(6);drawCust('sad');say(`Hıh... peki, ben bir de başka yere bakayım. <b style="display:inline;color:#2f7d63">Doğru karar! +${g} altın</b>`);haptic('light');renderAll();setTimeout(nextCustomer,2000);return}
 c.pat-=.3;S.combo=0;S.perf=0;patUI();haptic('heavy');sfx.bad();drawCust('sad');say('Ama eminim, buraya getirilmişti! Lütfen bir daha bak. '+clueHTML(c));renderHUD();if(c.pat<=0)angry()}
function give(id){const c=S.cc;if(!c||c.done)return;const it=all().find(x=>x.id===id);if(!it)return;
 if(c.fake){c.done=true;const cat=TYPES[it.type].cat;S.sh[cat]=S.sh[cat].filter(x=>x.id!==id);S.rep=Math.max(0,S.rep-1);S.combo=0;S.perf=0;haptic('heavy');
  drawCust('happy');say('Hehe, çok teşekkürler! <b style="display:inline;color:#a3341f">Bu kişi eşyanın sahibi değildi. Tarife uyan eşya yoktu! İtibar −1</b>');const m=it.model;resetM(m);m.scale.setScalar(.5);m.position.set(.32,1.05,.5);cust.add(m);renderAll();if(S.rep<=0){setTimeout(gameOver,1600);return}setTimeout(nextCustomer,2600);return}
 if(id!==c.item.id){c.wrong++;S.perf=0;S.combo=0;haptic('heavy');sfx.bad();it.model.userData.shake=performance.now();c.pat-=.25;patUI();renderHUD();if(c.pat<=0){angry();return}drawCust('sad');say(R(['Hmm, bu benim değil...','Yok yok, benimki öyle değildi.','Bu değil, dikkatli bak lütfen.'])+' '+clueHTML(c));return}
 c.done=true;const cat=TYPES[c.item.type].cat;S.sh[cat]=S.sh[cat].filter(x=>x.id!==id);haptic('light');
 let base=Math.max(3,10-3*c.wrong-(c.hint?2:0))+(c.item.broken?5:0)+Math.round(c.pat*4);if(c.item.antique)base+=Math.round(base*(1-.34*(c.item.scr||0)));
 if(c.item.antique&&!c.item.scr)S.st.cleanAnt++;
 if(!c.wrong&&!c.hint){S.perf++;S.combo++;S.st.maxCombo=Math.max(S.st.maxCombo,S.combo);if(S.perf%3===0&&S.rep<5){S.rep++;setTimeout(()=>toast('3 kusursuz teslimat! İtibar +1'),600)}}
 const gain=reward(base);S.st.given++;sfx.coin();const extra=collect(c.item,c.owner);checkQuests();
 drawCust('happy');say((c.item.antique?(c.item.scr?'Biraz çizilmiş ama olsun, büyükannemden kalmıştı. ':'Büyükannemden kalmıştı, tek çizik yok! '):'')+(c.item.broken?'Üstelik tamir etmişsiniz! ':'')+(THANKS[c.item.type]&&Math.random()<.7?THANKS[c.item.type]:R(['Ah, işte bu! Çok teşekkür ederim!','Bunu bulacağımı hiç düşünmemiştim!','Kalbim yerine geldi, sağ ol!']))+` <b style="display:inline;color:#b8860b">+${gain} altın${S.combo>=2?` · seri ×${comboMul().toFixed(1)}`:''}</b>`+extra);
 const m=c.item.model;resetM(m);m.scale.setScalar(.5);m.position.set(.32,1.05,.5);cust.add(m);renderAll();setTimeout(nextCustomer,2100)}
function endDay(){S.mode='end';S.cc=null;$('bubble').hidden=true;custHold.clear();cust=null;const st=S.st;st.goal=st.angry===0&&st.total>0?15+5*S.day:0;const bonus=st.goal+st.early;S.coins+=bonus;st.earned+=bonus;renderAll();summary()}
function summary(){const st=S.st;if(!S.meta.asked){S.meta.asked=true;native({t:'notifyAsk'})}
 modal(`<h2>${S.day}. gün bitti</h2><div class="sum"><span>Teslim edilen eşya</span><b>${st.given}</b><span>Yakalanan sahtekâr</span><b>${st.fakes}</b><span>Kızıp giden müşteri</span><b>${st.angry}</b><span>Günün hedefi: kimseyi kızdırma</span><b>${st.goal?'+'+st.goal:'olmadı'}</b><span>Erken açılış bonusu</span><b>+${st.early}</b><span>Yarına kalan eşya</span><b>${S.carry.length}</b>${st.museum?`<span>Müze ödülü</span><b>+${st.museum}</b>`:''}<span>Tamamlanan görev</span><b>${st.q.filter(q=>q.done).length}/${st.q.length}</b><span>Bugün kazanılan altın</span><b>${st.earned}${st.dbl?' ×2':''}</b></div><div class="row">${st.dbl||!st.earned?'':'<button class="ad" id="dbl">Kazancı 2 katına çıkar</button>'}<button class="main" id="shopB">Dükkâna git</button></div>`);
 if($('dbl'))$('dbl').onclick=()=>showAd('günlük kazanç 2 katı',()=>{S.coins+=st.earned;st.dbl=true;renderHUD();summary()},summary);$('shopB').onclick=()=>{if(S.day>=2&&!st.dbl)native({t:'interstitial'});shop('mal')}}
const SHOP=[{n:'Tutkal tüpü ×2',d:'Her çatlak bir tüp harcar',p:15,f:()=>{S.glue+=2}},{n:'Parlatma spreyi ×2',d:'Toz ve lekeyi anında siler',p:22,f:()=>{S.spray+=2}},
 {n:'Raf bölmesi +1',d:'En dolu açık rafa eklenir (en fazla 3)',p:35,ok:()=>openCats().some(k=>S.cap[k]<3),f:()=>{const k=openCats().filter(k=>S.cap[k]<3).sort((a,b)=>S.sh[b].length/S.cap[b]-S.sh[a].length/S.cap[a])[0];S.cap[k]++}}];
const upP=u=>(u.p||UPP)[S.lv[u.k]||0];
function applyCos(){redraw(wallTex);WCL.forEach(t=>t.needsUpdate=true);redraw(gridTex);BCL.forEach(t=>t.needsUpdate=true);const G=MATS[S.cos.mat]||MATS.yesil;bscene.background.set(G.bg);bscene.fog.color.set(G.bg);
 const b=BOXES[S.cos.box]||BOXES.ceviz;for(const[k,v]of[['--tb',b.a],['--tbs',b.s],['--tt',b.t],['--tts',b.ts]])stage.style.setProperty(k,v)}
function shop(tab){tab=tab||S.shopTab||'mal';S.shopTab=tab;const T={mal:'Malzeme',upg:'Geliştirme',cos:'Görünüm'};let body='';
 if(tab==='mal')body=SHOP.map((x,i)=>{const ok=!x.ok||x.ok(),poor=S.coins<x.p;return `<div><span>${x.n}<small>${x.d}</small></span>${ok&&poor&&S.st.shopAds<3?`<button class="ad" data-adbuy="${i}">Reklamla al</button>`:`<button data-buy="${i}" ${!ok||poor?'disabled':''}>${x.p} altın</button>`}</div>`}).join('');
 if(tab==='upg')body=UPG.filter(u=>(u.day||1)<=S.day).map(u=>{const lv=S.lv[u.k]||0,max=lv>=3,p=max?0:upP(u);return `<div><span>${u.n} <i class="pips" aria-label="Seviye ${lv}/3">${'●'.repeat(lv)}${'○'.repeat(3-lv)}</i><small>${u.d}</small></span><button data-up="${u.k}" ${max||S.coins<p?'disabled':''}>${max?'En üst':p+' altın'}</button></div>`}).join('');
 if(tab==='cos')body=Object.entries(COS).map(([g,c])=>`<h3>${c.n}</h3>`+Object.entries(c.o).filter(([k,o])=>owns(g+':'+k)||(!o.ex&&(!o.season||o.season.includes(MONTH)))).map(([k,o])=>{const own=k===Object.keys(c.o)[0]||owns(g+':'+k),on=S.cos[g]===k;return `<div><span><i class="swc" style="background:${c.sw(o)}"></i>${o.n}${o.season?'<small>Sınırlı süre</small>':o.ex?'<small>Giriş serisi ödülü</small>':''}</span><button data-cos="${g}:${k}" ${on||(!own&&S.coins<c.p)?'disabled':''}>${on?'Kullanılıyor':own?'Kullan':c.p+' altın'}</button></div>`}).join('')).join('');
 modal(`<h2>Dükkân</h2><p>Altının: <b>${S.coins}</b> · Tutkal: <b>${S.glue}</b> · Sprey: <b>${S.spray}</b></p><div class="tabs" role="tablist">${Object.entries(T).map(([k,n])=>`<button role="tab" aria-selected="${k===tab}" class="${k===tab?'on':''}" data-tab="${k}">${n}</button>`).join('')}</div><div class="shop">${body}</div><div class="row">${S.st.coinAds<3?'<button class="ad" id="coinAd">+10 altın</button>':''}<button class="main" id="nd">${S.day+1}. güne başla</button></div>`);
 const q=sel=>$('mcard').querySelectorAll(sel);
 q('[data-tab]').forEach(b=>b.onclick=()=>shop(b.dataset.tab));
 q('[data-buy]').forEach(b=>b.onclick=()=>{const x=SHOP[+b.dataset.buy];S.coins-=x.p;x.f();sfx.coin();renderAll();shop()});
 q('[data-adbuy]').forEach(b=>b.onclick=()=>{const x=SHOP[+b.dataset.adbuy];showAd(x.n,()=>{S.st.shopAds++;x.f();renderAll();shop()},shop)});
 q('[data-up]').forEach(b=>b.onclick=()=>{const u=UPG.find(u=>u.k===b.dataset.up);S.coins-=upP(u);S.lv[u.k]=(S.lv[u.k]||0)+1;haptic('light');sfx.good();renderAll();shop()});
 q('[data-cos]').forEach(b=>b.onclick=()=>{const id=b.dataset.cos,[g,k]=id.split(':'),c=COS[g];if(Object.keys(c.o)[0]!==k&&!owns(id)){S.coins-=c.p;S.own.push(id);sfx.coin()}S.cos[g]=k;applyCos();renderAll();shop()});
 if($('coinAd'))$('coinAd').onclick=()=>showAd('10 altın',()=>{S.coins+=10;S.st.coinAds++;renderHUD();shop()},shop);
 $('nd').onclick=()=>{close();S.day++;startDay()}}
setInterval(()=>{if(!$('modal').hidden||S.paused)return;
 if(S.mode==='morning'){S.time+=.2*S.rate;if(S.time>=720){S.time=720;morningOver();return}const late=S.time>=660;$('sTime').textContent=fmt(S.time);$('cClock').classList.toggle('late',late);const bt=$('bt');if(bt){bt.textContent=fmt(S.time);bt.classList.toggle('late',late)}}
 else{$('cClock').classList.remove('late');if(S.mode==='cust'){if(S.cc&&!S.cc.done&&S.cc.arrived){S.cc.pat-=.2/S.patT;patUI();if(S.cc.pat<.4&&!S.cc.extN){S.cc.extN=true;renderNote()}if(S.cc.pat<=0){angry();return}}
  for(const w of S.cust.slice()){w.pat-=.2/S.patT*.3;if(w.pat<=0){S.cust.splice(S.cust.indexOf(w),1);S.rep=Math.max(0,S.rep-1);S.st.angry++;S.combo=0;toast(`Kuyruktaki ${ANI[w.owner].n} beklemekten sıkılıp gitti! İtibar −1`);haptic('heavy');renderHUD();if(S.rep<=0){gameOver();return}}}
  if(Math.random()<.1)renderNote()}}},200);

/* ---------- çizim döngüsü ---------- */
let last=performance.now(),fr=0;
function frame(t){const dt=Math.min(.05,(t-last)/1000);last=t;fr++;
 if(S.view==='scene'){if(fr%3===0)redraw(outTex,t);
  if(cust){const u=cust.userData,k=Math.min(1,(t-u.t0)/700),e=1-Math.pow(1-k,3);cust.position.x=(1-e)*3;const mt=t-u.mt;
   cust.position.y=(k<1?Math.abs(Math.sin(t/90))*.06:Math.sin(t/500)*.015)+(u.mood==='happy'&&mt<900?Math.abs(Math.sin(mt/140))*.15:0);cust.rotation.z=Math.sin(t/900)*.03;u.head.rotation.x=u.mood==='sad'?.28:Math.sin(t/1300)*.05;u.head.rotation.z=u.mood==='neutral'?Math.sin(t/1700)*.08:0}
  if(S.cur&&S.cur.model.parent===matHold)S.cur.model.rotation.y+=dt*.6;
  ring3.scale.setScalar(1+Math.sin(t/250)*.05);ringM.opacity=.55+.3*Math.sin(t/250);
  spkG.children.forEach((s,i)=>{const a=s.userData.a+t/700;s.position.set(Math.cos(a)*.42,.3+Math.sin(t/300+i)*.12,Math.sin(a)*.42);s.rotation.y=t/300});
  for(const k in SH){SH[k].hl.children[0].material.opacity=.1+.08*Math.sin(t/200)}
  for(const it of all()){const m=it.model,u=m.userData;if(u.shake){const k=(t-u.shake)/450;m.rotation.z=k<1?Math.sin(k*30)*.18*(1-k):0;if(k>=1)u.shake=0}if(u.drop&&u.by!==undefined){const k=(t-u.drop)/450;m.position.y=u.by+(k<1?(1-k)*(1-k)*.5:0);if(k>=1)u.drop=0}}
  if(fr%4===0)placeLabels(true);renderer.render(scene,cam)}
 else{if(fr%30===0)placeLabels(false);if(S.spin){if(t-S.spin<1100)rotBy(dt*520,0);else S.spin=0}if(S.view==='peek'&&!ptrs.size&&performance.now()-(B.lastRot||0)>1500)rotBy(dt*40,0);pivot.quaternion.slerp(B.q,Math.min(1,dt*12));renderer.render(bscene,bcam)}
 requestAnimationFrame(frame)}

function placeLabels(on){const w=stage.clientWidth,h=stage.clientHeight;for(const k of CORDER){const l=SH[k].lt;if(!on){l.style.display='none';continue}const v=l.userData.clone().project(cam);l.style.display='';l.style.left=((v.x+1)/2*w).toFixed(1)+'px';l.style.top=((1-v.y)/2*h).toFixed(1)+'px'}}
/* ---------- görevler, albüm, dostluk, giriş serisi ---------- */
function cnt(k){S.st.c[k]++;checkQuests()}
function checkQuests(){const st=S.st;if(!st||!st.q)return;let any=false;
 for(const q of st.q){if(q.done)continue;const Q=QUESTS.find(x=>x.k===q.k);if(Q.v(st)<q.g)continue;q.done=any=true;const g=Math.round((10+3*S.day)*(S.hard?1.5:1));S.coins+=g;st.earned+=g;
  setTimeout(()=>{sfx.coin();toast(`Görev tamam: ${Q.n(q.g)} · +${g} altın`)},900);
  if(st.q.every(x=>x.done)){S.glue+=2;setTimeout(()=>{sfx.good();toast('Bütün görevler bitti! Bonus: +2 tutkal')},3300)}}
 if(any)renderHUD()}
function questModal(){const st=S.st;if(!st||!st.q)return;
 modal(`<h2>Bugünün görevleri</h2><div class="qlist">${st.q.map(q=>{const Q=QUESTS.find(x=>x.k===q.k),v=Math.min(q.g,Q.v(st));return `<div class="${q.done?'ok':''}"><span>${q.done?'✓ ':''}${Q.n(q.g)}</span><small>${v}/${q.g}</small><div class="bar"><b style="width:${v/q.g*100}%"></b></div></div>`}).join('')}</div><p>Her görev <b>${Math.round((10+3*S.day)*(S.hard?1.5:1))} altın</b> verir. Üçünü de bitirirsen <b>+2 tutkal</b> bonus.</p><div class="row"><button class="main" id="qClose">Tamam</button></div>`);$('qClose').onclick=close}
function collect(it,owner){const m=S.meta,a=m.album[it.type]=m.album[it.type]||[];let msg='';
 if(!a.includes(it.color)){a.push(it.color);msg+=a.length===1?' <b style="display:inline;color:#2f7d63">Albüme yeni eşya!</b>':''}
 const cat=TYPES[it.type].cat;if(!m.sets[cat]&&Object.keys(TYPES).filter(t=>TYPES[t].cat===cat).every(t=>(m.album[t]||[]).length)){m.sets[cat]=true;S.coins+=40;setTimeout(()=>{sfx.good();toast(`${CATS[cat].n} seti tamamlandı! +40 altın`)},1800)}
 const f=m.fr[owner]=(m.fr[owner]||0)+1,li=FRL.indexOf(f);if(li>=0){FGIFT[li].f();msg+=`<br><i>“${FRIEND[owner][li]}”</i> <b style="display:inline;color:#b8860b">Dostluk ${li+1}. kalp · Hediye: ${FGIFT[li].n}</b>`;setTimeout(()=>sfx.good(),400)}return msg}
function album(tab){tab=tab||'esya';const m=S.meta,all=Object.keys(TYPES);let body='';
 if(tab==='esya'){const got=all.filter(t=>(m.album[t]||[]).length).length;body=`<p>Toplanan tür: <b>${got}/${all.length}</b>. Bir rafın bütün eşyalarını teslim edersen seti tamamlarsın: <b>+40 altın</b>.</p>`+CORDER.map(cat=>`<h3>${CATS[cat].n}${m.sets[cat]?' <small class="ok">Set tamam</small>':''}</h3><div class="alb">${all.filter(t=>TYPES[t].cat===cat).map(t=>{const a=m.album[t]||[];return `<div class="${a.length?'':'no'}"><span>${a.length?TYPES[t].n:'???'}</span><span class="dots" aria-label="${a.length} renk">${Object.keys(COL).map(c=>`<i style="${a.includes(c)?'background:'+COL[c].h+';border-color:'+COL[c].h:''}"></i>`).join('')}</span></div>`}).join('')}</div>`).join('')}
 else body=Object.keys(ANI).map(k=>{const f=m.fr[k]||0,lv=FRL.filter(x=>f>=x).length,nx=FRL[lv],a=ANI[k];return `<div class="fr"><i class="face" style="background:${a.c};border-color:${a.d}"></i><span><b>${a.n}</b><small>${f} teslimat${nx?` · sonraki kalp: ${nx}. teslimat`:' · en yakın dost!'}</small>${lv?`<small><i>“${FRIEND[k][lv-1]}”</i></small>`:''}</span><span class="hearts" aria-label="${lv}/4 kalp">${'♥'.repeat(lv)}${'♡'.repeat(4-lv)}</span></div>`}).join('');
 modal(`<h2>Albüm</h2><div class="tabs" role="tablist"><button role="tab" class="${tab==='esya'?'on':''}" aria-selected="${tab==='esya'}" data-at="esya">Eşyalar</button><button role="tab" class="${tab==='dost'?'on':''}" aria-selected="${tab==='dost'}" data-at="dost">Müşteriler</button></div><div class="albw">${body}</div><div class="row"><button class="main" id="aClose">Kapat</button></div>`);
 $('mcard').querySelectorAll('[data-at]').forEach(b=>b.onclick=()=>album(b.dataset.at));$('aClose').onclick=close}
const dayKey=d=>`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
function streakCheck(next){const m=S.meta,today=dayKey(new Date()),y=new Date();y.setDate(y.getDate()-1);if(m.last===today){next();return}
 m.streak=m.last===dayKey(y)?m.streak+1:1;m.last=today;const i=(m.streak-1)%7,r=STREAK[i];
 modal(`<h2>Giriş serisi: ${m.streak}. gün</h2><p>Her gün uğra, ödüller büyüsün. Bir gün atlarsan seri baştan başlar.</p><div class="streak">${STREAK.map((x,j)=>`<div class="${j<i?'got':j===i?'now':''}"><b>${j+1}</b><small>${x.n}</small></div>`).join('')}</div><div class="row"><button class="main" id="sOk">Ödülü al: ${r.n}</button></div>`);
 $('sOk').onclick=()=>{r.f();actx();sfx.coin();close();next()}}
function celebrate(){sfx.good();S.spin=performance.now();const e=document.createElement('div');e.className='cele';e.textContent=R(['Pırıl pırıl!','Yepyeni!','Harika iş!','Usta eller!']);stage.appendChild(e);setTimeout(()=>e.remove(),1700);
 const w=stage.clientWidth,h=stage.clientHeight;for(let i=0;i<26;i++)fx('conf',w*rnd(.25,.75),h*rnd(.28,.42),`--dx:${rnd(-140,140)}px;--dy:${rnd(60,280)}px;--r:${rnd(-500,500)}deg;background:${R(['#e2543a','#f2c14e','#5fb36b','#4d8fd6','#f09bb5'])}`)}
function sndIcon(){const b=$('bSnd'),v=S.meta.snd;b.setAttribute('aria-label',['Ses kapalı','Sadece efektler','Ses ve müzik açık'][v]);
 b.innerHTML=`<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 7h3l4-3v12l-4-3H3z" fill="#6e4426"/>${v?'<path d="M13 7q2 3 0 6" stroke="#6e4426" stroke-width="1.8" fill="none" stroke-linecap="round"/>':'<path d="M13 7l5 6M18 7l-5 6" stroke="#e2543a" stroke-width="2" stroke-linecap="round"/>'}${v===2?'<path d="M15.5 4.5q4 5.5 0 11" stroke="#6e4426" stroke-width="1.8" fill="none" stroke-linecap="round"/>':''}</svg>`}
$('bSnd').onclick=()=>{S.meta.snd=(S.meta.snd+2)%3;actx();sndIcon();if(S.meta.snd)sfx.tick();toast(['Ses kapalı','Sadece efekt sesleri','Ses ve müzik açık'][S.meta.snd])};
$('cQuest').onclick=()=>{sfx.tick();questModal()};$('bAlb').onclick=()=>{sfx.tick();album()};
/* ---------- başlangıç ---------- */
function intro(){const sv=readSave();if(sv&&sv.meta)S.meta={...S.meta,...sv.meta};renderHUD();
 modal(`<h2>Minik Şehir'e hoş geldin!</h2><p>İstasyonun karşısındaki kayıp eşya bürosu artık senin.</p><ol><li>Tezgâhtaki eşyaya dokun. Çalışma masasında <b>El</b> aletiyle ya da iki parmakla eşyayı her yöne çevir.</li><li><b>Fırça</b> ile tozu al, <b>bez</b> ile lekeyi ov. Çatlağa <b>tutkal</b> sür, <b>sıkıştırma</b> aletiyle bastır. Gevşek vidaları <b>tornavida</b> ile daire çizerek sık. İlerleyen günlerde <b>iğne</b>, <b>boya</b>, <b>zımpara</b>, <b>cila</b> ve yedek <b>parçalar</b> gelir.</li><li>Eşyayı doğru rafa koy. Büro <b>12:00</b>'de açılır, yetişmeyenler ertesi güne kalır.</li><li>Müşteriler kuyrukta bekler. Sabırları bitmeden doğru eşyayı bul, yoksa <b>itibarın</b> düşer.</li><li>Her gün 3 <b>görev</b> var. Teslim ettiğin eşyalar <b>albüme</b> girer, sık gelen müşterilerle dost olursun.</li></ol><p>Günler ilerledikçe yeni raflar, renkler ve zorluklar gelir. Etiketlerdeki simge eşyanın bulunduğu yeri gösterir:</p><div class="legend">${Object.keys(PLACE).filter(k=>!PLACE[k].d).map(plChip).join('')}</div><div class="row">${sv?`<button class="main" id="cont">Devam et · ${sv.day}. gün</button><button id="go">Yeni oyun</button>`:'<button class="main" id="go">Büroyu aç</button>'}<button id="goHard">Zor mod</button></div>`);
 const fresh=hard=>{close();writeSave(null);S.hard=hard;streakCheck(startDay)};$('go').onclick=()=>fresh(false);$('goHard').onclick=()=>fresh(true);if($('cont'))$('cont').onclick=()=>{close();loadGame(sv);streakCheck(startDay)}}
if(location.hash==='#test'){const pr=(v,c)=>{v.project(c);const r=cv.getBoundingClientRect();return{x:r.left+(v.x+1)/2*r.width,y:r.top+(1-v.y)/2*r.height}};
 window.__T={rot:(y,x)=>{B.q.setFromEuler(new THREE.Euler(x,y,0));pivot.quaternion.copy(B.q);pivot.updateMatrixWorld(true)},scr:o=>scrPos(o),lp:p=>pr(S.cur.model.localToWorld(p.clone()),bcam),wp:(x,y,z)=>pr(V(x,y,z),cam),mp:m=>pr(m.getWorldPosition(V()).add(V(0,.12,0)),cam),vis:(arr)=>{const m=S.cur.model,cp=bcam.position;return S.cur.dmg[arr].map((d,i)=>{if(d.o<=0)return -1;const pw=m.localToWorld(d.p.clone()),nw=d.n.clone().transformDirection(m.matrixWorld);return nw.dot(cp.clone().sub(pw).normalize())>.25?i:-1}).filter(i=>i>=0)},pick:(x,y)=>pickAt(x,y),give:id=>{openPeek(id);const it=closePeek();give(it.id)},comp:k=>{const C=COMP[k];return pr(V((C.x0+C.x1)/2,(C.yb+C.yt)/2,-1.5),cam)},act:(p,type)=>act({p:p.clone(),n:V(0,0,1),x:0,y:0},type),ob:()=>openBench(),cb:()=>closeBench(),place:c=>place(c),shop:t=>shop(t),fresh:ty=>{S.cur.model.parent&&S.cur.model.parent.remove(S.cur.model);if(ty)S.cur.type=ty;S.cur.gen=(S.cur.gen||0)+1;genDmg(S.cur);openBench()},cat:()=>TYPES[S.cur.type].cat,types:()=>Object.keys(TYPES),done:()=>{const d=S.cur.dmg;d.dust.forEach(b=>b.o=0);d.stains.forEach(b=>b.o=0);fixAll(d);check()}}}
resize();renderAll();requestAnimationFrame(frame);$('loading').remove();
if(NATIVE){window.onNativeReady=s=>{window.__save=s;intro()};native({t:'ready'})}else intro();
document.fonts&&document.fonts.ready.then(()=>{redraw(titleTex);renderAll()});
}
