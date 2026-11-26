import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="bg-[#EAE8E1] text-[#191B1A] pt-28 sm:pt-36 pb-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl space-y-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-[0.16em] text-[#5C5E57] hover:text-[#191B1A]"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Voltar ao início</span>
          </Link>

          <header className="space-y-4 border-b border-[#191B1A]/15 pb-8">
            <p className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#787D60]">
              Aviso Legal e Privacidade · COTA.07
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-medium tracking-[-0.03em]">
              Política de privacidade
            </h1>
          </header>

          <div className="space-y-6 text-base text-[#2C2E2B] leading-relaxed">
            <section className="space-y-2">
              <h2 className="font-display text-xl font-medium text-[#191B1A]">
                1. Natureza conceitual do projeto
              </h2>
              <p>
                COTA 07 Arquitetura e Interiores é um projeto conceitual integrante do portfólio
                profissional de Tiago Quagliato (CASE 07). O escritório é fictício e as imagens
                apresentadas correspondem a estudos arquitetônicos ilustrativos, não representando
                obras executadas ou serviços comerciais ativos.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-xl font-medium text-[#191B1A]">
                2. Ausência de coleta de dados pessoais
              </h2>
              <p>
                Este website não coleta, armazena ou transmite dados pessoais identificáveis. O
                briefing demonstrativo disponível na página de contato opera exclusivamente no
                navegador do visitante, sem envio para servidores ou criação de cadastros.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-xl font-medium text-[#191B1A]">
                3. Indexação e cookies
              </h2>
              <p>
                A aplicação utiliza diretivas técnicas de não indexação (noindex, nofollow) e não
                emprega cookies de rastreamento publicitário ou perfilamento de usuários.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
