import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowUpRight, LayoutGrid, List } from 'lucide-react';
import { ArchitecturalImage } from '../components/ArchitecturalImage';
import { PROJECTS, type ProjectCategory } from '../data/projects';

type FilterValue = 'todos' | ProjectCategory;
type ViewMode = 'grade' | 'lista';

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'residencial', label: 'Residencial' },
  { value: 'interiores', label: 'Interiores' },
  { value: 'comercial', label: 'Comercial' },
];

export default function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawCategory = searchParams.get('categoria') as FilterValue | null;
  const activeCategory: FilterValue =
    rawCategory && ['todos', 'residencial', 'interiores', 'comercial'].includes(rawCategory)
      ? rawCategory
      : 'todos';

  const rawView = searchParams.get('vista') as ViewMode | null;
  const viewMode: ViewMode = rawView === 'lista' ? 'lista' : 'grade';

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'todos') return PROJECTS;
    return PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const handleFilterChange = (category: FilterValue) => {
    const next = new URLSearchParams(searchParams);
    if (category === 'todos') {
      next.delete('categoria');
    } else {
      next.set('categoria', category);
    }
    setSearchParams(next);
  };

  const handleViewChange = (mode: ViewMode) => {
    const next = new URLSearchParams(searchParams);
    if (mode === 'grade') {
      next.delete('vista');
    } else {
      next.set('vista', 'lista');
    }
    setSearchParams(next);
  };

  return (
    <div className="bg-[#F2EFE9] text-[#191B1A] pt-32 sm:pt-40 pb-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 space-y-16">
        {/* Cabeçalho editorial */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-4">
            <p className="text-sm font-medium text-[#6E7458]">
              Galeria Editorial · Acervo Conceitual
            </p>
            <h1 className="font-display text-5xl sm:text-7xl font-semibold tracking-[-0.04em] leading-[0.94]">
              Projetos
            </h1>
          </div>
          <p className="lg:col-span-4 text-sm sm:text-base text-[#3D3F3B] leading-relaxed">
            Estudos arquitetônicos apresentados em escalas variadas. Áreas informadas são
            parâmetros ilustrativos.
          </p>
        </header>

        {/* Controles secundários discretos */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div role="group" aria-label="Filtrar projetos por categoria" className="flex flex-wrap gap-2">
            {FILTERS.map((filter) => {
              const isActive = activeCategory === filter.value;
              return (
                <button
                  key={filter.value}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => handleFilterChange(filter.value)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-[#191B1A] text-[#F2EFE9]'
                      : 'bg-[#E5E1D8] text-[#191B1A] hover:bg-[#D8D3C8]'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          <div role="group" aria-label="Modo de visualização" className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              aria-pressed={viewMode === 'grade'}
              onClick={() => handleViewChange('grade')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                viewMode === 'grade'
                  ? 'bg-[#191B1A] text-[#F2EFE9]'
                  : 'bg-[#E5E1D8] text-[#191B1A] hover:bg-[#D8D3C8]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Galeria</span>
            </button>
            <button
              type="button"
              aria-pressed={viewMode === 'lista'}
              onClick={() => handleViewChange('lista')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                viewMode === 'lista'
                  ? 'bg-[#191B1A] text-[#F2EFE9]'
                  : 'bg-[#E5E1D8] text-[#191B1A] hover:bg-[#D8D3C8]'
              }`}
            >
              <List className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Lista</span>
            </button>
          </div>
        </div>

        {/* Visualização principal em galeria editorial de escalas variadas */}
        {viewMode === 'grade' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-20 lg:gap-x-10">
            {filteredProjects.map((project, index) => {
              const spanClass =
                index === 0
                  ? 'lg:col-span-8'
                  : index === 1
                    ? 'lg:col-span-4 lg:mt-16'
                    : index === 2
                      ? 'lg:col-span-5'
                      : 'lg:col-span-7 lg:-mt-10';
              const aspectClass =
                index === 0
                  ? 'aspect-[16/9]'
                  : index === 1
                    ? 'aspect-[4/5]'
                    : index === 2
                      ? 'aspect-[4/3]'
                      : 'aspect-[16/9]';

              return (
                <article key={project.id} className={`${spanClass} group`}>
                  <Link to={`/projetos/${project.slug}`} className="block relative overflow-hidden">
                    <ArchitecturalImage
                      image={project.heroImage}
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      className={aspectClass}
                      imgClassName="transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#191B1A]/85 via-transparent to-transparent"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex items-end justify-between gap-4 text-[#FFFFFF]">
                      <div className="space-y-1">
                        <p className="text-xs text-[#EAE8E1]/85">
                          {project.number} · {project.categoryLabel} · {project.area}
                        </p>
                        <h2 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight">
                          {project.title}
                        </h2>
                      </div>
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#F2EFE9] text-[#191B1A] shrink-0 group-hover:scale-105 transition-transform">
                        <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredProjects.map((project) => (
              <article key={project.id}>
                <Link
                  to={`/projetos/${project.slug}`}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 py-6 px-4 rounded-2xl hover:bg-[#E5E1D8]/70 transition-colors items-center group"
                >
                  <div className="md:col-span-1 font-mono-tech text-xs text-[#6E7458]">
                    {project.number}
                  </div>
                  <div className="md:col-span-4">
                    <h2 className="font-display text-2xl font-medium group-hover:text-[#6E7458] transition-colors">
                      {project.title}
                    </h2>
                  </div>
                  <div className="md:col-span-2 text-sm text-[#5C5E57]">
                    {project.categoryLabel}
                  </div>
                  <div className="md:col-span-2 font-mono-tech text-xs text-[#5C5E57]">
                    {project.area}
                  </div>
                  <div className="md:col-span-2 text-sm text-[#3D3F3B] line-clamp-1">
                    {project.shortDescription}
                  </div>
                  <div className="md:col-span-1 flex md:justify-end">
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
