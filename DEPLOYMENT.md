# Mood Tracker - Deployment Guide

## 🌐 Live Deployment (GitHub Pages)

**Primary URL:** https://susangadegone.github.io/Mood-Tracker-Cursor/

## 🚀 How to Deploy Updates

### Deploy to GitHub Pages:
```bash
npm run deploy
```

This command will:
1. Build the production version (`npm run build`)
2. Deploy to the `gh-pages` branch
3. Update your live site automatically

### Manual Git Push (for code changes):
```bash
git add -A
git commit -m "Your commit message"
git push origin main
npm run deploy
```

## 📝 GitHub Pages Configuration

Make sure GitHub Pages is configured in your repository settings:
- Go to: `Settings` → `Pages`
- **Source:** Deploy from a branch
- **Branch:** `gh-pages` / `(root)`

## ⏱️ Deployment Time
- Changes take **2-3 minutes** to appear on GitHub Pages after running `npm run deploy`
- Always **hard refresh** (`Cmd+Shift+R` or `Ctrl+Shift+R`) after deployment

## 🔧 Local Development
```bash
npm start
```
Runs on `http://localhost:3000`

## 📦 Build Production Locally
```bash
npm run build
```
Creates optimized production build in `/build` folder

## 🎨 Current Design
- **Aesthetic:** Spa/Wellness theme with green vibes
- **Colors:** Sage, Mint, Primary green palette
- **Typography:** Playfair Display (serif) + Inter (sans-serif)
- **Inspired by:** BetterHelp + luxury spa websites

