import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const STAGES = [
  {
    num: '01',
    code: 'ETAPA 01 / ESCUTA',
    title: 'Escuta.',
    summary:
      'Leitura inicial das necessidades espaciais, rotina de uso, orientações solares e condicionantes do entorno.',
    deliverables: [
      'Mapeamento de programa de necessidades',
      'Leitura de fluxos e privacidade',
      'Síntese de prioridades conceituais',
    ],
  },
  {
    num: '02',
    code: 'ETAPA 02 / CONCEITO',
    title: 'Conceito.',
    summary:
      'Definição do partido arquitetônico, implantação no terreno, relações de cheio e vazio e estratégia de iluminação natural.',
    deliverables: [
      'Diagramas de implantação e insolação',
      'Volumetria preliminar e eixos estruturais',
      'Diretriz de materialidade principal',
    ],
  },
  {
    num: '03',
    code: 'ETAPA 03 / DESENVOLVIMENTO',
    title: 'Desenvolvimento.',
    summary:
      'Evolução das plantas conceituais, cortes esquemáticos e proporções entre estrutura, vedações e aberturas.',
    deliverables: [
      'Plantas e cortes conceituais',
      'Articulação entre interior e exterior',
      'Definição preliminar de acabamentos',
    ],
  },
  {
    num: '04',
    code: 'ETAPA 04 / DETALHAMENTO',
    title: 'Detalhamento.',
    summary:
      'Aprofundamento conceitual de marcenaria, encontros de materiais, paginações e leitura tátil das superfícies.',
    deliverables: [
      'Estudos de encontros construtivos',
      'Diretrizes de iluminação difusa',
      'Especificação conceitual de mobiliário e texturas',
    ],
  },
];

export default function MethodPage() {
  return (
    <div className="bg-[#EAE8E1] text-[#191B1A] pt-28 sm:pt-36 pb-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 space-y-16">
        <header className="border-b border-[#191B1A]/15 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-4">
            <p className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#787D60]">
              Metodologia Conceitual · COTA.07
            </p>
            <h1 className="font-display text-4xl sm:text-6xl font-medium tracking-[-0.03em]">
              Da primeira linha ao espaço.
            </h1>
            <p className="text-base sm:text-lg text-[#2C2E2B] max-w-2xl leading-relaxed">
              Estruturação em quatro etapas sucessivas que conduzem a investigação arquitetônica da
              escuta inicial ao detalhamento conceitual.
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <p className="font-mono-tech text-xs text-[#5C5E57] leading-relaxed">
              DOCUMENTAÇÃO CONCEITUAL DE PORTFÓLIO. NÃO SUBSTITUI PROJETO EXECUTIVO LEGAL OU DE
              ENGENHARIA.
            </p>
          </div>
        </header>

        {/* Diagrama técnico SVG */}
        <section aria-label="Diagrama de eixos do método" className="border border-[#191B1A]/20 p-6 sm:p-10 bg-[#E4E1D8]">
          <div className="flex items-center justify-between font-mono-tech text-[11px] uppercase tracking-[0.16em] text-[#5C5E57] mb-6">
            <span>DIAGRAMA DE PROCESSO · ESCALA CONCEITUAL</span>
            <span>01 &gt; 04</span>
          </div>
          <svg
            viewBox="0 0 1200 180"
            className="w-full h-auto"
            role="img"
            aria-label="Diagrama linear conectando as etapas 01 Escuta, 02 Conceito, 03 Desenvolvimento e 04 Detalhamento"
          >
            <line x1="60" y1="90" x2="1140" y2="90" stroke="#191B1A" strokeWidth="1.5" strokeOpacity="0.35" />
            {[
              { x: 120, n: '01', label: 'ESCUTA' },
              { x: 440, n: '02', label: 'CONCEITO' },
              { x: 760, n: '03', label: 'DESENVOLVIMENTO' },
              { x: 1080, n: '04', label: 'DETALHAMENTO' },
            ].map((node) => (
              <g key={node.n}>
                <line x1={node.x} y1="30" x2={node.x} y2="150" stroke="#191B1A" strokeWidth="1" strokeOpacity="0.2" />
                <rect x={node.x - 10} y="80" width="20" height="20" fill="#EAE8E1" stroke="#191B1A" strokeWidth="1.5" />
                <rect x={node.x - 4} y="86" width="8" height="8" fill="#787D60" />
                <text
                  x={node.x}
                  y="20"
                  textAnchor="middle"
                  fill="#787D60"
                  fontFamily="IBM Plex Mono, monospace"
                  fontSize="12"
                >
                  {node.n}
                </text>
                <text
                  x={node.x}
                  y="172"
                  textAnchor="middle"
                  fill="#191B1A"
                  fontFamily="IBM Plex Mono, monospace"
                  fontSize="12"
                  letterSpacing="1.5"
                >
                  {node.label}
                </text>
              </g>
            ))}
          </svg>
        </section>

        {/* Etapas detalhadas */}
        <section className="divide-y divide-[#191B1A]/15 border-t border-b border-[#191B1A]/15">
          {STAGES.map((stage) => (
            <div key={stage.num} className="py-10 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4 space-y-2">
                <p className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#787D60]">
                  {stage.code}
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-medium">{stage.title}</h2>
              </div>

              <div className="lg:col-span-5">
                <p className="text-base sm:text-lg text-[#2C2E2B] leading-relaxed">
                  {stage.summary}
                </p>
              </div>

              <div className="lg:col-span-3 space-y-2">
                <p className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-[#5C5E57]">
                  Escopo conceitual
                </p>
                <ul className="space-y-1.5 text-sm text-[#191B1A]">
                  {stage.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-[#787D60] font-mono-tech">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>

        <div className="pt-2">
          <Link
            to="/contato"
            className="inline-flex items-center gap-3 px-6 py-4 bg-[#191B1A] text-[#EAE8E1] font-mono-tech text-xs uppercase tracking-[0.16em] hover:bg-[#787D60] transition-colors"
          >
            <span>Simular briefing demonstrativo</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
