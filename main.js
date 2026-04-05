/* ══════════════════════════════════════════
   Runa Khan Portfolio — Next Level main.js
   ══════════════════════════════════════════ */

/* ── PAGE FADE IN ── */
document.documentElement.style.opacity = '0';
window.addEventListener('load', () => {
  document.documentElement.style.transition = 'opacity .6s ease';
  document.documentElement.style.opacity = '1';
});

/* ── PARTICLE CANVAS ── */
(function initParticles() {
  const canvas = document.createElement('canvas');
  canvas.id = 'particle-canvas';
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');

  const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
  window.addEventListener('resize', resize);
  resize();

  const COLORS = ['167,139,250', '96,165,250', '52,211,153', '251,191,36', '244,114,182'];
  const particles = Array.from({ length: 55 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.4 + 0.3,
    vx: (Math.random() - .5) * .18,
    vy: (Math.random() - .5) * .18,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    opacity: Math.random() * .45 + .1,
  }));

  let mouseX = canvas.width / 2, mouseY = canvas.height / 2;
  window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      // drift toward mouse very slightly
      const dx = mouseX - p.x, dy = mouseY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 220) {
        p.vx += dx * 0.000012;
        p.vy += dy * 0.000012;
      }
      p.vx *= .998; p.vy *= .998;
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.opacity})`;
      ctx.fill();
    });

    // draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(167,139,250,${.06 * (1 - d / 130)})`;
          ctx.lineWidth = .5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  };
  draw();
})();

/* ── SCROLL: PROGRESS + HEADER ── */
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  document.getElementById('prog').style.width = pct + '%';
  document.getElementById('hdr').classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── HAMBURGER ── */
const ham = document.getElementById('ham'), mob = document.getElementById('mob');
let menuOpen = false;
ham.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mob.classList.toggle('open', menuOpen);
  const s = ham.querySelectorAll('span');
  if (menuOpen) {
    s[0].style.transform = 'rotate(45deg) translate(5px,5px)';
    s[1].style.opacity = '0';
    s[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
  } else { s.forEach(x => { x.style.transform = ''; x.style.opacity = ''; }); }
});
mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menuOpen = false; mob.classList.remove('open');
  ham.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
}));

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
  const t = document.querySelector(a.getAttribute('href'));
  if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
}));

/* ── SPLIT TEXT: letter-by-letter hover on h1 ── */
const h1 = document.querySelector('.hero h1');
if (h1) {
  h1.innerHTML = h1.innerHTML.replace(/>([^<]+)</g, (_, text) => {
    const letters = text.split('').map(ch =>
      ch === ' ' ? ' ' : `<span class="letter">${ch}</span>`
    ).join('');
    return `>${letters}<`;
  });
}

/* ── TYPEWRITER ── */
const sub = document.querySelector('.hero-sub');
const txt = sub.textContent.trim();
sub.textContent = '';
const cursor = document.createElement('span');
cursor.className = 'tw-cursor';
sub.appendChild(cursor);
let twI = 0;
setTimeout(() => {
  const ti = setInterval(() => {
    sub.insertBefore(document.createTextNode(txt[twI++]), cursor);
    if (twI >= txt.length) clearInterval(ti);
  }, 22);
}, 950);

/* ── MAGNETIC CURSOR ── */
if (window.innerWidth > 768) {
  const cd = document.getElementById('cd'), cr = document.getElementById('cr');
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  document.addEventListener('mousedown', () => cr.classList.add('clicking'));
  document.addEventListener('mouseup', () => cr.classList.remove('clicking'));

  (function raf() {
    rx += (mx - rx) * .12;
    ry += (my - ry) * .12;
    cd.style.left = mx + 'px'; cd.style.top = my + 'px';
    cr.style.left = rx + 'px'; cr.style.top = ry + 'px';
    requestAnimationFrame(raf);
  })();

  document.querySelectorAll('a,button,.exp-card,.skill-cat,.acard,.stat-c,.soc-link,.badge,.chip').forEach(el => {
    el.addEventListener('mouseenter', () => cr.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cr.classList.remove('hovering'));
  });
}

/* ── 3D TILT ON CARDS ── */
function addTilt(sel, maxDeg = 7) {
  document.querySelectorAll(sel).forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / (r.width / 2);
      const dy = (e.clientY - cy) / (r.height / 2);
      card.style.transform = `perspective(900px) rotateX(${-dy * maxDeg}deg) rotateY(${dx * maxDeg}deg) translateY(-8px)`;
      card.style.transition = 'transform .08s ease';

      // moving shine
      const px = ((e.clientX - r.left) / r.width) * 100;
      const py = ((e.clientY - r.top) / r.height) * 100;
      card.style.setProperty('--mx', px + '%');
      card.style.setProperty('--my', py + '%');
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform .7s cubic-bezier(.23,1,.32,1)';
    });
  });
}
addTilt('.exp-card', 6);
addTilt('.acard', 7);
addTilt('.skill-cat', 5);
addTilt('.stat-c', 4);
addTilt('.soc-link', 5);

/* ── MAGNETIC BUTTONS ── */
function addMagnetic(sel, strength = 0.32) {
  document.querySelectorAll(sel).forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width / 2) * strength;
      const dy = (e.clientY - r.top - r.height / 2) * strength;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
      btn.style.transition = 'transform .1s ease';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'transform .6s cubic-bezier(.23,1,.32,1)';
    });
  });
}
addMagnetic('.btn-p', 0.28);
addMagnetic('.btn-g', 0.28);
addMagnetic('.nav-cta', 0.22);

/* ── PARALLAX BLOBS ON MOUSEMOVE ── */
if (window.innerWidth > 768) {
  const blobConfig = [
    { el: document.querySelector('.b1'), sx: -.025, sy: -.018 },
    { el: document.querySelector('.b2'), sx:  .03,  sy:  .022 },
    { el: document.querySelector('.b3'), sx: -.018, sy:  .028 },
    { el: document.querySelector('.b4'), sx:  .035, sy: -.024 },
  ];
  window.addEventListener('mousemove', e => {
    const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    blobConfig.forEach(b => {
      if (!b.el) return;
      const dx = (e.clientX - cx) * b.sx;
      const dy = (e.clientY - cy) * b.sy;
      b.el.style.transform = `translate(${dx}px, ${dy}px)`;
      b.el.style.transition = 'transform 1.4s cubic-bezier(.23,1,.32,1)';
    });
  }, { passive: true });
}

/* ── SCROLL PARALLAX ON HERO ── */
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const hero = document.querySelector('.hero');
  if (hero) hero.style.transform = `translateY(${y * .12}px)`;
}, { passive: true });

/* ── INTERSECTION OBSERVER: staggered reveal ── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach((en, i) => {
    if (en.isIntersecting) setTimeout(() => en.target.classList.add('in'), i * 80);
  });
}, { threshold: .06, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ── STAGGER GRID CARDS ── */
function staggerGrid(selector) {
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      const items = entries[0].target.querySelectorAll(selector + ' > *');
      items.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        setTimeout(() => {
          el.style.transition = 'opacity .7s cubic-bezier(.23,1,.32,1), transform .7s cubic-bezier(.23,1,.32,1)';
          el.style.opacity = '1';
          el.style.transform = '';
        }, i * 90 + 100);
      });
      obs.disconnect();
    }
  }, { threshold: .05 });

  const grid = document.querySelector(selector);
  if (grid) obs.observe(grid);
}
staggerGrid('.exp-grid');
staggerGrid('.skills-grid');
staggerGrid('.social-grid');

/* ── ANIMATED COUNTERS ── */
function countUp(el, target, duration = 1800) {
  const hasSup = el.querySelector('sup');
  const supText = hasSup ? hasSup.textContent : '';
  const start = performance.now();
  const tick = now => {
    const p = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 4);
    const val = Math.round(target * ease);
    el.innerHTML = val + (supText ? `<sup>${supText}</sup>` : '');
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const counterObs = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    const el = en.target;
    const num = parseFloat(el.textContent.replace(/\D/g, ''));
    if (!isNaN(num) && num > 0) countUp(el, num);
    counterObs.unobserve(el);
  });
}, { threshold: .5 });
document.querySelectorAll('.stat-n, .card-n').forEach(el => counterObs.observe(el));

/* ── CLICK RIPPLE ── */
document.querySelectorAll('.exp-card, .acard, .soc-link, .skill-cat, .stat-c').forEach(el => {
  el.addEventListener('click', e => {
    const r = el.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = 10;
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - r.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - r.top - size / 2) + 'px';
    el.appendChild(ripple);
    setTimeout(() => ripple.remove(), 750);
  });
});

/* ── ACTIVE NAV ON SCROLL ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const navObs = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      navLinks.forEach(a => {
        const active = a.getAttribute('href') === '#' + en.target.id;
        a.style.color = active ? 'var(--white)' : '';
      });
    }
  });
}, { threshold: .4 });
sections.forEach(s => navObs.observe(s));

/* ── ORBIT DOT: wrap approach ── */
(function fixOrbit() {
  const ring = document.querySelector('.profile-ring');
  if (!ring) return;
  const old = ring.querySelector('.orbit-dot');
  if (old) old.remove();
  const wrap = document.createElement('div');
  wrap.className = 'orbit-wrap';
  const dot = document.createElement('div');
  dot.className = 'orbit-dot';
  wrap.appendChild(dot);
  ring.appendChild(wrap);
})();

/* ── SECTION TITLE WORD SCRAMBLE on hover ── */
document.querySelectorAll('.sec-title').forEach(title => {
  const em = title.querySelector('em');
  if (!em) return;
  const original = em.textContent;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let frame, iter = 0, running = false;

  title.addEventListener('mouseenter', () => {
    if (running) return;
    running = true; iter = 0;
    clearInterval(frame);
    frame = setInterval(() => {
      em.textContent = original.split('').map((ch, i) => {
        if (i < iter) return original[i];
        if (ch === ' ') return ' ';
        return chars[Math.floor(Math.random() * chars.length)];
      }).join('');
      iter += .55;
      if (iter >= original.length) { em.textContent = original; clearInterval(frame); running = false; }
    }, 30);
  });
});

/* ── SCROLL-TRIGGERED COUNTER on stat numbers with "+" suffix ── */
// Already handled above; this ensures the "+" or "+" suffix text stays

/* ── GLOWING PROFILE RING PULSE ── */
const profileRing = document.querySelector('.profile-ring');
if (profileRing) {
  profileRing.style.animation = 'none';
  profileRing.style.boxShadow = '0 0 30px rgba(167,139,250,.2), 0 0 60px rgba(96,165,250,.08)';
  let glowDir = 1, glowVal = 20;
  setInterval(() => {
    glowVal += glowDir * 0.8;
    if (glowVal > 50) glowDir = -1;
    if (glowVal < 20) glowDir = 1;
    profileRing.style.boxShadow = `0 0 ${glowVal}px rgba(167,139,250,${.15 + (glowVal - 20) / 200}), 0 0 ${glowVal * 2}px rgba(96,165,250,.06)`;
  }, 30);
}