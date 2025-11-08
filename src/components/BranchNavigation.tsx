import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface Branch {
  id: string;
  author: string;
  preview: string;
  votes: number;
  isRecommended?: boolean;
}

interface BranchNavigationProps {
  branches: Branch[];
  currentBranch: number;
  onBranchSelect: (index: number) => void;
  onClose: () => void;
}

const BranchNavigation = ({ branches, currentBranch, onBranchSelect, onClose }: BranchNavigationProps) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  if (branches.length === 0) return null;

  // Mouse wheel navigation
  React.useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (scrollRef.current) {
        e.preventDefault();
        scrollRef.current.scrollLeft += e.deltaY;
      }
    };

    const element = scrollRef.current;
    if (element) {
      element.addEventListener('wheel', handleWheel, { passive: false });
      return () => element.removeEventListener('wheel', handleWheel);
    }
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/95 to-transparent backdrop-blur-lg border-t border-border/50 z-50 animate-in slide-in-from-bottom duration-300">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">Branch Options</h3>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">
              {currentBranch + 1} / {branches.length}
            </span>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close branches"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        <ScrollArea className="w-full">
          <div ref={scrollRef} className="flex gap-3 pb-2">
            {branches.map((branch, index) => (
              <button
                key={branch.id}
                onClick={() => onBranchSelect(index)}
                className={`
                  relative flex-shrink-0 w-32 h-44 rounded-xl overflow-hidden
                  transition-all duration-300 ease-smooth
                  ${
                    currentBranch === index
                      ? "ring-2 ring-primary shadow-glow scale-105"
                      : "opacity-70 hover:opacity-100"
                  }
                `}
              >
                {/* Preview Image */}
                <div className="absolute inset-0 bg-secondary" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

                {/* Recommended Badge */}
                {branch.isRecommended && (
                  <div className="absolute top-2 left-2 bg-primary px-2 py-1 rounded-md">
                    <span className="text-xs font-semibold text-primary-foreground">For You</span>
                  </div>
                )}

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-3 space-y-1">
                  <p className="text-xs font-medium text-foreground truncate">@{branch.author}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{branch.preview}</p>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-semibold text-primary">{branch.votes} votes</span>
                  </div>
                </div>

                {/* Current Indicator */}
                {currentBranch === index && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-primary" />
                )}
              </button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* Navigation Hints */}
        <div className="flex items-center justify-center gap-4 mt-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <ChevronLeft className="w-4 h-4" />
            <span>Swipe to browse branches</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchNavigation;
