# Local usage metrics

Mathenomics tracks activity **on the device only** (`localStorage` key `mathenomics-save` → `metrics`).

| Field | Meaning |
| --- | --- |
| `totalMs` | Active time in the tab (pauses when the tab is hidden) |
| `gamesPlayed` | Lesson games finished (See my mark) |
| `puzzlesPlayed` | Times-table puzzles completed |
| `roundsPlayed` | Question rounds answered across finished games |
| `sessions` | App loads |

Shown on the **Report card** page. Nothing is uploaded unless you later add an optional sync (see `GCP_DEPLOY.md`).
