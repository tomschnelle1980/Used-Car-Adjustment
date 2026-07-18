# Used Vehicle Inventory — MB Wesley Chapel (with live comment saving)

Single-file dashboard (`index.html`) plus a Netlify Function that stores the
adjustment comments server-side via **Netlify Blobs**, so notes are saved the
moment you type them and sync to everyone on every device.

## How saving works (3 layers)
1. **Live server save** — each comment POSTs to `/.netlify/functions/comments`
   (Netlify Blobs). Loaded for everyone on page open. Source of truth.
2. **localStorage** — offline fallback; your typing survives a refresh even if
   the network hiccups.
3. **Download & redeploy** ("Save" button) — still works as a manual backup.

The 37 June notes are embedded as defaults and seeded into the server store the
first time the page loads after deploy.

## One-time deploy setup (Git-connected Netlify)
A backend needs a Git deploy — drag-and-drop cannot run functions.

1. Put these files in a GitHub repo (root of the repo, or a base directory).
2. In Netlify → site → **Build & deploy → Continuous deployment**, connect the
   repo (set **Base directory** if these live in a subfolder).
3. Netlify auto-installs `@netlify/blobs` from package.json and enables Blobs.
4. Deploy. Verify: open `https://<site>/.netlify/functions/comments` — it should
   return `{}` (or your seeded notes) as JSON, not an error.

## Verify saving works
- Open the dashboard, go to the Adjustments view, type a test comment.
- Open the site on a different device/browser → the comment is there.
