# Site web ERIMAS SARL

Site institutionnel et back-office de gestion de contenu pour **ERIMAS SARL**,
cabinet conseil en ressources humaines basé à N'Djamena, Tchad.

Deux portails, une même base de données :

- **Portail visiteur** (`/`) — vitrine institutionnelle publique, optimisée SEO.
- **Portail admin** (`/admin`) — back-office privé (authentification requise)
  pour gérer articles, projets/références, témoignages, équipe, pages,
  messages de contact et médias, sans intervention d'un développeur.

> ⚠️ **État de ce dépôt.** Ce code a été écrit intégralement dans un
> environnement dont la politique réseau bloquait l'accès à npm et GitHub —
> il n'a donc **pas pu être installé, compilé (`next build`) ni testé** dans
> cette session. La structure suit scrupuleusement les API stables de
> Next.js 14 / Prisma 5 / NextAuth 4, mais un premier `npm install` +
> `npm run build` doit être effectué avant toute mise en production, pour
> corriger d'éventuelles erreurs de typage ou coquilles qu'aucune compilation
> n'a encore pu détecter.

## Stack technique

| Domaine | Choix |
|---|---|
| Frontend | Next.js 14 (App Router, TypeScript), SSR/SSG |
| Style | Tailwind CSS avec design tokens dédiés (`tailwind.config.ts`) |
| Animations | Framer Motion (scroll reveal, transitions, compteurs) |
| 3D | React Three Fiber + drei (hero animé, chargé dynamiquement) |
| Base de données | PostgreSQL via Prisma ORM |
| Authentification admin | NextAuth.js (Credentials + JWT), rôles ADMIN / EDITOR |
| Stockage médias | Adaptateur local (`/public/uploads`) ou S3 compatible (R2, Supabase Storage) |
| Éditeur riche | Tiptap (WYSIWYG) pour articles et projets |
| PWA | Portail admin installable (manifest + service worker) |

## Démarrage local

### 1. Prérequis

- Node.js ≥ 18.18
- Docker (pour une base PostgreSQL locale) — ou un `DATABASE_URL` PostgreSQL existant

### 2. Installation

```bash
npm install
cp .env.example .env
# Éditez .env : générez NEXTAUTH_SECRET avec `openssl rand -base64 32`
```

### 3. Base de données

```bash
docker compose up -d          # démarre PostgreSQL localement
npm run db:migrate            # applique le schéma (crée les tables)
npm run db:seed               # crée le compte admin de démonstration + contenu de départ
```

### 4. Lancer le site

```bash
npm run dev
```

- Portail visiteur : http://localhost:3000
- Portail admin : http://localhost:3000/admin/connexion

### Compte administrateur de démonstration

Défini par les variables `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` de `.env`
(valeurs par défaut dans `.env.example`) :

```
E-mail    : admin@erimas-tchad.com
Mot de passe : ChangeMoi#2026
```

**Changez ce mot de passe dès la première connexion** (module Utilisateurs du
portail admin), et modifiez-le dans `.env` avant tout déploiement en production.

## Structure du dépôt

```
prisma/schema.prisma      Schéma de base de données (8 modèles, migrations Prisma)
prisma/seed.ts            Amorçage : compte admin + contenu de démarrage
src/app/(site)/           Pages du portail visiteur (App Router)
src/app/admin/            Portail admin (connexion publique + zone protégée)
src/app/api/               Routes API (CRUD, upload média, contact, NextAuth)
src/components/ui/         Primitives d'interface (Bouton, Container, IconTile…)
src/components/motion/     Système d'animation (Reveal, curseur, orbes, compteurs)
src/components/three/      Hero 3D (React Three Fiber), chargé dynamiquement
src/components/site/       Sections du portail visiteur (header, footer, carrousel…)
src/components/admin/      Composants du back-office (tableau de bord, formulaires…)
src/lib/                   Prisma client, auth, validations Zod, stockage médias, constantes ERIMAS
docker-compose.yml         PostgreSQL local pour le développement
```

## Contenu factuel et espaces réservés

Conformément à la consigne de ne jamais inventer d'information non fournie,
plusieurs éléments sont volontairement laissés en **brouillon** ou marqués
`[À COMPLÉTER]`, à renseigner depuis le portail admin avant mise en ligne :

- **Logo officiel** : un monogramme provisoire (`src/components/ui/Logo.tsx`)
  reprend la palette de marque en attendant le fichier SVG officiel.
- **Associés fondateurs** : 3 fiches vides créées (module Équipe), noms à saisir.
- **Références clients** (Coopération Suisse au Tchad, Expertise France, Lumen
  Expertise) : fiches créées en brouillon, détails de mission à compléter.
- **Témoignages** : aucune citation n'a été inventée ; un emplacement vide est
  prêt à être rempli avec de vraies citations clients.
- **Photographies professionnelles** : aucune image n'étant fournie, les
  emplacements prévus (équipe, projets, articles) affichent un repli sobre
  tant qu'aucun média n'est téléversé.
- **Horaires d'ouverture**, mentions légales complémentaires : `[À COMPLÉTER]`
  sur la page Contact / Sécurité juridique.

## Déploiement en production

### Vue d'ensemble recommandée

1. **Base de données managée** : [Neon](https://neon.tech) ou
   [Supabase](https://supabase.com) (PostgreSQL). Récupérez la chaîne de
   connexion et renseignez `DATABASE_URL`.
2. **Stockage médias** (optionnel en production, recommandé si l'hébergement
   n'a pas de disque persistant) : créez un bucket
   [Cloudflare R2](https://developers.cloudflare.com/r2/) ou Supabase
   Storage, rendez-le public en lecture, puis renseignez dans les variables
   d'environnement :
   ```
   STORAGE_DRIVER=s3
   S3_ENDPOINT=...
   S3_BUCKET=...
   S3_ACCESS_KEY_ID=...
   S3_SECRET_ACCESS_KEY=...
   S3_PUBLIC_BASE_URL=https://media.votredomaine.com
   ```
   Sans configuration S3, `STORAGE_DRIVER=local` écrit dans `/public/uploads`
   — fonctionnel en développement, mais nécessite un disque persistant en
   production (non garanti sur Vercel).
3. **Hébergement frontend** : [Vercel](https://vercel.com).
   - Connectez le dépôt GitHub.
   - Renseignez toutes les variables de `.env.example` dans les
     *Environment Variables* du projet Vercel (`NEXTAUTH_URL` = URL de
     production, `NEXTAUTH_SECRET` généré spécifiquement, etc.).
   - Le script `postinstall` exécute automatiquement `prisma generate`.
4. **Migrations en production** : avant ou juste après le premier déploiement,
   exécutez `npx prisma migrate deploy` (depuis votre poste, en ciblant
   `DATABASE_URL` de production) puis `npm run db:seed` pour créer le premier
   compte administrateur.
5. **Domaine & DNS** : pointez votre domaine vers Vercel, puis mettez à jour
   `NEXT_PUBLIC_SITE_URL` et `NEXTAUTH_URL`.

### Avant la mise en ligne

- [ ] `npm install && npm run build` en local pour corriger toute erreur de
      compilation (non vérifié dans cet environnement, voir avertissement en
      tête de ce document).
- [ ] Remplacer le mot de passe du compte admin de démonstration.
- [ ] Remplacer le monogramme provisoire par le logo officiel ERIMAS.
- [ ] Compléter les fiches marquées `[À COMPLÉTER]`.
- [ ] Vérifier les Core Web Vitals (Lighthouse) une fois déployé.

## Guide d'utilisation du portail admin

1. **Connexion** : `/admin/connexion` avec votre e-mail et mot de passe.
2. **Tableau de bord** : vue d'ensemble (contenu publié, messages non lus,
   graphique de répartition du contenu, activité récente).
3. **Articles** : rédigez au format WYSIWYG (Tiptap), choisissez un statut
   *Brouillon* (invisible sur le site) ou *Publié*. Le slug détermine
   l'adresse `/blog/votre-slug`.
4. **Projets & références** : même principe, pour les études de cas affichées
   sur `/projets` et `/references`. Cochez « Mettre en avant » pour les faire
   apparaître en priorité.
5. **Témoignages** : citations clients affichées en carrousel sur l'accueil.
   Décochez « Publier » pour masquer un témoignage sans le supprimer.
6. **Équipe** : fiches de la page « Qui sommes-nous » ; cochez « Associé(e)
   fondateur/trice » pour les trois fondateurs du cabinet.
7. **Pages du site** : blocs de texte complémentaires (ex. paragraphe
   additionnel sur « Qui sommes-nous »), extensible dans
   `src/lib/editable-pages.ts` sans migration de base de données.
8. **Messages** : demandes reçues depuis le formulaire de contact public.
9. **Médiathèque** : téléversez images (JPEG/PNG/WEBP/SVG) et PDF (8 Mo
   maximum), copiez l'URL générée pour l'utiliser dans un article, un projet,
   un témoignage ou une fiche équipe.
10. **Utilisateurs** *(administrateurs uniquement)* : créez des comptes
    Éditeur pour votre équipe, réinitialisez des mots de passe, désactivez un
    compte.

### Installer le portail admin comme application (PWA)

Sur ordinateur (Chrome/Edge) ou Android : ouvrez `/admin`, puis utilisez
l'icône d'installation de la barre d'adresse (ou le menu ⋮ → « Installer »).
L'admin s'ouvre alors dans sa propre fenêtre, sans barre de navigateur.

## Sécurité

- Mots de passe hachés avec bcrypt (12 rounds).
- Sessions JWT (NextAuth), expiration 12h.
- Toutes les routes `/admin/*` sont protégées par middleware (redirection
  vers la connexion si non authentifié).
- Toutes les routes `/api/*` de mutation vérifient la session côté serveur ;
  la gestion des utilisateurs est réservée au rôle ADMIN.
- Requêtes SQL exclusivement via Prisma (protection injection SQL).
- Formulaire de contact : validation Zod, champ anti-spam invisible,
  vérification d'origine basique (CSRF).
- En-têtes de sécurité (`X-Frame-Options`, `X-Content-Type-Options`,
  `Referrer-Policy`) définis dans `next.config.mjs`.

## Accessibilité & performance

- Contrastes pensés pour WCAG AA (fond navy profond / texte blanc cassé).
- États de focus clavier visibles sur toute la surface interactive.
- `prefers-reduced-motion` respecté strictement : le curseur personnalisé, le
  hero 3D, les transitions de page et le loader d'introduction se neutralisent
  automatiquement (repli statique) pour les utilisateurs concernés.
- Rendu 3D chargé dynamiquement (`next/dynamic`, `ssr: false`) : le bundle
  Three.js n'est jamais envoyé si l'utilisateur préfère moins d'animations.
- Contenu du Blog / Projets / Références entièrement piloté par la base de
  données (aucun contenu en dur), avec états vides rédigés avec soin.

## Roadmap suggérée (non couvert dans cette première version)

- Recadrage d'image intégré dans la médiathèque.
- Interface de traduction FR/EN (structure Next.js déjà compatible i18n).
- Rate limiting applicatif sur le formulaire de contact et l'authentification.
- Tests automatisés (actuellement absents).
