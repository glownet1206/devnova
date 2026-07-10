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

          {/* LEFT — Dotted Wireframe Sphere */}
          <div className="reveal-left about-globe" style={{
            display:'flex', justifyContent:'center', alignItems:'center',
            position:'sticky', top:'20vh',
          }}>
            <DottedSphere />
          </div>

          {/* RIGHT — Content */}
          <div className="reveal-right">
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
          .about-grid{ grid-template-columns:1fr !important; gap:48px !important; }
          .about-globe{ display:none !important; }
          .about-feat-grid{ grid-template-columns:1fr !important; }
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

/* ── Dotted Wireframe Sphere ── */
function DottedSphere() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const S = 420, cx = S/2, cy = S/2, R = 165;
    let t = 0, raf;

    // Project a 3D point onto 2D with rotation
    const rotate3D = (x, y, z, rx, ry, rz) => {
      // rotate Z
      let tx = x*Math.cos(rz) - y*Math.sin(rz);
      let ty = x*Math.sin(rz) + y*Math.cos(rz);
      let tz = z;
      x=tx; y=ty; z=tz;
      // rotate X
      tx=x; ty=y*Math.cos(rx)-z*Math.sin(rx); tz=y*Math.sin(rx)+z*Math.cos(rx);
      x=tx; y=ty; z=tz;
      // rotate Y
      tx=x*Math.cos(ry)+z*Math.sin(ry); tz=-x*Math.sin(ry)+z*Math.cos(ry);
      x=tx; z=tz;
      return [x, y, z];
    };

    // Draw a dotted great circle
    const drawDottedCircle = (tiltX, tiltZ, speed, dotAlpha) => {
      const DOTS = 80;
      for (let i = 0; i < DOTS; i++) {
        const θ = (i / DOTS) * Math.PI * 2;
        const [x, y, z] = rotate3D(
          Math.cos(θ), Math.sin(θ), 0,
          tiltX, t * speed, tiltZ
        );
        const depth = (z + 1) / 2; // 0..1, 1=front
        const alpha = dotAlpha * (0.25 + 0.75 * depth);
        const size  = 1.6 + 1.2 * depth;
        const px = cx + x * R;
        const py = cy + y * R;
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,190,${alpha})`;
        ctx.fill();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, S, S);

      // ambient glow
      const g = ctx.createRadialGradient(cx,cy,R*0.3,cx,cy,R*1.5);
      g.addColorStop(0,'rgba(0,255,190,0.05)');
      g.addColorStop(1,'transparent');
      ctx.fillStyle=g; ctx.fillRect(0,0,S,S);

      t += 0.008;

      // Latitude circles (horizontal, different tilts give sphere feel)
      const latAngles = [-1.2, -0.9, -0.6, -0.3, 0, 0.3, 0.6, 0.9, 1.2];
      latAngles.forEach(lat => {
        drawDottedCircle(lat, 0, 1.0, 0.9);
      });

      // Longitude circles (vertical great circles at different azimuths)
      const lonCount = 7;
      for (let i = 0; i < lonCount; i++) {
        const az = (Math.PI / lonCount) * i;
        drawDottedCircle(0, az, 0.8, 0.7);
      }

      // Extra tilted rings for organic complexity (like the reference image)
      const tilted = [
        [0.5,  Math.PI/4,  1.2],
        [-0.5, Math.PI/4,  1.2],
        [0.8,  Math.PI/6,  0.9],
        [-0.8, -Math.PI/6, 0.9],
      ];
      tilted.forEach(([tx, tz, sp]) => {
        drawDottedCircle(tx, tz, sp, 0.55);
      });

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div style={{ position:'relative', display:'flex', justifyContent:'center', alignItems:'center' }}>
      {/* outer glow */}
      <div style={{
        position:'absolute', width:400, height:400, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(0,255,190,0.06) 0%, transparent 65%)',
        filter:'blur(30px)', pointerEvents:'none',
      }}/>
      <canvas ref={ref} width={420} height={420}
        style={{ position:'relative', zIndex:2, maxWidth:'100%' }}/>
    </div>
  );
}
