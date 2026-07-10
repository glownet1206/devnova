import { useEffect, useRef, useState } from 'react';
import { MdSend, MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import { HiArrowRight } from 'react-icons/hi';
import { AiOutlineClockCircle } from 'react-icons/ai';

const budgets = ['$500 - $1,000', '$1,000 - $3,000', '$3,000 - $10,000', '$10,000+', 'Not Sure'];

export default function Contact() {
  const sectionRef = useRef(null);
  const [form, setForm]           = useState({ name:'', email:'', company:'', budget:'', message:'' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending]     = useState(false);
  const [focused, setFocused]     = useState('');

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    sectionRef.current?.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale')
      .forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const submit = e => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSubmitted(true); }, 2000);
  };

  return (
    <section id="contact" ref={sectionRef} style={{ padding:'120px 0', position:'relative', overflow:'hidden' }}>

      {/* ── Full-section bg image with overlay ── */}
      <div style={{
        position:'absolute', inset:0, zIndex:0,
        backgroundImage:'url(/ct.webp)',
        backgroundSize:'cover',
        backgroundPosition:'center',
        backgroundRepeat:'no-repeat',
        filter:'brightness(0.18) saturate(1.2)',
      }}/>
      {/* gradient overlay so content pops */}
      <div style={{
        position:'absolute', inset:0, zIndex:1,
        background:'linear-gradient(135deg, rgba(5,8,22,0.92) 0%, rgba(5,8,22,0.75) 50%, rgba(5,8,22,0.92) 100%)',
      }}/>
      {/* cyan tint glow top-left */}
      <div style={{ position:'absolute', left:'-5%', top:'10%', width:500, height:500, borderRadius:'50%',
        background:'radial-gradient(circle,rgba(0,229,255,0.07),transparent 70%)',
        filter:'blur(60px)', zIndex:1, pointerEvents:'none' }}/>
      {/* purple tint glow bottom-right */}
      <div style={{ position:'absolute', right:'-5%', bottom:'5%', width:500, height:500, borderRadius:'50%',
        background:'radial-gradient(circle,rgba(123,97,255,0.08),transparent 70%)',
        filter:'blur(60px)', zIndex:1, pointerEvents:'none' }}/>

      <div className="section-container" style={{ position:'relative', zIndex:2 }}>

        {/* ── Header ── */}
        <div style={{ textAlign:'center', marginBottom:68 }}>
          <div className="section-tag reveal">Contact Us</div>
          <h2 className="section-title reveal delay-1" style={{ marginBottom:14 }}>
            Have a Project in Mind?{' '}
            <span className="gradient-text">Let's Talk.</span>
          </h2>
          <p className="reveal delay-2" style={{ color:'rgba(255,255,255,0.5)', maxWidth:480, margin:'0 auto', lineHeight:1.75 }}>
            We respond within 24 hours. Tell us about your project and let's build something great together.
          </p>
        </div>

        {/* ── Two-column layout ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:40, alignItems:'start',
          maxWidth:1060, margin:'0 auto' }} className="contact-grid">

          {/* ── LEFT ── */}
          <div className="reveal-left" style={{ display:'flex', flexDirection:'column', gap:16 }}>

            {/* Heading card */}
            <div style={{
              padding:'36px 32px',
              background:'rgba(255,255,255,0.03)',
              border:'1px solid rgba(255,255,255,0.08)',
              borderRadius:24,
              backdropFilter:'blur(16px)',
              marginBottom:4,
            }}>
              <h3 style={{ fontFamily:'var(--font-main)', fontSize:'1.5rem', fontWeight:800,
                marginBottom:12, lineHeight:1.3 }}>
                Let's Build Something <span className="gradient-text">Amazing</span>
              </h3>
              <p style={{ color:'rgba(255,255,255,0.5)', fontSize:'0.9rem', lineHeight:1.75, marginBottom:24 }}>
                Whether it's a startup landing page or a full enterprise platform — we've got you covered.
              </p>
              {/* Response time badge */}
              <div style={{ display:'inline-flex', alignItems:'center', gap:8,
                padding:'8px 16px', borderRadius:20,
                background:'rgba(0,229,255,0.08)', border:'1px solid rgba(0,229,255,0.2)' }}>
                <AiOutlineClockCircle size={15} color="#00E5FF"/>
                <span style={{ fontSize:'0.8rem', color:'rgba(0,229,255,0.9)', fontWeight:600 }}>
                  Average response: &lt; 2 hours
                </span>
              </div>
            </div>

            {/* Contact info cards */}
            {[
              { Icon:MdEmail,      label:'Email Us',  value:'hello@devnova.studio',          color:'#00E5FF' },
              { Icon:MdPhone,      label:'WhatsApp',  value:'+92 312 345 6789',              color:'#25D366' },
              { Icon:MdLocationOn, label:'Location',  value:'Lahore, PK · Remote Worldwide', color:'#7B61FF' },
            ].map(({ Icon, label, value, color }, i) => (
              <div key={i} style={{
                display:'flex', alignItems:'center', gap:16,
                padding:'18px 22px',
                background:'rgba(255,255,255,0.03)',
                border:`1px solid ${color}22`,
                borderRadius:16,
                backdropFilter:'blur(12px)',
                transition:'transform 0.3s, border-color 0.3s, box-shadow 0.3s',
                cursor:'default',
              }}
                onMouseEnter={e=>{ e.currentTarget.style.transform='translateX(8px)';
                  e.currentTarget.style.borderColor=`${color}50`;
                  e.currentTarget.style.boxShadow=`0 8px 32px ${color}12`; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform='translateX(0)';
                  e.currentTarget.style.borderColor=`${color}22`;
                  e.currentTarget.style.boxShadow='none'; }}
              >
                <div style={{ width:48, height:48, borderRadius:14,
                  background:`linear-gradient(135deg, ${color}20, ${color}08)`,
                  border:`1.5px solid ${color}35`,
                  display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
                  boxShadow:`0 0 20px ${color}18` }}>
                  <Icon size={22} color={color}/>
                </div>
                <div>
                  <div style={{ fontSize:'0.7rem', color:'rgba(255,255,255,0.3)', fontWeight:700,
                    textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:4 }}>{label}</div>
                  <div style={{ fontSize:'0.9rem', fontWeight:600, color:'rgba(255,255,255,0.9)' }}>{value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* ── RIGHT — FORM ── */}
          <div className="reveal-right">
            {submitted ? (
              <div style={{
                padding:60, textAlign:'center',
                background:'rgba(0,255,198,0.04)',
                border:'1px solid rgba(0,255,198,0.2)',
                borderRadius:24, backdropFilter:'blur(20px)',
              }}>
                <div style={{ fontSize:'4rem', marginBottom:20 }}>🎉</div>
                <h3 style={{ fontFamily:'var(--font-main)', fontSize:'1.6rem', fontWeight:800,
                  marginBottom:12, color:'var(--accent)' }}>Message Sent!</h3>
                <p style={{ color:'rgba(255,255,255,0.55)', lineHeight:1.8 }}>
                  Thanks for reaching out!<br/>We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} style={{
                background:'rgba(255,255,255,0.03)',
                border:'1px solid rgba(255,255,255,0.09)',
                borderRadius:24, padding:'40px 36px',
                backdropFilter:'blur(24px)',
              }}>
                <h3 style={{ fontFamily:'var(--font-main)', fontWeight:700, fontSize:'1.1rem',
                  marginBottom:28, color:'rgba(255,255,255,0.85)' }}>
                  Start Your Project →
                </h3>

                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }}>
                  <FormField label="Full Name *" focused={focused==='name'}>
                    <input required value={form.name}
                      onChange={e=>setForm({...form,name:e.target.value})}
                      onFocus={()=>setFocused('name')} onBlur={()=>setFocused('')}
                      placeholder="John Doe" style={iStyle}/>
                  </FormField>
                  <FormField label="Email *" focused={focused==='email'}>
                    <input required type="email" value={form.email}
                      onChange={e=>setForm({...form,email:e.target.value})}
                      onFocus={()=>setFocused('email')} onBlur={()=>setFocused('')}
                      placeholder="john@company.com" style={iStyle}/>
                  </FormField>
                </div>

                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }}>
                  <FormField label="Company Name" focused={focused==='company'}>
                    <input value={form.company}
                      onChange={e=>setForm({...form,company:e.target.value})}
                      onFocus={()=>setFocused('company')} onBlur={()=>setFocused('')}
                      placeholder="Your Company" style={iStyle}/>
                  </FormField>
                  <FormField label="Budget" focused={focused==='budget'}>
                    <select value={form.budget}
                      onChange={e=>setForm({...form,budget:e.target.value})}
                      onFocus={()=>setFocused('budget')} onBlur={()=>setFocused('')}
                      style={{...iStyle, appearance:'none', cursor:'none',
                        color:form.budget?'#fff':'rgba(255,255,255,0.3)'}}>
                      <option value="" disabled style={{color:'rgba(255,255,255,0.3)'}}>Select range</option>
                      {budgets.map(b=><option key={b} value={b} style={{background:'#0d0d1a',color:'#fff'}}>{b}</option>)}
                    </select>
                  </FormField>
                </div>

                <FormField label="Tell Us About Your Project *" focused={focused==='msg'}>
                  <textarea required rows={5} value={form.message}
                    onChange={e=>setForm({...form,message:e.target.value})}
                    onFocus={()=>setFocused('msg')} onBlur={()=>setFocused('')}
                    placeholder="Describe your project, goals, timeline..."
                    style={{...iStyle, resize:'vertical', minHeight:124}}/>
                </FormField>

                <button type="submit" disabled={sending} style={{
                  width:'100%', padding:'16px 32px', marginTop:20,
                  background: sending
                    ? 'rgba(0,229,255,0.25)'
                    : 'linear-gradient(135deg,#00E5FF 0%,#7B61FF 100%)',
                  border:'none', borderRadius:14, cursor:'none',
                  color:'#fff', fontFamily:'var(--font-main)', fontWeight:700, fontSize:'1rem',
                  display:'flex', alignItems:'center', justifyContent:'center', gap:10,
                  transition:'transform 0.25s, box-shadow 0.25s',
                  boxShadow: sending ? 'none' : '0 8px 32px rgba(0,229,255,0.22)',
                }}
                  onMouseEnter={e=>{ if(!sending){ e.currentTarget.style.transform='translateY(-2px)';
                    e.currentTarget.style.boxShadow='0 14px 44px rgba(0,229,255,0.32)'; }}}
                  onMouseLeave={e=>{ e.currentTarget.style.transform='translateY(0)';
                    e.currentTarget.style.boxShadow='0 8px 32px rgba(0,229,255,0.22)'; }}
                >
                  {sending ? (
                    <>
                      <div style={{ width:18, height:18, border:'2px solid rgba(255,255,255,0.3)',
                        borderTop:'2px solid #fff', borderRadius:'50%',
                        animation:'spin-slow 0.7s linear infinite' }}/>
                      Sending...
                    </>
                  ) : (
                    <>Send Message <HiArrowRight size={18}/></>
                  )}
                </button>

                <p style={{ textAlign:'center', fontSize:'0.73rem',
                  color:'rgba(255,255,255,0.2)', marginTop:14 }}>
                  🔒 Your information is 100% secure and never shared.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width:860px){ .contact-grid{ grid-template-columns:1fr !important; } }
        #contact input:focus, #contact textarea:focus, #contact select:focus {
          border-color: rgba(0,229,255,0.5) !important;
          box-shadow: 0 0 0 3px rgba(0,229,255,0.09) !important;
        }
        #contact input::placeholder, #contact textarea::placeholder { color: rgba(255,255,255,0.2); }
        #contact select option { background:#0d0d1a; color:#fff; }
      `}</style>
    </section>
  );
}

function FormField({ label, children, focused }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:7, marginBottom:0 }}>
      <label style={{ fontSize:'0.76rem', fontWeight:600, letterSpacing:'0.05em',
        color: focused ? 'rgba(0,229,255,0.9)' : 'rgba(255,255,255,0.38)',
        transition:'color 0.25s' }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const iStyle = {
  width:'100%',
  background:'rgba(255,255,255,0.05)',
  border:'1px solid rgba(255,255,255,0.1)',
  borderRadius:11,
  padding:'13px 15px',
  color:'#fff',
  fontSize:'0.9rem',
  fontFamily:'var(--font-body)',
  outline:'none',
  transition:'border-color 0.25s, box-shadow 0.25s',
};
