import { Track } from "@/types/music";
import { usePlayer } from "@/contexts/PlayerContext";
import { Play, Pause, Music } from "lucide-react";

interface TrackCardProps {
  track: Track;
  index: number;
}

// Format seconds to mm:ss
const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const TrackCard = ({ track, index }: TrackCardProps) => {
  const { currentTrack, isPlaying, playTrack, togglePlay } = usePlayer();
  const isCurrentTrack = currentTrack?.id === track.id;
  const isCurrentlyPlaying = isCurrentTrack && isPlaying;

  const handleClick = () => {
    if (isCurrentTrack) {
      togglePlay();
    } else {
      playTrack(track);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`group flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300 hover-lift ${
        isCurrentTrack
          ? "bg-primary/10 border border-primary/20"
          : "hover:bg-secondary/50"
      }`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Track number / Play button */}
      <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
        <span
          className={`text-sm tabular-nums ${
            isCurrentTrack ? "text-primary" : "text-muted-foreground"
          } group-hover:hidden`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div
          className={`hidden group-hover:flex items-center justify-center w-8 h-8 rounded-full ${
            isCurrentlyPlaying ? "bg-primary" : "bg-foreground"
          }`}
        >
          {isCurrentlyPlaying ? (
            <Pause className="w-4 h-4 text-primary-foreground" fill="currentColor" />
          ) : (
            <Play className="w-4 h-4 text-background ml-0.5" fill="currentColor" />
          )}
        </div>
      </div>

      {/* Album cover */}
      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 shadow-card">
        <img
          src={track.coverUrl}
          alt={track.album}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isCurrentlyPlaying ? "scale-110" : "group-hover:scale-105"
          }`}
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg";
          }}
        />
        {isCurrentlyPlaying && (
          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
            <div className="flex gap-0.5">
              <div className="w-0.5 h-3 bg-primary animate-pulse" style={{ animationDelay: "0ms" }} />
              <div className="w-0.5 h-4 bg-primary animate-pulse" style={{ animationDelay: "150ms" }} />
              <div className="w-0.5 h-2 bg-primary animate-pulse" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
      </div>

      {/* Track info */}
      <div className="flex-1 min-w-0">
        <h3
          className={`font-medium truncate transition-colors ${
            isCurrentTrack ? "text-primary" : "text-foreground"
          }`}
        >
          {track.title}
        </h3>
        <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
      </div>

      {/* Album name */}
      <div className="hidden md:block flex-1 min-w-0">
        <p className="text-sm text-muted-foreground truncate">{track.album}</p>
      </div>

      {/* Duration */}
      <div className="text-sm text-muted-foreground tabular-nums">
        {formatDuration(track.duration)}
      </div>
    </div>
  );
};

export default TrackCard;
