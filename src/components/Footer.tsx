import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="bg-[#191B1A] text-[#EAE8E1] border-t border-[#EAE8E1]/15">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 py-14 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#EAE8E1]/15">
          <div className="md:col-span-5 space-y-5">
            <Logo tone="light" />
            <p className="text-sm text-[#96978F] max-w-sm leading-relaxed">
              Arquitetura e Interiores. Espaços que traduzem formas de viver através de matéria,
              luz e precisão construtiva.
            </p>
            <p className="font-mono-tech text-xs uppercase tracking-[0.14em] text-[#787D60]">
              CASE 07 · Brutalismo Contemporâneo Brasileiro
            </p>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h2 className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#96978F]">
              Navegação
            </h2>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-[#787D60] transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/projetos" className="hover:text-[#787D60] transition-colors">
                  Projetos
                </Link>
              </li>
              <li>
                <Link to="/estudio" className="hover:text-[#787D60] transition-colors">
                  Estúdio
                </Link>
              </li>
              <li>
                <Link to="/metodo" className="hover:text-[#787D60] transition-colors">
                  Método
                </Link>
              </li>
              <li>
                <Link to="/contato" className="hover:text-[#787D60] transition-colors">
                  Iniciar projeto
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h2 className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#96978F]">
              Categorias
            </h2>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/projetos?categoria=residencial"
                  className="hover:text-[#787D60] transition-colors"
                >
                  Residencial
                </Link>
              </li>
              <li>
                <Link
                  to="/projetos?categoria=interiores"
                  className="hover:text-[#787D60] transition-colors"
                >
                  Interiores
                </Link>
              </li>
              <li>
                <Link
                  to="/projetos?categoria=comercial"
                  className="hover:text-[#787D60] transition-colors"
                >
                  Comercial
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h2 className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#96978F]">
              Autoria e Legal
            </h2>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://tiago-quagliato-portfolio.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[#787D60] transition-colors"
                >
                  <span>Portfólio Tiago Quagliato</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <Link to="/privacidade" className="hover:text-[#787D60] transition-colors">
                  Política de privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <p className="text-xs text-[#96978F] max-w-2xl leading-relaxed">
            Projeto conceitual de portfólio. Escritório fictício. As imagens representam estudos
            arquitetônicos ilustrativos e não correspondem a obras executadas.
          </p>
          <p className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-[#96978F] shrink-0">
            Desenvolvido por Tiago Quagliato · COTA.07
          </p>
        </div>
      </div>
    </footer>
  );
}
