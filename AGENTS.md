# AGENTS.md

## Purpose

This repo is Ahmed Yasser Shalaby's portfolio site for Summer 2026 internship positioning.

Primary positioning:

- Data Engineering
- Analytics Engineering
- Cloud Security Automation
- Business systems simulation

Current site concept:

- `Data systems that hold up.`
- Recruiter-facing proof, not generic portfolio decoration.

## Start Here

Before substantial work, read:

- `CAREER_CONTEXT.md`
- `README.md`
- `docs/design_inspiration_notes.md`

## Stack

- React 19
- TypeScript
- Vite
- Three.js / React Three Fiber
- GSAP
- Lenis

## Design Direction

- Premium technical portfolio.
- Light paper background, black typography, subtle data-field texture.
- Avoid generic SaaS cards and landing-page fluff.
- First screen should feel like a real usable portfolio, not a template.
- 3D visuals must support the data/reliability story.

## 3D Hero

The hero orbit visual represents:

- `RAW` -> source data
- `MODEL` -> transformed analytics layer
- `DQ` -> data quality checks
- `BI` -> business-facing output

Keep it:

- performant
- responsive
- readable on mobile
- clear enough for recruiters
- not dependent on huge GLB files unless truly needed

## File Notes

- Main app: `src/App.tsx`
- Home page: `src/pages/HomePage.tsx`
- 3D orbit hero: `src/components/Mascot.tsx`
- Global styling: `src/styles.css`
- Project data: `src/data/projects.ts`

## Verification

Before finishing UI changes, run:

- `npm run lint`
- `npm run build`

For 3D/frontend changes, also visually check desktop and mobile.

## Git

- Keep commits small and feature-scoped.
- Do not stage unrelated dirty files.
- Feature commits use: `feat: <short description>`
