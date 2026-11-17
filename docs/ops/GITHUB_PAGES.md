# Mathenomics — free public site (GitHub Pages)

Static PWA on **GitHub Pages** (free). No domain purchase required to go live.

## Live now (no domain needed)

| URL | Notes |
| --- | --- |
| **`https://astin2044327.github.io/mathenomics/`** | Public HTTPS — use this until you buy a domain |
| `https://mathenomics.com` | Optional later — only after you **own** the domain |

Repo must be **public** for free Pages on a personal account (private Pages needs GitHub Pro).

A root `.nojekyll` file tells GitHub to publish files as-is (no Jekyll).

## Enable / refresh Pages

GitHub → **Settings → Pages → Deploy from a branch → `main` / `/ (root)` → Save**.

Or:

```bash
gh api -X POST repos/astin2044327/mathenomics/pages \
  -f build_type=legacy \
  -f source[branch]=main \
  -f source[path]=/
```

## Later: mathenomics.com

1. Buy **mathenomics.com** at a registrar.
2. Add GitHub’s A / AAAA records for `@` and CNAME `www` → `astin2044327.github.io`.
3. In Pages settings set Custom domain = `mathenomics.com` and Enforce HTTPS.
4. Add a root `CNAME` file containing `mathenomics.com` (optional but keeps the domain in git).

Until then, share the `github.io` URL only.
