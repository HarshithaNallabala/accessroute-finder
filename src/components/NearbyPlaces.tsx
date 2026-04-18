import { motion } from "framer-motion";
import { Hospital, ArrowUpFromDot, Building2, ParkingCircle, Wifi, Coffee } from "lucide-react";

const places = [
  { icon: Hospital, name: "City Hospital", distance: "0.3 km", type: "Hospital", accessible: true },
  { icon: ArrowUpFromDot, name: "Metro Station Ramp", distance: "0.5 km", type: "Ramp Access", accessible: true },
  { icon: Building2, name: "Central Mall Elevator", distance: "0.7 km", type: "Elevator", accessible: true },
  { icon: ParkingCircle, name: "Accessible Parking Lot", distance: "0.2 km", type: "Parking", accessible: true },
  { icon: Coffee, name: "Café Inclusive", distance: "0.4 km", type: "Restaurant", accessible: true },
  { icon: Wifi, name: "Public WiFi Zone", distance: "0.1 km", type: "Amenity", accessible: true },
];

export function NearbyPlaces() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Nearby <span className="text-gradient">Accessible Places</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Discover wheelchair-friendly locations, ramps, elevators, and essential services near you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {places.map((place, i) => (
            <motion.div
              key={place.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="group flex items-center gap-4 p-5 rounded-2xl bg-card border border-border shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <place.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="min-w-0">
                <h3 className="font-display font-semibold text-foreground text-base truncate">{place.name}</h3>
                <p className="text-sm text-muted-foreground">{place.type} · {place.distance}</p>
              </div>
              {place.accessible && (
                <span className="ml-auto shrink-0 text-xs font-semibold text-success bg-success/10 px-2 py-1 rounded-full">
                  ♿ Accessible
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
