import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, RotateCcw } from 'lucide-react';

const PROJECT_TYPES = [
  { id: 'residencial', label: 'Residencial', desc: 'Casas térreas, pátios ou implantação aberta.' },
  { id: 'comercial', label: 'Comercial', desc: 'Pavilhões corporativos ou espaços culturais.' },
  { id: 'interiores', label: 'Interiores', desc: 'Reformas integrais e marcenaria arquitetônica.' },
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
  { id: 'outros', label: 'Outros / Híbrido', note: 'Brutalismo aparente ou linguagem híbrida.' },
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

  const progressPercent = confirmed ? 100 : (step / 4) * 100;

  return (
    <div className="bg-[#F2EFE9] text-[#191B1A] pt-32 sm:pt-40 pb-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto space-y-12">
          <header className="space-y-4">
            <p className="text-sm font-medium text-[#6E7458]">
              Briefing Demonstrativo · Etapa 0{step} de 04
            </p>
            <h1 className="font-display text-4xl sm:text-6xl font-semibold tracking-[-0.035em] leading-[0.96]">
              Iniciar um projeto.
            </h1>
            <p className="text-sm text-[#5C5E57] leading-relaxed">
              Simulação interativa local: não solicita dados pessoais, não transmite informações a
              servidores e não gera orçamento real.
            </p>

            {/* Barra de progresso contínua */}
            <div className="h-1 w-full bg-[#E5E1D8] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#6E7458] transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </header>

          {step === 1 && (
            <section className="space-y-8" aria-labelledby="step1-title">
              <h2 id="step1-title" className="font-display text-2xl sm:text-3xl font-medium">
                Qual é o tipo de projeto?
              </h2>
              <div className="space-y-3">
                {PROJECT_TYPES.map((option) => {
                  const selected = projectType === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setProjectType(option.id)}
                      className={`w-full text-left px-6 py-5 rounded-2xl transition-colors flex items-center justify-between gap-4 ${
                        selected
                          ? 'bg-[#191B1A] text-[#F2EFE9]'
                          : 'bg-[#E5E1D8]/70 hover:bg-[#E5E1D8]'
                      }`}
                    >
                      <div>
                        <span className="font-display text-xl font-medium block">
                          {option.label}
                        </span>
                        <span
                          className={`text-sm ${
                            selected ? 'text-[#EAE8E1]/80' : 'text-[#5C5E57]'
                          }`}
                        >
                          {option.desc}
                        </span>
                      </div>
                      <span
                        className={`w-5 h-5 rounded-full border shrink-0 flex items-center justify-center ${
                          selected ? 'border-[#F2EFE9] bg-[#6E7458]' : 'border-[#191B1A]/30'
                        }`}
                      >
                        {selected && <Check className="w-3 h-3 text-[#FFFFFF]" aria-hidden="true" />}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  disabled={!projectType}
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#191B1A] text-[#F2EFE9] text-sm font-medium disabled:opacity-40 hover:bg-[#6E7458] transition-colors"
                >
                  <span>Avançar para área</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </section>
          )}

          {step === 2 && (
            <section className="space-y-8" aria-labelledby="step2-title">
              <h2 id="step2-title" className="font-display text-2xl sm:text-3xl font-medium">
                Qual a faixa de área aproximada?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {AREA_RANGES.map((option) => {
                  const selected = areaRange === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setAreaRange(option.id)}
                      className={`text-left p-6 rounded-2xl transition-colors space-y-1.5 ${
                        selected
                          ? 'bg-[#191B1A] text-[#F2EFE9]'
                          : 'bg-[#E5E1D8]/70 hover:bg-[#E5E1D8]'
                      }`}
                    >
                      <span className="font-display text-xl font-medium block">{option.label}</span>
                      <span
                        className={`text-xs block ${
                          selected ? 'text-[#EAE8E1]/80' : 'text-[#5C5E57]'
                        }`}
                      >
                        {option.note}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#E5E1D8] text-sm font-medium hover:bg-[#D8D3C8]"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  <span>Voltar</span>
                </button>
                <button
                  type="button"
                  disabled={!areaRange}
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#191B1A] text-[#F2EFE9] text-sm font-medium disabled:opacity-40 hover:bg-[#6E7458] transition-colors"
                >
                  <span>Avançar para estilo</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </section>
          )}

          {step === 3 && (
            <section className="space-y-8" aria-labelledby="step3-title">
              <h2 id="step3-title" className="font-display text-2xl sm:text-3xl font-medium">
                Qual estilo mais se aproxima da intenção?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {STYLE_OPTIONS.map((option) => {
                  const selected = styleChoice === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setStyleChoice(option.id)}
                      className={`text-left p-6 rounded-2xl transition-colors space-y-1.5 ${
                        selected
                          ? 'bg-[#191B1A] text-[#F2EFE9]'
                          : 'bg-[#E5E1D8]/70 hover:bg-[#E5E1D8]'
                      }`}
                    >
                      <span className="font-display text-xl font-medium block">{option.label}</span>
                      <span
                        className={`text-xs block leading-relaxed ${
                          selected ? 'text-[#EAE8E1]/80' : 'text-[#5C5E57]'
                        }`}
                      >
                        {option.note}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#E5E1D8] text-sm font-medium hover:bg-[#D8D3C8]"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  <span>Voltar</span>
                </button>
                <button
                  type="button"
                  disabled={!styleChoice}
                  onClick={() => setStep(4)}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#191B1A] text-[#F2EFE9] text-sm font-medium disabled:opacity-40 hover:bg-[#6E7458] transition-colors"
                >
                  <span>Revisar resumo</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </section>
          )}

          {step === 4 && (
            <section className="space-y-8" aria-labelledby="step4-title">
              <h2 id="step4-title" className="font-display text-2xl sm:text-3xl font-medium">
                Resumo da simulação
              </h2>

              <dl className="space-y-4">
                {[
                  { label: 'Tipo de projeto', value: selectedTypeObj?.label, targetStep: 1 as const },
                  { label: 'Área aproximada', value: selectedAreaObj?.label, targetStep: 2 as const },
                  { label: 'Estilo desejado', value: selectedStyleObj?.label, targetStep: 3 as const },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="px-6 py-4 rounded-2xl bg-[#E5E1D8]/60 flex items-center justify-between gap-4"
                  >
                    <div>
                      <dt className="text-xs text-[#5C5E57]">{row.label}</dt>
                      <dd className="font-display text-xl font-medium mt-0.5">{row.value}</dd>
                    </div>
                    {!confirmed && (
                      <button
                        type="button"
                        onClick={() => setStep(row.targetStep)}
                        className="text-xs font-medium underline underline-offset-4 hover:text-[#6E7458]"
                      >
                        Editar
                      </button>
                    )}
                  </div>
                ))}
              </dl>

              {!confirmed ? (
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#E5E1D8] text-sm font-medium"
                  >
                    <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                    <span>Voltar</span>
                  </button>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#E5E1D8] text-sm font-medium"
                    >
                      <RotateCcw className="w-4 h-4" aria-hidden="true" />
                      <span>Reiniciar</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmed(true)}
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#191B1A] text-[#F2EFE9] text-sm font-medium hover:bg-[#6E7458] transition-colors"
                    >
                      <Check className="w-4 h-4" aria-hidden="true" />
                      <span>Confirmar simulação</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-8 rounded-3xl bg-[#191B1A] text-[#F2EFE9] space-y-5">
                  <p className="text-xs text-[#96978F]">Simulação registrada localmente</p>
                  <p className="font-display text-3xl font-medium">
                    Briefing demonstrativo concluído.
                  </p>
                  <p className="text-sm text-[#96978F] leading-relaxed">
                    Nenhum dado pessoal foi coletado e nenhuma informação foi transmitida para
                    servidores externos.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F2EFE9] text-[#191B1A] text-sm font-medium hover:bg-[#6E7458] hover:text-[#FFFFFF] transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" aria-hidden="true" />
                      <span>Nova simulação</span>
                    </button>
                    <Link
                      to="/projetos"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#F2EFE9]/30 text-sm font-medium hover:border-[#F2EFE9]"
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
