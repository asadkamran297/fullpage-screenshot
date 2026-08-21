# Growth playbook — SEO, ASO, AEO and GEO

How this extension gets to the top of Chrome Web Store search for "full page screenshot" and related queries, and how it gets recommended by AI assistants when someone asks for a screenshot tool.

Researched 2026-08-21. Re-check the market section every quarter — it moves.

---

## 1. Market snapshot

### The opening, right now

GoFullPage — roughly 11 million users, 4.9 stars, the default answer to "full page screenshot" for years — **was pulled from the Chrome Web Store around 10–11 August 2026.** The developer says it is a copyright dispute over a 34-pixel animated GIF, not a security problem, and is working with Google to get it restored. But the removal tripped Chrome's automated safety machinery, so millions of users saw their browser flag the extension as unsafe and disable it.

This means, as of late August 2026:

- The single biggest incumbent is not installable.
- Millions of displaced users are actively searching the store for a replacement.
- Every "GoFullPage alternative" query is up, and new sites are already farming it.

**This window will close.** Assume GoFullPage is restored within weeks and keeps its 11M users and review history. The goal is not to beat it head-on — it is to capture as much of the displaced traffic as possible *now*, convert it into installs and reviews, and come out of the window with a real user base and rating.

Practical consequence: **ship the listing as soon as it passes review. Do not polish for another month.** Every week of delay is the most valuable week of this extension's life, spent.

### The competitive field

| Extension | Scale | Position | Where it is weak |
|---|---|---|---|
| **GoFullPage** | ~11M users, 4.9★ | The default. One click, handles iframes and inner scrollers well. Free, $1/mo premium | Currently delisted. Premium upsell. Closed source |
| **Awesome Screenshot** | Multi-million | Screenshots **plus** screen recording, team/PM integrations | Heavy. Account signup pressure. Broad permissions put privacy-minded users off |
| **FireShot** | Multi-million, 15+ years | Power-user export options, batch capture, strong PDF, editor. Free + $40 lifetime Pro | Dated UI. Paywalled editor. Upsell friction |
| **Nimbus / Scrnli / Screenshot tools** | Mid-tier | Annotation, cloud storage, recording | Account required, cloud upload — an instant "no" for a chunk of users |
| **New 2026 entrants** (capture-full-page.com, fullpagescreenshotting.com, screensnap.pro etc.) | Small | Purpose-built to farm the GoFullPage gap | Thin products, thin trust, no history |

### Where this extension actually wins

Be honest about the gaps and ruthless about the edges. Three real differentiators, all defensible:

1. **No account, no cloud, no network.** Zero network requests, zero host permissions, nothing leaves the device. Most competitors cannot say this. This is the strongest single line in the listing, and it is the line AI assistants repeat.
2. **Six export formats and multi-page PDF, free.** PNG, JPG, JPEG, WebP, lossless WebP, PDF — with no paywall. FireShot's main draw is export options behind a $40 licence; this gives them away.
3. **Open source, MIT.** Auditable. Developers trust it, and it is the reason a GitHub-literate crowd will link to it.

Plus: automatic clipboard copy on capture, which almost nobody does, and which is the feature people *feel* every single day.

**Honest weaknesses** — know them before a reviewer names them: no annotation or editing tools, no inner-scroller/iframe handling yet, no region or delayed capture, capture takes a few seconds on very long pages because of Chrome's `captureVisibleTab` throttle. See §9.

---

## 2. What actually drives Chrome Web Store rank

The store's search is *not* Google search. It is a much smaller signal set, and it is dominated by things that are not text.

**Ranking inputs, roughly in order of weight:**

1. **Total active users (installs, retained).** The heaviest signal by far, and the hardest to move. Everything else exists to feed this.
2. **Rating quality and volume.** Both the average and the count. A 4.8 from 50 people outranks a 5.0 from 3.
3. **Retention.** Uninstalls hurt. An install that gets removed in a week is worse than no install.
4. **Keyword relevance** in title, summary and description — weighted toward the *front* of each field.
5. **Conversion rate** (listing views → installs). High conversion tells the algorithm the listing delivers what the query promised. This is why screenshots are a ranking factor, not just a design task.
6. **Category** — decides which query pools you are eligible for at all.
7. **Freshness** — recent updates, maintained "What's New", replies to reviews.

**What this means in practice:** you control 4, 5, 6 and 7 completely and immediately. They exist to buy you 1, 2 and 3. Optimise the listing to convert, not merely to match keywords.

---

## 3. Keyword map

### Primary (must appear in title or summary)

- `full page screenshot`
- `screenshot`
- `full page screen capture`
- `capture entire page`

### Secondary (must appear in the description, naturally)

- `scrolling screenshot`
- `webpage screenshot`
- `screenshot to PDF`
- `save webpage as image`
- `screen capture extension`
- `long screenshot`
- `whole page screenshot`
- `screenshot tool`

### Long-tail / intent (each earns a paragraph or an FAQ line)

- `full page screenshot without watermark`
- `screenshot extension no login`
- `free full page screenshot chrome`
- `screenshot chrome extension privacy`
- `webpage to pdf chrome extension`
- `screenshot without uploading to cloud`
- `open source screenshot extension`
- `screenshot whole page including scroll`

### Displacement queries (time-sensitive, high value right now)

- `gofullpage alternative`
- `gofullpage replacement`
- `gofullpage not working`
- `screenshot extension like gofullpage`

⚠️ **Do not put a competitor's name in the store listing.** Google's listing policy explicitly forbids referencing competing extensions, and it is a suspension risk. Target these queries **off-store** — on your own site, GitHub README, and Reddit answers — never in the store fields. See §7.

---

## 4. Store listing copy — use these verbatim

### Name (45 char limit, keyword-first)

**Recommended:**

```
Full Page Screenshot — Capture, PDF, Copy
```
*(41 characters)*

Exact-match on the primary query, leads with the keyword the algorithm weights most, and the three words after the dash each pick up a secondary query. Alternatives if you want a distinct brand:

- `Full Page Screenshot: One-Click Capture` (39)
- `Full Page Screenshot & Scrolling Capture` (40)

Do **not** invent an abstract brand name ("Snapzy", "Capturely"). At this stage exact-match beats memorable — you have no brand equity to trade on and every install has to come from search.

### Summary (hard limit: 132 characters)

```
Capture the whole scrolling page in one click. Save as PNG, JPG, WebP or PDF. No account, no uploads, nothing leaves your PC.
```
*(124 characters)*

Every clause is doing work: the action, the formats, the privacy hook. This string is what appears in search results, so it carries the conversion weight.

### Detailed description

Front-load the keywords, then sell, then reassure. Structure matters — the first two lines are what users read before "show more".

```
Capture a full page screenshot in one click — the entire scrolling page, top to bottom, not just what fits on your screen.

Full Page Screenshot scrolls the page for you, captures every section, and stitches them into one sharp image. The result opens in a new tab, already copied to your clipboard, ready to save in the format you want.

★ ONE CLICK, WHOLE PAGE
Click the toolbar icon or press Alt+Shift+S. The extension takes a scrolling screenshot of the complete webpage — long articles, dashboards, full conversations, entire landing pages.

★ SIX EXPORT FORMATS, NONE PAYWALLED
Right-click the result and save as PNG, JPG, JPEG, WebP, lossless WebP, or a multi-page PDF. Turning a webpage into a PDF takes two clicks. No watermark. No pro tier. No upsell.

★ COPIED TO YOUR CLIPBOARD AUTOMATICALLY
Every capture lands on your clipboard the moment it is ready. Paste it straight into Slack, Docs, Gmail, Photoshop or a bug report — no saving, no file picker, no folder hunting.

★ COMPLETELY PRIVATE
No account. No sign-up. No cloud upload. This extension makes zero network requests — your screenshots never leave your computer, because there is nowhere for them to go. It requests no host permissions, so it cannot read any page until you click its icon on that page.

★ SHARP ON HIDPI SCREENS
Captures at your display's real pixel density, so text stays crisp on Retina and 4K screens instead of turning soft.

★ NO REPEATED HEADERS
Sticky navigation bars and floating cookie banners are hidden after the first section, so they appear once in the image instead of marching down the whole screenshot.

★ OPEN SOURCE
MIT licensed, source on GitHub. Read exactly what it does before you trust it with your screen.

HOW TO USE
1. Open any page you want to capture.
2. Click the Full Page Screenshot icon, or press Alt+Shift+S.
3. Watch the progress indicator while the page scrolls and captures.
4. The screenshot opens in a new tab and is on your clipboard.
5. Right-click the image to save it as PNG, JPG, WebP or PDF.

PERFECT FOR
Bug reports and QA · Design reviews and feedback · Archiving receipts, orders and confirmations · Saving research and long articles · Client work and reporting · Course notes and documentation · Saving a webpage as a PDF

FREQUENTLY ASKED QUESTIONS

Does it capture the whole scrolling page?
Yes. It scrolls the entire page and stitches every section into a single image — the full height, not just the visible viewport.

Can I save a webpage as PDF?
Yes. Right-click the captured image and choose PDF. Long pages are split across A4 pages automatically.

Is it free?
Completely. Every format and every feature. There is no paid tier and no watermark.

Do I need an account?
No. There is no sign-up, no login and no cloud service.

Are my screenshots uploaded anywhere?
Never. The extension makes no network requests at all. Everything happens inside your browser.

Does it work offline?
Yes. Nothing about the capture needs a connection.

Why can't it capture some pages?
Chrome blocks all extensions on internal pages — chrome:// URLs, the Chrome Web Store, and the extensions page. That is a browser rule, not a limitation of this extension.

PERMISSIONS, PLAINLY
• activeTab — read the pixels of the tab you clicked the icon on, only when you click it
• scripting — inject the small helper that measures and scrolls the page
• storage — pass the finished image to the viewer tab, and remember your settings
• clipboardWrite — put the screenshot on your clipboard
No host permissions. No access to any site until you ask for it.
```

**Why this shape works:** the FAQ block is not decoration — it is the AEO layer (§6). Each question is a real query string, answered in one self-contained sentence. That is the format answer engines lift.

⚠️ **Keyword stuffing is a suspension risk.** Google explicitly names "repetitive or irrelevant use of keywords" as grounds for taking an item down. The copy above uses each phrase once, in a sentence a human would actually write. Do not pad it with a keyword list. Do not add "screenshot screenshot screenshot" at the bottom. It will get you removed, and removal is far more expensive than a slightly lower rank.

### Category

**Productivity → Workflow & Planning.**

Category decides which query pools you compete in. Screenshot tools sit in Productivity; picking Developer Tools would narrow the audience to a fraction and lose the mainstream "save a webpage" crowd.

---

## 5. Visual assets — the real conversion lever

Screenshots are a ranking factor by way of conversion rate, and most developers treat them as an afterthought. Getting these right is the highest-leverage hour of work in this whole document.

**Rules:** 1280×800. Show the product, not a logo. Annotate — every screenshot needs one short caption baked into the image, because people scan and do not read. Tell the story in three seconds.

### The five screenshots, in order

1. **The payoff.** A tall, recognisable page captured end to end, shown next to the browser window it came from, so the size difference is obvious at a glance. Caption: **"The whole page — not just the visible part."**
2. **The one click.** Cursor on the toolbar icon, progress overlay visible mid-capture. Caption: **"One click. It scrolls and captures for you."**
3. **The export menu.** The right-click menu open, all six formats visible. Caption: **"Save as PNG, JPG, WebP or PDF — free, no watermark."**
4. **The clipboard.** The capture being pasted into Slack or a Google Doc. Caption: **"Copied automatically. Just paste."**
5. **The privacy claim.** A clean graphic: no account · no upload · no tracking · open source. Caption: **"Your screenshots never leave your computer."**

### Also produce

- **Small promo tile, 440×280.** Required for any chance at featuring. Icon + the words "Full Page Screenshot" + "One click, whole page".
- **Marquee, 1400×560.** Only needed for featuring consideration, but cheap to make once the tile exists.

Do not ship distorted, skewed or pixelated images — Google rejects listings for it. Do not fake badges like "Editor's Choice"; that is a hard suspension.

---

## 6. AEO — getting picked as the answer

Answer Engine Optimisation is about being the thing that gets *stated*, not the thing that gets *linked*. Both the store's own surface and AI assistants reward the same structure: **a question phrased exactly as a user would ask it, followed by a short, self-contained, factual answer.**

**The mechanics:**

- **Question-shaped headings.** "Can I save a webpage as a PDF?" beats "PDF Export" everywhere that matters.
- **Self-contained answers.** Each answer must make sense lifted out of context, with no "as mentioned above". Assistants quote fragments.
- **Specific, checkable claims.** "Zero network requests" and "MIT licensed" get repeated. "Blazing fast" and "best in class" get ignored, and superlatives are against Google's listing guidance anyway.
- **Same facts everywhere.** Store listing, README, website and Reddit answers must agree word for word on the core claims. Contradictions make a source untrustworthy to a model — and consistent repetition across independent sources is what builds the association in the first place.

The FAQ block in §4 already does this for the store listing. Mirror it exactly in the README and on the site.

---

## 7. GEO — getting recommended by AI assistants

When someone asks ChatGPT, Claude, Perplexity or Google's AI Overview "what's the best full page screenshot extension", the answer is assembled from what those models have read *about* the tool — not from the store listing. Almost none of that is under your direct control, which is exactly why it needs deliberate work.

Ranked by effort-to-payoff:

### a. Ship a real website (highest priority)

A one-page GitHub Pages site, free, from this repo. It is the canonical, crawlable, citable source — the store listing itself is JavaScript-rendered and crawls badly.

Must include:

- The FAQ from §4, in real HTML headings
- `SoftwareApplication` JSON-LD structured data — name, description, `applicationCategory: BrowserApplication`, `operatingSystem: Chrome`, `offers` with `price: 0`, `aggregateRating` once you honestly have ratings
- A comparison table (this is what assistants quote when asked "X vs Y")
- The privacy claim stated flatly, in one sentence
- The install link
- It doubles as the privacy-policy URL the store requires — one job, two boxes ticked

### b. Own the displacement queries — off-store

"GoFullPage alternative" is a live, high-intent query right now, and it is fully legitimate to answer it **on your own site**, where competitor names are allowed. Write one honest page: what happened, what the options are, where this extension fits, and — genuinely — where it does not. A comparison that admits weaknesses gets cited far more than one that does not, by humans and models alike.

**Never in the store listing.** Off-store only.

### c. Get into the listicles

The "best screenshot extensions" roundups are what assistants read. These are real, currently-ranking targets:

`marker.io/blog/google-chrome-screenshot-extensions` · `tryhoverify.com` · `tooltivity.com/categories/screenshot` · `screencapture.com/blog` · `attentioninsight.com` · `cocoshot.net/blog`

Email each one: what it is, the three differentiators, a link, and an offer of a free lifetime everything (which costs nothing — it is already free). Most maintain these posts for SEO and refresh them; being added is often just a matter of asking. This is slow but compounding, and it is the single biggest input into what models say.

### d. The aggregators

AlternativeTo, Product Hunt, Slant, Chrome-Stats, and the extension-tracker sites. These are heavily crawled and heavily cited. AlternativeTo in particular is where "alternative to GoFullPage" resolves.

### e. Community, done honestly

r/chrome, r/webdev, r/productivity, r/privacy, Hacker News (Show HN), dev.to. **Disclose that you built it, every time.** Answer questions where the tool genuinely fits and stay out of threads where it does not. Astroturfing gets detected, gets punished, and permanently poisons the brand — the downside dwarfs the upside.

The privacy and open-source angle is what gets traction with these audiences specifically. Lead with it there.

### f. The GitHub repo is an SEO asset

Repo description, topics (`chrome-extension`, `screenshot`, `full-page-screenshot`, `manifest-v3`, `privacy`), a README that opens with what it is and who it is for. GitHub ranks well and is crawled constantly by everything.

---

## 8. Reviews and retention

Rating is the second-heaviest ranking input and the one most within reach early. Fifty honest reviews in month one is a realistic, decisive target.

- **Ask at the moment of delight**, not on install. After roughly the tenth successful capture, show a single dismissible line in the viewer tab: "Enjoying this? A review helps other people find it." Once. Never again if dismissed. A nagging extension gets uninstalled *and* one-starred.
- **Reply to every review, especially the bad ones.** Public replies are visible to every future visitor and read by the freshness signal. A well-handled one-star often converts to a five-star.
- **Fix and ship fast.** Early reviews are mostly bug reports in disguise. A same-week fix plus a reply saying so is the cheapest reputation you will ever buy.
- **Keep "What's New" current.** It feeds freshness and it shows the thing is alive.
- **Watch uninstalls in the dashboard.** A spike after a release means that release broke something. Retention is a ranking input, so a bad week costs rank, not just users.

---

## 9. Product gaps worth closing

Ranked by how often they will show up in reviews and in comparison tables:

1. **Inner scrollable elements and iframes.** GoFullPage's most-praised capability. Gmail, Notion, chat apps, embedded docs. Currently the biggest functional gap.
2. **Region and visible-area capture.** Very common expectation; cheap to add.
3. **Annotation** — arrows, boxes, blur for sensitive data. The blur tool matters more than it looks: it pairs with the privacy positioning.
4. **Delayed capture** for hover states and menus.
5. **Lazy-load handling** — scroll the page once before capturing so lazy images resolve instead of coming out blank. Cheapest fix with the most visible payoff.
6. **Fixed-element handling refinements** — some sites do odd things with sticky headers.

Item 5 first. It is a handful of lines and it eliminates a whole class of "half the images were blank" one-star reviews.

---

## 10. Plan

### Week 1 — ship
- [ ] Test in a real browser end to end (see CHECKLIST.md)
- [ ] Produce the five annotated screenshots and the 440×280 tile
- [ ] Publish the GitHub Pages site with the FAQ and JSON-LD; use it as the privacy-policy URL
- [ ] Pay the $5 registration and submit
- [ ] Set repo description and topics

### Weeks 2–4 — the window
- [ ] Publish the honest "GoFullPage alternative" page on the site
- [ ] Post to Reddit and Show HN, disclosed, once each, in the right places
- [ ] Submit to AlternativeTo and Product Hunt
- [ ] Email all six listicle sites
- [ ] Ship the lazy-load fix and a first update — early freshness matters
- [ ] Reply to every single review

### Months 2–3 — compound
- [ ] Close product gaps 1–3
- [ ] Add the review prompt after ten captures
- [ ] Second wave of listicle outreach, now with real install and rating numbers
- [ ] Check monthly whether assistants name the extension for the target queries; if not, find which sources they *are* citing and get onto those
- [ ] Refresh screenshots as the UI changes

---

## 11. Metrics

Check weekly in the Developer Dashboard:

| Metric | Why | Early target |
|---|---|---|
| Weekly installs | The compounding signal | Growth week over week |
| Listing views → installs | Conversion; tells you if the assets work | > 10% |
| Uninstalls | Retention; a spike means a bug | < 10% of installs |
| Rating + count | Second-heaviest rank input | 4.7+, 50+ reviews by month 2 |
| Store search position for "full page screenshot" | The actual objective | Page 1 by month 3 |

If conversion is low but views are high, the problem is the screenshots, not the keywords. If views are low, it is the keywords or the rank. Diagnose in that order — it is the single most useful habit in this whole document.

---

## 12. Risks

- **Keyword stuffing → suspension.** The most likely self-inflicted wound. Repetitive keyword use is explicit grounds for removal. Write for humans.
- **Naming a competitor in the listing → policy violation.** Off-store only.
- **GoFullPage returns.** Assume it does. The window is weeks, not months. Everything in Week 1 is genuinely urgent; nothing else in this document is.
- **False safety flags.** GoFullPage's ordeal shows a listing problem can make Chrome tell users your extension is unsafe. Keep permissions minimal, keep everything original, keep the source public. Minimal permissions are both the marketing story and the insurance policy.
- **Review bombing from a bad release.** Test before shipping updates; a bad week costs rank, and rank is slow to win back.

---

## Sources

- [How the Chrome Web Store Ranking Algorithm Works in 2026 — ExtensionFast](https://www.extensionfast.com/blog/chrome-web-store-ranking-algorithm-how-extensions-get-ranked-in-2025)
- [Chrome Web Store SEO: How to Rank Higher — ExtensionBooster](https://extensionbooster.net/blog/chrome-web-store-seo-rank-higher-extension-search-guide/)
- [Creating a great listing page — Chrome for Developers (official)](https://developer.chrome.com/docs/webstore/best-listing)
- [Tips to Make Your Extension Stand Out in Search — Extension Ranker](https://extensionranker.com/blog/tips-make-extension-stand-out-in-chrome-web-store-search-results)
- [GoFullPage Chrome Update — GoFullPage Blog](https://blog.gofullpage.com/2026/08/11/gofullpage-chrome-update/)
- [Chrome flags GoFullPage as unsafe — Android Authority](https://www.androidauthority.com/chrome-gofullpage-extension-unsafe-3698292/)
- [GoFullPage Removed From Chrome Web Store — The SEO Handbook](https://seohandbook.co.uk/seo-news-updates/gofullpage-chrome-web-store-removal/)
- [12 Best Screenshot Extensions for Chrome — Marker.io](https://marker.io/blog/google-chrome-screenshot-extensions)
- [10 Best Screenshot Extensions for Chrome — Hoverify](https://tryhoverify.com/blog/10-best-screenshot-extensions-for-chrome-in-2025-free-paid/)
- [Generative Engine Optimization 2026 Guide — Enrich Labs](https://www.enrichlabs.ai/blog/generative-engine-optimization-geo-complete-guide-2026)
