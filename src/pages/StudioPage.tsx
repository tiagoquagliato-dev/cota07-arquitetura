import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ArchitecturalImage } from '../components/ArchitecturalImage';
import { STUDIO_IMAGE } from '../data/projects';

const PRINCIPLES = [
  {
    num: '01',
    title: 'Honestidade construtiva',
    text: 'Valorização da estrutura aparente, das juntas e dos encontros reais entre concreto, madeira, pedra e vidro.',
  },
  {
    num: '02',
    title: 'Luz como matéria',
    text: 'Desenho de aberturas, beirais e pátios para qualificar o espaço ao longo do percurso solar sem excessos cenográficos.',
  },
  {
    num: '03',
    title: 'Escala humana',
    text: 'Proporções pensadas para o uso cotidiano, privilegiando permanência, ventilação natural e silêncio visual.',
  },
];

export default function StudioPage() {
  return (
    <div className="bg-[#EAE8E1] text-[#191B1A] pt-28 sm:pt-36 pb-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 space-y-20">
        {/* Composição editorial própria */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-10 border-b border-[#191B1A]/15 pb-14">
          <div className="lg:col-span-4 space-y-3">
            <p className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#787D60]">
              Estúdio Conceitual · COTA.07
            </p>
            <p className="font-mono-tech text-xs text-[#5C5E57]">
              CASE 07 · Portfólio Tiago Quagliato
            </p>
          </div>
          <div className="lg:col-span-8 space-y-6">
            <h1 className="font-display text-4xl sm:text-6xl font-medium tracking-[-0.03em] leading-[1.03]">
              Pensar. Desenhar. Transformar.
            </h1>
            <p className="text-base sm:text-xl text-[#2C2E2B] leading-relaxed max-w-2xl">
              COTA 07 é um estúdio conceitual dedicado ao estudo do brutalismo contemporâneo
              brasileiro, investigando a relação entre matéria bruta, clima e formas de habitar.
            </p>
          </div>
        </header>

        {/* Fotografia e posicionamento */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <ArchitecturalImage
              image={STUDIO_IMAGE}
              sizes="(min-width: 1024px) 56vw, 100vw"
              priority
              className="aspect-[4/3] border border-[#191B1A]/15"
            />
          </div>

          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-display text-2xl sm:text-3xl font-medium">
              Investigação material e espacial
            </h2>
            <p className="text-base text-[#2C2E2B] leading-relaxed">
              Cada estudo nasce da análise física de superfícies, maquetes de volume e diagramas de
              insolação. O processo evita ornamentos supérfluos para concentrar força expressiva na
              própria estrutura.
            </p>
            <div className="p-5 border border-[#191B1A]/20 bg-[#E2DFD6] space-y-2">
              <p className="font-mono-tech text-xs uppercase tracking-[0.16em] text-[#787D60]">
                Nota de transparência
              </p>
              <p className="text-sm text-[#2C2E2B] leading-relaxed">
                Este site representa um exercício autoral e conceitual de portfólio. Não se trata
                de escritório comercial em operação, não havendo equipe fictícia, premiações
                inventadas ou obras construídas atribuídas.
              </p>
            </div>
          </div>
        </section>

        {/* Princípios */}
        <section className="border-t border-[#191B1A]/15 pt-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <h2 className="font-display text-3xl font-medium">Princípios de projeto</h2>
          </div>
          <div className="lg:col-span-8 divide-y divide-[#191B1A]/15 border-t border-b border-[#191B1A]/15">
            {PRINCIPLES.map((item) => (
              <div key={item.num} className="py-8 grid grid-cols-1 sm:grid-cols-12 gap-4">
                <span className="sm:col-span-2 font-mono-tech text-xs text-[#787D60] tracking-[0.18em]">
                  {item.num}.
                </span>
                <h3 className="sm:col-span-4 font-display text-xl font-medium">{item.title}</h3>
                <p className="sm:col-span-6 text-sm sm:text-base text-[#3D3F3B] leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Chamada */}
        <div className="pt-4 flex flex-wrap gap-4">
          <Link
            to="/metodo"
            className="inline-flex items-center gap-3 px-6 py-4 bg-[#191B1A] text-[#EAE8E1] font-mono-tech text-xs uppercase tracking-[0.16em] hover:bg-[#787D60] transition-colors"
          >
            <span>Explorar método</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <Link
            to="/projetos"
            className="inline-flex items-center gap-3 px-6 py-4 border border-[#191B1A] font-mono-tech text-xs uppercase tracking-[0.16em] hover:bg-[#191B1A] hover:text-[#EAE8E1] transition-colors"
          >
            <span>Ver projetos</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
