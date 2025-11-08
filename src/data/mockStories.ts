/**
 * Story Data Model
 * 
 * Each story has:
 * - id: unique identifier
 * - parentId: the story this continues from (null for root stories)
 * - branchId: identifies which branch this story belongs to
 * - continuationId: the next story in this branch (null if no continuation)
 * - siblingBranches: array of branchIds at the same level (alternatives)
 */

export interface Story {
  id: string;
  parentId: string | null;
  branchId: string;
  continuationId: string | null;
  siblingBranches: string[];
  author: string;
  content: string;
  imageUrl: string; // Fallback for images
  videoUrl?: string; // Optional video URL
  upvotes: number;
  downvotes: number;
  comments: number;
  depth: number;
}

export interface Branch {
  id: string;
  author: string;
  preview: string;
  votes: number;
  isRecommended?: boolean;
}

/**
 * Mock Stories Database
 * Following the example: "Quale outfit è migliore per l'autunno 2025?"
 * 
 * Structure:
 * Story 1 (root) -> has 5 branches (b1-b5)
 *   - main branch: Story 1 -> Story 2 -> Story 3
 *   - b1 branch: Story 1 -> Story b1-1 -> (4 branches)
 *   - b2 branch: Story 1 -> Story b2-1 -> (2 branches)
 *   - b3 branch: Story 1 -> Story b3-1 (1 branch)
 *   - b4 branch: Story 1 (no continuation)
 *   - b5 branch: Story 1 (no continuation)
 */

export const storiesById: Record<string, Story> = {
  // ROOT STORY - appears in all branches
  "1": {
    id: "1",
    parentId: null,
    branchId: "root",
    continuationId: null, // Different per branch - handled in navigation
    siblingBranches: [],
    author: "fashionista_maria",
    content: "Quale outfit è migliore per l'autunno 2025? 🍂 Creiamo un branch e poi aggiungete una domanda anche voi! Questo è il mio look preferito.",
    imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    upvotes: 1247,
    downvotes: 23,
    comments: 189,
    depth: 0,
  },

  // MAIN BRANCH CONTINUATION
  "2": {
    id: "2",
    parentId: "1",
    branchId: "main",
    continuationId: "3",
    siblingBranches: ["b1", "b2", "b3", "b4", "b5"],
    author: "style_guru_luca",
    content: "Perfetto! Per questo outfit, quale accessorio abbineresti? Io punto su una borsa vintage. Branch per le scarpe? 👟",
    imageUrl: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    upvotes: 892,
    downvotes: 15,
    comments: 134,
    depth: 1,
  },

  "3": {
    id: "3",
    parentId: "2",
    branchId: "main",
    continuationId: null,
    siblingBranches: ["main-b1", "main-b2", "main-b3", "main-b4", "main-b5", "main-b6", "main-b7", "main-b8"],
    author: "trendy_sofia",
    content: "Ecco le mie scarpe ideali! Ora la domanda è: quale colore per la giacca? 🧥",
    imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    upvotes: 654,
    downvotes: 8,
    comments: 98,
    depth: 2,
  },

  // BRANCH 1 (b1) - Sneakers bianche
  "b1-1": {
    id: "b1-1",
    parentId: "1",
    branchId: "b1",
    continuationId: null,
    siblingBranches: ["main", "b2", "b3", "b4", "b5"],
    author: "fashion_alex",
    content: "Sneakers bianche minimali sono perfette! 👟 Quale borsa ci abbineresti?",
    imageUrl: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    upvotes: 543,
    downvotes: 5,
    comments: 78,
    depth: 1,
  },

  // BRANCH 2 (b2) - Stivali chelsea
  "b2-1": {
    id: "b2-1",
    parentId: "1",
    branchId: "b2",
    continuationId: null,
    siblingBranches: ["main", "b1", "b3", "b4", "b5"],
    author: "style_emma",
    content: "Stivali chelsea neri per un look più elegante! Quale cappotto useresti? 🧥",
    imageUrl: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    upvotes: 421,
    downvotes: 8,
    comments: 56,
    depth: 1,
  },

  // BRANCH 3 (b3) - Loafers
  "b3-1": {
    id: "b3-1",
    parentId: "1",
    branchId: "b3",
    continuationId: null,
    siblingBranches: ["main", "b1", "b2", "b4", "b5"],
    author: "trend_marco",
    content: "Loafers marroni classici! Eleganza senza tempo. Quale cintura? 👔",
    imageUrl: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    upvotes: 387,
    downvotes: 4,
    comments: 45,
    depth: 1,
  },

  // BRANCH 4 (b4) - Ankle boots (no continuation)
  // Just shows story 1, no additional content

  // BRANCH 5 (b5) - Vintage sneakers (no continuation)
  // Just shows story 1, no additional content

  // SUB-BRANCHES from story 3 (main branch, depth 2)
  "main-b1": {
    id: "main-b1",
    parentId: "3",
    branchId: "main-b1",
    continuationId: null,
    siblingBranches: ["main-b2", "main-b3", "main-b4", "main-b5", "main-b6", "main-b7", "main-b8"],
    author: "jacket_lover_anna",
    content: "Giacca blu navy! Perfetta con le scarpe. Quale sciarpa? 🧣",
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
    upvotes: 234,
    downvotes: 3,
    comments: 34,
    depth: 3,
  },

  "main-b2": {
    id: "main-b2",
    parentId: "3",
    branchId: "main-b2",
    continuationId: null,
    siblingBranches: ["main-b1", "main-b3", "main-b4", "main-b5", "main-b6", "main-b7", "main-b8"],
    author: "color_expert_luca",
    content: "Giacca bordeaux per un tocco audace! 🍷 Quale borsetta?",
    imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    upvotes: 189,
    downvotes: 7,
    comments: 28,
    depth: 3,
  },

  "main-b3": {
    id: "main-b3",
    parentId: "3",
    branchId: "main-b3",
    continuationId: null,
    siblingBranches: ["main-b1", "main-b2", "main-b4", "main-b5", "main-b6", "main-b7", "main-b8"],
    author: "minimal_style",
    content: "Giacca beige minimalista. Semplice ma chic! 🤎",
    imageUrl: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80",
    upvotes: 156,
    downvotes: 2,
    comments: 19,
    depth: 3,
  },
};

/**
 * Branch metadata for navigation
 */
export const branches: Record<string, Branch> = {
  main: {
    id: "main",
    author: "style_guru_luca",
    preview: "Borsa vintage e scarpe classiche",
    votes: 892,
    isRecommended: true,
  },
  b1: {
    id: "b1",
    author: "fashion_alex",
    preview: "Sneakers bianche minimali",
    votes: 543,
    isRecommended: true,
  },
  b2: {
    id: "b2",
    author: "style_emma",
    preview: "Stivali chelsea neri",
    votes: 421,
    isRecommended: true,
  },
  b3: {
    id: "b3",
    author: "trend_marco",
    preview: "Loafers marroni classici",
    votes: 387,
  },
  b4: {
    id: "b4",
    author: "outfit_anna",
    preview: "Ankle boots con tacco",
    votes: 234,
  },
  b5: {
    id: "b5",
    author: "look_paolo",
    preview: "Scarpe da ginnastica vintage",
    votes: 189,
  },
  // Sub-branches from story 3
  "main-b1": {
    id: "main-b1",
    author: "jacket_lover_anna",
    preview: "Giacca blu navy",
    votes: 234,
    isRecommended: true,
  },
  "main-b2": {
    id: "main-b2",
    author: "color_expert_luca",
    preview: "Giacca bordeaux audace",
    votes: 189,
    isRecommended: true,
  },
  "main-b3": {
    id: "main-b3",
    author: "minimal_style",
    preview: "Giacca beige minimal",
    votes: 156,
    isRecommended: true,
  },
  "main-b4": {
    id: "main-b4",
    author: "trend_setter",
    preview: "Giacca nera classica",
    votes: 143,
  },
  "main-b5": {
    id: "main-b5",
    author: "fashion_forward",
    preview: "Giacca grigia moderna",
    votes: 121,
  },
  "main-b6": {
    id: "main-b6",
    author: "style_icon",
    preview: "Giacca verde oliva",
    votes: 98,
  },
  "main-b7": {
    id: "main-b7",
    author: "outfit_pro",
    preview: "Giacca marrone vintage",
    votes: 76,
  },
  "main-b8": {
    id: "main-b8",
    author: "look_master",
    preview: "Giacca bianca estiva",
    votes: 54,
  },
};

/**
 * Get the story path for a specific branch
 * Returns ordered array of story IDs from root to current position
 */
export function getBranchPath(branchId: string): string[] {
  if (branchId === "b4" || branchId === "b5") {
    // Branches with no continuation, just show root
    return ["1"];
  }

  if (branchId === "main") {
    return ["1", "2", "3"];
  }

  if (branchId === "b1") {
    return ["1", "b1-1"];
  }

  if (branchId === "b2") {
    return ["1", "b2-1"];
  }

  if (branchId === "b3") {
    return ["1", "b3-1"];
  }

  // Sub-branches from main
  if (branchId.startsWith("main-b")) {
    return ["1", "2", "3", branchId];
  }

  return ["1"];
}

/**
 * Get available sibling branches for current story
 */
export function getSiblingBranches(storyId: string): string[] {
  const story = storiesById[storyId];
  return story?.siblingBranches || [];
}

/**
 * Check if story has continuation down
 */
export function hasContinuation(storyId: string, branchId: string): boolean {
  const path = getBranchPath(branchId);
  const currentIndex = path.indexOf(storyId);
  return currentIndex !== -1 && currentIndex < path.length - 1;
}

/**
 * Get navigation hints for a story
 */
export function getNavigationHints(storyId: string, branchId: string) {
  const story = storiesById[storyId];
  const path = getBranchPath(branchId);
  const currentIndex = path.indexOf(storyId);

  return {
    hasContinuationDown: currentIndex !== -1 && currentIndex < path.length - 1,
    hasBranchesLeft: story?.siblingBranches.length > 0,
    hasBranchesRight: story?.siblingBranches.length > 0,
    branchCount: story?.siblingBranches.length || 0,
  };
}
