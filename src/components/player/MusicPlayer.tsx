import NowPlaying from "./NowPlaying";
import PlayerControls from "./PlayerControls";
import ProgressBar from "./ProgressBar";
import VolumeControl from "./VolumeControl";

const MusicPlayer = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-transparent pointer-events-none h-8 -top-8" />
      
      {/* Player bar */}
      <div className="glass-strong border-t border-border/50 px-4 py-3">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Now Playing */}
          <div className="flex-1 min-w-0 max-w-xs">
            <NowPlaying />
          </div>

          {/* Center: Controls & Progress */}
          <div className="flex flex-col items-center gap-2 flex-1 max-w-2xl">
            <PlayerControls />
            <ProgressBar />
          </div>

          {/* Right: Volume */}
          <div className="flex-1 flex justify-end max-w-xs">
            <VolumeControl />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
