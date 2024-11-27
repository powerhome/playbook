import { test, expect } from 'node_modules/../playwright/test';

test('Navigate using Tab and Typeahead', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.type('avatar');
  await page.keyboard.press('Enter');

  await expect(page).toHaveURL('http://localhost:3000/kits/avatar/react');
});
