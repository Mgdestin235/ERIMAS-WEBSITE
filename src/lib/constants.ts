/**
 * Contenu institutionnel ERIMAS SARL — informations factuelles telles que
 * fournies. Tout élément non communiqué est marqué [À COMPLÉTER] plutôt
 * qu'inventé (photos, textes juridiques détaillés, chiffres non fournis).
 */

export const COMPANY = {
  name: 'ERIMAS SARL',
  tagline: 'Cabinet conseil en ressources humaines',
  city: "N'Djamena",
  country: 'Tchad',
  rccm: 'TD-NDJ-01-2026-B12-00299',
  capital: '1 000 000 FCFA',
  legalForm: 'Société à Responsabilité Limitée (SARL)',
  address: 'Avenue Bealoum Kondol, Quartier Moursal, Carré N°7, rue 5104',
  addressCity: "N'Djamena",
  poBox: 'BP 1535',
  phones: ['+235 62 66 46 41', '+235 96 17 54 55'],
  email: 'contact@erimas-tchad.com',
  foundingYear: 2026,
  founderCount: 3,
} as const

export const NAV_LINKS = [
  { href: '/', label: 'Accueil' },
  { href: '/qui-sommes-nous', label: 'Qui sommes-nous' },
  { href: '/nos-services', label: 'Nos services' },
  { href: '/notre-approche', label: 'Notre approche' },
  { href: '/securite-juridique', label: 'Sécurité juridique' },
  { href: '/references', label: 'Références' },
  { href: '/blog', label: 'Actualités' },
  { href: '/projets', label: 'Projets' },
  { href: '/contact', label: 'Contact' },
] as const

export type ServiceDomain = {
  slug: string
  title: string
  shortDescription: string
  description: string
  points: string[]
}

export const SERVICE_DOMAINS: ServiceDomain[] = [
  {
    slug: 'conseil-strategie-rh',
    title: 'Conseil & stratégie RH',
    shortDescription: 'Aligner la fonction RH sur la stratégie de l’organisation.',
    description:
      "ERIMAS accompagne les directions générales et directions des ressources humaines dans la définition et la mise en œuvre de leur stratégie RH : diagnostic organisationnel, politique de gestion des talents, structuration de la fonction RH, gestion du changement.",
    points: [
      'Diagnostic RH et organisationnel',
      'Élaboration de politiques et procédures RH',
      'Gestion prévisionnelle des emplois et compétences (GPEC)',
      'Accompagnement du changement organisationnel',
    ],
  },
  {
    slug: 'recrutement',
    title: 'Recrutement',
    shortDescription: 'Identifier et sécuriser les meilleurs profils.',
    description:
      "ERIMAS conduit des processus de recrutement rigoureux pour des postes de tous niveaux — de l'expression de besoin à l'intégration — pour des organisations publiques, parapubliques, privées et internationales opérant au Tchad.",
    points: [
      'Sourcing et présélection de candidats',
      'Évaluation des compétences et entretiens structurés',
      'Recrutement de profils spécialisés et de cadres dirigeants',
      "Accompagnement à l'intégration (onboarding)",
    ],
  },
  {
    slug: 'formation',
    title: 'Formation',
    shortDescription: 'Développer les compétences individuelles et collectives.',
    description:
      "ERIMAS conçoit et anime des programmes de formation sur mesure, adaptés aux réalités professionnelles et réglementaires du Tchad, pour renforcer les compétences techniques et managériales des équipes.",
    points: [
      "Analyse des besoins en formation",
      'Ingénierie pédagogique et conception de contenus',
      'Formations managériales et techniques',
      "Évaluation de l'impact des formations",
    ],
  },
  {
    slug: 'externalisation-personnel',
    title: 'Externalisation de personnel',
    shortDescription: 'Confier la gestion administrative du personnel à un expert.',
    description:
      "ERIMAS prend en charge, pour le compte de ses clients, la gestion administrative et sociale du personnel (paie, contrats, obligations sociales et fiscales), en conformité avec le droit du travail tchadien et les obligations CNPS.",
    points: [
      'Gestion administrative du personnel',
      'Gestion de la paie',
      'Conformité sociale et fiscale',
      'Portage salarial et mise à disposition de personnel',
    ],
  },
  {
    slug: 'digitalisation-ia',
    title: 'Digitalisation & IA',
    shortDescription: 'Moderniser les processus RH grâce au numérique.',
    description:
      "ERIMAS aide les organisations à digitaliser leurs processus RH et à explorer les apports de l'intelligence artificielle pour gagner en efficacité, tout en maîtrisant les risques associés.",
    points: [
      "Digitalisation des processus RH",
      "Sélection et déploiement d'outils SIRH",
      "Intégration raisonnée de l'intelligence artificielle",
      'Conduite du changement numérique',
    ],
  },
  {
    slug: 'services-supports',
    title: 'Services supports',
    shortDescription: 'Un appui opérationnel complémentaire à la fonction RH.',
    description:
      'ERIMAS propose des services supports complémentaires permettant à ses clients de se concentrer sur leur cœur de métier, en toute confiance sur le plan administratif et organisationnel.',
    points: [
      'Appui administratif et organisationnel',
      'Assistance à la structuration des services',
      'Veille réglementaire et sociale',
      'Missions ponctuelles sur mesure',
    ],
  },
]

export type MethodologyStep = {
  order: number
  title: string
  description: string
}

export const METHODOLOGY_STEPS: MethodologyStep[] = [
  {
    order: 1,
    title: 'Écoute & cadrage',
    description:
      "Rencontre avec les parties prenantes pour comprendre le contexte, les enjeux et les objectifs de la mission, et cadrer précisément son périmètre.",
  },
  {
    order: 2,
    title: 'Diagnostic',
    description:
      'Analyse approfondie de la situation existante — organisation, pratiques RH, contraintes réglementaires — à partir de données et d’entretiens.',
  },
  {
    order: 3,
    title: 'Conception de la solution',
    description:
      'Élaboration de recommandations et d’un plan d’action adapté au contexte de l’organisation cliente, présenté et discuté avant validation.',
  },
  {
    order: 4,
    title: 'Validation',
    description:
      "Présentation formelle des recommandations et ajustement conjoint avec le client pour aboutir à un plan d'action partagé et validé.",
  },
  {
    order: 5,
    title: 'Déploiement',
    description:
      'Mise en œuvre opérationnelle des actions retenues, avec un accompagnement de proximité tout au long de l’exécution.',
  },
  {
    order: 6,
    title: 'Suivi & transfert',
    description:
      'Évaluation des résultats obtenus et transfert des compétences et outils aux équipes du client pour assurer la pérennité de la mission.',
  },
]

export const LEGAL_FRAMEWORK = [
  {
    title: 'Code du travail tchadien',
    description:
      "Le socle réglementaire de toute relation de travail au Tchad : contrats, durée du travail, rupture, représentation du personnel. ERIMAS veille à la conformité de chaque intervention avec ce cadre.",
  },
  {
    title: 'Convention collective générale',
    description:
      "Les dispositions conventionnelles applicables à l'ensemble des secteurs, complétant et précisant le Code du travail sur de nombreux points (classifications, indemnités, congés).",
  },
  {
    title: 'Convention sectorielle pétrolière',
    description:
      "Un cadre spécifique aux entreprises du secteur pétrolier, dont ERIMAS maîtrise les particularités pour accompagner ses clients de ce secteur en toute sécurité juridique.",
  },
  {
    title: 'Obligations CNPS et fiscales',
    description:
      "Les obligations sociales (Caisse Nationale de Prévoyance Sociale) et fiscales liées à l'emploi de personnel, intégrées à chaque mission de gestion ou d'externalisation du personnel.",
  },
  {
    title: 'Droit OHADA',
    description:
      "Le cadre juridique harmonisé du droit des affaires en Afrique, dont ERIMAS tient compte pour les aspects touchant au droit des sociétés et aux relations contractuelles de ses clients.",
  },
] as const

export const STATS = [
  { label: "domaines d'expertise", value: 6, suffix: '' },
  { label: 'formalisation', value: 2026, suffix: '' },
  { label: 'associés fondateurs', value: 3, suffix: '' },
] as const
