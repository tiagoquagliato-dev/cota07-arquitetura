import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const STAGES = [
  {
    num: '01',
    title: 'Escuta',
    summary:
      'Leitura inicial das necessidades espaciais, rotina de uso, orientações solares e condicionantes do entorno.',
  },
  {
    num: '02',
    title: 'Conceito',
    summary:
      'Definição do partido arquitetônico, implantação no terreno, relações de cheio e vazio e estratégia de iluminação natural.',
  },
  {
    num: '03',
    title: 'Desenvolvimento',
    summary:
      'Evolução das plantas conceituais, cortes esquemáticos e proporções entre estrutura, vedações e aberturas.',
  },
  {
    num: '04',
    title: 'Detalhamento',
    summary:
      'Aprofundamento conceitual de marcenaria, encontros de materiais, paginações e leitura tátil das superfícies.',
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

        {/* Sequência visual contínua */}
        <section className="space-y-16">
          {STAGES.map((stage, idx) => (
            <div
              key={stage.num}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline ${
                idx % 2 === 1 ? 'lg:pl-16' : ''
              }`}
            >
              <div className="lg:col-span-2">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#E5E1D8] font-mono-tech text-xs">
                  {stage.num}
                </span>
              </div>
              <div className="lg:col-span-4">
                <h2 className="font-display text-3xl sm:text-4xl font-medium">{stage.title}</h2>
              </div>
              <div className="lg:col-span-6">
                <p className="text-base sm:text-lg text-[#3D3F3B] leading-relaxed">
                  {stage.summary}
                </p>
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
