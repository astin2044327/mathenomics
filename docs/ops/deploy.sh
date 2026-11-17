#!/usr/bin/env bash
# Mathenomics — example Firebase Hosting deploy script
#
# Docs: docs/ops/GCP_DEPLOY.md
# Does NOT commit secrets. Fill PROJECT_ID yourself.
# Run from anywhere; script cds to the repo root.
#
# Usage:
#   chmod +x docs/ops/deploy.sh
#   ./docs/ops/deploy.sh              # production hosting
#   ./docs/ops/deploy.sh preview      # temporary preview channel
#   DRY_RUN=1 ./docs/ops/deploy.sh    # print commands only

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT"

# --- configure (not secrets; project id is public) ---
PROJECT_ID="${FIREBASE_PROJECT_ID:-mathenomics-prod}"   # change or export FIREBASE_PROJECT_ID
CHANNEL="${1:-live}"                                    # "live" or "preview"
DRY_RUN="${DRY_RUN:-0}"

run() {
  if [[ "$DRY_RUN" == "1" ]]; then
    echo "[dry-run] $*"
  else
    "$@"
  fi
}

echo "==> Mathenomics deploy"
echo "    root:    $ROOT"
echo "    project: $PROJECT_ID"
echo "    channel: $CHANNEL"

# Preconditions (install once: gcloud + firebase-tools)
command -v firebase >/dev/null || { echo "Install Firebase CLI: npm i -g firebase-tools"; exit 1; }

# Optional consistency check (Node)
if [[ -f package.json ]]; then
  run npm run check
fi

# Ensure firebase.json / .firebaserc exist (create from GCP_DEPLOY.md if missing)
if [[ ! -f firebase.json ]]; then
  echo "Missing firebase.json — copy the template from docs/ops/GCP_DEPLOY.md"
  exit 1
fi

run firebase use "$PROJECT_ID"

if [[ "$CHANNEL" == "preview" ]]; then
  # Temporary URL; expires in 7 days — good for QA before go-live
  run firebase hosting:channel:deploy preview --expires 7d
else
  # Production: https://<project>.web.app (+ custom domain if configured)
  run firebase deploy --only hosting
fi

echo "==> Done. Confirm sw.js Cache-Control is no-cache, then smoke-test install + offline."
echo "    Rollback: Firebase Console → Hosting → Release history → Rollback"
# Optional later (not for go-live):
#   gcloud monitoring uptime create ...   # see GCP_DEPLOY.md §5
#   firebase deploy --only functions      # anonymous metrics sketch §6
