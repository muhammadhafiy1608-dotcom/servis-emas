from PIL import Image, ImageDraw, ImageFilter
import os
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public', 'icons')
W = 1024

def lerp(a, b, t): return tuple(int(a[i] + (b[i]-a[i])*t) for i in range(3))
def hexrgb(h): h=h.lstrip('#'); return tuple(int(h[i:i+2],16) for i in (0,2,4))

def vgrad(size, top, bottom):
    w, h = size
    g = Image.new('RGB', size)
    d = ImageDraw.Draw(g)
    for y in range(h):
        d.line([(0,y),(w,y)], fill=lerp(top, bottom, y/max(1,h-1)))
    return g

def art(scale=1.0):
    """Lukis jongkong emas di tengah kanvas 1024 (scale = saiz relatif untuk zon selamat)."""
    img = vgrad((W, W), hexrgb('#4A1A3E'), hexrgb('#260A1C'))
    # cahaya lembut di tengah
    glow = Image.new('L', (W, W), 0)
    ImageDraw.Draw(glow).ellipse([W*0.18, W*0.2, W*0.82, W*0.86], fill=120)
    glow = glow.filter(ImageFilter.GaussianBlur(120))
    img = Image.composite(Image.new('RGB', (W, W), hexrgb('#6B2A5A')), img, glow)
    cx, cy = W/2, W/2 + 30*scale
    bw, tw, hh = 620*scale, 420*scale, 250*scale
    pts = [(cx - tw/2, cy - hh/2), (cx + tw/2, cy - hh/2), (cx + bw/2, cy + hh/2), (cx - bw/2, cy + hh/2)]
    # bayang
    sh = Image.new('L', (W, W), 0)
    ImageDraw.Draw(sh).polygon([(x, y + 34*scale) for x, y in pts], fill=150)
    sh = sh.filter(ImageFilter.GaussianBlur(28*scale))
    img = Image.composite(Image.new('RGB', (W, W), hexrgb('#14040E')), img, sh)
    # badan jongkong (gradien emas)
    gold = vgrad((W, W), hexrgb('#F6DD8A'), hexrgb('#9C6F14'))
    gm = Image.new('L', (W, W), 0)
    ImageDraw.Draw(gm).polygon(pts, fill=255)
    img = Image.composite(gold, img, gm)
    # muka atas yang lebih terang (bevel)
    inset = 34*scale
    ipts = [(pts[0][0] + inset*0.9, pts[0][1] + inset*0.8), (pts[1][0] - inset*0.9, pts[1][1] + inset*0.8),
            (pts[2][0] - inset*1.6, pts[2][1] - inset*0.9), (pts[3][0] + inset*1.6, pts[3][1] - inset*0.9)]
    face = vgrad((W, W), hexrgb('#FBE7A6'), hexrgb('#C8992E'))
    fm = Image.new('L', (W, W), 0)
    ImageDraw.Draw(fm).polygon(ipts, fill=255)
    img = Image.composite(face, img, fm)
    d = ImageDraw.Draw(img)
    # takuk (notches) — gema bar kemajuan dalam app
    n = 6
    left, right = ipts[3][0] + 40*scale, ipts[2][0] - 40*scale
    y0, y1 = cy - 18*scale, cy + 44*scale
    gap = 16*scale
    nw = (right - left - gap*(n-1)) / n
    for i in range(n):
        x = left + i*(nw + gap)
        col = hexrgb('#8C6212') if i < 4 else hexrgb('#E9CF85')
        d.rounded_rectangle([x, y0, x + nw, y1], radius=8*scale, fill=col)
    # kilauan
    sx, sy, r = cx + tw/2 + 40*scale, cy - hh/2 - 70*scale, 46*scale
    d.polygon([(sx, sy - r), (sx + r*0.22, sy - r*0.22), (sx + r, sy), (sx + r*0.22, sy + r*0.22),
               (sx, sy + r), (sx - r*0.22, sy + r*0.22), (sx - r, sy), (sx - r*0.22, sy - r*0.22)], fill=hexrgb('#FFF1C2'))
    return img

def rounded(img, radius):
    m = Image.new('L', img.size, 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, img.size[0]-1, img.size[1]-1], radius=radius, fill=255)
    out = Image.new('RGBA', img.size, (0, 0, 0, 0))
    out.paste(img, (0, 0), m)
    return out

full = art(1.0)
maskable = art(0.8)
os.makedirs(OUT, exist_ok=True)
rounded(full, 220).resize((512, 512), Image.LANCZOS).save(f'{OUT}/icon-512.png', optimize=True)
rounded(full, 220).resize((192, 192), Image.LANCZOS).save(f'{OUT}/icon-192.png', optimize=True)
maskable.resize((512, 512), Image.LANCZOS).save(f'{OUT}/icon-maskable-512.png', optimize=True)
full.resize((180, 180), Image.LANCZOS).save(f'{OUT}/apple-touch-icon.png', optimize=True)
rounded(full, 220).resize((96, 96), Image.LANCZOS).save('/tmp/claude-0/-home-claude/40a2f46c-36c9-5dc1-b002-4ba947e4fadd/scratchpad/build/icon-96-preview.png')
print(os.listdir(OUT))
