import { Link } from "react-router";
import { Button } from "./ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/#hero" className="text-2xl font-bold text-primary hover:text-accent transition-colors">
          PGT Digital
        </a>
        <div className="flex items-center gap-6">
          <a href="/#features" className="text-foreground hover:text-accent transition-colors hidden md:block">
            Features
          </a>
          <a href="/#about" className="text-foreground hover:text-accent transition-colors hidden md:block">
            About
          </a>
          <Link to="/select-role">
            <Button className="bg-primary hover:bg-primary/90">Login / Sign Up</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
