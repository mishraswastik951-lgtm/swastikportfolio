document.addEventListener('DOMContentLoaded',()=>{const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;const $=s=>document.querySelector(s);const $$=s=>[...document.querySelectorAll(s)];let n=0;const count=$('#loader-count');const timer=setInterval(()=>{n=Math.min(100,n+2);if(count)count.textContent=`${n}%`;if(n===100){clearInterval(timer);setTimeout(()=>$('#preloader')?.classList.add('done'),180)}},35);const root=document.documentElement,ring=$('#cursor-ring');if(!reduced&&matchMedia('(min-width:1024px)').matches){document.addEventListener('mousemove',e=>{root.style.setProperty('--x',`${e.clientX}px`);root.style.setProperty('--y',`${e.clientY}px`)});$$('a,button').forEach(el=>{el.addEventListener('mouseenter',()=>ring?.classList.add('hover'));el.addEventListener('mouseleave',()=>ring?.classList.remove('hover'))});$('#avatar-stage')?.addEventListener('mouseenter',()=>ring?.classList.add('avatar-hover'));$('#avatar-stage')?.addEventListener('mouseleave',()=>ring?.classList.remove('avatar-hover'))}const menu=$('#menu-toggle'),links=$('#nav-links');menu?.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',open)});$$('.nav-links a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));let last=0;const nav=$('#nav-header');addEventListener('scroll',()=>{const y=scrollY;nav.classList.toggle('compact',y>50);nav.classList.toggle('hidden',y>200&&y>last);if(y<last)nav.classList.remove('hidden');last=y;const total=document.body.scrollHeight-innerHeight;$('#scroll-progress').style.width=`${total?y/total*100:0}%`;$('#back-top').classList.toggle('visible',y>300)},{passive:true});const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);if(entry.target.classList.contains('skill-card'))entry.target.querySelector('.skill-bar i').style.width=`${entry.target.dataset.level}%`;if(entry.target.classList.contains('stat-card')){const value=entry.target.querySelector('strong'),target=value.dataset.target;if(target){let start=0;const tick=()=>{start+=Math.ceil(+target/30);value.textContent=`${Math.min(start,target)}+`;if(start<target)requestAnimationFrame(tick)};tick()}}}}),{threshold:.12,rootMargin:'0px 0px -40px'});$$('[data-animate]').forEach(el=>observer.observe(el));const roles=['Software Engineer','AI Engineer','Data Scientist','ML Developer','Creative Programmer'];let ri=0,ci=0,deleting=false;const role=$('#role-text');function type(){if(!role||reduced){if(role)role.textContent=roles[0];return}const word=roles[ri];role.textContent=deleting?word.slice(0,ci--):word.slice(0,ci++);if(!deleting&&ci>word.length){deleting=true;return setTimeout(type,2000)}if(deleting&&ci<0){deleting=false;ri=(ri+1)%roles.length;ci=0;return setTimeout(type,400)}setTimeout(type,deleting?60:80)}type();$$('.skill-tabs button').forEach(btn=>btn.addEventListener('click',()=>{$$('.skill-tabs button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const filter=btn.dataset.filter;$$('.skill-card').forEach(card=>card.classList.toggle('is-hidden',filter!=='all'&&card.dataset.category!==filter))}));const avatar=$('#avatar-root');document.addEventListener('mousemove',e=>{if(reduced||!avatar)return;const r=avatar.getBoundingClientRect(),dx=(e.clientX-(r.left+r.width/2))/innerWidth,dy=(e.clientY-(r.top+r.height*.35))/innerHeight;['iris-left','iris-right','pupil-left','pupil-right'].forEach(id=>document.getElementById(id)?.setAttribute('transform',`translate(${dx*4},${dy*4})`));$('#avatar-head').style.transform=`rotate(${dx*5}deg)`});$$('.magnetic').forEach(btn=>{if(reduced)return;btn.addEventListener('mousemove',e=>{const r=btn.getBoundingClientRect();btn.style.transform=`translate(${(e.clientX-r.left-r.width/2)/r.width*12}px,${(e.clientY-r.top-r.height/2)/r.height*12}px)`});btn.addEventListener('mouseleave',()=>btn.style.transform='')});const form=$('#contact-form');form?.addEventListener('submit',e=>{e.preventDefault();let valid=true;form.querySelectorAll('[required]').forEach(input=>{if(!input.value.trim()||(input.type==='email'&&!/^\S+@\S+\.\S+$/.test(input.value))){valid=false;input.classList.add('shake');setTimeout(()=>input.classList.remove('shake'),400)}});if(valid){$('#form-success').hidden=false;form.reset()}});$('#back-top')?.addEventListener('click',()=>scrollTo({top:0,behavior:reduced?'auto':'smooth'}));if(!reduced){const canvas=$('#starfield'),ctx=canvas?.getContext('2d');if(canvas&&ctx){let stars=[];function resize(){canvas.width=innerWidth;canvas.height=innerHeight;stars=Array.from({length:130},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*1.4+.3,dx:(Math.random()-.5)*.12,dy:(Math.random()-.5)*.12}))}function draw(){ctx.clearRect(0,0,canvas.width,canvas.height);ctx.fillStyle='#f1f5f9';stars.forEach(s=>{s.x=(s.x+s.dx+canvas.width)%canvas.width;s.y=(s.y+s.dy+canvas.height)%canvas.height;ctx.globalAlpha=.35+s.r/3;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill()});requestAnimationFrame(draw)}resize();addEventListener('resize',resize);draw()}}});



document.addEventListener('DOMContentLoaded', () => {
  if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  const modal = document.getElementById('cert-modal');
  const span = document.querySelector('.cert-modal-close');
  const skillNameSpan = document.getElementById('cert-skill-name');
  const certImage = document.getElementById('cert-image');

  document.querySelectorAll('.view-cert-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const skillCard = e.target.closest('.skill-card');
      const skillName = skillCard.querySelector('h3').innerText.trim();
      skillNameSpan.innerText = skillName;
      
      if (skillName.toLowerCase() === 'python') {
        certImage.src = 'python-cert.png';
        certImage.style.display = 'block';
      } else {
        certImage.src = '';
        certImage.style.display = 'none';
      }
      
      modal.style.display = 'block';
    });
  });

  span.onclick = function() {
    modal.style.display = 'none';
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }
});
