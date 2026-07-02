# Deployment Guide

## Live deployment

Production is hosted on [Vercel](https://vercel.com), connected directly to this GitHub
repository.

**Production URL:** https://mood-tracker-cursor.vercel.app

## How deploys happen

Deployment is automatic. Vercel's GitHub integration watches this repository:

- Every push to `main` builds and deploys to production.
- Every push to any other branch (including pull request branches) gets its own preview
  deployment at a unique `*.vercel.app` URL.

There is no manual deploy step. Merging a pull request into `main` is the deploy.

Build configuration (auto-detected as a Create React App project):

- **Build command:** `npm run build`
- **Output directory:** `build`
- **Install command:** `npm install`

## Local development

```bash
npm start
```

Runs the dev server at `http://localhost:3000`.

## Build production locally

```bash
npm run build
```

Outputs an optimized production build to `build/`.

## Checking a deployment

If a deployment looks wrong, check the Vercel dashboard for the project (or the "Checks"
tab on the relevant GitHub commit/PR) for build logs. A failed build there means the
build command errored — check the log for the actual error rather than assuming the
site is broken; the production alias only ever points at the most recent **successful**
build on `main`, so an unrelated branch failing to build does not affect what's live.
