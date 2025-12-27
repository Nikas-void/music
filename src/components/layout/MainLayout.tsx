import { ReactNode } from "react";
import Header from "./Header";
import MusicPlayer from "../player/MusicPlayer";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <Header />
      
      <main className="relative pb-32">
        {children}
      </main>

      <MusicPlayer />
    </div>
  );
};

export default MainLayout;
