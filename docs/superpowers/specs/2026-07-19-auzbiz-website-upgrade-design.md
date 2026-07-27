# AUZBIZ Website Upgrade Design Spec

**Date:** 2026-07-19  
**Topic:** Full website upgrade to modern luxury travel agency platform  
**Approach:** Enhance existing Next.js stack (Approach A)

## 1. Overview & Goals

### 1.1 Project Vision
Transform the current AUZBIZ website from a generic AI-generated appearance into a premium, modern‑luxury travel agency platform that clearly communicates expertise, builds trust, and drives conversions across all core audience segments (families, corporate/MICE, religious travelers, students).

### 1.2 Primary Goals (All Selected)
- **Generate leads/inquiries** – Optimize forms, WhatsApp integration, and clear CTAs to increase conversion.
- **Showcase travel packages & services** – Present packages with rich filtering, sorting, and visual appeal.
- **Provide informational resources** – Blog, guides, visa updates, travel tips as a value‑add that improves SEO and authority.
- **Build brand trust & authority** – Highlight testimonials, partnerships, certifications, and the leadership story.

### 1.3 Success Criteria (Measurable)
| Metric | Target (post‑launch, 3 mo) |
|--------|----------------------------|
| Inquiry form conversion rate | ≥ 5% (up from baseline) |
| WhatsApp click‑throughs | ≥ 10% of visitors |
| Average time on site | ≥ 2 minutes |
| Blog page views per session | ≥ 1.5 |
| Organic search traffic (branded + non‑branded) | + 30% YoY |
| Largest Contentful Paint (LCP) | < 2.5 s (Core Web Vitals good) |
| Accessibility (WCAG 2.1 AA) | No critical violations |

---

## 2. Architecture & Technical Approach

### 2.1 Stack Overview
- **Framework:** Next.js 16.2 (App Router) – already in use.
- **Language:** TypeScript (strict mode).
- **Styling:** Tailwind CSS v4 (utility‑first) with custom design tokens for luxury feel.
- **UI Library:** **shadcn/ui** (Radix UI primitives) for accessible, unstyled components; we will extend with a custom theme.
- **State Management:** React Context + `useReducer` for global UI state (theme, modal, cart‑like inquiry). Server‑state handled by **React Query** (tanstack/query) for data fetching, caching, and background updates.
- **Forms:** React Hook Form with Zod validation; integrates with React Query for optimistic updates where appropriate.
- **Internationalization:** **next-i18next** (or built‑in Next.js i18n routing) with JSON locale files; language switcher in header.
- **Analytics & Monitoring:** Vercel Analytics (built‑in), Sentinel for error reporting, and optional Plausible/GA4.
- **Deployment:** Vercel (already configured). Enable **Incremental Static Regeneration (ISR)** for high‑traffic pages (home, packages, services) with revalidate intervals (e.g., 60 s).
- **Asset Optimization:** Next.js Image component with AVIF/WebP; lazy‑load off‑screen images; SVG sprites for icons.
- **CI/CD:** GitHub Actions (optional) for lint, type‑check, and lint‑staged pre‑commit hooks.

### 2.2 Key Architectural Decisions
1. **Keep existing API routes** (`/api/inquiry`, `/api/subscribe`) but enhance them with Zod validation and rate‑limiting.
2. **Introduce a `/lib/api.ts` layer** that wraps fetch with automatic base URL, auth headers (if needed), and error normalisation.
3. **Use React Query** for:
   - Fetching packages, services, blog posts, testimonials, partners.
   - Deduping requests, background refetch, and stale‑while‑revalidate.
   - Optimistic updates for newsletter subscription and inquiry submission.
4. **Global UI state** (theme, mobile‑nav open, modal) via a tiny `useContext` provider to avoid prop‑drilling.
5. **Code‑splitting:** Dynamic import for heavy components (3D globe, particle effects) using `next/dynamic` with `ssr: false` to keep SSR fast.
6. **Environment variables:** 
   - `NEXT_PUBLIC_SITE_URL` (for sitemap, canonical tags).
   - `NEXT_PUBLIC_GTM_ID` (optional Google Tag Manager).
   - `NEXT_PUBLIC_SENTRY_DSN` (for error monitoring).
   - `NEXT_PUBLIC_DEFAULT_LOCALE` (e.g., `en`).
7. **Accessibility:** All interactive components will adhere to WAI‑ARIA guidelines; we will run axe‑core in CI and manual testing with screen readers.

---

## 3. Component Breakdown

Below is a hierarchical list of UI components (new or refactored) grouped by feature area.

### 3.1 Layout & UI Shell
- `src/app/layout.tsx` – Root layout with `<Html>`, `<Body>`, `<ThemeProvider>`, `<QueryClientProvider>`, `<I18nProvider>`.
- `src/components/layout/Header.tsx` – Desktop & mobile navigation, language switcher, logo, CTA button (WhatsApp).
- `src/components/layout/Footer.tsx` – Columns: quick links, contact info, social icons, newsletter signup.
- `src/components/layout/ThemeToggle.tsx` – Toggle for light/dark mode, persists preference in `localStorage`.
- `src/components/layout/ModalProvider.tsx` + `Modal` – Reusable dialog wrapper (Radix `Dialog` via shadcn/ui).

### 3.2 Home Page (`src/app/page.tsx`)
- **HeroSection** – Animated headline, CTA buttons, background with HeroParticles + optional 3D globe (lazy‑loaded).
- **StatsStrip** – Animated counters with `AnimatedCounter` component.
- **WhyChooseUsSection** – TiltCard grid (reused from existing).
- **ServicesOverview** – Condensed version of Services page with hover cards.
- **PackagesHighlight** – Slider or grid of featured packages (Swiper or custom scroll).
- **TestimonialsSnippet** – Rotating testimonials.
- **CTABar** – Full‑width call‑to‑action (already exists).

### 3.3 Packages Page (`src/app/packages/page.tsx`)
- **PackagesFilterSidebar** – Dropdowns for region, duration, price range, tags; checkboxes for themes.
- **PackagesGrid** – Responsive card layout using `TiltCard`; each card shows image, title, price, duration, badge (featured).
- **PackageCard** – Clickable, navigates to `/packages/[slug]`.
- **SortDropdown** – Sort by price (low‑high, high‑low), popularity, newest.
- **Pagination / LoadMore** – Uses React Query’s `infiniteQuery` for ISR‑backed data.
- **PackageDetailPage (`src/app/packages/[slug]/page.tsx`)** – Hero image gallery, itinerary tabs (Overview, Itinerary, Includes, FAQs), booking CTA (WhatsApp/form), related packages.

### 3.4 Services Page (`src/app/services/page.tsx`)
- **ServicePillNav** – Horizontal pills linking to service sections (anchor scroll).
- **ServiceSection** – Reusable block for each of the 8 services (icon, title, description, includes list, ideal‑for, CTA buttons).
- Uses existing service data but rendered via mapped components.

### 3.5 Blog Pages
- **BlogListPage (`src/app/blog/page.tsx`)** – Category tabs, featured article large card, regular cards (grid), Load more button.
- **BlogPostPage (`src/app/blog/[slug]/page.tsx`)** – Article header (date, read time, category), rich‑text content (using `@radix-ui/react-dialog` for image zoom?), tags, share buttons, related posts, CTA & newsletter subscription.
- **BlogCategoryPage** – Same as BlogList but filtered by category via URL query.
- **BlogTagPage** – Tag‑based listing.

### 3.6 Additional Pages
- **About Page** – Refactor existing content into sections: Story, Mission/Vision/Values, Meet the Leader, Differentiators, using reusable `SectionHeader`, `TiltCard`.
- **Contact Page** – Enhanced form with real‑time validation, WhatsApp button, map (Google Maps embed iframe with lazy‑load), office hours.
- **FAQ Page** – Accordion (`Accordion` from shadcn/ui) with schema FAQ markup.
- **Privacy / Terms** – Simple markdown pages.

### 3.7 Reusable UI Elements (from shadcn/ui, customized)
- `Button` (variants: default, secondary, outline, ghost, WhatsApp).
- `Input`, `Textarea`, `Select` – with label, error states.
- `Checkbox`, `RadioGroup`.
- `Tooltip`.
- `Tooltip` from `@radix-ui/react-tooltip`.
- `Avatar` (for team/testimonials).
- `Badge` (for featured, new, hot deal).
- `Progress` (for steps in itinerary).
- `Skeleton` loader (custom).
- `Separator`.
- `Dialog` (modal) for newsletter popup, quote builder, etc.
- `DropdownMenu` (for language switcher, user menu).
- `Accordion`.
- `Table` (if we ever need to show comparison).
- `Tabs`.
- `Tooltip`.
- `Popover`.

### 3.3 Custom Components (to be created)
- `HeroParticles` (existing – keep, maybe improve performance).
- `CityGlobe` / `EnhancedGlobe` (3D globe – keep, ensure lazy load).
- `AnimatedCounter` – animate numbers.
- `TiltCard` – existing, adjust for new theme.
- `CTABar` – existing, tweak styling.
- `WhatsAppWidget` – floating button.
- `CurrencyFormatter` utility.
- `DateFormatter` (for blog/publish dates).
- `RichText` – component that renders portable‑text or markdown from CMS (if we later adopt one).
- `SeoMeta` – central place to generate `<title>`, `<meta>`, `<link rel="canonical">`, OpenGraph, Twitter Card, JSON‑LD.
- `Breadcrumb` – for nested routes (e.g., package details, blog).

---

## 4. Data Flow & State Management

### 4.1 Data Sources
| Source | Type | Description |
|--------|------|-------------|
| **Static JSON/TS files** (`src/data/blog-posts.ts`, maybe similar for services/packages) | Build‑time | Content that changes infrequently (blog, static package data). Kept as TS for type safety. |
| **API Routes** (`/api/inquiry`, `/api/subscribe`) | Serverless (Vercel) | Form handling; after submission, store to a simple backend (e.g., Supabase) or send email via Nodemailer (already). |
| **External Services** (future) | REST / GraphQL | If we adopt a headless CMS, we’ll fetch via `react-query`. |
| **Client‑side cache** | React Query | Stores fetched data, provides stale‑while‑revalidate, background refetch on window focus. |

### 4.2 Data Fetching Strategy
- **Static Generation (SG)** for pages that don’t require auth: Home, About, Services, Packages (list), Blog (list & individual). Use `generateStaticParams` for dynamic routes (`/packages/[slug]`, `/blog/[slug]`).
- **ISR**: Revalidate on a timed basis (e.g., every 60 seconds) for package list and blog list to reflect new content without redeploy.
- **Client‑only data**: UI state (theme, modal) via React Context.
- **Form submissions**: Optimistic UI with React Query’s `mutate` – show success instantly, rollback on error.

### 4.3 State Management Details
- **React Query** (`@tanstack/react-query`):
  - Provide a `QueryClient` at the root (`<QueryClientProvider>`).
  - Define `queryFn` wrappers around fetch utilities.
  - Set `staleTime: 5 minutes`, `cacheTime: 10 minutes` for list data; `staleTime: 30 minutes` for detail pages.
  - Use `useInfiniteQuery` for paginated lists (Blog, Packages).
- **Global UI State** (`AppContext`):
  - `theme: 'light' | 'dark'`
  - `sidebarOpen: boolean`
  - `modalIsOpen: boolean` (generic)
  - Dispatch via simple reducer.
- **Form State**: React Hook Form (`useForm`) with resolvers from Zod. On submit, call API via `mutateAsync` from React Query.

### 4.4 Error Handling & Loading States
- React Query provides `isError`, `error`; we display a generic `ErrorBanner` component with retry button.
- Loading skeletons (`Skeleton`) replace content while queries are fetching.
- For form submissions, show spinner inside submit button and inline error messages via RHF.
- 404 pages: custom `not-found.tsx` under `app/` with brand‑aligneduxury styling.

---

## 5. Internationalization (i18n)

### 5.1 Approach
- Use **next-i18next** (or native Next.js i18n routing) with `locales: ['en', 'ur']` (English and Urdu – primary local language). 
- Each route gets locale prefix: `/en/packages`, `/ur/packages`.
- Default locale = `en`.
- Language switcher in header (dropdown) updates `next/navigation` `useRouter().push` with new locale.

### 5.2 Content Strategy
- **Static content** (UI strings) stored in `public/locales/en/common.json`, `ur/common.json`, and namespace‑specific files (`navigation.json`, `footer.json`, etc.).
- **Dynamic content** (blog posts, packages) will need translation fields. For MVP we keep content in English only and add a note “Language toggle translates UI only”. 
  - Phase 2: extend data model to include `title_en`, `title_ur`, `description_en`, `description_ur` etc., and fetch via language‑aware query.

### 5.3 Implementation Steps
1. Install `next-i18next`.
2. Configure `next-i18next.config.js`.
3. Create `app/[lng]/layout.tsx` to propagate locale.
4. Convert static text to `t('common:welcome')` calls.
5. Add language switcher component (`LanguageSwitcher`) that reads `router.locale` and provides options.

---

## 6. Accessibility & Performance

### 6.1 Accessibility (WCAG 2.1 AA)
- **Keyboard navigation**: All interactive elements reachable via `Tab`; visible focus outline (custom CSS using `:focus-visible`).
- **ARIA labels**: Icons, buttons without text, form fields.
- **Color contrast**: Use Tailwind colors that meet 4.5:1 ratio for text on background (tested via axe).
- **Text scaling**: Use relative units (`rem`) and avoid fixed heights that break on zoom.
- **Skip links**: Visually hidden “Skip to main content” link at top of page.
- **Landmarks**: proper use of `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`.
- **Form validation**: Provide error messages associated with inputs via `aria-describedby`.
- **Testing**: Run `npm run lint:axe` (using `@axe-core/react` in CI) and manual screen‑reader testing (NVDA, VoiceOver).

### 6.2 Performance Optimizations
- **Image Optimization**: Next.js `Image` with `priority` for hero, `loader` for external images.
- **Font Optimization**: Use `next/font` for Geist (already) and optionally add a luxury serif (e.g., `Cormorant Garamond`) loaded via `font-display: swap`.
- **CSS Optimization**: Purge unused Tailwind via built‑in JIT; enable `content` paths to include all `.tsx` files.
- **JavaScript Splitting**: Dynamic imports for heavy 3D and particle components (`next/dynamic` with `loading: /* custom spinner */`).
- **Cache‑Control**: Set proper headers via `next.config.js` (already present) and leveraging ISR.
- **Critical CSS**: Inline above‑the‑fold styles via `next` built‑in CSS optimization (experimental `optimizeCss: true` if needed).
- **Web Vitals**: Monitor via `web-vitals` library; aim for LCP < 2.5 s, CLS < 0.1, FID < 100 ms.
- **Bundle Analysis**: Use `@next/bundle-analyzer` in CI to keep JS < 100 KB gzipped for initial load.

---

## 7. SEO & Structured Data

### 7.1 On‑Page SEO
- Unique `<title>` and `<meta description>` per page (generated via `SeoMeta` component using page‑specific data).
- Canonical URL tag (`<link rel="canonical">`) pointing to the absolute URL (using `NEXT_PUBLIC_SITE_URL`).
- Open Graph & Twitter Card tags for social sharing (image, title, description).
- Structured data (JSON‑LD):
  - **Homepage**: `LocalBusiness` + `TravelAgency` schema (already partially present; enhance with `sameAs`, `priceRange`, `servesCuisine`? Not needed).
  - **Package**: `Offer` or `TouristTrip` (use `schema.org/TouristTrip` if available) – include `name`, `description`, `image`, `offers.price`, `duration`, `availableLanguage`, `areaServed`.
  - **BlogPost**: `BlogPosting` – author, datePublished, image, publisher.
  - **FAQPage**: `FAQPage` schema for FAQ accordion.
  - **BreadcrumbList**: For nested routes (packages, blog).

### 7.2 Technical SEO
- **XML Sitemap**: Already automated via `npm run generate-sitemap` (runs on `postbuild`). Ensure it includes all localized paths (e.g., `/en/packages`, `/ur/packages`).
- **Robots.txt**: Static file allowing all, disallowing admin paths; add `Sitemap:` directive.
- **Clean URLs**: No unnecessary query strings; use slug‑based routes.
- **HTTPS**: Enforced by Vercel.
- **Redirects**: 301 from old paths (if any) via `next.config.js` `async redirects()`.

### 7.3 Content Strategy
- Target long‑tail keywords: “Umrah packages Lahore 2026”, “Schengen visa consultants Pakistan”, “Study abroad consultants Türkiye scholarships”.
- Internal linking: Related packages, blog posts, services cross‑linked within content.
- Update blog regularly (aim 2‑4 posts/month) to maintain freshness.

---

## 8. Security & Privacy

### 8.1 Data Protection
- **Form data**: Never store raw personal data in logs; only transmit over HTTPS.
- **Email** (Nodemailer) – use environment variables for SMTP credentials; consider switching to a transactional email service (SendGrid, Mailgun) for better deliverability and analytics.
- **WhatsApp**: Use the official WhatsApp Cloud API or a verified Business Solution Provider; keep the token secret.
- **GDPR‑like compliance**: Provide a privacy policy page, consent checkbox for newsletter (explicit opt‑in), and ability to withdraw (unsubscribe link in emails).

### 8.2 Application Security
- **Headers**: Already set via `next.config.js` (CSP, X‑Frame‑Options, etc.). Review CSP to allow necessary inline scripts (e.g., for analytics) using nonces or hashes.
- **Rate limiting** on API routes: Use `express-rate-limit`‑like middleware (or Vercel Edge Functions) to prevent abuse on `/api/inquiry` and `/api/subscribe`.
- **Input validation**: Zod schema on both client and server; sanitize before sending to email backend.
- **Dependency auditing**: Run `npm audit` regularly; keep dependencies up‑to‑date via Dependabot.
- **Authentication** (future): If we add a client portal, use NextAuth.js with JWT or database session, ensuring HTTPS‑only cookies and CSRF protection.

### 8.3 Monitoring & Logging
- **Sentry**: Capture front‑end and API errors; enable performance tracing.
- **LogDNA / Vercel Logs**: For API route errors.
- **Alert on**: 5xx error rates > 1%, latency spikes.

---

## 9. Testing & QA

### 9.1 Unit Tests
- **Jest + React Testing Library** for:
  - UI components (Button, Input, TiltCard, etc.).
  - Custom hooks (e.g., `usePackages`, `useBlogPosts`).
  - Utility functions (date/price formatters).
- Aim for **≥ 80% coverage** on core utilities and components.

### 9.2 Integration / E2E Tests
- **Cypress** (or Playwright) for critical user journeys:
  1. Home → Packages → Filter → Select package → Click WhatsApp button.
  2. Blog → Read article → Subscribe to newsletter.
  3. Contact form submission (valid & invalid).
  4. Language switch toggles UI strings.
- Run against a preview Vercel deployment on each PR.

### 9.3 Accessibility Tests
- **axe-core** integrated into CI (`npm run test:axe`).
- Manual testing with NVDA (Windows) and VoiceOver (macOS/iOS) for key pages.

### 9.4 Performance Tests
- **Lighthouse CI** (via `@lhci/cli`) ensuring scores:
  - Performance ≥ 90
  - Accessibility ≥ 90
  - Best Practices ≥ 90
  - SEO ≥ 90
- Run on PR and on production deployments.

### 9.5 Acceptance Criteria Checklist
Before marking a feature complete, verify:
- [ ] Code reviewed (≥ 1 approval).
- [ ] Unit tests pass.
- [ ] E2E scenarios pass on staging.
- [ ] Lighthouse meets thresholds.
- [ ] No new lint or type errors.
- [ ] Accessibility scan passes (no WCAG 2.1 AA violations).
- [ ] Screenshots match Figma/design specs (if we produce them).
- [ ] Documentation updated (storybook or README).

---

## 10. Phased Implementation Roadmap

| Phase | Duration (weeks) | Goals | Key Deliverables |
|-------|------------------|-------|------------------|
| **0 – Preparation** | 1 | Set up repo, CI, linting, design system baseline. | - ESLint/Prettier config with Tailwind preset.<br>- Storybook init (optional).<br>- Add `react-query`, `zod`, `react-hook-form`.<br>- Create `src/lib/api.ts`. |
| **1 – Core Layout & Navigation** | 2 | Header, footer, theme, language switcher, layout components. | - Responsive header with logo, nav, language dropdown, WhatsApp CTA.<br>- Footer with columns.<br>- Theme context (light/dark) persisted.<br>- Layout wrapper with SEO meta provider. |
| **2 – Home Page Revamp** | 3 | Hero, stats, services overview, packages highlight, testimonials, CTA bar. | - New `HomePage` using sections above.<br>- Animated counters re‑implemented with `framer-motion` if needed.<br>- Lazy‑loaded 3D globe & particles.<br>- All sections accessible and SEO‑optimized. |
| **3 – Packages Package** | 4 | Package list, filters, sorting, detail page, ISR. | - `packages/page.tsx` with filter sidebar and grid.<br>- React Query `usePackages` hook.<br>- `packages/[slug]/page.js` for detail.<br>- Server‑side revalidation (ISR 60s).<br>- Structured data for each package. |
| **4 – Services & About** | 2 | Services page refactor, About page sections. | - Reusable `ServiceSection` component.<br>- About page broken into Story, MVV, Leadership, Differentiators. |
| **5 – Blog & Content** | 3 | Blog list, post page, tag/category pages, newsletter. | - Blog list with infinite scroll.<br>- Blog post page with rich‑text rendering.<br>- Sidebar with categories/tags.<br>- Newsletter subscription component (uses `/api/subscribe`). |
| **6 – Contact & Forms** | 2 | Contact form, inquiry form, map, WhatsApp widget. | - Contact page with re‑validated form, Google Maps embed (lazy).<br>- Improved inquiry form on home/message modal. |
| **7 – SEO, Sitemap, & Metadata** | 1 | Dynamic metadata, sitemap generation, structured data. | - `SeoMeta` component used site‑wide.<br>- Updated `generate-sitemap.ts` to include locales.<br>- JSON‑LD scripts on relevant pages. |
| **8 – Accessibility & Performance Audit** | 2 | Full audit, fixes, monitoring setup. | - Run axe, Lighthouse, resolve all AA violations.<br>- Add Sentry, enable Vercel analytics.<br>- Final performance budget met. |
| **9 – Testing & QA** | 2 | Write unit & E2E tests, CI pipeline. | - Jest + RTL unit tests (≥ 80% coverage).<br>- Cypress smoke tests for key journeys.<br>- GitHub Actions: lint → test → build → deploy preview. |
| **10 – Launch & Post‑Launch Monitoring** | 1 | Deploy to production, monitor metrics, hand‑off. | - Blue‑green deployment via Vercel.<br>- Post‑launch analytics review (first 2 weeks).<br>- Knowledge transfer session with marketing/content team. |
| **TOTAL** | **~20 weeks** (~5 months) |  |  |

*Note*: Overlaps possible; some phases can run in parallel (e.g., UI component library development alongside styling).

---

## 11. Open Questions & Decisions Needed

| # | Question | Impact | Suggested Resolution |
|---|----------|--------|----------------------|
| 1 | **Content Language** – Should we launch with Urdu translation of UI only, or also translate dynamic content (packages, blog)? | Affects i18n scope, translation effort, and SEO (localized URLs). | Start with UI translation only (Phase 1). Plan a content translation sprint after MVP, leveraging a simple CSV workflow or a lightweight CMS. |
| 2 | **Headless CMS vs. Static Data** – Keep blog/packages as `.ts` files or adopt a CMS (e.g., Sanity) for easier editing by non‑technical staff? | Influences editing workflow, build times, and potential for localized content. | Begin with static files (low complexity). Re‑evaluate after 3 months if marketing requests frequent updates; then migrate to a headless CMS with incremental adoption. |
| 3 | **Third‑Party Integrations** – Use WhatsApp Cloud API directly, or continue with a simple `wa.me` link? | Affects ability to track clicks, automate replies, and maintain compliance. | For MVP keep simple `wa.me` link (no cost, minimal integration). Log clicks via `onclick` event to GA/Vercel Analytics. In Phase 2, evaluate official API for richer interaction (template messages, status updates). |
| 4 | **Analytics Provider** – Stay with Vercel Analytics + optional GTM, or add Google Analytics 4 / Plausible? | Impacts data depth and privacy considerations. | Keep Vercel Analytics for core metrics; add GA4 only if marketing requires specific conversion funnels (can be added later via GTM). |
| 5 | **Design System Depth** – Build a full Storybook‑driven design system, or rely on existing shadcn/ui + custom CSS? | Affects developer velocity and consistency. | Start with a simple token file (`styles/tokens.ts`) for colors, spacing, radius, and extend components as needed. Consider Storybook in Phase 6 if component count grows > 20. |
| 6 | **Performance Budget** – Set specific limits for JS bundle size, image weight, etc.? | Guides optimization efforts. | Adopt: initial JS ≤ 100 KB gzipped, total page weight ≤ 1.2 MB (above,200 KB, LCP ≤ 2.5 s. Enforce via CI‑built‑in `next/bundle-analyzer` and `image-optimizations` alerts. |
| 7 | **Future Booking/Payment Flow** – Should we lay groundwork now (e.g., cart‑like context, Stripe SDK)? | Influences state‑management and API design choices. | Keep the inquiry‑only model for now; but design the `inquiry` mutation to be extensible (e.g., add `packageId`, `travelers`). Document that a future “booking” flow would replace the inquiry endpoint with a payment intent flow. |

**Next Step:** Confirm the approved scope (Approach A with the outlined architecture) or raise any objections/adjustments before we proceed to the detailed implementation plan.

--- 

*End of design spec.*