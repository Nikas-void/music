import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Music2, Settings, LogOut } from "lucide-react";

const Header = () => {
  const { isAdmin, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 glass-strong border-b border-border/50">
      <div className="max-w-screen-2xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-glow transition-transform group-hover:scale-105">
            <Music2 className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-display font-semibold text-foreground">
            Harmonia
          </span>
        </Link>

        
        <nav className="flex items-center gap-2">
          {isAdmin ? (
            <>
              <Link to="/admin">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  <Settings className="w-4 h-4 mr-2" />
                  Admin
                </Button>
              </Link>
              <Button
                variant="ghost"
                onClick={logout}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button variant="outline" className="border-border/50 hover:bg-secondary">
                Admin Login
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
