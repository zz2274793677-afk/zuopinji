from pathlib import Path
import math
import random
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "projects"
OUT.mkdir(parents=True, exist_ok=True)
random.seed(26)

FONT_BOLD = r"C:\Windows\Fonts\arialbd.ttf"
FONT_REG = r"C:\Windows\Fonts\arial.ttf"
FONT_CN = r"C:\Windows\Fonts\msyhbd.ttc"

def font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except OSError:
        return ImageFont.load_default()

def gradient(size, stops):
    w, h = size
    arr = np.zeros((h, w, 3), dtype=np.float32)
    yy, xx = np.mgrid[0:h, 0:w]
    base = np.array(stops[0], dtype=np.float32)
    arr[:] = base
    for color, cx, cy, radius, strength in stops[1:]:
        d = np.sqrt(((xx - cx*w)/(radius*w))**2 + ((yy - cy*h)/(radius*h))**2)
        a = np.clip(1-d, 0, 1) ** 2 * strength
        arr = arr*(1-a[...,None]) + np.array(color)*a[...,None]
    noise = np.random.default_rng(26).normal(0, 2.2, (h,w,1))
    return Image.fromarray(np.clip(arr+noise,0,255).astype(np.uint8), "RGB")

def save(img, name):
    img.save(OUT / name, quality=92, optimize=True)

W, H = 2400, 1500

# Hero: atmospheric chrome orb and optical scan lines.
img = gradient((W,H), [(8,10,12), ((42,63,76), .68,.38,.55,1.0), ((130,155,145), .42,.32,.34,.38)])
glow = Image.new("RGBA", (W,H), (0,0,0,0)); gd = ImageDraw.Draw(glow)
for r in range(510, 0, -8):
    a = int(28*(1-r/510)**1.5)
    gd.ellipse((W*.63-r, H*.43-r, W*.63+r, H*.43+r), outline=(215,255,69,a), width=8)
glow = glow.filter(ImageFilter.GaussianBlur(18)); img = Image.alpha_composite(img.convert("RGBA"), glow)
d = ImageDraw.Draw(img)
for x in range(0,W,96): d.line((x,0,x,H), fill=(255,255,255,14), width=1)
for y in range(0,H,96): d.line((0,y,W,y), fill=(255,255,255,10), width=1)
d.text((110,H-160), "VISUAL / AI / BRAND", font=font(FONT_BOLD,34), fill=(235,236,230,120))
save(img.convert("RGB"), "hero-poster.png")

# Civic visual system.
img = gradient((W,H), [(16,17,16), ((111,25,20), .28,.46,.45,1), ((215,192,152), .8,.22,.5,.2)]).convert("RGBA")
d = ImageDraw.Draw(img)
d.rectangle((170,160,1180,1340), fill=(214,207,184,235))
d.rectangle((1180,160,2200,1340), fill=(34,29,27,245))
d.polygon([(170,1340),(1180,160),(1180,1340)], fill=(182,31,23,250))
for y in range(230,1250,115): d.line((1240,y,2100,y), fill=(234,227,211,45), width=2)
d.text((1260,260), "PUBLIC", font=font(FONT_BOLD,170), fill=(237,230,214,245))
d.text((1260,425), "MEMORY", font=font(FONT_BOLD,170), fill=(237,230,214,245))
d.text((1260,990), "CIVIC CULTURE\nVISUAL SYSTEM", font=font(FONT_REG,44), fill=(210,204,191,180), spacing=18)
d.text((245,1060), "城市文化", font=font(FONT_CN,92), fill=(246,239,222,245))
d.text((245,1180), "ZMX / 2025", font=font(FONT_REG,30), fill=(246,239,222,180))
save(img.convert("RGB"), "civic-culture.png")

# AIGC film art direction.
img = gradient((W,H), [(8,10,20), ((33,55,135), .25,.36,.6,1), ((217,79,29), .76,.38,.38,.95)]).convert("RGBA")
blur = Image.new("RGBA",(W,H),(0,0,0,0)); bd=ImageDraw.Draw(blur)
bd.ellipse((1470,120,2210,860), fill=(255,119,50,180)); blur=blur.filter(ImageFilter.GaussianBlur(75)); img=Image.alpha_composite(img,blur)
d=ImageDraw.Draw(img)
for i in range(11):
    y=165+i*105; d.line((110,y,2290,y), fill=(155,177,255,35), width=2)
d.arc((1030,140,2140,1250), 110, 320, fill=(242,181,120,175), width=3)
d.text((150,170), "AIGC", font=font(FONT_BOLD,260), fill=(231,233,242,245))
d.text((160,430), "CINEMATIC\nLANGUAGE", font=font(FONT_REG,78), fill=(200,209,238,190), spacing=20)
d.text((160,1160), "SCRIPT  /  STORYBOARD  /  MOTION", font=font(FONT_REG,32), fill=(208,214,236,150))
d.text((1780,1190), "02 — 26", font=font(FONT_BOLD,42), fill=(238,236,230,220))
save(img.convert("RGB"), "aigc-film.png")

# Finance editorial storytelling.
img = Image.new("RGB",(W,H),(225,225,215)); d=ImageDraw.Draw(img)
for x in range(0,W,120): d.line((x,0,x,H), fill=(45,47,42,25), width=1)
for y in range(0,H,120): d.line((0,y,W,y), fill=(45,47,42,25), width=1)
d.rectangle((90,90,2310,1410), outline=(24,26,24), width=4)
d.text((160,160), "INVEST", font=font(FONT_BOLD,265), fill=(21,23,21))
d.text((155,420), "ANALYSIS", font=font(FONT_BOLD,265), fill=(21,23,21))
points=[]
for i in range(28):
    x=170+i*75; y=1180-(i*14+math.sin(i*.9)*125+random.randint(-28,28)); points.append((x,y))
d.line(points, fill=(64,115,76), width=12, joint="curve")
for x,y in points[::4]: d.ellipse((x-12,y-12,x+12,y+12), fill=(215,255,69), outline=(21,23,21), width=4)
d.text((165,1265), "RESEARCH → STRUCTURE → STORY", font=font(FONT_REG,34), fill=(67,69,64))
d.text((1845,1130), "4,000+ WORDS\n15+ SLIDES", font=font(FONT_BOLD,38), fill=(21,23,21), spacing=12)
save(img, "finance-story.png")

# Cloud system architecture.
img = gradient((W,H), [(7,10,15), ((22,55,103), .5,.5,.75,1), ((108,168,255), .82,.2,.35,.42)]).convert("RGBA")
d=ImageDraw.Draw(img)
for x in range(0,W,100): d.line((x,0,x,H), fill=(130,173,255,25), width=1)
for y in range(0,H,100): d.line((0,y,W,y), fill=(130,173,255,25), width=1)
layers=[(360,930,2040,1240),(470,660,1930,940),(600,390,1800,670)]
colors=[(52,72,105,210),(61,92,143,210),(112,148,211,215)]
for (x1,y1,x2,y2),c in zip(layers,colors):
    d.rounded_rectangle((x1,y1,x2,y2), radius=24, fill=c, outline=(182,210,255,130), width=3)
    for x in range(x1+90,x2-30,210): d.ellipse((x,y1+70,x+20,y1+90), fill=(215,255,69,220))
d.text((120,120), "CLOUD / 3L", font=font(FONT_BOLD,180), fill=(229,235,247,240))
d.text((130,330), "RESOURCE · VIRTUALIZATION · SERVICE", font=font(FONT_REG,34), fill=(183,203,237,160))
d.text((1720,1250), "SYSTEM 04", font=font(FONT_BOLD,38), fill=(215,226,246,180))
save(img.convert("RGB"), "cloud-system.png")

# Raster favicon.
fav = Image.new("RGB",(64,64),(7,8,9)); fd=ImageDraw.Draw(fav)
fd.rectangle((5,5,59,59), outline=(215,255,69), width=2)
fd.text((11,18), "Z", font=font(FONT_BOLD,31), fill=(233,233,225))
fav.save(ROOT / "public" / "favicon.png", optimize=True)
