// OpenRouteService routing service
// Get a free API key at: https://openrouteservice.org/dev/#/signup
// Then paste it below. If left empty, the map falls back to a straight polyline.
export const ORS_API_KEY = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjQ5NDk4MWQ2MmRhYjQwNGU5NDk4ZTIwNzliYTE4OTZlIiwiaCI6Im11cm11cjY0In0=";

const ORS_BASE = "https://api.openrouteservice.org/v2/directions";

export type ORSProfile = "foot-walking" | "wheelchair";

export interface ORSRoute {
  /** Decoded [lat, lng] points for Leaflet polyline */
  coordinates: [number, number][];
  /** Distance in meters */
  distance: number;
  /** Duration in seconds */
  duration: number;
}

interface Coord {
  lat: number;
  lng: number;
}

/**
 * Fetch a real walking/wheelchair route from OpenRouteService.
 * Tries the requested profile first, falls back to foot-walking if needed.
 */
export async function fetchORSRoute(
  src: Coord,
  dst: Coord,
  profile: ORSProfile = "foot-walking"
): Promise<ORSRoute> {
  if (!ORS_API_KEY) {
    throw new Error("NO_API_KEY");
  }

  const tryProfile = async (p: ORSProfile): Promise<ORSRoute> => {
    const res = await fetch(`${ORS_BASE}/${p}/geojson`, {
      method: "POST",
      headers: {
        Authorization: ORS_API_KEY,
        "Content-Type": "application/json",
        Accept: "application/geo+json",
      },
      body: JSON.stringify({
        coordinates: [
          [src.lng, src.lat],
          [dst.lng, dst.lat],
        ],
        instructions: false,
      }),
    });

    if (!res.ok) {
      throw new Error(`ORS_${res.status}`);
    }

    const data = await res.json();
    const feature = data?.features?.[0];
    if (!feature) throw new Error("ORS_NO_ROUTE");

    // GeoJSON gives [lng, lat] — flip for Leaflet
    const coordinates: [number, number][] = feature.geometry.coordinates.map(
      ([lng, lat]: [number, number]) => [lat, lng]
    );
    const summary = feature.properties?.summary ?? {};

    return {
      coordinates,
      distance: summary.distance ?? 0,
      duration: summary.duration ?? 0,
    };
  };

  try {
    return await tryProfile(profile);
  } catch (e) {
    // Wheelchair profile sometimes fails on minor paths — fall back to walking
    if (profile === "wheelchair") {
      return await tryProfile("foot-walking");
    }
    throw e;
  }
}

export function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${(meters / 1000).toFixed(2)} km`;
}

export function formatDuration(seconds: number): string {
  const mins = Math.round(seconds / 60);
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}h ${m}m`;
}
