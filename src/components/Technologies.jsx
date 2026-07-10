import { useEffect, useRef, useState } from 'react';
import { SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiLaravel, SiFlutter, SiMongodb, SiPostgresql, SiDocker, SiFirebase, SiTailwindcss, SiFigma, SiTypescript, SiPython } from 'react-icons/si';
import { TbBrandReactNative } from 'react-icons/tb';
import { FaAws } from 'react-icons/fa';

const techs = [
  { name: 'React',         Icon: SiReact,            color: '#61DAFB' },
  { name: 'Next.js',       Icon: SiNextdotjs,        color: '#FFFFFF' },
  { name: 'Node.js',       Icon: SiNodedotjs,        color: '#68A063' },
  { name: 'Express',       Icon: SiExpress,          color: '#aaaaaa' },
  { name: 'Laravel',       Icon: SiLaravel,          color: '#FF2D20' },
  { name: 'Flutter',       Icon: SiFlutter,          color: '#54C5F8' },
  { name: 'React Native',  Icon: TbBrandReactNative, color: '#61DAFB' },
  { name: 'MongoDB',       Icon: SiMongodb,          color: '#4DB33D' },
  { name: 'PostgreSQL',    Icon: SiPostgresql,       color: '#336791' },
  { name: 'AWS',           Icon: FaAws,              color: '#FF9900' },
  { name: 'Docker',        Icon: SiDocker,           color: '#2496ED' },
  { name: 'Firebase',      Icon: SiFirebase,         color: '#FFCA28' },
  { name: 'Tailwind',      Icon: SiTailwindcss,      color: '#06B6D4' },
  { name: 'Figma',         Icon: SiFigma,            color: '#F24E1E' },
  { name: 'TypeScript',    Icon: SiTypescript,       color: '#3178C6' },
  { name: 'Python',        Icon: SiPython,           color: '#3776AB' },
];

const doubled = [...techs, ...techs];

export default function Technologies() {
  const sectionRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [paused, setPaused] = useState(false);

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

  return (
    <section ref={sectionRef} style={{ padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 80% 40% at 50% 50%, rgba(0,229,255,0.04), transparent)',
        pointerEvents: 'none',
      }} />

      <div className="section-container">
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div className="section-tag reveal">Tech Stack</div>
          <h2 className="section-title reveal delay-1">
            Technologies We <span className="gradient-text">Master</span>
          </h2>
          <p className="reveal delay-2" style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 500, margin: '12px auto 0', lineHeight: 1.7 }}>
            We use the best tools to build fast, scalable and beautiful products.
          </p>
        </div>
      </div>

      {/* Marquee row 1 */}
      <div
        style={{ overflow: 'hidden', marginBottom: 16, maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div style={{
          display: 'flex', gap: 14,
          animation: 'marquee 35s linear infinite',
          animationPlayState: paused ? 'paused' : 'running',
          width: 'max-content',
        }}>
          {doubled.map((tech, i) => (
            <TechChip key={i} tech={tech} isHovered={hovered === `a${i}`} onHover={() => setHovered(`a${i}`)} onLeave={() => setHovered(null)} />
          ))}
        </div>
      </div>

      {/* Marquee row 2 — reverse */}
      <div
        style={{ overflow: 'hidden', maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div style={{
          display: 'flex', gap: 14,
          animation: 'marquee 28s linear infinite reverse',
          animationPlayState: paused ? 'paused' : 'running',
          width: 'max-content',
        }}>
          {[...doubled].reverse().map((tech, i) => (
            <TechChip key={i} tech={tech} isHovered={hovered === `b${i}`} onHover={() => setHovered(`b${i}`)} onLeave={() => setHovered(null)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TechChip({ tech, isHovered, onHover, onLeave }) {
  const { Icon, color, name } = tech;
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '11px 20px',
        background: isHovered ? `${color}18` : 'rgba(255,255,255,0.04)',
        border: `1px solid ${isHovered ? `${color}60` : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 12,
        whiteSpace: 'nowrap', cursor: 'none',
        transition: 'all 0.25s ease',
        transform: isHovered ? 'translateY(-5px) scale(1.06)' : 'translateY(0) scale(1)',
        boxShadow: isHovered ? `0 10px 35px ${color}30` : 'none',
        flexShrink: 0,
      }}
    >
      {/* Icon — always shown in real brand color */}
      <div style={{
        width: 26, height: 26,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: color,                          /* always brand color */
        transition: 'filter 0.25s, transform 0.35s',
        filter: isHovered ? `drop-shadow(0 0 7px ${color}cc)` : `drop-shadow(0 0 0px transparent)`,
        transform: isHovered ? 'scale(1.2) rotate(8deg)' : 'scale(1) rotate(0deg)',
        flexShrink: 0,
      }}>
        <Icon size={22} />
      </div>

      <span style={{
        fontFamily: 'var(--font-main)', fontWeight: 600, fontSize: '0.88rem',
        color: isHovered ? '#ffffff' : 'rgba(255,255,255,0.65)',
        transition: 'color 0.25s',
      }}>
        {name}
      </span>
    </div>
  );
}
