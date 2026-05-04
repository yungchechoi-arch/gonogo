#!/usr/bin/env python3
"""Create directory/index.html copies for top-level Quartz pages so trailing-slash URLs work on GitHub Pages."""
from pathlib import Path
import shutil
public = Path('public')
if not public.exists():
    raise SystemExit('public directory not found; run after quartz build')
for html in public.glob('*.html'):
    if html.name in {'index.html', '404.html'}:
        continue
    target_dir = public / html.stem
    target_dir.mkdir(exist_ok=True)
    shutil.copy2(html, target_dir / 'index.html')
    # copy matching OG image if present so relative oddities remain safe
print('trailing-slash compatibility pages generated')
