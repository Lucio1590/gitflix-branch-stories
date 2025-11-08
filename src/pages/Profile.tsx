import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, MessageCircle, TrendingUp, Calendar, Users, BookOpen, GitBranch } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { currentUser, userCreatedStories, userParticipatedStories, UserStory } from "@/data/mockUser";
import { cn } from "@/lib/utils";

type TabType = "created" | "participated";

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("created");

  const handleStoryClick = (storyId: string) => {
    navigate(`/story/${storyId}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("it-IT", { day: "numeric", month: "short", year: "numeric" });
  };

  const StoryGrid = ({ stories }: { stories: UserStory[] }) => (
    <div className="grid grid-cols-2 gap-3 px-4 pb-4">
      {stories.map((story) => (
        <div
          key={story.storyId}
          onClick={() => handleStoryClick(story.storyId)}
          className="relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer group shadow-card hover:shadow-glow transition-all duration-300"
        >
          {/* Background Image */}
          <img
            src={story.imageUrl}
            alt={story.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          {/* Depth Badge */}
          {!story.isRoot && (
            <div className="absolute top-2 right-2 bg-primary/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
              <GitBranch className="w-3 h-3 text-primary-foreground" />
              <span className="text-xs font-semibold text-primary-foreground">L{story.depth}</span>
            </div>
          )}
          
          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-3 space-y-2">
            <h3 className="text-sm font-semibold text-white line-clamp-2">
              {story.title}
            </h3>
            
            {/* Stats */}
            <div className="flex items-center justify-between text-xs text-white/80">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  {story.upvotes.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" />
                  {story.comments}
                </span>
              </div>
              <span className="text-xs">
                {formatDate(story.createdAt)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5 pb-20">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed left-4 top-4 z-50 bg-background/80 hover:bg-background backdrop-blur-md p-3 rounded-full shadow-card transition-all"
        aria-label="Torna indietro"
      >
        <ArrowLeft className="w-6 h-6 text-foreground" />
      </button>

      {/* Profile Header */}
      <div className="pt-20 pb-6 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Avatar and Basic Info */}
          <div className="flex items-start gap-4 mb-6">
            <img
              src={currentUser.avatar}
              alt={currentUser.displayName}
              className="w-20 h-20 rounded-full object-cover ring-4 ring-primary/20 shadow-glow"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground mb-1">
                {currentUser.displayName}
              </h1>
              <p className="text-sm text-muted-foreground mb-2">
                @{currentUser.username}
              </p>
              <p className="text-sm text-foreground/80">
                {currentUser.bio}
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {/* Total Upvotes */}
            <div className="bg-card/50 backdrop-blur-md rounded-xl p-4 shadow-card border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">Upvotes Totali</span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {currentUser.totalUpvotes.toLocaleString()}
              </p>
            </div>

            {/* Total Comments */}
            <div className="bg-card/50 backdrop-blur-md rounded-xl p-4 shadow-card border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">Commenti</span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {currentUser.totalComments.toLocaleString()}
              </p>
            </div>

            {/* Stories Created */}
            <div className="bg-card/50 backdrop-blur-md rounded-xl p-4 shadow-card border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">Storie Create</span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {currentUser.storiesCreated}
              </p>
            </div>

            {/* Participated */}
            <div className="bg-card/50 backdrop-blur-md rounded-xl p-4 shadow-card border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <GitBranch className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">Partecipazioni</span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {currentUser.storiesParticipated}
              </p>
            </div>
          </div>

          {/* Followers/Following */}
          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground">
                <span className="font-bold">{currentUser.followersCount.toLocaleString()}</span>
                <span className="text-muted-foreground ml-1">follower</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground">
                <span className="font-bold">{currentUser.followingCount.toLocaleString()}</span>
                <span className="text-muted-foreground ml-1">seguiti</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Dal {formatDate(currentUser.joinedDate)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-2xl mx-auto px-4 flex gap-2">
          <button
            onClick={() => setActiveTab("created")}
            className={cn(
              "flex-1 py-4 text-sm font-semibold transition-all relative",
              activeTab === "created"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Storie Create
            {activeTab === "created" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-glow" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("participated")}
            className={cn(
              "flex-1 py-4 text-sm font-semibold transition-all relative",
              activeTab === "participated"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Partecipazioni
            {activeTab === "participated" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-glow" />
            )}
          </button>
        </div>
      </div>

      {/* Story Grid */}
      <div className="pt-4">
        {activeTab === "created" && (
          <>
            {userCreatedStories.length > 0 ? (
              <StoryGrid stories={userCreatedStories} />
            ) : (
              <div className="text-center py-12 px-4">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">
                  Non hai ancora creato nessuna storia
                </p>
              </div>
            )}
          </>
        )}

        {activeTab === "participated" && (
          <>
            {userParticipatedStories.length > 0 ? (
              <StoryGrid stories={userParticipatedStories} />
            ) : (
              <div className="text-center py-12 px-4">
                <GitBranch className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">
                  Non hai ancora partecipato a nessuna storia
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Profile;
