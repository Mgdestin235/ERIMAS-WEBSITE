/**
 * Registre des blocs de contenu éditables depuis le portail admin (module
 * « Pages du site »). Pensé pour être étendu facilement : ajouter une
 * entrée ici suffit à exposer un nouveau bloc éditable, sans modifier le
 * schéma de base de données (le contenu est stocké en JSON libre).
 */
export type EditablePageField = {
  key: string
  label: string
  type: 'text' | 'textarea'
  hint?: string
}

export type EditablePageDef = {
  slug: string
  label: string
  defaultTitle: string
  fields: EditablePageField[]
}

export const EDITABLE_PAGES: EditablePageDef[] = [
  {
    slug: 'qui-sommes-nous',
    label: 'Qui sommes-nous — texte complémentaire',
    defaultTitle: 'Qui sommes-nous',
    fields: [
      {
        key: 'intro',
        label: 'Paragraphe complémentaire',
        type: 'textarea',
        hint: "Affiché à la suite du texte institutionnel sur la page « Qui sommes-nous ».",
      },
    ],
  },
]

export function getEditablePageDef(slug: string) {
  return EDITABLE_PAGES.find((p) => p.slug === slug) ?? null
}
