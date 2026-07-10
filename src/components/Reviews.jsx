import { useEffect, useRef, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { BiSolidQuoteAltLeft } from 'react-icons/bi';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const reviews = [
  {
    name: 'Ali Khan',
    role: 'CEO, FitZone Gym',
    text: 'DevNova Studio delivered an amazing website for our business. Highly professional and modern team! The quality exceeded all our expectations.',
    stars: 5,
    avatar: 'AK',
    color: '#FF6B35',
  },
  {
    name: 'Sarah Ahmed',
    role: 'Founder, Urban Eats',
    text: "They understood our requirements perfectly and delivered beyond our expectations. The design is stunning and the performance is exceptional.",
    stars: 5,
    avatar: 'SA',
    color: '#00C853',
  },
  {
    name: 'Usman Malik',
    role: 'CTO, MedicoPlus',
    text: 'Great communication, on-time delivery and excellent support. Highly recommended! They truly understand what modern web development means.',
    stars: 5,
    avatar: 'UM',
    color: '#2196F3',
  },
  {
    name: 'Hamza Raza',
    role: 'Manager, TravelVista',
    text: 'Our website looks incredible and the performance is outstanding. The DevNova team is responsive, professional and delivered everything we asked for.',
    stars: 5,
    avatar: 'HR',
    color: '#9C27B0',
  },
  {
    name: 'Dr. Nida Fatima',
    role: 'Principal, EduLearn',
    text: "Transformed our education delivery completely. Students love the new platform and our enrollment increased by 40% since the launch. Incredible work!",
    stars: 5,
    avatar: 'NF',
    color: '#FF9800',
  },
  {
    name: 'Zara Siddiqui',
    role: 'CFO, FinTrack',
    text: 'Best investment we made for our fintech startup. The dashboard is beautiful, fast and secure. DevNova team was a pleasure to work with.',
    stars: 5,
    avatar: 'ZS',
    color: '#00BCD4',
  },
];

export default function Reviews() {
  const sectionRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      sectionRef.current.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    autoRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % reviews.length);
    }, 3500);
    return () => clearInterval(autoRef.current);
  }, [isAutoPlaying]);

  const prev = () => { clearInterval(autoRef.current); setIsAutoPlaying(false); setCurrent(c => (c - 1 + reviews.length) % reviews.length); };
  const next = () => { clearInterval(autoRef.current); setIsAutoPlaying(false); setCurrent(c => (c + 1) % reviews.length); };

  const visibleIndices = [-1, 0, 1].map(offset => (current + offset + reviews.length) % reviews.length);

  return (
    <section ref={sectionRef} style={{ padding: '60px 0 40px', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', right: '-5%', bottom: '10%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      <div className="section-container">
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div className="section-tag reveal">Client Reviews</div>
          <h2 className="section-title reveal delay-1">
            What Clients <span className="gradient-text">Say About Us</span>
          </h2>
          <p className="reveal delay-2" style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 500, margin: '12px auto 0', lineHeight: 1.7 }}>
            Don't just take our word for it — hear from the businesses we've helped grow.
          </p>
        </div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
          marginBottom: 40,
          position: 'relative',
        }}
          className="reveal"
        >
          {visibleIndices.map((idx, pos) => {
            const r = reviews[idx];
            const isCenter = pos === 1;
            return (
              <div
                key={idx}
                className="glass"
                style={{
                  padding: 28,
                  transition: 'all 0.5s ease',
                  transform: isCenter ? 'scale(1.03)' : 'scale(0.97)',
                  opacity: isCenter ? 1 : 0.6,
                  borderColor: isCenter ? `${r.color}40` : 'var(--glass-border)',
                  boxShadow: isCenter ? `0 20px 60px ${r.color}15` : 'none',
                  cursor: 'none',
                }}
                onClick={() => setCurrent(idx)}
              >
                <BiSolidQuoteAltLeft size={28} color={r.color} style={{ marginBottom: 16, opacity: 0.6 }} />

                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.92rem', lineHeight: 1.75, marginBottom: 20, fontStyle: 'italic' }}>
                  "{r.text}"
                </p>

                <div style={{ display: 'flex', gap: 3, marginBottom: 14 }}>
                  {[...Array(r.stars)].map((_, i) => <AiFillStar key={i} size={14} color="#FFD700" />)}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: `linear-gradient(135deg, ${r.color}, ${r.color}80)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-main)', fontWeight: 800, fontSize: '0.85rem', color: '#fff',
                    flexShrink: 0,
                    boxShadow: `0 0 15px ${r.color}40`,
                  }}>
                    {r.avatar}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-main)', fontWeight: 700, fontSize: '0.9rem' }}>{r.name}</div>
                    <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem' }}>{r.role}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
          <button
            onClick={prev}
            className="glass"
            style={{
              width: 44, height: 44, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid var(--glass-border)', cursor: 'none', color: 'white',
              transition: 'border-color 0.3s, transform 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.transform = 'scale(1.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <HiChevronLeft size={18} />
          </button>

          <div style={{ display: 'flex', gap: 8 }}>
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => { setIsAutoPlaying(false); setCurrent(i); }}
                style={{
                  width: i === current ? 24 : 8,
                  height: 8, borderRadius: 4,
                  background: i === current ? 'var(--primary)' : 'rgba(255,255,255,0.2)',
                  border: 'none', cursor: 'none',
                  transition: 'all 0.3s',
                  boxShadow: i === current ? '0 0 10px var(--primary)' : 'none',
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="glass"
            style={{
              width: 44, height: 44, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid var(--glass-border)', cursor: 'none', color: 'white',
              transition: 'border-color 0.3s, transform 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.transform = 'scale(1.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <HiChevronRight size={18} />
          </button>
        </div>

        {/* Trust logos row */}
        <div className="reveal" style={{ marginTop: 36, textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>
            Trusted by businesses in
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
            {['Pakistan 🇵🇰', 'UAE 🇦🇪', 'Qatar 🇶🇦', 'USA 🇺🇸', 'UK 🇬🇧', 'Canada 🇨🇦', 'Australia 🇦🇺'].map(c => (
              <span key={c} style={{
                color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem',
                padding: '6px 16px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 20,
              }}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
