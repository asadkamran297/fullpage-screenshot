// Decode a data: URL without fetch(). Extension pages and service workers run
// under a CSP whose connect-src can reject data: URLs, so decoding by hand is
// the reliable route.
export function dataUrlToBlob(dataUrl) {
  const comma = dataUrl.indexOf(",");
  const header = dataUrl.slice(0, comma);
  const payload = dataUrl.slice(comma + 1);
  const mime = /:(.*?)[;,]/.exec(header)?.[1] || "application/octet-stream";

  if (!header.includes(";base64")) {
    return new Blob([decodeURIComponent(payload)], { type: mime });
  }

  const binary = atob(payload);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new Blob([bytes], { type: mime });
}
