import { usePlayer } from "@/contexts/PlayerContext";
import { Music } from "lucide-react";

const NowPlaying = () => {
  const { currentTrack, isPlaying } = usePlayer();

  if (!currentTrack) {
    return (
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-14 h-14 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
          <Music className="w-6 h-6 text-muted-foreground" />
        </div>
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">No track selected</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 min-w-0">
      <div className="relative flex-shrink-0">
        <div
          className={`w-14 h-14 rounded-lg overflow-hidden shadow-card ${
            isPlaying ? "animate-pulse-glow" : ""
          }`}
        >
          <img
            src={currentTrack.coverUrl}
            alt={currentTrack.album}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg";
            }}
          />
        </div>
        {isPlaying && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center animate-pulse">
            <div className="w-2 h-2 bg-primary-foreground rounded-full" />
          </div>
        )}
      </div>
      <div className="min-w-0">
        <h4 className="font-medium text-foreground truncate">
          {currentTrack.title}
        </h4>
        <p className="text-sm text-muted-foreground truncate">
          {currentTrack.artist}
        </p>
      </div>
    </div>
  );
};

export default NowPlaying;
