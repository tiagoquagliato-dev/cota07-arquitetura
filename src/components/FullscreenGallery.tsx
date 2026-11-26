import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { getImageSrc, getImageSrcSet, type ProjectImage } from '../data/projects';

interface FullscreenGalleryProps {
  images: ProjectImage[];
  currentIndex: number;
  projectTitle: string;
  onClose: () => void;
  onChangeIndex: (nextIndex: number) => void;
}

export function FullscreenGallery({
  images,
  currentIndex,
  projectTitle,
  onClose,
  onChangeIndex,
}: FullscreenGalleryProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const total = images.length;
  const activeImage = images[currentIndex];

  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
      previousFocusRef.current?.focus?.();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        onChangeIndex((currentIndex + 1) % total);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onChangeIndex((currentIndex - 1 + total) % total);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, total, onClose, onChangeIndex]);

  if (!activeImage) return null;

  const formattedIndex = String(currentIndex + 1).padStart(2, '0');
  const formattedTotal = String(total).padStart(2, '0');

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Galeria ampliada de ${projectTitle}`}
      className="fixed inset-0 z-50 bg-[#191B1A] text-[#EAE8E1] flex flex-col justify-between p-4 sm:p-8"
    >
      <div className="flex items-center justify-between gap-4 border-b border-[#EAE8E1]/15 pb-4">
        <div className="flex items-center gap-4">
          <span className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#787D60]">
            {formattedIndex} / {formattedTotal}
          </span>
          <span className="font-display text-sm sm:text-base font-medium tracking-wide">
            {projectTitle}
          </span>
        </div>

        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Fechar galeria"
          className="inline-flex items-center gap-2 px-3 py-2 border border-[#EAE8E1]/30 text-xs font-mono-tech uppercase tracking-[0.14em] hover:border-[#EAE8E1] hover:bg-[#EAE8E1] hover:text-[#191B1A] transition-colors"
        >
          <span>Fechar</span>
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>

      <div className="relative flex-1 flex items-center justify-center py-4 sm:py-6 min-h-0">
        <button
          type="button"
          onClick={() => onChangeIndex((currentIndex - 1 + total) % total)}
          aria-label="Fotografia anterior"
          className="hidden sm:inline-flex items-center justify-center w-12 h-12 border border-[#EAE8E1]/25 bg-[#191B1A]/80 text-[#EAE8E1] hover:border-[#EAE8E1] hover:bg-[#EAE8E1] hover:text-[#191B1A] transition-colors mr-4 shrink-0"
        >
          <ChevronLeft className="w-5 h-5" aria-hidden="true" />
        </button>

        <figure className="max-h-full max-w-5xl w-full h-full flex flex-col items-center justify-center gap-3 min-h-0">
          <img
            src={getImageSrc(activeImage.id, 1920, activeImage.width)}
            srcSet={getImageSrcSet(activeImage.id, activeImage.width)}
            sizes="100vw"
            width={activeImage.width}
            height={activeImage.height}
            alt={activeImage.alt}
            decoding="async"
            className="max-h-[72vh] w-auto max-w-full object-contain border border-[#EAE8E1]/15"
          />
          <figcaption className="font-mono-tech text-xs text-[#96978F] text-center">
            {activeImage.caption}
          </figcaption>
        </figure>

        <button
          type="button"
          onClick={() => onChangeIndex((currentIndex + 1) % total)}
          aria-label="Próxima fotografia"
          className="hidden sm:inline-flex items-center justify-center w-12 h-12 border border-[#EAE8E1]/25 bg-[#191B1A]/80 text-[#EAE8E1] hover:border-[#EAE8E1] hover:bg-[#EAE8E1] hover:text-[#191B1A] transition-colors ml-4 shrink-0"
        >
          <ChevronRight className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>

      <div className="flex sm:hidden items-center justify-between gap-4 pt-3 border-t border-[#EAE8E1]/15">
        <button
          type="button"
          onClick={() => onChangeIndex((currentIndex - 1 + total) % total)}
          aria-label="Fotografia anterior"
          className="flex-1 inline-flex items-center justify-center gap-2 py-3 border border-[#EAE8E1]/30 font-mono-tech text-xs uppercase tracking-[0.14em]"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          Anterior
        </button>
        <button
          type="button"
          onClick={() => onChangeIndex((currentIndex + 1) % total)}
          aria-label="Próxima fotografia"
          className="flex-1 inline-flex items-center justify-center gap-2 py-3 border border-[#EAE8E1]/30 font-mono-tech text-xs uppercase tracking-[0.14em]"
        >
          Próxima
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
