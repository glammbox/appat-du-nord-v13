export type ActivityLevel = 'HOT' | 'ACTIVE' | 'SLOW' | 'CLOSED'

export interface SubType {
  name: string
  description: string
  imageFile: string
}

export interface Species {
  id: string
  name: string
  tagline: string
  imageFile: string
  subtypes?: SubType[]
  avgSize: string
  maxSize: string
  habitat: string
  waterTemp: string
  quebecSeason: string
  monthlyActivity: ActivityLevel[]
  proTips: string[]
  notableCatch?: string
  bestLures: string[]
  lureImages: string[]
  catchRelease?: boolean
}

export const speciesData: Species[] = [
  {
    id: 'maskinonge',
    name: 'Maskinongé',
    tagline: 'Le roi des eaux douces. Le poisson des 10 000 lancers.',
    imageFile: 'maskinonge.jpg',
    subtypes: [
      {
        name: 'Maskinongé pur',
        description: 'Olive-vert avec taches claires, le maskinongé pur est le plus grand des brochets. Prédateur apex des eaux douces québécoises.',
        imageFile: 'maskinonge.jpg',
      },
      {
        name: 'Tiger Musky (hybride)',
        description: 'Hybride brochet × maskinongé. Rayures tigrées distinctives, chair plus sombre. Plus agressif mais plus rare.',
        imageFile: 'tiger-maskinonge.jpg',
      },
    ],
    avgSize: '90–120 cm',
    maxSize: '150 cm+, 25 kg+',
    habitat: 'Bordures de végétation, cassures de courant, hauts-fonds, embouchures de tributaires',
    waterTemp: '15–22°C optimal',
    quebecSeason: '15 juin – 1 déc',
    monthlyActivity: ['CLOSED','CLOSED','CLOSED','CLOSED','CLOSED','ACTIVE','ACTIVE','ACTIVE','HOT','HOT','SLOW','CLOSED'],
    proTips: [
      'Faites toujours le figure-8 au bord du bateau — 30% des attaques se produisent ici.',
      'Fenêtre trophée automne 12–16°C = agressivité maximale.',
      'Grands leurres, récupération lente en eau froide.',
      'Leader acier ou titane obligatoire — le maskinongé coupe le fluorocarbone net.',
      'Adaptez la taille du leurre aux poissons-appâts présents dans la zone.',
    ],
    notableCatch: '🏆 Record Québec : 30 kg+ fleuve Saint-Laurent. Spécimen communautaire : 142 cm, Lac des Deux Montagnes.',
    bestLures: ['Bucktail', 'Swimbait', 'Glide Bait', 'Crankbait', 'Topwater'],
    lureImages: ['bucktail.jpg', 'swimbait.jpg', 'glide-bait.jpg', 'crankbait.jpg', 'topwater.jpg'],
  },
  {
    id: 'grand-brochet',
    name: 'Grand Brochet',
    tagline: 'Le prédateur qui attend. Patient, fulgurant.',
    imageFile: 'grand-brochet.jpg',
    avgSize: '60–90 cm',
    maxSize: '120 cm+',
    habitat: 'Herbiers, zones peu profondes, embouchures, zones tampons entre eaux chaudes et froides',
    waterTemp: '10–18°C optimal',
    quebecSeason: 'Avril – Novembre',
    monthlyActivity: ['SLOW','SLOW','SLOW','HOT','HOT','ACTIVE','SLOW','SLOW','ACTIVE','HOT','ACTIVE','SLOW'],
    proTips: [
      'Bordures de végétation à l\'aube avec une cuillère récupérée rapidement.',
      'En eau chaude d\'été, cherchez les profondeurs et structures — le brochet s\'y réfugie.',
      'Faites le figure-8 comme pour le maskinongé — les brochets suivent aussi les leurres.',
    ],
    notableCatch: '🏆 Spécimen communautaire : 113 cm, Réservoir Gouin.',
    bestLures: ['Spinner', 'Spoon', 'Swimbait', 'Softbait'],
    lureImages: ['spinner.jpg', 'spoon.jpg', 'swimbait.jpg', 'softplastic.jpg'],
  },
  {
    id: 'achigan',
    name: 'Achigan',
    tagline: 'Le combattant des eaux claires. Deux espèces, deux habitats.',
    imageFile: 'achigan-grande-bouche.jpg',
    subtypes: [
      {
        name: 'Achigan à grande bouche',
        description: 'Vert profond avec raie latérale foncée. Eaux chaudes, peu profondes, herbiers et quais. Combattant acharné.',
        imageFile: 'achigan-grande-bouche.jpg',
      },
      {
        name: 'Achigan à petite bouche',
        description: 'Bronze avec barres verticales. Préfère les eaux claires, rocheuses et les rivières à courant. Très sportif.',
        imageFile: 'achigan-petite-bouche.jpg',
      },
    ],
    avgSize: '30–50 cm',
    maxSize: '65 cm+',
    habitat: 'Grande bouche : herbiers, nénuphars, quais. Petite bouche : points rocheux, rivières rapides.',
    waterTemp: '18–25°C optimal',
    quebecSeason: 'Juin – Novembre',
    monthlyActivity: ['CLOSED','CLOSED','CLOSED','SLOW','SLOW','HOT','HOT','HOT','ACTIVE','ACTIVE','SLOW','CLOSED'],
    proTips: [
      'Grande bouche = herbiers, quais, nénuphars en eau chaude peu profonde.',
      'Petite bouche = points rocheux, cassures de courant dans les rivières.',
      'Drop-shot autour des piliers de quai en plein été pour les deux espèces.',
      'Popper topwater à l\'aube pour la grande bouche — les attaques sont spectaculaires.',
    ],
    notableCatch: '🏆 Spécimen communautaire : 58 cm, Lac Champlain.',
    bestLures: ['Topwater', 'Jig', 'Softbait', 'Crankbait'],
    lureImages: ['topwater.jpg', 'jig.jpg', 'softplastic.jpg', 'crankbait.jpg'],
  },
  {
    id: 'dore-jaune',
    name: 'Doré Jaune',
    tagline: 'Le poisson des Québécois. Champion de la table.',
    imageFile: 'dore-jaune.jpg',
    subtypes: [
      {
        name: 'Doré jaune',
        description: 'Doré brillant avec reflets olive. Le plus recherché des deux. Chair blanche et délicate, considérée parmi les meilleures en eau douce.',
        imageFile: 'dore-jaune.jpg',
      },
      {
        name: 'Doré noir (sauger)',
        description: 'Plus petit, plus sombre, taches sur les nageoires. Commun dans les grands courants et rivières. Moins connu mais tout aussi savoureux.',
        imageFile: 'dore-jaune.jpg',
      },
    ],
    avgSize: '35–60 cm',
    maxSize: '85 cm+',
    habitat: 'Fonds rocheux, courants modérés, zones peu profondes la nuit, profondeurs le jour',
    waterTemp: '12–18°C optimal',
    quebecSeason: 'Mai – Mars (pêche blanche incluse)',
    monthlyActivity: ['HOT','HOT','HOT','ACTIVE','HOT','ACTIVE','SLOW','SLOW','ACTIVE','HOT','ACTIVE','ACTIVE'],
    proTips: [
      'Pêchez aux heures creuses — lumière tamisée (crépuscule, aube) déclenche l\'alimentation.',
      'Jig le long du fond avec vitesse et pauses régulières.',
      'Harnais à chenille pour la traîne lente en eaux profondes.',
      'Points rocheux et courants — cherchez les structures immergées.',
    ],
    notableCatch: '🏆 Spécimen communautaire : 82 cm, Lac Saint-Pierre.',
    bestLures: ['Jig', 'Spinner', 'Crankbait'],
    lureImages: ['jig.jpg', 'spinner.jpg', 'crankbait.jpg'],
  },
  {
    id: 'truite',
    name: 'Truite',
    tagline: 'La reine des eaux froides. Quatre espèces, quatre caractères.',
    imageFile: 'truite-mouchetee.jpg',
    subtypes: [
      {
        name: 'Truite mouchetée (omble de fontaine)',
        description: 'Colorée, ventre rouge-orange, mouchetures bleues cerclées de rouge. Espèce emblématique du Québec. Ruisseaux froids et lacs alpins.',
        imageFile: 'truite-mouchetee.jpg',
      },
      {
        name: 'Touladi (truite de lac)',
        description: 'Grise, profonde, avec queue fourchue. Les plus gros individus vivent dans les lacs profonds et froids. Chair rose-orangée recherchée.',
        imageFile: 'touladi.jpg',
      },
    ],
    avgSize: '25–50 cm',
    maxSize: '80 cm+ (touladi)',
    habitat: 'Mouchetée : ruisseaux froids, lacs alpins. Touladi : lacs profonds et froids. Arc-en-ciel : rivières oxygénées.',
    waterTemp: '8–14°C optimal',
    quebecSeason: 'Avril – Octobre (varie selon espèce)',
    monthlyActivity: ['ACTIVE','ACTIVE','ACTIVE','HOT','HOT','ACTIVE','SLOW','SLOW','HOT','HOT','ACTIVE','ACTIVE'],
    proTips: [
      'Imitez l\'éclosion — spinner efficace en eau vive au printemps.',
      'Traîne profonde (50–100 pieds) pour le touladi en été.',
      'Au-dessus de 15°C, la mouchetée descend en profondeur — cherchez la thermocline.',
    ],
    notableCatch: '🏆 Spécimen touladi : 12 kg, Lac Témiscamingue.',
    bestLures: ['Spinner', 'Spoon', 'Crankbait'],
    lureImages: ['spinner.jpg', 'spoon.jpg', 'crankbait.jpg'],
  },
  {
    id: 'esturgeon',
    name: 'Esturgeon',
    tagline: 'Le dinosaure vivant du Saint-Laurent.',
    imageFile: 'esturgeon.jpg',
    avgSize: '100–180 cm',
    maxSize: '300 cm+, 100 kg+',
    habitat: 'Chenaux profonds du Saint-Laurent et grandes rivières, fonds vaseux et rocheux',
    waterTemp: '10–20°C',
    quebecSeason: 'Remise à l\'eau obligatoire — pêche sportive autorisée',
    monthlyActivity: ['SLOW','SLOW','SLOW','SLOW','ACTIVE','ACTIVE','ACTIVE','ACTIVE','ACTIVE','SLOW','SLOW','SLOW'],
    proTips: [
      'Remise à l\'eau obligatoire — manipulez avec soin dans l\'eau.',
      'Présent dans les chenaux profonds du Saint-Laurent et des grandes rivières.',
      'Alimentation au fond — utilisez un équipement lourd près du substrat.',
    ],
    notableCatch: '🏆 Individu observé : 2,7 m, 130 kg. Âge estimé : 100+ ans. Saint-Laurent.',
    bestLures: ['Jig'],
    lureImages: ['jig.jpg'],
    catchRelease: true,
  },
]
