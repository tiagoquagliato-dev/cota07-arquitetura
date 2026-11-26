import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';

const NAV_ITEMS = [
  { num: '01', label: 'Projetos', to: '/projetos' },
  { num: '02', label: 'Estúdio', to: '/estudio' },
  { num: '03', label: 'Método', to: '/metodo' },
  { num: '04', label: 'Contato', to: '/contato' },
];

export function Header() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [openPath, setOpenPath] = useState<string | null>(null);
  const mobileOpen = openPath === pathname;
  const setMobileOpen = (open: boolean) => setOpenPath(open ? pathname : null);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenPath(null);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileOpen]);

  const useLightTone = isHome && !scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
          useLightTone
            ? 'bg-gradient-to-b from-[#191B1A]/75 via-[#191B1A]/35 to-transparent text-[#FFFFFF]'
            : 'bg-[#EAE8E1]/95 text-[#191B1A] border-b border-[#191B1A]/15 backdrop-blur-none'
        }`}
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 h-18 sm:h-20 flex items-center justify-between gap-6">
          <Link
            to="/"
            aria-label="COTA.07 Arquitetura e Interiores, página inicial"
            className="shrink-0 focus-visible:outline-2 focus-visible:outline-[#787D60]"
          >
            <Logo tone={useLightTone ? 'light' : 'dark'} />
          </Link>

          <nav aria-label="Navegação principal" className="hidden md:flex items-center gap-8 lg:gap-10">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-xs font-mono-tech uppercase tracking-[0.16em] transition-colors ${
                    isActive
                      ? useLightTone
                        ? 'text-[#FFFFFF] underline underline-offset-8 decoration-[#787D60] decoration-2'
                        : 'text-[#191B1A] underline underline-offset-8 decoration-[#787D60] decoration-2'
                      : useLightTone
                        ? 'text-[#EAE8E1]/85 hover:text-[#FFFFFF]'
                        : 'text-[#191B1A]/75 hover:text-[#191B1A]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/contato"
              className={`hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-xs font-mono-tech uppercase tracking-[0.14em] border transition-colors ${
                useLightTone
                  ? 'border-[#EAE8E1]/60 text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#191B1A]'
                  : 'border-[#191B1A] bg-[#191B1A] text-[#EAE8E1] hover:bg-[#787D60] hover:border-[#787D60]'
              }`}
            >
              Iniciar projeto
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menu de navegação"
              aria-expanded={mobileOpen}
              aria-controls="mobile-editorial-menu"
              className={`md:hidden inline-flex items-center justify-center w-10 h-10 border transition-colors ${
                useLightTone
                  ? 'border-[#EAE8E1]/50 text-[#FFFFFF]'
                  : 'border-[#191B1A]/30 text-[#191B1A]'
              }`}
            >
              <Menu className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div
          id="mobile-editorial-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu editorial COTA.07"
          className="fixed inset-0 z-50 bg-[#191B1A] text-[#EAE8E1] flex flex-col justify-between p-6 sm:p-10"
        >
          <div className="flex items-center justify-between pb-6 border-b border-[#EAE8E1]/15">
            <Logo tone="light" />
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => {
                setMobileOpen(false);
                menuButtonRef.current?.focus();
              }}
              aria-label="Fechar menu de navegação"
              className="inline-flex items-center justify-center w-11 h-11 border border-[#EAE8E1]/30 text-[#EAE8E1] hover:border-[#EAE8E1]"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Menu mobile" className="my-auto py-8">
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.to} className="border-b border-[#EAE8E1]/12 pb-4 pt-2">
                  <Link
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-baseline justify-between group"
                  >
                    <span className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-[#EAE8E1] group-hover:text-[#787D60] transition-colors">
                      {item.label}
                    </span>
                    <span className="font-mono-tech text-xs text-[#96978F] tracking-[0.18em]">
                      {item.num}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-6 pt-6 border-t border-[#EAE8E1]/15">
            <Link
              to="/contato"
              onClick={() => setMobileOpen(false)}
              className="w-full inline-flex items-center justify-between px-5 py-4 bg-[#EAE8E1] text-[#191B1A] font-mono-tech text-xs uppercase tracking-[0.16em] hover:bg-[#787D60] hover:text-[#FFFFFF] transition-colors"
            >
              <span>Iniciar projeto</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <p className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-[#96978F]">
              COTA 07 · Arquitetura e Interiores · Projeto conceitual
            </p>
          </div>
        </div>
      )}
    </>
  );
}
