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
}

const BranchNavigation = ({ branches, currentBranch, onBranchSelect }: BranchNavigationProps) => {
  if (branches.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/95 to-transparent backdrop-blur-lg border-t border-border/50 z-50">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">Branch Options</h3>
          <span className="text-xs text-muted-foreground">
            {currentBranch + 1} / {branches.length}
          </span>
        </div>

        <ScrollArea className="w-full">
          <div className="flex gap-3 pb-2">
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
