import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Search,
  ArrowDown,
  Clock,
  Shield,
  Route as RouteIcon,
  Accessibility,
  ChevronRight,
  Navigation,
  Building2,
  Footprints,
  Loader2,
  Star,
  Milestone,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { getRoute, type RouteResponse } from "@/services/routeService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AccessibilityBadge } from "@/components/AccessibilityBadge";
import { VoiceNavButton } from "@/components/VoiceNavButton";
import { ReportIssueButton } from "@/components/ReportIssueButton";
import { LeafletMapView } from "@/components/LeafletMapView";

const filters = [
  { id: "ramps", label: "Prefer Ramps", icon: Accessibility },
  { id: "elevators", label: "Elevators", icon: Building2 },
  { id: "smooth", label: "Smooth Paths", icon: Footprints },
  { id: "nostairs", label: "Avoid Stairs", icon: Navigation },
  { id: "wheelchair", label: "Wheelchair Friendly", icon: Milestone },
];


const FindRoute = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>(["ramps", "smooth", "wheelchair"]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedRoute, setExpandedRoute] = useState<number | null>(null);
  const [apiResult, setApiResult] = useState<RouteResponse | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [fromBackend, setFromBackend] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showIssueBox, setShowIssueBox] = useState(false);
  const [issueText, setIssueText] = useState("");
  

  const speakDirections = (steps: string[]) => {
  if (!("speechSynthesis" in window)) {
    alert("Speech not supported in this browser");
    return;
  }

  if (!steps.length) {
    alert("No directions available");
    return;
  }

  // 🔁 Toggle behavior
  if (isSpeaking) {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    return;
  }

  window.speechSynthesis.cancel();
  setIsSpeaking(true);
  setCurrentStepIndex(0);

  const speakStep = (index: number) => {
    if (index >= steps.length) {
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(steps[index]);

    utterance.onend = () => {
      setCurrentStepIndex(index + 1);
      setTimeout(() => speakStep(index + 1), 800);
    };

    window.speechSynthesis.speak(utterance);
  };

  speakStep(0);
};

  const toggleFilter = (id: string) => {
    setActiveFilters((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleSearch = async () => {
    if (!origin.trim() || !destination.trim()) return;

    setIsLoading(true);
    setShowResults(false);
    setExpandedRoute(null);
    setApiError(null);
    setApiResult(null);
    setFromBackend(false);

    try {
      const result = await getRoute({
        source: origin,
        destination: destination,
        preferences: {
          avoidStairs: activeFilters.includes("nostairs"),
          preferRamps: activeFilters.includes("ramps"),
          wheelchair: activeFilters.includes("wheelchair"),
        },
      });
      setApiResult(result.data);
      setFromBackend(result.fromBackend);
      setShowResults(true);
    } catch (err: any) {
      setApiError(err.message || "Failed to fetch route. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-3">
              Find Your <span className="text-gradient">Accessible Route</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Enter your start and destination to discover barrier-free paths tailored to your needs
            </p>
          </motion.div>

          {/* Search Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto bg-card rounded-2xl border border-border shadow-elevated p-6 md:p-8 mb-8"
          >
            <div className="space-y-5">
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-success" />
                <Input
                  placeholder="Starting point (e.g., Central Station)"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="pl-12 h-14 text-base bg-secondary/50 border-border rounded-xl"
                  aria-label="Starting point"
                />
              </div>

              <div className="flex justify-center">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <ArrowDown className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>

              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent" />
                <Input
                  placeholder="Destination (e.g., City Hospital)"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="pl-12 h-14 text-base bg-secondary/50 border-border rounded-xl"
                  aria-label="Destination"
                />
              </div>

              {/* Accessibility Filters */}
              <div>
                <p className="text-base font-semibold text-foreground mb-3">Accessibility Preferences</p>
                <div className="flex flex-wrap gap-2">
                  {filters.map((f) => (
                    <AccessibilityBadge
                      key={f.id}
                      icon={f.icon}
                      label={f.label}
                      active={activeFilters.includes(f.id)}
                      onClick={() => toggleFilter(f.id)}
                    />
                  ))}
                </div>
              </div>

              <Button
                onClick={handleSearch}
                disabled={!origin || !destination || isLoading}
                className="w-full h-14 gradient-hero text-primary-foreground border-0 shadow-soft text-lg font-semibold rounded-xl disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                ) : (
                  <Search className="w-6 h-6 mr-2" />
                )}
                {isLoading ? "Finding Routes..." : "Find Accessible Route"}
              </Button>
            </div>
          </motion.div>

          {/* Action Buttons */}
        <div className="max-w-2xl mx-auto flex justify-center gap-4 mb-10">

          {/* 🔊 Voice Navigation */}
          <Button
            onClick={() => speakDirections(apiResult?.steps || [])}
            disabled={!apiResult}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-md text-sm font-semibold"
          >
            {isSpeaking ? "⛔ Stop Navigation" : "🔊 Start Voice Navigation"}
          </Button>

          {/* ⚠️ Report Issue */}
          <Button
            onClick={() => setShowIssueBox(!showIssueBox)}
            className="px-6 py-3 rounded-xl border border-warning text-warning"
          >
            ⚠️ Report Accessibility Issue
          </Button>

          {showIssueBox && (
            <div className="max-w-2xl mx-auto mt-6 p-4 border rounded-xl bg-muted/30 space-y-3">

              <textarea
                placeholder="Describe the accessibility issue (e.g., broken ramp, stairs without lift, etc.)"
                value={issueText}
                onChange={(e) => setIssueText(e.target.value)}
                className="w-full p-3 rounded-md border border-border focus:outline-none"
                rows={3}
              />

              <div className="flex justify-end gap-2">
                
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowIssueBox(false);
                    setIssueText("");
                  }}
                >
                  Cancel
                </Button>

                <Button
                  onClick={async () => {
                    if (!issueText.trim()) {
                      alert("Please enter an issue");
                      return;
                    }

                    try {
                      await fetch("http://127.0.0.1:5000/report-issue", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          location: destination,
                          issue: issueText,
                        }),
                      });

                      alert("Issue submitted successfully!");
                    } catch {
                      alert("Issue submitted (demo mode)");
                    }

                    setIssueText("");
                    setShowIssueBox(false);
                  }}
                >
                  Submit
                </Button>

              </div>
            </div>
          )}

        </div>
        </div>
      </section>

      {/* Loading State */}
      <AnimatePresence>
        {isLoading && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pb-16"
          >
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center py-16">
                <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto mb-6" />
                <p className="font-display text-xl font-semibold text-foreground mb-2">
                  Analyzing accessible routes...
                </p>
                <p className="text-muted-foreground">
                  Checking for ramps, elevators, smooth paths, and barrier-free crossings
                </p>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Map + Results */}
      {!isLoading && (
        <section className="pb-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Map Placeholder */}
              <div className="lg:col-span-3">
                <div className="rounded-2xl border border-border bg-secondary/20 overflow-hidden h-[420px] lg:h-[540px] relative">
                  <LeafletMapView
                    origin={origin}
                    destination={destination}
                    showRoute={showResults}
                    routeData={apiResult}
                  />
                </div>
              </div>

              {/* Route Results */}
              <div className="lg:col-span-2">
                {/* Error State */}
                {apiError && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-5 rounded-2xl border border-destructive/50 bg-destructive/5 mb-4"
                  >
                    <div className="flex items-center gap-2 text-destructive font-semibold mb-1">
                      <AlertTriangle className="w-5 h-5" />
                      Error
                    </div>
                    <p className="text-sm text-muted-foreground">{apiError}</p>
                  </motion.div>
                )}

                {showResults && apiResult ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    {/* API Route Result Card */}
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h3 className="font-display font-bold text-foreground text-xl">
                        Route Found
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full ${fromBackend ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'}`}>
                          {fromBackend ? '🟢 Live Backend' : '⚡ Simulated'}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-primary-foreground bg-primary px-3 py-1 rounded-full">
                          <Shield className="w-3 h-3" /> {apiResult.accessibility_score}% Accessible
                        </span>
                      </div>
                    </div>

                    {/* Route Description */}
                    <div className="p-5 rounded-2xl border border-primary bg-primary/5 shadow-soft">
                      <p className="text-sm font-semibold text-foreground mb-3">{apiResult.route}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {apiResult.time}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <RouteIcon className="w-4 h-4" />
                          {apiResult.distance}
                        </span>
                      </div>

                      {/* Features */}
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-success" /> Accessibility Features
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {apiResult.features.map((f) => (
                            <span
                              key={f}
                              className="text-xs bg-success/10 text-success px-2.5 py-1 rounded-lg font-medium"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Warnings */}
                      {apiResult.warnings.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5 text-warning" /> Warnings
                          </p>
                          {apiResult.warnings.map((w, i) => (
                            <p key={i} className="text-xs text-muted-foreground mb-1 pl-4">• {w}</p>
                          ))}
                        </div>
                      )}

                      {/* Step-by-step (expandable) */}
                      <div
                        onClick={() => setExpandedRoute(expandedRoute === 1 ? null : 1)}
                        className="cursor-pointer"
                      >
                        <div className="flex items-center text-primary text-sm font-semibold">
                          {expandedRoute === 1 ? "Hide Directions" : "View Step-by-Step Directions"}
                          <ChevronRight className={`w-4 h-4 ml-1 transition-transform ${expandedRoute === 1 ? "rotate-90" : ""}`} />
                        </div>
                        <AnimatePresence>
                          {expandedRoute === 1 && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-3 mt-3 border-t border-border space-y-2">
                                {isSpeaking && (
                                  <p className="text-center text-sm text-primary font-semibold mb-2">
                                    Step {currentStepIndex + 1} / {apiResult.steps.length}
                                  </p>
                                )}
                                {apiResult.steps.map((step, si) => (
                                  <div key={si} className="flex items-start gap-2">
                                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                                      {si + 1}
                                    </span>
                                    <p className="text-sm text-muted-foreground">{step}</p>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                ) : !isLoading && !apiError ? (
                  <div className="h-full flex items-center justify-center p-8">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-muted-foreground/40" />
                      </div>
                      <p className="font-display font-semibold text-foreground mb-1">No route selected</p>
                      <p className="text-muted-foreground text-sm">
                        Search for a route above to see accessible path recommendations here.
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default FindRoute;
