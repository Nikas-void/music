import { usePlayer } from "@/contexts/PlayerContext";
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";

const PlayerControls = () => {
  const { isPlaying, togglePlay, nextTrack, previousTrack, currentTrack } = usePlayer();

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="w-9 h-9 text-muted-foreground hover:text-foreground transition-colors"
      >
        <Shuffle className="w-4 h-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="w-10 h-10 text-foreground hover:text-primary transition-colors"
        onClick={previousTrack}
        disabled={!currentTrack}
      >
        <SkipBack className="w-5 h-5" />
      </Button>
      
      <Button
        variant="default"
        size="icon"
        className="w-12 h-12 rounded-full bg-foreground hover:bg-foreground/90 text-background shadow-glow transition-all hover:scale-105"
        onClick={togglePlay}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5" fill="currentColor" />
        ) : (
          <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
        )}
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="w-10 h-10 text-foreground hover:text-primary transition-colors"
        onClick={nextTrack}
        disabled={!currentTrack}
      >
        <SkipForward className="w-5 h-5" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="w-9 h-9 text-muted-foreground hover:text-foreground transition-colors"
      >
        <Repeat className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default PlayerControls;
