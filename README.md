# MoodFlow

A private, browser-based mood tracker. You log how you feel, MoodFlow shows you the
patterns over time, and everything stays on your own device. No account, no server, no
data leaving the browser.

This started as a personal project and is intentionally small. It is a self-tracking and
self-reflection tool, not a clinical product. It does not diagnose anything, it is not a
substitute for therapy or medical care, and it does not contact anyone on your behalf. If
you are in crisis, the resources in [CRISIS_RESOURCES.md](CRISIS_RESOURCES.md) and the
in-app Support page list real hotlines you can reach right now.

## What it does

- **Mood logging.** Record a mood with an intensity level and an optional note. Logging is
  meant to take a few seconds so you actually do it.
- **Insights.** Charts and summaries of your entries over time, so trends are visible
  instead of buried in a list.
- **Journal and Notes.** Longer freeform writing with timestamps, plus quick tagged notes
  for things that do not need a full entry.
- **Activities and Sanctuary.** A small set of grounding exercises (breathing, guided
  prompts, a daily puzzle) and a space for calming audio.
- **Support.** A dedicated page of crisis lines and mental health resources, always one tap
  away and impossible to hide.
- **Profile.** Editable lists of what helps you when things are hard and when things are
  good, so your own coping strategies are written down before you need them.

### Crisis support is built in, not bolted on

Difficult moods are exactly when a person is least likely to go looking for help. MoodFlow
keeps the 988 Suicide & Crisis Lifeline and the Crisis Text Line reachable from the home
screen and the Support page, and the mood-logging flow surfaces a gentle, dismissible
prompt when someone logs a high-intensity unpleasant emotion. The full rationale and the
complete resource list live in [CRISIS_RESOURCES.md](CRISIS_RESOURCES.md).

## Privacy model

All data is stored in the browser's `localStorage`. Concretely:

- Nothing is transmitted to a backend, because there isn't one.
- Your entries live only in the browser profile you used to create them. Clearing site
  data, switching browsers, or switching devices means starting fresh.
- There is no cloud sync and no backup. If that matters to you, export support is a good
  first contribution (see below).

This is a deliberate trade-off: maximum privacy and zero infrastructure, at the cost of
portability. For a mental health tool I consider that the right default.

## Tech stack

- **React 18** (Create React App / `react-scripts`)
- **React Router 6** using `HashRouter`, so client-side routes resolve correctly without
  any server-side rewrite rules
- **Tailwind CSS 3** for styling
- **Recharts** for the mood charts
- **lucide-react** for icons

## Getting started

Requires Node.js 14 or newer and npm.

```bash
git clone https://github.com/susangadegone/Mood-Tracker-Cursor.git
cd Mood-Tracker-Cursor
npm install
npm start
```

The dev server runs at [http://localhost:3000](http://localhost:3000) and reloads on save.

### Available scripts

| Command | Description |
| --- | --- |
| `npm start` | Run the development server |
| `npm run build` | Produce an optimized production build in `build/` |
| `npm test` | Run the test runner in watch mode |

## Deployment

The app is a static bundle, so any static host works. `npm run build` outputs to `build/`;
serve that directory as-is.

Production is deployed on [Vercel](https://vercel.com), connected directly to this
repository: every push to `main` triggers a build and deploy automatically, no manual
deploy step required. Build command is `npm run build` (auto-detected for
Create React App), output directory `build`. See [DEPLOYMENT.md](DEPLOYMENT.md) for
details.

## Project structure

```
src/
├── components/
│   ├── Layout.js            # Page shell
│   └── BottomNavigation.js  # Primary navigation
├── pages/
│   ├── Onboarding.js        # First-run setup
│   ├── Home.js              # Landing / dashboard
│   ├── Track.js             # Mood logging
│   ├── Insights.js          # Trends and charts
│   ├── Journal.js           # Long-form entries
│   ├── Notes.js             # Quick tagged notes
│   ├── Activities.js        # Grounding exercises
│   ├── Sanctuary.js         # Calming audio space
│   ├── Support.js           # Crisis resources
│   └── Profile.js           # Coping-strategy lists
├── utils/
│   └── storage.js           # localStorage read/write
├── App.js                   # Routing
├── index.js                 # Entry point
└── index.css                # Tailwind layers and globals
```

## Contributing

Contributions are welcome. The most useful things this project is missing, roughly in
order:

1. **Data export/import** (JSON or CSV). The biggest gap given the local-only storage
   model — it gives people a way to back up and move their data.
2. **Tests around `storage.js`** and the mood-logging flow, since that's the core data path.
3. **Accessibility**: keyboard navigation, focus management, and color-contrast checks.
4. **Optional reminders** for check-ins.

To contribute:

```bash
git checkout -b feature/your-change
# make changes
npm test
git commit -m "Describe your change"
git push origin feature/your-change
```

Then open a pull request describing what changed and why. For anything touching the crisis
or support flows, please be conservative and explain the reasoning — those paths matter
more than the rest of the app.

## License

MIT. See [LICENSE](LICENSE).
