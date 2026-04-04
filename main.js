window.addEventListener('scroll',()=>{
  document.getElementById('prog').style.width=(window.scrollY/(document.body.scrollHeight-window.innerHeight)*100)+'%';
  document.getElementById('hdr').classList.toggle('scrolled',window.scrollY>60);
});
const ham=document.getElementById('ham'),mob=document.getElementById('mob');
let mo=false;
ham.addEventListener('click',()=>{
  mo=!mo;mob.classList.toggle('open',mo);
  const s=ham.querySelectorAll('span');
  if(mo){s[0].style.transform='rotate(45deg) translate(5px,5px)';s[1].style.opacity='0';s[2].style.transform='rotate(-45deg) translate(5px,-5px)';}
  else{s.forEach(x=>{x.style.transform='';x.style.opacity='';}); }
});
mob.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  mo=false;mob.classList.remove('open');
  ham.querySelectorAll('span').forEach(s=>{s.style.transform='';s.style.opacity='';});
}));
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
  const t=document.querySelector(a.getAttribute('href'));
  if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'});}
}));
const obs=new IntersectionObserver(entries=>{
  entries.forEach((en,i)=>{if(en.isIntersecting)setTimeout(()=>en.target.classList.add('in'),i*80);});
},{threshold:.08,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
if(window.innerWidth>768){
  const cd=document.getElementById('cd'),cr=document.getElementById('cr');
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
  (function raf(){rx+=(mx-rx)*.13;ry+=(my-ry)*.13;
    cd.style.left=mx+'px';cd.style.top=my+'px';
    cr.style.left=rx+'px';cr.style.top=ry+'px';
    requestAnimationFrame(raf);})();
  document.querySelectorAll('a,button,.exp-card,.skill-cat,.acard,.stat-c,.soc-link').forEach(el=>{
    el.addEventListener('mouseenter',()=>{cr.style.width='52px';cr.style.height='52px';cr.style.borderColor='rgba(167,139,250,.65)';});
    el.addEventListener('mouseleave',()=>{cr.style.width='34px';cr.style.height='34px';cr.style.borderColor='rgba(167,139,250,.4)';});
  });
}
const sub=document.querySelector('.hero-sub');
const txt=sub.textContent.trim();sub.textContent='';
let i=0;
setTimeout(()=>{const ti=setInterval(()=>{sub.textContent+=txt[i++];if(i>=txt.length)clearInterval(ti);},20);},800);
