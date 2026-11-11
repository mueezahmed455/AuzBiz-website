import { render, screen } from "@testing-library/react";
import AUZPromoBanner from "@/components/promo/AUZPromoBanner";

describe("AUZPromoBanner", () => {
  it("renders the published promo copy for each variant", () => {
    const variants: Array<{ variant: "umrah" | "education" | "group" | "visa"; href: string; cta: string; title: string }> = [
      { variant: "umrah", href: "/visas", cta: "BOOK YOUR UMRAH", title: "SACRED UMRAH JOURNEY" },
      { variant: "education", href: "/services#study", cta: "STUDY ABROAD NOW", title: "YOUR GLOBAL EDUCATION BEGINS" },
      { variant: "group", href: "/group-tours", cta: "VIEW GROUP TOURS", title: "EXPLORE THE WORLD TOGETHER" },
      { variant: "visa", href: "/contact?service=Visa%20Services", cta: "GET A VISA CONSULTATION", title: "EXPERIENCED VISA SOLUTIONS" },
    ];

    for (const { variant, href, cta, title } of variants) {
      const { container } = render(<AUZPromoBanner variant={variant} href={href} />);

      expect(screen.getByRole("link", { name: new RegExp(cta, "i") })).toHaveAttribute("href", href);
      expect(screen.getByText(new RegExp(title, "i"))).toBeInTheDocument();
      expect(container).toHaveTextContent(/Dream Beyond Borders/);
      expect(container).toHaveTextContent(/AUZBIZ/);
    }
  });

  it("renders the brand tagline above the CTA for every variant", () => {
    const { container } = render(
      <AUZPromoBanner variant="visa" href="/contact?service=Visa%20Services" />
    );
    expect(container).toBeInTheDocument();
  });
});
