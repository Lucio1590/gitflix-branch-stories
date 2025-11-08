/**
 * Homepage Story Collections
 * Root stories with their complete branch trees
 */

import { Story, Branch } from "./mockStories";

/**
 * Story Collection 1: Mystery Villa
 */
export const villaStories: Record<string, Story> = {
  "villa-root": {
    id: "villa-root",
    parentId: null,
    branchId: "root",
    continuationId: null,
    siblingBranches: [],
    author: "mystery_master",
    content: "Ti svegli in una villa sconosciuta. La porta è chiusa. Sul tavolo c'è una chiave e una lettera. Cosa fai?",
    imageUrl: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
    upvotes: 2847,
    downvotes: 45,
    comments: 456,
    depth: 0,
  },
  "villa-key": {
    id: "villa-key",
    parentId: "villa-root",
    branchId: "key-branch",
    continuationId: "villa-key-2",
    siblingBranches: ["letter-branch", "window-branch"],
    author: "detective_sara",
    content: "Prendi la chiave. Apri la porta e trovi un corridoio buio. In fondo vedi una luce. Cosa fai?",
    imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
    upvotes: 1234,
    downvotes: 23,
    comments: 189,
    depth: 1,
  },
  "villa-key-2": {
    id: "villa-key-2",
    parentId: "villa-key",
    branchId: "key-branch",
    continuationId: null,
    siblingBranches: [],
    author: "adventure_leo",
    content: "Segui la luce e scopri una biblioteca segreta piena di libri antichi...",
    imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80",
    upvotes: 892,
    downvotes: 12,
    comments: 134,
    depth: 2,
  },
  "villa-letter": {
    id: "villa-letter",
    parentId: "villa-root",
    branchId: "letter-branch",
    continuationId: null,
    siblingBranches: ["key-branch", "window-branch"],
    author: "reader_anna",
    content: "Leggi la lettera. 'Se stai leggendo questo, sei in pericolo. Scappa!' Senti passi dietro la porta...",
    imageUrl: "https://images.unsplash.com/photo-1513001900722-370f803f498d?w=800&q=80",
    upvotes: 1567,
    downvotes: 34,
    comments: 234,
    depth: 1,
  },
  "villa-window": {
    id: "villa-window",
    parentId: "villa-root",
    branchId: "window-branch",
    continuationId: null,
    siblingBranches: ["key-branch", "letter-branch"],
    author: "escape_artist",
    content: "Ignori tutto e vai alla finestra. È il terzo piano. Nel giardino vedi una figura incappucciata...",
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    upvotes: 943,
    downvotes: 18,
    comments: 156,
    depth: 1,
  },
};

/**
 * Story Collection 2: Neo-City Escape
 */
export const neoCityStories: Record<string, Story> = {
  "neo-root": {
    id: "neo-root",
    parentId: null,
    branchId: "root",
    continuationId: null,
    siblingBranches: [],
    author: "cyberpunk_dave",
    content: "Anno 2145. Neo-City. Un messaggio cifrato sul tuo impianto neurale: 'Incontriamoci al Neon Bar, ho un lavoro per te.' Il mittente? Sconosciuto. Cosa fai?",
    imageUrl: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80",
    upvotes: 3421,
    downvotes: 67,
    comments: 587,
    depth: 0,
  },
  "neo-accept": {
    id: "neo-accept",
    parentId: "neo-root",
    branchId: "accept-branch",
    continuationId: "neo-accept-2",
    siblingBranches: ["ignore-branch", "trace-branch"],
    author: "hacker_zero",
    content: "Vai al Neon Bar. Un uomo con occhiali da sole ti aspetta. 'Devi recuperare dei dati dalla MegaCorp Tower.' Ti offre 100.000 crediti.",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
    upvotes: 2156,
    downvotes: 43,
    comments: 378,
    depth: 1,
  },
  "neo-accept-2": {
    id: "neo-accept-2",
    parentId: "neo-accept",
    branchId: "accept-branch",
    continuationId: null,
    siblingBranches: [],
    author: "infiltrator_mia",
    content: "Accetti il lavoro. Ti fornisce un dispositivo di hacking. L'infiltrazione inizia stanotte...",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    upvotes: 1678,
    downvotes: 29,
    comments: 245,
    depth: 2,
  },
  "neo-ignore": {
    id: "neo-ignore",
    parentId: "neo-root",
    branchId: "ignore-branch",
    continuationId: null,
    siblingBranches: ["accept-branch", "trace-branch"],
    author: "cautious_sam",
    content: "Ignori il messaggio. Ma il giorno dopo, agenti della MegaCorp bussano alla tua porta...",
    imageUrl: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&q=80",
    upvotes: 1234,
    downvotes: 56,
    comments: 198,
    depth: 1,
  },
  "neo-trace": {
    id: "neo-trace",
    parentId: "neo-root",
    branchId: "trace-branch",
    continuationId: null,
    siblingBranches: ["accept-branch", "ignore-branch"],
    author: "tech_wizard",
    content: "Decidi di tracciare il mittente. Il segnale porta a... la centrale di polizia?!",
    imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80",
    upvotes: 1892,
    downvotes: 38,
    comments: 289,
    depth: 1,
  },
};

/**
 * Story Collection 3: Time Traveler's Dilemma
 */
export const timeTravelStories: Record<string, Story> = {
  "time-root": {
    id: "time-root",
    parentId: null,
    branchId: "root",
    continuationId: null,
    siblingBranches: [],
    author: "chrono_keeper",
    content: "Hai scoperto una macchina del tempo nel garage di tuo nonno. Il pannello mostra tre epoche: 1920, 2200, Anno 0. Quale scegli?",
    imageUrl: "https://images.unsplash.com/photo-1533930193699-d0e219d5f359?w=800&q=80",
    upvotes: 4523,
    downvotes: 89,
    comments: 723,
    depth: 0,
  },
  "time-1920": {
    id: "time-1920",
    parentId: "time-root",
    branchId: "1920-branch",
    continuationId: null,
    siblingBranches: ["2200-branch", "year0-branch"],
    author: "vintage_soul",
    content: "Anni '20. Jazz, flapper, e... vedi tuo nonno da giovane! Ma cambiando il passato, cosa succederà?",
    imageUrl: "https://images.unsplash.com/photo-1514539079130-25950c84af65?w=800&q=80",
    upvotes: 2345,
    downvotes: 45,
    comments: 412,
    depth: 1,
  },
  "time-2200": {
    id: "time-2200",
    parentId: "time-root",
    branchId: "2200-branch",
    continuationId: null,
    siblingBranches: ["1920-branch", "year0-branch"],
    author: "future_vision",
    content: "Anno 2200. La Terra è un paradiso tecnologico... o una distopia? Dipende da te scoprirlo.",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    upvotes: 3012,
    downvotes: 67,
    comments: 534,
    depth: 1,
  },
  "time-year0": {
    id: "time-year0",
    parentId: "time-root",
    branchId: "year0-branch",
    continuationId: null,
    siblingBranches: ["1920-branch", "2200-branch"],
    author: "ancient_explorer",
    content: "Anno 0. Roma antica. Ma la macchina del tempo si rompe. Sei bloccato qui...",
    imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80",
    upvotes: 1876,
    downvotes: 52,
    comments: 298,
    depth: 1,
  },
};

/**
 * Story Collection 4: Deep Ocean Discovery
 */
export const oceanStories: Record<string, Story> = {
  "ocean-root": {
    id: "ocean-root",
    parentId: null,
    branchId: "root",
    continuationId: null,
    siblingBranches: [],
    author: "marine_explorer",
    content: "Sei un ricercatore in un sottomarino. A 3000 metri di profondità, il sonar rileva una struttura artificiale. Impossibile... o no?",
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    upvotes: 2967,
    downvotes: 58,
    comments: 489,
    depth: 0,
  },
  "ocean-investigate": {
    id: "ocean-investigate",
    parentId: "ocean-root",
    branchId: "investigate-branch",
    continuationId: null,
    siblingBranches: ["surface-branch", "record-branch"],
    author: "deep_diver",
    content: "Ti avvicini. È una città sommersa! Architettura impossibile, tecnologia sconosciuta. All'improvviso, le luci si accendono...",
    imageUrl: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80",
    upvotes: 2134,
    downvotes: 41,
    comments: 367,
    depth: 1,
  },
  "ocean-surface": {
    id: "ocean-surface",
    parentId: "ocean-root",
    branchId: "surface-branch",
    continuationId: null,
    siblingBranches: ["investigate-branch", "record-branch"],
    author: "safety_first",
    content: "Decidi di risalire e riportare la scoperta. Ma nessuno ti crede. Devi tornare con le prove...",
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    upvotes: 1456,
    downvotes: 67,
    comments: 234,
    depth: 1,
  },
  "ocean-record": {
    id: "ocean-record",
    parentId: "ocean-root",
    branchId: "record-branch",
    continuationId: null,
    siblingBranches: ["investigate-branch", "surface-branch"],
    author: "documentary_maker",
    content: "Inizi a registrare. Il video mostra creature bioluminescenti che sembrano... intelligenti?",
    imageUrl: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&q=80",
    upvotes: 1789,
    downvotes: 34,
    comments: 298,
    depth: 1,
  },
};

/**
 * Story Collection 5: Magic Academy
 */
export const magicStories: Record<string, Story> = {
  "magic-root": {
    id: "magic-root",
    parentId: null,
    branchId: "root",
    continuationId: null,
    siblingBranches: [],
    author: "wizard_master",
    content: "Primo giorno all'Accademia di Magia. Devi scegliere la tua specializzazione: Elementale, Alchimia, o Divinazione?",
    imageUrl: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800&q=80",
    upvotes: 3845,
    downvotes: 72,
    comments: 612,
    depth: 0,
  },
  "magic-elemental": {
    id: "magic-elemental",
    parentId: "magic-root",
    branchId: "elemental-branch",
    continuationId: null,
    siblingBranches: ["alchemy-branch", "divination-branch"],
    author: "fire_mage",
    content: "Scegli Elementale. Il maestro ti insegna a controllare il fuoco. Ma un incidente in classe...",
    imageUrl: "https://images.unsplash.com/photo-1549558549-415fe4c37b60?w=800&q=80",
    upvotes: 2456,
    downvotes: 48,
    comments: 423,
    depth: 1,
  },
  "magic-alchemy": {
    id: "magic-alchemy",
    parentId: "magic-root",
    branchId: "alchemy-branch",
    continuationId: null,
    siblingBranches: ["elemental-branch", "divination-branch"],
    author: "potion_master",
    content: "Alchimia! Crei la tua prima pozione... ma hai scambiato gli ingredienti. Cosa succede?",
    imageUrl: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80",
    upvotes: 2123,
    downvotes: 56,
    comments: 378,
    depth: 1,
  },
  "magic-divination": {
    id: "magic-divination",
    parentId: "magic-root",
    branchId: "divination-branch",
    continuationId: null,
    siblingBranches: ["elemental-branch", "alchemy-branch"],
    author: "seer_oracle",
    content: "Divinazione. Leggi i tarocchi e vedi il tuo futuro... e non è quello che ti aspettavi.",
    imageUrl: "https://images.unsplash.com/photo-1552059152-a42df3f66055?w=800&q=80",
    upvotes: 1987,
    downvotes: 43,
    comments: 334,
    depth: 1,
  },
};

/**
 * Combined mock data for all story collections
 */
export const allHomeStories: Record<string, Story> = {
  ...villaStories,
  ...neoCityStories,
  ...timeTravelStories,
  ...oceanStories,
  ...magicStories,
};

/**
 * Root stories for homepage feed (sorted by popularity)
 */
export const homePageRootStories = [
  allHomeStories["magic-root"],      // 3845 upvotes
  allHomeStories["time-root"],       // 4523 upvotes
  allHomeStories["neo-root"],        // 3421 upvotes
  allHomeStories["ocean-root"],      // 2967 upvotes
  allHomeStories["villa-root"],      // 2847 upvotes
].sort((a, b) => b.upvotes - a.upvotes);
