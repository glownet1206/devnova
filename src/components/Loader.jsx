import { useEffect, useState } from 'react';

export default function Loader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setHiding(true);
            setTimeout(onDone, 500);
          }, 200);
          return 100;
        }
        return p + Math.random() * 8 + 3;
      });
    }, 60);
    return () => clearInterval(timer);
  }, [onDone]);

  return (
    <div
      className="page-loader"
      style={{
        opacity: hiding ? 0 : 1,
        transition: 'opacity 0.5s ease',
      }}
    >
      {/* Animated background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,229,255,0.08) 0%, transparent 70%)',
        animation: 'pulse-glow 2s ease-in-out infinite',
      }} />

      <div className="loader-logo">DevNova Studio</div>

      <div style={{ position: 'relative' }}>
        <div className="loader-bar">
          <div className="loader-fill" style={{ width: `${Math.min(progress, 100)}%`, transition: 'width 0.1s' }} />
        </div>
        <div style={{
          position: 'absolute',
          right: 0,
          top: 8,
          fontSize: '0.7rem',
          color: 'rgba(255,255,255,0.4)',
          fontFamily: 'var(--font-main)',
        }}>
          {Math.min(Math.round(progress), 100)}%
        </div>
      </div>

      <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', fontFamily: 'var(--font-body)', letterSpacing: '0.1em' }}>
        Crafting your experience...
      </p>

      {/* Floating dots */}
      {[...Array(5)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 4 + i * 2,
          height: 4 + i * 2,
          borderRadius: '50%',
          background: i % 2 === 0 ? 'var(--primary)' : 'var(--secondary)',
          opacity: 0.4,
          left: `${15 + i * 18}%`,
          top: `${20 + (i % 3) * 20}%`,
          animation: `float ${3 + i}s ease-in-out infinite`,
          animationDelay: `${i * 0.4}s`,
        }} />
      ))}
    </div>
  );
}
