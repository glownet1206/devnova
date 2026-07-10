import { useEffect, useRef, useState } from 'react';
import { TbSearch, TbPencil, TbCode, TbTestPipe, TbRocket, TbHeadphones } from 'react-icons/tb';

const steps = [
  { num: '01', icon: TbSearch, title: 'Discovery', desc: 'We understand your business needs, goals, and target audience to create the perfect strategy.', color: '#00E5FF' },
  { num: '02', icon: TbPencil, title: 'Design', desc: 'We create modern, user-friendly designs that reflect your brand and delight your users.', color: '#7B61FF' },
  { num: '03', icon: TbCode, title: 'Development', desc: 'We build fast, clean and scalable code using the latest technologies and best practices.', color: '#00FFC6' },
  { num: '04', icon: TbTestPipe, title: 'Testing', desc: 'We test everything thoroughly to ensure quality, performance and security before launch.', color: '#FF6B9D' },
  { num: '05', icon: TbRocket, title: 'Launch', desc: 'We launch your project and make it live with zero downtime and full monitoring.', color: '#FFB830' },
  { num: '06', icon: TbHeadphones, title: 'Support', desc: 'We provide ongoing support and maintenance to keep your project running perfectly.', color: '#4FFFB0' },
];

export default function Process() {
  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      sectionRef.current.querySelectorAll('.reveal, .reveal-scale').forEach(el => observer.observe(el));
    }
    return () => observer.disconnect();
  }, []);

  // Animate line on scroll
  useEffect(() => {
    const onScroll = () => {
      if (!lineRef.current || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (rect.height + window.innerHeight)));
      if (lineRef.current) lineRef.current.style.width = `${progress * 100}%`;
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="process" ref={sectionRef} style={{ padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', left: '-5%', top: '20%',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      <div className="section-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div className="section-tag reveal">Our Process</div>
            <h2 className="section-title reveal delay-1">
              Our Development <span className="gradient-text">Process</span>
            </h2>
            <p className="reveal delay-2" style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 400, marginTop: 12, lineHeight: 1.7 }}>
              We follow a simple and effective process to deliver the best results, on time and on budget.
            </p>
          </div>
          <a
            href="#contact"
            className="btn-primary reveal delay-3"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            <span>Start Your Project</span>
          </a>
        </div>

        {/* Timeline connector */}
        <div style={{ position: 'relative', marginBottom: 40, display: 'none' }} className="timeline-line">
          <div style={{
            height: 2, background: 'rgba(255,255,255,0.08)', borderRadius: 2,
            position: 'relative', overflow: 'hidden',
          }}>
            <div ref={lineRef} style={{
              position: 'absolute', inset: '0 auto 0 0',
              background: 'linear-gradient(90deg, var(--primary), var(--secondary), var(--accent))',
              width: 0, transition: 'width 0.3s',
            }} />
          </div>
        </div>

        {/* Steps grid — 3 columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24, position: 'relative',
        }}>
          {/* Animated timeline line (horizontal) */}
          <div style={{
            position: 'absolute', top: 48, left: 0, right: 0, height: 1,
            background: 'linear-gradient(90deg, var(--primary), var(--secondary), var(--accent), var(--primary))',
            opacity: 0.2, zIndex: 0,
            display: 'none',
          }} />

          {steps.map((step, i) => {
            const Icon = step.icon;
            const isActive = activeStep === i;
            return (
              <div
                key={i}
                className={`glass reveal-scale delay-${(i % 6) + 1}`}
                onMouseEnter={() => setActiveStep(i)}
                onMouseLeave={() => setActiveStep(null)}
                style={{
                  padding: '28px 24px',
                  cursor: 'none',
                  transition: 'transform 0.3s ease, border-color 0.3s, box-shadow 0.3s',
                  transform: isActive ? 'translateY(-8px)' : 'translateY(0)',
                  borderColor: isActive ? `${step.color}40` : 'var(--glass-border)',
                  boxShadow: isActive ? `0 20px 60px ${step.color}15` : 'none',
                  position: 'relative', overflow: 'hidden',
                  zIndex: 1,
                }}
              >
                {/* Background glow */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `radial-gradient(circle at 20% 20%, ${step.color}08, transparent 60%)`,
                  opacity: isActive ? 1 : 0, transition: 'opacity 0.4s',
                }} />

                {/* Step number */}
                <div style={{
                  fontFamily: 'var(--font-main)', fontSize: '3rem', fontWeight: 900,
                  background: `linear-gradient(135deg, ${step.color}30, transparent)`,
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  position: 'absolute', top: 12, right: 16, lineHeight: 1,
                  userSelect: 'none',
                }}>
                  {step.num}
                </div>

                {/* Icon */}
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: `${step.color}18`, border: `1px solid ${step.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 16,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  transform: isActive ? 'scale(1.1)' : 'scale(1)',
                  boxShadow: isActive ? `0 0 20px ${step.color}40` : 'none',
                  position: 'relative',
                }}>
                  <Icon size={22} color={step.color} />
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-main)', fontSize: '1.05rem', fontWeight: 700,
                  marginBottom: 8, color: 'var(--text)', position: 'relative',
                }}>
                  {step.title}
                </h3>

                <p style={{
                  color: 'rgba(255,255,255,0.5)', fontSize: '0.87rem', lineHeight: 1.7,
                  position: 'relative',
                }}>
                  {step.desc}
                </p>

                {/* Arrow connector */}
                {i < steps.length - 1 && (
                  <div style={{
                    position: 'absolute', bottom: -12, right: -12,
                    width: 24, height: 24, borderRadius: '50%',
                    background: `${step.color}20`, border: `1px solid ${step.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.7rem', color: step.color,
                    zIndex: 2,
                  }}>
                    ↓
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
