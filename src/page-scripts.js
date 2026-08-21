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
      html.__fps_capturing__ * { animation: none !important; transition: none !important; }
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
