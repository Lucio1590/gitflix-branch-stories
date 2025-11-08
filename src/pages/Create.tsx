import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Video, Image, Type, ArrowLeft } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { cn } from "@/lib/utils";

type ContentType = "video" | "photo" | "text" | null;

const Create = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<ContentType>(null);
  const [storyText, setStoryText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = () => {
    // TODO: Implement story submission logic
    console.log("Submitting story:", {
      type: selectedType,
      text: storyText,
      file: selectedFile,
    });

    // For now, just navigate back to home
    navigate("/");
  };

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

      {/* Main Content */}
      <div className="h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-md mx-auto">
          {/* Icon */}
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
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>

          {/* Title & Description */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">
              Crea una nuova storia
            </h2>
            <p className="text-muted-foreground">
              Condividi la tua creatività con la community!
            </p>
          </div>

          {/* Content Type Selection */}
          {!selectedType && (
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setSelectedType("video")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-4 rounded-xl font-semibold transition-all shadow-glow flex items-center justify-center gap-2"
              >
                <Video className="w-5 h-5" />
                Aggiungi Video
              </button>

              <button
                onClick={() => setSelectedType("photo")}
                className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-6 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Image className="w-5 h-5" />
                Aggiungi Foto
              </button>

              <button
                onClick={() => setSelectedType("text")}
                className="bg-accent hover:bg-accent/80 text-accent-foreground px-6 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Type className="w-5 h-5" />
                Solo Testo
              </button>
            </div>
          )}

          {/* Content Creation Form */}
          {selectedType && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
              {/* File Upload for Video/Photo */}
              {(selectedType === "video" || selectedType === "photo") && (
                <div className="relative">
                  <input
                    type="file"
                    accept={selectedType === "video" ? "video/*" : "image/*"}
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="block w-full bg-card/50 hover:bg-card/70 backdrop-blur-md border-2 border-dashed border-border rounded-xl p-8 cursor-pointer transition-all"
                  >
                    <div className="text-center">
                      {selectedFile ? (
                        <>
                          <div className="text-primary font-medium mb-2">
                            {selectedType === "video" ? "📹" : "🖼️"} File
                            selezionato
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {selectedFile.name}
                          </p>
                        </>
                      ) : (
                        <>
                          <div className="text-muted-foreground mb-2">
                            {selectedType === "video" ? (
                              <Video className="w-8 h-8 mx-auto mb-2" />
                            ) : (
                              <Image className="w-8 h-8 mx-auto mb-2" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Clicca per selezionare{" "}
                            {selectedType === "video" ? "un video" : "una foto"}
                          </p>
                        </>
                      )}
                    </div>
                  </label>
                </div>
              )}

              {/* Story Text */}
              <div>
                <textarea
                  value={storyText}
                  onChange={(e) => setStoryText(e.target.value)}
                  placeholder="Racconta la tua storia... Cosa succede? Poni una domanda per creare branch!"
                  className="w-full h-32 bg-card/50 backdrop-blur-md border border-border rounded-xl p-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  maxLength={500}
                />
                <div className="text-xs text-muted-foreground text-right mt-1">
                  {storyText.length}/500
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelectedType(null);
                    setSelectedFile(null);
                    setStoryText("");
                  }}
                  className="flex-1 bg-secondary hover:bg-secondary/80 text-secondary-foreground px-6 py-3 rounded-xl font-semibold transition-all"
                >
                  Annulla
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={
                    !storyText.trim() ||
                    ((selectedType === "video" || selectedType === "photo") &&
                      !selectedFile)
                  }
                  className={cn(
                    "flex-1 px-6 py-3 rounded-xl font-semibold transition-all",
                    !storyText.trim() ||
                      ((selectedType === "video" || selectedType === "photo") &&
                        !selectedFile)
                      ? "bg-muted text-muted-foreground cursor-not-allowed"
                      : "bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow"
                  )}
                >
                  Pubblica
                </button>
              </div>
            </div>
          )}

          {/* Helper Text */}
          <p className="text-sm text-muted-foreground pt-4">
            Le tue storie possono essere continuate da altri utenti
          </p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Create;
