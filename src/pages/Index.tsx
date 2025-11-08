import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { cn } from "@/lib/utils";

// Story collections for homepage
const storyCollections = [
  {
    id: "villa-mistero",
    rootStoryId: "1",
    title: "Il Mistero della Villa",
    description: "Ti svegli in una stanza sconosciuta. Cosa fai?",
    category: "Mistero",
    imageUrl:
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
  },
  {
    id: "neo-city",
    rootStoryId: "1",
    title: "Fuga da Neo-City",
    description: "Un'offerta che non puoi rifiutare... o forse sì?",
    category: "Mistero",
    imageUrl:
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80",
  },
  {
    id: "codice-rosso",
    rootStoryId: "1",
    title: "Codice Rosso",
    description: "Hai 60 minuti per disinnescare la bomba.",
    category: "Mistero",
    imageUrl:
      "https://images.unsplash.com/photo-1551029506-0807df4e5a34?w=800&q=80",
  },
  {
    id: "tesoro-perduto",
    rootStoryId: "1",
    title: "Il Tesoro Perduto",
    description: "Una mappa antica ti guida verso la gloria.",
    category: "Avventura",
    imageUrl:
      "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&q=80",
  },
  {
    id: "fashion-autumn",
    rootStoryId: "1",
    title: "Outfit Autunno 2025",
    description: "Quale outfit è migliore per l'autunno?",
    category: "Popolari",
    imageUrl:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
  },
  {
    id: "coffee-shop",
    rootStoryId: "1",
    title: "Caffè del Mattino",
    description: "Incontri uno sconosciuto al bar...",
    category: "Recenti",
    imageUrl:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
  },
];

const categories = ["Tutti", "Popolari", "Recenti", "Mistero", "Avventura"];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tutti");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStories = storyCollections.filter((story) => {
    const matchesCategory =
      selectedCategory === "Tutti" || story.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-foreground">
              Scopri Storie
            </h1>
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-full hover:bg-accent transition-colors">
                <Search className="w-5 h-5 text-foreground" />
              </button>
              <button className="p-2 rounded-full hover:bg-accent transition-colors">
                <SlidersHorizontal className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap",
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Story Grid */}
      <main className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredStories.map((story) => (
            <Link
              key={story.id}
              to={`/story/${story.rootStoryId}`}
              className="group relative rounded-2xl overflow-hidden bg-card hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Story Image */}
              <div className="aspect-[4/5] relative overflow-hidden">
                <img
                  src={story.imageUrl}
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90" />
              </div>

              {/* Story Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                <h3 className="text-xl font-bold text-foreground line-clamp-2">
                  {story.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {story.description}
                </p>

                {/* Category Badge */}
                <div className="inline-block">
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/20 text-primary">
                    {story.category}
                  </span>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300 pointer-events-none" />
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredStories.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              Nessuna storia trovata
            </p>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Index;
