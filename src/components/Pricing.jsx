import { useEffect, useRef, useState } from 'react';
import { HiCheck } from 'react-icons/hi';
import { MdBolt } from 'react-icons/md';
import { AiFillStar, AiOutlineCrown } from 'react-icons/ai';

const plans = [
  {
    name: 'Starter',
    icon: MdBolt,
    price: { monthly: 299, yearly: 249 },
    desc: 'Perfect for small businesses and personal brands getting started online.',
    color: '#00E5FF',
    features: [
      '5 Page Website', 'Responsive Design', 'Basic SEO Setup',
      'Contact Form', 'SSL Certificate', '1 Month Support', 'Google Analytics',
    ],
    missing: ['E-commerce', 'Custom Integrations', 'Priority Support'],
    popular: false,
  },
  {
    name: 'Business',
    icon: AiFillStar,
    price: { monthly: 799, yearly: 649 },
    desc: 'Ideal for growing businesses that need a powerful, full-featured web presence.',
    color: '#7B61FF',
    features: [
      'Up to 15 Pages', 'Premium UI/UX Design', 'Advanced SEO', 'Blog & CMS',
      'E-commerce (up to 50 products)', 'Payment Integration',
      'WhatsApp & Chat Integration', '3 Months Support', 'Google Analytics + Hotjar',
    ],
    missing: ['Custom AI Integration'],
    popular: true,
  },
  {
    name: 'Enterprise',
    icon: AiOutlineCrown,
    price: { monthly: 1999, yearly: 1649 },
    desc: 'Full-scale solutions for large businesses needing custom development and integrations.',
    color: '#00FFC6',
    features: [
      'Unlimited Pages', 'Custom Web Application', 'AI Integration',
      'Mobile App (iOS + Android)', 'E-commerce (unlimited)', 'Custom CMS & Admin Panel',
      'API Development', 'Cloud Deployment (AWS/GCP)', 'Lifetime Support',
      'Priority Response', 'Monthly Performance Reports',
    ],
    missing: [],
    popular: false,
  },
];

export default function Pricing() {
  const sectionRef = useRef(null);
  const [yearly, setYearly] = useState(false);
  const [hovered, setHovered] = useState(null);

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

  return (
    <section id="pricing" ref={sectionRef} style={{ padding: '60px 0 100px', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', left: '50%', top: '20%', transform: 'translateX(-50%)',
        width: 700, height: 700, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(123,97,255,0.06) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      <div className="section-container">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="section-tag reveal">Pricing</div>
          <h2 className="section-title reveal delay-1">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="reveal delay-2" style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 480, margin: '12px auto 20px', lineHeight: 1.7 }}>
            No hidden fees. No surprises. Just clear pricing for world-class work.
          </p>

          {/* Toggle */}
          <div className="reveal delay-3" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '6px', borderRadius: 50, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <button
              onClick={() => setYearly(false)}
              style={{
                padding: '8px 20px', borderRadius: 50, border: 'none', cursor: 'none',
                background: !yearly ? 'linear-gradient(135deg, var(--primary), var(--secondary))' : 'transparent',
                color: '#fff', fontFamily: 'var(--font-main)', fontWeight: 600, fontSize: '0.85rem',
                transition: 'all 0.3s',
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              style={{
                padding: '8px 20px', borderRadius: 50, border: 'none', cursor: 'none',
                background: yearly ? 'linear-gradient(135deg, var(--primary), var(--secondary))' : 'transparent',
                color: '#fff', fontFamily: 'var(--font-main)', fontWeight: 600, fontSize: '0.85rem',
                transition: 'all 0.3s',
                display: 'flex', alignItems: 'center', gap: 8,
              }}
            >
              Yearly
              <span style={{ fontSize: '0.7rem', background: 'var(--accent)', color: '#000', borderRadius: 20, padding: '1px 8px', fontWeight: 700 }}>-20%</span>
            </button>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24, alignItems: 'start',
        }}>
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            const isHovered = hovered === i;
            return (
              <div
                key={i}
                className={`glass reveal-scale delay-${i + 1}`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  padding: 32,
                  position: 'relative',
                  cursor: 'none',
                  transition: 'transform 0.4s ease, border-color 0.4s, box-shadow 0.4s',
                  transform: plan.popular ? 'scale(1.03)' : (isHovered ? 'translateY(-8px)' : 'translateY(0)'),
                  borderColor: plan.popular ? `${plan.color}50` : (isHovered ? `${plan.color}30` : 'var(--glass-border)'),
                  boxShadow: plan.popular
                    ? `0 0 0 1px ${plan.color}30, 0 30px 80px ${plan.color}15`
                    : (isHovered ? `0 20px 60px ${plan.color}15` : 'none'),
                  overflow: 'hidden',
                }}
              >
                {/* BG glow */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `radial-gradient(circle at 50% 0%, ${plan.color}08, transparent 60%)`,
                  opacity: plan.popular || isHovered ? 1 : 0,
                  transition: 'opacity 0.4s',
                }} />

                {/* Popular badge */}
                {plan.popular && (
                  <div style={{
                    position: 'absolute', top: 16, right: 16,
                    background: `linear-gradient(135deg, ${plan.color}, #5B41FF)`,
                    borderRadius: 20, padding: '4px 12px',
                    fontSize: '0.7rem', fontWeight: 700, color: '#fff',
                    fontFamily: 'var(--font-main)',
                    boxShadow: `0 0 15px ${plan.color}50`,
                  }}>
                    Most Popular
                  </div>
                )}

                {/* Icon */}
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: `${plan.color}18`, border: `1px solid ${plan.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 16, position: 'relative',
                  boxShadow: plan.popular ? `0 0 20px ${plan.color}30` : 'none',
                }}>
                  <Icon size={22} color={plan.color} />
                </div>

                <h3 style={{ fontFamily: 'var(--font-main)', fontSize: '1.2rem', fontWeight: 800, marginBottom: 6, position: 'relative' }}>
                  {plan.name}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: 20, position: 'relative' }}>
                  {plan.desc}
                </p>

                {/* Price */}
                <div style={{ marginBottom: 24, position: 'relative' }}>
                  <div style={{
                    fontFamily: 'var(--font-main)',
                    display: 'flex', alignItems: 'baseline', gap: 4,
                  }}>
                    <span style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.5)' }}>$</span>
                    <span style={{
                      fontSize: '3rem', fontWeight: 900,
                      background: `linear-gradient(135deg, ${plan.color}, white)`,
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    }}>
                      {yearly ? plan.price.yearly : plan.price.monthly}
                    </span>
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>/project</span>
                  </div>
                  {yearly && (
                    <div style={{ fontSize: '0.78rem', color: plan.color, marginTop: 4, fontWeight: 600 }}>
                      Save ${(plan.price.monthly - plan.price.yearly)} with yearly billing
                    </div>
                  )}
                </div>

                {/* Features */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24, position: 'relative' }}>
                  {plan.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 20, height: 20, borderRadius: '50%',
                        background: `${plan.color}20`, border: `1px solid ${plan.color}40`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        <HiCheck size={11} color={plan.color} />
                      </div>
                      <span style={{ fontSize: '0.87rem', color: 'rgba(255,255,255,0.7)' }}>{f}</span>
                    </div>
                  ))}
                  {plan.missing.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, opacity: 0.3 }}>
                      <div style={{
                        width: 20, height: 20, borderRadius: '50%',
                        background: 'rgba(255,255,255,0.05)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        <span style={{ fontSize: '0.6rem' }}>✗</span>
                      </div>
                      <span style={{ fontSize: '0.87rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'line-through' }}>{f}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="#contact"
                  className={plan.popular ? 'btn-primary' : 'btn-outline'}
                  style={{
                    width: '100%', justifyContent: 'center', position: 'relative',
                    ...(plan.popular ? { background: `linear-gradient(135deg, ${plan.color}, #5B41FF)`, boxShadow: `0 0 30px ${plan.color}30` } : {}),
                  }}
                  onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                >
                  <span>Get Started</span>
                </a>
              </div>
            );
          })}
        </div>

        {/* Money back */}
        <div className="reveal" style={{ textAlign: 'center', marginTop: 48 }}>
          <div className="glass" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10, padding: '12px 28px',
            border: '1px solid rgba(0,255,198,0.2)',
          }}>
            <span style={{ fontSize: '1.5rem' }}>🛡️</span>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
              <strong style={{ color: 'var(--accent)' }}>30-Day Money Back Guarantee</strong> — Not satisfied? We'll refund you, no questions asked.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
