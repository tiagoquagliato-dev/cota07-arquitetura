export type ProjectCategory = 'residencial' | 'interiores' | 'comercial';

export interface ProjectImage {
  id: string;
  alt: string;
  caption: string;
  aspect: '16/9' | '4/3' | '4/5';
  width: number;
  height: number;
  focalPoint?: string;
}

export interface ProjectItem {
  id: string;
  number: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  area: string;
  accentColor: string;
  shortDescription: string;
  architecturalDescription: string[];
  materials: string[];
  spatialParameters: {
    label: string;
    value: string;
  }[];
  heroImage: ProjectImage;
  gallery: ProjectImage[];
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'casa-horizonte',
    number: '01',
    slug: 'casa-horizonte',
    title: 'Casa Horizonte',
    category: 'residencial',
    categoryLabel: 'Residencial',
    area: '420 m²',
    accentColor: '#6E7458',
    shortDescription:
      'Residência horizontal em concreto aparente e madeira natural aberta para a paisagem tropical e lâmina de água.',
    architecturalDescription: [
      'Casa Horizonte organiza o programa residencial em um único plano horizontal elevado sobre o terreno. Grandes balanços em concreto aparente protegem os panos de vidro da insolação direta e estabelecem continuidade visual entre a área social e o jardim.',
      'A cobertura em madeira natural aquece a rigidez estrutural do concreto e conduz o olhar até a piscina integrada. A ventilação cruzada e a iluminação natural abundante reduzem a necessidade de condicionamento artificial e reforçam a relação direta com o entorno.',
    ],
    materials: [
      'Concreto aparente moldado in loco',
      'Madeira cumaru natural',
      'Vidro laminado de baixa reflexão',
      'Pedra basalto escovada',
    ],
    spatialParameters: [
      { label: 'Categoria', value: 'Residencial' },
      { label: 'Área conceitual', value: '420 m² (parâmetro ilustrativo)' },
      { label: 'Sistema construtivo', value: 'Estrutura mista em concreto e aço' },
      { label: 'Tipologia', value: 'Residência térrea em plano horizontal' },
    ],
    heroImage: {
      id: 'horizonte-exterior',
      alt: 'Fachada panorâmica da Casa Horizonte com balanços em concreto aparente, madeira natural, vidro e piscina integrada',
      caption: 'Elevação principal e projeção da cobertura sobre o espelho de água.',
      aspect: '16/9',
      width: 1920,
      height: 1080,
      focalPoint: '60% 45%',
    },
    gallery: [
      {
        id: 'horizonte-exterior',
        alt: 'Fachada panorâmica da Casa Horizonte com balanços em concreto aparente, madeira natural, vidro e piscina integrada',
        caption: '01 / Vista exterior principal em concreto aparente e madeira.',
        aspect: '16/9',
        width: 1920,
        height: 1080,
      },
      {
        id: 'horizonte-interior',
        alt: 'Sala de estar integrada da Casa Horizonte com vigas de concreto aparente e abertura total para o jardim',
        caption: '02 / Estar integrado com abertura contínua para a varanda.',
        aspect: '16/9',
        width: 1920,
        height: 1080,
      },
      {
        id: 'horizonte-piscina',
        alt: 'Área da piscina da Casa Horizonte revestida em pedra escura sob o beiral de concreto e vegetação tropical',
        caption: '03 / Deck em basalto e relação entre sombra, água e vegetação.',
        aspect: '4/3',
        width: 1600,
        height: 1200,
      },
    ],
  },
  {
    id: 'casa-patio',
    number: '02',
    slug: 'casa-patio',
    title: 'Casa Pátio',
    category: 'residencial',
    categoryLabel: 'Residencial',
    area: '310 m²',
    accentColor: '#8C6D53',
    shortDescription:
      'Residência introspectiva organizada ao redor de um jardim central com árvore escultural, pedra natural e luz filtrada.',
    architecturalDescription: [
      'Casa Pátio parte de uma implantação voltada para o interior do lote. Os ambientes de permanência circundam um vazio central ajardinado que funciona como núcleo térmico, luminoso e contemplativo da residência.',
      'Muros monolíticos em concreto e embasamento em pedra natural asseguram privacidade urbana, enquanto brises de madeira e galerias envidraçadas modulam a entrada de sol ao longo do dia.',
    ],
    materials: [
      'Concreto arquitetônico pigmentado',
      'Pedra natural rústica',
      'Brises em madeira freijó',
      'Piso monolítico cimentício',
    ],
    spatialParameters: [
      { label: 'Categoria', value: 'Residencial' },
      { label: 'Área conceitual', value: '310 m² (parâmetro ilustrativo)' },
      { label: 'Partido arquitetônico', value: 'Planta em claustro contemporâneo' },
      { label: 'Iluminação', value: 'Luz zenital e pátio interno' },
    ],
    heroImage: {
      id: 'patio-exterior',
      alt: 'Volume em concreto e pedra natural da Casa Pátio com brises de madeira e sombras geométricas',
      caption: 'Composição de volumes fechados para a rua e aberturas controladas.',
      aspect: '4/3',
      width: 1600,
      height: 1200,
      focalPoint: '50% 40%',
    },
    gallery: [
      {
        id: 'patio-exterior',
        alt: 'Volume em concreto e pedra natural da Casa Pátio com brises de madeira e sombras geométricas',
        caption: '01 / Volumetria exterior em concreto e pedra natural.',
        aspect: '4/3',
        width: 1600,
        height: 1200,
      },
      {
        id: 'patio-jardim',
        alt: 'Jardim central da Casa Pátio com árvore escultural emoldurada por pórticos de concreto e luz natural',
        caption: '02 / Pátio central com árvore nativa e jogo de sombras.',
        aspect: '4/5',
        width: 1200,
        height: 1500,
      },
      {
        id: 'patio-interior',
        alt: 'Galeria interna e sala de jantar da Casa Pátio voltadas para o jardim central através de vidro piso teto',
        caption: '03 / Circulação interna voltada para o núcleo ajardinado.',
        aspect: '16/9',
        width: 1920,
        height: 1080,
      },
    ],
  },
  {
    id: 'apartamento-materia',
    number: '03',
    slug: 'apartamento-materia',
    title: 'Apartamento Matéria',
    category: 'interiores',
    categoryLabel: 'Interiores',
    area: '180 m²',
    accentColor: '#737670',
    shortDescription:
      'Interiores de alto padrão que equilibram estrutura bruta, marcenaria em madeira natural, tecidos crus e luz difusa.',
    architecturalDescription: [
      'Apartamento Matéria propõe a remoção de compartimentações excessivas para revelar a estrutura original em concreto e ampliar a percepção espacial. A marcenaria funciona como elemento arquitetônico contínuo que organiza fluxos e armazena sem rupturas visuais.',
      'A paleta tátil combina pedra sabão fosca, madeira freijó, linho natural e metais escovados. A iluminação difusa valoriza as texturas reais de cada superfície sem recorrer a cenografias artificiais.',
    ],
    materials: [
      'Laje e pilares em concreto exposto',
      'Marcenaria em madeira freijó',
      'Pedra sabão e travertino bruto',
      'Linho e algodão natural',
    ],
    spatialParameters: [
      { label: 'Categoria', value: 'Interiores' },
      { label: 'Área conceitual', value: '180 m² (parâmetro ilustrativo)' },
      { label: 'Intervenção', value: 'Reforma integral e marcenaria sob medida' },
      { label: 'Atmosfera', value: 'Luz difusa e materialidade tátil' },
    ],
    heroImage: {
      id: 'materia-estar',
      alt: 'Sala de estar do Apartamento Matéria com parede em concreto aparente, marcenaria em madeira e mobiliário contemporâneo',
      caption: 'Estar principal com iluminação natural filtrada e mobiliário de linhas puras.',
      aspect: '16/9',
      width: 1920,
      height: 1080,
      focalPoint: '55% 45%',
    },
    gallery: [
      {
        id: 'materia-estar',
        alt: 'Sala de estar do Apartamento Matéria com parede em concreto aparente, marcenaria em madeira e mobiliário contemporâneo',
        caption: '01 / Estar social com integração entre concreto e madeira.',
        aspect: '16/9',
        width: 1920,
        height: 1080,
      },
      {
        id: 'materia-cozinha',
        alt: 'Cozinha arquitetônica do Apartamento Matéria com ilha monolítica em pedra escura e marcenaria minimalista',
        caption: '02 / Ilha monolítica e planos contínuos de marcenaria.',
        aspect: '4/3',
        width: 1600,
        height: 1200,
      },
      {
        id: 'materia-detalhe',
        alt: 'Detalhe construtivo do encontro entre concreto aparente, madeira, pedra travertino e tecido natural',
        caption: '03 / Encontro de materiais e leitura tátil das superfícies.',
        aspect: '4/5',
        width: 1200,
        height: 1500,
      },
    ],
  },
  {
    id: 'pavilhao-sete',
    number: '04',
    slug: 'pavilhao-sete',
    title: 'Pavilhão Sete',
    category: 'comercial',
    categoryLabel: 'Comercial',
    area: '560 m²',
    accentColor: '#4C5D5E',
    shortDescription:
      'Edifício comercial contemporâneo com pórtico estrutural aparente, transparência térrea e áreas de convivência.',
    architecturalDescription: [
      'Pavilhão Sete traduz o rigor estrutural para o uso corporativo e cultural. O ritmo dos pilares e vigas em concreto aparente define uma planta livre capaz de absorver diferentes configurações de trabalho e exposição.',
      'No pavimento térreo, grandes planos envidraçados diluem a fronteira entre o espaço interno de convivência e o paisagismo externo, promovendo permeabilidade urbana e permanência qualificada.',
    ],
    materials: [
      'Pórticos em concreto pré-fabricado',
      'Caixilhos em aço pintado grafite',
      'Vidro temperado de grande vão',
      'Piso drenante e vegetação nativa',
    ],
    spatialParameters: [
      { label: 'Categoria', value: 'Comercial' },
      { label: 'Área conceitual', value: '560 m² (parâmetro ilustrativo)' },
      { label: 'Modulação', value: 'Eixos estruturais regulares de 7,0 m' },
      { label: 'Relação urbana', value: 'Térreo permeável com átrio integrado' },
    ],
    heroImage: {
      id: 'pavilhao-exterior',
      alt: 'Fachada do Pavilhão Sete com pórticos rítmicos em concreto aparente, pé-direito duplo em vidro e paisagismo',
      caption: 'Ritmo estrutural e transparência ao nível da rua.',
      aspect: '16/9',
      width: 1920,
      height: 1080,
      focalPoint: '58% 45%',
    },
    gallery: [
      {
        id: 'pavilhao-exterior',
        alt: 'Fachada do Pavilhão Sete com pórticos rítmicos em concreto aparente, pé-direito duplo em vidro e paisagismo',
        caption: '01 / Fachada principal e modulação estrutural.',
        aspect: '16/9',
        width: 1920,
        height: 1080,
      },
      {
        id: 'pavilhao-interior',
        alt: 'Átrio interno do Pavilhão Sete com laje nervurada em concreto, bancos monolíticos e iluminação natural',
        caption: '02 / Átrio de convivência com pé-direito duplo.',
        aspect: '16/9',
        width: 1920,
        height: 1080,
      },
      {
        id: 'pavilhao-detalhe',
        alt: 'Detalhe de encontro entre pilar de concreto, caixilho metálico e vegetação externa no Pavilhão Sete',
        caption: '03 / Detalhe de junta estrutural e caixilharia.',
        aspect: '4/5',
        width: 1200,
        height: 1500,
      },
    ],
  },
];

export const STUDIO_IMAGE: ProjectImage = {
  id: 'studio-editorial',
  alt: 'Mesa de trabalho do estúdio com amostras de concreto, pedra, madeira, desenhos arquitetônicos e maquete física',
  caption: 'Investigação de materiais, maquete volumétrica e estudos em planta.',
  aspect: '4/3',
  width: 1600,
  height: 1200,
  focalPoint: '45% 50%',
};

export function getImageSrc(id: string, size: 640 | 1280 | 1920 = 1280): string {
  return `/images/${id}-${size}.webp`;
}

export function getImageSrcSet(id: string): string {
  return `/images/${id}-640.webp 640w, /images/${id}-1280.webp 1280w, /images/${id}-1920.webp 1920w`;
}
