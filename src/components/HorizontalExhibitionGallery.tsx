import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { ArchitecturalImage } from './ArchitecturalImage';
import { PROJECTS } from '../data/projects';

export function HorizontalExhibitionGallery() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const scrollToSlide = (index: number) => {
    const container = scrollerRef.current;
    if (!container) return;
    const clamped = Math.max(0, Math.min(PROJECTS.length - 1, index));
    const child = container.children[clamped] as HTMLElement | undefined;
    if (child) {
      container.scrollTo({ left: child.offsetLeft, behavior: 'smooth' });
      setActiveSlide(clamped);
    }
  };

  const handleScroll = () => {
    const container = scrollerRef.current;
    if (!container) return;
    const children = Array.from(container.children) as HTMLElement[];
    const scrollLeft = container.scrollLeft;
    let closestIdx = 0;
    let minDiff = Infinity;
    children.forEach((child, idx) => {
      const diff = Math.abs(child.offsetLeft - scrollLeft);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });
    setActiveSlide(closestIdx);
  };

  return (
    <section
      aria-label="Galeria horizontal de projetos"
      className="py-20 sm:py-28 bg-[#F2EFE9] text-[#191B1A]"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 mb-10 sm:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <p className="text-sm font-medium text-[#6E7458]">
            Exposição · Formas de habitar
          </p>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.035em] leading-[0.98]">
            Diferentes formas de habitar.
          </h2>
        </div>

        <div className="flex items-center gap-4 self-start sm:self-auto">
          <span className="font-mono-tech text-xs text-[#5C5E57]" aria-live="polite">
            {String(activeSlide + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
          </span>
          <div className="inline-flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollToSlide(activeSlide - 1)}
              disabled={activeSlide === 0}
              aria-label="Projeto anterior na galeria"
              className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-[#191B1A]/25 text-[#191B1A] disabled:opacity-35 hover:bg-[#191B1A] hover:text-[#F2EFE9] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollToSlide(activeSlide + 1)}
              disabled={activeSlide === PROJECTS.length - 1}
              aria-label="Próximo projeto na galeria"
              className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-[#191B1A]/25 text-[#191B1A] disabled:opacity-35 hover:bg-[#191B1A] hover:text-[#F2EFE9] transition-colors"
            >
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll horizontal nativo sem interceptação vertical */}
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        tabIndex={0}
        aria-label="Lista horizontal de projetos arquitetônicos"
        className="flex gap-6 sm:gap-10 overflow-x-auto snap-x snap-mandatory px-5 sm:px-8 lg:px-12 pb-6 focus:outline-none"
      >
        {PROJECTS.map((project) => (
          <article
            key={project.id}
            className="snap-start shrink-0 w-[84vw] sm:w-[68vw] lg:w-[56vw] group"
          >
            <Link to={`/projetos/${project.slug}`} className="block space-y-5">
              <div className="relative overflow-hidden">
                <ArchitecturalImage
                  image={project.heroImage}
                  sizes="(min-width: 1024px) 56vw, 84vw"
                  className="aspect-[16/10]"
                  imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <span
                  className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#191B1A]/75 text-[#FFFFFF] text-xs font-medium"
                >
                  {project.number} · {project.categoryLabel}
                </span>
              </div>

              <div className="flex items-end justify-between gap-6">
                <div className="space-y-1.5 max-w-xl">
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight group-hover:text-[#6E7458] transition-colors">
                      {project.title}
                    </h3>
                    <span className="font-mono-tech text-xs text-[#5C5E57]">{project.area}</span>
                  </div>
                  <p className="text-sm sm:text-base text-[#3D3F3B] leading-relaxed">
                    {project.shortDescription}
                  </p>
                </div>

                <span className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-[#191B1A]/25 shrink-0 group-hover:bg-[#191B1A] group-hover:text-[#F2EFE9] transition-colors">
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
