import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Expand } from 'lucide-react';
import { ArchitecturalImage } from '../components/ArchitecturalImage';
import { FullscreenGallery } from '../components/FullscreenGallery';
import { PROJECTS } from '../data/projects';

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);

  const projectIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const project = projectIndex >= 0 ? PROJECTS[projectIndex] : null;

  if (!project) {
    return (
      <div className="bg-[#EAE8E1] text-[#191B1A] pt-36 pb-28">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 space-y-6">
          <p className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#787D60]">
            Erro 404
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-medium">
            Estudo arquitetônico não encontrado.
          </h1>
          <Link
            to="/projetos"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#191B1A] text-[#EAE8E1] font-mono-tech text-xs uppercase tracking-[0.16em]"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Voltar ao catálogo</span>
          </Link>
        </div>
      </div>
    );
  }

  const prevProject = PROJECTS[(projectIndex - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length];

  return (
    <div className="bg-[#EAE8E1] text-[#191B1A] pt-28 sm:pt-36 pb-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Navegação de retorno */}
        <div className="pb-8">
          <Link
            to="/projetos"
            className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-[0.16em] text-[#5C5E57] hover:text-[#191B1A] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Voltar para projetos</span>
          </Link>
        </div>

        {/* Cabeçalho da ficha técnica */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10 border-b border-[#191B1A]/15 items-end">
          <div className="lg:col-span-8 space-y-4">
            <p className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#787D60]">
              Estudo {project.number} · {project.categoryLabel}
            </p>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-medium tracking-[-0.03em]">
              {project.title}
            </h1>
          </div>

          <div className="lg:col-span-4 lg:text-right space-y-1">
            <p className="font-mono-tech text-xs uppercase tracking-[0.16em] text-[#5C5E57]">
              Área conceitual
            </p>
            <p className="font-display text-3xl font-medium">{project.area}</p>
            <p className="font-mono-tech text-[11px] text-[#5C5E57]">
              Parâmetro ilustrativo do conceito
            </p>
          </div>
        </header>

        {/* Fotografia panorâmica principal */}
        <div className="py-10">
          <button
            type="button"
            onClick={() => setGalleryIndex(0)}
            aria-label={`Ampliar fotografia principal de ${project.title}`}
            className="w-full text-left group relative block focus-visible:outline-2 focus-visible:outline-[#787D60]"
          >
            <ArchitecturalImage
              image={project.heroImage}
              sizes="100vw"
              priority
              className="aspect-[16/9] border border-[#191B1A]/15"
            />
            <span className="mt-3 inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-[0.14em] text-[#5C5E57] group-hover:text-[#191B1A] transition-colors">
              <Expand className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Abrir em tela cheia · {project.heroImage.caption}</span>
            </span>
          </button>
        </div>

        {/* Descrição arquitetônica e materiais */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-12 border-t border-[#191B1A]/15">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#787D60]">
              Descrição arquitetônica
            </h2>
            {project.architecturalDescription.map((paragraph, idx) => (
              <p key={idx} className="text-base sm:text-lg leading-relaxed text-[#2C2E2B]">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#787D60]">
                Materiais predominantes
              </h2>
              <ul className="divide-y divide-[#191B1A]/15 border-t border-b border-[#191B1A]/15">
                {project.materials.map((material) => (
                  <li key={material} className="py-3 text-sm sm:text-base text-[#191B1A]">
                    {material}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#787D60]">
                Parâmetros conceituais
              </h2>
              <dl className="divide-y divide-[#191B1A]/15 border-t border-b border-[#191B1A]/15">
                {project.spatialParameters.map((param) => (
                  <div key={param.label} className="py-3 flex items-baseline justify-between gap-4">
                    <dt className="font-mono-tech text-xs uppercase tracking-[0.14em] text-[#5C5E57]">
                      {param.label}
                    </dt>
                    <dd className="text-sm text-right text-[#191B1A]">{param.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Galeria complementar */}
        <section className="py-12 border-t border-[#191B1A]/15 space-y-8">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#787D60]">
              Galeria complementar
            </h2>
            <span className="font-mono-tech text-xs text-[#5C5E57]">
              Clique em qualquer prancha para ampliar
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.gallery.map((img, idx) => (
              <button
                key={`${img.id}-${idx}`}
                type="button"
                onClick={() => setGalleryIndex(idx)}
                aria-label={`Ampliar imagem ${idx + 1} de ${project.title}`}
                className="text-left group space-y-3"
              >
                <div className="border border-[#191B1A]/15 overflow-hidden">
                  <ArchitecturalImage
                    image={img}
                    sizes="(min-width: 768px) 31vw, 100vw"
                    className="aspect-[4/3]"
                    imgClassName="transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="font-mono-tech text-xs text-[#5C5E57] group-hover:text-[#191B1A] transition-colors">
                  {img.caption}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* Navegação anterior e próximo */}
        <nav
          aria-label="Navegação entre projetos"
          className="mt-8 pt-10 border-t border-[#191B1A]/15 grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <Link
            to={`/projetos/${prevProject.slug}`}
            className="group p-6 border border-[#191B1A]/15 hover:border-[#191B1A] transition-colors space-y-2"
          >
            <span className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-[0.16em] text-[#5C5E57]">
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              Projeto anterior
            </span>
            <p className="font-display text-2xl font-medium group-hover:text-[#787D60] transition-colors">
              {prevProject.number}. {prevProject.title}
            </p>
          </Link>

          <Link
            to={`/projetos/${nextProject.slug}`}
            className="group p-6 border border-[#191B1A]/15 hover:border-[#191B1A] transition-colors space-y-2 sm:text-right"
          >
            <span className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-[0.16em] text-[#5C5E57] sm:justify-end">
              Próximo projeto
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </span>
            <p className="font-display text-2xl font-medium group-hover:text-[#787D60] transition-colors">
              {nextProject.number}. {nextProject.title}
            </p>
          </Link>
        </nav>
      </div>

      {galleryIndex !== null && (
        <FullscreenGallery
          images={project.gallery}
          currentIndex={galleryIndex}
          projectTitle={project.title}
          onClose={() => setGalleryIndex(null)}
          onChangeIndex={(nextIdx) => setGalleryIndex(nextIdx)}
        />
      )}
    </div>
  );
}
