# Chrome Web Store listing

## Name
Full Page Screenshot

## Short description (132 char max)
Capture the whole scrollable page as one PNG and open it in a new tab to copy or download. No accounts, no uploads, no tracking.

## Detailed description
Full Page Screenshot captures everything on a page — top to bottom, edge to edge — not just what fits on your screen.

Click the toolbar icon (or press Alt+Shift+S) and the extension scrolls the page, captures each section, and stitches them into a single sharp PNG. The result opens in a new tab where you can preview it, copy it to the clipboard, or download it.

WHAT IT DOES
• Captures the full scrollable height and width of any page
• Renders at your display's pixel density, so text stays crisp on HiDPI screens
• Hides sticky headers and floating banners after the first section, so they don't repeat down the image
• Pauses animations and transitions while capturing for clean, seamless joins
• Copies the finished screenshot to your clipboard automatically, so you can paste it right away
• Right-click the result to save it as PNG, JPG, JPEG, WebP or a multi-page PDF, copy it, or print it
• Restores your original scroll position when it finishes
• Shows live progress on the page itself and on the toolbar badge, so you always know it is working

PRIVACY
Everything happens locally in your browser. There are no servers, no accounts, no analytics, and no network requests of any kind. Your screenshots never leave your device. The extension requests no host permissions — it can only read a page after you click its icon on that page.

NOTES
Chrome does not allow extensions to run on chrome:// pages, the Chrome Web Store, or other browser-internal pages, so those cannot be captured. Very tall pages take a few seconds because Chrome limits how often a tab can be captured.

Open source (MIT): https://github.com/asadkamran297/fullpage-screenshot

## Category
Productivity / Workflow & Planning

## Privacy practices answers
- Single purpose: Capture a screenshot of the entire scrollable area of the user's current page and present it for saving.
- activeTab: Needed to read the pixels of the tab the user explicitly invokes the extension on.
- scripting: Needed to inject the helpers that measure page dimensions and scroll the page during capture.
- storage / unlimitedStorage: Needed to pass the generated image to the viewer tab; the entry is deleted as soon as the viewer loads it. Also stores the auto-copy preference.
- clipboardWrite: Needed to place the finished screenshot on the clipboard automatically when the viewer opens.
- Remote code: No remote code is used.
- Data collection: No user data is collected or transmitted.

## Assets still needed before submitting
- [ ] 1280x800 (or 640x400) screenshot of the viewer tab showing a captured page — at least one, up to five
- [ ] 440x280 small promo tile (optional but recommended)
- [ ] Privacy policy URL — point it at the raw PRIVACY.md or a GitHub Pages copy
