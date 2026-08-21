# Privacy Policy — Full Page Screenshot

_Last updated: 2026-08-21_

Full Page Screenshot does not collect, transmit, sell, or share any user data.

## What the extension accesses

When you click the extension's toolbar icon, it reads the content of that one tab in order to measure the page, scroll it, and capture its pixels. This happens only on the tab you clicked, only at the moment you click, and only for as long as the capture takes.

## What is stored

The finished PNG is written to `chrome.storage.local` purely to hand it to the viewer tab that opens immediately afterwards. The viewer deletes it from storage as soon as it loads the image. Nothing else is stored.

## What is transmitted

Nothing. The extension makes no network requests, contains no analytics, no tracking, and no remote code. Screenshots never leave your device unless you choose to download or copy them yourself.

## Permissions

- `activeTab` — read the current tab's pixels after you click the icon
- `scripting` — inject the measuring and scrolling helpers into that tab
- `storage` / `unlimitedStorage` — temporarily hold the screenshot for the viewer tab and remember the auto-copy setting
- `clipboardWrite` — place the finished screenshot on your clipboard

## Contact

Open an issue at https://github.com/asadkamran297/fullpage-screenshot/issues
