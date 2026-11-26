import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="bg-[#EAE8E1] text-[#191B1A] pt-36 pb-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 space-y-6">
        <p className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#787D60]">
          COTA 404 · Página não encontrada
        </p>
        <h1 className="font-display text-4xl sm:text-6xl font-medium tracking-[-0.03em]">
          Rota fora do plano.
        </h1>
        <p className="text-base text-[#3D3F3B] max-w-md leading-relaxed">
          O endereço solicitado não existe no acervo conceitual da COTA 07.
        </p>
        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#191B1A] text-[#EAE8E1] font-mono-tech text-xs uppercase tracking-[0.16em] hover:bg-[#787D60] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Retornar à página inicial</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
