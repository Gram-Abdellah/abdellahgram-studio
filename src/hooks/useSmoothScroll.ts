import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

export const useSmoothScroll = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Create Lenis instance with cinematic, buttery-smooth settings
    lenisRef.current = new Lenis({
      duration: 1.8, // Longer duration for more luxurious feel
      easing: (t) => {
        // Custom easing curve for ultra-smooth, cinematic motion
        // This creates a gentle ease-out that feels premium
        return 1 - Math.pow(1 - t, 4);
      },
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8, // Slightly reduced for smoother control
      touchMultiplier: 1.5,
      infinite: false,
    });

    // High-performance RAF loop
    let rafId: number;
    
    const raf = (time: number) => {
      lenisRef.current?.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    // Expose lenis to window for debugging if needed
    (window as any).lenis = lenisRef.current;

    return () => {
      cancelAnimationFrame(rafId);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
};
