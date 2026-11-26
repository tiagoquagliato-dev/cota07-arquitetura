import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { ArchitecturalImage } from '../components/ArchitecturalImage';
import { PROJECTS, STUDIO_IMAGE } from '../data/projects';

const PRINCIPLES = [
  {
    title: 'Honestidade construtiva',
    text: 'Valorização da estrutura aparente e dos encontros reais entre concreto, madeira, pedra e vidro.',
  },
  {
    title: 'Luz como matéria',
    text: 'Desenho de aberturas, beirais e pátios para qualificar o espaço ao longo do percurso solar.',
  },
  {
    title: 'Escala humana',
    text: 'Proporções pensadas para o uso cotidiano, privilegiando permanência e silêncio visual.',
  },
];

export default function StudioPage() {
  return (
    <div className="bg-[#F2EFE9] text-[#191B1A] pt-32 sm:pt-40 pb-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 space-y-28">
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-9 space-y-5">
            <p className="text-sm font-medium text-[#6E7458]">
              Estúdio Conceitual · COTA.07
            </p>
            <h1 className="font-display text-5xl sm:text-7xl font-semibold tracking-[-0.04em] leading-[0.94]">
              Pensar. Desenhar. Transformar.
            </h1>
          </div>
          <p className="lg:col-span-3 text-sm text-[#5C5E57]">
            CASE 07 · Portfólio Tiago Quagliato
          </p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 relative">
            <ArchitecturalImage
              image={STUDIO_IMAGE}
              sizes="(min-width: 1024px) 56vw, 100vw"
              priority
              className="aspect-[4/3]"
            />
          </div>

          <div className="lg:col-span-5 space-y-6">
            <p className="text-lg sm:text-xl text-[#2C2E2B] leading-relaxed">
              COTA 07 é um estúdio conceitual dedicado ao estudo do brutalismo contemporâneo
              brasileiro, investigando a relação entre matéria bruta, clima e formas de habitar.
            </p>
            <p className="text-sm text-[#5C5E57] leading-relaxed">
              Este website representa um exercício autoral de portfólio. Não se trata de
              escritório comercial em operação, não havendo equipe fictícia ou obras atribuídas.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-10">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
              Princípios de investigação
            </h2>
            <div className="space-y-8">
              {PRINCIPLES.map((item) => (
                <div key={item.title} className="space-y-2">
                  <h3 className="font-display text-xl font-medium">{item.title}</h3>
                  <p className="text-sm sm:text-base text-[#3D3F3B] leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <Link
              to="/metodo"
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#191B1A] text-[#F2EFE9] text-sm font-medium hover:bg-[#6E7458] transition-colors"
            >
              <span>Explorar método</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ArchitecturalImage
              image={PROJECTS[3].gallery[2]}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="aspect-[4/5]"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
