#!/usr/bin/env bash
#
# push-client.sh — publish a clean, squashed snapshot of the current tree to the
# CLIENT repository (Giovannixfm/gv) as a single commit.
#
# Why this exists: the client copy is a one-commit "snapshot" whose history is
# unrelated to our working repo (origin = arvrin/giovannivillage). So we can't
# fast-forward normal commits onto it — instead we rebuild a fresh single commit
# each time and force-push it to the client's `main`. The snapshot carries no
# dev history, no co-author trailers, and no internal-only files.
#
# Usage:  npm run push:client     (or)     bash scripts/push-client.sh
#
set -euo pipefail

CLIENT_URL="https://github.com/Giovannixfm/gv.git"
CLIENT_REMOTE="client"
GH_USER="arvrin"                 # the GitHub account with write access to the client repo
SNAPSHOT_MSG="Giovanni Village — resort website"
TMP_BRANCH="client-export-$$"

# The snapshot commit must be AUTHORED as the client identity — Vercel's git
# integration on the client account blocks deployments whose commit author
# isn't a recognized member of that account.
CLIENT_GIT_NAME="Giovannixfm"
CLIENT_GIT_EMAIL="giovannixfmwebdev@gmail.com"

# Files that live in our repo but must NEVER ship to the client snapshot.
EXCLUDE=(
  ".design-audit.md"          # internal UI/UX QA report
  "scripts/push-client.sh"    # this internal ops tool
)

cd "$(git rev-parse --show-toplevel)"

# Snapshot must reflect a committed, clean tree — refuse if anything is pending.
if [[ -n "$(git status --porcelain)" ]]; then
  echo "✗ Working tree is dirty. Commit or stash your changes first." >&2
  exit 1
fi

START_BRANCH="$(git rev-parse --abbrev-ref HEAD)"

# Make the collaborator account active so the push is authorized.
gh auth switch --user "$GH_USER" >/dev/null 2>&1 || true

# Ensure the client remote exists and points at the right URL.
if git remote get-url "$CLIENT_REMOTE" >/dev/null 2>&1; then
  git remote set-url "$CLIENT_REMOTE" "$CLIENT_URL"
else
  git remote add "$CLIENT_REMOTE" "$CLIENT_URL"
fi

# Always return to the original branch and drop the temp branch, even on failure.
cleanup() {
  git checkout -f "$START_BRANCH" >/dev/null 2>&1 || true
  git branch -D "$TMP_BRANCH" >/dev/null 2>&1 || true
}
trap cleanup EXIT

# Build the orphan snapshot: every tracked file staged, minus the excluded ones.
git checkout --orphan "$TMP_BRANCH" >/dev/null 2>&1
for f in "${EXCLUDE[@]}"; do
  git rm --cached --quiet "$f" >/dev/null 2>&1 || true
done
GIT_AUTHOR_NAME="$CLIENT_GIT_NAME" GIT_AUTHOR_EMAIL="$CLIENT_GIT_EMAIL" \
GIT_COMMITTER_NAME="$CLIENT_GIT_NAME" GIT_COMMITTER_EMAIL="$CLIENT_GIT_EMAIL" \
  git commit -q -m "$SNAPSHOT_MSG"

echo "→ Pushing clean snapshot to $CLIENT_URL (main)…"
git push -f "$CLIENT_REMOTE" "$TMP_BRANCH:main"
echo "✓ Client repo (Giovannixfm/gv) updated with a fresh squashed snapshot."
