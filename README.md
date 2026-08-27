# Theos AI — marketing site

Static, dependency-free marketing site for **Theos AI** — production-grade AI implementation
(custom AI agents, workflow automation, and custom websites).

- `index.html` — the entire site (hand-crafted CSS + vanilla JS, no build step)
- `favicon.svg` — brand mark

## Preview locally

```bash
python -m http.server 3000
# → http://localhost:3000
```

## Deploy

Served via GitHub Pages from the `main` branch root.

## Booking link

To point every "Book a call" button at a scheduler, open `index.html`, find
`var BOOKING_URL = "";` near the bottom, and paste your Calendly/Cal.com URL.
Until then, the buttons fall back to `mailto:jed@theosai.net`.
