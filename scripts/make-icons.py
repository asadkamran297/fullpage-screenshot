# Regenerates icons/icon{16,32,48,128}.png.
# Requires Pillow:  pip install pillow
# Run from the repo root:  python scripts/make-icons.py
#
# The mark is a camera with a down arrow in the lens: camera says screenshot,
# the arrow says it runs down the whole page. Detail is kept deliberately
# coarse so the 16px favicon still reads as a camera.

from PIL import Image, ImageDraw

BLUE = (37, 99, 235, 255)
W = (255, 255, 255, 255)

def icon(size):
    s = size * 12
    img = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([0, 0, s - 1, s - 1], radius=int(s * 0.22), fill=BLUE)
    u = s / 100.0

    d.rounded_rectangle([37 * u, 17 * u, 63 * u, 30 * u], radius=4 * u, fill=W)
    d.rounded_rectangle([10 * u, 27 * u, 90 * u, 83 * u], radius=11 * u, fill=W)

    cx, cy, r = 50 * u, 55 * u, 24 * u
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=BLUE)
    ring = 4.5 * u
    d.ellipse([cx - r + ring, cy - r + ring, cx + r - ring, cy + r - ring], fill=W)

    inner = r - ring
    d.ellipse([cx - inner, cy - inner, cx + inner, cy + inner], fill=BLUE)
    # bold down arrow = capture the whole length of the page
    sw = 5.5 * u
    d.rounded_rectangle([cx - sw, cy - 13 * u, cx + sw, cy + 2 * u], radius=2 * u, fill=W)
    d.polygon([(cx - 12 * u, cy + 0 * u), (cx + 12 * u, cy + 0 * u), (cx, cy + 14 * u)], fill=W)
    return img.resize((size, size), Image.LANCZOS)

for n in (16, 32, 48, 128):
    icon(n).save(f"icons/icon{n}.png")
print("ok")
