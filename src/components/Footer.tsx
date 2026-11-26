import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="bg-[#191B1A] text-[#F2EFE9] pt-24 pb-14 sm:pt-32 sm:pb-16">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 space-y-20">
        {/* Encerramento editorial de grande impacto */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8 space-y-6">
            <p className="text-sm text-[#96978F]">
              Exposição Digital · Living Architecture
            </p>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-[4.5rem] font-semibold tracking-[-0.04em] leading-[0.95] text-[#FFFFFF]">
              Toda grande arquitetura começa com uma ideia.
            </h2>
          </div>

          <div className="lg:col-span-4 flex lg:justify-end">
            <Link
              to="/contato"
              className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-[#F2EFE9] text-[#191B1A] text-sm font-medium hover:bg-[#6E7458] hover:text-[#FFFFFF] transition-colors"
            >
              <span>Iniciar um projeto</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Assinatura, navegação essencial e crédito */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pt-10">
          <div className="md:col-span-5 space-y-4">
            <Logo tone="light" />
            <p className="text-sm text-[#96978F] max-w-sm leading-relaxed">
              Espaços que traduzem formas de viver através de matéria, luz natural e escala humana.
            </p>
          </div>

          <nav aria-label="Navegação do rodapé" className="md:col-span-4 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <Link to="/projetos" className="hover:text-[#96978F] transition-colors">
              Projetos
            </Link>
            <Link to="/estudio" className="hover:text-[#96978F] transition-colors">
              Estúdio
            </Link>
            <Link to="/metodo" className="hover:text-[#96978F] transition-colors">
              Método
            </Link>
            <Link to="/contato" className="hover:text-[#96978F] transition-colors">
              Briefing
            </Link>
            <Link to="/privacidade" className="hover:text-[#96978F] transition-colors">
              Privacidade
            </Link>
          </nav>

          <div className="md:col-span-3 md:text-right space-y-2 text-sm">
            <a
              href="https://tiago-quagliato-portfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[#96978F] transition-colors"
            >
              <span>Portfólio Tiago Quagliato</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
            <p className="text-xs text-[#96978F]">
              Desenvolvimento autoral · CASE 07
            </p>
          </div>
        </div>

        <p className="text-xs text-[#96978F] max-w-3xl leading-relaxed">
          Projeto conceitual de portfólio. Escritório fictício. As imagens representam estudos
          arquitetônicos ilustrativos e não correspondem a obras executadas.
        </p>
      </div>
    </footer>
  );
}
