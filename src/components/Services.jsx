import { useEffect, useRef, useState } from 'react';
import { TbWorld, TbDeviceMobile, TbShoppingCart, TbBrain, TbPalette, TbCloud } from 'react-icons/tb';
import { HiArrowRight } from 'react-icons/hi';

const C = '#00E5FF'; // single accent color

const services = [
  {
    Icon: TbWorld,
    title: 'Website Development',
    desc: 'Responsive, fast and modern websites built with the latest technologies for maximum performance.',
    tags: ['React', 'Next.js', 'Laravel'],
  },
  {
    Icon: TbDeviceMobile,
    title: 'Mobile App Development',
    desc: 'iOS & Android apps that users love, built with React Native and Flutter.',
    tags: ['React Native', 'Flutter', 'iOS', 'Android'],
  },
  {
    Icon: TbShoppingCart,
    title: 'Ecommerce Solutions',
    desc: 'Online stores that convert and scale — from simple shops to enterprise marketplaces.',
    tags: ['Shopify', 'WooCommerce', 'Custom'],
  },
  {
    Icon: TbBrain,
    title: 'AI Integration',
    desc: 'Smart AI solutions to automate your business, from chatbots to intelligent data pipelines.',
    tags: ['ChatGPT API', 'ML Models', 'Automation'],
  },
  {
    Icon: TbPalette,
    title: 'UI/UX Design',
    desc: 'Beautiful, intuitive and user-centered designs that delight your users and convert.',
    tags: ['Figma', 'Framer', 'Prototyping'],
  },
  {
    Icon: TbCloud,
    title: 'Cloud & DevOps',
    desc: 'Scalable, secure and high-performance cloud solutions. Deploy with confidence.',
    tags: ['AWS', 'Vercel', 'Docker', 'CI/CD'],
  },
];

export default function Services() {
  const sectionRef = useRef(null);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal,.reveal-scale').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} style={{ padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
      {/* bg glow */}
      <div style={{ position:'absolute', left:'-5%', bottom:'10%', width:600, height:600, borderRadius:'50%',
        background:'radial-gradient(circle,rgba(0,229,255,0.05),transparent 70%)', filter:'blur(80px)', pointerEvents:'none' }}/>

      <div className="section-container">
        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:56 }}>
          <div className="section-tag reveal">Our Services</div>
          <h2 className="section-title reveal delay-1">
            What We Can Do <span className="gradient-text">For You</span>
          </h2>
          <p className="reveal delay-2" style={{ color:'rgba(255,255,255,0.45)', maxWidth:520, margin:'14px auto 0', lineHeight:1.75 }}>
            End-to-end digital solutions to help your business grow, convert and scale globally.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }} className="svc-grid">
          {services.map((svc, i) => {
            const isHov = hovered === i;
            return (
              <div
                key={i}
                className={`reveal-scale delay-${(i%6)+1}`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  padding: '32px 28px',
                  borderRadius: 20,
                  background: isHov ? 'rgba(0,229,255,0.04)' : 'rgba(255,255,255,0.025)',
                  border: `1px solid ${isHov ? 'rgba(0,229,255,0.35)' : 'rgba(255,255,255,0.07)'}`,
                  backdropFilter: 'blur(12px)',
                  cursor: 'none',
                  transition: 'all 0.3s ease',
                  transform: isHov ? 'translateY(-6px)' : 'translateY(0)',
                  boxShadow: isHov ? '0 20px 60px rgba(0,229,255,0.08)' : 'none',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {/* top border line on hover */}
                <div style={{
                  position:'absolute', top:0, left:0, right:0, height:2,
                  background:`linear-gradient(90deg, transparent, ${C}, transparent)`,
                  opacity: isHov ? 1 : 0, transition:'opacity 0.3s',
                }}/>

                {/* Icon */}
                <div style={{
                  width: 54, height: 54, borderRadius: 14,
                  background: isHov ? 'rgba(0,229,255,0.12)' : 'rgba(0,229,255,0.07)',
                  border: `1.5px solid ${isHov ? 'rgba(0,229,255,0.4)' : 'rgba(0,229,255,0.15)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 20,
                  transition: 'all 0.3s',
                  boxShadow: isHov ? '0 0 24px rgba(0,229,255,0.2)' : 'none',
                }}>
                  <svc.Icon size={26} color={C} style={{
                    transition: 'transform 0.3s',
                    transform: isHov ? 'scale(1.15)' : 'scale(1)',
                    filter: isHov ? 'drop-shadow(0 0 6px rgba(0,229,255,0.8))' : 'none',
                  }}/>
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: 'var(--font-main)', fontSize: '1.05rem', fontWeight: 700,
                  color: isHov ? '#fff' : 'rgba(255,255,255,0.9)',
                  marginBottom: 10, transition: 'color 0.3s',
                }}>
                  {svc.title}
                </h3>

                {/* Desc */}
                <p style={{
                  color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem',
                  lineHeight: 1.75, marginBottom: 18,
                }}>
                  {svc.desc}
                </p>

                {/* Tags */}
                <div style={{ display:'flex', gap:7, flexWrap:'wrap', marginBottom:20 }}>
                  {svc.tags.map(tag => (
                    <span key={tag} style={{
                      fontSize: '0.72rem', padding: '4px 11px',
                      background: 'rgba(0,229,255,0.07)',
                      border: '1px solid rgba(0,229,255,0.18)',
                      borderRadius: 20, color: C, fontWeight: 600,
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Learn more */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  color: C, fontSize: '0.85rem', fontWeight: 600,
                  fontFamily: 'var(--font-main)',
                  opacity: isHov ? 1 : 0.5, transition: 'opacity 0.3s',
                }}>
                  Learn More
                  <HiArrowRight size={15} style={{
                    transition: 'transform 0.3s',
                    transform: isHov ? 'translateX(4px)' : 'translateX(0)',
                  }}/>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .svc-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 560px) { .svc-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
