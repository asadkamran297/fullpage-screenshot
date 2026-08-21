// Minimal single-image PDF writer.
//
// The Web Store forbids remote code, so pulling in a PDF library is off the
// table. A PDF containing nothing but JPEG images is small enough to emit by
// hand: each page holds one DCTDecode XObject stretched to fill the page.

const A4 = { width: 595.28, height: 841.89 };

export async function imageToPdf(blob, options = {}) {
  const pageWidth = options.pageWidth ?? A4.width;
  const pageHeight = options.pageHeight ?? A4.height;
  const quality = options.quality ?? 0.92;

  const bitmap = await createImageBitmap(blob);
  try {
    const scale = pageWidth / bitmap.width;
    const sliceHeightPx = Math.max(1, Math.floor(pageHeight / scale));
    const pages = [];

    for (let top = 0; top < bitmap.height; top += sliceHeightPx) {
      const height = Math.min(sliceHeightPx, bitmap.height - top);
      const canvas = new OffscreenCanvas(bitmap.width, height);
      const ctx = canvas.getContext("2d");
      // JPEG has no alpha, so anything transparent would turn black.
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, bitmap.width, height);
      ctx.drawImage(bitmap, 0, -top);
      const jpeg = await canvas.convertToBlob({ type: "image/jpeg", quality });
      pages.push({
        bytes: new Uint8Array(await jpeg.arrayBuffer()),
        pixelWidth: bitmap.width,
        pixelHeight: height,
        width: pageWidth,
        height: height * scale
      });
    }

    return buildPdf(pages);
  } finally {
    bitmap.close();
  }
}

export function buildPdf(pages) {
  const encoder = new TextEncoder();
  const parts = [];
  let length = 0;
  const offsets = [0];

  const push = (chunk) => {
    const bytes = typeof chunk === "string" ? encoder.encode(chunk) : chunk;
    parts.push(bytes);
    length += bytes.length;
  };
  const startObject = (id, body) => {
    offsets[id] = length;
    push(`${id} 0 obj\n${body}\n`);
  };

  // Object ids: 1 catalog, 2 page tree, then three objects per page.
  const pageId = (i) => 3 + i * 3;
  const contentId = (i) => 4 + i * 3;
  const imageId = (i) => 5 + i * 3;
  const objectCount = 2 + pages.length * 3;

  push("%PDF-1.4\n%\xFF\xFF\xFF\xFF\n");

  startObject(1, "<< /Type /Catalog /Pages 2 0 R >>\nendobj");
  const kids = pages.map((_, i) => `${pageId(i)} 0 R`).join(" ");
  startObject(2, `<< /Type /Pages /Count ${pages.length} /Kids [${kids}] >>\nendobj`);

  pages.forEach((page, i) => {
    const w = round(page.width);
    const h = round(page.height);

    startObject(
      pageId(i),
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${w} ${h}] ` +
        `/Resources << /XObject << /Im0 ${imageId(i)} 0 R >> >> ` +
        `/Contents ${contentId(i)} 0 R >>\nendobj`
    );

    const stream = `q ${w} 0 0 ${h} 0 0 cm /Im0 Do Q`;
    startObject(
      contentId(i),
      `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream\nendobj`
    );

    offsets[imageId(i)] = length;
    push(
      `${imageId(i)} 0 obj\n<< /Type /XObject /Subtype /Image ` +
        `/Width ${page.pixelWidth} /Height ${page.pixelHeight} ` +
        `/ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode ` +
        `/Length ${page.bytes.length} >>\nstream\n`
    );
    push(page.bytes);
    push("\nendstream\nendobj\n");
  });

  const xrefOffset = length;
  let xref = `xref\n0 ${objectCount + 1}\n0000000000 65535 f \n`;
  for (let id = 1; id <= objectCount; id++) {
    xref += `${String(offsets[id]).padStart(10, "0")} 00000 n \n`;
  }
  push(xref);
  push(
    `trailer\n<< /Size ${objectCount + 1} /Root 1 0 R >>\n` +
      `startxref\n${xrefOffset}\n%%EOF\n`
  );

  return new Blob(parts, { type: "application/pdf" });
}

function round(n) {
  return Math.round(n * 100) / 100;
}
