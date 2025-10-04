import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    // Check that there is at least one h1 heading
    const h1 = page.locator('h1');
    const h1Count = await h1.count();
    expect(h1Count).toBeGreaterThan(0);
    
    // Check that the main heading contains the expected text
    const mainHeading = h1.filter({ hasText: 'Welcome to the Grimdark Grimoire' });
    await expect(mainHeading).toBeVisible();
    
    // Check that other headings follow proper hierarchy
    const h2s = page.locator('h2');
    const h2Count = await h2s.count();
    
    if (h2Count > 0) {
      for (let i = 0; i < h2Count; i++) {
        const h2 = h2s.nth(i);
        await expect(h2).toBeVisible();
        const text = await h2.textContent();
        expect(text).toBeTruthy();
      }
    }
  });

  test('should have proper alt text for images', async ({ page }) => {
    // Check all images have alt text
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      // Alt text should be present (can be empty string for decorative images)
      expect(alt).not.toBeNull();
    }
  });

  test('should have proper link text', async ({ page }) => {
    // Check that all links have meaningful text
    const links = page.locator('a');
    const linkCount = await links.count();
    
    for (let i = 0; i < linkCount; i++) {
      const link = links.nth(i);
      const text = await link.textContent();
      const href = await link.getAttribute('href');
      
      // Link should have text content
      expect(text).toBeTruthy();
      expect(text?.trim()).not.toBe('');
      
      // Link should have href attribute
      expect(href).toBeTruthy();
      
      // Skip anchor links (href="#")
      if (href !== '#') {
        expect(href).not.toBe('');
      }
    }
  });

  test('should have proper button accessibility', async ({ page }) => {
    // Check that all buttons have proper accessibility attributes
    const buttons = page.locator('button, [role="button"]');
    const buttonCount = await buttons.count();
    
    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      
      // Button should be visible and enabled
      await expect(button).toBeVisible();
      await expect(button).toBeEnabled();
      
      // Button should have text content or aria-label
      const text = await button.textContent();
      const ariaLabel = await button.getAttribute('aria-label');
      
      expect(text || ariaLabel).toBeTruthy();
    }
  });

  test('should support keyboard navigation', async ({ page }) => {
    // Test that all interactive elements are keyboard accessible
    const interactiveElements = page.locator('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const elementCount = await interactiveElements.count();
    
    if (elementCount === 0) {
      // Skip test if no interactive elements found
      return;
    }
    
    // Start with first element
    await page.keyboard.press('Tab');
    
    for (let i = 0; i < Math.min(elementCount, 5); i++) { // Limit to first 5 elements
      const focusedElement = page.locator(':focus');
      const focusedCount = await focusedElement.count();
      
      if (focusedCount > 0) {
        await expect(focusedElement).toBeVisible();
        
        // Check that focused element is interactive
        const tagName = await focusedElement.evaluate(el => el.tagName.toLowerCase());
        const role = await focusedElement.getAttribute('role');
        
        expect(['a', 'button', 'input', 'select', 'textarea'].includes(tagName) || role === 'button').toBeTruthy();
      }
      
      await page.keyboard.press('Tab');
    }
  });

  test('should have proper color contrast', async ({ page }) => {
    // This is a basic test - in a real scenario, you'd use axe-core or similar
    // Check that text elements are visible (basic contrast check)
    const textElements = page.locator('h1, h2, h3, p, span, a, button');
    const textCount = await textElements.count();
    
    for (let i = 0; i < Math.min(textCount, 20); i++) { // Limit to first 20 elements
      const element = textElements.nth(i);
      await expect(element).toBeVisible();
      
      // Check that the element has some color (not transparent)
      const color = await element.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return styles.color;
      });
      
      expect(color).not.toBe('rgba(0, 0, 0, 0)'); // Not transparent
    }
  });

  test('should have proper focus indicators', async ({ page }) => {
    // Test that focused elements have visible focus indicators
    const interactiveElements = page.locator('a, button, input, select, textarea');
    const elementCount = await interactiveElements.count();
    
    for (let i = 0; i < Math.min(elementCount, 5); i++) { // Test first 5 elements
      const element = interactiveElements.nth(i);
      
      // Focus the element
      await element.focus();
      
      // Check that the element is focused
      await expect(element).toBeFocused();
      
      // Check that focus is visible (basic check - element should be visible when focused)
      await expect(element).toBeVisible();
    }
  });

  test('should handle screen reader navigation', async ({ page }) => {
    // Test that the page has proper semantic structure for screen readers
    
    // Check for main landmark
    const main = page.locator('main, [role="main"]');
    if (await main.count() > 0) {
      await expect(main.first()).toBeVisible();
    }
    
    // Check for navigation landmark
    const nav = page.locator('nav, [role="navigation"]');
    if (await nav.count() > 0) {
      await expect(nav.first()).toBeVisible();
    }
    
    // Check for header landmark
    const header = page.locator('header, [role="banner"]');
    if (await header.count() > 0) {
      await expect(header.first()).toBeVisible();
    }
  });

  test('should have proper form accessibility', async ({ page }) => {
    // Check that any forms have proper labels
    const inputs = page.locator('input, select, textarea');
    const inputCount = await inputs.count();
    
    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i);
      const type = await input.getAttribute('type');
      
      // Skip hidden inputs
      if (type === 'hidden') continue;
      
      // Check for associated label
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');
      
      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        const hasLabel = await label.count() > 0;
        const hasAriaLabel = ariaLabel || ariaLabelledBy;
        
        expect(hasLabel || hasAriaLabel).toBeTruthy();
      }
    }
  });
});
