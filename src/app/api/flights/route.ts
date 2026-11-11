import { NextRequest, NextResponse } from "next/server";
import {
  clean,
  resolveFlights,
  type FlightApiResponse,
} from "@/lib/flights-sample";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const search = new URL(req.url).searchParams;
    const routeId = clean(search.get("route"), 64);
    const result: FlightApiResponse = resolveFlights(routeId);

    if ("error" in result) {
      return NextResponse.json(result, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error("Flights sample API error:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { error: "Could not load sample route data." },
      { status: 500 }
    );
  }
}
