# Chennai Beats — Animated + 3D Version

Same 4 pages and design system as `redesign/`, with an animation layer on top. Open `index.html` in a browser (needs internet for the Three.js CDN).

## Effects included

**3D**
- Three.js particle field in every page hero — floating gold/maroon/cream particles plus a rotating gold ring, with mouse parallax (particles drift as you move the cursor).
- 3D tilt cards — every card and gallery tile tilts in perspective toward the cursor; icons, headings, and buttons float above the card surface (`translateZ`), with a moving light shine that follows the mouse.

**Animation**
- Scroll reveal — sections, cards, steps, and checklist items fade-and-rise in as you scroll, staggered left to right.
- Hero entrance — eyebrow, headline, subtext, and CTA buttons cascade in on load.
- Shimmering headline — a maroon-gold sheen slides across the hero H1.
- Floating card icons with offset phases.
- Buttons lift with a maroon glow on hover.
- Nav links get an animated gold underline sweep.
- Costume band: drifting kolam dots + slowly shifting maroon gradient.
- Kolam corner dots gently pulse.
- Header gains a shadow once you scroll.

## Files

- `effects.css` — all animation/3D styles (loads after `styles.css`)
- `script.js` — scroll reveal, tilt logic, Three.js hero scene
- HTML pages — identical to the minimal version plus `<canvas id="hero3d">` and the two script tags

## Accessibility & performance

- Every effect is disabled under `prefers-reduced-motion` (canvas hidden, reveals shown instantly, static headline).
- Tilt only activates on precise pointers (desktop) — no jank on touch devices.
- Particle count is modest (~700) and pixel ratio capped at 2 for smooth mobile rendering.
- If Three.js fails to load, the hero silently falls back to the static design.

## Which version to ship?

`redesign/` is the minimal production-safe baseline; `redesign-3d/` layers motion on top without touching the base styles, so you can port both to React and toggle the effects layer.
