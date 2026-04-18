import { Link } from "react-router-dom";
import { Accessibility, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
                <Accessibility className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-foreground">AccessRoute</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Making navigation accessible for everyone. Routes designed with safety, comfort, and independence in mind.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link>
              <Link to="/find-route" className="text-sm text-muted-foreground hover:text-primary transition-colors">Find Route</Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</Link>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Accessibility</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This platform is designed with WCAG guidelines in mind, ensuring usability for all individuals regardless of ability.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 AccessRoute. Academic Project — RGUKT RK Valley.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-accent fill-accent" /> for inclusivity
          </p>
        </div>
      </div>
    </footer>
  );
}
