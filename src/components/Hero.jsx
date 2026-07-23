import { useEffect, useRef, useState } from 'react';
import { HiArrowRight, HiPlay, HiChevronDown } from 'react-icons/hi';
import { AiFillStar } from 'react-icons/ai';

// Simple animated counter hook — no external dep needed
function useAnimatedCount(end, duration = 2500, delay = 0, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const delayTimer = setTimeout(() => {
      const step = (ts) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        // ease-out
        const eased = 1 - Math.pow(1 - progress, 3);
        setVal(Math.round(eased * end));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(delayTimer);
  }, [end, duration, delay, active]);
  return val;
}

const stats = [
  { value: 200, suffix: '+', label: 'Projects Completed' },
  { value: 50, suffix: '+', label: 'Happy Clients' },
  { value: 99, suffix: '%', label: 'Satisfaction Rate' },
  { value: 5, suffix: ' yrs', label: 'Experience' },
];

function StatCounter({ end, suffix, active, delay }) {
  const val = useAnimatedCount(end, 2500, delay, active);
  return <>{val}{suffix}</>;
}

const PORTFOLIO_SITES = [
  { name: 'FitZone Gym', color: '#ff6b35' },
  { name: 'Urban Eats', color: '#00c853' },
  { name: 'MedicoPlus', color: '#2196f3' },
  { name: 'TravelVista', color: '#9c27b0' },
  { name: 'EduLearn Pro', color: '#ff9800' },
];

export default function Hero() {
  const heroRef = useRef(null);
  const laptopRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [siteIdx, setSiteIdx] = useState(0);
  const statsRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Mouse parallax — throttled via RAF to avoid layout thrashing
  useEffect(() => {
    let rafPending = false;
    const onMove = (e) => {
      const { innerWidth: w, innerHeight: h } = window;
      mouseRef.current = {
        x: (e.clientX / w - 0.5) * 2,
        y: (e.clientY / h - 0.5) * 2,
      };
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(() => {
        rafPending = false;
        const { x, y } = mouseRef.current;
        if (laptopRef.current) {
          laptopRef.current.style.transform = `perspective(1200px) rotateY(${x * 8}deg) rotateX(${-y * 4}deg) translateZ(20px)`;
        }
        particlesRef.current.forEach((el, i) => {
          if (!el) return;
          const depth = 0.02 + i * 0.01;
          el.style.transform = `translate(${x * 40 * depth}px, ${y * 30 * depth}px)`;
        });
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Cycle portfolio sites on laptop
  useEffect(() => {
    const timer = setInterval(() => {
      setSiteIdx(i => (i + 1) % PORTFOLIO_SITES.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 120,
        paddingBottom: 60,
      }}
    >
      {/* Aurora background */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: `
          radial-gradient(ellipse 80% 60% at 20% 20%, rgba(0,229,255,0.12) 0%, transparent 60%),
          radial-gradient(ellipse 60% 50% at 80% 80%, rgba(123,97,255,0.12) 0%, transparent 60%),
          radial-gradient(ellipse 40% 40% at 50% 50%, rgba(0,255,198,0.06) 0%, transparent 70%)
        `,
        animation: 'aurora 8s ease infinite',
        backgroundSize: '200% 200%',
      }} />

      {/* Galaxy / grid lines */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, opacity: 0.2,
        backgroundImage: `
          linear-gradient(rgba(0,229,255,0.15) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,229,255,0.15) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      {/* Floating 3D shapes — hidden on mobile */}
      {[
        { size: 80, color: '#00E5FF', top: '12%', left: '8%', delay: 0, shape: 'cube' },
        { size: 50, color: '#7B61FF', top: '20%', right: '12%', delay: 1.5, shape: 'sphere' },
        { size: 40, color: '#00FFC6', bottom: '30%', left: '15%', delay: 0.8, shape: 'pyramid' },
        { size: 60, color: '#7B61FF', bottom: '20%', right: '8%', delay: 2, shape: 'cube' },
        { size: 30, color: '#00E5FF', top: '50%', left: '5%', delay: 1.2, shape: 'sphere' },
        { size: 35, color: '#00FFC6', top: '60%', right: '5%', delay: 0.5, shape: 'pyramid' },
      ].map((s, i) => (
        <div
          key={i}
          ref={el => particlesRef.current[i] = el}
          className="hero-shape"
          style={{
            position: 'absolute',
            zIndex: 1,
            top: s.top,
            left: s.left,
            right: s.right,
            bottom: s.bottom,
            width: s.size,
            height: s.size,
            animation: `float ${5 + i}s ease-in-out infinite`,
            animationDelay: `${s.delay}s`,
            transition: 'transform 0.3s ease',
            pointerEvents: 'none',
          }}
        >
          {s.shape === 'cube' && (
            <div style={{
              width: '100%', height: '100%',
              background: `linear-gradient(135deg, ${s.color}30, ${s.color}08)`,
              border: `1px solid ${s.color}50`,
              borderRadius: 8,
              transform: 'rotate(15deg)',
              boxShadow: `0 0 20px ${s.color}30, inset 0 0 10px ${s.color}10`,
            }} />
          )}
          {s.shape === 'sphere' && (
            <div style={{
              width: '100%', height: '100%',
              borderRadius: '50%',
              background: `radial-gradient(circle at 35% 35%, ${s.color}60, ${s.color}10)`,
              border: `1px solid ${s.color}40`,
              boxShadow: `0 0 25px ${s.color}30`,
            }} />
          )}
          {s.shape === 'pyramid' && (
            <div style={{
              width: 0, height: 0,
              borderLeft: `${s.size / 2}px solid transparent`,
              borderRight: `${s.size / 2}px solid transparent`,
              borderBottom: `${s.size}px solid ${s.color}40`,
              filter: `drop-shadow(0 0 8px ${s.color}60)`,
            }} />
          )}
        </div>
      ))}

      {/* Main content */}
      <div className="section-container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>

        {/* Badge */}
        <div
          className="glass"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 20px', borderRadius: 50, marginBottom: 28,
            border: '1px solid rgba(0,229,255,0.2)',
            animation: 'fadeInUp 0.8s ease 0.2s both',
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#00FFC6', boxShadow: '0 0 8px #00FFC6', animation: 'pulse-glow 2s infinite' }} />
          <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.82rem', fontFamily: 'var(--font-main)', fontWeight: 500 }}>
            We Build Digital Experiences
          </span>
        </div>

        {/* Heading */}
        <h1
          style={{
            fontFamily: 'var(--font-main)',
            fontSize: 'clamp(2.6rem, 6vw, 5rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 16,
            animation: 'fadeInUp 0.8s ease 0.4s both',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
          }}
        >
          <span style={{ color: 'var(--text)' }}>DevNova </span>
          <span className="gradient-text">Studio</span>
        </h1>

        <h2
          style={{
            fontFamily: 'var(--font-main)',
            fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.85)',
            marginBottom: 12,
            animation: 'fadeInUp 0.8s ease 0.55s both',
          }}
        >
          We Build Websites That{' '}
          <span className="gradient-text">Grow Businesses.</span>
        </h2>

        <p
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
            maxWidth: 560,
            margin: '0 auto 40px',
            lineHeight: 1.7,
            animation: 'fadeInUp 0.8s ease 0.7s both',
          }}
        >
          Modern design. Powerful code. Real results.<br />Your success is our mission.
        </p>

        {/* CTA Buttons */}
        <div
          className="hero-btns"
          style={{
            display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap',
            marginBottom: 48,
            animation: 'fadeInUp 0.8s ease 0.85s both',
          }}
        >
          <a
            href="#contact"
            className="btn-primary"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            <span>Start Your Project</span>
            <HiArrowRight size={18} />
          </a>
          <a
            href="#portfolio"
            className="btn-outline"
            onClick={(e) => { e.preventDefault(); document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            <HiPlay size={16} />
            View Portfolio
          </a>
        </div>

        {/* Trust line */}
        <div
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
            marginBottom: 60,
            animation: 'fadeInUp 0.8s ease 1s both',
          }}
        >
          <div style={{ display: 'flex' }}>
            {[1,2,3,4,5].map((n, i) => (
              <img
                key={i}
                src={`/star-${n}.${n===2?'avif':'jpg'}`}
                alt={`client ${n}`}
                style={{
                  width: 36, height: 36, borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid var(--bg)',
                  marginLeft: i > 0 ? -10 : 0,
                }}
              />
            ))}
          </div>
          <div>
            <div style={{ display: 'flex', gap: 2 }}>
              {[...Array(5)].map((_, i) => <AiFillStar key={i} size={14} color="#FFD700" />)}
            </div>
            <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>
              Trusted by 200+ Businesses Worldwide
            </p>
          </div>
        </div>

        {/* 3D Laptop mockup */}
        <div
          ref={laptopRef}
          style={{
            maxWidth: '100%',
            width: '100%',
            overflow: 'hidden',
            margin: '0 auto 60px',
            transition: 'transform 0.1s ease',
            animation: 'fadeInUp 0.8s ease 0.5s both',
          }}
        >
          <LaptopMockup siteIdx={siteIdx} />
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: 16,
            maxWidth: 800,
            margin: '0 auto',
          }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="glass"
              style={{
                padding: '20px 16px',
                textAlign: 'center',
                border: '1px solid rgba(0,229,255,0.12)',
                animation: `fadeInUp 0.6s ease ${0.2 + i * 0.1}s both`,
                transition: 'border-color 0.3s, transform 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.12)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{
                fontFamily: 'var(--font-main)', fontSize: '2.2rem', fontWeight: 800,
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                {inView
                  ? <StatCounter end={s.value} suffix={s.suffix} active={inView} delay={i * 200} />
                  : `0${s.suffix}`
                }
              </div>
              <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator hidden on mobile */}
      <a
        href="#about"
        onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}
        className="scroll-indicator"
        style={{
          position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          color: 'rgba(255,255,255,0.3)', textDecoration: 'none', fontSize: '0.7rem',
          letterSpacing: '0.1em', animation: 'float 3s ease-in-out infinite',
          zIndex: 2,
        }}
      >
        <span>SCROLL</span>
        <HiChevronDown size={18} />
      </a>
    </section>
  );
}

function LaptopMockup({ siteIdx }) {
  const site = PORTFOLIO_SITES[siteIdx];
  return (
    <div style={{ position: 'relative', filter: 'drop-shadow(0 40px 80px rgba(0,229,255,0.15))' }}>
      {/* Glow ring under laptop */}
      <div style={{
        position: 'absolute', bottom: -20, left: '50%', transform: 'translateX(-50%)',
        width: '70%', height: 40,
        background: 'radial-gradient(ellipse, rgba(0,229,255,0.3) 0%, transparent 70%)',
        filter: 'blur(20px)',
      }} />

      {/* Laptop body */}
      <div style={{
        background: 'linear-gradient(160deg, #1a1a2e 0%, #0d0d1a 100%)',
        borderRadius: '16px 16px 0 0',
        border: '1px solid rgba(255,255,255,0.12)',
        padding: '12px 12px 8px',
        position: 'relative',
      }}>
        {/* Camera */}
        <div style={{
          width: 8, height: 8, borderRadius: '50%',
          background: '#2a2a3a', border: '1px solid rgba(255,255,255,0.1)',
          margin: '0 auto 8px',
        }} />

        {/* Screen */}
        <div style={{
          background: '#050816',
          borderRadius: 8,
          overflow: 'hidden',
          aspectRatio: '16/9',
          position: 'relative',
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          {/* Browser chrome */}
          <div style={{
            background: '#0d0d1a', padding: '6px 10px',
            display: 'flex', alignItems: 'center', gap: 6,
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>
            {['#FF5F57', '#FFBD2E', '#28C840'].map((c, i) => (
              <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
            ))}
            <div style={{
              flex: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 4,
              height: 16, marginLeft: 8,
              display: 'flex', alignItems: 'center', paddingLeft: 8,
            }}>
              <span style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.3)' }}>
                devnova.com/portfolio/{site.name.toLowerCase().replace(' ', '-')}
              </span>
            </div>
          </div>

          {/* Website preview */}
          <div style={{
            position: 'relative',
            height: 'calc(100% - 30px)',
            background: `linear-gradient(135deg, ${site.color}15, #050816 60%)`,
            transition: 'all 0.5s ease',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: 20,
          }}>
            {/* Mock hero */}
            <div style={{ width: '100%', maxWidth: 280 }}>
              <div style={{
                height: 6, background: `linear-gradient(90deg, ${site.color}, ${site.color}50)`,
                borderRadius: 3, marginBottom: 6, width: '60%',
              }} />
              <div style={{
                height: 10, background: `linear-gradient(90deg, white, rgba(255,255,255,0.8))`,
                borderRadius: 3, marginBottom: 6, opacity: 0.9,
              }} />
              <div style={{
                height: 4, background: 'rgba(255,255,255,0.3)',
                borderRadius: 2, marginBottom: 4, width: '80%',
              }} />
              <div style={{
                height: 4, background: 'rgba(255,255,255,0.3)',
                borderRadius: 2, marginBottom: 12, width: '65%',
              }} />
              <div style={{
                display: 'inline-block',
                background: `linear-gradient(135deg, ${site.color}, ${site.color}aa)`,
                borderRadius: 20, padding: '4px 12px',
                fontSize: '0.5rem', color: '#fff', fontWeight: 700,
                fontFamily: 'var(--font-main)',
              }}>
                View Project →
              </div>
            </div>

            {/* Site name badge */}
            <div style={{
              position: 'absolute', top: 8, right: 8,
              background: `${site.color}20`,
              border: `1px solid ${site.color}40`,
              borderRadius: 20, padding: '2px 8px',
              fontSize: '0.45rem', color: site.color, fontWeight: 700,
              fontFamily: 'var(--font-main)',
            }}>
              {site.name}
            </div>

            {/* Floating 3D cube on screen */}
            <div style={{
              position: 'absolute', right: 20, top: '20%',
              width: 40, height: 40,
              background: `linear-gradient(135deg, ${site.color}40, ${site.color}10)`,
              border: `1px solid ${site.color}60`,
              borderRadius: 6, transform: 'rotate(25deg)',
              boxShadow: `0 0 15px ${site.color}30`,
              animation: 'float 4s ease-in-out infinite',
            }} />
          </div>
        </div>
      </div>

      {/* Laptop base */}
      <div style={{
        background: 'linear-gradient(180deg, #1a1a2e, #0f0f1e)',
        height: 16, borderRadius: '0 0 12px 12px',
        border: '1px solid rgba(255,255,255,0.08)',
        borderTop: 'none',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          width: '30%', height: 8,
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '4px 4px 0 0',
        }} />
      </div>

      {/* Neon glow effects */}
      <div style={{
        position: 'absolute', top: '20%', left: -20,
        width: 40, height: 100,
        background: 'linear-gradient(180deg, transparent, var(--primary), transparent)',
        opacity: 0.3,
        filter: 'blur(8px)',
        animation: 'pulse-glow 3s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', top: '20%', right: -20,
        width: 40, height: 100,
        background: 'linear-gradient(180deg, transparent, var(--secondary), transparent)',
        opacity: 0.3,
        filter: 'blur(8px)',
        animation: 'pulse-glow 3s ease-in-out infinite 1.5s',
      }} />
    </div>
  );
}
