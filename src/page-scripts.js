// These functions are serialized and injected into the page by chrome.scripting,
// so they must be fully self-contained (no imports, no closure variables).

export function preparePage() {
  const doc = document.documentElement;
  const body = document.body;
  const STYLE_ID = "__fps_capture_style__";

  const state = {
    scrollX: window.scrollX,
    scrollY: window.scrollY,
    htmlScrollBehavior: doc.style.scrollBehavior,
    htmlOverflow: doc.style.overflow,
    bodyOverflow: body ? body.style.overflow : ""
  };

  doc.style.scrollBehavior = "auto";
  doc.style.overflow = "hidden";
  if (body) body.style.overflow = "hidden";

  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      html.__fps_capturing__ body * { animation: none !important; transition: none !important; }
      html.__fps_capturing__ ::-webkit-scrollbar { display: none !important; }
      .__fps_hidden__ { visibility: hidden !important; }
    `;
    document.head.appendChild(style);
  }
  doc.classList.add("__fps_capturing__");

  const pageWidth = Math.max(
    doc.scrollWidth, body ? body.scrollWidth : 0,
    doc.clientWidth
  );
  const pageHeight = Math.max(
    doc.scrollHeight, body ? body.scrollHeight : 0,
    doc.clientHeight
  );

  return {
    ...state,
    pageWidth,
    pageHeight,
    viewportWidth: doc.clientWidth,
    viewportHeight: doc.clientHeight,
    devicePixelRatio: window.devicePixelRatio || 1
  };
}

export function scrollTo(target) {
  // Fixed and sticky elements would repeat on every tile, so hide them for all
  // tiles except the first one, where they belong.
  const marked = document.querySelectorAll(".__fps_hidden__");
  for (const el of marked) el.classList.remove("__fps_hidden__");

  if (target.hideFixed) {
    for (const el of document.body ? document.body.querySelectorAll("*") : []) {
      const pos = getComputedStyle(el).position;
      if (pos === "fixed" || pos === "sticky") el.classList.add("__fps_hidden__");
    }
  }

  window.scrollTo(target.x, target.y);
  return { x: window.scrollX, y: window.scrollY };
}

export function restorePage(state) {
  const doc = document.documentElement;
  for (const el of document.querySelectorAll(".__fps_hidden__")) {
    el.classList.remove("__fps_hidden__");
  }
  doc.classList.remove("__fps_capturing__");
  const style = document.getElementById("__fps_capture_style__");
  if (style) style.remove();

  doc.style.overflow = state.htmlOverflow;
  if (document.body) document.body.style.overflow = state.bodyOverflow;
  window.scrollTo(state.scrollX, state.scrollY);
  doc.style.scrollBehavior = state.htmlScrollBehavior;
}

// The overlay lives on <html>, outside <body>, so the fixed-element sweep in
// scrollTo never touches it and the animation freeze never stops its spinner.
export function mountOverlay() {
  const HOST_ID = "__fps_overlay__";
  if (document.getElementById(HOST_ID)) return;

  const host = document.createElement("div");
  host.id = HOST_ID;
  host.style.cssText = "all: initial; display: block; position: fixed; inset: 0; z-index: 2147483647; pointer-events: none;";
  const root = host.attachShadow({ mode: "open" });
  root.innerHTML = `
    <style>
      @keyframes fps-spin { to { transform: rotate(360deg); } }
      @keyframes fps-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
      .card {
        position: fixed;
        top: 16px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 18px 12px 14px;
        border-radius: 999px;
        background: rgba(17, 18, 22, 0.92);
        color: #fff;
        font: 500 14px/1.2 system-ui, -apple-system, "Segoe UI", sans-serif;
        box-shadow: 0 10px 34px rgba(0, 0, 0, 0.35);
        animation: fps-in 180ms ease-out;
      }
      .ring {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        border: 2.5px solid rgba(255, 255, 255, 0.25);
        border-top-color: #60a5fa;
        animation: fps-spin 700ms linear infinite;
      }
      .ring.done {
        border-color: #22c55e;
        animation: none;
      }
      .text { white-space: nowrap; }
      .pct { color: #93c5fd; font-variant-numeric: tabular-nums; }
      .bar {
        position: absolute;
        left: 14px;
        right: 14px;
        bottom: 6px;
        height: 3px;
        border-radius: 2px;
        background: rgba(255, 255, 255, 0.18);
        overflow: hidden;
      }
      .fill { height: 100%; width: 0%; background: #60a5fa; border-radius: 2px; }
    </style>
    <div class="card">
      <div class="ring" part="ring"></div>
      <div class="text"><span class="msg">Capturing full page…</span> <span class="pct">0%</span></div>
      <div class="bar"><div class="fill"></div></div>
    </div>
  `;
  document.documentElement.appendChild(host);
}

export function updateOverlay(state) {
  const host = document.getElementById("__fps_overlay__");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  if (typeof state.visible === "boolean") {
    host.style.display = state.visible ? "block" : "none";
  }
  if (typeof state.percent === "number") {
    root.querySelector(".pct").textContent = `${state.percent}%`;
    root.querySelector(".fill").style.width = `${state.percent}%`;
  }
  if (state.label) {
    root.querySelector(".msg").textContent = state.label;
  }
  if (state.done) {
    root.querySelector(".ring").classList.add("done");
  }
}

export function unmountOverlay() {
  const host = document.getElementById("__fps_overlay__");
  if (host) host.remove();
}
