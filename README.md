# Harris — Daily

Personal PWA. Daily check-in, priorities, self-care, weekly goals.

## Deploy

1. Push this repo to GitHub as `harris99/harris-daily`
2. Go to repo Settings → Pages → Source: GitHub Actions
3. Push to main — auto-deploys to `https://harris99.github.io/harris-daily`

## Add to home screen

**iOS:** Open in Safari → Share → Add to Home Screen  
**Android:** Open in Chrome → Menu → Add to Home Screen

## Notifications

Open the app → Settings → "Enable push notifications" → grant permission.  
Must be added to home screen first on iOS.

## Files

- `index.html` — entire app, one file
- `sw.js` — service worker (offline + notifications)
- `manifest.json` — PWA config
