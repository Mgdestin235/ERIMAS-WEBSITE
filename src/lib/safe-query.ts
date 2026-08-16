/**
 * Exécute une requête Prisma en la protégeant : si la base de données est
 * indisponible, le portail visiteur affiche un état gracieux plutôt que de
 * planter la page entière.
 */
export async function safeQuery<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn()
  } catch (error) {
    console.error('[safeQuery]', error)
    return fallback
  }
}
