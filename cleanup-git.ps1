# Supprimer les dossiers lourds du tracking Git (Windows PowerShell)
git rm -r --cached node_modules/ dist/ coverage/ tsconfig.tsbuildinfo 2>$null
git add .gitignore
git commit -m "chore: remove build artifacts from git tracking"
git push
