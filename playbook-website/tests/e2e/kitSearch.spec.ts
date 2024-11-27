import { test, expect } from 'node_modules/../playwright/test';

test('Click primary button and verify alert', async ({ page }) => {
  await page.goto('http://localhost:3000/kits/button/react');

  // the browser's alert dialog should say
  page.on('dialog', async (dialog) => {
    expect(dialog.message()).toBe('button clicked!');
    await dialog.accept();
  });

  const button = page.locator('.pb_button_kit_primary_inline_enabled').first();
  await button.click();
});

test('Click primary button and verify alert and fail', async ({ page }) => {
  await page.goto('http://localhost:3000/kits/button/react');

  // this fails on purpose
  page.on('dialog', async (dialog) => {
    expect(dialog.message()).toBe('button clicked!!!');
    await dialog.accept();
  });

  const button = page.locator('.pb_button_kit_primary_inline_enabled').first();
  await button.click();
});
