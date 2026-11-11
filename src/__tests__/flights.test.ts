import {
  clean,
  resolveFlights,
  type FlightApiResponse,
} from "@/lib/flights-sample";

describe("Flights sample API — pure logic", () => {
  it("returns the sample fare disclaimer and all routes by default", () => {
    const body = resolveFlights("") as FlightApiResponse;
    expect(body).not.toHaveProperty("error");
    expect((body as { sample: boolean }).sample).toBe(true);
    expect(Array.isArray((body as { routes: unknown[] }).routes)).toBe(true);
    expect((body as { routes: unknown[] }).routes.length).toBeGreaterThan(0);
    expect((body as { disclaimer: string }).disclaimer).toMatch(/sample/);
    expect((body as { routes: Array<{ route: string; samplePrice: string }> }).routes[0]).toHaveProperty("route");
    expect((body as { routes: Array<{ route: string; samplePrice: string }> }).routes[0]).toHaveProperty("samplePrice");
  });

  it("filters to a single route when a valid route id is given", () => {
    const body = resolveFlights("lhe-dxb") as FlightApiResponse;
    expect(body).not.toHaveProperty("error");
    expect((body as { routes: unknown[] }).routes.length).toBe(1);
    expect((body as { routes: Array<{ id: string; route: string }> }).routes[0].id).toBe(
      "lhe-dxb",
    );
    expect(
      (body as { routes: Array<{ route: string }> }).routes[0].route,
    ).toBe("LHE → DXB");
  });

  it("returns an error shape for an unknown route id", () => {
    const body = resolveFlights("no-such-route") as FlightApiResponse;
    expect(body).toHaveProperty("error");
    expect((body as { error: string }).error).toBe(
      "No sample routes found for that route id.",
    );
  });

  it("strips control characters from the route id before matching", () => {
    // A raw value full of control chars should be cleaned to the empty
    // string, which resolves to the all-routes listing rather than 404.
    expect(clean("\x00\x01\x02lhe-dxb", 64)).toBe("lhe-dxb");
    expect(clean("\x00\x01\x02lhe-dxb", 6)).toBe("lhe-dx"); // stripped + truncated
    expect(clean(null as unknown, 64)).toBe("");
    expect(clean(123 as unknown, 64)).toBe("");
  });

  it("returns all routes when the cleaned id is empty", () => {
    const body = resolveFlights("") as FlightApiResponse;
    expect((body as { routes: unknown[] }).routes).toHaveLength(3);
  });

  it("returns an error shape when a non-control-blob does not match", () => {
    const body = resolveFlights("nope") as FlightApiResponse;
    expect(body).toHaveProperty("error");
  });
});
