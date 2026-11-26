import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Expand } from 'lucide-react';
import { ArchitecturalImage } from '../components/ArchitecturalImage';
import { FullscreenGallery } from '../components/FullscreenGallery';
import { PROJECTS } from '../data/projects';
import { runEditorialMotion } from '../utils/motion';

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    void runEditorialMotion(containerRef.current).then((fn) => {
      cleanup = fn;
    });
    return () => {
      cleanup?.();
    };
  }, [slug]);

  const projectIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const project = projectIndex >= 0 ? PROJECTS[projectIndex] : null;

  if (!project) {
    return (
      <div className="bg-[#F2EFE9] text-[#191B1A] pt-40 pb-28">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 space-y-6">
          <p className="text-sm font-medium text-[#6E7458]">Erro 404</p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold">
            Estudo arquitetônico não encontrado.
          </h1>
          <Link
            to="/projetos"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#191B1A] text-[#F2EFE9] text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Voltar à galeria</span>
          </Link>
        </div>
      </div>
    );
  }

  const prevProject = PROJECTS[(projectIndex - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length];

  return (
    <div ref={containerRef} className="bg-[#F2EFE9] text-[#191B1A] pt-28 sm:pt-36 pb-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 space-y-16">
        <div>
          <Link
            to="/projetos"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#5C5E57] hover:text-[#191B1A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Voltar para projetos</span>
          </Link>
        </div>

        {/* Narrativa principal */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-4">
            <p className="text-sm font-medium" style={{ color: project.accentColor }}>
              {project.number} · {project.categoryLabel}
            </p>
            <h1 className="font-display text-5xl sm:text-7xl font-semibold tracking-[-0.04em] leading-[0.94]">
              {project.title}
            </h1>
          </div>
          <div className="lg:col-span-4 lg:text-right space-y-1">
            <p className="text-xs text-[#5C5E57]">Área conceitual (parâmetro ilustrativo)</p>
            <p className="font-display text-3xl sm:text-4xl font-semibold">{project.area}</p>
          </div>
        </header>

        {/* Panorâmica principal */}
        <button
          type="button"
          onClick={() => setGalleryIndex(0)}
          aria-label={`Ampliar fotografia principal de ${project.title}`}
          className="w-full text-left group block relative"
        >
          <ArchitecturalImage
            image={project.heroImage}
            sizes="100vw"
            priority
            scrollScale
            className="aspect-[16/9]"
          />
          <span className="mt-3 inline-flex items-center gap-2 text-xs text-[#5C5E57] group-hover:text-[#191B1A] transition-colors">
            <Expand className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Expandir prancha · {project.heroImage.caption}</span>
          </span>
        </button>

        {/* Narrativa e materialidade */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4">
          <div className="lg:col-span-7 space-y-6">
            {project.architecturalDescription.map((paragraph, idx) => (
              <p key={idx} className="text-base sm:text-xl leading-relaxed text-[#2C2E2B]">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="lg:col-span-4 lg:col-start-9 space-y-8">
            <div className="space-y-3">
              <h2 className="text-sm font-medium text-[#6E7458]">Materiais predominantes</h2>
              <ul className="space-y-2 text-sm sm:text-base text-[#191B1A]">
                {project.materials.map((material) => (
                  <li key={material}>{material}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-sm font-medium text-[#6E7458]">Parâmetros</h2>
              <dl className="space-y-2.5 text-sm">
                {project.spatialParameters.map((param) => (
                  <div key={param.label} className="flex justify-between gap-4">
                    <dt className="text-[#5C5E57]">{param.label}</dt>
                    <dd className="text-right font-medium">{param.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Galeria horizontal opcional e acessível */}
        <section aria-label="Galeria horizontal de detalhes" className="space-y-6">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-display text-2xl sm:text-3xl font-medium">
              Sequência espacial
            </h2>
            <span className="text-xs text-[#5C5E57]">
              Deslize ou clique para tela cheia
            </span>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
            {project.gallery.map((img, idx) => (
              <button
                key={`${img.id}-${idx}`}
                type="button"
                onClick={() => setGalleryIndex(idx)}
                aria-label={`Ampliar imagem ${idx + 1} de ${project.title}`}
                className="snap-start shrink-0 w-[82vw] sm:w-[46vw] lg:w-[36vw] text-left group space-y-3"
              >
                <ArchitecturalImage
                  image={img}
                  sizes="(min-width: 1024px) 36vw, 82vw"
                  className="aspect-[4/3]"
                  imgClassName="transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <p className="text-xs text-[#5C5E57] group-hover:text-[#191B1A] transition-colors">
                  {img.caption}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* Navegação anterior e próximo */}
        <nav
          aria-label="Navegação entre projetos"
          className="pt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6"
        >
          <Link
            to={`/projetos/${prevProject.slug}`}
            className="group inline-flex items-center gap-4"
          >
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#191B1A]/25 group-hover:bg-[#191B1A] group-hover:text-[#F2EFE9] transition-colors">
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            </span>
            <div>
              <span className="text-xs text-[#5C5E57] block">Anterior</span>
              <span className="font-display text-xl sm:text-2xl font-medium">
                {prevProject.title}
              </span>
            </div>
          </Link>

          <Link
            to={`/projetos/${nextProject.slug}`}
            className="group inline-flex items-center gap-4 sm:flex-row-reverse sm:text-right"
          >
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#191B1A]/25 group-hover:bg-[#191B1A] group-hover:text-[#F2EFE9] transition-colors">
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </span>
            <div>
              <span className="text-xs text-[#5C5E57] block">Próximo</span>
              <span className="font-display text-xl sm:text-2xl font-medium">
                {nextProject.title}
              </span>
            </div>
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
