## Copilot / AI Engineer Instructions for this repo

Purpose: quick, actionable context to make an AI coding agent productive in this Vite + React + TypeScript project.

- Quick start

  - Install: `npm i` (project uses npm in README; `node` and `npm` required).
  - Dev: `npm run dev` — starts Vite dev server (configured to listen on port 8080 in `vite.config.ts`).
  - Build: `npm run build` (Vite build). Preview: `npm run preview`.
  - Lint: `npm run lint` (ESLint run over the repo).

- Big picture

  - Tech: Vite + React + TypeScript + Tailwind + shadcn-ui/Radix primitives. React Router for routing and TanStack Query for server state.
  - Entry points: `src/main.tsx` (React root) -> `src/App.tsx` (providers + `Routes`).
  - UI structure: reusable UI primitives live under `src/components/ui/` (many small files like `button.tsx`, `input.tsx` — follow the existing naming). App-specific components are in `src/components/` (e.g. `BranchNavigation.tsx`, `StoryCard.tsx`).
  - Pages: `src/pages/Index.tsx`, `src/pages/NotFound.tsx` — add new pages under `src/pages/` and register routes in `src/App.tsx` above the `*` catch-all route.

- Important repository conventions

  - Path alias: use `@/` to import from `src` (configured in `vite.config.ts` and `tsconfig.json`). Example: `import { Button } from '@/components/ui/button'`.
  - Routing: all custom routes must be added in `src/App.tsx` above the catch-all `Route path="*"` (see inline comment in the file).
  - UI primitives: follow the shape and naming used in `src/components/ui/*` — these are small, focused components (Radix + shadcn patterns). Prefer reusing them rather than creating duplicate UI logic.
  - State & data: server/fetch state uses `@tanstack/react-query` (see `QueryClientProvider` in `src/App.tsx`).

- Integration & external hooks

  - `vite.config.ts` includes a dev-only plugin `componentTagger` (from `lovable-tagger`) — avoid removing it unless necessary for local debugging.
  - Tailwind and postcss are used for styling (see `tailwind.config.ts`, `postcss.config.js` and `index.css`). Use `tailwind-merge` utilities already in `package.json` when combining classNames.

- Practical examples (copy-paste friendly)

  - Add a page and route:

    1. Create `src/pages/MyPage.tsx` exporting default React component.
    2. In `src/App.tsx` add: `<Route path="/my-page" element={<MyPage />} />` above the `*` route.

  - Import using alias:
    `import StoryCard from '@/components/StoryCard'`

- Edge cases & gotchas

  - No test runner configured in `package.json` — do not add tests assuming a particular test framework unless also adding deps and scripts.
  - Lint script exists; run before commits. There are non-strict TS settings (see `tsconfig.json`), so type gaps may exist intentionally.
  - Dev server runs on port 8080; if binding issues occur, check `vite.config.ts` host/port.

- Files to consult when editing

  - `package.json` — available npm scripts & dependencies.
  - `vite.config.ts` — alias (`@`) and dev plugin config.
  - `src/main.tsx`, `src/App.tsx` — mount point, providers, and routes.
  - `src/components/ui/*` — canonical UI primitives and patterns.
  - `src/lib/utils.ts`, `src/hooks/*` — small helpers and custom hooks.

  ## Note di prodotto / idea features (italiano)

  Vorrei fare un social tiktok like ma con storie e branching.

  - Concetto principale

    - Ogni "idea" è una storia iniziale che può essere continuata da altri utenti creando un nuovo branch. I branch possono a loro volta essere continuati, creando un grafo a più livelli.

  - Requisiti UI/UX richiesti

    - Interazioni: upvote, downvote, commenti, condividi e "branch" (continua la storia).
    - Navigazione: scorrimento verticale per avanzare nella storyline principale; scorrimento orizzontale per esplorare i branch di una specifica storia/segmento.
    - Profiling/curation: quando si scende nella storyline mostrare 3-4 profili algoritmicamente selezionati (simili ai tuoi gusti) mescolati con altri profili in ordine randomico per dare visibilità anche ai branch meno probabili.
    - Ordinamento: presentare i primi 3 profili in linea con l'utente (ma posizionarne uno randomicamente tra le opzioni) e poi disporre gli altri in modo casuale per favorire serendipità.

  - Esempio di contenuto (flusso immaginato)

    1. Post: "Quale outfit è migliore per l'autunno 2025?" — creo un branch con 5 outfit. Ogni video alla fine chiede "che accessori?".
       - Per l'outfit 1 ci sono 5 branch; outfit 2 ne ha 3; outfit 3 ne ha 1; outfit 4 e 5 nessuno.
    2. Un branch di accessori: "Questo è l'accessorio che abbinerei, quali scarpe mettereste voi?" — porta a 8 branch diversi.

  - Note comportamentali
    - Anche se un branch è molto più rilevante rispetto agli altri, mantenere una componente di randomizzazione (opzione 1 scelta casualmente) per permettere a tutti i branch di essere visualizzati, ottenere voti e possibili continuazioni.

If anything above is unclear or you'd like more examples (common PR patterns, preferred commit messages, or where to add unit tests if we introduce a test framework), tell me which area to expand and I'll update this file.
