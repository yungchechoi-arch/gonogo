#!/usr/bin/env python3
"""Create directory/index.html copies for top-level Quartz pages so trailing-slash URLs work on GitHub Pages.

Quartz emits top-level pages such as ``post.html`` with relative asset links like
``./index.css`` and ``./static/contentIndex.json``. If we simply copy that file to
``post/index.html``, browsers resolve those links as ``post/index.css`` and
``post/static/...``. That breaks CSS/JS on trailing-slash URLs.

For copied trailing-slash pages, rewrite same-directory relative URLs from ``./``
to ``../`` so they resolve back to the site root.
"""
from pathlib import Path

public = Path('public')
if not public.exists():
    raise SystemExit('public directory not found; run after quartz build')

REWRITES = {
    'href="./': 'href="../',
    "href='./": "href='../",
    'src="./': 'src="../',
    "src='./": "src='../",
    'fetch("./': 'fetch("../',
    "fetch('./": "fetch('../",
}

for html in public.glob('*.html'):
    if html.name in {'index.html', '404.html'}:
        continue
    target_dir = public / html.stem
    target_dir.mkdir(exist_ok=True)
    text = html.read_text(encoding='utf-8')
    for old, new in REWRITES.items():
        text = text.replace(old, new)
    (target_dir / 'index.html').write_text(text, encoding='utf-8')

print('trailing-slash compatibility pages generated with root-relative asset rewrites')
