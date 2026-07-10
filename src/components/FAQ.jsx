import { useEffect, useRef, useState } from 'react';
import { HiPlus, HiMinus } from 'react-icons/hi';

const faqs = [
  {
    q: 'How long does it take to build a website?',
    a: 'Timelines vary by project scope. A standard 5-page website takes 1-2 weeks. A full e-commerce platform or web app takes 4-8 weeks. We always set clear deadlines before starting and stick to them.',
  },
  {
    q: 'What technologies do you use?',
    a: 'We primarily use React, Next.js, Node.js, Laravel, and PostgreSQL for web development. For mobile apps we use React Native and Flutter. We deploy on AWS, Vercel and Railway.',
  },
  {
    q: 'Do you offer post-launch support?',
    a: 'Absolutely! Every plan includes a support period. Our Enterprise plan includes lifetime support. We also offer ongoing monthly maintenance packages.',
  },
  {
    q: 'Can you redesign my existing website?',
    a: 'Yes! Website redesigns are one of our specialties. We analyze your current site, identify areas for improvement and deliver a modern, conversion-optimized redesign.',
  },
  {
    q: 'Do you work with international clients?',
    a: 'Yes, we work with clients worldwide. We\'ve delivered projects for businesses in Pakistan, UAE, USA, UK, Canada and Australia. Time zones are never a barrier for us.',
  },
  {
    q: 'What is your payment structure?',
    a: 'We typically work with a 50% upfront deposit and 50% on project completion. For larger projects, we can arrange milestone-based payment schedules.',
  },
  {
    q: 'Do you provide hosting and domain setup?',
    a: 'Yes! We handle everything — domain registration, hosting setup, SSL certificates and deployment. You just need to focus on your business.',
  },
  {
    q: 'Can I see my project progress during development?',
    a: 'Absolutely. We share staging links throughout development so you can review and provide feedback at every stage. Communication is key to our process.',
  },
];

export default function FAQ() {
  const sectionRef = useRef(null);
  const [open, setOpen] = useState(null);

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
    <section ref={sectionRef} style={{ padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', left: '-5%', top: '30%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(123,97,255,0.06) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      <div className="section-container">
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div className="section-tag reveal">FAQ</div>
          <h2 className="section-title reveal delay-1">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="reveal delay-2" style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 480, margin: '12px auto 0', lineHeight: 1.7 }}>
            Got questions? We've got answers. If you don't find what you're looking for, just reach out.
          </p>
        </div>

        <div style={{ maxWidth: 780, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`glass reveal delay-${(i % 6) + 1}`}
              style={{
                overflow: 'hidden',
                borderColor: open === i ? 'rgba(0,229,255,0.3)' : 'var(--glass-border)',
                transition: 'border-color 0.3s',
                cursor: 'none',
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '20px 24px', background: 'none', border: 'none', cursor: 'none',
                  textAlign: 'left',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-main)', fontWeight: 600, fontSize: '0.97rem',
                  color: open === i ? 'var(--primary)' : 'var(--text)',
                  transition: 'color 0.3s', flex: 1, paddingRight: 16,
                }}>
                  {faq.q}
                </span>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                  background: open === i ? 'linear-gradient(135deg, var(--primary), var(--secondary))' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${open === i ? 'transparent' : 'rgba(255,255,255,0.1)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.3s',
                  boxShadow: open === i ? '0 0 15px rgba(0,229,255,0.3)' : 'none',
                }}>
                  {open === i
                    ? <HiMinus size={14} color="#fff" />
                    : <HiPlus size={14} color="rgba(255,255,255,0.6)" />
                  }
                </div>
              </button>

              <div style={{
                maxHeight: open === i ? 300 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.4s ease',
              }}>
                <div style={{ padding: '0 24px 20px' }}>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.75 }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
