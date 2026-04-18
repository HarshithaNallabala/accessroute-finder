import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Route,
  Shield,
  Accessibility,
  ArrowRight,
  Navigation,
  Building2,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FeatureCard } from "@/components/FeatureCard";
import { NearbyPlaces } from "@/components/NearbyPlaces";
import heroImage from "@/assets/hero-illustration.jpg";

const features = [
  {
    icon: Route,
    title: "Accessibility-First Routes",
    description:
      "Smart routing that prioritizes ramps, elevators, and smooth pathways over traditional shortest-path algorithms.",
  },
  {
    icon: Shield,
    title: "Barrier Avoidance",
    description:
      "Automatically detects and avoids stairs, steep slopes, and inaccessible areas to ensure safe navigation.",
  },
  {
    icon: Navigation,
    title: "Turn-by-Turn Guidance",
    description:
      "Clear, easy-to-follow directions with accessibility info at every step of your journey.",
  },
  {
    icon: Eye,
    title: "User-Friendly Interface",
    description:
      "Designed with WCAG guidelines for maximum usability regardless of ability or tech experience.",
  },
  {
    icon: Building2,
    title: "Indoor Navigation",
    description:
      "Navigate malls, campuses, and hospitals with detailed indoor maps and accessibility data.",
  },
  {
    icon: Accessibility,
    title: "Inclusive Design",
    description:
      "Supports independence and equal access to public spaces for wheelchair users and all individuals.",
  },
];

const stats = [
  { value: "100%", label: "Accessibility Focused" },
  { value: "24/7", label: "Available Anytime" },
  { value: "Safe", label: "Barrier-Free Routes" },
  { value: "Free", label: "Open for Everyone" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-surface opacity-60" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                <Accessibility className="w-4 h-4" />
                Inclusive Navigation for Everyone
              </div>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                Navigate the World{" "}
                <span className="text-gradient">Without Barriers</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-lg">
                Find accessible routes with ramps, elevators, and smooth
                pathways. Designed for wheelchair users and physically challenged
                individuals who deserve safe, independent navigation.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/find-route">
                  <Button
                    size="lg"
                    className="gradient-hero text-primary-foreground border-0 shadow-soft text-lg px-8 h-14 rounded-xl"
                  >
                    <MapPin className="w-5 h-5 mr-2" />
                    Find Accessible Route
                  </Button>
                </Link>
                <Link to="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 h-14 rounded-xl"
                  >
                    Learn More
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-elevated border border-border">
                <img
                  src={heroImage}
                  alt="Accessible city streets with ramps and wheelchair-friendly crossings"
                  className="w-full h-auto object-cover"
                  loading="eager"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-card rounded-xl p-4 shadow-elevated border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-success flex items-center justify-center">
                    <Shield className="w-6 h-6 text-success-foreground" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-foreground">Route Safe</p>
                    <p className="text-sm text-muted-foreground">100% Barrier-Free</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 border-y border-border bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl font-display font-bold text-primary">{stat.value}</p>
                <p className="text-base text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built for <span className="text-gradient">Accessibility</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Every feature is designed to make navigation safer, simpler, and
              more inclusive for people with disabilities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <FeatureCard key={feature.title} {...feature} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Accessible Places */}
      <NearbyPlaces />

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="gradient-hero rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent)]" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Navigate Freely?
              </h2>
              <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-8">
                Start finding accessible routes today. Safe, barrier-free
                navigation is just a click away.
              </p>
              <Link to="/find-route">
                <Button
                  size="lg"
                  className="bg-card text-foreground hover:bg-card/90 text-lg px-8 h-14 shadow-elevated rounded-xl"
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  Get Started Now
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
