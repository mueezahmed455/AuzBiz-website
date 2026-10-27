# AUZBIZ Premium Rebuild — Strategy & Implementation Plan

## Research Foundation (verified sources)

### 1. Premium flight-booking UX (Duffel, AltexSoft, Baymard 2025/2026)

| Pattern | What premium sites do | AUZBIZ gap |
|---|---|---|
| Journey-aware search | Inspire → Compare → Convert by funnel stage | One-size homepage |
| Place suggestion | Autocomplete + typo tolerance for origin/dest | Manual text inputs |
| Flex date calendar | Month-long price heatmap, lowest fares marked | Static date inputs |
| Fare presentation | 32 data points but only essentials above fold | Minimal info, no upsell |
| Sort/filter | Price AND duration, frequent-flyer airline filter | Price only |
| Change/cancellation | Shown clearly pre-booking to build trust | Hidden/absent |
| Guest checkout | Optional login, dynamically minimal fields | None |
| Upsell pre-pay | Bags, seats, protection, class upgrade | None |
| Brand consistency | Airline logos + brand colors throughout | Inconsistent |
| Localization | Auto geo + language + currency | None |
| Accessibility | Skip links, keyboard nav, <20 clicks to search | Partial |
| Mobile | No app forced, full mobile web parity | Partial |

### 2. Competitor repo reverse-engineer (Golobe Travel Agency, Next.js 14)

Stack confirmed: Next.js App Router + Server Components + Server Actions · MongoDB · Next Auth v5 · shadcn-ui · Tailwind · Stripe · Mailjet · Redux · Zod · Maintenance mode + feature toggles · Admin dashboard · Downloadable invoices · Stepper booking UI · Loading skeletons · Dynamic OG images

Key takeaway: production travel sites separate **search** (server), **booking** (server actions + Stripe), and **account** (NextAuth) layers.

---

## Target: "Claude Fable"-level premium UX

Definition: Apple-grade attention to detail — glassmorphism, micro-interactions, buttery page transitions, skeleton loading, <100ms input response, WCAG 2.2 AA, dark/light themes, no "AI slop" placeholder content.

---

## Phase 1 — Premium Design System (Week 1)

### 1.1 Design tokens
Extend `globals.css` with:
- Premium slate/amber palette with 10-step scales
- Glass card tokens (`--glass-bg`, `--glass-border`, `--glass-shadow`)
- Motion tokens (`--ease-premium: cubic-bezier(0.23, 1, 0.32, 1)`)
- Focus-visible rings (2px amber, offset 2px)
- 8px baseline grid

### 1.2 New UI components
- `PremiumSearch` — origin/dest place suggestion, trip type, pax, cabin, flex-date toggle
- `FlexCalendar` — month view with price heatmap dots
- `FareCard` — airline logo, times, duration, stops, baggage, change fee, "Select fare"
- `FareBrand` — fare tier cards (Basic/Standard/Flexible) with upsell badges
- `Stepper` — booking progress (Search → Select → Traveller → Pay → Confirm)
- `Skeleton` variants (text, card, table row)
- `Toast` — non-blocking notifications
- `AccessibilitySkip` — skip-to-content link

### 1.3 Micro-interactions
- Page transitions (fade + slight scale, 250ms)
- Hover lift + glow on cards
- Staggered list reveals
- Skeleton shimmer on async content
- Active states on every interactive element

---

## Phase 2 — Core Premium Features (Weeks 2-3)

### 2.1 Smart flight search
- Place suggestion with fuzzy matching (origin/dest)
- Auto-detect user location/currency (IP-based, optional override)
- Trip type: one-way / return / multi-city
- Cabin class: economy / premium / business
- Flex date toggle → FlexCalendar heatmap

### 2.2 Fare results page
- FareCard grid sorted by price AND duration
- Airline brand logos + carrier names
- Baggage allowance + change fee per fare
- Expandable "fare details" (32 data points, progressive disclosure)
- Sort: price ↕, duration ↕, departure time ↕
- Filter: stops, airline, cabin, price range

### 2.3 Booking flow (stepper)
1. **Search** → 2. **Select fare** → 3. **Traveller details** (guest or login) → 4. **Extras** (bags, seat, insurance upsell) → 5. **Pay** (Stripe) → 6. **Confirm** (invoice download)
- Guest checkout default; login optional with clear benefits
- Dynamic required fields only (Zod validation)
- Price lock countdown (15 min)

### 2.4 User accounts (Next Auth)
- Profile, booking history (upcoming/past), saved payment methods
- Downloadable invoices/receipts
- Price alerts (email when fare drops — via Mailjet/resend)

---

## Phase 3 — Deployment & Operations (Week 4)

### 3.1 Deployment target: Vercel
- Production branch = `main`, preview deploys per PR
- Environment variables: DATABASE_URL, NEXTAUTH_SECRET, STRIPE_KEYS, MAILJET_KEY, OPENAI_KEY (if used)
- Custom domain: auzbizgroup.com
- Edge config for ISR/revalidate on package/fare changes

### 3.2 CI/CD
- GitHub Actions: lint → typecheck → build → deploy
- PR preview URLs for QA
- Lighthouse CI budget (LCP < 2.5s, CLS < 0.1, TBT < 300ms)

### 3.3 Monitoring
- Vercel Analytics + Web Vitals
- Error tracking (Sentry)
- Uptime monitoring

---

## Phase 4 — Additional Features (Week 5+)

- Admin dashboard (packages, bookings, feature toggles, maintenance mode)
- Multi-currency (PKR, USD, AED, SAR)
- Live trip tracking (existing) + push/email status updates
- Plane radar (existing, OpenSky)
- Umrah/corporate MICE packages with group pricing
- Blog + SEO pages per destination

---

## Anti-hallucination rule

Every external claim (API capability, conversion stat, package price) carries a source + date. No fabricated numbers.
