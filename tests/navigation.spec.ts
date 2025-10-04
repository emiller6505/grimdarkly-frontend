import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have accessible navigation links', async ({ page }) => {
    // Check that navigation is present (assuming it's in the Layout component)
    // We'll look for common navigation patterns
    
    // Check for potential navigation links in the header/nav area
    const navLinks = page.locator('nav a, header a, [role="navigation"] a');
    const navLinkCount = await navLinks.count();
    
    if (navLinkCount > 0) {
      // Test each navigation link
      for (let i = 0; i < navLinkCount; i++) {
        const link = navLinks.nth(i);
        await expect(link).toBeVisible();
        await expect(link).toBeEnabled();
        
        const text = await link.textContent();
        expect(text).toBeTruthy();
        expect(text?.trim()).not.toBe('');
      }
    }
  });

  test('should navigate between pages correctly', async ({ page }) => {
    // Test navigation to Units page
    await page.goto('/units');
    await expect(page).toHaveURL(/.*\/units/);
    
    // Test navigation to Weapons page
    await page.goto('/weapons');
    await expect(page).toHaveURL(/.*\/weapons/);
    
    // Test navigation to Factions page
    await page.goto('/factions');
    await expect(page).toHaveURL(/.*\/factions/);
    
    // Test navigation back to home
    await page.goto('/');
    await expect(page).toHaveURL(/.*\/$/);
  });

  test('should handle browser back/forward navigation', async ({ page }) => {
    // Navigate to units page
    await page.goto('/units');
    await expect(page).toHaveURL(/.*\/units/);
    
    // Navigate to weapons page
    await page.goto('/weapons');
    await expect(page).toHaveURL(/.*\/weapons/);
    
    // Use browser back button
    await page.goBack();
    await expect(page).toHaveURL(/.*\/units/);
    
    // Use browser forward button
    await page.goForward();
    await expect(page).toHaveURL(/.*\/weapons/);
  });

  test('should maintain state during navigation', async ({ page }) => {
    // This test ensures that the app doesn't crash during navigation
    // and that basic functionality is maintained
    
    // Start at home
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Welcome to the Grimdark Grimoire' })).toBeVisible();
    
    // Navigate to units
    await page.goto('/units');
    // Check that the page loads without errors
    await expect(page.locator('body')).toBeVisible();
    
    // Navigate to weapons
    await page.goto('/weapons');
    await expect(page.locator('body')).toBeVisible();
    
    // Navigate to factions
    await page.goto('/factions');
    await expect(page.locator('body')).toBeVisible();
    
    // Navigate back to home
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Welcome to the Grimdark Grimoire' })).toBeVisible();
  });

  test('should handle direct URL access', async ({ page }) => {
    // Test accessing pages directly via URL
    
    // Test direct access to units page
    await page.goto('/units');
    await expect(page).toHaveURL(/.*\/units/);
    await expect(page.locator('body')).toBeVisible();
    
    // Test direct access to weapons page
    await page.goto('/weapons');
    await expect(page).toHaveURL(/.*\/weapons/);
    await expect(page.locator('body')).toBeVisible();
    
    // Test direct access to factions page
    await page.goto('/factions');
    await expect(page).toHaveURL(/.*\/factions/);
    await expect(page.locator('body')).toBeVisible();
  });

  test('should handle 404 pages gracefully', async ({ page }) => {
    // Test accessing a non-existent page
    const response = await page.goto('/non-existent-page');
    
    // The page should either show a 404 or redirect to home
    // We'll check that the page doesn't crash
    await expect(page.locator('body')).toBeVisible();
    
    // Check that we're either on a 404 page or redirected
    const currentUrl = page.url();
    const bodyText = await page.locator('body').textContent();
    
    // Either we should be on a 404 page or the page should handle the error gracefully
    expect(currentUrl.includes('non-existent-page') || bodyText?.includes('404') || bodyText?.includes('Not Found')).toBeTruthy();
  });
});
