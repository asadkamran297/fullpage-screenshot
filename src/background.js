import {
  preparePage,
  scrollTo,
  restorePage,
  mountOverlay,
  updateOverlay,
  unmountOverlay
} from "./page-scripts.js";

// captureVisibleTab is throttled by Chrome (MAX_CAPTURE_VISIBLE_TAB_CALLS_PER_SECOND).
const CAPTURE_INTERVAL_MS = 550;
const SETTLE_MS = 150;
const BLOCKED_SCHEMES = ["chrome:", "chrome-extension:", "edge:", "about:", "devtools:"];

let busy = false;

chrome.action.onClicked.addListener((tab) => {
  if (busy) return;
  busy = true;
  run(tab)
    .catch((err) => reportError(tab.id, err))
    .finally(() => {
      busy = false;
      clearBadge(tab.id);
    });
});

async function run(tab) {
  if (!tab || !tab.id) throw new Error("No active tab.");
  const scheme = new URL(tab.url || "https://invalid").protocol;
  if (BLOCKED_SCHEMES.includes(scheme) || (tab.url || "").startsWith("https://chromewebstore.google.com")) {
    throw new Error("This page cannot be captured by extensions.");
  }

  const metrics = await runInPage(tab.id, preparePage);
  await runInPage(tab.id, mountOverlay).catch(() => {});
  try {
    const shots = await captureTiles(tab.id, tab.windowId, metrics);
    await setOverlay(tab.id, { percent: 100, label: "Stitching image…" });
    const dataUrl = await stitch(shots, metrics);
    await setOverlay(tab.id, { done: true, label: "Opening screenshot…" });
    await openViewer(dataUrl, tab, metrics);
  } finally {
    await runInPage(tab.id, restorePage, [metrics]).catch(() => {});
    await runInPage(tab.id, unmountOverlay).catch(() => {});
  }
}

async function captureTiles(tabId, windowId, m) {
  const stepX = m.viewportWidth;
  const stepY = m.viewportHeight;
  const cols = Math.max(1, Math.ceil(m.pageWidth / stepX));
  const rows = Math.max(1, Math.ceil(m.pageHeight / stepY));
  const shots = [];
  let done = 0;
  const total = cols * rows;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Last tile in a row/column is clamped to the page edge, so read back the
      // real scroll offset instead of assuming it landed where we asked.
      const target = {
        x: Math.min(col * stepX, Math.max(0, m.pageWidth - stepX)),
        y: Math.min(row * stepY, Math.max(0, m.pageHeight - stepY)),
        hideFixed: !(row === 0 && col === 0)
      };
      const at = await runInPage(tabId, scrollTo, [target]);
      await sleep(SETTLE_MS);

      // The overlay is on-screen furniture, so it must be gone for the split
      // second the tab is actually photographed.
      await setOverlay(tabId, { visible: false });
      const dataUrl = await capture(windowId);
      shots.push({ dataUrl, x: at.x, y: at.y });

      done++;
      const percent = Math.round((done / total) * 100);
      await setOverlay(tabId, { visible: true, percent });
      setBadge(tabId, `${percent}`);
      if (done < total) await sleep(CAPTURE_INTERVAL_MS);
    }
  }
  return shots;
}

function setOverlay(tabId, state) {
  return runInPage(tabId, updateOverlay, [state]).catch(() => {});
}

async function capture(windowId, attempt = 0) {
  try {
    return await chrome.tabs.captureVisibleTab(windowId, { format: "png" });
  } catch (err) {
    if (attempt < 3) {
      await sleep(CAPTURE_INTERVAL_MS * (attempt + 1));
      return capture(windowId, attempt + 1);
    }
    throw err;
  }
}

async function stitch(shots, m) {
  const scale = m.devicePixelRatio;
  const canvas = new OffscreenCanvas(
    Math.round(m.pageWidth * scale),
    Math.round(m.pageHeight * scale)
  );
  const ctx = canvas.getContext("2d");
  for (const shot of shots) {
    const bitmap = await createImageBitmap(await (await fetch(shot.dataUrl)).blob());
    ctx.drawImage(bitmap, Math.round(shot.x * scale), Math.round(shot.y * scale));
    bitmap.close();
  }
  const blob = await canvas.convertToBlob({ type: "image/png" });
  return blobToDataUrl(blob);
}

async function openViewer(dataUrl, tab, m) {
  const id = `shot_${Date.now()}`;
  await chrome.storage.local.set({
    [id]: {
      dataUrl,
      title: tab.title || "Screenshot",
      url: tab.url || "",
      width: Math.round(m.pageWidth * m.devicePixelRatio),
      height: Math.round(m.pageHeight * m.devicePixelRatio),
      createdAt: Date.now()
    }
  });
  await chrome.tabs.create({
    url: chrome.runtime.getURL(`src/viewer.html?id=${id}`),
    index: tab.index + 1
  });
}

async function runInPage(tabId, func, args = []) {
  const [result] = await chrome.scripting.executeScript({
    target: { tabId },
    func,
    args
  });
  if (!result) throw new Error("Could not run in the page.");
  return result.result;
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

function setBadge(tabId, text) {
  chrome.action.setBadgeBackgroundColor({ color: "#2563eb" });
  chrome.action.setBadgeText({ tabId, text });
}

function clearBadge(tabId) {
  chrome.action.setBadgeText({ tabId, text: "" });
}

function reportError(tabId, err) {
  console.error("[Full Page Screenshot]", err);
  const message = err && err.message ? err.message : String(err);
  chrome.action.setBadgeBackgroundColor({ color: "#dc2626" });
  chrome.action.setBadgeText({ tabId, text: "!" });
  chrome.action.setTitle({ tabId, title: `Capture failed: ${message}` });
  setTimeout(() => clearBadge(tabId), 4000);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
