#!/bin/bash
# Script de redémarrage propre du développement

echo "🔄 Arrêt des processus existants..."
pkill -f "npm run dev"
pkill -f "tsx server/email-server.ts"
pkill -f "vite"

echo "🧹 Nettoyage des ports..."
lsof -ti:3001 | xargs kill -9 2>/dev/null || true
lsof -ti:5174 | xargs kill -9 2>/dev/null || true

echo "⏱️  Attente 2 secondes..."
sleep 2

echo "🚀 Démarrage du serveur de développement..."
npm run dev
