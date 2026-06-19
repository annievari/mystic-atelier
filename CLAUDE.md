# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static HTML/CSS/JS landing page for **Mystic Atelier** — a graphic design and branding studio. No build step, no framework, no dependencies.

## Deployment

- **Repo:** github.com/annievari/mystic-atelier
- **Host:** Vercel (static, auto-deploys on push to `main`)
- To deploy: `git add … && git commit -m "…" && git push origin main`
- Git credentials are stored in macOS Keychain — no token needed at push time

## Architecture

Single-page site. Everything lives in the root:

- `index.html` — all sections in order: Nav → Hero → Sobre Mí → Experiencia → Proyectos → Servicios → Contacto → Footer
- `styles.css` — all styles, organized by section with `═══` divider comments
- `main.js` — scroll behavior, mobile nav toggle, IntersectionObserver for fade-ins, active nav link tracking, contact form handler
- `assets/logo.png` — transparent-background logo used in nav and footer

## Design tokens (CSS variables)

All colors and fonts are defined as variables at the top of `styles.css`:

```css
--bg-primary: #08080e       /* page background */
--bg-secondary: #0d0d18     /* dark section background */
--gold: #f1a8c1             /* primary accent (pink) — change here to retheme */
--font-serif: 'Cormorant Garamond'
--font-sans: 'DM Sans'
```

Changing `--gold` updates every accent element site-wide (section labels, hero italic, dividers, buttons, stat numbers, icons, borders).

## Contact form

The form in `index.html` currently simulates a submit (fake success state). To wire it up for real: add `action="https://formspree.io/f/YOUR_ID"` to the `<form>` tag and remove the `e.preventDefault()` in `main.js`.

## Content placeholders

Several pieces of content are intentionally placeholder and should be updated:
- Portfolio project cards (section `#proyectos`) — gradient backgrounds, no real images yet
- Contact email and Instagram handle in `#contacto`
- Stats in `#sobre-mi` (years of experience, etc.)
- Git committer name/email (`git config --global user.name / user.email` not yet set)
