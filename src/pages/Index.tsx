import { useState, useEffect } from "react";
import StoryCard from "@/components/StoryCard";
import BranchNavigation from "@/components/BranchNavigation";

// Mock data for the prototype - structured by branches
const storyBranches = {
  main: [
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
  ],
  b1: [
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
      id: "b1-1",
      author: "fashion_alex",
      content: "Sneakers bianche minimali sono perfette! 👟 Quale borsa ci abbineresti?",
      imageUrl: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80",
      upvotes: 543,
      downvotes: 5,
      comments: 78,
      branches: 4,
      depth: 1,
    },
  ],
  b2: [
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
      id: "b2-1",
      author: "style_emma",
      content: "Stivali chelsea neri per un look più elegante! Quale cappotto useresti? 🧥",
      imageUrl: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80",
      upvotes: 421,
      downvotes: 8,
      comments: 56,
      branches: 2,
      depth: 1,
    },
  ],
  b3: [
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
  ],
  b4: [
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
  ],
  b5: [
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
  ],
};

const mockBranches = [
  {
    id: "main",
    author: "style_guru_luca",
    preview: "Borsa vintage e scarpe classiche",
    votes: 892,
    isRecommended: true,
  },
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
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [currentBranchId, setCurrentBranchId] = useState("main");
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [showBranches, setShowBranches] = useState(false);

  const currentBranchStories = storyBranches[currentBranchId as keyof typeof storyBranches] || [];
  const currentBranchIndex = mockBranches.findIndex(b => b.id === currentBranchId);

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
      if (deltaX > 0 && currentBranchIndex > 0) {
        const newBranch = mockBranches[currentBranchIndex - 1];
        setCurrentBranchId(newBranch.id);
        setCurrentStoryIndex(0);
      } else if (deltaX < 0 && currentBranchIndex < mockBranches.length - 1) {
        const newBranch = mockBranches[currentBranchIndex + 1];
        setCurrentBranchId(newBranch.id);
        setCurrentStoryIndex(0);
      }
    }
    // Vertical swipe (storyline)
    else if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
      if (deltaY > 0 && currentStoryIndex > 0) {
        setCurrentStoryIndex(currentStoryIndex - 1);
      } else if (deltaY < 0 && currentStoryIndex < currentBranchStories.length - 1) {
        setCurrentStoryIndex(currentStoryIndex + 1);
      }
    }

    setTouchStart(null);
  };

  // Arrow key navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && currentStoryIndex > 0) {
        setCurrentStoryIndex(currentStoryIndex - 1);
      } else if (e.key === 'ArrowDown' && currentStoryIndex < currentBranchStories.length - 1) {
        setCurrentStoryIndex(currentStoryIndex + 1);
      } else if (e.key === 'ArrowLeft' && currentBranchIndex > 0) {
        const newBranch = mockBranches[currentBranchIndex - 1];
        setCurrentBranchId(newBranch.id);
        setCurrentStoryIndex(0);
      } else if (e.key === 'ArrowRight' && currentBranchIndex < mockBranches.length - 1) {
        const newBranch = mockBranches[currentBranchIndex + 1];
        setCurrentBranchId(newBranch.id);
        setCurrentStoryIndex(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStoryIndex, currentBranchIndex, currentBranchStories.length]);

  const handleBranchSelect = (index: number) => {
    const selectedBranch = mockBranches[index];
    setCurrentBranchId(selectedBranch.id);
    setCurrentStoryIndex(0);
    setShowBranches(false);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      {/* Branch Toggle Button */}
      <button
        onClick={() => setShowBranches(!showBranches)}
        className="fixed left-4 top-1/2 -translate-y-1/2 z-50 bg-primary/90 hover:bg-primary text-primary-foreground p-3 rounded-full shadow-glow transition-all"
        aria-label="Toggle branches"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <line x1="6" y1="3" x2="6" y2="15"></line>
          <circle cx="18" cy="6" r="3"></circle>
          <circle cx="6" cy="18" r="3"></circle>
          <path d="M18 9a9 9 0 0 1-9 9"></path>
        </svg>
      </button>

      {/* Stories Container */}
      <div
        className="h-full w-full transition-transform duration-500 ease-smooth snap-y snap-mandatory overflow-y-auto"
        style={{
          scrollSnapType: "y mandatory",
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {currentBranchStories.map((story, index) => (
          <StoryCard
            key={story.id}
            {...story}
            id={story.id}
          />
        ))}
        
        {/* End of Branch Screen */}
        {currentBranchStories.length > 0 && (
          <div className="h-screen w-full snap-start flex items-center justify-center bg-gradient-to-b from-background via-background to-primary/5">
            <div className="text-center px-8 space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="40" 
                  height="40" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M12 5v14M5 12l7 7 7-7"/>
                </svg>
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">Fine del branch</h2>
                <p className="text-muted-foreground">Continua la storia con il tuo contenuto!</p>
              </div>

              <div className="flex flex-col gap-3 max-w-xs mx-auto">
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-4 rounded-xl font-semibold transition-all shadow-glow flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6"/>
                  </svg>
                  Aggiungi Video
                </button>
                
                <button className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-6 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="9" cy="9" r="2"/>
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                  </svg>
                  Aggiungi Foto
                </button>
              </div>

              <p className="text-sm text-muted-foreground pt-4">
                Oppure scorri su per vedere altri branch
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Branch Navigation */}
      {showBranches && (
        <BranchNavigation
          branches={mockBranches}
          currentBranch={currentBranchIndex}
          onBranchSelect={handleBranchSelect}
          onClose={() => setShowBranches(false)}
        />
      )}

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
