# Beycome Offer Dashboard

Modular Vite.js SPA for the Beycome real estate Offer Dashboard.

## Getting Started

```bash
npm install
npm run dev      # dev server on http://localhost:5174
npm run build    # production build → dist/
npm run preview  # preview production build
```

## Project Structure

```
src/
├── js/
│   ├── main.js              # Entry point
│   ├── router.js            # Hash-based SPA router
│   ├── store.js             # localStorage persistence (beycome_ prefix)
│   ├── utils.js             # Shared utilities
│   ├── components/
│   │   ├── header.js        # Top header with logo
│   │   ├── nav.js           # Navigation bar
│   │   ├── footer.js        # Mobile bottom nav
│   │   ├── chat.js          # Artur chat widget
│   │   ├── modals.js        # Message / schedule / counter-offer modals
│   │   └── icons.js         # SVG sprite definitions
│   └── pages/
│       ├── properties.js    # Your Listings
│       ├── offers.js        # Offers
│       ├── visits.js        # Requested Showings
│       ├── messages.js      # Messages
│       ├── calendar.js      # Calendar (month/week views)
│       ├── contracts.js     # Contract Center
│       ├── account.js       # Profile & Settings
│       └── submit-property.js  # Submit Property (multi-step flow)
└── styles/
    ├── main.css             # CSS variables & reset
    ├── components.css       # UI components
    ├── layout.css           # Header, nav, chat, layout
    ├── calendar.css         # Calendar-specific styles
    ├── submit-property.css  # Submit property styles
    └── responsive.css       # Mobile breakpoints
```

## Architecture

- **Vanilla JS** — no framework, ES modules throughout
- **Hash routing** — `#/your-listing`, `#/offers`, `#/calendar`, etc.
- **Component pattern** — each module exports `render()` (HTML string) and `init()` (event binding)
- **localStorage** — all data persisted with `beycome_` key prefix
- **Responsive** — desktop sidebar chat + mobile bottom nav with fullscreen chat
