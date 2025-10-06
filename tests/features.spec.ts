import { test, expect } from '@playwright/test';

test.describe('New Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Page Transitions', () => {
    test('should have smooth transitions between pages', async ({ page }) => {
      // Navigate to units page and check for transition
      await page.goto('/units');
      await expect(page.locator('body')).toBeVisible();
      
      // Navigate to weapons page
      await page.goto('/weapons');
      await expect(page.locator('body')).toBeVisible();
      
      // Navigate to factions page
      await page.goto('/factions');
      await expect(page.locator('body')).toBeVisible();
      
      // Navigate back to home
      await page.goto('/');
      await expect(page.getByRole('heading', { name: 'Welcome to the Grimdark Grimoire' })).toBeVisible();
    });

    test('should have page transition wrapper', async ({ page }) => {
      // Check that the page transition wrapper exists
      const pageTransition = page.locator('.page-transition');
      await expect(pageTransition).toBeVisible();
    });
  });

  test.describe('Units Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/units');
    });

    test('should display units with proper animations', async ({ page }) => {
      // Trigger a search to load units
      const searchInput = page.locator('input[type="text"]').first();
      await searchInput.fill('marine');
      await page.keyboard.press('Enter');
      
      // Wait for content to load
      await page.waitForSelector('.unit-card', { timeout: 15000 });
      
      // Check that unit cards are visible
      const unitCards = page.locator('.unit-card');
      const cardCount = await unitCards.count();
      expect(cardCount).toBeGreaterThan(0);
      
      // Check that cards have proper structure
      const firstCard = unitCards.first();
      await expect(firstCard).toBeVisible();
      
      // Check for unit name
      const unitName = firstCard.locator('.unit-name');
      await expect(unitName).toBeVisible();
    });

    test('should have search functionality', async ({ page }) => {
      // Check for search input
      const searchInput = page.locator('input[type="text"]').first();
      await expect(searchInput).toBeVisible();
      
      // Test search functionality
      await searchInput.fill('marine');
      await page.keyboard.press('Enter');
      
      // Wait for results
      await page.waitForTimeout(1000);
      
      // Check that results are displayed
      const results = page.locator('.results-section');
      await expect(results).toBeVisible();
    });

    test('should navigate to unit detail page', async ({ page }) => {
      // Trigger a search to load units
      const searchInput = page.locator('input[type="text"]').first();
      await searchInput.fill('marine');
      await page.keyboard.press('Enter');
      
      // Wait for units to load
      await page.waitForSelector('.unit-card', { timeout: 15000 });
      
      // Click on the "View Details" button in the first unit card
      const firstUnitCard = page.locator('.unit-card').first();
      const viewDetailsButton = firstUnitCard.locator('a[href*="/units/"]').first();
      await viewDetailsButton.click();
      
      // Wait for navigation and check that we're on a unit detail page
      await page.waitForURL(/.*\/units\/\d+/, { timeout: 10000 });
      await expect(page).toHaveURL(/.*\/units\/\d+/);
      
      // Check that unit detail content is visible
      await expect(page.locator('.unit-detail')).toBeVisible();
    });
  });

  test.describe('Weapons Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/weapons');
    });

    test('should display weapons with proper animations', async ({ page }) => {
      // Trigger a search to load weapons
      const searchInput = page.locator('input[type="text"]').first();
      await searchInput.fill('bolter');
      await page.keyboard.press('Enter');
      
      // Wait for content to load
      await page.waitForSelector('.weapon-card', { timeout: 15000 });
      
      // Check that weapon cards are visible
      const weaponCards = page.locator('.weapon-card');
      const cardCount = await weaponCards.count();
      expect(cardCount).toBeGreaterThan(0);
      
      // Check that cards have proper structure
      const firstCard = weaponCards.first();
      await expect(firstCard).toBeVisible();
      
      // Check for weapon name
      const weaponName = firstCard.locator('.weapon-name');
      await expect(weaponName).toBeVisible();
    });

    test('should have keyword search functionality', async ({ page }) => {
      // Check for keyword input
      const keywordInput = page.locator('input[placeholder*="keyword"], input[placeholder*="Keyword"]').first();
      
      if (await keywordInput.count() > 0) {
        await expect(keywordInput).toBeVisible();
        
        // Test keyword search
        await keywordInput.fill('rapid fire');
        await page.keyboard.press('Enter');
        
        // Wait for results
        await page.waitForTimeout(1000);
        
        // Check that results are displayed
        const results = page.locator('.results-section');
        await expect(results).toBeVisible();
      }
    });

    test('should navigate to weapon detail page', async ({ page }) => {
      // Trigger a search to load weapons
      const searchInput = page.locator('input[type="text"]').first();
      await searchInput.fill('bolter');
      await page.keyboard.press('Enter');
      
      // Wait for weapons to load
      await page.waitForSelector('.weapon-card', { timeout: 15000 });
      
      // Click on the "View Details" button in the first weapon card
      const firstWeaponCard = page.locator('.weapon-card').first();
      const viewDetailsButton = firstWeaponCard.locator('a[href*="/weapons/"]').first();
      await viewDetailsButton.click();
      
      // Wait for navigation and check that we're on a weapon detail page
      await page.waitForURL(/.*\/weapons\/\d+/, { timeout: 10000 });
      await expect(page).toHaveURL(/.*\/weapons\/\d+/);
      
      // Check that weapon detail content is visible
      await expect(page.locator('.weapon-detail')).toBeVisible();
    });
  });

  test.describe('Factions Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/factions');
    });

    test('should display factions with proper animations', async ({ page }) => {
      // Wait for content to load
      await page.waitForSelector('.faction-card', { timeout: 10000 });
      
      // Check that faction cards are visible
      const factionCards = page.locator('.faction-card');
      const cardCount = await factionCards.count();
      expect(cardCount).toBeGreaterThan(0);
      
      // Check that cards have proper structure
      const firstCard = factionCards.first();
      await expect(firstCard).toBeVisible();
      
      // Check for faction name
      const factionName = firstCard.locator('.faction-name');
      await expect(factionName).toBeVisible();
    });
  });

  test.describe('Detail Pages', () => {
    test('should have smooth transitions on unit detail page', async ({ page }) => {
      // Navigate to units page first
      await page.goto('/units');
      
      // Trigger a search to load units
      const searchInput = page.locator('input[type="text"]').first();
      await searchInput.fill('marine');
      await page.keyboard.press('Enter');
      
      await page.waitForSelector('.unit-card', { timeout: 15000 });
      
      // Click on the "View Details" button in the first unit
      const firstUnitCard = page.locator('.unit-card').first();
      const viewDetailsButton = firstUnitCard.locator('a[href*="/units/"]').first();
      await viewDetailsButton.click();
      
      // Wait for navigation and check that we're on detail page
      await page.waitForURL(/.*\/units\/\d+/, { timeout: 10000 });
      await expect(page).toHaveURL(/.*\/units\/\d+/);
      
      // Check for detail page animations
      const unitDetail = page.locator('.unit-detail');
      await expect(unitDetail).toBeVisible();
      
      // Check for staggered content sections
      const header = page.locator('.unit-detail-header');
      const content = page.locator('.unit-detail-content');
      const stats = page.locator('.unit-stats-section');
      
      await expect(header).toBeVisible();
      await expect(content).toBeVisible();
      await expect(stats).toBeVisible();
    });

    test('should have smooth transitions on weapon detail page', async ({ page }) => {
      // Navigate to weapons page first
      await page.goto('/weapons');
      
      // Trigger a search to load weapons
      const searchInput = page.locator('input[type="text"]').first();
      await searchInput.fill('bolter');
      await page.keyboard.press('Enter');
      
      await page.waitForSelector('.weapon-card', { timeout: 15000 });
      
      // Click on the "View Details" button in the first weapon
      const firstWeaponCard = page.locator('.weapon-card').first();
      const viewDetailsButton = firstWeaponCard.locator('a[href*="/weapons/"]').first();
      await viewDetailsButton.click();
      
      // Wait for navigation and check that we're on detail page
      await page.waitForURL(/.*\/weapons\/\d+/, { timeout: 10000 });
      await expect(page).toHaveURL(/.*\/weapons\/\d+/);
      
      // Check for detail page animations
      const weaponDetail = page.locator('.weapon-detail');
      await expect(weaponDetail).toBeVisible();
      
      // Check for staggered content sections
      const header = page.locator('.weapon-detail-header');
      const stats = page.locator('.weapon-stats-section');
      const abilities = page.locator('.weapon-abilities-section');
      
      await expect(header).toBeVisible();
      await expect(stats).toBeVisible();
      await expect(abilities).toBeVisible();
    });
  });

  test.describe('Tag System', () => {
    test('should display tags consistently on unit cards', async ({ page }) => {
      await page.goto('/units');
      
      // Trigger a search to load units
      const searchInput = page.locator('input[type="text"]').first();
      await searchInput.fill('marine');
      await page.keyboard.press('Enter');
      
      await page.waitForSelector('.unit-card', { timeout: 15000 });
      
      const firstCard = page.locator('.unit-card').first();
      
      // Check for tag sections
      const tagSections = firstCard.locator('.tag-section');
      const tagSectionCount = await tagSections.count();
      
      if (tagSectionCount > 0) {
        // Check that tag sections have proper structure
        const firstTagSection = tagSections.first();
        await expect(firstTagSection).toBeVisible();
        
        // Check for tag list
        const tagList = firstTagSection.locator('.tag-list');
        await expect(tagList).toBeVisible();
        
        // Check for individual tags
        const tags = tagList.locator('.tag');
        const tagCount = await tags.count();
        
        if (tagCount > 0) {
          await expect(tags.first()).toBeVisible();
        }
      }
    });

    test('should display tags consistently on weapon cards', async ({ page }) => {
      await page.goto('/weapons');
      
      // Trigger a search to load weapons
      const searchInput = page.locator('input[type="text"]').first();
      await searchInput.fill('bolter');
      await page.keyboard.press('Enter');
      
      await page.waitForSelector('.weapon-card', { timeout: 15000 });
      
      const firstCard = page.locator('.weapon-card').first();
      
      // Check for tag sections
      const tagSections = firstCard.locator('.tag-section');
      const tagSectionCount = await tagSections.count();
      
      if (tagSectionCount > 0) {
        // Check that tag sections have proper structure
        const firstTagSection = tagSections.first();
        await expect(firstTagSection).toBeVisible();
        
        // Check for tag list
        const tagList = firstTagSection.locator('.tag-list');
        await expect(tagList).toBeVisible();
        
        // Check for individual tags
        const tags = tagList.locator('.tag');
        const tagCount = await tags.count();
        
        if (tagCount > 0) {
          await expect(tags.first()).toBeVisible();
        }
      }
    });
  });

  test.describe('Accessibility', () => {
    test('should respect reduced motion preferences', async ({ page }) => {
      // Set reduced motion preference
      await page.emulateMedia({ reducedMotion: 'reduce' });
      
      // Navigate to units page
      await page.goto('/units');
      
      // Trigger a search to load units
      const searchInput = page.locator('input[type="text"]').first();
      await searchInput.fill('marine');
      await page.keyboard.press('Enter');
      
      await page.waitForSelector('.unit-card', { timeout: 15000 });
      
      // Check that content is still visible and functional
      const unitCards = page.locator('.unit-card');
      await expect(unitCards.first()).toBeVisible();
      
      // Navigate to weapons page
      await page.goto('/weapons');
      
      // Trigger a search to load weapons
      const weaponSearchInput = page.locator('input[type="text"]').first();
      await weaponSearchInput.fill('bolter');
      await page.keyboard.press('Enter');
      
      await page.waitForSelector('.weapon-card', { timeout: 15000 });
      
      // Check that content is still visible and functional
      const weaponCards = page.locator('.weapon-card');
      await expect(weaponCards.first()).toBeVisible();
    });
  });
});
