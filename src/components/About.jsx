import { useEffect, useRef, useState } from 'react';
import { TbRocket, TbBrush, TbSeo, TbDeviceMobile, TbShieldCheck, TbHeadphones } from 'react-icons/tb';
import { HiArrowRight } from 'react-icons/hi';

const features = [
  { Icon: TbRocket,       text: 'Fast Delivery',     sub: 'Projects delivered on time'    },
  { Icon: TbBrush,        text: 'Modern Design',     sub: 'Cutting-edge UI/UX trends'     },
  { Icon: TbSeo,          text: 'SEO Optimized',     sub: 'Rank higher on Google'         },
  { Icon: TbDeviceMobile, text: 'Mobile Responsive', sub: 'Perfect on all devices'        },
  { Icon: TbShieldCheck,  text: 'Secure',            sub: 'Enterprise-grade security'     },
  { Icon: TbHeadphones,   text: 'Lifetime Support',  sub: "We're always here for you"     },
];

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal,.reveal-left,.reveal-right')
      .forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} style={{ padding:'80px 0', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', right:'-8%', top:'15%', width:500, height:500, borderRadius:'50%',
        background:'radial-gradient(circle,rgba(123,97,255,0.07),transparent 70%)', filter:'blur(80px)', pointerEvents:'none' }}/>
      <div style={{ position:'absolute', left:'-5%', bottom:'10%', width:400, height:400, borderRadius:'50%',
        background:'radial-gradient(circle,rgba(0,229,255,0.05),transparent 70%)', filter:'blur(80px)', pointerEvents:'none' }}/>

      <div className="section-container">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:72, alignItems:'start' }}
          className="about-grid">

          {/* LEFT — Dotted Sphere */}
          <div className="reveal-left about-globe" style={{
            display:'flex', justifyContent:'center', alignItems:'center',
            position:'sticky', top:'20vh', order: 1,
          }}>
            <DottedSphere />
          </div>

          {/* RIGHT — Content */}
          <div className="reveal-right" style={{ order: 2 }}>
            <div className="section-tag" style={{ marginBottom:16 }}>Why Choose DevNova</div>

            <h2 style={{ fontFamily:'var(--font-main)', fontSize:'clamp(2.2rem,3.8vw,3.2rem)',
              fontWeight:800, lineHeight:1.15, marginBottom:24 }}>
              We build <span className="gradient-text">digital experiences.</span>
            </h2>

            <p style={{ color:'rgba(255,255,255,0.5)', lineHeight:1.8, fontSize:'0.95rem', marginBottom:32 }}>
              DevNova Studio combines cutting-edge technology with stunning design to deliver
              web solutions that don't just look great — they perform, convert, and scale.
            </p>

            <div className="about-feat-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginBottom:36 }}>
              {features.map(({ Icon, text, sub }, i) => (
                <FeatureRow key={i} Icon={Icon} text={text} sub={sub} />
              ))}
            </div>

            <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
              <a href="#services" className="btn-primary"
                onClick={e=>{ e.preventDefault(); document.getElementById('services')?.scrollIntoView({behavior:'smooth'}); }}>
                <span>Our Services</span><HiArrowRight size={16}/>
              </a>
              <a href="#portfolio" className="btn-outline"
                onClick={e=>{ e.preventDefault(); document.getElementById('portfolio')?.scrollIntoView({behavior:'smooth'}); }}>
                View Work
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:860px){
          .about-grid{ grid-template-columns:1fr !important; gap:32px !important; }
          .about-globe{
            position:static !important;
            display:flex !important;
            justify-content:center !important;
            align-items:center !important;
            order: 2 !important;
          }
          .about-globe canvas{ width:280px !important; height:280px !important; }
          .about-feat-grid{ grid-template-columns:repeat(2,1fr) !important; }
          .reveal-right{ order: 1 !important; }
        }
        @media(max-width:480px){
          .about-globe canvas{ width:240px !important; height:240px !important; }
          .about-feat-grid{ grid-template-columns:1fr !important; }
        }
        @media(max-width:360px){
          .about-globe canvas{ width:200px !important; height:200px !important; }
        }
      `}</style>
    </section>
  );
}

function FeatureRow({ Icon, text, sub }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        padding:'11px 13px', borderRadius:14, cursor:'default',
        background: hov ? 'rgba(0,229,255,0.05)' : 'rgba(255,255,255,0.025)',
        border:`1px solid ${hov ? 'rgba(0,229,255,0.28)' : 'rgba(255,255,255,0.07)'}`,
        transition:'all 0.25s ease',
        transform: hov ? 'translateY(-3px)' : 'translateY(0)',
      }}>
      <div style={{ width:34, height:34, borderRadius:9, marginBottom:10,
        background: hov ? 'rgba(0,229,255,0.14)' : 'rgba(0,229,255,0.07)',
        border:`1px solid ${hov ? 'rgba(0,229,255,0.38)' : 'rgba(0,229,255,0.14)'}`,
        display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.25s' }}>
        <Icon size={17} color="#00E5FF"/>
      </div>
      <div style={{ fontFamily:'var(--font-main)', fontWeight:700, fontSize:'0.85rem',
        color: hov ? '#fff' : 'rgba(255,255,255,0.85)', marginBottom:3, transition:'color 0.25s' }}>
        {text}
      </div>
      <div style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.38)', lineHeight:1.4 }}>{sub}</div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   DottedSphere
   - Each dot has its OWN angular speed on its ring
   - Dots move independently → ring shape evolves over time
   - Touch/mouse drag with inertia
   ══════════════════════════════════════════════════════ */
function DottedSphere() {
  const canvasRef = useRef(null);
  const stateRef  = useRef({
    dragX: 0, dragY: 0,
    velX: 0,  velY: 0,
    dragging: false,
    lastTX: 0, lastTY: 0,
    visible: true,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: false, alpha: true });

    /* hi-dpi */
    const DPR  = Math.min(window.devicePixelRatio || 1, 2);
    const SIZE = 420;
    canvas.width  = SIZE * DPR;
    canvas.height = SIZE * DPR;
    canvas.style.width  = SIZE + 'px';
    canvas.style.height = SIZE + 'px';
    ctx.scale(DPR, DPR);

    const cx = SIZE / 2, cy = SIZE / 2, R = 158;

    /* alpha lookup — no string allocation per frame */
    const STEPS = 40;
    const COLS  = Array.from({ length: STEPS + 1 }, (_, i) =>
      `rgba(0,255,185,${(i / STEPS).toFixed(3)})`
    );
    const col = (a) => COLS[Math.round(Math.min(Math.max(a, 0), 1) * STEPS)];

    /* rotation — writes to _x _y _z */
    let _x = 0, _y = 0, _z = 0;
    function rot(x, y, z, rx, ry) {
      let cosY = Math.cos(ry), sinY = Math.sin(ry);
      let tx = x * cosY + z * sinY, tz = -x * sinY + z * cosY;
      x = tx; z = tz;
      let cosX = Math.cos(rx), sinX = Math.sin(rx);
      let ty = y * cosX - z * sinX; tz = y * sinX + z * cosX;
      y = ty; z = tz;
      _x = x; _y = y; _z = z;
    }

    /* ── Build particle array ──
       Each particle: θ (current angle on ring), speed (its own), ring geometry, style
    */
    const particles = [];

    function addRing(tiltX, tiltZ, count, alphaBase, sizeBase, baseSpeed) {
      const cosRZ = Math.cos(tiltZ), sinRZ = Math.sin(tiltZ);
      const cosRX = Math.cos(tiltX), sinRX = Math.sin(tiltX);
      for (let i = 0; i < count; i++) {
        particles.push({
          θ: (i / count) * Math.PI * 2,              // starting angle spread evenly
          speed: baseSpeed * (0.5 + Math.random()),   // each dot its OWN speed
          cosRZ, sinRZ, cosRX, sinRX,
          alphaBase,
          sizeBase,
        });
      }
    }

    /* latitude rings */
    [-1.1, -0.78, -0.5, -0.25, 0, 0.25, 0.5, 0.78, 1.1].forEach((lat, li) => {
      addRing(lat, li * 0.04, 70, 0.75, 1.4, 0.009 + (li % 3) * 0.003);
    });

    /* longitude rings */
    for (let i = 0; i < 7; i++) {
      addRing(0, (Math.PI / 7) * i, 70, 0.55, 1.4, 0.007 + (i % 4) * 0.003);
    }

    /* tilted rings */
    [
      [0.48,  Math.PI / 4,  70, 0.50, 1.4, 0.011],
      [-0.48, Math.PI / 4,  70, 0.50, 1.4, 0.011],
      [0.85,  Math.PI / 6,  70, 0.40, 1.4, 0.008],
      [-0.85, -Math.PI / 6, 70, 0.40, 1.4, 0.008],
    ].forEach(([tx, tz, n, a, s, sp]) => addRing(tx, tz, n, a, s, sp));

    /* equator ring — same size as rest */
    addRing(0, 0, 70, 0.90, 1.4, 0.010);

    /* ── RAF loop ── */
    let last = 0, raf;
    const FPS_MS   = 1000 / 40;
    const BASE_RX  = 0.35;
    const WORLD_SPD = 0.005; // slow global rotation so dots feel like they orbit
    const s = stateRef.current;
    let worldRY = 0;

    const draw = (now) => {
      raf = requestAnimationFrame(draw);
      if (!s.visible) return;
      const el = now - last;
      if (el < FPS_MS) return;
      last = now - (el % FPS_MS);

      worldRY += WORLD_SPD;
      if (!s.dragging) {
        s.velX *= 0.93; s.velY *= 0.93;
        s.dragX += s.velX; s.dragY += s.velY;
      }

      const ry = worldRY + s.dragY;
      const rx = BASE_RX  + s.dragX;

      ctx.clearRect(0, 0, SIZE, SIZE);

      /* ambient glow */
      const g = ctx.createRadialGradient(cx, cy, R * 0.1, cx, cy, R * 1.1);
      g.addColorStop(0, 'rgba(0,255,185,0.03)');
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, SIZE, SIZE);

      /* draw all particles */
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        /* advance this dot's OWN angle — this is what makes them move individually */
        p.θ += p.speed;

        const θ = p.θ;
        let x = Math.cos(θ), y = Math.sin(θ), z = 0;

        /* apply ring's latitude tilt */
        let ty = y * p.cosRX - z * p.sinRX;
        let tz = y * p.sinRX + z * p.cosRX;
        y = ty; z = tz;

        /* apply ring's longitude tilt */
        let tx = x * p.cosRZ - z * p.sinRZ;
        tz     = x * p.sinRZ + z * p.cosRZ;
        x = tx; z = tz;

        /* global world rotation */
        rot(x, y, z, rx, ry);

        const depth = (_z + 1) * 0.5;
        if (depth < 0.04) continue;

        const a    = p.alphaBase * (0.18 + 0.82 * depth);
        const size = p.sizeBase; // uniform size — no depth scaling

        ctx.beginPath();
        ctx.arc(cx + _x * R, cy + _y * R, size, 0, Math.PI * 2);
        ctx.fillStyle = col(a);
        if (depth > 0.62) {
          ctx.shadowColor = 'rgba(0,255,185,0.8)';
          ctx.shadowBlur  = p.sizeBase > 2 ? 9 : 5;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    /* touch drag */
    const onTouchStart = (e) => {
      s.dragging = true;
      s.lastTX = e.touches[0].clientX; s.lastTY = e.touches[0].clientY;
      s.velX = s.velY = 0;
    };
    const onTouchMove = (e) => {
      if (!s.dragging) return;
      e.preventDefault();
      const dx = e.touches[0].clientX - s.lastTX;
      const dy = e.touches[0].clientY - s.lastTY;
      s.velY = dx * 0.012; s.velX = dy * 0.012;
      s.dragY += s.velY;   s.dragX += s.velX;
      s.lastTX = e.touches[0].clientX; s.lastTY = e.touches[0].clientY;
    };
    const onTouchEnd = () => { s.dragging = false; };

    /* mouse drag */
    const onMouseDown = (e) => {
      s.dragging = true;
      s.lastTX = e.clientX; s.lastTY = e.clientY;
      s.velX = s.velY = 0;
      canvas.style.cursor = 'grabbing';
    };
    const onMouseMove = (e) => {
      if (!s.dragging) return;
      const dx = e.clientX - s.lastTX, dy = e.clientY - s.lastTY;
      s.velY = dx * 0.010; s.velX = dy * 0.010;
      s.dragY += s.velY;   s.dragX += s.velX;
      s.lastTX = e.clientX; s.lastTY = e.clientY;
    };
    const onMouseUp = () => { s.dragging = false; canvas.style.cursor = 'grab'; };

    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchmove',  onTouchMove,  { passive: false });
    canvas.addEventListener('touchend',   onTouchEnd);
    canvas.addEventListener('mousedown',  onMouseDown);
    window.addEventListener('mousemove',  onMouseMove);
    window.addEventListener('mouseup',    onMouseUp);
    canvas.style.cursor = 'grab';

    /* pause when off-screen */
    const io = new IntersectionObserver(
      ([e]) => { s.visible = e.isIntersecting; }, { threshold: 0 }
    );
    io.observe(canvas);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove',  onTouchMove);
      canvas.removeEventListener('touchend',   onTouchEnd);
      canvas.removeEventListener('mousedown',  onMouseDown);
      window.removeEventListener('mousemove',  onMouseMove);
      window.removeEventListener('mouseup',    onMouseUp);
    };
  }, []);

  return (
    <div style={{ position:'relative', display:'flex', justifyContent:'center', alignItems:'center', userSelect:'none', WebkitUserSelect:'none' }}>
      <div style={{
        position:'absolute', width:380, height:380, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(0,255,185,0.07) 0%, rgba(0,229,255,0.04) 40%, transparent 70%)',
        filter:'blur(28px)', pointerEvents:'none',
        animation:'pulse-glow 4s ease-in-out infinite',
      }}/>
      <canvas
        ref={canvasRef}
        style={{ position:'relative', zIndex:2, maxWidth:'100%', display:'block', touchAction:'none' }}
      />
    </div>
  );
}
