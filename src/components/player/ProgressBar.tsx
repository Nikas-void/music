import { usePlayer } from "@/contexts/PlayerContext";
import { Slider } from "@/components/ui/slider";

// Format seconds to mm:ss
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const ProgressBar = () => {
  const { currentTrack, currentTime, seek } = usePlayer();
  const duration = currentTrack?.duration || 0;

  const handleSeek = (value: number[]) => {
    seek(value[0]);
  };

  return (
    <div className="flex items-center gap-3 w-full max-w-xl">
      <span className="text-xs text-muted-foreground tabular-nums w-10 text-right">
        {formatTime(currentTime)}
      </span>
      <Slider
        value={[currentTime]}
        max={duration || 100}
        step={1}
        onValueChange={handleSeek}
        className="flex-1"
        disabled={!currentTrack}
      />
      <span className="text-xs text-muted-foreground tabular-nums w-10">
        {formatTime(duration)}
      </span>
    </div>
  );
};

export default ProgressBar;
