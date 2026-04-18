/**
 * routeService.ts - Route API integration
 * 
 * Tries the real Flask backend first. If unavailable, falls back to
 * the built-in simulation so the app always works for demos.
 */

import { ROUTE_ENDPOINT } from "@/config/api";

// --- Types matching the API contract ---
export interface RouteRequest {
  source: string;
  destination: string;
  preferences: {
    avoidStairs: boolean;
    preferRamps: boolean;
    wheelchair: boolean;
  };
}

export interface RouteResponse {
  route: string;
  distance: string;
  time: string;
  features: string[];
  warnings: string[];
  steps: string[];
  accessibility_score: number;
}

export interface RouteResult {
  data: RouteResponse;
  /** true = came from Flask backend; false = frontend simulation */
  fromBackend: boolean;
}

// --- Dummy accessibility data (mirrors backend/data.json) ---
const accessibilityData = {
  accessible_features: {
    ramps: ["Central Station entrance", "City Hospital main gate", "Main Market south side"],
    elevators: ["Central Station platform 2", "City Hospital Block A", "Public Library floor access"],
    wheelchair_paths: ["Central Station to City Hospital via MG Road", "University Campus internal roads"],
    rest_areas: ["MG Road bench stop", "City Park rest shelter", "Main Market food court seating"],
  },
  warnings: {
    stairs_areas: ["Bridge near Main Market", "Old Town underpass", "University Campus Block C entrance"],
    construction_zones: ["MG Road section 2 (temporary)", "Park Avenue crossing"],
  },
};

/**
 * Simulation fallback (used when Flask is not running).
 */
function simulateRoute(request: RouteRequest): RouteResponse {
  const { source, destination, preferences } = request;
  const routeParts: string[] = [`Start from ${source}`];
  const features: string[] = [];
  const warnings: string[] = [];

  if (preferences.avoidStairs) {
    routeParts.push("Take the step-free path avoiding all stairways");
    features.push("Stairs avoided");
    accessibilityData.warnings.stairs_areas.slice(0, 2).forEach((area) => {
      warnings.push(`Stairs area avoided near ${area}`);
    });
  }

  if (preferences.preferRamps) {
    routeParts.push("Use accessible ramp at main crossing");
    features.push("Ramps available");
    accessibilityData.accessible_features.ramps.slice(0, 2).forEach((ramp) => {
      features.push(`Ramp at ${ramp}`);
    });
  }

  if (preferences.wheelchair) {
    routeParts.push("Follow wheelchair-accessible wide pathway");
    features.push("Wheelchair-friendly paths");
    features.push("Wide sidewalks (min 1.5m)");
    accessibilityData.accessible_features.wheelchair_paths.slice(0, 1).forEach((path) => {
      features.push(`Accessible path: ${path}`);
    });
  }

  features.push("Accessible toilets available en route");
  features.push("Rest areas with seating available");
  routeParts.push(`Arrive at ${destination}`);

  const distanceKm = Math.round((0.5 + Math.random() * 2) * 10) / 10;
  let timeMin = Math.round(distanceKm * (8 + Math.random() * 7));
  if (preferences.wheelchair) timeMin = Math.round(timeMin * 1.15);

  warnings.push(
    `Construction zone: ${accessibilityData.warnings.construction_zones[0]} - alternative path provided`
  );

  const distM = (n: number) => Math.round(distanceKm * n);

  return {
    route: routeParts.join(" → "),
    distance: `${distanceKm} km`,
    time: `${timeMin} min`,
    features,
    warnings: warnings.length > 0 ? warnings : ["No warnings - clear accessible path!"],
    steps: [
      `Head north from ${source} for ${distM(200)}m`,
      routeParts[1] ?? "Continue straight",
      `Follow accessible signage for ${distM(300)}m`,
      "Rest area available midway (bench and shade)",
      `Continue to ${destination} (${distM(500)}m)`,
      `Arrive at ${destination} - accessible entrance on the right`,
    ],
    accessibility_score: 82 + Math.floor(Math.random() * 17),
  };
}

/**
 * Primary entry point — tries Flask, falls back to simulation.
 */
export async function getRoute(request: RouteRequest): Promise<RouteResult> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(ROUTE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Server error ${response.status}`);
    }

    const data: RouteResponse = await response.json();
    return { data, fromBackend: true };
  } catch {
    // Flask not running — use simulation
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 700));
    return { data: simulateRoute(request), fromBackend: false };
  }
}
