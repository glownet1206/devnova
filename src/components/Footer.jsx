import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import { HiArrowRight } from 'react-icons/hi';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const quickLinks = ['Home', 'About', 'Services', 'Portfolio', 'Process', 'Pricing', 'Contact'];
const services = ['Website Development', 'Mobile App Development', 'Ecommerce Solutions', 'UI/UX Design', 'AI Integration', 'Cloud & DevOps'];
const support = ['Help Center', 'Documentation', 'Terms & Conditions', 'Privacy Policy', 'Refund Policy', 'Careers'];

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{
      position: 'relative', overflow: 'hidden',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      {/* CTA Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(0,229,255,0.08), rgba(123,97,255,0.08))',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '48px 0',
      }}>
        <div className="section-container" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 24,
        }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-main)', fontSize: '1.6rem', fontWeight: 700, marginBottom: 6 }}>
              Have a Project in Mind?
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem' }}>
              Let's Build Something Amazing Together!
            </p>
          </div>
          <a
            href="#contact"
            className="btn-primary"
            onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}
            style={{ display: 'flex', alignItems: 'center', gap: 10 }}
          >
            <span>Start Your Project</span>
            <HiArrowRight size={18} />
          </a>
        </div>
      </div>

      {/* Footer main */}
      <div style={{ background: 'rgba(0,0,0,0.3)', padding: '64px 0 32px' }}>
        <div className="section-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 40, marginBottom: 48,
          }}>
            {/* Brand */}
            <div style={{ gridColumn: 'span 1' }}>
              <div style={{ marginBottom:16 }}>
                <img src="/logo.png" alt="DevNova Studio" style={{ width: 90, height: 'auto', objectFit: 'contain' }} />
              </div>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.87rem', lineHeight: 1.7, marginBottom: 20 }}>
                We are a digital studio helping businesses grow through modern websites and digital experiences.
              </p>
              {/* Social icons */}
              <div style={{ display: 'flex', gap: 10 }}>
                {[
                  { icon: FaFacebookF, color: '#1877F2' },
                  { icon: FaTwitter,   color: '#1DA1F2' },
                  { icon: FaLinkedinIn,color: '#0077B5' },
                  { icon: FaInstagram, color: '#E1306C' },
                ].map(({ icon: SIcon, color }, idx) => (
                  <a key={idx} href="#" onClick={e => e.preventDefault()} style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: `${color}20`, border: `1px solid ${color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color, textDecoration: 'none',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 6px 20px ${color}30`; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <SIcon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 style={{ fontFamily: 'var(--font-main)', fontWeight: 700, fontSize: '0.95rem', marginBottom: 16, color: 'var(--text)' }}>
                Quick Links
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {quickLinks.map(l => (
                  <li key={l}>
                    <a href={`#${l.toLowerCase()}`} onClick={e => { e.preventDefault(); scrollTo(l); }}
                      style={{
                        color: 'rgba(255,255,255,0.45)', textDecoration: 'none', fontSize: '0.87rem',
                        transition: 'color 0.3s', display: 'flex', alignItems: 'center', gap: 6,
                        cursor: 'none',
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
                    >
                      <HiArrowRight size={12} />
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 style={{ fontFamily: 'var(--font-main)', fontWeight: 700, fontSize: '0.95rem', marginBottom: 16 }}>
                Services
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {services.map(s => (
                  <li key={s}>
                    <a href="#services" onClick={e => { e.preventDefault(); scrollTo('services'); }}
                      style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none', fontSize: '0.87rem', transition: 'color 0.3s', cursor: 'none' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
                    >
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 style={{ fontFamily: 'var(--font-main)', fontWeight: 700, fontSize: '0.95rem', marginBottom: 16 }}>
                Contact Us
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { icon: MdEmail, text: 'devnovastudio30@gmail.com' },
                  { icon: MdPhone, text: '+974 30225869' },
                  { icon: MdLocationOn, text: 'Qatar, Doha' },
                ].map(({ icon: Icon, text }, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <Icon size={15} color="var(--primary)" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.87rem' }}>{text}</span>
                  </div>
                ))}
              </div>

              {/* Badges */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 20 }}>
                {['🔒 SSL Secured', '⭐ ISO Certified', '🏆 Award Winner'].map(b => (
                  <span key={b} style={{
                    fontSize: '0.7rem', padding: '4px 10px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 20, color: 'rgba(255,255,255,0.4)',
                  }}>
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: 24,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
          }}>
            <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.82rem' }}>
              © 2025 DevNova Studio. All rights reserved.
            </p>
            <div style={{ display: 'flex', gap: 20 }}>
              {support.slice(2, 5).map(s => (
                <a key={s} href="#" onClick={e => e.preventDefault()} style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.78rem', textDecoration: 'none', cursor: 'none' }}>
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
