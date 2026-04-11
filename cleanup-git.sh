#!/bin/bash
# Supprimer les dossiers lourds du tracking Git
git rm -r --cached node_modules/ dist/ coverage/ tsconfig.tsbuildinfo 2>/dev/null || true
git add .gitignore
git commit -m "chore: remove build artifacts from git tracking"
git push
