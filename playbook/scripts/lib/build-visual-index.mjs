/**
 * Build dist/ai/visual-index.json from menu catalog + curated visual cues.
 *
 * Automation:
 * - menu.yml descriptions/categories merge in automatically on every `yarn build:ai`
 * - This file itself is not hand-edited per kit
 *
 * Manual:
 * - Lookalike / screenshot cues live in `visual-cues.mjs` (KIT_VISUAL_CUES, etc.)
 * - Update that file when agents confuse kits from visuals, then rebuild dist/ai
 * - See docs/AI_METADATA.md → "Updating the visual index"
 */

import { KIT_VISUAL_CUES, LAYOUT_CUES, SPACING_PX_TO_TOKEN, TYPOGRAPHY_BY_VISUAL } from './visual-cues.mjs';

export function buildVisualIndex({ menuCatalog, kitNames }) {
  const menuKits = menuCatalog?.kits || {};
  const kits = {};

  for (const name of kitNames) {
    const menu = menuKits[name] || {};
    const cues = KIT_VISUAL_CUES[name] || {};

    kits[name] = {
      category: menu.category || null,
      description: menu.description || null,
      status: menu.status || null,
      ...(menu.sections?.length ? { sections: menu.sections } : {}),
      ...(cues.looksLike ? { looksLike: cues.looksLike } : {}),
      ...(cues.not ? { not: cues.not } : {}),
      ...(cues.variantsFromVisual ? { variantsFromVisual: cues.variantsFromVisual } : {}),
      ...(cues.gotchas ? { gotchas: cues.gotchas } : {}),
      ...(cues.cues ? { cues: cues.cues } : {}),
    };
  }

  return {
    description:
      'Visual → Playbook kit map for screenshot and design handoffs. Use this before guessing kit names from visuals.',
    howToUse: [
      'Decompose the screenshot top-down: page regions → sections → controls → text',
      'Match each region to kits via looksLike / typographyByVisual / layoutCues',
      'Resolve conflicts with not[] and gotchas',
      'Map px spacing to spacingPxToToken; then open kits/<name>.schema.json + playgrounds/<name>.json',
    ],
    spacingPxToToken: SPACING_PX_TO_TOKEN,
    typographyByVisual: TYPOGRAPHY_BY_VISUAL,
    layoutCues: LAYOUT_CUES,
    categories: menuCatalog?.categories || {},
    kits,
  };
}
