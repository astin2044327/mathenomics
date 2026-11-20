# Multi-country grade maths — design research (pending approval)

**Status:** design only — **do not implement** until recommendations canvas approved.  
**Source:** [country curriculum research](ad0b91cc-9042-436c-8f26-cab941c172c9).  
**Related:** [FEATURE_MAP.md](../FEATURE_MAP.md), [CODE_CHANGE.md](../CODE_CHANGE.md), i18n packs.

## Verdict

Keep **one stable lesson catalog**. Add a local **curriculum profile** orthogonal to language: remap labels, swap mnemonic variants (PEMDAS/BODMAS/BIDMAS/PAPOMUDAS), unit prefs, exam playlists. Do not fork courses or invent a backend.

```text
mathenomics-lang     → UI + lesson overlays (existing)
mathenomics-profile  → curriculum region (proposed)
Kids’ corner         → always English
```

## Phased rollout

| Phase | Ship |
| --- | --- |
| **P0** | Profiles `us` + `np`; course label remap; order-of-ops + long-division variants; SEE/NEB playlist from existing ids; UI “Curriculum ≠ Language” |
| **P1** | `uk`, `in`; Year/Class wording; GCSE + CBSE10 playlists; metric-default |
| **P2** | `es_es` / `es_mx` (jerarquía vs PAPOMUDAS); SAT-lite / EvAU playlists; sparse new lessons only if real gaps |

## What not to build

Per-country course forks, lang→country auto-bind, Kids translation, full standards DBs, copyrighted past papers, parallel progress keys per country.
