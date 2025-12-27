import MainLayout from "@/components/layout/MainLayout";
import TrackList from "@/components/tracks/TrackList";
import { usePlayer } from "@/contexts/PlayerContext";
import { Play, Disc3 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { tracks, playTrack, isPlaying, currentTrack, togglePlay } = usePlayer();

  const handlePlayAll = () => {
    if (tracks.length > 0) {
      if (currentTrack) {
        togglePlay();
      } else {
        playTrack(tracks[0]);
      }
    }
  };

  return (
    <MainLayout>
      {/* Hero section */}
      <section className="relative px-6 py-16 mb-8">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Hero image/icon */}
            <div className="relative">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shadow-elevated animate-fade-in">
                <Disc3 className={`w-24 h-24 md:w-32 md:h-32 text-primary ${isPlaying ? 'animate-spin-slow' : ''}`} />
              </div>
              <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl -z-10" />
            </div>

            {/* Hero content */}
            <div className="text-center md:text-left animate-fade-up" style={{ animationDelay: "100ms" }}>
              <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">
                Your Music Collection
              </p>
              <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4">
                All Tracks
              </h1>
              <p className="text-lg text-muted-foreground mb-6 max-w-md">
                {tracks.length} songs ready to play. Immerse yourself in your personal music library.
              </p>
              <Button
                onClick={handlePlayAll}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow transition-all hover:scale-105 px-8"
              >
                <Play className="w-5 h-5 mr-2" fill="currentColor" />
                {isPlaying ? "Now Playing" : "Play All"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Track list */}
      <section className="px-6">
        <div className="max-w-screen-2xl mx-auto animate-fade-in" style={{ animationDelay: "200ms" }}>
          <TrackList />
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
