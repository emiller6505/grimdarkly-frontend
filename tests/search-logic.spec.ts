import { test, expect } from '@playwright/test';

test.describe('Search Logic - AND Conditions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/units');
  });

  test.describe('Main Faction Search (Exact Match)', () => {
    test('should return only World Eaters berzerkers when searching name=berzerker and faction=world eaters', async ({ page }) => {
      // Trigger search
      const nameInput = page.locator('input#unit-name');
      const factionInput = page.locator('input#faction');
      
      await nameInput.fill('berzerker');
      await factionInput.fill('world eaters');
      await page.keyboard.press('Enter');
      
      // Wait for results
      await page.waitForSelector('.unit-card', { timeout: 15000 });
      
      // Check that we have results
      const unitCards = page.locator('.unit-card');
      const cardCount = await unitCards.count();
      expect(cardCount).toBeGreaterThan(0);
      
      // Check that all results are World Eaters berzerkers
      for (let i = 0; i < cardCount; i++) {
        const card = unitCards.nth(i);
        const unitName = await card.locator('.unit-name').textContent();
        const factionName = await card.locator('.faction-name').textContent();
        
        expect(unitName?.toLowerCase()).toContain('berzerker');
        expect(factionName?.toLowerCase()).toContain('world eaters');
      }
    });

    test('should return only Chaos Space Marines berzerkers when searching name=berzerker and faction=chaos space marines', async ({ page }) => {
      // Trigger search
      const nameInput = page.locator('input#unit-name');
      const factionInput = page.locator('input#faction');
      
      await nameInput.fill('berzerker');
      await factionInput.fill('chaos space marines');
      await page.keyboard.press('Enter');
      
      // Wait for results
      await page.waitForSelector('.unit-card', { timeout: 15000 });
      
      // Check that we have results
      const unitCards = page.locator('.unit-card');
      const cardCount = await unitCards.count();
      expect(cardCount).toBeGreaterThan(0);
      
      // Check that all results are Chaos Space Marines berzerkers
      for (let i = 0; i < cardCount; i++) {
        const card = unitCards.nth(i);
        const unitName = await card.locator('.unit-name').textContent();
        const factionName = await card.locator('.faction-name').textContent();
        
        expect(unitName?.toLowerCase()).toContain('berzerker');
        expect(factionName?.toLowerCase()).toContain('chaos space marines');
      }
    });

    test('should return both factions when searching name=berzerker without faction filter', async ({ page }) => {
      // Trigger search
      const nameInput = page.locator('input#unit-name');
      
      await nameInput.fill('berzerker');
      await page.keyboard.press('Enter');
      
      // Wait for results
      await page.waitForSelector('.unit-card', { timeout: 15000 });
      
      // Check that we have results
      const unitCards = page.locator('.unit-card');
      const cardCount = await unitCards.count();
      expect(cardCount).toBeGreaterThanOrEqual(2);
      
      // Check that we have both factions
      const factionNames = [];
      for (let i = 0; i < cardCount; i++) {
        const card = unitCards.nth(i);
        const factionName = await card.locator('.faction-name').textContent();
        factionNames.push(factionName?.toLowerCase());
      }
      
      expect(factionNames.some(name => name?.includes('world eaters'))).toBeTruthy();
      expect(factionNames.some(name => name?.includes('chaos space marines'))).toBeTruthy();
    });
  });

  test.describe('Sub-Faction Search (Space Marine Chapters)', () => {
    test('should return Dark Angels units when searching faction=dark angels', async ({ page }) => {
      // Trigger search
      const factionInput = page.locator('input#faction');
      
      await factionInput.fill('dark angels');
      await page.keyboard.press('Enter');
      
      // Wait for results
      await page.waitForSelector('.unit-card', { timeout: 15000 });
      
      // Check that we have results
      const unitCards = page.locator('.unit-card');
      const cardCount = await unitCards.count();
      expect(cardCount).toBeGreaterThan(0);
      
      // Check that all results are Dark Angels (should show as Space Marines faction but with Dark Angels keyword)
      for (let i = 0; i < Math.min(cardCount, 5); i++) { // Check first 5 to avoid timeout
        const card = unitCards.nth(i);
        const factionName = await card.locator('.faction-name').textContent();
        
        // Dark Angels units should show as Space Marines faction
        expect(factionName?.toLowerCase()).toContain('space marines');
      }
    });

    test('should return Blood Angels units when searching faction=blood angels', async ({ page }) => {
      // Trigger search
      const factionInput = page.locator('input#faction');
      
      await factionInput.fill('blood angels');
      await page.keyboard.press('Enter');
      
      // Wait for results
      await page.waitForSelector('.unit-card', { timeout: 15000 });
      
      // Check that we have results
      const unitCards = page.locator('.unit-card');
      const cardCount = await unitCards.count();
      expect(cardCount).toBeGreaterThan(0);
      
      // Check that all results are Blood Angels (should show as Space Marines faction)
      for (let i = 0; i < Math.min(cardCount, 5); i++) {
        const card = unitCards.nth(i);
        const factionName = await card.locator('.faction-name').textContent();
        
        expect(factionName?.toLowerCase()).toContain('space marines');
      }
    });
  });

  test.describe('Complex AND Logic Tests', () => {
    test('should apply all filters simultaneously - name, faction, and unit type', async ({ page }) => {
      // Trigger search with multiple conditions
      const nameInput = page.locator('input#unit-name');
      const factionInput = page.locator('input#faction');
      const unitTypeSelect = page.locator('select#unitType');
      
      await nameInput.fill('marine');
      await factionInput.fill('space marines');
      await unitTypeSelect.selectOption('CHARACTER');
      await page.keyboard.press('Enter');
      
      // Wait for results
      await page.waitForSelector('.unit-card', { timeout: 15000 });
      
      // Check that we have results
      const unitCards = page.locator('.unit-card');
      const cardCount = await unitCards.count();
      expect(cardCount).toBeGreaterThan(0);
      
      // Check that all results meet ALL conditions
      for (let i = 0; i < Math.min(cardCount, 5); i++) {
        const card = unitCards.nth(i);
        const unitName = await card.locator('.unit-name').textContent();
        const factionName = await card.locator('.faction-name').textContent();
        const unitType = await card.locator('.unit-type, .badge').first().textContent();
        
        expect(unitName?.toLowerCase()).toContain('marine');
        expect(factionName?.toLowerCase()).toContain('space marines');
        expect(unitType?.toLowerCase()).toContain('character');
      }
    });

    test('should return no results when conflicting conditions are applied', async ({ page }) => {
      // Trigger search with conflicting conditions
      const nameInput = page.locator('input#unit-name');
      const factionInput = page.locator('input#faction');
      
      await nameInput.fill('berzerker');
      await factionInput.fill('space marines'); // Berzerkers don't exist in Space Marines
      await page.keyboard.press('Enter');
      
      // Wait for results or no results message
      await page.waitForTimeout(2000);
      
      // Check that we have no results or a no results message
      const unitCards = page.locator('.unit-card');
      const noResultsMessage = page.locator('.no-results, [class*="no-results"]');
      
      const cardCount = await unitCards.count();
      const hasNoResultsMessage = await noResultsMessage.count() > 0;
      
      expect(cardCount === 0 || hasNoResultsMessage).toBeTruthy();
    });
  });

  test.describe('Case Insensitive Search', () => {
    test('should work with different capitalizations', async ({ page }) => {
      // Test with lowercase
      const nameInput = page.locator('input#unit-name');
      const factionInput = page.locator('input#faction');
      
      await nameInput.fill('BERZERKER');
      await factionInput.fill('WORLD EATERS');
      await page.keyboard.press('Enter');
      
      // Wait for results
      await page.waitForSelector('.unit-card', { timeout: 15000 });
      
      // Check that we have results
      const unitCards = page.locator('.unit-card');
      const cardCount = await unitCards.count();
      expect(cardCount).toBeGreaterThan(0);
      
      // Check that all results are World Eaters berzerkers
      for (let i = 0; i < cardCount; i++) {
        const card = unitCards.nth(i);
        const unitName = await card.locator('.unit-name').textContent();
        const factionName = await card.locator('.faction-name').textContent();
        
        expect(unitName?.toLowerCase()).toContain('berzerker');
        expect(factionName?.toLowerCase()).toContain('world eaters');
      }
    });
  });

  test.describe('Active Filters Display', () => {
    test('should display all active filters correctly', async ({ page }) => {
      // Trigger search with multiple conditions
      const nameInput = page.locator('input#unit-name');
      const factionInput = page.locator('input#faction');
      const unitTypeSelect = page.locator('select#unitType');
      
      await nameInput.fill('marine');
      await factionInput.fill('space marines');
      await unitTypeSelect.selectOption('CHARACTER');
      await page.keyboard.press('Enter');
      
      // Wait for results
      await page.waitForSelector('.unit-card', { timeout: 15000 });
      
      // Check that active filters are displayed
      const activeFilters = page.locator('.active-filter-tag, [class*="active-filter"]');
      const filterCount = await activeFilters.count();
      expect(filterCount).toBeGreaterThanOrEqual(3);
      
      // Check that the filters show the correct values
      const filterTexts = [];
      for (let i = 0; i < filterCount; i++) {
        const filterText = await activeFilters.nth(i).textContent();
        filterTexts.push(filterText?.toLowerCase());
      }
      
      expect(filterTexts.some(text => text?.includes('name: marine'))).toBeTruthy();
      expect(filterTexts.some(text => text?.includes('faction: space marines'))).toBeTruthy();
      expect(filterTexts.some(text => text?.includes('unittype: character'))).toBeTruthy();
    });
  });

  test.describe('Clear Filters', () => {
    test('should clear all filters and reset search', async ({ page }) => {
      // First, perform a search
      const nameInput = page.locator('input#unit-name');
      const factionInput = page.locator('input#faction');
      
      await nameInput.fill('marine');
      await factionInput.fill('space marines');
      await page.keyboard.press('Enter');
      
      // Wait for results
      await page.waitForSelector('.unit-card', { timeout: 15000 });
      
      // Clear filters
      const clearButton = page.locator('button:has-text("Clear"), button[class*="clear"]');
      await clearButton.click();
      
      // Check that inputs are cleared
      const nameValue = await nameInput.inputValue();
      const factionValue = await factionInput.inputValue();
      
      expect(nameValue).toBe('');
      expect(factionValue).toBe('');
      
      // Check that active filters are removed
      const activeFilters = page.locator('.active-filter-tag, [class*="active-filter"]');
      const filterCount = await activeFilters.count();
      expect(filterCount).toBe(0);
    });
  });
});
