const params = new URLSearchParams(location.search);
const id = params.get("id");

const els = {
  title: document.getElementById("title"),
  subtitle: document.getElementById("subtitle"),
  status: document.getElementById("status"),
  shot: document.getElementById("shot"),
  copy: document.getElementById("copy"),
  download: document.getElementById("download")
};

init();

async function init() {
  if (!id) return fail("Missing screenshot id.");

  const store = await chrome.storage.local.get(id);
  const shot = store[id];
  if (!shot) return fail("Screenshot not found. Try capturing again.");

  // One-shot handoff: drop it from storage so captures do not pile up on disk.
  chrome.storage.local.remove(id);

  const name = safeName(shot.title);
  document.title = `${shot.title} — Screenshot`;
  els.title.textContent = shot.title;
  els.subtitle.textContent = `${shot.width} × ${shot.height} px · ${shot.url}`;
  els.status.hidden = true;
  els.shot.src = shot.dataUrl;
  els.shot.hidden = false;

  els.download.addEventListener("click", () => {
    const a = document.createElement("a");
    a.href = shot.dataUrl;
    a.download = `${name}-${stamp(shot.createdAt)}.png`;
    a.click();
  });

  els.copy.addEventListener("click", async () => {
    try {
      const blob = await (await fetch(shot.dataUrl)).blob();
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      flash(els.copy, "Copied");
    } catch {
      flash(els.copy, "Copy failed");
    }
  });
}

function fail(message) {
  els.status.textContent = message;
  els.copy.disabled = true;
  els.download.disabled = true;
}

function flash(button, text) {
  const original = button.textContent;
  button.textContent = text;
  setTimeout(() => (button.textContent = original), 1500);
}

function safeName(title) {
  const clean = (title || "screenshot").replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "");
  return (clean || "screenshot").slice(0, 60).toLowerCase();
}

function stamp(ms) {
  return new Date(ms).toISOString().replace(/[:.]/g, "-").slice(0, 19);
}
