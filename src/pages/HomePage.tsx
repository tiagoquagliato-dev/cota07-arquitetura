import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { ArchitecturalImage } from '../components/ArchitecturalImage';
import { PROJECTS, STUDIO_IMAGE } from '../data/projects';
import { runEditorialMotion } from '../utils/motion';

const PRACTICE_AREAS = [
  {
    num: '01',
    title: 'Arquitetura residencial.',
    description:
      'Projetos que traduzem hábitos, necessidades e formas particulares de viver.',
    slug: 'residencial',
  },
  {
    num: '02',
    title: 'Arquitetura comercial.',
    description:
      'Espaços que conectam identidade, funcionalidade e experiência.',
    slug: 'comercial',
  },
  {
    num: '03',
    title: 'Arquitetura de interiores.',
    description:
      'Composições que valorizam materiais, iluminação e relações espaciais.',
    slug: 'interiores',
  },
];

const METHOD_STEPS = [
  {
    num: '01',
    title: 'Escuta.',
    detail: 'Leitura do programa, rotina, terreno e condicionantes ambientais.',
  },
  {
    num: '02',
    title: 'Conceito.',
    detail: 'Partido arquitetônico, implantação, volumetria e relação com a luz.',
  },
  {
    num: '03',
    title: 'Desenvolvimento.',
    detail: 'Estudos espaciais, definição de materiais e proporções construtivas.',
  },
  {
    num: '04',
    title: 'Detalhamento.',
    detail: 'Compatibilização conceitual de encontros, texturas e elementos de interior.',
  },
];

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroProject = PROJECTS[0];

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    void runEditorialMotion(containerRef.current).then((fn) => {
      cleanup = fn;
    });
    return () => {
      cleanup?.();
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-[#EAE8E1] text-[#191B1A]">
      {/* Seção 01: Hero cinematográfico */}
      <section className="relative min-h-[88vh] sm:min-h-[94vh] flex flex-col justify-end bg-[#191B1A] text-[#FFFFFF] overflow-hidden">
        <div className="absolute inset-0">
          <ArchitecturalImage
            image={heroProject.heroImage}
            sizes="100vw"
            priority
            className="w-full h-full"
            imgClassName="w-full h-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#191B1A]/90 via-[#191B1A]/40 to-[#191B1A]/45"
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 pb-10 sm:pb-16 pt-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-5">
              <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[#EAE8E1]/90">
                01 / Casa Horizonte
              </p>
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-medium tracking-[-0.03em] leading-[0.98] text-[#FFFFFF]">
                Arquitetura além da forma.
              </h1>
              <p className="text-base sm:text-xl text-[#EAE8E1] max-w-xl font-normal">
                Espaços que traduzem formas de viver.
              </p>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <Link
                to="/projetos"
                className="inline-flex items-center gap-3 px-6 py-4 bg-[#EAE8E1] text-[#191B1A] font-mono-tech text-xs uppercase tracking-[0.16em] hover:bg-[#787D60] hover:text-[#FFFFFF] transition-colors"
              >
                <span>Explorar projetos.</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 02: Manifesto */}
      <section className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-3 space-y-3" data-reveal>
            <p className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#787D60]">
              02 / Manifesto
            </p>
            <div data-line className="h-px w-20 bg-[#191B1A]/40" />
            <p className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-[#5C5E57]">
              COTA 07 · Brutalismo Contemporâneo Brasileiro
            </p>
          </div>

          <div className="lg:col-span-9 space-y-8" data-reveal>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.025em] leading-[1.04]">
              O espaço transforma a maneira como vivemos.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4 border-t border-[#191B1A]/15">
              <p className="md:col-span-8 text-base sm:text-lg leading-relaxed text-[#2C2E2B]">
                A arquitetura nasce do encontro entre matéria, luz, natureza e pessoas. Nossa
                proposta parte da essência de cada espaço para construir relações mais conscientes
                com o ambiente.
              </p>
              <div className="md:col-span-4 flex flex-col justify-between gap-2 font-mono-tech text-xs text-[#5C5E57]">
                <span>EIXO 01 / MATÉRIA</span>
                <span>EIXO 02 / LUZ NATURAL</span>
                <span>EIXO 03 / PERMANÊNCIA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 03: Projetos selecionados */}
      <section className="border-t border-[#191B1A]/15 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14" data-reveal>
          <div className="space-y-3">
            <p className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#787D60]">
              03 / Projetos selecionados
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-medium tracking-[-0.025em]">
              Formas de habitar.
            </h2>
          </div>

          <Link
            to="/projetos"
            className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-[0.16em] text-[#191B1A] border-b border-[#191B1A] pb-1 hover:text-[#787D60] hover:border-[#787D60] transition-colors self-start sm:self-auto"
          >
            <span>Ver todos os projetos.</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Composição assimétrica editorial */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-x-10">
          {PROJECTS.map((project, index) => {
            const colSpan =
              index === 0
                ? 'lg:col-span-7'
                : index === 1
                  ? 'lg:col-span-5 lg:mt-20'
                  : index === 2
                    ? 'lg:col-span-5'
                    : 'lg:col-span-7 lg:-mt-8';

            const aspectClass =
              index === 0
                ? 'aspect-[16/9]'
                : index === 1
                  ? 'aspect-[4/3]'
                  : index === 2
                    ? 'aspect-[4/3]'
                    : 'aspect-[16/9]';

            return (
              <article key={project.id} className={`${colSpan} group`} data-reveal>
                <Link to={`/projetos/${project.slug}`} className="block space-y-5">
                  <div className="relative overflow-hidden border border-[#191B1A]/10">
                    <ArchitecturalImage
                      image={project.heroImage}
                      sizes="(min-width: 1024px) 55vw, 100vw"
                      className={aspectClass}
                      imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="flex items-baseline justify-between gap-4 border-t border-[#191B1A]/15 pt-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-3 font-mono-tech text-xs uppercase tracking-[0.16em] text-[#5C5E57]">
                        <span className="text-[#787D60]">{project.number}.</span>
                        <span>{project.categoryLabel}</span>
                        <span>·</span>
                        <span>{project.area}</span>
                      </div>
                      <h3 className="font-display text-2xl sm:text-3xl font-medium tracking-tight group-hover:text-[#787D60] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm sm:text-base text-[#3D3F3B] max-w-xl leading-relaxed">
                        {project.shortDescription}
                      </p>
                    </div>
                    <ArrowUpRight
                      className="w-5 h-5 shrink-0 text-[#191B1A] group-hover:text-[#787D60] transition-colors"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* Seção 04: Áreas de atuação */}
      <section className="border-t border-[#191B1A]/15 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 space-y-3" data-reveal>
            <p className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#787D60]">
              04 / Áreas de atuação
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-[-0.02em]">
              Escalas e programas.
            </h2>
          </div>

          <div className="lg:col-span-8 divide-y divide-[#191B1A]/15 border-t border-b border-[#191B1A]/15">
            {PRACTICE_AREAS.map((area) => (
              <div
                key={area.num}
                data-reveal
                className="py-8 sm:py-10 grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 items-baseline"
              >
                <span className="sm:col-span-2 font-mono-tech text-xs uppercase tracking-[0.18em] text-[#787D60]">
                  {area.num}.
                </span>
                <h3 className="sm:col-span-4 font-display text-xl sm:text-2xl font-medium">
                  {area.title}
                </h3>
                <p className="sm:col-span-5 text-sm sm:text-base text-[#3D3F3B] leading-relaxed">
                  {area.description}
                </p>
                <div className="sm:col-span-1 flex sm:justify-end">
                  <Link
                    to={`/projetos?categoria=${area.slug}`}
                    aria-label={`Ver projetos em ${area.title}`}
                    className="inline-flex items-center justify-center w-9 h-9 border border-[#191B1A]/20 hover:bg-[#191B1A] hover:text-[#EAE8E1] transition-colors"
                  >
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção 05: O estúdio */}
      <section className="border-t border-[#191B1A]/15 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-6" data-reveal>
            <p className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#787D60]">
              05 / O estúdio
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-medium tracking-[-0.025em] leading-[1.06]">
              Pensar. Desenhar. Transformar.
            </h2>
            <p className="text-base sm:text-lg text-[#2C2E2B] leading-relaxed max-w-xl">
              Uma abordagem que entende a arquitetura como processo de investigação, sensibilidade
              e precisão.
            </p>
            <p className="font-mono-tech text-xs uppercase tracking-[0.14em] text-[#5C5E57] border-l-2 border-[#787D60] pl-4">
              Projeto conceitual de arquitetura e interiores. Estudos autorais sem vínculo com
              escritório comercial real.
            </p>
            <div className="pt-2">
              <Link
                to="/estudio"
                className="inline-flex items-center gap-3 px-5 py-3.5 border border-[#191B1A] font-mono-tech text-xs uppercase tracking-[0.16em] hover:bg-[#191B1A] hover:text-[#EAE8E1] transition-colors"
              >
                <span>Conhecer o estúdio</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6" data-reveal>
            <ArchitecturalImage
              image={STUDIO_IMAGE}
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="aspect-[4/3] border border-[#191B1A]/15"
            />
          </div>
        </div>
      </section>

      {/* Seção 06: Método */}
      <section className="border-t border-[#191B1A]/15 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14" data-reveal>
          <div className="space-y-3">
            <p className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#787D60]">
              06 / Método
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-medium tracking-[-0.025em]">
              Da primeira linha ao espaço.
            </h2>
          </div>

          <Link
            to="/metodo"
            className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-[0.16em] border-b border-[#191B1A] pb-1 hover:text-[#787D60] hover:border-[#787D60] transition-colors self-start sm:self-auto"
          >
            <span>Explorar metodologia</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Diagramação inspirada em desenhos técnicos */}
        <div className="relative border border-[#191B1A]/20 bg-[#EAE8E1]">
          <div className="hidden lg:grid grid-cols-4 border-b border-[#191B1A]/15 px-6 py-3 font-mono-tech text-[11px] uppercase tracking-[0.16em] text-[#5C5E57]">
            <span>COTA 01 · ORIGEM</span>
            <span>COTA 02 · PARTIDO</span>
            <span>COTA 03 · FORMA</span>
            <span>COTA 04 · MATÉRIA</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#191B1A]/15">
            {METHOD_STEPS.map((step) => (
              <div key={step.num} className="p-6 sm:p-8 space-y-6" data-reveal>
                <div className="flex items-center justify-between">
                  <span className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#787D60]">
                    {step.num}.
                  </span>
                  <span className="w-3 h-3 border border-[#191B1A]/35 relative" aria-hidden="true">
                    <span className="absolute inset-[3px] bg-[#787D60]" />
                  </span>
                </div>
                <h3 className="font-display text-2xl font-medium">{step.title}</h3>
                <p className="text-sm text-[#3D3F3B] leading-relaxed">{step.detail}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-[#191B1A]/15 px-6 py-3 font-mono-tech text-[11px] text-[#5C5E57]">
            Etapas referentes à concepção arquitetônica conceitual. Não constituem projeto
            executivo de engenharia ou obra.
          </div>
        </div>
      </section>

      {/* Seção 07: CTA final */}
      <section className="bg-[#191B1A] text-[#EAE8E1] py-24 sm:py-32">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-4xl space-y-8" data-reveal>
            <p className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#787D60]">
              07 / Briefing demonstrativo
            </p>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-medium tracking-[-0.03em] leading-[1.02] text-[#FFFFFF]">
              Toda grande arquitetura começa com uma ideia.
            </h2>
            <div className="pt-2">
              <Link
                to="/contato"
                className="inline-flex items-center gap-3 px-7 py-4 bg-[#EAE8E1] text-[#191B1A] font-mono-tech text-xs uppercase tracking-[0.16em] hover:bg-[#787D60] hover:text-[#FFFFFF] transition-colors"
              >
                <span>Iniciar um projeto.</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
