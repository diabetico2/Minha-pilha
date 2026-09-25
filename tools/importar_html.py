"""Converte HTMLs salvos do Comic Book Treasury em data.js.

Coloque os arquivos .html em ../docs/fontes e execute este arquivo com Python 3.
Não requer bibliotecas externas.
"""
from html.parser import HTMLParser
from pathlib import Path
import html, json, re, unicodedata

BASE = Path(__file__).resolve().parent.parent
ROOT = BASE / "docs" / "fontes"
OUT = BASE / "assets" / "data" / "data.js"

def clean(v): return re.sub(r"\s+", " ", html.unescape(v)).strip(" \n\t-–—")
def slug(v):
    v = unicodedata.normalize("NFKD", v).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-zA-Z0-9]+", "-", v).strip("-").lower()

# Primeiro capítulo que contém a ordem de leitura de fato. Isso elimina menus,
# índices de coleções e introduções que aparecem antes da lista principal.
START_AT = {
    "batman-reading-order-the-modern-age-post-crisis": "starting point",
    "spider-man-reading-order-the-spectacular-peter-parker-guide": "from amazing to spectacular",
    "azrael-reading-order-aka-jean-paul-valley": "azrael comics reading order",
    "barbara-gordon-reading-order-batgirl-and-oracle": "batgirl’s bronze age",
    "batman-dawn-of-dc-reading-order": "batman dawn of dc reading order",
    "batman-infinite-frontier-reading-order": "what to read before",
    "batman-new-52-reading-order-from-the-court-of-owls-to-the-end-of-the-dc-you": "your classic batman new 52",
    "batman-rebirth-reading-order-from-the-monster-men-to-batman-s-wedding-city-of-bane-the-joker-war-and-more": "the batman rebirth reading order",
    "batwoman-reading-order-kate-kane": "batwoman begins with",
    "cassandra-cain-reading-order-batgirl-orphan-black-bat": "cassandra cain comics reading order",
    "catwoman-reading-order": "the modern age catwoman",
    "damian-wayne-reading-order-fifth-robin-and-son-of-batman": "the introduction of damian wayne",
    "jason-todd-reading-order-second-robin-red-hood-wingman-and-arkham-knight": "pre-crisis jason todd",
    "nightwing-reading-order-dick-grayson-titan-member-outsiders-leader-hero-of-bludhaven-and-gotham": "what to read before",
    "stephanie-brown-reading-order-spoiler-robin-batgirl": "stephanie brown, the early years",
}

def simple(v):
    return unicodedata.normalize("NFKD", v).encode("ascii", "ignore").decode().lower()

class Parser(HTMLParser):
    def __init__(self):
        super().__init__(); self.depth=0; self.article=None; self.capture=None
        self.buf=[]; self.rows=[]; self.section="Lista principal"; self.title=""; self.source=""
        self.li_stack=[]; self.strong_depth=0; self.anchor_depth=0
    def handle_starttag(self, tag, attrs):
        attrs=dict(attrs); self.depth+=1
        if tag=="link" and attrs.get("rel")=="canonical": self.source=attrs.get("href","")
        if tag=="div" and "entry-content" in attrs.get("class","").split(): self.article=self.depth
        if self.article is not None:
            if tag in {"h1","h2","h3"}: self.capture=tag; self.buf=[]
            if tag=="li": self.li_stack.append({"section":self.section,"text":[],"strong":[],"anchor":[],"children":[]})
            if tag=="strong" and self.li_stack: self.strong_depth+=1
            if tag=="a" and self.li_stack and not self.li_stack[-1]["anchor"]: self.anchor_depth+=1
    def handle_endtag(self, tag):
        if self.capture==tag:
            value=clean("".join(self.buf))
            if value:
                if tag=="h1" and not self.title: self.title=value
                elif tag in {"h2","h3"}: self.section=value
            self.capture=None; self.buf=[]
        if self.article is not None and tag=="strong" and self.strong_depth: self.strong_depth-=1
        if self.article is not None and tag=="a" and self.anchor_depth: self.anchor_depth-=1
        if self.article is not None and tag=="li" and self.li_stack:
            row=self.li_stack.pop(); full=clean("".join(row["text"])); heading=clean("".join(row["strong"])) or clean("".join(row["anchor"]))
            if heading and full.lower().startswith(heading.lower()): detail=clean(full[len(heading):].lstrip(". :"))
            else: heading=full; detail=""
            entry={"title":heading or full,"details":detail,"companions":row["children"]}
            if self.li_stack: self.li_stack[-1]["children"].append(entry)
            elif entry["title"] and len(full)<=900: self.rows.append((row["section"],entry))
        if self.article==self.depth and tag=="div": self.article=None
        self.depth-=1
    def handle_data(self, data):
        if self.capture: self.buf.append(data)
        if self.li_stack:
            self.li_stack[-1]["text"].append(data)
            if self.strong_depth: self.li_stack[-1]["strong"].append(data)
            if self.anchor_depth and not self.li_stack[-1]["strong"]: self.li_stack[-1]["anchor"].append(data)

def parse(path):
    raw=path.read_bytes()
    try: source=raw.decode("utf-8")
    except UnicodeDecodeError: source=raw.decode("cp1252",errors="replace")
    p=Parser(); p.feed(source); title=p.title or path.stem
    sections=[]
    for heading,item in p.rows:
        if not sections or sections[-1]["title"]!=heading: sections.append({"key":len(sections),"title":heading,"items":[]})
        sections[-1]["items"].append(item)
    order_id=slug(title); hint=START_AT.get(order_id)
    if hint:
        start=next((i for i,s in enumerate(sections) if simple(hint) in simple(s["title"])),0)
        sections=sections[start:]
    noise=("most popular reading orders","recent articles","the menu","batmenu","omnibus collection")
    sections=[s for s in sections if not any(n in simple(s["title"]) for n in noise)]
    return {"id":order_id,"title":title,"source":p.source,"sections":sections}

files=sorted(ROOT.glob("*.html"))
if not files: raise SystemExit("Nenhum HTML encontrado na pasta fontes.")
orders=[parse(f) for f in files]
orders.sort(key=lambda o:(0 if "batman" in o["title"].lower() and "modern age" in o["title"].lower() else 1 if "spider-man" in o["title"].lower() else 2,o["title"].lower()))
OUT.write_text("window.COMIC_ORDERS = "+json.dumps(orders,ensure_ascii=False,separators=(",",":"))+";\n",encoding="utf-8")
print(f"Pronto: {len(orders)} ordens atualizadas em data.js.")
