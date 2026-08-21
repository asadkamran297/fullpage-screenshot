import { imageToPdf } from "./pdf.js";
import { dataUrlToBlob } from "./data-url.js";

const params = new URLSearchParams(location.search);
const id = params.get("id");

const els = {
  title: document.getElementById("title"),
  subtitle: document.getElementById("subtitle"),
  status: document.getElementById("status"),
  hint: document.getElementById("hint"),
  shot: document.getElementById("shot"),
  copy: document.getElementById("copy"),
  download: document.getElementById("download"),
  menu: document.getElementById("menu"),
  toast: document.getElementById("toast")
};

let shot = null;
let sourceBlob = null;
let baseName = "screenshot";
let toastTimer = null;

init();

async function init() {
  if (!id) return fail("Missing screenshot id.");

  const store = await chrome.storage.local.get(id);
  shot = store[id];
  if (!shot) return fail("Screenshot not found. Try capturing again.");

  // One-shot handoff: drop it from storage so captures do not pile up on disk.
  chrome.storage.local.remove(id);

  baseName = `${safeName(shot.title)}-${stamp(shot.createdAt)}`;
  document.title = `${shot.title} — Screenshot`;
  els.title.textContent = shot.title;
  els.subtitle.textContent = `${shot.width} × ${shot.height} px · ${shot.url}`;
  els.status.hidden = true;
  els.shot.src = shot.dataUrl;
  els.shot.hidden = false;
  els.hint.hidden = false;

  sourceBlob = dataUrlToBlob(shot.dataUrl);

  els.download.addEventListener("click", () => saveAs("png"));
  els.copy.addEventListener("click", copyImage);
  els.shot.addEventListener("contextmenu", onContextMenu);
  document.addEventListener("click", closeMenu);
  document.addEventListener("scroll", closeMenu, true);
  window.addEventListener("blur", closeMenu);
  window.addEventListener("resize", closeMenu);
  document.addEventListener("keydown", onKeyDown);
}

/* --------------------------------------------------------------- formats */

const FORMATS = {
  png: { label: "PNG", ext: "png", mime: "image/png" },
  jpg: { label: "JPG", ext: "jpg", mime: "image/jpeg", quality: 0.92, flatten: true },
  jpeg: { label: "JPEG", ext: "jpeg", mime: "image/jpeg", quality: 0.92, flatten: true },
  webp: { label: "WebP", ext: "webp", mime: "image/webp", quality: 0.92 },
  "webp-lossless": { label: "WebP lossless", ext: "webp", mime: "image/webp", quality: 1 },
  pdf: { label: "PDF", ext: "pdf" }
};

async function toBlob(kind) {
  const format = FORMATS[kind];
  if (kind === "pdf") return imageToPdf(sourceBlob);
  if (format.mime === "image/png") return sourceBlob;

  const bitmap = await createImageBitmap(sourceBlob);
  try {
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    const ctx = canvas.getContext("2d");
    if (format.flatten) {
      // JPEG has no alpha channel; without this, transparent areas turn black.
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, bitmap.width, bitmap.height);
    }
    ctx.drawImage(bitmap, 0, 0);

    const blob = await canvas.convertToBlob({ type: format.mime, quality: format.quality });
    // convertToBlob silently falls back to PNG for a codec the browser lacks.
    if (!blob || blob.type !== format.mime) {
      throw new Error(`${format.label} is not supported by this browser.`);
    }
    return blob;
  } finally {
    bitmap.close();
  }
}

async function saveAs(kind) {
  const format = FORMATS[kind];
  closeMenu();
  toast(`Preparing ${format.label}…`, 0);
  try {
    const blob = await toBlob(kind);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${baseName}.${format.ext}`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
    toast(`Saved as ${format.label} · ${formatSize(blob.size)}`);
  } catch (err) {
    toast(err.message || `Could not save as ${format.label}.`);
  }
}

/* ------------------------------------------------------------- clipboard */

async function copyImage() {
  closeMenu();
  try {
    // Chrome's clipboard accepts PNG only for images.
    await navigator.clipboard.write([new ClipboardItem({ "image/png": sourceBlob })]);
    toast("Image copied to clipboard");
  } catch {
    toast("Could not copy the image");
  }
}

async function copyText(text, label) {
  closeMenu();
  try {
    await navigator.clipboard.writeText(text);
    toast(`${label} copied`);
  } catch {
    toast(`Could not copy the ${label.toLowerCase()}`);
  }
}

function openInNewTab() {
  closeMenu();
  const url = URL.createObjectURL(sourceBlob);
  window.open(url, "_blank");
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}

function printImage() {
  closeMenu();
  window.print();
}

/* ------------------------------------------------------------------ menu */

function menuModel() {
  return [
    { heading: "Save image as" },
    { glyph: "🖼", label: "PNG", note: "lossless", run: () => saveAs("png") },
    { glyph: "🗜", label: "JPG", note: "smaller", run: () => saveAs("jpg") },
    { glyph: "🗜", label: "JPEG", note: "same codec", run: () => saveAs("jpeg") },
    { glyph: "⚡", label: "WebP", note: "smallest", run: () => saveAs("webp") },
    { glyph: "⚡", label: "WebP lossless", run: () => saveAs("webp-lossless") },
    { glyph: "📄", label: "PDF", note: "A4 pages", run: () => saveAs("pdf") },
    { separator: true },
    { glyph: "📋", label: "Copy image", run: copyImage },
    { glyph: "🔗", label: "Copy page URL", run: () => copyText(shot.url, "Page URL") },
    { glyph: "🔤", label: "Copy as data URL", run: () => copyText(shot.dataUrl, "Data URL") },
    { separator: true },
    { glyph: "↗", label: "Open image in new tab", run: openInNewTab },
    { glyph: "🖨", label: "Print…", run: printImage }
  ];
}

function onContextMenu(event) {
  // Shift bypasses this and brings back Chrome's own menu.
  if (event.shiftKey) return;
  event.preventDefault();
  openMenu(event.clientX, event.clientY);
}

function openMenu(x, y) {
  els.menu.replaceChildren();

  for (const item of menuModel()) {
    if (item.separator) {
      const sep = document.createElement("div");
      sep.className = "menu-sep";
      els.menu.append(sep);
      continue;
    }
    if (item.heading) {
      const heading = document.createElement("div");
      heading.className = "menu-heading";
      heading.textContent = item.heading;
      els.menu.append(heading);
      continue;
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = "menu-item";
    button.setAttribute("role", "menuitem");

    const glyph = document.createElement("span");
    glyph.className = "glyph";
    glyph.textContent = item.glyph;

    const label = document.createElement("span");
    label.className = "label";
    label.textContent = item.label;

    button.append(glyph, label);

    if (item.note) {
      const note = document.createElement("span");
      note.className = "note";
      note.textContent = item.note;
      button.append(note);
    }

    button.addEventListener("click", item.run);
    els.menu.append(button);
  }

  els.menu.hidden = false;

  // Show it first so it can be measured, then nudge it back inside the viewport.
  const rect = els.menu.getBoundingClientRect();
  const left = Math.min(x, window.innerWidth - rect.width - 8);
  const top = Math.min(y, window.innerHeight - rect.height - 8);
  els.menu.style.left = `${Math.max(8, left)}px`;
  els.menu.style.top = `${Math.max(8, top)}px`;
  els.menu.querySelector(".menu-item").focus();
}

function closeMenu() {
  els.menu.hidden = true;
}

function onKeyDown(event) {
  if (els.menu.hidden) return;

  const items = [...els.menu.querySelectorAll(".menu-item")];
  const index = items.indexOf(document.activeElement);

  if (event.key === "Escape") {
    closeMenu();
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    items[(index + 1) % items.length].focus();
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    items[(index - 1 + items.length) % items.length].focus();
  }
}

/* ------------------------------------------------------------------ misc */

function toast(message, duration = 2600) {
  clearTimeout(toastTimer);
  els.toast.textContent = message;
  els.toast.hidden = false;
  if (duration) toastTimer = setTimeout(() => (els.toast.hidden = true), duration);
}

function fail(message) {
  els.status.textContent = message;
  els.copy.disabled = true;
  els.download.disabled = true;
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function safeName(title) {
  const clean = (title || "screenshot").replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "");
  return (clean || "screenshot").slice(0, 60).toLowerCase();
}

function stamp(ms) {
  return new Date(ms).toISOString().replace(/[:.]/g, "-").slice(0, 19);
}
