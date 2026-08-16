/**
 * Tailles d'icône partagées par IconTile et ses appelants. Volontairement
 * dans un module sans "use client" : un Server Component ne peut pas lire
 * une valeur exportée par un fichier "use client" comme une donnée
 * classique (tous ses exports deviennent des références client opaques).
 */
export const ICON_TILE_PX = { sm: 18, md: 24, lg: 28 } as const
export type IconTileSize = keyof typeof ICON_TILE_PX
