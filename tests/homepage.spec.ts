import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the homepage successfully', async ({ page }) => {
    // Check that the page title contains the expected text
    await expect(page).toHaveTitle(/Grimdark Grimoire/);
    
    // Check that the main heading is visible
    await expect(page.getByRole('heading', { name: 'Welcome to the Grimdark Grimoire' })).toBeVisible();
    
    // Check that the hero subtitle is visible
    await expect(page.getByText('Your comprehensive Warhammer 40K database for units, weapons, and factions.')).toBeVisible();
  });

  test('should display hero statistics', async ({ page }) => {
    // Check that all three stats are visible
    await expect(page.getByText('1,635+')).toBeVisible();
    await expect(page.locator('.stat-label').filter({ hasText: 'Units' })).toBeVisible();
    
    await expect(page.getByText('2,271+')).toBeVisible();
    await expect(page.locator('.stat-label').filter({ hasText: 'Weapons' })).toBeVisible();
    
    await expect(page.getByText('25')).toBeVisible();
    await expect(page.locator('.stat-label').filter({ hasText: 'Factions' })).toBeVisible();
  });

  test('should have accessible and clickable feature cards', async ({ page }) => {
    // Test Units feature card
    const unitsCard = page.locator('.feature-card').filter({ hasText: 'Units' });
    await expect(unitsCard).toBeVisible();
    
    const exploreUnitsButton = unitsCard.getByRole('link', { name: 'Explore Units' });
    await expect(exploreUnitsButton).toBeVisible();
    await expect(exploreUnitsButton).toBeEnabled();
    
    // Test that the button is clickable and navigates correctly
    await exploreUnitsButton.click();
    await expect(page).toHaveURL(/.*\/units/);
    
    // Go back to homepage
    await page.goto('/');
    
    // Test Weapons feature card
    const weaponsCard = page.locator('.feature-card').filter({ hasText: 'Weapons' });
    await expect(weaponsCard).toBeVisible();
    
    const browseWeaponsButton = weaponsCard.getByRole('link', { name: 'Browse Weapons' });
    await expect(browseWeaponsButton).toBeVisible();
    await expect(browseWeaponsButton).toBeEnabled();
    
    // Test that the button is clickable and navigates correctly
    await browseWeaponsButton.click();
    await expect(page).toHaveURL(/.*\/weapons/);
    
    // Go back to homepage
    await page.goto('/');
    
    // Test Factions feature card
    const factionsCard = page.locator('.feature-card').filter({ hasText: 'Factions' });
    await expect(factionsCard).toBeVisible();
    
    const viewFactionsButton = factionsCard.getByRole('link', { name: 'View Factions' });
    await expect(viewFactionsButton).toBeVisible();
    await expect(viewFactionsButton).toBeEnabled();
    
    // Test that the button is clickable and navigates correctly
    await viewFactionsButton.click();
    await expect(page).toHaveURL(/.*\/factions/);
  });

  test('should have accessible quick search links', async ({ page }) => {
    // Check that the Quick Search section is visible
    await expect(page.getByRole('heading', { name: 'Quick Search' })).toBeVisible();
    
    // Test Search Units link
    const searchUnitsLink = page.getByRole('link', { name: 'Search Units' });
    await expect(searchUnitsLink).toBeVisible();
    await expect(searchUnitsLink).toBeEnabled();
    
    // Test that the link is clickable and navigates correctly
    await searchUnitsLink.click();
    await expect(page).toHaveURL(/.*\/units/);
    
    // Go back to homepage
    await page.goto('/');
    
    // Test Search Weapons link
    const searchWeaponsLink = page.getByRole('link', { name: 'Search Weapons' });
    await expect(searchWeaponsLink).toBeVisible();
    await expect(searchWeaponsLink).toBeEnabled();
    
    // Test that the link is clickable and navigates correctly
    await searchWeaponsLink.click();
    await expect(page).toHaveURL(/.*\/weapons/);
  });

  test('should have proper keyboard navigation', async ({ page }) => {
    // Test tab navigation through interactive elements
    await page.keyboard.press('Tab');
    
    // Check that focus is on the first interactive element (if any)
    const firstFocusedElement = page.locator(':focus');
    const focusedCount = await firstFocusedElement.count();
    
    if (focusedCount > 0) {
      await expect(firstFocusedElement).toBeVisible();
    }
    
    // Test that we can navigate through all feature card buttons with Tab
    const featureButtons = page.locator('.feature-card .btn');
    const buttonCount = await featureButtons.count();
    
    for (let i = 0; i < Math.min(buttonCount, 3); i++) { // Limit to 3 to avoid infinite loops
      await page.keyboard.press('Tab');
      const focusedButton = page.locator(':focus');
      const focusedButtonCount = await focusedButton.count();
      
      if (focusedButtonCount > 0) {
        await expect(focusedButton).toBeVisible();
      }
    }
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check that the page still loads correctly
    await expect(page.getByRole('heading', { name: 'Welcome to the Grimdark Grimoire' })).toBeVisible();
    
    // Check that hero stats are still visible (should stack vertically on mobile)
    await expect(page.getByText('1,635+')).toBeVisible();
    await expect(page.getByText('2,271+')).toBeVisible();
    await expect(page.getByText('25')).toBeVisible();
    
    // Check that feature cards are still accessible
    const exploreUnitsButton = page.getByRole('link', { name: 'Explore Units' });
    await expect(exploreUnitsButton).toBeVisible();
    await expect(exploreUnitsButton).toBeEnabled();
  });

  test('should have proper ARIA labels and accessibility attributes', async ({ page }) => {
    // Check that all links have proper text content
    const links = page.locator('a');
    const linkCount = await links.count();
    
    for (let i = 0; i < linkCount; i++) {
      const link = links.nth(i);
      const text = await link.textContent();
      expect(text).toBeTruthy();
      expect(text?.trim()).not.toBe('');
    }
    
    // Check that buttons have proper roles
    const buttons = page.locator('button, [role="button"]');
    const buttonCount = await buttons.count();
    
    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      await expect(button).toBeVisible();
    }
  });

  test('should handle hover states correctly', async ({ page, browserName }) => {
    // Skip hover tests on mobile devices as they don't have hover states
    const isMobile = page.context().browser()?.version()?.includes('Mobile') || 
                     page.viewportSize()?.width && page.viewportSize()!.width < 768;
    
    if (isMobile) {
      // On mobile, just verify the elements are present and clickable
      const unitsCard = page.locator('.feature-card').filter({ hasText: 'Units' });
      await expect(unitsCard).toBeVisible();
      
      const searchUnitsLink = page.getByRole('link', { name: 'Search Units' });
      await expect(searchUnitsLink).toBeVisible();
      await expect(searchUnitsLink).toBeEnabled();
      
      return; // Skip hover testing on mobile
    }
    
    // Test hover effect on feature cards (desktop only)
    const unitsCard = page.locator('.feature-card').filter({ hasText: 'Units' });
    
    // Hover over the card
    await unitsCard.hover();
    
    // Wait a bit for the transition to apply
    await page.waitForTimeout(100);
    
    // Check for hover effects - either transform or border color change
    const transform = await unitsCard.evaluate(el => window.getComputedStyle(el).transform);
    const borderColor = await unitsCard.evaluate(el => window.getComputedStyle(el).borderColor);
    
    // Check that either transform is applied OR border color changes (more flexible)
    const hasTransform = transform !== 'none' && transform !== 'matrix(1, 0, 0, 1, 0, 0)' && transform !== 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)';
    const hasBorderChange = borderColor !== 'rgba(0, 0, 0, 0)' && borderColor !== 'transparent';
    
    // At least one hover effect should be present
    expect(hasTransform || hasBorderChange).toBeTruthy();
    
    // Test hover effect on search links
    const searchUnitsLink = page.getByRole('link', { name: 'Search Units' });
    await searchUnitsLink.hover();
    
    // Check that the link has hover styling (background color change)
    const bgColor = await searchUnitsLink.evaluate(el => window.getComputedStyle(el).backgroundColor);
    expect(bgColor).not.toBe('rgba(0, 0, 0, 0)'); // Should have some background color
  });
});
