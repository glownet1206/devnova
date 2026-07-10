import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Current real mouse position
    let mx = window.innerWidth  / 2;
    let my = window.innerHeight / 2;

    // Ring follows with lerp
    let rx = mx, ry = my;

    // Track visibility
    let visible = false;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        dot.style.opacity  = '1';
        ring.style.opacity = '1';
        visible = true;
      }
    };

    const onLeave = () => {
      dot.style.opacity  = '0';
      ring.style.opacity = '0';
      visible = false;
    };

    const onEnterEl  = () => ring.classList.add('hovered');
    const onLeaveEl  = () => ring.classList.remove('hovered');

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    // Attach hover listeners to interactive elements
    // Use event delegation so future elements also work
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('a, button, [data-cursor]')) onEnterEl();
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest('a, button, [data-cursor]')) onLeaveEl();
    });

    // RAF loop — dot is instant, ring lerps fast
    let raf;
    const LERP = 0.18; // 0.18 = snappy but still smooth

    const loop = () => {
      // Dot: perfectly instant
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';

      // Ring: lerp toward mouse
      rx += (mx - rx) * LERP;
      ry += (my - ry) * LERP;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';

      raf = requestAnimationFrame(loop);
    };

    // Initially hidden until mouse moves
    dot.style.opacity  = '0';
    ring.style.opacity = '0';

    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
