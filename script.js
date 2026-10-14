'use strict';
const skills={
  explosividad:{id:'01',title:'EXPLOSIVIDAD',icon:'↗',description:'El propio OFI destacó la explosividad como una de las características principales de su juego durante la temporada 2024/25.'},
  intensidad:{id:'02',title:'INTENSIDAD',icon:'✦',description:'El club resaltó su carácter combativo y el compromiso competitivo que aporta dentro del campo.'},
  gol:{id:'03',title:'INSTINTO GOLEADOR',icon:'◎',description:'Su capacidad de marcar fue destacada por el OFI: registró 12 goles en 33 encuentros en la temporada 2024/25.'}
};
const tabs=[...document.querySelectorAll('[data-skill]')];
function activateSkill(tab,focus=false){
  const skill=skills[tab.dataset.skill];
  if(!skill)return;
  tabs.forEach(t=>{const active=t===tab;t.classList.toggle('active',active);t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;});
  document.getElementById('skillNumber').textContent=`${skill.id} / 03`;
  document.getElementById('skillTitle').textContent=skill.title;
  document.getElementById('skillIcon').textContent=skill.icon;
  document.getElementById('skillDescription').textContent=skill.description;
  document.getElementById('trait-panel').setAttribute('aria-labelledby',tab.id);
  if(focus)tab.focus();
}
tabs.forEach((tab,i)=>{
  tab.addEventListener('click',()=>activateSkill(tab));
  tab.addEventListener('keydown',event=>{
    if(!['ArrowRight','ArrowLeft','Home','End'].includes(event.key))return;
    event.preventDefault();
    const ix=event.key==='Home'?0:event.key==='End'?tabs.length-1:(i+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;
    activateSkill(tabs[ix],true);
  });
});
const menuBtn=document.querySelector('.menu-button');
const menu=document.getElementById('mobile-nav');
function closeMenu(){menu.hidden=true;menuBtn.setAttribute('aria-expanded','false');menuBtn.setAttribute('aria-label','Abrir menú');}
menuBtn.addEventListener('click',()=>{const show=menu.hidden;menu.hidden=!show;menuBtn.setAttribute('aria-expanded',String(show));menuBtn.setAttribute('aria-label',show?'Cerrar menú':'Abrir menú');});
menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();closeLightbox();}});
const gallery=document.querySelectorAll('[data-lightbox]');const lightbox=document.getElementById('lightbox');const lightboxImg=document.getElementById('lightbox-image');const closeBtn=document.querySelector('.lightbox-close');let lastTrigger=null;
gallery.forEach(btn=>btn.addEventListener('click',()=>{
  lastTrigger=btn;lightboxImg.src='assets/'+btn.dataset.lightbox;lightboxImg.alt=btn.dataset.alt||'Fotografía del jugador';lightbox.hidden=false;document.body.classList.add('modal-open');closeBtn.focus();
}));
function closeLightbox(){if(lightbox.hidden)return;lightbox.hidden=true;lightboxImg.removeAttribute('src');document.body.classList.remove('modal-open');lastTrigger?.focus();}
closeBtn.addEventListener('click',closeLightbox);
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox();});
lightbox.addEventListener('keydown',e=>{if(e.key==='Tab'){e.preventDefault();closeBtn.focus();}});
document.getElementById('year').textContent=new Date().getFullYear();
if('IntersectionObserver' in window){
  const io=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');io.unobserve(entry.target);}})},{threshold:0.13});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
}else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in-view'));}

// Auto-detect authorized video clips: drop highlight-01.mp4, 02, 03 into assets/.
// If absent, honest photo placeholders stay in place.
async function mountVideoIfAvailable(card) {
  const path = 'assets/' + card.dataset.video;
  try {
    const response = await fetch(path,{method:'HEAD'});
    if (!response.ok) return;
    const type = response.headers.get('content-type') || '';
    if (type && !type.includes('video/') && !type.includes('octet-stream')) return;
    const still = card.querySelector('img');
    const video = document.createElement('video');
    video.controls = true;video.playsInline = true;video.preload = 'metadata';
    video.poster = still?.src || '';
    video.setAttribute('aria-label',card.querySelector('.reel-label strong')?.textContent || 'Video destacado de Thiago Nuss');
    const source = document.createElement('source');
    source.src = path;source.type = 'video/mp4';
    video.append(source);card.replaceChildren(video);card.classList.add('has-video');
  } catch (_) { /* Browsing locally or no access to clips: keep placeholder. */ }
}
document.querySelectorAll('.reel-card[data-video]').forEach(mountVideoIfAvailable);
