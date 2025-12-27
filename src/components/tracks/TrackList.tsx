import { usePlayer } from "@/contexts/PlayerContext";
import TrackCard from "./TrackCard";

const TrackList = () => {
  const { tracks } = usePlayer();

  return (
    <div className="space-y-2">
     
      <div className="flex items-center gap-4 px-3 py-2 text-sm text-muted-foreground border-b border-border/50">
        <div className="w-8 text-center">#</div>
        <div className="w-12" /> 
        <div className="flex-1">Title</div>
        <div className="hidden md:block flex-1">Album</div>
        <div className="w-12 text-right">Time</div>
      </div>

      <div className="space-y-1">
        {tracks.map((track, index) => (
          <TrackCard key={track.id} track={track} index={index} />
        ))}
      </div>

      {tracks.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No tracks available</p>
          <p className="text-sm mt-1">Add music files to /public/music to get started</p>
        </div>
      )}
    </div>
  );
};

export default TrackList;
