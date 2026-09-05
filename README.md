# SINIK Holdings — Zimbabwe Property Marketplace

A modern, mobile-first Zimbabwe property marketplace platform designed for home buyers, tenants, and commercial investors. The platform supports dual USD/ZiG price indications, verified agent profiles, WhatsApp-first inquiries, lease paperwork assistance, and interactive mortgage calculations.

Live Production URL: [https://sinik.hakili.online](https://sinik.hakili.online)

---

## What It Does

- **Property Listings Directory**: Comprehensive filterable catalog of residential homes, commercial properties, and vacant stands across Harare, Bulawayo, Zvishavane, Ruwa, and Victoria Falls.
- **Dual Currency Support**: Clear presentation of real-estate pricing in USD and ZiG.
- **Direct Agent Contact**: WhatsApp integration and direct inquiry forms connecting buyers to verified agents.
- **Mortgage & Payment Calculator**: Built-in financial utility for calculating monthly mortgage amortization schedules.
- **Property Comparison Engine**: Side-by-side comparison of property specifications, deposits, and features.
- **Dashboard & User Portal**: Overview of user inquiries, saved properties, and active agent listings.

---

## Architecture & Directory Structure

```
├── .github/
│   └── workflows/
│       └── ci.yml                 # Automated CI: lint, format, typecheck, tests, gitleaks
├── assets/
│   └── images/
│       └── sinik-logo.jpg         # Canonical brand logo
├── css/
│   ├── base.css                   # Theme variables, typography, reset, buttons
│   ├── layout.css                 # Sticky navigation, footer, floating controls
│   ├── components.css             # Cards, badges, hero, search filters, tables
│   ├── pages.css                  # Page-specific views, interactive maps, responsive breakpoints
│   └── style.css                  # Canonical stylesheet importing modular components
├── js/
│   └── main.js                    # Client-side DOM event bindings & UI handlers
├── src/
│   └── lib/
│       ├── mortgage.ts            # Pure, typed mortgage loan calculation module
│       └── mortgage.test.ts       # Vitest unit test suite for financial logic
├── .env.example                   # Environment configuration template
├── .gitignore                     # Repository file exclusion rules
├── eslint.config.mjs              # ESLint configuration
├── .prettierrc                    # Code style rules
├── index.html                     # Marketplace homepage
├── listings.html                  # Search & property catalog
├── property-details.html          # Individual listing view
├── agents.html                    # Verified agents directory
├── compare.html                   # Multi-property comparison table
├── dashboard.html                 # Saved items & management overview
├── package.json                   # Project scripts and dependencies
├── tsconfig.json                  # TypeScript compiler options (strict mode)
└── vercel.json                    # Vercel deployment configuration
```

---

## Prerequisites

- Node.js >= 20.0.0 (Recommended: Node 22+)
- npm >= 10.0.0

---

## Local Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/nmafohla/sinik-holdings.git
   cd sinik-holdings
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy environment configuration:

   ```bash
   cp .env.example .env
   ```

4. Run local preview server:
   ```bash
   npx serve .
   ```
   Open `http://localhost:3000` in your browser.

---

## Running Quality Checks & Tests

- **Run Unit Tests**:

  ```bash
  npm test
  # or
  npm run test:unit
  ```

- **Typecheck**:

  ```bash
  npm run typecheck
  ```

- **Lint**:

  ```bash
  npm run lint
  ```

- **Format Check**:
  ```bash
  npm run format:check
  ```

---

## Deployment & Hosting

The project is hosted on Vercel under the `oby's projects` team and connected to GitHub.

- **Production Alias**: `https://sinik.hakili.online`
- **Fallback Vercel URL**: `https://sinik-holdings.vercel.app`

Deployments are automated through Vercel Git integration upon pushing to the `main` branch.
