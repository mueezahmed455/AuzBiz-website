import { unstable_cache } from "next/cache";
import { NextResponse } from "next/server";

const TOKEN_URL =
  "https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token";
const STATES_URL = "https://opensky-network.org/api/states/all";

interface FlightState {
  icao24: string;
  callsign: string | null;
  origin_country: string;
  time_position: number | null;
  last_contact: number;
  longitude: number;
  latitude: number;
  baro_altitude: number | null;
  on_ground: boolean;
  velocity: number | null;
  true_track: number | null;
  vertical_rate: number | null;
  squawk: string | null;
}

interface FlightPayload {
  time: number | null;
  states: FlightState[];
  total: number;
  airborne: number;
  onGround: number;
  refreshAfter: number;
}

// OpenSky's free anonymous quota is 400 credits per day and a global query
// costs 4 credits. A 15-minute cache stays under that even with a tab left
// open all day. Credentials raise the quota and allow a 2-minute refresh.
const HAS_CREDENTIALS = Boolean(
  process.env.OPENSKY_CLIENT_ID && process.env.OPENSKY_CLIENT_SECRET,
);
const CACHE_SECONDS = HAS_CREDENTIALS ? 120 : 900;

let accessToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string | null> {
  const clientId = process.env.OPENSKY_CLIENT_ID;
  const clientSecret = process.env.OPENSKY_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;

  if (accessToken && accessToken.expiresAt > Date.now() + 30_000) {
    return accessToken.value;
  }

  try {
    const response = await fetch(TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
      }),
      cache: "no-store",
    });
    if (!response.ok) return null;

    const data = await response.json();
    if (typeof data?.access_token !== "string") return null;

    const expiresIn =
      typeof data.expires_in === "number" ? data.expires_in : 1800;
    accessToken = {
      value: data.access_token,
      expiresAt: Date.now() + expiresIn * 1000,
    };
    return accessToken.value;
  } catch {
    // Fall back to the anonymous quota rather than failing the page.
    return null;
  }
}

async function fetchStates(
  lamin: number,
  lamax: number,
  lomin: number,
  lomax: number,
): Promise<FlightPayload> {
  const url = new URL(STATES_URL);
  url.searchParams.set("lamin", String(lamin));
  url.searchParams.set("lamax", String(lamax));
  url.searchParams.set("lomin", String(lomin));
  url.searchParams.set("lomax", String(lomax));

  const token = await getAccessToken();
  const response = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    cache: "no-store",
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error("OpenSky's request limit has been reached. Try again later.");
    }
    throw new Error(`OpenSky returned an error (${response.status}).`);
  }

  const data = await response.json();
  const rows: unknown[] = Array.isArray(data?.states) ? data.states : [];

  const located = rows.filter(
    (row): row is unknown[] =>
      Array.isArray(row) &&
      typeof row[5] === "number" &&
      typeof row[6] === "number",
  );

  const grounded = located.filter((row) => row[8] === true).length;

  const states: FlightState[] = located.slice(0, 60).map((row) => ({
    icao24: String(row[0] ?? ""),
    callsign:
      typeof row[1] === "string" && row[1].trim() ? row[1].trim() : null,
    origin_country: String(row[2] ?? "Unknown"),
    time_position: typeof row[3] === "number" ? row[3] : null,
    last_contact: Number(row[4] ?? 0),
    longitude: row[5] as number,
    latitude: row[6] as number,
    baro_altitude: typeof row[7] === "number" ? row[7] : null,
    on_ground: row[8] === true,
    velocity: typeof row[9] === "number" ? row[9] : null,
    true_track: typeof row[10] === "number" ? row[10] : null,
    vertical_rate: typeof row[11] === "number" ? row[11] : null,
    squawk: typeof row[14] === "string" ? row[14] : null,
  }));

  return {
    time: typeof data?.time === "number" ? data.time : null,
    states,
    total: located.length,
    airborne: located.length - grounded,
    onGround: grounded,
    refreshAfter: CACHE_SECONDS,
  };
}

// The shared Next.js data cache means all visitors use one upstream request
// per cache window instead of one per browser tab.
const getCachedStates = unstable_cache(fetchStates, ["opensky-states"], {
  revalidate: CACHE_SECONDS,
});

function numberParam(value: string | null): number | null {
  if (value === null) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lamin = numberParam(searchParams.get("lamin"));
  const lamax = numberParam(searchParams.get("lamax"));
  const lomin = numberParam(searchParams.get("lomin"));
  const lomax = numberParam(searchParams.get("lomax"));

  const valid =
    lamin !== null &&
    lamax !== null &&
    lomin !== null &&
    lomax !== null &&
    lamin >= -90 &&
    lamax <= 90 &&
    lomin >= -180 &&
    lomax <= 180 &&
    lamin < lamax &&
    lomin < lomax;

  if (!valid) {
    return NextResponse.json(
      { error: "Invalid map bounds." },
      { status: 400 },
    );
  }

  try {
    const payload = await getCachedStates(lamin, lamax, lomin, lomax);
    return NextResponse.json(payload, {
      headers: {
        "Cache-Control": `public, max-age=0, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${CACHE_SECONDS}`,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Live flight data is unavailable.";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
