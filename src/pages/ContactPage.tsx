import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, RotateCcw } from 'lucide-react';

const PROJECT_TYPES = [
  { id: 'residencial', label: 'Residencial', desc: 'Casas térreas, residências de pátio ou implantação aberta.' },
  { id: 'comercial', label: 'Comercial', desc: 'Pavilhões corporativos, estúdios ou espaços culturais.' },
  { id: 'interiores', label: 'Interiores', desc: 'Reformas integrais, marcenaria arquitetônica e atmosfera.' },
];

const AREA_RANGES = [
  { id: 'ate-150', label: 'Até 150 m²', note: 'Escala compacta ou apartamento' },
  { id: '150-300', label: '150 m² a 300 m²', note: 'Residência média ou conjunto comercial' },
  { id: '300-500', label: '300 m² a 500 m²', note: 'Residência ampla ou pavilhão' },
  { id: 'acima-500', label: 'Acima de 500 m²', note: 'Programa complexo ou multiuso' },
];

const STYLE_OPTIONS = [
  { id: 'contemporaneo', label: 'Contemporâneo', note: 'Linhas puras, grandes vãos e integração.' },
  { id: 'minimalista', label: 'Minimalista', note: 'Redução formal e silêncio visual.' },
  { id: 'natural', label: 'Natural', note: 'Madeira, pedra, vegetação e luz filtrada.' },
  { id: 'outros', label: 'Outros / Híbrido', note: 'Brutalismo aparente ou linguagem personalizada.' },
];

export default function ContactPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [projectType, setProjectType] = useState<string>('');
  const [areaRange, setAreaRange] = useState<string>('');
  const [styleChoice, setStyleChoice] = useState<string>('');
  const [confirmed, setConfirmed] = useState(false);

  const selectedTypeObj = PROJECT_TYPES.find((t) => t.id === projectType);
  const selectedAreaObj = AREA_RANGES.find((a) => a.id === areaRange);
  const selectedStyleObj = STYLE_OPTIONS.find((s) => s.id === styleChoice);

  const handleReset = () => {
    setStep(1);
    setProjectType('');
    setAreaRange('');
    setStyleChoice('');
    setConfirmed(false);
  };

  return (
    <div className="bg-[#EAE8E1] text-[#191B1A] pt-28 sm:pt-36 pb-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="max-w-4xl space-y-10">
          <header className="space-y-4 border-b border-[#191B1A]/15 pb-8">
            <p className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#787D60]">
              Briefing Demonstrativo · COTA.07
            </p>
            <h1 className="font-display text-4xl sm:text-6xl font-medium tracking-[-0.03em]">
              Iniciar um projeto.
            </h1>
            <div className="p-4 border border-[#191B1A]/20 bg-[#E2DFD6] text-sm text-[#2C2E2B] leading-relaxed">
              <strong>Simulação demonstrativa local:</strong> este fluxo interativo não solicita
              dados pessoais, não envia informações a servidores e não gera orçamento real.
            </div>
          </header>

          {/* Indicador de etapas */}
          <nav aria-label="Etapas do briefing demonstrativo" className="grid grid-cols-4 gap-2 sm:gap-4">
            {[
              { n: 1, label: 'Tipo' },
              { n: 2, label: 'Área' },
              { n: 3, label: 'Estilo' },
              { n: 4, label: 'Resumo' },
            ].map((item) => {
              const isCurrent = step === item.n;
              const isDone = step > item.n || (item.n === 4 && confirmed);
              return (
                <div
                  key={item.n}
                  className={`border-t-2 pt-3 ${
                    isCurrent
                      ? 'border-[#191B1A] text-[#191B1A]'
                      : isDone
                        ? 'border-[#787D60] text-[#787D60]'
                        : 'border-[#191B1A]/20 text-[#5C5E57]'
                  }`}
                >
                  <span className="font-mono-tech text-xs uppercase tracking-[0.14em] block">
                    0{item.n}. {item.label}
                  </span>
                </div>
              );
            })}
          </nav>

          {/* Etapa 1 */}
          {step === 1 && (
            <section className="space-y-6" aria-labelledby="step1-title">
              <h2 id="step1-title" className="font-display text-2xl sm:text-3xl font-medium">
                01. Selecione o tipo de projeto
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {PROJECT_TYPES.map((option) => {
                  const selected = projectType === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setProjectType(option.id)}
                      className={`text-left p-6 border transition-colors space-y-3 ${
                        selected
                          ? 'bg-[#191B1A] text-[#EAE8E1] border-[#191B1A]'
                          : 'bg-transparent border-[#191B1A]/25 hover:border-[#191B1A]'
                      }`}
                    >
                      <span className="font-display text-xl font-medium block">{option.label}</span>
                      <span
                        className={`text-sm block leading-relaxed ${
                          selected ? 'text-[#EAE8E1]/80' : 'text-[#3D3F3B]'
                        }`}
                      >
                        {option.desc}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  disabled={!projectType}
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#191B1A] text-[#EAE8E1] font-mono-tech text-xs uppercase tracking-[0.16em] disabled:opacity-40 hover:bg-[#787D60] transition-colors"
                >
                  <span>Avançar para área</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </section>
          )}

          {/* Etapa 2 */}
          {step === 2 && (
            <section className="space-y-6" aria-labelledby="step2-title">
              <h2 id="step2-title" className="font-display text-2xl sm:text-3xl font-medium">
                02. Informe a faixa de área aproximada
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {AREA_RANGES.map((option) => {
                  const selected = areaRange === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setAreaRange(option.id)}
                      className={`text-left p-6 border transition-colors space-y-2 ${
                        selected
                          ? 'bg-[#191B1A] text-[#EAE8E1] border-[#191B1A]'
                          : 'bg-transparent border-[#191B1A]/25 hover:border-[#191B1A]'
                      }`}
                    >
                      <span className="font-display text-xl font-medium block">{option.label}</span>
                      <span
                        className={`font-mono-tech text-xs block ${
                          selected ? 'text-[#EAE8E1]/75' : 'text-[#5C5E57]'
                        }`}
                      >
                        {option.note}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-2 px-5 py-3.5 border border-[#191B1A]/30 font-mono-tech text-xs uppercase tracking-[0.16em] hover:border-[#191B1A]"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  <span>Voltar</span>
                </button>
                <button
                  type="button"
                  disabled={!areaRange}
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#191B1A] text-[#EAE8E1] font-mono-tech text-xs uppercase tracking-[0.16em] disabled:opacity-40 hover:bg-[#787D60] transition-colors"
                >
                  <span>Avançar para estilo</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </section>
          )}

          {/* Etapa 3 */}
          {step === 3 && (
            <section className="space-y-6" aria-labelledby="step3-title">
              <h2 id="step3-title" className="font-display text-2xl sm:text-3xl font-medium">
                03. Escolha o direcionamento estético
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {STYLE_OPTIONS.map((option) => {
                  const selected = styleChoice === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setStyleChoice(option.id)}
                      className={`text-left p-6 border transition-colors space-y-2 ${
                        selected
                          ? 'bg-[#191B1A] text-[#EAE8E1] border-[#191B1A]'
                          : 'bg-transparent border-[#191B1A]/25 hover:border-[#191B1A]'
                      }`}
                    >
                      <span className="font-display text-xl font-medium block">{option.label}</span>
                      <span
                        className={`text-sm block leading-relaxed ${
                          selected ? 'text-[#EAE8E1]/80' : 'text-[#3D3F3B]'
                        }`}
                      >
                        {option.note}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 px-5 py-3.5 border border-[#191B1A]/30 font-mono-tech text-xs uppercase tracking-[0.16em] hover:border-[#191B1A]"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  <span>Voltar</span>
                </button>
                <button
                  type="button"
                  disabled={!styleChoice}
                  onClick={() => setStep(4)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#191B1A] text-[#EAE8E1] font-mono-tech text-xs uppercase tracking-[0.16em] disabled:opacity-40 hover:bg-[#787D60] transition-colors"
                >
                  <span>Revisar resumo</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </section>
          )}

          {/* Etapa 4 */}
          {step === 4 && (
            <section className="space-y-8" aria-labelledby="step4-title">
              <h2 id="step4-title" className="font-display text-2xl sm:text-3xl font-medium">
                04. Resumo do briefing simulado
              </h2>

              <dl className="border-t border-b border-[#191B1A]/20 divide-y divide-[#191B1A]/15">
                <div className="py-4 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <dt className="font-mono-tech text-xs uppercase tracking-[0.16em] text-[#5C5E57]">
                      Tipo de projeto
                    </dt>
                    <dd className="font-display text-xl font-medium mt-1">
                      {selectedTypeObj?.label}
                    </dd>
                  </div>
                  {!confirmed && (
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="font-mono-tech text-xs uppercase tracking-[0.14em] underline underline-offset-4 hover:text-[#787D60]"
                    >
                      Editar
                    </button>
                  )}
                </div>

                <div className="py-4 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <dt className="font-mono-tech text-xs uppercase tracking-[0.16em] text-[#5C5E57]">
                      Área aproximada
                    </dt>
                    <dd className="font-display text-xl font-medium mt-1">
                      {selectedAreaObj?.label}
                    </dd>
                  </div>
                  {!confirmed && (
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="font-mono-tech text-xs uppercase tracking-[0.14em] underline underline-offset-4 hover:text-[#787D60]"
                    >
                      Editar
                    </button>
                  )}
                </div>

                <div className="py-4 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <dt className="font-mono-tech text-xs uppercase tracking-[0.16em] text-[#5C5E57]">
                      Estilo desejado
                    </dt>
                    <dd className="font-display text-xl font-medium mt-1">
                      {selectedStyleObj?.label}
                    </dd>
                  </div>
                  {!confirmed && (
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="font-mono-tech text-xs uppercase tracking-[0.14em] underline underline-offset-4 hover:text-[#787D60]"
                    >
                      Editar
                    </button>
                  )}
                </div>
              </dl>

              {!confirmed ? (
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="inline-flex items-center gap-2 px-5 py-3.5 border border-[#191B1A]/30 font-mono-tech text-xs uppercase tracking-[0.16em] hover:border-[#191B1A]"
                  >
                    <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                    <span>Voltar</span>
                  </button>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 px-5 py-3.5 border border-[#191B1A]/30 font-mono-tech text-xs uppercase tracking-[0.16em] hover:border-[#191B1A]"
                    >
                      <RotateCcw className="w-4 h-4" aria-hidden="true" />
                      <span>Reiniciar</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmed(true)}
                      className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#191B1A] text-[#EAE8E1] font-mono-tech text-xs uppercase tracking-[0.16em] hover:bg-[#787D60] transition-colors"
                    >
                      <Check className="w-4 h-4" aria-hidden="true" />
                      <span>Confirmar simulação</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-6 sm:p-8 bg-[#191B1A] text-[#EAE8E1] space-y-5">
                  <p className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#787D60]">
                    Simulação registrada localmente
                  </p>
                  <p className="font-display text-2xl sm:text-3xl font-medium">
                    Briefing demonstrativo concluído.
                  </p>
                  <p className="text-sm text-[#96978F] leading-relaxed">
                    Nenhum dado pessoal foi coletado e nenhuma informação foi transmitida para
                    servidores externos. Este fluxo ilustra a experiência interativa do estudo
                    conceitual COTA 07.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-4">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 px-5 py-3 bg-[#EAE8E1] text-[#191B1A] font-mono-tech text-xs uppercase tracking-[0.16em] hover:bg-[#787D60] hover:text-[#FFFFFF] transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" aria-hidden="true" />
                      <span>Nova simulação</span>
                    </button>
                    <Link
                      to="/projetos"
                      className="inline-flex items-center gap-2 px-5 py-3 border border-[#EAE8E1]/30 font-mono-tech text-xs uppercase tracking-[0.16em] hover:border-[#EAE8E1]"
                    >
                      <span>Explorar projetos</span>
                    </Link>
                  </div>
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
