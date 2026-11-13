"""Correct duplicate photo layers baked into the existing 1200x220 header AVIF.

This is a one-time artwork restoration, not a resize or a CSS workaround.
The original composite mistakenly copied cap/background fragments into the header stripe
and then drew the right portrait on top. Restore the right portrait exactly once.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

ASSET = Path(__file__).resolve().parents[1] / "public/images/header/better-call-prabowo-desktop.avif"
image = Image.open(ASSET).convert("RGB")
if image.size != (1200, 220):
    raise SystemExit(f"Unexpected source banner size: {image.size}")

# Re-runs are safe: the repaired image has the expected red-orange at this location.
r, g, b = image.getpixel((995, 15))
if r > 180 and 40 < g < 135 and b < 85:
    print("Header artwork already repaired")
    raise SystemExit(0)

fixed = image.copy()
top_stripe = image.crop((350, 0, 850, 24)).resize((1200, 24), Image.Resampling.LANCZOS)
fixed.paste(top_stripe, (0, 0))

# Erase the copied background behind the portrait; the foreground is restored below.
draw = ImageDraw.Draw(fixed)
draw.rectangle((975, 24, 1199, 185), fill="#ffdc08")
draw.rectangle((975, 186, 1199, 219), fill="#ef0c00")

# Outline coordinates refer to the original 2048x682 master composition.
# Restrict the mask to the subject to avoid adding the original yellow/orange
# background (or exclamation-mark artwork) a second time.
outline = [
    (1738,50),(1764,47),(1796,49),(1824,55),(1850,66),(1872,86),
    (1890,111),(1906,143),(1918,178),(1929,210),(1937,226),
    (1949,238),(1957,258),(1962,284),(1962,307),(1960,328),
    (1972,346),(1987,371),(2004,394),(2020,411),(2047,427),
    (2047,635),(1547,635),(1572,557),(1601,494),(1622,463),
    (1646,437),(1668,416),(1680,398),(1690,380),(1696,362),
    (1695,340),(1685,323),(1676,310),(1673,294),(1674,273),
    (1671,252),(1675,229),(1677,197),(1679,161),(1681,130),
    (1688,109),(1701,84),(1716,68),
]
mapped = [(round(975 + (x - 1650) * 225 / 398),
           round(-5 + (y - 45) * 313 / 593)) for x, y in outline]
mask = Image.new("L", (1200, 220), 0)
ImageDraw.Draw(mask).polygon(mapped, fill=255)
mask = mask.filter(ImageFilter.GaussianBlur(1.2))
fixed.paste(image, (0, 0), mask)

# Preserve dimensions and use a temporary file for atomic replacement.
target = ASSET.with_name("better-call-prabowo-desktop-restored.avif")
fixed.save(target, format="AVIF", quality=50, speed=4)
verified = Image.open(target).convert("RGB")
if verified.size != (1200, 220):
    raise SystemExit("Unexpected restored banner size")
rr, gg, bb = verified.getpixel((995, 15))
if not (rr > 180 and gg < 135 and bb < 85):
    raise SystemExit("Restored banner still contains a ghost silhouette")
target.replace(ASSET)
print(f"Restored single-layer right portrait in {ASSET.name} ({ASSET.stat().st_size} bytes)")
