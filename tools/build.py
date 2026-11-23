#!/usr/bin/env python3
"""KoLaboranci © 2026 CappySoft.pl
Skleja index.html + css/ + js/ w jeden samodzielny plik: dist/kolaboranci.html
(do wgrania jako artefakt, wysłania mailem albo otwarcia bez serwera).

Użycie (z głównego folderu projektu):  python3 tools/build.py
"""
import re, pathlib, datetime

ROOT = pathlib.Path(__file__).resolve().parent.parent
html = (ROOT / 'index.html').read_text(encoding='utf-8')

def inline_css(m):
    path = m.group(1)
    body = (ROOT / path).read_text(encoding='utf-8')
    return f'<style>/* {path} */\n{body}</style>'

def inline_js(m):
    path = m.group(1)
    body = (ROOT / path).read_text(encoding='utf-8')
    return f'<script>/* {path} */\n{body}</script>'

html = re.sub(r'<link rel="stylesheet" href="(css/[^"]+)">', inline_css, html)
html = re.sub(r'<script src="(js/[^"]+)"></script>', inline_js, html)
stamp = datetime.datetime.now().strftime('%Y-%m-%d %H:%M')
html = re.sub(r'<!-- Wersja deweloperska:.*?-->',
              f'<!-- Zbudowano {stamp} z plików źródłowych. Zmieniaj pliki w css/ i js/, nie ten plik. -->', html)

out = ROOT / 'dist' / 'kolaboranci.html'
out.parent.mkdir(exist_ok=True)
out.write_text(html, encoding='utf-8')
print(f'Gotowe: {out.relative_to(ROOT)} ({out.stat().st_size // 1024} KB)')
