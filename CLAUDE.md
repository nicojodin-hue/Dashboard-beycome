# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project Overview

Beycome is a real estate platform for buying and selling homes by yourself.
Real website is made with latest Laravel, Livewire and Tailwind v4 but this is a mockup project.

This project must use HTML, Vite JS, Vanilla JS and Tailwind v4.
For storage simply use LocalStorage.

## Project Structure

/
├── apple-touch-icon.png
├── css/
│   ├── tokens.css         # Colors, Typography, Radius
│   ├── components.css     # Button, Card, Input overrides
│   └── utilities.css      # Custom utility classes
├── crossdomain.xml
├── favicon.ico
├── fonts/
│   ├── roboto-300.woff2
│   └── roboto-700.woff2
├── index.html
├── icons/
│   ├── analysis.svg
│   ├── beycome.svg
│   ├── compare.svg
│   ├── comps.svg
│   ├── deny.svg
│   ├── estimate.svg
│   ├── explain.svg
│   ├── lucide/
│   │   ├── a-arrow-down.svg
│   │   ├── a-arrow-up.svg
│   │   ├── a-large-small.svg
│   │   ├── accessibility.svg
│   │   ├── activity.svg
│   │   ├── air-vent.svg
│   │   └── ...
│   ├── play-full.svg
│   ├── play.svg
│   └── ...
├── images/
│   ├── reviews/
│   │   ├── sold-jean_baptiste_r.jpg
│   │   ├── sold-kyle_d.jpg
│   │   └── sold-marc_staci_k.jpg
│   ├── social/
│   │   ├── home1.jpg
│   │   ├── home2.jpg
│   │   └── home2-x.jpg
│   └── new_page/
│       └── ...
├── logos/
│   ├── logo-beycome.svg
│   └── logo-beycome-512x512.png
├── pages/
│   ├── buy.html
│   ├── home.html
│   ├── offer.html
│   ├── payment.html
│   ├── profile.html
│   ├── sell.html
│   └── ...
├── robots.txt
└── site.webmanifest

## Coding style

- 4-space indentation
- LF line endings
- UTF-8 charset

## Styles

### Colors

```css
/* Gunmetal (primary) */
--color-primary: hsla(210, 39%, 14%, 1); /* #152330 */

/* Gunmetal-70 (secondary) */
--color-text-secondary: hsla(210, 38.9%, 14.1%, 0.7) /* #636366 */

/* Periwinkle (accent blue) */
--color-accent: hsla(230, 86.1%, 72%, 1); /* #7d8ff7 */

/* Beycome (accent orange) */
--color-accent-orange: hsla(16, 100%, 73%, 1); /* #FF9B77 */

/* Border */
--color-border: hsla(0, 0%, 88%, 1); /* #e0e0e0 */

/* Other colors */
--color-error-bg: hsla(0, 91%, 65%, 0.1); /* #f75353 */
--color-error: hsla(0, 91%, 65%, 1); /* #f75353 */
--color-green-bg: hsla(137, 28%, 49%, 0.1); /* #5a9e6f */
--color-green: hsla(137, 28%, 49%, 1); /* #5a9e6f */
--color-periwinkle-bg: hsla(230, 86.1%, 72%, 0.1); /* #e5eaff */
--color-periwinkle: hsla(230, 86.1%, 72%, 1); /* #7d8ff7 */
--color-pink-bg: hsla(330, 82%, 60%, 0.1);
--color-pink: hsla(330, 82%, 60%, 1); /* #ec4899 */
--color-ruby-bg: hsla(335, 78%, 42%, 0.1);
--color-ruby: hsla(335, 78%, 42%, 1);  /* #be185d */
--color-success-bg: hsla(138, 40%, 64%, 0.1); /* #e8f5ec */
--color-success: hsla(138, 40%, 64%, 1); /* #81c797 */
--color-warning-bg: hsla(32, 94%, 44%, 0.1); /* #fef3e2 */
--color-warning: hsla(32, 94%, 44%, 1); /* #d97706 */
```

### CSS

- Use CSS and not SCSS or SASS
- Use Tailwind v4
- Do not use @media with max-width or max-height (be mobile first)
- Use root variables for colors and fonts
- Use hsla for colors
- Split in multiple CSS files if needed
- Do not merge or obfuscate CSS

### JS

- Split in multiple JS files if needed
- Do not merge or obfuscate JS
- Use Vite JS @@include
- Use vanilla JS and limit external libraries

### Icons

- Must be in SVG format
- By default use SVG icons from public/icons/lucide/
- Custom icons must be public/icons/
- SVG must already be optimized (svggo)
- SVG color must be set via css using `fill=currentColor`
- SVG filenames must be lower case (snake case)

### Images

- Must be in jpg format
- Use .jpg and not .jpeg
- Keep filenames in lower case (snake case)
- Must already be optimized 81% (imageoptim, jpegoptim)
- Must be stored in public/images/{page}/{name}.jpg
- No PNG (replaced with SVG)
- No WEBP (convert JPG on the fly on the server automatically)
- No AVIF (convert to JPG if possible)
- No AVIF (convert to JPG if possible)

### Videos

- Host videos on Youtube directly or convert to mp4

### Fonts

- Must use default: Roboto
- Only for Title use system font: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
- Must not use any other font family
- Must use weight 400 (normal) or 700 (bold)
- Must not use any other weights like light, semi-bold or italic
- Use only woff2 format
- Do not have font size equivalent below 14px
- Respect WCAG text contrast to AA minimum
