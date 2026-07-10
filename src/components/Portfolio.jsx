import { useEffect, useRef, useState } from 'react';
import { TbExternalLink, TbArrowRight } from 'react-icons/tb';
import { AiFillStar } from 'react-icons/ai';

const C = '#00E5FF';

const projects = [
  {
    name: 'FitZone Gym',
    category: 'Website Development',
    desc: 'A high-performance fitness center website with booking system and membership portal.',
    tech: ['React', 'Node.js', 'MongoDB'],
    review: '"DevNova delivered an amazing website. Highly professional!" — Ali Khan, CEO',
    stars: 5,
  },
  {
    name: 'Urban Eats',
    category: 'Website Development',
    desc: 'Full-stack restaurant ordering platform with real-time kitchen dashboard and payment integration.',
    tech: ['Next.js', 'Express', 'PostgreSQL'],
    review: '"Delivered beyond our expectations. Stunning design!" — Sarah Ahmed, Founder',
    stars: 5,
  },
  {
    name: 'MedicoPlus',
    category: 'Web & Mobile App',
    desc: 'Healthcare management system with patient portal, appointment booking and telemedicine.',
    tech: ['React Native', 'Laravel', 'MySQL'],
    review: '"On-time delivery and excellent support. Highly recommended!" — Usman Malik, CTO',
    stars: 5,
  },
  {
    name: 'TravelVista',
    category: 'Website Development',
    desc: 'Premium travel booking platform with destination discovery and itinerary planning.',
    tech: ['Next.js', 'Tailwind', 'Firebase'],
    review: '"Our website looks incredible and performance is outstanding." — Hamza Raza',
    stars: 5,
  },
  {
    name: 'EduLearn Pro',
    category: 'E-Learning Platform',
    desc: 'Comprehensive LMS with video streaming, live classes, and AI-powered quiz generation.',
    tech: ['React', 'AWS', 'Node.js'],
    review: '"Students love the new platform. Enrollment up 40%!" — Dr. Nida, Principal',
    stars: 5,
  },
  {
    name: 'FinTrack',
    category: 'Fintech Dashboard',
    desc: 'Real-time financial analytics dashboard with AI-powered spending insights and forecasting.',
    tech: ['React', 'Python', 'PostgreSQL'],
    review: '"Best investment for our fintech startup. Exceptional work!" — Zara S., CFO',
    stars: 5,
  },
];

export default function Portfolio() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal,.reveal-scale').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} style={{ padding:'100px 0', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', right:'-5%', top:'20%', width:500, height:500, borderRadius:'50%',
        background:'radial-gradient(circle,rgba(0,229,255,0.05),transparent 70%)',
        filter:'blur(80px)', pointerEvents:'none' }}/>

      <div className="section-container">
        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end',
          marginBottom:52, flexWrap:'wrap', gap:20 }}>
          <div>
            <div className="section-tag reveal">Our Works</div>
            <h2 className="section-title reveal delay-1">
              Featured <span className="gradient-text">Projects</span>
            </h2>
          </div>
          <a href="#contact" className="btn-outline reveal delay-2"
            style={{ display:'flex', alignItems:'center', gap:8 }}
            onClick={e=>{ e.preventDefault(); document.getElementById('contact')?.scrollIntoView({behavior:'smooth'}); }}>
            View All Projects <TbArrowRight size={16}/>
          </a>
        </div>

        {/* Grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }} className="port-grid">
          {projects.map((p, i) => {
            const isHov = active === i;
            return (
              <div
                key={i}
                className={`reveal-scale delay-${(i%6)+1}`}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                style={{
                  borderRadius:20, overflow:'hidden',
                  background: isHov ? 'rgba(0,229,255,0.04)' : 'rgba(255,255,255,0.025)',
                  border:`1px solid ${isHov ? 'rgba(0,229,255,0.35)' : 'rgba(255,255,255,0.07)'}`,
                  transition:'all 0.3s ease',
                  transform: isHov ? 'translateY(-7px)' : 'translateY(0)',
                  boxShadow: isHov ? '0 24px 60px rgba(0,229,255,0.08)' : 'none',
                  cursor:'none',
                  position:'relative',
                }}
              >
                {/* Top accent line */}
                <div style={{
                  height:2,
                  background:`linear-gradient(90deg,transparent,${C},transparent)`,
                  opacity: isHov ? 1 : 0, transition:'opacity 0.3s',
                }}/>

                {/* Preview */}
                <div style={{
                  height:180, position:'relative', overflow:'hidden',
                  background:'rgba(0,229,255,0.03)',
                  borderBottom:`1px solid ${isHov ? 'rgba(0,229,255,0.15)' : 'rgba(255,255,255,0.05)'}`,
                }}>
                  {/* mock browser */}
                  <div style={{
                    position:'absolute', inset:'16px 20px',
                    background:'rgba(5,8,22,0.9)',
                    borderRadius:10, overflow:'hidden',
                    border:'1px solid rgba(255,255,255,0.08)',
                    boxShadow:'0 8px 32px rgba(0,0,0,0.4)',
                  }}>
                    {/* browser bar */}
                    <div style={{ background:'rgba(255,255,255,0.04)', padding:'6px 10px',
                      display:'flex', gap:5, alignItems:'center',
                      borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
                      {['#FF5F57','#FFBD2E','#28C840'].map((c,j)=>(
                        <div key={j} style={{ width:7, height:7, borderRadius:'50%', background:c }}/>
                      ))}
                      <div style={{ flex:1, height:13, borderRadius:4, marginLeft:8,
                        background:'rgba(0,229,255,0.07)',
                        display:'flex', alignItems:'center', paddingLeft:8 }}>
                        <span style={{ fontSize:'0.48rem', color:'rgba(0,229,255,0.5)' }}>
                          devnova.studio/{p.name.toLowerCase().replace(/\s/g,'-')}
                        </span>
                      </div>
                    </div>
                    {/* content lines */}
                    <div style={{ padding:'14px 14px' }}>
                      <div style={{ height:7, background:`rgba(0,229,255,0.35)`, borderRadius:3,
                        marginBottom:8, width:'55%' }}/>
                      <div style={{ height:4, background:'rgba(255,255,255,0.15)', borderRadius:2, marginBottom:5 }}/>
                      <div style={{ height:4, background:'rgba(255,255,255,0.1)', borderRadius:2, marginBottom:5, width:'80%' }}/>
                      <div style={{ height:4, background:'rgba(255,255,255,0.07)', borderRadius:2, width:'65%' }}/>
                      <div style={{ marginTop:14, display:'inline-block',
                        background:'rgba(0,229,255,0.18)', border:'1px solid rgba(0,229,255,0.35)',
                        borderRadius:20, padding:'4px 14px',
                        fontSize:'0.48rem', color:C, fontWeight:700, fontFamily:'var(--font-main)' }}>
                        View Project →
                      </div>
                    </div>
                  </div>

                  {/* category badge */}
                  <div style={{
                    position:'absolute', top:12, left:12,
                    background:'rgba(5,8,22,0.85)', backdropFilter:'blur(8px)',
                    border:`1px solid rgba(0,229,255,0.25)`,
                    borderRadius:20, padding:'3px 10px',
                    fontSize:'0.65rem', color:C, fontWeight:700,
                    fontFamily:'var(--font-main)',
                  }}>
                    {p.category}
                  </div>

                  {/* hover overlay */}
                  <div style={{
                    position:'absolute', inset:0,
                    background:'rgba(0,0,0,0.55)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    opacity: isHov ? 1 : 0, transition:'opacity 0.3s',
                  }}>
                    <a href="#" onClick={e=>e.preventDefault()} style={{
                      display:'flex', alignItems:'center', gap:7,
                      padding:'9px 20px', borderRadius:22,
                      background:'rgba(0,229,255,0.15)',
                      border:`1.5px solid ${C}`,
                      color:C, fontSize:'0.82rem', fontWeight:700,
                      textDecoration:'none', fontFamily:'var(--font-main)',
                      backdropFilter:'blur(8px)',
                      boxShadow:`0 0 20px rgba(0,229,255,0.25)`,
                    }}>
                      Visit Live <TbExternalLink size={15}/>
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding:'20px 22px' }}>
                  <h3 style={{ fontFamily:'var(--font-main)', fontSize:'1rem', fontWeight:700,
                    marginBottom:8, color: isHov ? '#fff' : 'rgba(255,255,255,0.88)',
                    transition:'color 0.3s' }}>
                    {p.name}
                  </h3>
                  <p style={{ color:'rgba(255,255,255,0.45)', fontSize:'0.83rem',
                    lineHeight:1.65, marginBottom:14 }}>
                    {p.desc}
                  </p>

                  {/* Tech tags */}
                  <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:14 }}>
                    {p.tech.map(t => (
                      <span key={t} style={{
                        fontSize:'0.68rem', padding:'3px 10px',
                        background:'rgba(0,229,255,0.07)',
                        border:'1px solid rgba(0,229,255,0.18)',
                        borderRadius:20, color:C, fontWeight:600,
                      }}>{t}</span>
                    ))}
                  </div>

                  {/* Review */}
                  <div style={{
                    padding:'12px 14px',
                    background:'rgba(0,229,255,0.03)',
                    borderLeft:`2px solid rgba(0,229,255,0.35)`,
                    borderRadius:'0 8px 8px 0',
                  }}>
                    <div style={{ display:'flex', gap:2, marginBottom:5 }}>
                      {[...Array(p.stars)].map((_,i)=>(
                        <AiFillStar key={i} size={11} color="#FFD700"/>
                      ))}
                    </div>
                    <p style={{ color:'rgba(255,255,255,0.4)', fontSize:'0.73rem',
                      lineHeight:1.55, fontStyle:'italic' }}>
                      {p.review}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media(max-width:960px){ .port-grid{ grid-template-columns:repeat(2,1fr) !important; } }
        @media(max-width:580px){ .port-grid{ grid-template-columns:1fr !important; } }
      `}</style>
    </section>
  );
}
