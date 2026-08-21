# Full Page Screenshot

A Chrome extension (Manifest V3) that captures the **entire scrollable page** — not just the visible viewport — stitches it into a single PNG, and opens it in a new tab where you can preview, copy, or download it.

![icon](icons/icon128.png)

## Features

- One click (or `Alt+Shift+S`) captures the full page height and width
- Automatic scroll-and-stitch with device-pixel-ratio aware rendering
- Hides repeated `position: fixed` / `sticky` headers so they appear only once
- Freezes animations and transitions during capture for clean seams
- On-page progress overlay with a spinner, percentage and progress bar, hidden for the instant each tile is photographed so it never lands in the image
- Result opens in a new tab with **Copy to clipboard** and **Download PNG**
- Restores your original scroll position when it's done
- No servers, no analytics, no network requests — everything stays on your machine

## Install (development)

1. Clone this repo:
   ```bash
   git clone https://github.com/asadkamran297/fullpage-screenshot.git
   ```
2. Open `chrome://extensions` and turn on **Developer mode**.
3. Click **Load unpacked** and select the cloned folder.
4. Pin the extension and click its icon on any page.

## How it works

| Step | File | What happens |
|------|------|--------------|
| 1 | `src/page-scripts.js` → `preparePage` | Measures the page, hides scrollbars, freezes animation |
| 2 | `src/background.js` → `captureTiles` | Scrolls tile by tile and calls `chrome.tabs.captureVisibleTab` |
| 3 | `src/background.js` → `stitch` | Draws every tile onto an `OffscreenCanvas` at the real scroll offsets |
| 4 | `src/viewer.html` | Opens the stitched PNG in a new tab for preview / copy / download |

Chrome throttles `captureVisibleTab`, so tiles are captured roughly every 550 ms. A tall page takes a few seconds — the toolbar badge shows progress as a percentage.

## Permissions

| Permission | Why it is needed |
|------------|------------------|
| `activeTab` | Read pixels of the tab you explicitly click the button on |
| `scripting` | Inject the measure/scroll helpers into that tab |
| `storage` + `unlimitedStorage` | Hand the finished PNG to the viewer tab (deleted right after it loads) |

There is no `host_permissions` entry — the extension has zero access to any page until you click its icon.

## Limitations

- Chrome blocks extensions on `chrome://`, `chrome-extension://`, and the Chrome Web Store, so those pages cannot be captured.
- Lazy-loaded content that never renders during the scroll pass may appear blank.
- Very large pages are limited by the browser's maximum canvas size.

## Packaging for the Chrome Web Store

```bash
npm run zip     # produces dist/fullpage-screenshot-<version>.zip
```

Upload the zip in the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole). See [STORE.md](STORE.md) for the listing copy, [PRIVACY.md](PRIVACY.md) for the privacy policy, and [CHECKLIST.md](CHECKLIST.md) for everything still outstanding before submission.

## License

MIT — see [LICENSE](LICENSE).
