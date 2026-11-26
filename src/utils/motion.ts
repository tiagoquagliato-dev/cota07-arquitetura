export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export async function runEditorialMotion(
  container: HTMLElement | null,
  selector = '[data-reveal]',
  lineSelector = '[data-line]',
): Promise<() => void> {
  if (!container || prefersReducedMotion()) {
    return () => {};
  }

  let ctx: { revert: () => void } | null = null;
  let cancelled = false;

  try {
    const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]);

    if (cancelled) return () => {};
    gsap.registerPlugin(ScrollTrigger);

    ctx = gsap.context(() => {
      const elements = container.querySelectorAll<HTMLElement>(selector);
      elements.forEach((el) => {
        gsap.from(el, {
          y: 18,
          duration: 0.75,
          ease: 'power2.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            once: true,
          },
        });
      });

      const lines = container.querySelectorAll<HTMLElement>(lineSelector);
      lines.forEach((line) => {
        gsap.from(line, {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 0.85,
          ease: 'power2.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: line,
            start: 'top 92%',
            once: true,
          },
        });
      });
    }, container);
  } catch {
    // Graceful fallback: all elements remain visible without motion
  }

  return () => {
    cancelled = true;
    ctx?.revert();
  };
}
