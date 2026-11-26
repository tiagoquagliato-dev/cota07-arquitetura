import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { getImageSrc, getImageSrcSet, PROJECTS } from '../data/projects';

export function ProjectExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = PROJECTS[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % PROJECTS.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    }
  };

  return (
    <section
      aria-label="Explorador interativo de arquitetura"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="relative min-h-[100svh] flex flex-col justify-end bg-[#191B1A] text-[#FFFFFF] overflow-hidden focus:outline-none"
    >
      {/* Fotografia panorâmica dominante */}
      <div className="absolute inset-0">
        <img
          key={activeProject.id}
          src={getImageSrc(activeProject.heroImage.id, 1280)}
          srcSet={getImageSrcSet(activeProject.heroImage.id)}
          sizes="100vw"
          width={activeProject.heroImage.width}
          height={activeProject.heroImage.height}
          alt={activeProject.heroImage.alt}
          loading="eager"
          decoding="sync"
          fetchPriority="high"
          style={activeProject.heroImage.focalPoint ? { objectPosition: activeProject.heroImage.focalPoint } : undefined}
          className="w-full h-full object-cover transition-transform duration-700 ease-out scale-[1.01]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#191B1A]/90 via-[#191B1A]/35 to-[#191B1A]/40"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 transition-colors duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 18% 82%, ${activeProject.accentColor}38 0%, transparent 52%)`,
          }}
        />
      </div>

      {/* Conteúdo sobreposto da exposição */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 pb-8 sm:pb-12 pt-28 flex flex-col gap-8 lg:gap-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Título monumental e metadados fluidos */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="inline-block w-2.5 h-2.5 rounded-full transition-colors duration-500"
                style={{ backgroundColor: activeProject.accentColor }}
                aria-hidden="true"
              />
              <span className="text-sm font-medium text-[#F2EFE9]">
                {activeProject.number} · {activeProject.categoryLabel}
              </span>
              <span className="font-mono-tech text-xs text-[#EAE8E1]/75">
                {activeProject.area}
              </span>
            </div>

            <h1 className="font-display text-[clamp(2.65rem,6.8vw,6.25rem)] font-semibold tracking-[-0.04em] leading-[0.92] text-[#FFFFFF]">
              {activeProject.title}
            </h1>

            <p className="text-base sm:text-lg text-[#EAE8E1]/90 max-w-xl leading-relaxed">
              {activeProject.shortDescription}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to={`/projetos/${activeProject.slug}`}
                className="inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-[#F2EFE9] text-[#191B1A] text-sm font-medium hover:text-[#FFFFFF] transition-colors group"
                style={{ ['--hover-bg' as string]: activeProject.accentColor }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = activeProject.accentColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#F2EFE9';
                }}
              >
                <span>Explorar obra</span>
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#191B1A] text-[#F2EFE9]">
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </Link>

              {/* Controles circulares de navegação */}
              <div className="inline-flex items-center gap-2" role="group" aria-label="Alternar projeto em exposição">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Projeto anterior"
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#F2EFE9]/35 bg-[#191B1A]/40 text-[#FFFFFF] hover:bg-[#F2EFE9] hover:text-[#191B1A] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Próximo projeto"
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#F2EFE9]/35 bg-[#191B1A]/40 text-[#FFFFFF] hover:bg-[#F2EFE9] hover:text-[#191B1A] transition-colors"
                >
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          {/* Miniaturas dos quatro projetos */}
          <div className="lg:col-span-5">
            <div
              role="tablist"
              aria-label="Selecionar projeto na exposição"
              className="grid grid-cols-4 gap-2.5 sm:gap-3"
            >
              {PROJECTS.map((project, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={project.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Selecionar ${project.title}`}
                    onClick={() => setActiveIndex(index)}
                    className={`group text-left space-y-2 focus-visible:outline-2 focus-visible:outline-[#F2EFE9] transition-opacity ${
                      isActive ? 'opacity-100' : 'opacity-65 hover:opacity-95'
                    }`}
                  >
                    <div
                      className="relative aspect-[16/10] overflow-hidden rounded-sm transition-all duration-300"
                      style={{
                        boxShadow: isActive ? `0 0 0 2px ${project.accentColor}` : 'none',
                      }}
                    >
                      <img
                        src={getImageSrc(project.heroImage.id, 640)}
                        alt=""
                        aria-hidden="true"
                        width={640}
                        height={360}
                        loading="eager"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="hidden sm:block">
                      <span className="font-mono-tech text-[11px] text-[#EAE8E1]/70 block">
                        {project.number}
                      </span>
                      <span className="text-xs font-medium text-[#FFFFFF] line-clamp-1">
                        {project.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
