import { usePlayer } from "@/contexts/PlayerContext";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Volume2, Volume1, VolumeX } from "lucide-react";

const VolumeControl = () => {
  const { volume, isMuted, setVolume, toggleMute } = usePlayer();

  const VolumeIcon = isMuted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="w-9 h-9 text-muted-foreground hover:text-foreground transition-colors"
        onClick={toggleMute}
      >
        <VolumeIcon className="w-5 h-5" />
      </Button>
      <Slider
        value={[isMuted ? 0 : volume]}
        max={1}
        step={0.01}
        onValueChange={(value) => setVolume(value[0])}
        className="w-24"
      />
    </div>
  );
};

export default VolumeControl;
