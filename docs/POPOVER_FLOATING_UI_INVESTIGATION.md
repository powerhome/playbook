# Popover → floating-ui investigation (PLAY-3399)

**Branch:** `PLAY-3399-popover-library-investigation` (uncommitted POC)
**Goal:** Move Playbook's popover positioning onto the library Tooltip already uses (floating-ui), so we can stop depending on Popper.js.

## TL;DR

- **It works for both React and Rails.** The POC moves React Popover, Rails Popover and the Rails interactive Filter chip onto floating-ui. It also removes both Popper packages from `playbook/package.json` and `yarn.lock`, so the POC builds, tests and runs with no Popper code installed at all.
- **Consumer audits (Nitro, Tempo, Runway, Connect-Web) say Rails is safe and React needs a decision.** Every audited Rails call site uses documented Popover props only. On the React side, 8 call sites across Nitro, Tempo and Runway use Popper-only API. The POC's compatibility layer already handles 6 of them.
- **Recommended order: Rails first, then React.** Rails Popover and Rails Filter can ship now with no API change. React ships second, after the team decides how to treat `modifiers` and `auto*` placements (see [Decision needed](#decision-needed-for-react)). The Popper packages can only be removed in the React release, because `react-popper` needs `@popperjs/core`.
- **Bundle:** removing Popper entirely saves about −49.6 KB raw / −10.5 KB gzip across all built JS. Almost all of it comes from the shared `lib` chunk, so most of the saving arrives with the React release. No new packages are added, because floating-ui already ships for Tooltip.

## How it works today

| Surface | Library | Where |
|---|---|---|
| React Popover (`PbReactPopover`) | `react-popper` (`Manager` / `Reference` / `Popper`), devDependency, bundled | `pb_popover/_popover.tsx` |
| Rails Popover (`PbPopover`) | `@popperjs/core` `createPopper`, runtime **dependency** | `pb_popover/index.ts` |
| Rails interactive Filter chip (`PbFilter`) | `@popperjs/core` `createPopper` | `pb_filter/index.ts` |
| React + Rails Tooltip | `@floating-ui/react` / `@floating-ui/dom` | `pb_tooltip/` |

Kits that render Popover under the hood: **Filter** (React + Rails), **Passphrase** (React + Rails), **Table** sort/filter header (React + Rails), **Advanced Table** (header cell sort menu, column visibility action bar), and **Rich Text Editor** toolbar dropdowns (React + Rails). The docs site also uses it in `NewsNav` and the Playground `PropControl`.

Kits that don't render a Popover but have code for running inside one (the PLAY-3055 shared portal logic): **Dropdown**, **Multi Level Select**, **Date Picker**, **Time Picker** and **Typeahead**. When one of these sits inside a popover, its menu renders outside the popover body (the "portal"). Clicks on that menu then count as inside the popover, and the menu closes when the popover closes.

## What the POC changes

| File | Change |
|---|---|
| `playbook/app/pb_kits/playbook/pb_popover/_popover.tsx` | React Popover on `@floating-ui/react` |
| `playbook/app/pb_kits/playbook/pb_popover/index.ts` | Rails Popover on `@floating-ui/dom` |
| `playbook/app/pb_kits/playbook/pb_filter/index.ts` | Rails Filter chip on `@floating-ui/dom` |
| `playbook/package.json`, `yarn.lock` | Removes `@popperjs/core` and `react-popper` |
| `playbook/scripts/build-ai-dist.mjs` | Drops `@popperjs/core` from the `bundledWithPlaybookUi` list |
| `playbook-website/app/views/guides/getting_started/dependencies.md` | Filter, Passphrase and Popover rows now list `@floating-ui/react` |

Generated metadata (`kit.schema.json`, `_playground.json`) has not been regenerated for this POC.

If the work ships Rails first, the Rails PR takes only the two Rails files. The React file, the package removal, `build-ai-dist.mjs` and `dependencies.md` go in the React PR.

### React: `pb_popover/_popover.tsx`

- Replaces `Manager`/`Reference`/`Popper` with a single `useFloating({ placement, strategy, middleware, open: show, whileElementsMounted: autoUpdate })` call in `PbReactPopover`.
- Passes `refs.setFloating`, `floatingStyles` and the resolved placement to the inner `Popover`. `refs.setReference` goes on the existing `#reference-{id}` wrapper span. When `referenceElement` is passed, it's used through `elements.reference`.
- Keeps the public API: `placement`, `referenceElement`, `usePortal`, `portal`, `strategy` and `modifiers` are now typed explicitly, where before they came from `PopperProps`.
- `modifiers` is marked deprecated. Popper modifiers that map 1:1 are translated:
  - `offset: [skid, dist]` becomes `offset({ crossAxis, mainAxis })`.
  - `flip` with `enabled: false` drops `flip()`.
  - `preventOverflow` with `enabled: false` drops `shift()`.
- `appendTo`, portals, `closeOnClick`, the Dialog/Fullscreen floating-root handling, class names and the DOM structure are unchanged.

### Rails: `pb_popover/index.ts`

- Replaces `createPopper` with `computePosition` + `autoUpdate` from `@floating-ui/dom`, the same approach Rails Tooltip uses.
- `autoUpdate` **only runs while the popover is open**. It starts in `toggleTooltip`, or in `connect` if the popover is already open, and stops in `hideTooltip` and `disconnect`. Popper kept scroll and resize listeners running for every popover for the whole page lifetime, so this is a small performance win on pages with many popovers.
- Drops this kit's use of `subscribeFloatingKitReposition` (added in PLAY-3055). `autoUpdate` already covers scrolling in any parent, window resize and size changes of either element. Dropdown, Multi Level Select, Date Picker and Time Picker still use the helper for their own menus.
- Unchanged: the `pb:popover:open` / `pb:popover:close` events, the `show` / `hide` classes, the tooltip and trigger IDs, and the `append_to` move.
- Writes `data-placement` on the tooltip. Popper wrote `data-popper-placement`. Nothing in Playbook reads either attribute on Popover. Rails Tooltip still writes `data-popper-placement` for compatibility (`pb_tooltip/index.js`), and Rails Popover should do the same before it ships (see [Next steps](#next-steps)).

### Rails Filter: `pb_filter/index.ts`

Same change as Rails Popover: `bottom-start`, 8px offset, `strategy: fixed`, and `autoUpdate` only while open.

### Behavior mapping

| Popper.js (before) | floating-ui (POC) |
|---|---|
| Default modifiers `flip` + `preventOverflow` | `flip()` + `shift()` |
| `offset: [0, 20]` (`offset` prop) | `offset(20)` |
| When no side fits, `flip` keeps the requested placement | `flip({ fallbackStrategy: "initialPlacement" })` (see the note below) |
| `flipVariations` (start ↔ end) | `flip()` default `flipAlignment: true` |
| `eventListeners` (scroll/resize, always on) | `autoUpdate` (scroll, resize, ResizeObserver, layout shift), only while open |
| React inline style: `position:absolute; inset:0 auto auto 0; transform: translate3d(…)` | `position:absolute; left:0; top:0; transform: translate(…)` |
| Rails inline style: `position:fixed; inset:0 auto auto 0; margin:0; transform: translate3d(…)` | `position:fixed; left:…px; top:…px` |

**Flip fallback.** When neither side has room, floating-ui's default (`bestFit`) behaves differently from Popper. In the "Filter interactive" React example, Popper kept `bottom-start` and overflowed the bottom of the screen, while `bestFit` flipped to `top-start` and overflowed the top. The POC uses `initialPlacement` to match Popper. `bestFit` is arguably the better experience, so switching could be a deliberate follow-up.

## Consumer audits

We audited four consuming apps: Nitro, Tempo (pinned to 18.2.0), Runway (pinned to 18.3.0-alpha; the audit read Runway's code, not the installed kit) and Connect-Web (React only, on 16.0.0).

### Rails: safe to ship

| App | `pb_rails("popover")` use | Findings |
|---|---|---|
| Nitro | ~152 call sites | Documented props only (`trigger_element_id`, `tooltip_id`, `position`, `close_on_click`, boolean `offset`, `append_to`, sizing, `z_index`, padding). |
| Tempo | 4 call sites | Documented props only, all `position: "bottom"`. No JS reaches into the element's `.popper` instance. |
| Runway | None directly; 6 Filter components | `active_sprint/index.js` listens for `pb:popover:open`, checks `.show` on `#filter-formbacklogs-show-search`, and avoids replacing the filter's markup during live refresh. `active_sprint_live_refresh_spec.rb` checks the filter panel sits just below its trigger, allowing for pixel rounding. |
| Connect-Web | None (React only) | — |

Rails `position` only accepts the 12 standard placements, so Rails consumers can't use `auto`. The POC keeps everything Runway relies on: the event, the `.show` class, the element IDs, and the panel's position below the trigger.

Two Runway items to check before release:

- floating-ui writes fractional `left`/`top` values (for example `359.875px`). The Runway spec's rounding tolerance should cover this, but run it against the Rails build.
- Runway avoided replacing the filter markup so that the Popper instance stayed attached. The POC has no instance to lose: `connect` restarts positioning if the popover is already open. The live refresh should still be checked on the active sprint page.

### React: needs a decision

Across the four apps, about 190 `PbReactPopover` files use Playbook props only: `show`, `reference`, `referenceElement`, `placement`, `closeOnClick`, `shouldClosePopover`, boolean `offset`, `appendTo`, `usePortal`, `zIndex` (including string values like `"999"`), `className`, `id`, and spacing props. The POC keeps all of these working. No app passes `onFirstUpdate`, `innerRef` or `strategy`, and no app imports `react-popper` or `@popperjs/core` for these kits.

These call sites go beyond the documented kit props:

| App | Call site | Popper usage | With the POC today |
|---|---|---|---|
| Nitro | `installation_scheduler/.../Crews/MoveUpButton` | `flip` with `fallbackPlacements: ["left", "right-start", "left-start", "top"]` | ⚠️ `flip` stays on, but `fallbackPlacements` is ignored, so it falls back to floating-ui's default order. **Fix:** pass `fallbackPlacements` through. floating-ui's `flip` takes the same option name with the same meaning. |
| Nitro | `installation_scheduler/.../AppointmentSelect` | `offset: [-10, 0]` | ✅ Translated to `crossAxis: -10`. |
| Nitro | `nitro_maps/.../MapLayersPopover` (shared by the map layer popovers) | `offset: [0, 8]` | ✅ Translated to `mainAxis: 8`. |
| Nitro | `nitro_maps/.../ThemeSwitcher` | `offset: [0, 8]` | ✅ Translated. |
| Tempo | `CommunicationsFilters.tsx` (3 popovers: type, user and date filters) | `offset: [0, 4]` with `phase: "main"`, to shrink the 20px default gap | ✅ Translated; `phase` is ignored. |
| Runway | `SprintOverview` | `placement={isMobile ? "auto-start" : "right"}` | ❌ floating-ui has no `auto*` placements, so this is a TypeScript error and positions wrong at runtime on mobile. **Fix:** map `auto` / `auto-start` / `auto-end` to the `autoPlacement()` middleware, or change Runway to a standard placement. |
| Nitro | `territory_maps/.../TestTools` | `placement="left-top"` (typo, not a real placement) | Already invalid with Popper; both libraries treat it as plain `left`. Fix the typo in Nitro. |
| Nitro | `leave/.../PopoverEllipsisButton` | Types `placement` as `string`, comments link to Popper docs | No runtime effect. |

**Types.** Before the POC, `PbPopoverProps` extended `Omit<PopperProps, 'children'>`, so TypeScript accepted every Popper prop. Only `modifiers`, `placement` and `referenceElement` reached `<Popper>`; `onFirstUpdate`, `innerRef` and `strategy` already did nothing. The POC's `PopperLikeModifier` type is stricter than what apps pass today: Nitro passes `enabled: "true"` as a string, and Tempo adds `phase`. Loosen it (`enabled?: boolean | string`, allow extra keys) so these call sites keep compiling.

**CSS that depends on Popper's inline styles.** These won't break an API, but they could change how a popover looks:

| App | Selector | Risk |
|---|---|---|
| Runway | `BigBoardApp/Popovers/styles.scss` `.popoverAdjustment` (AdditionPopover): forces `inset`, `transform: translate3d(...)` and `position: fixed` with `!important` | Medium. Its `!important` rules still beat floating-ui's inline `left`/`top`/`transform`, so it probably behaves the same. It's the most fragile override, so check it visually. |
| Runway | `FlightControl/columns/style.scss` `.reviewerPopover`: `right: 150px` on `[class^=pb_popover]` | **Medium-high.** Popper wrote `right: auto` inline (through `inset`), which cancelled this rule. floating-ui writes only `left`/`top`, so `right: 150px` now applies and may stretch or shift the popover. Check visually, and expect to adjust this rule. |
| Runway | `CloneItemsButton/styles.scss` `.customBacklogPopover`: `margin-top`, width, padding with `!important` | Low. Neither library writes these on React. |
| Connect-Web | `.room-popover-modal-position { margin-top: 15px }`, `.menu-popover` margins, `#popover-notification-preferences { padding-right: 93px }` | Low. React Popper didn't write margin or padding inline, and neither does floating-ui. |
| Runway, Connect-Web | `z-index` on `.pb_popover_kit`; `.pb_popover_body`, `.pb_popover_kit.p_none.pb_filter_sort_menu`; Cypress selects `.pb_popover_body` | None. Class names and structure are unchanged. |

**Dependencies in consuming apps.** Nitro, Tempo and Connect-Web don't depend on `@popperjs/core` themselves. When Playbook stops shipping it, nothing breaks for them. Runway lists `react-popper` in its `package.json` but never imports it, so it can be removed there. Runway's `popper.js` 1.x (for Bootstrap 4) and `@popperjs/core` (likely for react-bootstrap) aren't related to Playbook and stay.

### Decision needed for React

| Option | What it means | Consumer work |
|---|---|---|
| **A. Non-breaking (recommended)** | Keep the `modifiers` translation and extend it: pass `flip.fallbackPlacements` through, map `auto*` placements to `autoPlacement()`, and loosen the modifier type. Add `offset` as a number (`offset={4}`) as the new way to set the gap, and log a dev-mode deprecation warning when `modifiers` is passed. Remove `modifiers` in the next major. | None to upgrade. Later, move the Nitro (×3) and Tempo (×3) offset overrides to `offset={n}` and the Nitro flip override to a supported prop, before the major. |
| B. Breaking (`!` release) | Drop `modifiers` and `auto*` placements now. | Coordinated updates in Nitro (4 sites, 3 of them offset overrides), Tempo (3) and Runway (1) before they upgrade. |

Under either option, Runway's `.reviewerPopover` override needs a visual check, and Runway's live-refresh spec should be run against the Rails release.

## Bundle and build

Both sides were built with `npx vite build` into a clean `dist/`.

| | Before | After | Δ |
|---|---|---|---|
| All dist JS (excluding `dist/ai`) | 2,627,464 B / 636,818 B gz | 2,577,825 B / 626,357 B gz | **−49.6 KB / −10.5 KB gz** |
| `chunks/lib-*.js` | 305,358 / 77,132 gz | 263,735 / 67,530 gz | −41.6 KB / −9.6 KB gz |
| `playbook-rails.js` | 236,171 / 50,748 gz | 236,494 / 50,862 gz | +0.3 KB (floating-ui DOM code moves in) |
| Chunks containing Popper code | `lib` | none | — |

Notes:

- These numbers are for the full migration. Rails first on its own won't show much saving, because Popper stays in the shared `lib` chunk for React until the React release. Measure each PR on its own.
- `@floating-ui/dom` is already in `dependencies` and `@floating-ui/react` is a bundled devDependency (installed: 1.6.12 and 0.26.28), so nothing new gets installed.
- **Packages removed in the POC:** `@popperjs/core` (from `dependencies`) and `react-popper` (from `devDependencies`). `yarn install` dropped four lockfile entries: `@popperjs/core`, `react-popper`, `react-fast-compare`, and the `warning@^4.0.2` range (`warning@^4.0.3` stays for other packages). Before the removal, `yarn why` showed nothing else in the workspace depended on either package. After it, neither is in `node_modules` and no `dist` chunk contains Popper code.
- **Local dev after pulling this branch:** run `yarn install`, delete `playbook-website/node_modules/.vite`, and restart Vite. Vite's cache still held pre-bundled copies of `react-popper` and `@popperjs/core` until it was cleared.
- Removing `@popperjs/core` from `dependencies` means consumer apps stop getting it as a transitive dependency. The audits found no app relying on that, but the changelog should still say so.
- `yarn check:external-deps` needs no change: nothing loads from a CDN or remote host.
- Watch-out when measuring: `vite build` writes `../dist` and does **not** empty it, so stale chunks pile up. Run `rm -rf dist` before builds you want to compare.

## Testing

### Automated

- Jest for Popover, Filter, Passphrase, Table, Advanced Table, Tooltip, Dialog, Dropdown and Time Picker: **16 suites, 568 tests passing**.
- After removing the packages: the full Jest suite passes (**158 suites, 2,286 tests**). A clean `vite build` succeeds with no Popper code in `dist`, and `yarn check:external-deps` passes.
- ESLint: 0 errors. Every warning in these files was already there before this change.
- `tsc --noEmit`: no errors in Popover, Filter, Passphrase, Table, Advanced Table or Rich Text Editor files.
- jsdom has no layout, so Jest checks behavior (open/close, close-on-click, portals), not positioning.

### Manual (local docs site, Rails + Vite)

Two passes:

- **Scripted:** for each trigger, a script clicked it and measured the trigger and popover positions. It checked placement, offset, flipping near edges, following the `.layout_body` scroll container, and every way of closing (toggle, outside, inside, any).
- **Maintainer:** a manual pass on localhost in a visible browser with the packages removed. No issues found.

| Page | Result |
|---|---|
| `/kits/popover/react`: all 22 examples, every placement | ✅ Correct placement, 20px offset, flips at edges (`right-end` → `left-end` in a narrow viewport). closeOnClick inside/outside/any correct. Follows scroll. |
| `/kits/popover/rails`: all 22 examples, every `position`, `append_to` parent/selector, z-index | ✅ Same as React. Tooltip moves to `body` or the `append_to` target as before. |
| `/kits/filter/react`: 29 popovers (single, double, sort menu, placement, popoverProps, max width/height, interactive chips) | ✅ Matched a side-by-side run on the original react-popper code for every example. The one difference, the flip-fallback case above, is fixed with `initialPlacement`. |
| `/kits/filter/rails`: 26 popovers + 4 interactive chips (select, dropdown, dropdown, date picker) | ✅ Filter popover opens below the trigger and flips above when there isn't room. Chips sit 8px below and follow scroll. Flatpickr calendar renders. Picking an option updates the chip and auto-submits the form. Outside click closes. |
| `/kits/passphrase/react` and `/rails` | ✅ Tips popover opens to the right and closes. Triggers in the `showTipsBelow` examples are hidden at desktop width, as intended. |
| `/kits/table/react` and `/rails` (sort and filter header) | ✅ Except the duplicate-ID example below, which fails the same way on the original code. |
| `/kits/advanced_table/react` (column visibility ×5, grouped headers sort, filter) | ✅ Column-visibility checkboxes keep the popover open. Flips to `top-end` near the bottom. |
| `/kits/rich_text_editor/react` and `/rails` (block-style and "more" dropdowns) | ✅ |

### Kits inside a Rails Popover (PLAY-3055 shared portal logic)

No docs example puts these kits inside a Rails Popover, so I added a temporary one (removed afterwards). It had a `close_on_click: "outside"` Rails Popover containing Dropdown, Multi Level Select, Date Picker, Time Picker and Typeahead. Typeahead used `is_multi: false` to get the react-select version that PLAY-3055 covers.

The same script ran on the original Popper code and on the POC. It opened each nested menu with the trigger placed high and then mid-screen, scrolled 60px, and closed with an outside click.

| Kit | POC result | Compared with original Popper code |
|---|---|---|
| Dropdown | ✅ Menu 5px below its trigger, left-aligned. Moves with the popover on scroll. Closes with the popover. | Same |
| Multi Level Select | ✅ Menu 16px below the input. Checking an option keeps the popover open, and the popover grows with the new pill. Moves on scroll. Closes with the popover. | Same (15px vs 16px is rounding) |
| Date Picker | ✅ Calendar opens below the input when there's room and above when there isn't. Moves on scroll. Closes with the popover. | Above-the-input case is the same. Below-the-input case: the POC places the calendar 5px below the input, while the original overlapped the input by 15px. In the above-the-input case the calendar moved 40px during a 60px scroll (60px on the original); worth a glance in a visible browser. |
| Time Picker | ✅ Panel 5px below the input. Moves on scroll. Closes with the popover. | Same |
| Typeahead (react-select) | ✅ Menu opens directly below the input and extends past the popover's edge. Choosing an option keeps the popover open. Moves on scroll. Outside click closes both. | Only run on the POC |

The script's first version reported that the Date Picker calendar stayed open. It did the same on the original code: a synthetic `click()` doesn't fire flatpickr's close listener. With realistic pointer events (`pointerdown`, `mousedown`, `mouseup`, `click`), the calendar closes along with the popover.

Not covered: the React side of PLAY-3055 (React Dropdown, Select and Typeahead inside a React Popover, Dialog or Fullscreen) beyond the maintainer pass.

### Caveats

- The scripted pass ran in a hidden browser pane with a viewport of about 1024×600 to 1024×768.
- Not tested: Safari, Firefox, mobile, pinch-zoom (`subscribeFloatingKitReposition` listened to `visualViewport`; `autoUpdate` doesn't), and Turbo navigation on Rails pages (`_filter_within_turbo_frames`).

### Existing issues found along the way (not caused by this change)

- **Rails Table docs: duplicate IDs.** `user-table-filters-1` is used by both `_table_with_filter_variant.html.erb` and `_table_with_filter_with_card_title_props.html.erb`. On that docs page the second set of filter/sort popovers has no tooltip in the DOM and never opens. It fails the same way on Popper.
- **Filter "Max Width" / "Max Height" React examples:** the popover wrapper stretches to the full viewport width on both libraries. This is a CSS issue, not a positioning one.

## Risks / limitations

1. **React `modifiers` and `auto*` placements are the only real API risk.** The audits found 8 call sites. Option A covers all of them without changes in the consuming apps; Option B needs 8 coordinated fixes. Other apps we didn't audit could still use them, so the deprecation warning in Option A is the safety net.
2. **Consumer CSS that overrode Popper's inline styles.** Runway's `.reviewerPopover` (`right: 150px`) is the most likely visual change. Rails also no longer writes `margin: 0` inline, so any consumer margin on `.pb_popover_tooltip` would now apply. The audits found none.
3. **`data-popper-placement` on Rails Popover is gone.** No audited app reads it on Popover, but it's cheap to keep, as Rails Tooltip does.
4. **Generated metadata will change.** `reference`'s type string changes, and the explicitly typed props (`placement`, `modifiers`, `strategy`, `referenceElement`, `usePortal`, `portal`) may show up in `kit.schema.json` and the playground. Run `yarn generate:docs-metadata` and review the output. Don't hand-edit.
5. **Rails tooltip before first open:** it now sits invisible at `position: fixed` in its static spot, not clickable, until it's first opened. Popper positioned it right away. You can't see the difference, but it's worth knowing when debugging.

## Next steps

1. **Rails release: Rails Popover and Rails Filter → floating-ui.** No API change.
   - Take the two Rails files from the POC. Keep `@popperjs/core` and `react-popper` installed.
   - Add `data-popper-placement` alongside `data-placement`, matching Rails Tooltip.
   - Add Jest coverage for starting and stopping `autoUpdate` on open, close and disconnect.
   - Ask Runway to run `active_sprint_live_refresh_spec.rb` and check the active sprint live refresh against the release candidate.
   - Changelog: internal change, no consumer action needed.
2. **React decision.** Choose Option A or B from [Decision needed for React](#decision-needed-for-react). Option A is recommended.
3. **React release: React Popover → floating-ui, and remove Popper.**
   - Take `_popover.tsx` from the POC.
   - Under Option A: pass `fallbackPlacements` through, map `auto*` placements to `autoPlacement()`, loosen `PopperLikeModifier`, add numeric `offset`, and add the dev-mode deprecation warning.
   - Remove `@popperjs/core` and `react-popper`, with the `build-ai-dist.mjs` and `dependencies.md` edits.
   - Regenerate metadata (`yarn generate:docs-metadata`).
   - Add unit tests for `buildMiddleware` (modifier translation and `auto*` mapping).
   - Changelog: Popper removed, `modifiers` deprecated, `@popperjs/core` no longer shipped as a transitive dependency.
   - Ask Runway to check `.reviewerPopover` and `.popoverAdjustment` visually, and to drop its unused `react-popper` dependency.
4. **Consumer follow-ups (Option A, before the next major):** Nitro's 3 offset overrides and Tempo's 3 move to `offset={n}`. Nitro's MoveUpButton moves off `modifiers`. Nitro's `left-top` typo gets fixed. Then remove `modifiers` in the major.
5. **Optional: share a positioning helper with Tooltip.** Rails Popover, Rails Filter and Rails Tooltip now repeat the same `autoUpdate` + `computePosition` block, and a small shared utility would remove the duplication.
6. **Optional: try floating-ui's `useClick`/`useDismiss` in React** in place of the hand-rolled `closeOnClick` listener. That's riskier, because of the portaled-kit rules in `floatingPortalHosts`.
7. **Optional: decide between flip `bestFit` and `initialPlacement`.**
8. **Separate bugs:** the duplicate IDs in the Rails Table docs examples, and the Filter max-width popover stretching.

## Repro

```bash
# from playbook/
npx jest app/pb_kits/playbook/pb_popover app/pb_kits/playbook/pb_filter
```

```bash
# bundle comparison (clean dist each time)
rm -rf dist && npx vite build
```

```bash
# docs site
yarn start-dev
```
