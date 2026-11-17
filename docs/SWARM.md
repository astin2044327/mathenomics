# Agent swarm roles

| Role | Agent focus | Output |
| --- | --- | --- |
| Research | Harvest classroom mnemonics from the web | `docs/research/mnemonics.json` |
| Validate | Check soundness + required exceptions | `docs/research/validated.json` |
| Implement | Turn accepted items into lessons | `js/more/expand.js` |
| Hard problems | PABSON / Class 12 + optional maths ≥7 | `js/more/pabson.js`, `js/more/optional.js` |
| UI | Mature visual polish | `css/app.css` |
| GCP | Deploy plan | `docs/ops/GCP_DEPLOY.md` |
| Metrics | Time + games + puzzles (local) | `js/app.js`, Report card |

Pipeline: Research → Validate → Implement. Hard / UI / GCP / Metrics run in parallel.
