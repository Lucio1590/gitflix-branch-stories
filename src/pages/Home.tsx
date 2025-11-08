import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowUp,
  ArrowDown,
  MessageCircle,
  Share2,
  GitBranch,
  User,
} from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { storiesById } from "@/data/mockStories";
import { cn } from "@/lib/utils";

// Get all root stories (Level 0 / parentId is null)
const rootStories = Object.values(storiesById).filter(
  (story) => story.parentId === null
);

// Sort by popularity (upvotes)
const popularRootStories = [...rootStories].sort(
  (a, b) => b.upvotes - a.upvotes
);

const Home = () => {
  const navigate = useNavigate();
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(
    null
  );
  const [voteStates, setVoteStates] = useState<
    Record<string, "up" | "down" | null>
  >({});

  const currentStory = popularRootStories[currentStoryIndex];

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

    const deltaY = touchEnd.y - touchStart.y;

    // Vertical swipe only
    if (Math.abs(deltaY) > 50) {
      if (deltaY > 0 && currentStoryIndex > 0) {
        setCurrentStoryIndex(currentStoryIndex - 1);
      } else if (
        deltaY < 0 &&
        currentStoryIndex < popularRootStories.length - 1
      ) {
        setCurrentStoryIndex(currentStoryIndex + 1);
      }
    }

    setTouchStart(null);
  };

  // Arrow key navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && currentStoryIndex > 0) {
        setCurrentStoryIndex(currentStoryIndex - 1);
      } else if (
        e.key === "ArrowDown" &&
        currentStoryIndex < popularRootStories.length - 1
      ) {
        setCurrentStoryIndex(currentStoryIndex + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStoryIndex]);

  const handleVote = (storyId: string, voteType: "up" | "down") => {
    setVoteStates((prev) => {
      const currentVote = prev[storyId];
      if (currentVote === voteType) {
        // Remove vote
        return { ...prev, [storyId]: null };
      } else {
        // Add or change vote
        return { ...prev, [storyId]: voteType };
      }
    });
  };

  const handleStoryClick = () => {
    navigate(`/story/${currentStory.id}`);
  };

  if (!currentStory) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Nessuna storia disponibile</p>
        <BottomNav />
      </div>
    );
  }

  const voteState = voteStates[currentStory.id] || null;

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      {/* Stories Container */}
      <div
        className="h-full w-full"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Story Card */}
        <div
          className="relative h-full w-full snap-start snap-always cursor-pointer"
          onClick={handleStoryClick}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${currentStory.imageUrl})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
          </div>

          {/* Content Overlay */}
          <div className="relative h-full flex flex-col justify-between p-4 pb-24">
            {/* Top Bar - Story Counter */}
            <div className="flex items-center gap-2">
              <div className="bg-card/80 backdrop-blur-md px-4 py-2 rounded-full">
                <span className="text-sm font-medium text-primary">
                  {currentStoryIndex + 1} / {popularRootStories.length}
                </span>
              </div>
            </div>

            {/* Bottom Content */}
            <div className="space-y-4">
              {/* Author & Content */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                    <User className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <span className="text-foreground font-semibold text-lg">
                    @{currentStory.author}
                  </span>
                </div>
                <p className="text-foreground text-base leading-relaxed">
                  {currentStory.content}
                </p>
              </div>

              {/* Branch Info */}
              <div className="flex items-center gap-2 text-accent">
                <GitBranch className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Tocca per esplorare i branch
                </span>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div
            className="absolute right-4 bottom-28 flex flex-col gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Upvote */}
            <button
              onClick={() => handleVote(currentStory.id, "up")}
              className="flex flex-col items-center gap-1 transition-transform hover:scale-110"
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-colors",
                  voteState === "up" ? "bg-primary shadow-glow" : "bg-card/80"
                )}
              >
                <ArrowUp
                  className={cn(
                    "w-6 h-6",
                    voteState === "up"
                      ? "text-primary-foreground"
                      : "text-foreground"
                  )}
                />
              </div>
              <span className="text-sm font-semibold text-foreground">
                {currentStory.upvotes}
              </span>
            </button>

            {/* Downvote */}
            <button
              onClick={() => handleVote(currentStory.id, "down")}
              className="flex flex-col items-center gap-1 transition-transform hover:scale-110"
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-colors",
                  voteState === "down" ? "bg-destructive" : "bg-card/80"
                )}
              >
                <ArrowDown
                  className={cn(
                    "w-6 h-6",
                    voteState === "down"
                      ? "text-destructive-foreground"
                      : "text-foreground"
                  )}
                />
              </div>
              <span className="text-sm font-semibold text-foreground">
                {currentStory.downvotes}
              </span>
            </button>

            {/* Comments */}
            <button className="flex flex-col items-center gap-1 transition-transform hover:scale-110">
              <div className="w-12 h-12 rounded-full bg-card/80 backdrop-blur-md flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-foreground" />
              </div>
              <span className="text-sm font-semibold text-foreground">
                {currentStory.comments}
              </span>
            </button>

            {/* Share */}
            <button className="flex flex-col items-center gap-1 transition-transform hover:scale-110">
              <div className="w-12 h-12 rounded-full bg-card/80 backdrop-blur-md flex items-center justify-center">
                <Share2 className="w-6 h-6 text-foreground" />
              </div>
            </button>

            {/* Branch - Highlighted */}
            <button
              onClick={handleStoryClick}
              className="flex flex-col items-center gap-1 transition-transform hover:scale-110"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-accent backdrop-blur-md flex items-center justify-center shadow-glow animate-pulse">
                <GitBranch className="w-6 h-6 text-accent-foreground" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Home;
