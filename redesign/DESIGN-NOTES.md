# Chennai Beats — Minimal Redesign

Open `index.html` in a browser. All 4 pages share `styles.css`. Resize the browser to preview mobile / tablet / desktop.

## Pages

| File | Page |
|---|---|
| `index.html` | Homepage (hero, services, why us, featured classes, costume highlight, locations, founder, testimonials, final CTA) |
| `costume-rental.html` | Costume Rental (hero, 7 categories, gallery with fallback state, 4-step process, CTA band) |
| `classes.html` | Classes (5 class cards: description, age group, location, Register CTA) |
| `services.html` | Services (2-column desktop, stacked mobile) |

## Design system

**Colors** — cream `#FAF6F0` background, charcoal `#26201B` text, maroon `#8E2A35` primary, gold `#C08A2D` secondary. All in `:root` CSS variables.

**Typography** — Playfair Display (brand/founder name), Dancing Script (tagline), Montserrat (headings), Raleway (nav/buttons/footer), Open Sans (body). Matches your existing brand typography rules.

**Indian accent** — subtle kolam-style dot grid in section corners (`.accent-corner`) and on the maroon costume band. No heavy patterns or gradients.

## Navigation behavior

- Desktop (1024px+): sticky top bar with 8 links + "Register Now" pill button. Active page underlined in gold.
- Mobile/tablet (<1024px): sticky bar with logo + 48px hamburger. Tapping opens a stacked menu with large tap targets and a full-width Register button. `aria-expanded` toggles for accessibility.
- Costume Rental is a top-level nav item on every breakpoint — never hidden in a dropdown.

## CTA button styles

- `.btn-primary` — solid maroon, white text (Register Now, Book Costume Rental)
- `.btn-secondary` — maroon outline on cream (Explore Costume Rental, Contact Us)
- `.btn-light` — white on maroon band (used inside the costume highlight)
- All buttons: 48px min height (tap-friendly), pill shape, visible gold focus ring (`:focus-visible`).

## Breakpoints

- `<768px` — everything stacked, 1-column cards
- `768px+` — 2-column cards, 2-column content splits
- `1024px+` — full nav appears, 3–4 column card grids, hero becomes 2-column

## Image fallback state

`.img-fallback` renders a dashed-gold placeholder card with icon + label wherever a real photo isn't loaded yet (hero, founder photo, all 6 costume gallery tiles). Swap each for an `<img>` with alt text when photos are ready; keep the fallback as the `onerror` / loading state in the React build.

## Porting to the React app

Each section maps to a component: `Header`, `MobileMenu`, `Hero`, `ServiceCards`, `WhyUs`, `FeaturedClasses`, `CostumeBand`, `Locations`, `FounderPreview`, `Testimonials`, `FinalCta`, `Footer`. CSS variables translate directly to Tailwind theme tokens. The "Register Now" links currently point to `index.html#contact` — wire these to your Contact page / form route.
