import { Link } from "react-router";
import { Button } from "./ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary hover:text-accent transition-colors">
          PGT Digital
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/select-role" className="text-foreground hover:text-accent transition-colors hidden md:block">
            Features
          </Link>
          <Link to="/select-role" className="text-foreground hover:text-accent transition-colors hidden md:block">
            About
          </Link>
          <Link to="/select-role">
            <Button className="bg-primary hover:bg-primary/90">Login / Sign Up</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
