import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { ArchitecturalImage } from '../components/ArchitecturalImage';
import { PROJECTS } from '../data/projects';

const STAGES = [
  {
    num: '01',
    title: 'Escuta',
    summary:
      'Leitura inicial das necessidades espaciais, rotina de uso, orientações solares e condicionantes do entorno.',
    image: PROJECTS[0].gallery[1],
  },
  {
    num: '02',
    title: 'Conceito',
    summary:
      'Definição do partido arquitetônico, implantação no terreno, relações de cheio e vazio e estratégia de iluminação natural.',
    image: PROJECTS[1].gallery[2],
  },
  {
    num: '03',
    title: 'Desenvolvimento',
    summary:
      'Evolução das plantas conceituais, cortes esquemáticos e proporções entre estrutura, vedações e aberturas.',
    image: PROJECTS[3].gallery[1],
  },
  {
    num: '04',
    title: 'Detalhamento',
    summary:
      'Aprofundamento conceitual de marcenaria, encontros de materiais, paginações e leitura tátil das superfícies.',
    image: PROJECTS[2].gallery[2],
  },
];

export default function MethodPage() {
  return (
    <div className="bg-[#F2EFE9] text-[#191B1A] pt-32 sm:pt-40 pb-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 space-y-24">
        <header className="max-w-4xl space-y-5">
          <p className="text-sm font-medium text-[#6E7458]">
            Metodologia Conceitual · COTA.07
          </p>
          <h1 className="font-display text-5xl sm:text-7xl font-semibold tracking-[-0.04em] leading-[0.94]">
            Da primeira linha ao espaço.
          </h1>
          <p className="text-base sm:text-xl text-[#3D3F3B] max-w-2xl leading-relaxed">
            Sequência contínua de investigação que conduz o projeto da escuta inicial ao
            detalhamento conceitual. Não substitui projeto executivo legal ou de engenharia.
          </p>
        </header>

        {/* Sequência visual contínua com fotografia integrada */}
        <section className="space-y-20">
          {STAGES.map((stage, idx) => (
            <div
              key={stage.num}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              <div
                className={`lg:col-span-5 space-y-4 ${
                  idx % 2 === 1 ? 'lg:order-2 lg:col-start-8' : 'lg:col-start-1'
                }`}
              >
                <span className="font-mono-tech text-xs text-[#6E7458]">{stage.num}</span>
                <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight">
                  {stage.title}
                </h2>
                <p className="text-base sm:text-lg text-[#3D3F3B] leading-relaxed">
                  {stage.summary}
                </p>
              </div>

              <div
                className={`lg:col-span-6 ${
                  idx % 2 === 1 ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-7'
                }`}
              >
                <ArchitecturalImage
                  image={stage.image}
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="aspect-[16/10]"
                />
              </div>
            </div>
          ))}
        </section>

        <div>
          <Link
            to="/contato"
            className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-[#191B1A] text-[#F2EFE9] text-sm font-medium hover:bg-[#6E7458] transition-colors"
          >
            <span>Simular briefing demonstrativo</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
