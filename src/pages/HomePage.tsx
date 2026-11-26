import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { ArchitecturalImage } from '../components/ArchitecturalImage';
import { ProjectExplorer } from '../components/ProjectExplorer';
import { PROJECTS, STUDIO_IMAGE } from '../data/projects';
import { runEditorialMotion } from '../utils/motion';

const DISCIPLINES = [
  {
    title: 'Arquitetura residencial',
    description: 'Projetos que traduzem hábitos, necessidades e formas particulares de viver.',
    slug: 'residencial',
  },
  {
    title: 'Arquitetura comercial',
    description: 'Espaços que conectam identidade, funcionalidade e experiência.',
    slug: 'comercial',
  },
  {
    title: 'Arquitetura de interiores',
    description: 'Composições que valorizam materiais, iluminação e relações espaciais.',
    slug: 'interiores',
  },
];

const METHOD_FLOW = [
  {
    step: '01',
    title: 'Escuta',
    text: 'Leitura do programa, rotina, terreno e condicionantes naturais.',
  },
  {
    step: '02',
    title: 'Conceito',
    text: 'Partido arquitetônico, implantação, luz solar e volumetria.',
  },
  {
    step: '03',
    title: 'Desenvolvimento',
    text: 'Relações espaciais, proporções construtivas e matéria.',
  },
  {
    step: '04',
    title: 'Detalhamento',
    text: 'Encontros de superfícies, texturas e atmosfera interior.',
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

      {/* Sala 02: Manifesto Espacial com Assimetria Orgânica */}
      <section className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-24 sm:py-36 lg:py-44">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 lg:col-start-2 space-y-8" data-reveal>
            <p className="text-sm font-medium text-[#6E7458]">
              Living Architecture · Manifesto
            </p>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.035em] leading-[1.02]">
              O espaço transforma a maneira como vivemos.
            </h2>
            <p className="text-base sm:text-xl text-[#3D3F3B] max-w-2xl leading-relaxed">
              A arquitetura nasce do encontro entre matéria, luz, natureza e pessoas. Nossa proposta
              parte da essência de cada espaço para construir relações mais conscientes com o
              ambiente.
            </p>
          </div>

          <div className="lg:col-span-4 lg:-mt-12" data-reveal>
            <ArchitecturalImage
              image={PROJECTS[1].gallery[1]}
              sizes="(min-width: 1024px) 30vw, 100vw"
              className="aspect-[4/5]"
            />
          </div>
        </div>
      </section>

      {/* Sala 03: Diálogo entre Disciplinas e Estúdio com Sobreposição Controlada */}
      <section className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-16 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Composição fotográfica sobreposta */}
          <div className="lg:col-span-6 relative pb-12 sm:pb-20" data-reveal>
            <ArchitecturalImage
              image={STUDIO_IMAGE}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="w-full sm:w-[85%] aspect-[4/3]"
            />
            <div className="hidden sm:block w-[46%] ml-auto -mt-28 relative z-10 shadow-[0_24px_48px_rgba(25,27,26,0.16)]">
              <ArchitecturalImage
                image={PROJECTS[2].gallery[2]}
                sizes="22vw"
                className="aspect-[4/5]"
              />
            </div>
          </div>

          {/* Tipografia expressiva do Estúdio e Áreas */}
          <div className="lg:col-span-5 lg:col-start-8 space-y-14" data-reveal>
            <div className="space-y-5">
              <p className="text-sm font-medium text-[#6E7458]">O estúdio</p>
              <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-[-0.03em] leading-[1.04]">
                Pensar. Desenhar. Transformar.
              </h2>
              <p className="text-base sm:text-lg text-[#3D3F3B] leading-relaxed">
                Uma abordagem que entende a arquitetura como processo de investigação, sensibilidade
                e precisão. Exercício conceitual sem vínculo com escritório comercial real.
              </p>
              <Link
                to="/estudio"
                className="inline-flex items-center gap-2.5 text-sm font-medium text-[#191B1A] hover:text-[#6E7458] transition-colors group"
              >
                <span>Conhecer o estúdio</span>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-[#191B1A]/25 group-hover:bg-[#191B1A] group-hover:text-[#F2EFE9] transition-colors">
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              </Link>
            </div>

            <div className="space-y-6 pt-4">
              <p className="text-sm font-medium text-[#6E7458]">Áreas de atuação</p>
              <ul className="space-y-6">
                {DISCIPLINES.map((item) => (
                  <li key={item.slug}>
                    <Link
                      to={`/projetos?categoria=${item.slug}`}
                      className="group block space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="font-display text-2xl font-medium group-hover:text-[#6E7458] transition-colors">
                          {item.title}
                        </h3>
                        <ArrowUpRight
                          className="w-4 h-4 text-[#5C5E57] group-hover:text-[#6E7458] transition-colors"
                          aria-hidden="true"
                        />
                      </div>
                      <p className="text-sm text-[#3D3F3B] leading-relaxed">{item.description}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sala 04: Sequência Contínua do Método */}
      <section className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-24 sm:py-36">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16" data-reveal>
          <div className="space-y-3 max-w-2xl">
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

        {/* Sequência fluida descentralizada */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {METHOD_FLOW.map((item, idx) => (
            <div
              key={item.step}
              data-reveal
              className={`space-y-4 ${idx % 2 === 1 ? 'lg:mt-10' : ''}`}
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#E5E1D8] font-mono-tech text-xs text-[#191B1A]">
                {item.step}
              </span>
              <h3 className="font-display text-2xl font-medium">{item.title}</h3>
              <p className="text-sm text-[#3D3F3B] leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
