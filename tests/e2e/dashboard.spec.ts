import { test, expect } from '@playwright/test';

test.describe('Dashboard Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('devrait afficher le dashboard par défaut', async ({ page }) => {
    // Vérifier que le dashboard est visible
    await expect(page.locator('h1')).toContainText('Dashboard');
    await expect(page.locator('[data-testid="dashboard-container"]')).toBeVisible();
  });

  test('devrait afficher la navigation latérale', async ({ page }) => {
    // Vérifier la sidebar
    await expect(page.locator('[data-testid="sidebar"]')).toBeVisible();
    
    // Vérifier les éléments de navigation
    await expect(page.locator('text=Dashboard')).toBeVisible();
    await expect(page.locator('text=Pipeline')).toBeVisible();
    await expect(page.locator('text=Settings')).toBeVisible();
  });

  test('devrait permettre la navigation entre les vues', async ({ page }) => {
    // Cliquer sur Pipeline
    await page.click('text=Pipeline');
    await expect(page.locator('h1')).toContainText('Pipeline');
    
    // Cliquer sur Settings
    await page.click('text=Settings');
    await expect(page.locator('h1')).toContainText('Configuration API');
    
    // Retour au Dashboard
    await page.click('text=Dashboard');
    await expect(page.locator('h1')).toContainText('Dashboard');
  });

  test('devrait afficher les statistiques du dashboard', async ({ page }) => {
    // Vérifier les statistiques
    await expect(page.locator('[data-testid="stats-container"]')).toBeVisible();
    
    // Vérifier les compteurs
    await expect(page.locator('[data-testid="total-leads"]')).toBeVisible();
    await expect(page.locator('[data-testid="active-apis"]')).toBeVisible();
  });

  test('devrait permettre l\'import de leads', async ({ page }) => {
    // Cliquer sur le bouton d'import
    await page.click('[data-testid="import-button"]');
    
    // Vérifier que le modal d'import s'ouvre
    await expect(page.locator('[data-testid="import-modal"]')).toBeVisible();
    await expect(page.locator('text=Import CSV/Excel')).toBeVisible();
  });

  test('devrait permettre la recherche de leads', async ({ page }) => {
    // Trouver le champ de recherche
    const searchInput = page.locator('[data-testid="search-input"]');
    await expect(searchInput).toBeVisible();
    
    // Saisir une recherche
    await searchInput.fill('test');
    
    // Vérifier que la recherche fonctionne
    await expect(searchInput).toHaveValue('test');
  });

  test('devrait afficher les filtres de température', async ({ page }) => {
    // Vérifier les filtres
    await expect(page.locator('[data-testid="filter-very-hot"]')).toBeVisible();
    await expect(page.locator('[data-testid="filter-hot"]')).toBeVisible();
    await expect(page.locator('[data-testid="filter-cold"]')).toBeVisible();
    
    // Cliquer sur un filtre
    await page.click('[data-testid="filter-hot"]');
    await expect(page.locator('[data-testid="filter-hot"]')).toHaveClass(/active/);
  });

  test('devrait être responsive sur mobile', async ({ page }) => {
    // Simuler un mobile
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Vérifier que la sidebar est cachée
    await expect(page.locator('[data-testid="sidebar"]')).not.toBeVisible();
    
    // Vérifier le menu mobile
    await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible();
  });
});
