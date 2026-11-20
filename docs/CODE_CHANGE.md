# Code change rules (Mathenomics)

Apply these before every change:

1. **Smallest code change** — Prefer the minimal edit that ships the request. Do not broaden scope, rewrite unrelated modules, or add frameworks when a few lines on the existing path suffice.
2. **Updated efficient code change** — Prefer lighter patterns (reuse helpers, compact data, one UI control) over growing parallel systems or large generated packs for every language.
3. **Look for duplication** — Before adding a helper, string table, picker, or overlay, search for what already exists and extend it. Remove dead code, dead logic, and unused imports only when safe; never break current behavior.

## Language UI (current direction)

- One **world-icon dropdown** in the top bar (not a large home-hero picker).
- **UI chrome** can cover many locales via a compact map.
- **Full lesson overlays** only where packs already exist (e.g. Nepali, Spanish); other languages fall back to English lesson text until a pack exists.
- Kids’ corner stays English.

## Architecture / security

- This app is a **static PWA** — see `docs/ARCHITECTURE.md`. No browser → database calls.
- Prefer validating `localStorage` on read and escaping strings before `innerHTML`.
- Do not add API keys or secrets to client bundles.
