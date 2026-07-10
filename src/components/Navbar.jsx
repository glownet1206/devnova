import { useState, useEffect } from 'react';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const links = ['Home', 'About', 'Services', 'Portfolio', 'Process', 'Pricing', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#" className="nav-logo" onClick={e => { e.preventDefault(); scrollTo('home'); }}>
            <img src="/logo.png" alt="DevNova Studio" style={{ width: 80, height: 'auto' }} />
          </a>

          <ul className="nav-links">
            {links.map(link => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`} onClick={e => { e.preventDefault(); scrollTo(link); }}>
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <a href="#contact" className="btn-primary"
              style={{ padding: '10px 22px', fontSize: '0.85rem' }}
              onClick={e => { e.preventDefault(); scrollTo('Contact'); }}>
              <span>Start Project</span>
            </a>
            <button className="mobile-menu-btn" onClick={() => setMenuOpen(true)} aria-label="Open menu">
              <HiMenuAlt3 size={26} color="white" />
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99999,
          background: '#050816',
          display: 'flex', flexDirection: 'column',
        }}>
          {/* Top bar */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '16px 20px',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
          }}>
            <img src="/logo.png" alt="DevNova" style={{ width: 80, height: 'auto' }} />
            <button onClick={() => setMenuOpen(false)} style={{
              width: 38, height: 38, borderRadius: '50%',
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', cursor: 'pointer',
            }}>
              <HiX size={20} />
            </button>
          </div>

          {/* Links */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
            {links.map(link => (
              <a key={link} href={`#${link.toLowerCase()}`}
                onClick={e => { e.preventDefault(); scrollTo(link); }}
                style={{
                  padding: '18px 24px', fontSize: '1.05rem',
                  fontFamily: 'var(--font-main)', fontWeight: 600,
                  color: 'rgba(255,255,255,0.8)', textDecoration: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#00E5FF'; e.currentTarget.style.background = 'rgba(0,229,255,0.04)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; e.currentTarget.style.background = 'transparent'; }}
              >
                {link}
                <span style={{ color: 'rgba(0,229,255,0.4)', fontSize: '1rem' }}>→</span>
              </a>
            ))}
          </div>

          {/* Bottom CTA */}
          <div style={{ padding: '20px 24px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <a href="#contact" className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '14px', display: 'flex' }}
              onClick={e => { e.preventDefault(); scrollTo('Contact'); }}>
              <span>Start Your Project</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
