import { test, expect } from '@playwright/test';

test.describe('Settings Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.click('text=Settings');
  });

  test('devrait afficher la page de configuration', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Configuration API');
    await expect(page.locator('[data-testid="settings-container"]')).toBeVisible();
  });

  test('devrait afficher toutes les sections API', async ({ page }) => {
    // Vérifier les sections principales
    await expect(page.locator('text=Serper.dev API')).toBeVisible();
    await expect(page.locator('text=Groq AI')).toBeVisible();
    await expect(page.locator('text=Unsplash')).toBeVisible();
    await expect(page.locator('text=Pexels')).toBeVisible();
    await expect(page.locator('text=Resend')).toBeVisible();
    await expect(page.locator('text=Gemini')).toBeVisible();
  });

  test('devrait indiquer que Serper est obligatoire', async ({ page }) => {
    const serperSection = page.locator('text=Serper.dev API').locator('..');
    await expect(serperSection.locator('text=Obligatoire')).toBeVisible();
  });

  test('devrait ouvrir le générateur Serper', async ({ page }) => {
    // Cliquer sur le bouton générateur
    await page.click('text=🔑 Générateur');
    
    // Vérifier que le modal s'ouvre
    await expect(page.locator('[data-testid="serper-generator-modal"]')).toBeVisible();
    await expect(page.locator('text=Générateur Serper.dev')).toBeVisible();
  });

  test('devrait permettre de naviguer dans le générateur', async ({ page }) => {
    // Ouvrir le générateur
    await page.click('text=🔑 Générateur');
    
    // Étape 1: Email Temporaire
    await expect(page.locator('text=Email Temporaire')).toBeVisible();
    await expect(page.locator('text=Ouvrir Email Temporaire')).toBeVisible();
    
    // Passer à l'étape 2
    await page.click('text=Suivant');
    
    // Étape 2: Inscription Serper
    await expect(page.locator('text=Inscription Serper')).toBeVisible();
    await expect(page.locator('text=S\'inscrire sur Serper.dev')).toBeVisible();
    
    // Revenir à l'étape 1
    await page.click('text=Précédent');
    await expect(page.locator('text=Email Temporaire')).toBeVisible();
  });

  test('devrait permettre de tester les APIs', async ({ page }) => {
    // Trouver les boutons de test
    const testButtons = page.locator('button:has-text("🧪")');
    await expect(testButtons).toHaveCount(6); // 6 APIs
    
    // Cliquer sur le premier bouton de test
    await testButtons.first().click();
    
    // Vérifier que le test s'exécute (peut prendre du temps)
    await expect(page.locator('text=Test en cours...')).toBeVisible({ timeout: 5000 });
  });

  test('devrait afficher les descriptions des APIs', async ({ page }) => {
    // Vérifier la description de Serper
    await expect(page.locator('text=Recherche Google + Google Maps + Images')).toBeVisible();
    
    // Vérifier la description de Groq
    await expect(page.locator('text=LLM principal - scoring, contenu, emails')).toBeVisible();
  });

  test('devrait permettre de saisir des clés API', async ({ page }) => {
    // Trouver le champ de clé Serper
    const serperKeyInput = page.locator('input[placeholder*="clé API"]');
    await expect(serperKeyInput).toBeVisible();
    
    // Saisir une clé de test
    await serperKeyInput.fill('test-key-123');
    await expect(serperKeyInput).toHaveValue('test-key-123');
    
    // Vérifier que le champ est de type password par défaut
    await expect(serperKeyInput).toHaveAttribute('type', 'password');
  });

  test('devrait permettre de basculer la visibilité des clés', async ({ page }) => {
    // Trouver le champ de clé et le bouton de visibilité
    const serperKeyInput = page.locator('input[placeholder*="clé API"]');
    const toggleButton = page.locator('button:has-text("👁")').first();
    
    // Par défaut, le champ est masqué
    await expect(serperKeyInput).toHaveAttribute('type', 'password');
    
    // Cliquer pour afficher
    await toggleButton.click();
    await expect(serperKeyInput).toHaveAttribute('type', 'text');
    
    // Cliquer pour masquer
    await toggleButton.click();
    await expect(serperKeyInput).toHaveAttribute('type', 'password');
  });

  test('devrait afficher le statut des APIs', async ({ page }) => {
    // Vérifier le compteur d'APIs
    await expect(page.locator('text=/\\d+\\/\\d+ APIs/')).toBeVisible();
    
    // Vérifier les badges de statut
    const statusBadges = page.locator('[data-testid="status-badge"]');
    await expect(statusBadges).toHaveCount(6); // 6 APIs
  });
});
