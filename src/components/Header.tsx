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
      setScrolled(window.scrollY > 90);
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
      <header className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 pt-5 sm:pt-7 flex items-center justify-between gap-4">
          <Link
            to="/"
            aria-label="COTA.07 Arquitetura e Interiores, página inicial"
            className={`pointer-events-auto px-4 py-2.5 rounded-full transition-colors duration-300 backdrop-blur-md ${
              useLightTone
                ? 'bg-[#191B1A]/75 text-[#FFFFFF] border border-[#F2EFE9]/15'
                : 'bg-[#F2EFE9]/95 text-[#191B1A] border border-[#191B1A]/10 shadow-[0_4px_20px_rgba(25,27,26,0.08)]'
            }`}
          >
            <Logo tone={useLightTone ? 'light' : 'dark'} />
          </Link>

          <nav
            aria-label="Navegação flutuante"
            className={`pointer-events-auto hidden md:flex items-center gap-1 px-2.5 py-2 rounded-full transition-colors duration-300 backdrop-blur-md ${
              useLightTone
                ? 'bg-[#191B1A]/75 text-[#F2EFE9] border border-[#F2EFE9]/15'
                : 'bg-[#F2EFE9]/95 text-[#191B1A] border border-[#191B1A]/10 shadow-[0_4px_20px_rgba(25,27,26,0.08)]'
            }`}
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? useLightTone
                        ? 'bg-[#FFFFFF] text-[#191B1A]'
                        : 'bg-[#191B1A] text-[#F2EFE9]'
                      : useLightTone
                        ? 'text-[#F2EFE9]/85 hover:text-[#FFFFFF]'
                        : 'text-[#191B1A]/75 hover:text-[#191B1A]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="pointer-events-auto flex items-center gap-2.5">
            <Link
              to="/contato"
              className={`hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                useLightTone
                  ? 'bg-[#F2EFE9] text-[#191B1A] hover:bg-[#6E7458] hover:text-[#FFFFFF]'
                  : 'bg-[#191B1A] text-[#F2EFE9] hover:bg-[#6E7458] hover:text-[#FFFFFF]'
              }`}
            >
              <span>Iniciar projeto</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </Link>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menu de navegação"
              aria-expanded={mobileOpen}
              aria-controls="mobile-editorial-menu"
              className={`md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full transition-colors ${
                useLightTone
                  ? 'bg-[#191B1A]/75 text-[#FFFFFF]'
                  : 'bg-[#191B1A] text-[#F2EFE9]'
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
          className="fixed inset-0 z-50 bg-[#191B1A] text-[#F2EFE9] flex flex-col justify-between p-6 sm:p-10"
        >
          <div className="flex items-center justify-between">
            <Logo tone="light" />
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => {
                setMobileOpen(false);
                menuButtonRef.current?.focus();
              }}
              aria-label="Fechar menu de navegação"
              className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-[#F2EFE9]/25 text-[#F2EFE9] hover:bg-[#F2EFE9] hover:text-[#191B1A] transition-colors"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Menu mobile" className="my-auto py-8">
            <ul className="space-y-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-baseline justify-between group py-2"
                  >
                    <span className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[#F2EFE9] group-hover:text-[#96978F] transition-colors">
                      {item.label}
                    </span>
                    <span className="font-mono-tech text-xs text-[#96978F]">
                      {item.num}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-5">
            <Link
              to="/contato"
              onClick={() => setMobileOpen(false)}
              className="w-full inline-flex items-center justify-between px-6 py-4 rounded-full bg-[#F2EFE9] text-[#191B1A] text-sm font-medium hover:bg-[#6E7458] hover:text-[#FFFFFF] transition-colors"
            >
              <span>Iniciar projeto</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <p className="text-xs text-[#96978F]">
              COTA 07 · Arquitetura e Interiores · Exposição conceitual
            </p>
          </div>
        </div>
      )}
    </>
  );
}
