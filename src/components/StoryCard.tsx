import { useState } from "react";
import {
  ArrowUp,
  ArrowDown,
  MessageCircle,
  Share2,
  GitBranch,
  User,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StoryCardProps {
  id: string;
  author: string;
  content: string;
  imageUrl: string;
  upvotes: number;
  downvotes: number;
  comments: number;
  branches: number;
  depth: number;
  hasContinuation?: boolean;
  hasBranchesLeft?: boolean;
  hasBranchesRight?: boolean;
}

const StoryCard = ({
  author,
  content,
  imageUrl,
  upvotes: initialUpvotes,
  downvotes: initialDownvotes,
  comments,
  branches,
  depth,
  hasContinuation = false,
  hasBranchesLeft = false,
  hasBranchesRight = false,
}: StoryCardProps) => {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [voteState, setVoteState] = useState<"up" | "down" | null>(null);

  const handleUpvote = () => {
    if (voteState === "up") {
      setUpvotes(upvotes - 1);
      setVoteState(null);
    } else if (voteState === "down") {
      setDownvotes(downvotes - 1);
      setUpvotes(upvotes + 1);
      setVoteState("up");
    } else {
      setUpvotes(upvotes + 1);
      setVoteState("up");
    }
  };

  const handleDownvote = () => {
    if (voteState === "down") {
      setDownvotes(downvotes - 1);
      setVoteState(null);
    } else if (voteState === "up") {
      setUpvotes(upvotes - 1);
      setDownvotes(downvotes + 1);
      setVoteState("down");
    } else {
      setDownvotes(downvotes + 1);
      setVoteState("down");
    }
  };

  return (
    <div className="relative h-screen w-full snap-start snap-always">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
      </div>

      {/* Content Overlay */}
      <div className="relative h-full flex flex-col justify-between p-4 pb-20">
        {/* Top Bar - Depth Indicator */}
        <div className="flex items-center gap-2">
          <div className="bg-card/80 backdrop-blur-md px-4 py-2 rounded-full">
            <span className="text-sm font-medium text-primary">
              Level {depth}
            </span>
          </div>
        </div>

        {/* Navigation Indicators */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {/* Down Continuation Indicator */}
          {hasContinuation && (
            <div className="absolute bottom-32 left-1/2 -translate-x-1/2 animate-bounce">
              <div className="bg-primary/90 backdrop-blur-md rounded-full p-3 shadow-glow">
                <ChevronDown className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
          )}

          {/* Left Branches Indicator */}
          {hasBranchesLeft && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 animate-pulse">
              <div className="bg-accent/90 backdrop-blur-md rounded-full p-2 shadow-glow">
                <ChevronLeft className="w-5 h-5 text-accent-foreground" />
              </div>
            </div>
          )}

          {/* Right Branches Indicator */}
          {hasBranchesRight && (
            <div className="absolute right-20 top-1/2 -translate-y-1/2 animate-pulse">
              <div className="bg-accent/90 backdrop-blur-md rounded-full p-2 shadow-glow">
                <ChevronRight className="w-5 h-5 text-accent-foreground" />
              </div>
            </div>
          )}
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
                @{author}
              </span>
            </div>
            <p className="text-foreground text-base leading-relaxed">
              {content}
            </p>
          </div>

          {/* Branch Info */}
          {branches > 0 && (
            <div className="flex items-center gap-2 text-primary">
              <GitBranch className="w-4 h-4" />
              <span className="text-sm font-medium">{branches} branches</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Bar */}
      <div className="absolute right-4 bottom-24 flex flex-col gap-6">
        {/* Upvote */}
        <button
          onClick={handleUpvote}
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
            {upvotes}
          </span>
        </button>

        {/* Downvote */}
        <button
          onClick={handleDownvote}
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
            {downvotes}
          </span>
        </button>

        {/* Comments */}
        <button className="flex flex-col items-center gap-1 transition-transform hover:scale-110">
          <div className="w-12 h-12 rounded-full bg-card/80 backdrop-blur-md flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-foreground" />
          </div>
          <span className="text-sm font-semibold text-foreground">
            {comments}
          </span>
        </button>

        {/* Share */}
        <button className="flex flex-col items-center gap-1 transition-transform hover:scale-110">
          <div className="w-12 h-12 rounded-full bg-card/80 backdrop-blur-md flex items-center justify-center">
            <Share2 className="w-6 h-6 text-foreground" />
          </div>
        </button>

        {/* Branch */}
        <button className="flex flex-col items-center gap-1 transition-transform hover:scale-110">
          <div className="w-12 h-12 rounded-full bg-gradient-accent backdrop-blur-md flex items-center justify-center shadow-glow">
            <GitBranch className="w-6 h-6 text-accent-foreground" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default StoryCard;
