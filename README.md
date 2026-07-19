# Used Vehicle Inventory — MB Wesley Chapel

Single-file dashboard (index.html) with cloud-synced Recon & Pricing data. Notes, appraiser assignments, and recon figures are saved to a Supabase backend via the "Save to Cloud" button (and auto-load on page open), so the data syncs across devices.

## How saving works

- Save to Cloud — the Recon Data tab's "Save to Cloud" button pushes appraised/recon/target/day-1-price figures, appraiser assignments, and notes to Supabase.
- Auto-load from Cloud — the dashboard loads the latest saved recon data from Supabase when the page opens.
- localStorage / Save File — the "Save File" button remains available as a manual local backup/export.

## Deploy setup

This is deployed via a Git-connected Netlify site (auto-deploys from the main branch of this repo):

1. Push changes to index.html on main.
2. Netlify picks up the push automatically and redeploys (see the Deploys tab in the Netlify dashboard).
3. The Supabase connection details are embedded in index.html; no separate Netlify Function or environment setup is required for cloud saving.

## Verify saving works

1. Open the dashboard, go to the Recon Data tab, enter some figures, and click "Save to Cloud".
2. Reload the page (or open it on another device/browser) — the saved data should be there.
