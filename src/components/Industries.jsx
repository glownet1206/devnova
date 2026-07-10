import { useEffect, useRef, useState } from 'react';
import { MdRestaurant, MdLocalHospital, MdSchool, MdHotel, MdLocalAtm } from 'react-icons/md';
import { FaDumbbell, FaPlane, FaBuilding, FaShoppingCart, FaStethoscope } from 'react-icons/fa';
import { BsFillCreditCard2FrontFill } from 'react-icons/bs';
import { GiCarWheel } from 'react-icons/gi';

const industries = [
  {
    name: 'Restaurant',
    Icon: MdRestaurant,
    desc: 'Menu, ordering & booking',
    color: '#FF6B35',
    grad: 'linear-gradient(135deg, #FF6B35, #FF3D00)',
  },
  {
    name: 'Gym & Fitness',
    Icon: FaDumbbell,
    desc: 'Membership & scheduling',
    color: '#00E5FF',
    grad: 'linear-gradient(135deg, #00E5FF, #0077FF)',
  },
  {
    name: 'Hospital',
    Icon: MdLocalHospital,
    desc: 'Appointments & telemedicine',
    color: '#2196F3',
    grad: 'linear-gradient(135deg, #2196F3, #1565C0)',
  },
  {
    name: 'Real Estate',
    Icon: FaBuilding,
    desc: 'Listings & lead capture',
    color: '#00C853',
    grad: 'linear-gradient(135deg, #00C853, #007B33)',
  },
  {
    name: 'School',
    Icon: MdSchool,
    desc: 'LMS & admin portals',
    color: '#FF9800',
    grad: 'linear-gradient(135deg, #FF9800, #E65100)',
  },
  {
    name: 'Travel',
    Icon: FaPlane,
    desc: 'Booking & itineraries',
    color: '#9C27B0',
    grad: 'linear-gradient(135deg, #9C27B0, #6A1B9A)',
  },
  {
    name: 'Finance',
    Icon: MdLocalAtm,
    desc: 'Dashboards & analytics',
    color: '#FFD700',
    grad: 'linear-gradient(135deg, #FFD700, #FF8F00)',
  },
  {
    name: 'Tyre Shop',
    Icon: GiCarWheel,
    desc: 'Inventory & appointments',
    color: '#90A4AE',
    grad: 'linear-gradient(135deg, #90A4AE, #455A64)',
  },
  {
    name: 'POS System',
    Icon: BsFillCreditCard2FrontFill,
    desc: 'Sales & inventory mgmt',
    color: '#00BCD4',
    grad: 'linear-gradient(135deg, #00BCD4, #006064)',
  },
  {
    name: 'E-Commerce',
    Icon: FaShoppingCart,
    desc: 'Online stores & carts',
    color: '#E91E63',
    grad: 'linear-gradient(135deg, #E91E63, #880E4F)',
  },
  {
    name: 'Hotel',
    Icon: MdHotel,
    desc: 'Booking & CRM',
    color: '#66BB6A',
    grad: 'linear-gradient(135deg, #66BB6A, #2E7D32)',
  },
  {
    name: 'Clinic',
    Icon: FaStethoscope,
    desc: 'Patient & record mgmt',
    color: '#F44336',
    grad: 'linear-gradient(135deg, #F44336, #B71C1C)',
  },
];

export default function Industries() {
  const sectionRef = useRef(null);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      sectionRef.current.querySelectorAll('.reveal, .reveal-scale')
        .forEach(el => observer.observe(el));
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
      {/* bg glow */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%,-50%)',
        width: 900, height: 600, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(123,97,255,0.06) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      <div className="section-container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-tag reveal">Industries We Serve</div>
          <h2 className="section-title reveal delay-1">
            Every Business, <span className="gradient-text">Every Industry</span>
          </h2>
          <p className="reveal delay-2" style={{
            color: 'rgba(255,255,255,0.5)', maxWidth: 520,
            margin: '14px auto 0', lineHeight: 1.7,
          }}>
            We've built solutions across 12+ industries. Whatever your niche, we have the expertise to deliver.
          </p>
        </div>

        {/* Grid */}
        <div className="ind-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: 16,
        }}>
          <style>{`
            @media (max-width: 1100px) { .ind-grid { grid-template-columns: repeat(4, 1fr) !important; } }
            @media (max-width: 700px)  { .ind-grid { grid-template-columns: repeat(3, 1fr) !important; } }
            @media (max-width: 480px)  { .ind-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          `}</style>
          {industries.map((ind, i) => {
            const isHov = hovered === i;
            return (
              <div
                key={i}
                className={`reveal-scale delay-${(i % 6) + 1}`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: 'relative',
                  borderRadius: 20,
                  padding: '32px 20px 24px',
                  cursor: 'none',
                  overflow: 'hidden',
                  background: isHov
                    ? 'rgba(255,255,255,0.07)'
                    : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isHov ? `${ind.color}55` : 'rgba(255,255,255,0.07)'}`,
                  boxShadow: isHov
                    ? `0 20px 60px ${ind.color}20, 0 0 0 1px ${ind.color}20`
                    : 'none',
                  transition: 'all 0.35s ease',
                  transform: isHov ? 'translateY(-8px)' : 'translateY(0)',
                  textAlign: 'center',
                  backdropFilter: 'blur(12px)',
                }}
              >
                {/* Top gradient bar */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                  background: ind.grad,
                  opacity: isHov ? 1 : 0,
                  transition: 'opacity 0.35s',
                  borderRadius: '20px 20px 0 0',
                }} />

                {/* Subtle bg glow */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `radial-gradient(circle at 50% 30%, ${ind.color}10, transparent 65%)`,
                  opacity: isHov ? 1 : 0,
                  transition: 'opacity 0.35s',
                  pointerEvents: 'none',
                }} />

                {/* Icon circle */}
                <div style={{
                  width: 68, height: 68,
                  borderRadius: '50%',
                  background: isHov ? ind.grad : `${ind.color}18`,
                  border: `1.5px solid ${isHov ? 'transparent' : `${ind.color}35`}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 18px',
                  transition: 'all 0.35s ease',
                  boxShadow: isHov ? `0 8px 30px ${ind.color}50` : 'none',
                  transform: isHov ? 'scale(1.08)' : 'scale(1)',
                  position: 'relative',
                }}>
                  <ind.Icon
                    size={30}
                    style={{
                      color: isHov ? '#fff' : ind.color,
                      transition: 'color 0.3s, transform 0.4s',
                      transform: isHov ? 'scale(1.1)' : 'scale(1)',
                      filter: isHov ? 'none' : `drop-shadow(0 0 4px ${ind.color}80)`,
                    }}
                  />
                </div>

                {/* Name */}
                <h3 style={{
                  fontFamily: 'var(--font-main)',
                  fontSize: '0.97rem',
                  fontWeight: 700,
                  color: isHov ? '#fff' : 'rgba(255,255,255,0.85)',
                  marginBottom: 6,
                  transition: 'color 0.3s',
                  position: 'relative',
                }}>
                  {ind.name}
                </h3>

                {/* Desc */}
                <p style={{
                  fontSize: '0.76rem',
                  color: isHov ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.35)',
                  lineHeight: 1.5,
                  transition: 'color 0.3s',
                  position: 'relative',
                }}>
                  {ind.desc}
                </p>

                {/* Bottom color dot */}
                <div style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: ind.grad,
                  margin: '14px auto 0',
                  opacity: isHov ? 1 : 0.3,
                  transition: 'opacity 0.3s, transform 0.3s',
                  transform: isHov ? 'scale(1.5)' : 'scale(1)',
                  boxShadow: isHov ? `0 0 10px ${ind.color}` : 'none',
                }} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
