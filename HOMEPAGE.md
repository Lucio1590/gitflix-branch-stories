# Homepage Implementation

## Overview
The homepage displays a grid of story cards that users can browse and click to enter the story viewer.

## Structure

### Pages
- **`/`** - Homepage (`src/pages/Index.tsx`) - Story discovery grid
- **`/story/:storyId`** - Story Viewer (`src/pages/StoryViewer.tsx`) - Interactive story experience

### Components
- **`BottomNav`** (`src/components/BottomNav.tsx`) - Bottom navigation bar
  - Home
  - Scopri (Discover)
  - Crea (Create)
  - Profilo (Profile)

## Features

### Homepage (`/`)
- **Header**
  - "Scopri Storie" title
  - Search icon (placeholder)
  - Filter icon (placeholder)

- **Category Filters**
  - Tutti (All)
  - Popolari (Popular)
  - Recenti (Recent)
  - Mistero (Mystery)
  - Avventura (Adventure)

- **Story Grid**
  - 2-column responsive grid (1 column on mobile)
  - Each card shows:
    - Story image (4:5 aspect ratio)
    - Title
    - Description
    - Category badge
  - Hover effects:
    - Scale up (1.02x)
    - Image zoom (1.1x)
    - Shadow enhancement
    - Primary overlay

- **Bottom Navigation**
  - 4 tabs with icons and labels
  - Active state highlighting
  - Fixed at bottom of screen

### Story Viewer (`/story/:storyId`)
- **Back Button** (top-left)
  - Returns to homepage
  - Glass morphism effect
  
- **Story Navigation** (existing)
  - Vertical scroll for storyline
  - Horizontal scroll for branches
  - Visual indicators (arrows)

## Sample Stories
Currently showing 6 sample stories:
1. Il Mistero della Villa
2. Fuga da Neo-City
3. Codice Rosso
4. Il Tesoro Perduto
5. Outfit Autunno 2025
6. Caffè del Mattino

## Styling
- Dark theme with glass morphism
- Consistent with design mockup
- Tailwind CSS with shadcn/ui components
- Custom animations and transitions

## Navigation Flow
```
Homepage (/) 
  → Click story card
    → Story Viewer (/story/:storyId)
      → Click back button
        → Homepage (/)
```

## To Add More Stories
Edit `src/pages/Index.tsx` and add to the `storyCollections` array:

```typescript
{
  id: "unique-id",
  rootStoryId: "1", // Root story ID from mockStories.ts
  title: "Story Title",
  description: "Short description",
  category: "Mistero", // or "Popolari", "Recenti", "Avventura"
  imageUrl: "https://images.unsplash.com/...",
}
```

## Future Enhancements
- Implement search functionality
- Add filter options
- Connect to real story data
- Implement Crea and Profilo pages
- Add story metadata (views, likes, duration)
