import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, MapPin, Accessibility } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { motion, AnimatePresence } from "framer-motion";
import { useAccessibility } from "@/contexts/AccessibilityContext";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Find Route", path: "/find-route" },
  { label: "Features", path: "/features" },
  { label: "About", path: "/about" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { accessibilityMode, toggleAccessibilityMode } = useAccessibility();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl gradient-hero flex items-center justify-center">
            <Accessibility className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg text-foreground">
            AccessRoute
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {/* Accessibility Mode Toggle */}
          <div className="flex items-center gap-2">
            <Accessibility className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">A11y</span>
            <Switch
              checked={accessibilityMode}
              onCheckedChange={toggleAccessibilityMode}
              aria-label="Toggle Accessibility Mode"
            />
          </div>

          <Link to="/find-route">
            <Button className="gradient-hero text-primary-foreground border-0 shadow-soft font-medium h-10 px-5">
              <MapPin className="w-4 h-4 mr-2" />
              Find Route
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-muted"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    location.pathname === link.path
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Accessibility Toggle */}
              <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-2">
                  <Accessibility className="w-5 h-5 text-primary" />
                  <span className="text-base font-medium text-foreground">Accessibility Mode</span>
                </div>
                <Switch
                  checked={accessibilityMode}
                  onCheckedChange={toggleAccessibilityMode}
                  aria-label="Toggle Accessibility Mode"
                />
              </div>

              <Link to="/find-route" onClick={() => setMobileOpen(false)}>
                <Button className="w-full gradient-hero text-primary-foreground border-0 mt-2 h-12 text-base">
                  <MapPin className="w-5 h-5 mr-2" />
                  Find Route
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Accessibility mode banner */}
      <div className="a11y-banner items-center justify-center gap-2 bg-primary text-primary-foreground text-sm font-semibold py-2 px-4 text-center">
        <Accessibility className="w-4 h-4 inline-block mr-1" />
        Accessibility Mode Active — Enhanced contrast, larger text, and stronger focus indicators
      </div>
    </nav>
  );
}
