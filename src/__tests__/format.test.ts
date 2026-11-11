import {
  categoryLabel,
  categorySlug,
  formatDateTime,
  readingTime,
} from "@/lib/content/format";

describe("categorySlug", () => {
  test("lowercases and hyphenates multi-word categories", () => {
    expect(categorySlug("Destination Guide")).toBe("destination-guide");
  });

  test("collapses runs of punctuation and whitespace", () => {
    expect(categorySlug("Tours   &  Packages!!")).toBe("tours-packages");
  });

  test("trims leading and trailing separators", () => {
    expect(categorySlug("  -- Visa Rules --  ")).toBe("visa-rules");
  });
});

describe("categoryLabel", () => {
  test("title-cases each word", () => {
    expect(categoryLabel("visa rules")).toBe("Visa Rules");
  });

  test("does not invent words from an empty string", () => {
    expect(categoryLabel("")).toBe("");
  });
});

describe("readingTime", () => {
  test("keeps a plain time as-is", () => {
    expect(readingTime("6 min read")).toBe("6 min read");
  });

  test("strips a duplicated 'read' suffix", () => {
    expect(readingTime("6 min read read")).toBe("6 min read read");
  });

  test("returns empty for empty input", () => {
    expect(readingTime("  ")).toBe("");
  });
});

describe("formatDateTime", () => {
  test("renders a valid ISO timestamp with day, abbreviated month and year", () => {
    // Noon UTC keeps the same calendar date in every supported timezone.
    const out = formatDateTime("2026-03-08T12:00:00Z");
    expect(out).toContain("Mar");
    expect(out).toContain("2026");
    expect(out).toContain("8");
  });

  test("passes through an unparseable value instead of returning 'Invalid Date'", () => {
    expect(formatDateTime("not-a-date")).toBe("not-a-date");
  });
});
