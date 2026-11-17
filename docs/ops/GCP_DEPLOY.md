# Mathenomics — Google Cloud deploy plan

Static vanilla JS PWA: `index.html`, `css/`, `js/`, `sounds/`, `voices/`, `icons/`, `sw.js`, `manifest.webmanifest`. No build step. Service worker is **network-first** with **unhashed** asset filenames (`mathenomics-v*`).

This document is ops planning only. Do **not** treat it as permission to deploy; run commands only when you intentionally ship.

---

## 1. Recommended architecture

### Primary: Firebase Hosting (same GCP project)

**Use Firebase Hosting as the single public origin for Mathenomics.**

| Why | Detail |
| --- | --- |
| Built for static PWAs | HTTPS by default, global CDN, atomic releases, instant rollback |
| Headers matter here | `firebase.json` can set `Cache-Control` so `sw.js` is never sticky while other files stay cacheable |
| Custom domain | Point DNS → Firebase; managed SSL certs with little ops |
| Cost | Free Spark / low Blaze usage covers hobby traffic; ~4 MB site stays cheap |
| Later growth | Same project can add Cloud Functions for an anonymous metrics endpoint without moving the static app |
| Fit | Hash router (`#/…`), no SSR, no auth — Hosting is enough |

### Alternatives (not chosen)

| Option | Why not primary |
| --- | --- |
| **Cloud Storage + Cloud CDN** | Works, but custom HTTPS needs a load balancer + cert map, more IAM/DNS, and headers are clunkier than Hosting |
| **Cloud Run (static nginx/Caddy)** | Overkill for files on disk; cold starts and container ops add cost and complexity with no product benefit |

Keep one public origin. Do not mix Hosting + a second CDN origin for the same PWA scope.

---

## 2. Step-by-step deploy

### Prerequisites

- Google account with billing optional at first (Spark is fine for Hosting-only; Blaze needed later for Functions)
- [Google Cloud SDK](https://cloud.google.com/sdk) (`gcloud`) and [Firebase CLI](https://firebase.google.com/docs/cli) (`firebase`)
- Project root = Mathenomics repo (files listed above)

```bash
# One-time tooling
gcloud auth login
npm install -g firebase-tools   # or: curl -sL https://firebase.tools | bash
firebase login
```

### Create / link a GCP + Firebase project

```bash
# Pick a unique project id (example only — do not commit real ids as secrets)
export GCP_PROJECT_ID="mathenomics-prod"   # change me
export GCP_REGION="us-central1"

gcloud projects create "$GCP_PROJECT_ID" --name="Mathenomics"
gcloud config set project "$GCP_PROJECT_ID"

# Enable Firebase on the project (console once, or):
firebase projects:addfirebase "$GCP_PROJECT_ID"
firebase use "$GCP_PROJECT_ID"
```

Or in [Firebase Console](https://console.firebase.google.com/): Add project → use existing GCP project → enable Hosting.

### Repo files to add (committed, no secrets)

**`firebase.json`** (repo root):

```json
{
  "hosting": {
    "public": ".",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**",
      ".git/**",
      ".shots/**",
      "docs/**",
      "tools/**",
      "DESIGN.md",
      "README.md",
      "package.json",
      "**/*.log"
    ],
    "headers": [
      {
        "source": "/sw.js",
        "headers": [
          { "key": "Cache-Control", "value": "no-cache" }
        ]
      },
      {
        "source": "/index.html",
        "headers": [
          { "key": "Cache-Control", "value": "no-cache" }
        ]
      },
      {
        "source": "/manifest.webmanifest",
        "headers": [
          { "key": "Cache-Control", "value": "no-cache" }
        ]
      },
      {
        "source": "**/*.@(js|css)",
        "headers": [
          { "key": "Cache-Control", "value": "public,max-age=300,must-revalidate" }
        ]
      },
      {
        "source": "**/*.@(png|svg|mp3|webm|ogg|m4a|woff2)",
        "headers": [
          { "key": "Cache-Control", "value": "public,max-age=86400" }
        ]
      }
    ]
  }
}
```

**`.firebaserc`** (project id only — not a secret):

```json
{
  "projects": {
    "default": "mathenomics-prod"
  }
}
```

Notes:

- `ignore` keeps `tools/` (owner recorder) and `docs/` off the public site.
- `voices/` **is** deployed: empty (README only) is fine; add clips later and redeploy.
- Hash routes need no SPA rewrite; keep default Hosting 404 for missing paths.

### Local check before ship

```bash
npm run check          # repo consistency check
npm start              # python3 -m http.server 8766 — smoke-test locally
firebase hosting:channel:deploy preview --expires 7d   # optional preview URL
```

### Production deploy

```bash
firebase deploy --only hosting
# Output includes: https://<project-id>.web.app and https://<project-id>.firebaseapp.com
```

Or use the example script: [`deploy.sh`](./deploy.sh).

### Optional: mirror with gcloud (not required)

Firebase Hosting is the source of truth. You do **not** need `gsutil rsync` or Cloud Run for this app. If you ever export a Hosting release for audit, use Firebase Console → Hosting → release history.

---

## 3. Custom domain + HTTPS

1. Firebase Console → Hosting → **Add custom domain** (e.g. `mathenomics.example.com` or apex `example.com`).
2. Add the DNS records Firebase shows (usually A/AAAA or a TXT verify + CNAME).
3. Wait for SSL provisioning (often minutes; can take up to ~24h for DNS/CAA).
4. Prefer **one** canonical host; redirect apex ↔ `www` in the Hosting domain UI if both are claimed.
5. After cutover, open the custom origin once, confirm `sw.js` registers under that origin, and bump `CACHE` in `sw.js` if you need a hard client refresh after a bad cache.

HTTPS is automatic on `*.web.app`, `*.firebaseapp.com`, and connected custom domains. Do not terminate TLS yourself.

---

## 4. Caching headers (critical for this PWA)

Behavior today (`sw.js`):

- Install precaches the shell (HTML/CSS/JS/icons/sounds listed in `SHELL`).
- Fetch handler is **network-first**: online → network, then update Cache Storage; offline → cache / `index.html` fallback.
- Filenames are **not** content-hashed (`app.js`, `app.css`, …). Bumping `CACHE` (e.g. `mathenomics-v6` → `v7`) is how clients drop old shells.

### Required header policy

| Path | `Cache-Control` | Why |
| --- | --- | --- |
| `/sw.js` | `no-cache` (or `max-age=0, must-revalidate`) | Browsers must revalidate the worker script or clients stay on an old SW forever |
| `/index.html` | `no-cache` | Entry document should pick up new shell + SW registration promptly |
| `/manifest.webmanifest` | `no-cache` | Icons/name/theme updates should not stick for days |
| `*.js`, `*.css` | Short TTL + `must-revalidate` (e.g. 5 min) | Unhashed names; SW network-first helps online users, but HTTP cache still matters on first paint / no-SW |
| Images / audio | Longer TTL (e.g. 1 day) OK | Relatively stable; redeploy + SW network-first refreshes when online |

### Deploy hygiene

1. Any change to precached shell files → **increment `CACHE`** in `sw.js` in the same release.
2. Never set long `max-age` / `immutable` on `sw.js` or unhashed JS/CSS.
3. After a bad release, rollback Hosting **and** ship a new `CACHE` string if clients already cached the bad shell offline.

---

## 5. Optional: Cloud Monitoring / uptime check

Low-traffic static site: one HTTPS check is enough.

```bash
# Enable APIs (Blaze / GCP billing may be required for Monitoring)
gcloud services enable monitoring.googleapis.com

# Uptime check against the public URL (adjust hostname)
gcloud monitoring uptime create mathenomics-https \
  --resource-type=uptime-url \
  --host=mathenomics.example.com \
  --path=/index.html \
  --protocol=https \
  --port=443 \
  --period=300 \
  --timeout=10
```

Or create the check in Cloud Console → Monitoring → Uptime checks → HTTPS → expect HTTP 200 on `/` or `/index.html`.

Alerting (optional): email/SMS notification channel when consecutive failures exceed a threshold. Skip until you care about overnight outages.

---

## 6. Optional later: anonymous analytics (sketch only)

**Now:** metrics stay in the browser (`localStorage` key `mathenomics-save` — coins, marks, last lesson). No accounts.

**Later (optional):** anonymous sync for aggregate product metrics (time spent, games played), not learner identity.

### Sketch

| Piece | Choice |
| --- | --- |
| Trigger | Cloud Function (2nd gen) HTTPS endpoint in the same Firebase/GCP project |
| Auth | None — accept only coarse, non-PII payloads; rate-limit; no cookies |
| Payload example | `{ "v": 1, "sessionMinutes": 12, "gamesPlayed": 3, "gradeBand": "g3" }` — no name, email, or device id required |
| Storage | Firestore or BigQuery insert (prefer aggregated counters over raw per-device logs) |
| Client | After local play, `navigator.sendBeacon` / `fetch` best-effort; failures leave localStorage intact |
| Privacy | Document “anonymous aggregate only”; never log IP into analytics tables if you can avoid it; respect Do Not Track if you choose to |

Do **not** implement this for go-live. Hosting-only is enough. When you add Functions, switch the project to Blaze and keep secrets (if any) in Secret Manager / Function env — never in the static repo.

---

## 7. Cost estimate (low traffic)

Assumptions: ~4 MB site, hundreds–low thousands of page views/month, mostly CDN cache hits, no Functions yet.

| Item | Ballpark |
| --- | --- |
| Firebase Hosting (Spark) | **$0** within free quotas (storage + transfer generous for this size) |
| Custom domain SSL | **$0** (managed) |
| Blaze Hosting overage (if any) | Often still **&lt; $1–5 / month** at hobby scale |
| Cloud Monitoring uptime | Free tier usually covers one HTTPS check |
| Cloud Functions analytics (later) | Often **$0–few $/month** at tiny invoke counts; watch egress |

Expect **~$0–5/month** until you add paid APIs or significant traffic. Revisit if `voices/` grows large or you enable heavy Functions/Firestore.

---

## 8. Rollback plan

Firebase Hosting keeps release history.

1. Firebase Console → Hosting → **Release history** → **Rollback** to the previous good release  
   **or** CLI: redeploy a known-good git tag:

   ```bash
   git checkout <good-tag>
   firebase deploy --only hosting
   git checkout main   # return to working branch
   ```

2. If clients are stuck on a bad offline shell:
   - Ship a fixed release with a **new** `CACHE` constant in `sw.js`.
   - Confirm `/sw.js` is `Cache-Control: no-cache` so the new worker installs.

3. DNS/domain mistakes: keep `*.web.app` as a fallback URL while fixing custom-domain records.

4. Do not delete the GCP project to “rollback”; use Hosting release rollback.

---

## 9. Checklist before go-live

### Product / PWA

- [ ] `npm run check` passes
- [ ] Open production URL over **HTTPS**
- [ ] Install prompt / “Add to Home Screen” works (Chrome/Edge/Android; Safari iOS Add to Home Screen)
- [ ] `manifest.webmanifest` loads; icons 192 + 512 display
- [ ] Service worker registers (`./sw.js`); Application panel shows active worker
- [ ] **Online:** lessons, games, sounds work
- [ ] **Offline:** after one online visit, reload with network off — shell + cached sounds still load
- [ ] Hash routes (`#/…`) survive refresh
- [ ] `voices/` may be empty except `README.md` — Hear button shows “clip not added” (OK for launch)
- [ ] Progress persists in `localStorage` (`mathenomics-save`) on that origin
- [ ] `tools/` not publicly required (ignored in `firebase.json`)

### Ops

- [ ] `firebase.json` headers: `sw.js` + `index.html` = `no-cache`
- [ ] Custom domain verified + HTTPS green (or ship on `*.web.app` first)
- [ ] Optional uptime check pointed at canonical URL
- [ ] Know how to rollback one Hosting release
- [ ] No secrets in repo (no service-account JSON, no API keys in static JS)
- [ ] `.gitignore` still excludes `.env`, credentials, local junk

### Content

- [ ] Decide whether owner narration clips ship in v1 or land later via redeploy of `voices/`
- [ ] Spot-check Kids’ corner animal `sounds/*.mp3`

---

## Quick reference

| Action | Command |
| --- | --- |
| Preview channel | `firebase hosting:channel:deploy preview --expires 7d` |
| Production | `firebase deploy --only hosting` |
| Scripted deploy | `./docs/ops/deploy.sh` (see comments inside) |
| Local static server | `npm start` → http://127.0.0.1:8766 |

**Do not commit** service account keys, `.env` files, or Firebase CI tokens. Prefer `firebase login:ci` tokens in CI secret stores only when you automate deploys later.
