# Playwright UI Tests for Grimdarkly Frontend

This directory contains end-to-end UI tests for the Grimdarkly frontend application using Playwright.

## Test Files

- `homepage.spec.ts` - Tests for the homepage including button accessibility and clickability
- `navigation.spec.ts` - Tests for navigation between pages
- `accessibility.spec.ts` - Tests for accessibility features and compliance

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests with UI mode (interactive)
```bash
npm run test:ui
```

### Run tests in headed mode (see browser)
```bash
npm run test:headed
```

### Debug tests
```bash
npm run test:debug
```

### View test report
```bash
npm run test:report
```

## Test Configuration

The tests are configured in `playwright.config.ts` with the following features:

- **Browsers**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- **Base URL**: http://localhost:3001 (development server)
- **Auto-start**: Development server starts automatically before tests
- **Screenshots**: Taken on test failures
- **Videos**: Recorded for failed tests
- **Traces**: Collected for debugging failed tests

## Test Structure

Each test file follows this pattern:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should do something', async ({ page }) => {
    // Test implementation
  });
});
```

## Accessibility Testing

The accessibility tests check for:

- Proper heading hierarchy (h1, h2, etc.)
- Alt text for images
- Meaningful link text
- Button accessibility
- Keyboard navigation
- Color contrast (basic)
- Focus indicators
- Screen reader compatibility
- Form accessibility

## Adding New Tests

1. Create a new `.spec.ts` file in the `tests/` directory
2. Import `test` and `expect` from `@playwright/test`
3. Use `test.describe()` to group related tests
4. Use `test.beforeEach()` for setup if needed
5. Write individual tests using `test()`

## Best Practices

- Use semantic selectors (role, text, etc.) over CSS selectors when possible
- Test both desktop and mobile viewports
- Include accessibility checks in all tests
- Use `await expect()` for assertions
- Test user workflows, not just individual components
- Keep tests independent and isolated
