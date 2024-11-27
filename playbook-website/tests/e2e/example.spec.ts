import { test, expect } from 'node_modules/../playwright/test';

test('Homepage should load and display correct title', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  await expect(page).toHaveTitle(/Playbook Design System/);
});
