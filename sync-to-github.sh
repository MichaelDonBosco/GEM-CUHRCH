#!/bin/bash
# Helper script to push latest committed changes to GitHub repository
# Usage: ./sync-to-github.sh [YOUR_GITHUB_PERSONAL_ACCESS_TOKEN]

REPO_URL="https://github.com/MichaelDonBosco/GEM-CUHRCH.git"

if [ -n "$1" ]; then
  TOKEN=$1
  AUTH_URL="https://${TOKEN}@github.com/MichaelDonBosco/GEM-CUHRCH.git"
  echo "Pushing with provided authentication token..."
  git push "$AUTH_URL" main
else
  echo "Pushing to $REPO_URL..."
  git push origin main
fi
