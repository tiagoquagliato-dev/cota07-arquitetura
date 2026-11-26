export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export async function runEditorialMotion(container: HTMLElement | null): Promise<() => void> {
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
      // 1. Transições tipográficas discretas (sem nunca ocultar com opacity: 0)
      const reveals = container.querySelectorAll<HTMLElement>('[data-reveal]');
      reveals.forEach((el) => {
        gsap.from(el, {
          y: 20,
          duration: 0.75,
          ease: 'power2.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            once: true,
          },
        });
      });

      // 2. Revelação de fotografias por máscaras horizontais e verticais
      const masked = container.querySelectorAll<HTMLElement>('[data-reveal-mask]');
      masked.forEach((el) => {
        const direction = el.dataset.revealMask;
        const fromClip =
          direction === 'horizontal' ? 'inset(0% 100% 0% 0%)' : 'inset(100% 0% 0% 0%)';
        const img = el.querySelector<HTMLElement>('img');

        gsap.fromTo(
          el,
          { clipPath: fromClip },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.95,
            ease: 'power3.out',
            clearProps: 'clipPath',
            scrollTrigger: {
              trigger: el,
              start: 'top 95%',
              once: true,
            },
          },
        );

        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.07 },
            {
              scale: 1,
              duration: 1.15,
              ease: 'power2.out',
              clearProps: 'transform',
              scrollTrigger: {
                trigger: el,
                start: 'top 95%',
                once: true,
              },
            },
          );
        }
      });

      // 3. Transformações de escala e enquadramento vinculadas à rolagem (reversíveis)
      const scrollScaled = container.querySelectorAll<HTMLElement>('[data-scroll-scale]');
      scrollScaled.forEach((el) => {
        const img = el.querySelector<HTMLElement>('img') ?? el;
        gsap.fromTo(
          img,
          { scale: 1.06 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          },
        );
      });

      // 4. Parallax em diferentes profundidades (reversível na rolagem)
      const parallaxEls = container.querySelectorAll<HTMLElement>('[data-parallax]');
      parallaxEls.forEach((el) => {
        const offset = Number(el.dataset.parallax || 24);
        gsap.fromTo(
          el,
          { y: offset },
          {
            y: -offset,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.5,
            },
          },
        );
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
