import { useState, useEffect, useRef } from "react";
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
import { homePageRootStories } from "@/data/homePageStories";
import { cn } from "@/lib/utils";

const Home = () => {
  const navigate = useNavigate();
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [voteStates, setVoteStates] = useState<
    Record<string, "up" | "down" | null>
  >({});

  const currentStory = homePageRootStories[currentStoryIndex];

  // Scroll to current story when index changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const storyElements = container.children;
      const targetStory = storyElements[currentStoryIndex] as HTMLElement;

      if (targetStory) {
        targetStory.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, [currentStoryIndex]);

  // Handle scroll snap detection
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollTop = container.scrollTop;
        const windowHeight = window.innerHeight;
        const newIndex = Math.round(scrollTop / windowHeight);

        if (
          newIndex !== currentStoryIndex &&
          newIndex >= 0 &&
          newIndex < homePageRootStories.length
        ) {
          setCurrentStoryIndex(newIndex);
        }
      }, 150);
    };

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [currentStoryIndex]);

  // Arrow key navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && currentStoryIndex > 0) {
        setCurrentStoryIndex(currentStoryIndex - 1);
      } else if (
        e.key === "ArrowDown" &&
        currentStoryIndex < homePageRootStories.length - 1
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

  const handleStoryClick = (storyId: string) => {
    navigate(`/story/${storyId}`);
  };

  if (homePageRootStories.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Nessuna storia disponibile</p>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      {/* Stories Container with Scroll */}
      <div
        ref={scrollContainerRef}
        className="h-full w-full snap-y snap-mandatory overflow-y-auto scroll-smooth"
        style={{
          scrollSnapType: "y mandatory",
          scrollBehavior: "smooth",
        }}
      >
        {homePageRootStories.map((story, index) => {
          const voteState = voteStates[story.id] || null;

          return (
            <div
              key={story.id}
              className="relative h-screen w-full snap-start snap-always"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${story.imageUrl})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
              </div>

              {/* Content Overlay */}
              <div
                className="relative h-full flex flex-col justify-between p-4 pb-24 cursor-pointer"
                onClick={() => handleStoryClick(story.id)}
              >
                {/* Top Bar - Story Counter */}
                <div className="flex items-center gap-2">
                  <div className="bg-card/80 backdrop-blur-md px-4 py-2 rounded-full">
                    <span className="text-sm font-medium text-primary">
                      {index + 1} / {homePageRootStories.length}
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
                        @{story.author}
                      </span>
                    </div>
                    <p className="text-foreground text-base leading-relaxed">
                      {story.content}
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
                  onClick={() => handleVote(story.id, "up")}
                  className="flex flex-col items-center gap-1 transition-transform hover:scale-110"
                >
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-colors",
                      voteState === "up"
                        ? "bg-primary shadow-glow"
                        : "bg-card/80"
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
                    {story.upvotes}
                  </span>
                </button>

                {/* Downvote */}
                <button
                  onClick={() => handleVote(story.id, "down")}
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
                    {story.downvotes}
                  </span>
                </button>

                {/* Comments */}
                <button className="flex flex-col items-center gap-1 transition-transform hover:scale-110">
                  <div className="w-12 h-12 rounded-full bg-card/80 backdrop-blur-md flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-foreground" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    {story.comments}
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
                  onClick={() => handleStoryClick(story.id)}
                  className="flex flex-col items-center gap-1 transition-transform hover:scale-110"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-accent backdrop-blur-md flex items-center justify-center shadow-glow animate-pulse">
                    <GitBranch className="w-6 h-6 text-accent-foreground" />
                  </div>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Home;
