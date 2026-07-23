import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = window.innerWidth  / 2;
    let my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let visible = false;
    let moved = false; // only update DOM when position changed

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      moved = true;
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

    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('a, button, [data-cursor]')) onEnterEl();
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest('a, button, [data-cursor]')) onLeaveEl();
    });

    const LERP = 0.35;
    const THRESHOLD = 0.1; // skip update if ring movement < 0.1px
    let raf;

    const loop = () => {
      // Dot: only write when mouse moved
      if (moved) {
        dot.style.left = mx + 'px';
        dot.style.top  = my + 'px';
        moved = false;
      }

      // Ring: lerp — only write if it actually moved
      const nx = rx + (mx - rx) * LERP;
      const ny = ry + (my - ry) * LERP;
      if (Math.abs(nx - rx) > THRESHOLD || Math.abs(ny - ry) > THRESHOLD) {
        rx = nx; ry = ny;
        ring.style.left = rx + 'px';
        ring.style.top  = ry + 'px';
      }

      raf = requestAnimationFrame(loop);
    };

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
