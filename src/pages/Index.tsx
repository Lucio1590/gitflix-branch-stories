import { useState } from "react";
import StoryCard from "@/components/StoryCard";
import BranchNavigation from "@/components/BranchNavigation";

// Mock data for the prototype
const mockStories = [
  {
    id: "1",
    author: "fashionista_maria",
    content: "Quale outfit è migliore per l'autunno 2025? 🍂 Creiamo un branch e poi aggiungete una domanda anche voi! Questo è il mio look preferito.",
    imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
    upvotes: 1247,
    downvotes: 23,
    comments: 189,
    branches: 5,
    depth: 0,
  },
  {
    id: "2",
    author: "style_guru_luca",
    content: "Perfetto! Per questo outfit, quale accessorio abbineresti? Io punto su una borsa vintage. Branch per le scarpe? 👟",
    imageUrl: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80",
    upvotes: 892,
    downvotes: 15,
    comments: 134,
    branches: 8,
    depth: 1,
  },
  {
    id: "3",
    author: "trendy_sofia",
    content: "Ecco le mie scarpe ideali! Ora la domanda è: quale colore per la giacca? 🧥",
    imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80",
    upvotes: 654,
    downvotes: 8,
    comments: 98,
    branches: 3,
    depth: 2,
  },
];

const mockBranches = [
  {
    id: "b1",
    author: "fashion_alex",
    preview: "Sneakers bianche minimali",
    votes: 543,
    isRecommended: true,
  },
  {
    id: "b2",
    author: "style_emma",
    preview: "Stivali chelsea neri",
    votes: 421,
    isRecommended: true,
  },
  {
    id: "b3",
    author: "trend_marco",
    preview: "Loafers marroni classici",
    votes: 387,
    isRecommended: true,
  },
  {
    id: "b4",
    author: "outfit_anna",
    preview: "Ankle boots con tacco",
    votes: 234,
  },
  {
    id: "b5",
    author: "look_paolo",
    preview: "Scarpe da ginnastica vintage",
    votes: 189,
  },
];

const Index = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [currentBranch, setCurrentBranch] = useState(0);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
    };

    const deltaX = touchEnd.x - touchStart.x;
    const deltaY = touchEnd.y - touchStart.y;

    // Horizontal swipe (branches)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0 && currentBranch > 0) {
        setCurrentBranch(currentBranch - 1);
      } else if (deltaX < 0 && currentBranch < mockBranches.length - 1) {
        setCurrentBranch(currentBranch + 1);
      }
    }
    // Vertical swipe (storyline)
    else if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
      if (deltaY > 0 && currentStory > 0) {
        setCurrentStory(currentStory - 1);
      } else if (deltaY < 0 && currentStory < mockStories.length - 1) {
        setCurrentStory(currentStory + 1);
      }
    }

    setTouchStart(null);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      {/* Stories Container */}
      <div
        className="h-full w-full transition-transform duration-500 ease-smooth snap-y snap-mandatory overflow-y-auto"
        style={{
          scrollSnapType: "y mandatory",
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {mockStories.map((story, index) => (
          <StoryCard
            key={story.id}
            {...story}
            id={story.id}
          />
        ))}
      </div>

      {/* Branch Navigation */}
      <BranchNavigation
        branches={mockBranches}
        currentBranch={currentBranch}
        onBranchSelect={setCurrentBranch}
      />

      {/* Tutorial Overlay (shown on first load) */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
        <div className="bg-card/90 backdrop-blur-lg px-6 py-3 rounded-full border border-border/50 shadow-card">
          <p className="text-sm font-medium text-foreground text-center">
            ↕️ Scorri verticalmente per la storyline
            <br />
            ↔️ Scorri orizzontalmente per i branch
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
