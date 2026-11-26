import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { ArchitecturalImage } from '../components/ArchitecturalImage';
import { HorizontalExhibitionGallery } from '../components/HorizontalExhibitionGallery';
import { ProjectExplorer } from '../components/ProjectExplorer';
import { PROJECTS, STUDIO_IMAGE } from '../data/projects';
import { runEditorialMotion } from '../utils/motion';

const DISCIPLINES = [
  {
    title: 'Arquitetura residencial',
    description: 'Habitar aberto à paisagem e ao percurso do sol.',
    slug: 'residencial',
  },
  {
    title: 'Arquitetura comercial',
    description: 'Pavilhões permeáveis onde estrutura e encontro coexistem.',
    slug: 'comercial',
  },
  {
    title: 'Arquitetura de interiores',
    description: 'Superfícies táteis, marcenaria contínua e luz difusa.',
    slug: 'interiores',
  },
];

const METHOD_SEQUENCE = [
  {
    step: '01',
    title: 'Escuta',
    text: 'Leitura do programa, rotina de uso, topografia e insolação antes de qualquer traço.',
    image: PROJECTS[0].gallery[1],
  },
  {
    step: '02',
    title: 'Conceito',
    text: 'Definição do partido arquitetônico, implantação no terreno e relação entre cheios e vazios.',
    image: PROJECTS[1].gallery[2],
  },
  {
    step: '03',
    title: 'Desenvolvimento',
    text: 'Amadurecimento das proporções estruturais, ventilação cruzada e materialidade principal.',
    image: PROJECTS[3].gallery[1],
  },
  {
    step: '04',
    title: 'Detalhamento',
    text: 'Estudo conceitual dos encontros entre concreto, madeira, pedra e iluminação interior.',
    image: PROJECTS[2].gallery[2],
  },
];

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);

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
    <div ref={containerRef} className="bg-[#F2EFE9] text-[#191B1A]">
      {/* Sala 01: Explorador Interativo de Projetos */}
      <ProjectExplorer />

      {/* Sala 02: Manifesto Monumental com Sobreposição Controlada */}
      <section
        id="manifesto"
        className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 pt-20 sm:pt-28 pb-16 sm:pb-24"
      >
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Fotografia do jardim da Casa Pátio posicionada à direita/centro */}
          <div className="lg:col-span-6 lg:col-start-7 order-2 lg:order-1">
            <ArchitecturalImage
              image={PROJECTS[1].gallery[1]}
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="aspect-[4/5]"
              revealMask="vertical"
              scrollScale
            />
          </div>

          {/* Tipografia monumental atravessando a composição */}
          <div
            className="lg:col-span-8 lg:col-start-1 lg:row-start-1 order-1 lg:order-2 z-10 lg:pt-10 space-y-8"
            data-reveal
          >
            <p className="text-sm font-medium text-[#6E7458]">
              Living Architecture · Manifesto
            </p>
            <h2 className="font-display text-[clamp(2.5rem,6.4vw,5.75rem)] font-semibold tracking-[-0.04em] leading-[0.94] text-[#191B1A] lg:bg-[#F2EFE9]/90 lg:pr-10 lg:py-4 lg:inline-block">
              O espaço transforma a maneira como vivemos.
            </h2>
            <p className="text-base sm:text-xl text-[#2C2E2B] max-w-xl leading-relaxed lg:pt-4">
              A arquitetura nasce do encontro entre matéria, luz, natureza e pessoas. Nossa proposta
              parte da essência de cada espaço para construir relações mais conscientes com o
              ambiente.
            </p>
          </div>
        </div>
      </section>

      {/* Sala 03: Galeria Horizontal Imersiva na Homepage */}
      <HorizontalExhibitionGallery />

      {/* Sala 04: Materialidade (Matéria, Luz e Natureza) */}
      <section className="bg-[#191B1A] text-[#F2EFE9] py-20 sm:py-28">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 space-y-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end" data-reveal>
            <div className="lg:col-span-8 space-y-3">
              <p className="text-sm font-medium text-[#96978F]">
                Matéria, Luz e Natureza
              </p>
              <h2 className="font-display text-4xl sm:text-6xl font-semibold tracking-[-0.035em] leading-[0.96] text-[#FFFFFF]">
                A matéria também conta histórias.
              </h2>
            </div>
            <p className="lg:col-span-4 text-sm sm:text-base text-[#EAE8E1]/80 leading-relaxed">
              Concreto aparente, madeira natural, pedra bruta e vegetação tropical respondem à
              incidência solar ao longo do dia sem artifícios.
            </p>
          </div>

          {/* Composição assimétrica expressiva */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-3">
              <ArchitecturalImage
                image={PROJECTS[0].gallery[2]}
                sizes="(min-width: 1024px) 56vw, 100vw"
                className="aspect-[16/10]"
                revealMask="horizontal"
                scrollScale
              />
              <p className="text-xs text-[#96978F]">
                Água, pedra basalto e concreto em balanço · Casa Horizonte
              </p>
            </div>

            <div className="lg:col-span-5 lg:mt-16 space-y-3" data-parallax="18">
              <ArchitecturalImage
                image={PROJECTS[2].gallery[1]}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="aspect-[4/3]"
                revealMask="vertical"
              />
              <p className="text-xs text-[#96978F]">
                Pedra sabão fosca, madeira escura e laje em concreto · Apartamento Matéria
              </p>
            </div>

            <div className="lg:col-span-4 lg:-mt-16 space-y-3" data-parallax="-16">
              <ArchitecturalImage
                image={PROJECTS[3].gallery[2]}
                sizes="(min-width: 1024px) 32vw, 100vw"
                className="aspect-[4/5]"
                revealMask="vertical"
              />
              <p className="text-xs text-[#96978F]">
                Estrutura metálica, concreto e vegetação · Pavilhão Sete
              </p>
            </div>

            <div className="lg:col-span-7 lg:col-start-6 space-y-3">
              <ArchitecturalImage
                image={PROJECTS[1].heroImage}
                sizes="(min-width: 1024px) 56vw, 100vw"
                className="aspect-[16/10]"
                revealMask="horizontal"
                scrollScale
              />
              <p className="text-xs text-[#96978F]">
                Sombras geométricas sobre concreto e pedra natural · Casa Pátio
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sala 05: O Estúdio e Narrativa das Áreas */}
      <section className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-6 relative pb-10 sm:pb-16">
            <ArchitecturalImage
              image={STUDIO_IMAGE}
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="w-full sm:w-[86%] aspect-[4/3]"
              revealMask="horizontal"
            />
            <div
              data-parallax="-20"
              className="hidden sm:block w-[46%] ml-auto -mt-28 relative z-10 shadow-[0_24px_48px_rgba(25,27,26,0.16)]"
            >
              <ArchitecturalImage
                image={PROJECTS[2].gallery[2]}
                sizes="22vw"
                className="aspect-[4/5]"
                revealMask="vertical"
              />
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 space-y-10" data-reveal>
            <div className="space-y-4">
              <p className="text-sm font-medium text-[#6E7458]">O estúdio</p>
              <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-[-0.03em] leading-[1.02]">
                Pensar. Desenhar. Transformar.
              </h2>
              <p className="text-base sm:text-lg text-[#3D3F3B] leading-relaxed">
                Uma abordagem que entende a arquitetura como investigação, sensibilidade e precisão.
                Projeto conceitual sem vínculo com escritório comercial real.
              </p>
              <Link
                to="/estudio"
                className="inline-flex items-center gap-2.5 text-sm font-medium hover:text-[#6E7458] transition-colors group"
              >
                <span>Conhecer o estúdio</span>
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-[#191B1A]/25 group-hover:bg-[#191B1A] group-hover:text-[#F2EFE9] transition-colors">
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </Link>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-[#5C5E57]">
                Atuação investigada em três frentes complementares:
              </p>
              <div className="space-y-4">
                {DISCIPLINES.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/projetos?categoria=${item.slug}`}
                    className="group flex items-baseline justify-between gap-4"
                  >
                    <div>
                      <span className="font-display text-xl font-medium group-hover:text-[#6E7458] transition-colors">
                        {item.title}
                      </span>
                      <span className="block text-sm text-[#5C5E57]">{item.description}</span>
                    </div>
                    <ArrowUpRight
                      className="w-4 h-4 shrink-0 text-[#5C5E57] group-hover:text-[#6E7458] transition-colors"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sala 06: Metodologia como Sequência Visual Contínua */}
      <section className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 pb-24 sm:pb-32 pt-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14" data-reveal>
          <div className="space-y-2 max-w-2xl">
            <p className="text-sm font-medium text-[#6E7458]">Método</p>
            <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-[-0.03em]">
              Da primeira linha ao espaço.
            </h2>
          </div>

          <Link
            to="/metodo"
            className="inline-flex items-center gap-2.5 text-sm font-medium hover:text-[#6E7458] transition-colors group self-start sm:self-auto"
          >
            <span>Explorar processo</span>
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-[#191B1A]/25 group-hover:bg-[#191B1A] group-hover:text-[#F2EFE9] transition-colors">
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </span>
          </Link>
        </div>

        <div className="space-y-12 sm:space-y-16">
          {METHOD_SEQUENCE.map((item, idx) => (
            <div
              key={item.step}
              data-reveal
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center"
            >
              <div
                className={`lg:col-span-5 space-y-3 ${
                  idx % 2 === 1 ? 'lg:order-2 lg:col-start-8' : 'lg:col-start-1'
                }`}
              >
                <span className="font-mono-tech text-xs text-[#6E7458]">{item.step}</span>
                <h3 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="text-base text-[#3D3F3B] leading-relaxed">{item.text}</p>
              </div>

              <div
                className={`lg:col-span-5 ${
                  idx % 2 === 1 ? 'lg:order-1 lg:col-start-2' : 'lg:col-start-7'
                }`}
              >
                <ArchitecturalImage
                  image={item.image}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="aspect-[16/9]"
                  revealMask={idx % 2 === 0 ? 'horizontal' : 'vertical'}
                  scrollScale
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
