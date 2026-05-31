interface SegmentResult {
  distance: number;
  duration: number;
}

async function fetchSegment(origin: string, destination: string): Promise<SegmentResult> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY ?? process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}&units=metric&mode=driving`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.status !== "OK") throw new Error(data.error_message || "Distance Matrix error");

  const element = data.rows[0]?.elements[0];
  if (!element || element.status !== "OK") throw new Error(`Element status: ${element?.status}`);

  return { distance: element.distance.value, duration: element.duration.value };
}

export async function calculateRouteDistance(
  waypoints: string[]
): Promise<{ distanceKm: number; durationMinutes: number }> {
  if (waypoints.length < 2) return { distanceKm: 0, durationMinutes: 0 };

  let totalDistance = 0;
  let totalDuration = 0;

  for (let i = 0; i < waypoints.length - 1; i++) {
    const segment = await fetchSegment(waypoints[i], waypoints[i + 1]);
    totalDistance += segment.distance;
    totalDuration += segment.duration;
  }

  return {
    distanceKm: +(totalDistance / 1000).toFixed(2),
    durationMinutes: Math.round(totalDuration / 60),
  };
}
