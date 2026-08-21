# Release checklist

Tracking what still stands between this repo and a live Chrome Web Store listing.

## Status

Version **1.3.0** — code complete, not yet verified in a real browser.

## Before publishing

- [ ] **Test in a real Chrome window.** `chrome://extensions` → Developer mode → Load unpacked → select this folder. Capture a long page and check: nothing missing, no seams, no repeated sticky header, progress overlay absent from the final image, original scroll position restored.
- [ ] **Store screenshot.** 1280x800 or 640x400, at least one, up to five. Screenshot the viewer tab showing a captured page.
- [ ] **Small promo tile.** 440x280. Optional but recommended.
- [ ] **Host the privacy policy.** `PRIVACY.md` exists but needs a public URL — enable GitHub Pages or link the raw file, then paste the URL into the dashboard.
- [ ] **Developer registration.** One-time $5 fee on the [Developer Dashboard](https://chrome.google.com/webstore/devconsole).
- [ ] **Build and upload.** `npm run zip`, then upload `dist/fullpage-screenshot-<version>.zip`.

## Listing copy

Name, short description, full description and the privacy-practices answers are all written out in [STORE.md](STORE.md) — copy them straight into the dashboard fields.

[GROWTH.md](GROWTH.md) holds the researched version: keyword map, optimised listing copy, the five screenshots to shoot, and the launch plan.

## Known gaps to revisit after launch

- Lazy-loaded content that never renders during the scroll pass can appear blank.
- Very tall pages are bounded by the browser's maximum canvas size.
- Capture speed is capped by Chrome's `captureVisibleTab` throttle (~2 calls/second).
