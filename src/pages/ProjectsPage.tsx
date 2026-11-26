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
    <div className="bg-[#EAE8E1] text-[#191B1A] pt-28 sm:pt-36 pb-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Cabeçalho interno próprio */}
        <header className="border-b border-[#191B1A]/15 pb-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#787D60]">
              Acervo Conceitual · COTA.07
            </p>
            <p className="font-mono-tech text-xs uppercase tracking-[0.16em] text-[#5C5E57]">
              {String(filteredProjects.length).padStart(2, '0')} estudos catalogados
            </p>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-medium tracking-[-0.03em]">
            Projetos
          </h1>
          <p className="text-base sm:text-lg text-[#2C2E2B] max-w-2xl leading-relaxed">
            Estudos arquitetônicos conceituais organizados por tipologia espacial, materialidade e
            implantação. As áreas informadas representam parâmetros ilustrativos.
          </p>
        </header>

        {/* Barra de filtros e alternância grade/lista */}
        <div className="py-6 border-b border-[#191B1A]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div role="group" aria-label="Filtrar projetos por categoria" className="flex flex-wrap gap-2">
            {FILTERS.map((filter) => {
              const isActive = activeCategory === filter.value;
              return (
                <button
                  key={filter.value}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => handleFilterChange(filter.value)}
                  className={`px-4 py-2 font-mono-tech text-xs uppercase tracking-[0.14em] border transition-colors ${
                    isActive
                      ? 'bg-[#191B1A] text-[#EAE8E1] border-[#191B1A]'
                      : 'bg-transparent text-[#191B1A] border-[#191B1A]/25 hover:border-[#191B1A]'
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
              className={`inline-flex items-center gap-2 px-3.5 py-2 font-mono-tech text-xs uppercase tracking-[0.14em] border transition-colors ${
                viewMode === 'grade'
                  ? 'bg-[#191B1A] text-[#EAE8E1] border-[#191B1A]'
                  : 'border-[#191B1A]/25 text-[#191B1A] hover:border-[#191B1A]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Grade</span>
            </button>
            <button
              type="button"
              aria-pressed={viewMode === 'lista'}
              onClick={() => handleViewChange('lista')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 font-mono-tech text-xs uppercase tracking-[0.14em] border transition-colors ${
                viewMode === 'lista'
                  ? 'bg-[#191B1A] text-[#EAE8E1] border-[#191B1A]'
                  : 'border-[#191B1A]/25 text-[#191B1A] hover:border-[#191B1A]'
              }`}
            >
              <List className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Lista</span>
            </button>
          </div>
        </div>

        {/* Conteúdo */}
        {viewMode === 'grade' ? (
          <div className="pt-12 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14">
            {filteredProjects.map((project) => (
              <article key={project.id} className="group">
                <Link to={`/projetos/${project.slug}`} className="block space-y-4">
                  <div className="border border-[#191B1A]/10 overflow-hidden">
                    <ArchitecturalImage
                      image={project.heroImage}
                      sizes="(min-width: 768px) 46vw, 100vw"
                      className="aspect-[16/10]"
                      imgClassName="transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex items-baseline justify-between gap-4 border-t border-[#191B1A]/15 pt-4">
                    <div className="space-y-1">
                      <p className="font-mono-tech text-xs uppercase tracking-[0.16em] text-[#5C5E57]">
                        <span className="text-[#787D60]">{project.number}</span> ·{' '}
                        {project.categoryLabel} · {project.area}
                      </p>
                      <h2 className="font-display text-2xl sm:text-3xl font-medium group-hover:text-[#787D60] transition-colors">
                        {project.title}
                      </h2>
                      <p className="text-sm text-[#3D3F3B] max-w-lg leading-relaxed">
                        {project.shortDescription}
                      </p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 shrink-0" aria-hidden="true" />
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-[#191B1A]/15 border-b border-[#191B1A]/15">
            {filteredProjects.map((project) => (
              <article key={project.id} className="py-6 sm:py-8">
                <Link
                  to={`/projetos/${project.slug}`}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center group"
                >
                  <div className="md:col-span-1 font-mono-tech text-xs text-[#787D60] tracking-[0.18em]">
                    {project.number}
                  </div>
                  <div className="md:col-span-3">
                    <h2 className="font-display text-2xl font-medium group-hover:text-[#787D60] transition-colors">
                      {project.title}
                    </h2>
                  </div>
                  <div className="md:col-span-2 font-mono-tech text-xs uppercase tracking-[0.14em] text-[#5C5E57]">
                    {project.categoryLabel}
                  </div>
                  <div className="md:col-span-2 font-mono-tech text-xs text-[#5C5E57]">
                    {project.area}
                  </div>
                  <div className="md:col-span-3 text-sm text-[#3D3F3B] line-clamp-2">
                    {project.shortDescription}
                  </div>
                  <div className="md:col-span-1 flex md:justify-end">
                    <ArrowUpRight className="w-5 h-5 group-hover:text-[#787D60] transition-colors" aria-hidden="true" />
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
