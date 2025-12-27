import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { usePlayer } from "@/contexts/PlayerContext";
import { Track } from "@/types/music";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Trash2, Music, Edit2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const { isAdmin } = useAuth();
  const { tracks, setTracks } = usePlayer();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTrack, setNewTrack] = useState({
    title: "",
    artist: "",
    album: "",
    duration: "",
    coverUrl: "",
    audioUrl: "",
  });

  // Protect route - redirect to login if not admin
  useEffect(() => {
    if (!isAdmin) {
      navigate("/login");
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return null;
  }

  const handleAddTrack = (e: React.FormEvent) => {
    e.preventDefault();

    const track: Track = {
      id: Date.now().toString(),
      title: newTrack.title,
      artist: newTrack.artist,
      album: newTrack.album,
      duration: parseInt(newTrack.duration) || 180,
      coverUrl: newTrack.coverUrl || "/placeholder.svg",
      audioUrl: newTrack.audioUrl,
    };

    setTracks([...tracks, track]);
    setNewTrack({
      title: "",
      artist: "",
      album: "",
      duration: "",
      coverUrl: "",
      audioUrl: "",
    });
    setIsAddDialogOpen(false);

    toast({
      title: "Track added",
      description: `"${track.title}" has been added to the library.`,
    });
  };

  const handleRemoveTrack = (trackId: string, trackTitle: string) => {
    setTracks(tracks.filter((t) => t.id !== trackId));
    toast({
      title: "Track removed",
      description: `"${trackTitle}" has been removed from the library.`,
    });
  };

  return (
    <MainLayout>
      <section className="px-6 py-8">
        <div className="max-w-screen-xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 animate-fade-in">
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground mb-2">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage your music library. Changes are temporary and reset on
                page refresh.
              </p>
            </div>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Track
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-strong border-border/50">
                <DialogHeader>
                  <DialogTitle className="text-foreground font-display">
                    Add New Track
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddTrack} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={newTrack.title}
                      onChange={(e) =>
                        setNewTrack({ ...newTrack, title: e.target.value })
                      }
                      placeholder="Song title"
                      className="bg-secondary/50 border-border/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="artist">Artist *</Label>
                    <Input
                      id="artist"
                      value={newTrack.artist}
                      onChange={(e) =>
                        setNewTrack({ ...newTrack, artist: e.target.value })
                      }
                      placeholder="Artist name"
                      className="bg-secondary/50 border-border/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="album">Album</Label>
                    <Input
                      id="album"
                      value={newTrack.album}
                      onChange={(e) =>
                        setNewTrack({ ...newTrack, album: e.target.value })
                      }
                      placeholder="Album name"
                      className="bg-secondary/50 border-border/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (seconds)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={newTrack.duration}
                      onChange={(e) =>
                        setNewTrack({ ...newTrack, duration: e.target.value })
                      }
                      placeholder="180"
                      className="bg-secondary/50 border-border/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="audioUrl">Audio URL *</Label>
                    <Input
                      id="audioUrl"
                      value={newTrack.audioUrl}
                      onChange={(e) =>
                        setNewTrack({ ...newTrack, audioUrl: e.target.value })
                      }
                      placeholder="/music/track.mp3"
                      className="bg-secondary/50 border-border/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="coverUrl">Cover URL</Label>
                    <Input
                      id="coverUrl"
                      value={newTrack.coverUrl}
                      onChange={(e) =>
                        setNewTrack({ ...newTrack, coverUrl: e.target.value })
                      }
                      placeholder="/covers/cover.jpg"
                      className="bg-secondary/50 border-border/50"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Add Track
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Tracks table */}
          <div
            className="glass rounded-xl overflow-hidden animate-fade-up"
            style={{ animationDelay: "100ms" }}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                      Cover
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                      Title
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                      Artist
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden md:table-cell">
                      Album
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">
                      Audio Path
                    </th>
                    <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tracks.map((track, index) => (
                    <tr
                      key={track.id}
                      className="border-b border-border/30 hover:bg-secondary/30 transition-colors"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="p-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-secondary flex items-center justify-center">
                          <img
                            src={track.coverUrl}
                            alt={track.album}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                              e.currentTarget.nextElementSibling?.classList.remove(
                                "hidden"
                              );
                            }}
                          />
                          <Music className="w-5 h-5 text-muted-foreground hidden" />
                        </div>
                      </td>
                      <td className="p-4 font-medium text-foreground">
                        {track.title}
                      </td>
                      <td className="p-4 text-muted-foreground">
                        {track.artist}
                      </td>
                      <td className="p-4 text-muted-foreground hidden md:table-cell">
                        {track.album}
                      </td>
                      <td className="p-4 text-muted-foreground text-sm hidden sm:table-cell">
                        <code className="bg-secondary/50 px-2 py-1 rounded text-xs">
                          {track.audioUrl}
                        </code>
                      </td>
                      <td className="p-4 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() =>
                            handleRemoveTrack(track.id, track.title)
                          }
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {tracks.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Music className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No tracks in the library</p>
                <p className="text-sm mt-1">Click "Add Track" to get started</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Admin;
