// Pure sample-flight intelligence used by the ticket-analysis teaser and future
// route pages. This is an illustrative sample-fare dataset, not a live airfare
// source. Replace this shape with the real fare provider when one exists, and
// do not expose secrets or credentials through it.

export const SAMPLE_ROUTES = [
  {
    id: "lhe-dxb",
    route: "LHE → DXB",
    cabin: "Economy",
    outbound: "Fri, Dec 18 · 03:20",
    return: "Sun, Dec 28 · 18:45",
    samplePrice: "PKR 42,000",
    note: "Sample fare. Real fares depend on availability at the time of booking.",
  },
  {
    id: "lhe-jeddah",
    route: "LHE → JED",
    cabin: "Economy",
    outbound: "Tue, Jan 13 · 04:15",
    return: "Wed, Jan 21 · 19:40",
    samplePrice: "PKR 48,500",
    note: "Sample fare. Real fares depend on availability at the time of booking.",
  },
  {
    id: "lhe-dhaka",
    route: "LHE → DAC",
    cabin: "Economy",
    outbound: "Thu, Feb 5 · 06:00",
    return: "Mon, Feb 9 · 17:20",
    samplePrice: "PKR 36,000",
    note: "Sample fare. Real fares depend on availability at the time of booking.",
  },
];

export function clean(raw: unknown, max: number): string {
  if (typeof raw !== "string") return "";
  return raw.replace(/[\x00-\x1f\x7f]/g, "").trim().slice(0, max);
}

export interface FlightRoute {
  id: string;
  route: string;
  cabin: string;
  outbound: string;
  return: string;
  samplePrice: string;
  note: string;
}

export interface FlightResponse {
  sample: true;
  routes: FlightRoute[];
  disclaimer: string;
}

export interface FlightErrorResponse {
  error: string;
}

export type FlightApiResponse = FlightResponse | FlightErrorResponse;

/** Pure handler logic: given a route id (already cleaned), return the
 *  serializable response shape the GET handler would JSON-ify. This is the
 *  test seam — it has no dependency on NextRequest/NextResponse. */
export function resolveFlights(routeId: string): FlightApiResponse {
  const routes =
    routeId.length > 0
      ? SAMPLE_ROUTES.filter((r) => r.id === routeId)
      : SAMPLE_ROUTES;

  if (routes.length === 0) {
    return { error: "No sample routes found for that route id." };
  }

  return {
    sample: true,
    routes: routes.map((r) => ({
      id: r.id,
      route: r.route,
      cabin: r.cabin,
      outbound: r.outbound,
      return: r.return,
      samplePrice: r.samplePrice,
      note: r.note,
    })),
    disclaimer:
      "These are sample fares for illustration only. Confirm real fares on WhatsApp before booking.",
  };
}
