# Mock Data Structure

## Overview
All mock data is now organized in the `/src/data/` folder for better maintainability and reusability.

## Files

### `/src/data/homePageStories.ts`
Contains 5 complete story collections for the homepage feed, each with root stories and their branching narratives.

#### Story Collections:

1. **Mystery Villa** (`villaStories`)
   - Root: Villa mystery with key/letter/window choices
   - Upvotes: 2,847
   - Branches: 3 (key, letter, window)
   - Depth: Up to 2 levels

2. **Neo-City Escape** (`neoCityStories`)
   - Root: Cyberpunk job offer in 2145
   - Upvotes: 3,421
   - Branches: 3 (accept, ignore, trace)
   - Depth: Up to 2 levels

3. **Time Traveler's Dilemma** (`timeTravelStories`)
   - Root: Time machine with 3 era choices
   - Upvotes: 4,523 (MOST POPULAR)
   - Branches: 3 (1920, 2200, Year 0)
   - Depth: 1 level

4. **Deep Ocean Discovery** (`oceanStories`)
   - Root: Underwater structure discovery
   - Upvotes: 2,967
   - Branches: 3 (investigate, surface, record)
   - Depth: 1 level

5. **Magic Academy** (`magicStories`)
   - Root: Magic school specialization choice
   - Upvotes: 3,845
   - Branches: 3 (elemental, alchemy, divination)
   - Depth: 1 level

### `/src/data/mockStories.ts`
Original fashion/outfit story tree (used in StoryViewer examples).

## Data Structure

Each story follows this interface:
```typescript
interface Story {
  id: string;                    // Unique identifier
  parentId: string | null;       // Parent story (null for roots)
  branchId: string;              // Branch identifier
  continuationId: string | null; // Next story in sequence
  siblingBranches: string[];     // Alternative branches
  author: string;
  content: string;
  imageUrl: string;
  upvotes: number;
  downvotes: number;
  comments: number;
  depth: number;                 // 0 = root, 1+ = branches
}
```

## Usage

### Homepage Feed (`/home`)
```typescript
import { homePageRootStories } from "@/data/homePageStories";

// Already sorted by popularity (highest upvotes first)
// Contains only root stories (depth: 0)
```

### Discovery Page (`/`)
```typescript
import { homePageRootStories } from "@/data/homePageStories";

// Transform for grid display
const storyCollections = homePageRootStories.map(story => ({
  id: story.id,
  rootStoryId: story.id,
  title: extractTitle(story.content),
  description: story.content,
  category: categorize(story),
  imageUrl: story.imageUrl,
}));
```

### Story Viewer (`/story/:id`)
```typescript
import { allHomeStories } from "@/data/homePageStories";

// Access any story by ID
const story = allHomeStories[storyId];

// Navigate through branches
const nextStory = allHomeStories[story.continuationId];
const siblingBranch = allHomeStories[story.siblingBranches[0]];
```

## Statistics

- **Total root stories**: 5
- **Total stories**: 20+
- **Average branches per root**: 3
- **Max depth**: 2 levels
- **Total upvotes**: ~17,600
- **Total comments**: ~2,800

## Adding New Stories

1. Create a new story collection in `homePageStories.ts`:
```typescript
export const myStoryCollection: Record<string, Story> = {
  "my-root": {
    id: "my-root",
    parentId: null,
    branchId: "root",
    continuationId: null,
    siblingBranches: [],
    author: "author_name",
    content: "Your story content...",
    imageUrl: "https://...",
    upvotes: 1000,
    downvotes: 20,
    comments: 100,
    depth: 0,
  },
  // Add branches...
};
```

2. Add to combined data:
```typescript
export const allHomeStories: Record<string, Story> = {
  ...villaStories,
  ...neoCityStories,
  ...timeTravelStories,
  ...oceanStories,
  ...magicStories,
  ...myStoryCollection, // Add here
};
```

3. Add root to homepage feed:
```typescript
export const homePageRootStories = [
  allHomeStories["magic-root"],
  allHomeStories["time-root"],
  allHomeStories["neo-root"],
  allHomeStories["ocean-root"],
  allHomeStories["villa-root"],
  allHomeStories["my-root"], // Add here
].sort((a, b) => b.upvotes - a.upvotes);
```

## Image Sources
All images are from Unsplash (free to use):
- Villa/Mystery: Dark houses, keys, letters
- Neo-City: Cyberpunk cityscapes, neon lights
- Time Travel: Vintage/futuristic imagery
- Ocean: Underwater, submarines, ocean depths
- Magic: Fantasy, books, mystical imagery
