# Chennai Beats — Black & White Version

Monochrome edition of the minimal redesign. Same 4 pages, layout, and typography — only the palette changed. Open `index.html` in a browser.

## Palette

| Role | Color |
|---|---|
| Background | `#FFFFFF` white |
| Section alt background | `#F2F2F2` light gray |
| Text / headings | `#0A0A0A` near-black |
| Body text | `#4A4A4A` dark gray |
| Primary buttons / costume band | `#111111` black (hover `#333333`) |
| Accents (eyebrows, dots, stars, dividers) | `#555555` gray |
| Card borders / lines | `#E2E2E2` |
| Footer | Black background, `#CFCFCF` text, white link hover |

## Notes

- Emoji icons are rendered grayscale via CSS `filter` so no color sneaks in.
- Focus rings, contrast, and tap sizes unchanged — accessibility is preserved (contrast is even higher now).
- The other two versions are untouched: `redesign/` (warm minimal) and `redesign-3d/` (animated).
- To make the B&W animated version, copy `effects.css` + `script.js` from `redesign-3d/` and change the three particle palette colors in `script.js` to grays.
