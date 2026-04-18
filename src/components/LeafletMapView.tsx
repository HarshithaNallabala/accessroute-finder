import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Loader2, AlertTriangle, Navigation } from "lucide-react";
import type { RouteResponse } from "@/services/routeService";
import {
  fetchORSRoute,
  formatDistance,
  formatDuration,
  ORS_API_KEY,
} from "@/services/orsRouting";

// Fix default marker icon paths (Leaflet + bundlers issue)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const DEFAULT_CENTER: L.LatLngExpression = [20.5937, 78.9629]; // India
const DEFAULT_ZOOM = 5;

interface LeafletMapViewProps {
  origin: string;
  destination: string;
  showRoute: boolean;
  routeData: RouteResponse | null;
  preferWheelchair?: boolean;
}

interface GeoPoint {
  lat: number;
  lng: number;
  label: string;
}

/** Free geocoding via OpenStreetMap Nominatim — no API key required */
/** Free geocoding via OpenStreetMap Nominatim — no API key required */
async function geocode(query: string): Promise<GeoPoint | null> {
  try {
    // ✅ Make location more specific (fix for nearby places)
    const formattedQuery = query + ", Andhra Pradesh, India";

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=in&q=${encodeURIComponent(formattedQuery)}`,
      { headers: { Accept: "application/json" } }
    );

    if (!res.ok) return null;

    const data = await res.json();

    if (!data.length) return null;

    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
      label: data[0].display_name,
    };
  } catch {
    return null;
  }
}

const coloredIcon = (color: string) =>
  L.divIcon({
    className: "",
    html: `<div style="background:${color};width:20px;height:20px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });

export function LeafletMapView({
  origin,
  destination,
  showRoute,
  routeData,
  preferWheelchair = true,
}: LeafletMapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const layerGroup = useRef<L.LayerGroup | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usingRealRoute, setUsingRealRoute] = useState(false);

  // Init map once
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    mapInstance.current = L.map(mapRef.current, {
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(mapInstance.current);

    layerGroup.current = L.layerGroup().addTo(mapInstance.current);

    setTimeout(() => mapInstance.current?.invalidateSize(), 100);

    return () => {
      mapInstance.current?.remove();
      mapInstance.current = null;
    };
  }, []);

  // Draw route when requested
  useEffect(() => {
    const map = mapInstance.current;
    const group = layerGroup.current;
    if (!map || !group) return;

    group.clearLayers();
    setError(null);
    setUsingRealRoute(false);

    if (!showRoute || !origin || !destination) {
      map.setView(DEFAULT_CENTER, DEFAULT_ZOOM);
      return;
    }

    let cancelled = false;

    (async () => {
      setLoading(true);

      // 1. Geocode both endpoints
      const [src, dst] = await Promise.all([geocode(origin), geocode(destination)]);
      if (cancelled) return;

      if (!src || !dst) {
        setLoading(false);
        setError(
          !src && !dst
            ? "Could not locate either point. Try more specific names."
            : !src
            ? `Could not find "${origin}".`
            : `Could not find "${destination}".`
        );
        return;
      }

      // 2. Try OpenRouteService for a real route
      let routeCoords: [number, number][] = [
        [src.lat, src.lng],
        [dst.lat, dst.lng],
      ];
      let realDistance: number | null = null;
      let realDuration: number | null = null;
      let isReal = false;

      try {
        const ors = await fetchORSRoute(
          { lat: src.lat, lng: src.lng },
          { lat: dst.lat, lng: dst.lng },
          preferWheelchair ? "wheelchair" : "foot-walking"
        );
        if (cancelled) return;
        routeCoords = ors.coordinates;
        realDistance = ors.distance;
        realDuration = ors.duration;
        isReal = true;
      } catch (e: any) {
        if (e?.message !== "NO_API_KEY") {
          // Soft warning but continue with straight line
          setError("Routing service unavailable — showing straight-line path.");
        }
      }

      if (cancelled) return;
      setLoading(false);
      setUsingRealRoute(isReal);

      // 3. Source marker
      L.marker([src.lat, src.lng], { icon: coloredIcon("hsl(142 70% 45%)") })
        .bindPopup(`<strong>Start Location</strong><br/>${origin}`)
        .addTo(group);

      // 4. Destination marker with rich popup
      const realInfo =
        isReal && realDistance != null && realDuration != null
          ? `<div style="margin-top:6px;padding:6px;background:#eff6ff;border-radius:6px;font-size:12px">
               🛣️ <strong>Real route:</strong> ${formatDistance(realDistance)} • ${formatDuration(realDuration)}
             </div>`
          : "";

      const destPopup = routeData
        ? `<div style="font-family:system-ui;max-width:260px">
            <strong>End Location</strong><br/>
            <span style="color:#444">${destination}</span><br/>
            <hr style="margin:6px 0;border-color:#eee"/>
            🕐 ${routeData.time} &nbsp; 📏 ${routeData.distance}<br/>
            ♿ Score: <strong>${routeData.accessibility_score}%</strong>
            <div style="margin-top:6px;font-size:12px;color:#16a34a">
              ${routeData.features.slice(0, 3).map((f) => `✅ ${f}`).join("<br/>")}
            </div>
            ${realInfo}
          </div>`
        : `<div style="font-family:system-ui;max-width:260px">
             <strong>End Location</strong><br/>${destination}
             ${realInfo}
           </div>`;

      const destMarker = L.marker([dst.lat, dst.lng], { icon: coloredIcon("hsl(0 75% 55%)") })
        .bindPopup(destPopup)
        .addTo(group);

      // 5. Polyline — solid for real route, dashed for fallback
      L.polyline(routeCoords, {
        color: "hsl(217 91% 60%)",
        weight: 5,
        opacity: 0.85,
        dashArray: isReal ? undefined : "8, 6",
      }).addTo(group);

      // 6. Fit bounds
      const bounds = L.latLngBounds(routeCoords);
      map.fitBounds(bounds, { padding: [50, 50] });
      destMarker.openPopup();
    })();

    return () => {
      cancelled = true;
    };
  }, [showRoute, origin, destination, routeData, preferWheelchair]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full rounded-2xl" style={{ zIndex: 0 }} />

      {loading && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-card text-foreground text-sm px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 z-[1000]">
          <Loader2 className="w-4 h-4 animate-spin" />
          {ORS_API_KEY ? "Calculating real route..." : "Locating places..."}
        </div>
      )}

      {error && (
        <div className="absolute bottom-4 left-4 right-4 bg-destructive/90 text-destructive-foreground text-sm px-4 py-3 rounded-xl shadow-lg flex items-start gap-2 z-[1000]">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {!showRoute && (
        <div className="absolute top-4 left-4 bg-card/95 backdrop-blur text-foreground text-xs px-3 py-2 rounded-lg shadow-md flex items-center gap-2 z-[1000]">
          <Navigation className="w-3.5 h-3.5 text-primary" />
          {ORS_API_KEY
            ? "Real routing via OpenRouteService"
            : "Add ORS API key for real routes"}
        </div>
      )}

      {showRoute && usingRealRoute && (
        <div className="absolute top-4 left-4 bg-success/95 text-success-foreground text-xs font-semibold px-3 py-2 rounded-lg shadow-md flex items-center gap-2 z-[1000]">
          🛣️ Real route active
        </div>
      )}
    </div>
  );
}
