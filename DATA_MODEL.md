# Story Data Model Documentation

## Overview
This document explains the new relationship-based data model for the GitFlix branch stories system.

## Data Structure

### Story Interface
Each story has the following properties:

```typescript
interface Story {
  id: string;                    // Unique identifier
  parentId: string | null;       // The story this continues from (null for root)
  branchId: string;              // Which branch this story belongs to
  continuationId: string | null; // The next story in this branch (null if end)
  siblingBranches: string[];     // Alternative branches at the same level
  author: string;
  content: string;
  imageUrl: string;
  upvotes: number;
  downvotes: number;
  comments: number;
  depth: number;                 // Level in the story tree (0 = root)
}
```

## Example: Fashion Outfit Story Tree

```
Story 1 (root) "Quale outfit è migliore per l'autunno 2025?"
├── main branch: Story 1 → Story 2 → Story 3
│   └── Story 3 has 8 sub-branches (main-b1 through main-b8)
├── b1 branch: Story 1 → Story b1-1 (Sneakers bianche)
├── b2 branch: Story 1 → Story b2-1 (Stivali chelsea)
├── b3 branch: Story 1 → Story b3-1 (Loafers)
├── b4 branch: Story 1 only (Ankle boots)
└── b5 branch: Story 1 only (Vintage sneakers)
```

## Navigation System

### Vertical Scrolling (Continuations)
- Follows the `continuationId` chain within a branch
- Uses `getBranchPath(branchId)` to get the ordered list of stories

### Horizontal Scrolling (Branches)
- Switches between `siblingBranches` at the same depth
- Each story knows its available sibling branches

### Visual Indicators
The `getNavigationHints()` function provides:
- `hasContinuationDown`: Shows ↓ indicator if there's a next story
- `hasBranchesLeft`: Shows ← indicator if there are branches to explore
- `hasBranchesRight`: Shows → indicator if there are branches to explore
- `branchCount`: Number of alternative branches available

## Helper Functions

### `getBranchPath(branchId: string): string[]`
Returns the ordered array of story IDs for a specific branch.

Example:
```typescript
getBranchPath("main") // Returns: ["1", "2", "3"]
getBranchPath("b1")   // Returns: ["1", "b1-1"]
```

### `getSiblingBranches(storyId: string): string[]`
Returns the available alternative branches for a story.

### `getNavigationHints(storyId: string, branchId: string)`
Returns navigation state for UI indicators:
```typescript
{
  hasContinuationDown: boolean,
  hasBranchesLeft: boolean,
  hasBranchesRight: boolean,
  branchCount: number
}
```

## Adding New Stories

To add a new story and branch:

1. Add the story to `storiesById` with proper relationships:
```typescript
"new-story-id": {
  id: "new-story-id",
  parentId: "parent-story-id",     // Which story this continues
  branchId: "new-branch",          // Branch identifier
  continuationId: "next-story-id", // Next in chain (or null)
  siblingBranches: ["other-branch-1", "other-branch-2"],
  // ... other properties
}
```

2. Add branch metadata to `branches`:
```typescript
"new-branch": {
  id: "new-branch",
  author: "username",
  preview: "Short description",
  votes: 0,
  isRecommended: false
}
```

3. Update `getBranchPath()` to include the new branch path

4. Update parent story's `siblingBranches` array to include the new branch

## Current Mock Data

The mock data implements the fashion outfit example:
- **1 root story** (outfit question)
- **5 first-level branches** (different shoe choices)
- **Main branch extends 2 more levels** (accessories → jacket)
- **8 sub-branches from story 3** (jacket color options)

Total stories: ~13 unique stories across all branches
