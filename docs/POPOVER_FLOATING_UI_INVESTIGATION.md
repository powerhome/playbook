# Popover → floating-ui investigation (PLAY-3399)

**Status:** investigation and proof of concept (POC) on `PLAY-3399-popover-library-investigation`. The code is a POC; the plan below splits it into two releases.
**Goal:** move Playbook's popover positioning onto floating-ui, the library Tooltip already uses, so Playbook no longer depends on Popper.js.

## Summary for approvers

**Recommendation:** migrate Rails first, then React as a separate milestone with its own acceptance criteria. The POC works in every scenario tested, but "works in what we tested" isn't "ready to ship". Each release has gates (below) that must pass first.

### Decisions requested

| Decision | Recommendation | Why |
|---|---|---|
| Release order | **Rails first, then React** | Every audited Rails call site uses documented props only, and the Rails DOM output now matches Popper's. React has 8 audited call sites that rely on Popper-only API. |
| React approach | **Option A: non-breaking transition** | A breaking release to remove a handful of undocumented usages is unnecessarily disruptive. The POC's compatibility layer covers all 8 audited call sites. |
| Legacy `modifiers` prop | **Deprecate in the React release, remove in the next major.** Not translated indefinitely. | The translation is a bridge with a defined [contract](#legacy-modifiers-contract-react), not general Popper compatibility. |
| New way to set the gap | **Add a numeric `offset` prop** (`offset={4}`) | It's what the audited offset overrides need, without Popper syntax. |
| Flip fallback | **Keep `initialPlacement`** for now | Matches Popper. Switching to floating-ui's `bestFit` would be a separate, deliberate change. |
| Shared positioning helper with Tooltip | **Defer** | Rails Popover and Filter now share one (`autoPositionFixed`); folding Tooltip in isn't needed for this work. |
| floating-ui `useClick`/`useDismiss` in React | **Defer** | Riskier because of the PLAY-3055 portaled-kit rules. |

### What each release delivers

| | Rails release | React release |
|---|---|---|
| Benefit | Consistency and maintenance: Rails Popover and Filter use the same library as Tooltip. Positioning listeners only run while a popover is open. | Removes `@popperjs/core` and `react-popper` from Playbook. Most of the bundle saving. |
| Bundle | Little change, because Popper stays in the shared `lib` chunk for React | About **−49.6 KB raw / −10.5 KB gzip** across all built JS, measured for the full migration |
| Consumer impact | None expected | None to upgrade under Option A; a deprecation warning for `modifiers` |
| Rollback | Revert two kit files and one utility; no package changes | Revert restores the packages; see [Rollback](#rollback) |

### Open risks

1. **`auto*` placements aren't proven equivalent to Popper's.** Only one audited call site uses them (Runway, mobile). This is a React release gate.
2. **No browser-level automated tests.** Jest has no layout, and Playbook has no browser test setup. Positioning has only been verified by scripted and manual checks in Chromium.
3. **Untested browsers:** Safari, Firefox and mobile. This is a gate for both releases.
4. **Consumer CSS that overrode Popper's inline styles**, mainly Runway's `.reviewerPopover`. This is a React release gate.
5. **Consumers outside the four audited apps** may use Popper modifiers we don't translate. The React release's deprecation warning is the safety net.

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

| File | Change | Release |
|---|---|---|
| `playbook/app/pb_kits/playbook/utilities/autoPositionFixed.ts` (+ test) | Shared Rails positioning helper on `@floating-ui/dom` | Rails |
| `playbook/app/pb_kits/playbook/pb_popover/index.ts` | Rails Popover uses the helper | Rails |
| `playbook/app/pb_kits/playbook/pb_filter/index.ts` | Rails Filter chip uses the helper | Rails |
| `playbook/app/pb_kits/playbook/pb_popover/_popover.tsx` (+ `buildMiddleware.test.ts`) | React Popover on `@floating-ui/react`, with the legacy modifier translation | React |
| `playbook/package.json`, `yarn.lock` | Removes `@popperjs/core` and `react-popper` | React |
| `playbook/scripts/build-ai-dist.mjs` | Drops `@popperjs/core` from the `bundledWithPlaybookUi` list | React |
| `playbook-website/app/views/guides/getting_started/dependencies.md` | Filter, Passphrase and Popover rows now list `@floating-ui/react` | React |

Generated metadata (`kit.schema.json`, `_playground.json`) hasn't been regenerated for the POC.

### React: `pb_popover/_popover.tsx`

- Replaces `Manager`/`Reference`/`Popper` with a single `useFloating({ placement, strategy, middleware, open: show, whileElementsMounted: autoUpdate })` call in `PbReactPopover`.
- Passes `refs.setFloating`, `floatingStyles` and the resolved placement to the inner `Popover`. `refs.setReference` goes on the existing `#reference-{id}` wrapper span. When `referenceElement` is passed, it's used through `elements.reference`.
- `buildMiddleware` translates legacy Popper modifiers and `auto*` placements into floating-ui middleware, under the [contract below](#legacy-modifiers-contract-react).
- `appendTo`, portals, `closeOnClick`, the Dialog/Fullscreen floating-root handling, class names and the DOM structure are unchanged.

### Rails: `pb_popover/index.ts`, `pb_filter/index.ts` and `utilities/autoPositionFixed.ts`

- Both kits call `autoPositionFixed(reference, floating, { placement, middleware })`. It runs `computePosition` from `@floating-ui/dom` under `autoUpdate`, with `strategy: 'fixed'`. It writes the same DOM output Popper did:
  - `left`/`top` rounded to the device pixel, matching Popper's `roundOffsetsByDPR`
  - `margin: 0` inline
  - `data-popper-placement`
- It also listens to `visualViewport` scroll and resize (pinch-zoom, mobile keyboard), which `autoUpdate` doesn't. That keeps the behavior of the `subscribeFloatingKitReposition` subscription the Popover had before.
- Positioning **only runs while the popover is open**. It starts on open (or in `connect` if already open) and stops on close and `disconnect`. Popper kept scroll and resize listeners running for every popover for the whole page lifetime.
- Unchanged: the `pb:popover:open` / `pb:popover:close` events, the `show` / `hide` classes, the tooltip and trigger IDs, and the `append_to` move.
- The `show` class goes on just before the position is computed, so for a moment the tooltip still has its last coordinates. This isn't visible: the new position is applied before the first frame is drawn. A measured reopen after a 150px scroll showed the old spot right after the class change and the correct spot at the first animation frame.

## Compatibility contract

### React props

| Prop | Before (react-popper) | After (floating-ui) | Known differences |
|---|---|---|---|
| `show`, `reference`, `shouldClosePopover`, `closeOnClick`, `appendTo`, `usePortal`, `id`, `className`, `aria`, `data`, `htmlOptions` | Playbook logic | Unchanged | None |
| Global props (`zIndex` including strings, sizing, spacing) | Playbook logic | Unchanged | None |
| `placement` (12 standard values) | Popper placement | floating-ui placement, same names | None |
| `placement` `auto` / `auto-start` / `auto-end` | Popper auto placement (computed inside `flip`) | `autoPlacement({ alignment })`, without `flip` | **Not proven equivalent**: both choose the side with the most room, but tie-breaking and the case where no side fits may differ. React release gate. |
| `offset` (boolean) | Appended a Popper `offset: [0, 20]` modifier | `offset(20)` | When both `offset` and an offset modifier are passed, the modifier now wins. Popper merged modifiers by name, so the 20px won. No audited call site passes both. |
| `referenceElement` | Popper reference | `elements.reference` | None |
| `strategy` | **No effect** (never passed to Popper) | Passed to `useFloating` | It now works. Default `absolute`, so nothing changes unless a consumer was passing a value that did nothing before. |
| `portal` | No effect | No effect | None |
| `modifiers` | Any Popper modifier | Translated subset; see below | Deprecated |
| `onFirstUpdate`, `innerRef` | Accepted by the types; had no effect | Removed from the types | TypeScript error if passed. No audited app passes them. |
| Inline style on the popover | `position:absolute; inset:0 auto auto 0; transform: translate3d(…)` | `position:absolute; left:0; top:0; transform: translate(…)` | Consumer CSS that relied on Popper writing `right`/`bottom` (via `inset`) behaves differently. See Runway's `.reviewerPopover`. |

### Legacy `modifiers` contract (React)

The translation is a deprecation bridge, not general Popper compatibility. Only what's listed here is supported:

| Modifier | Supported options | floating-ui result |
|---|---|---|
| `offset` | `offset` as `[skidding, distance]`, a function returning that, or a number | `offset({ crossAxis: skidding, mainAxis: distance })`. A function is called with `{ placement, popper, reference }` like Popper's. A number becomes the distance. |
| `flip` | `fallbackPlacements`, `padding`, `flipVariations: false` | `flip({ fallbackStrategy: "initialPlacement", fallbackPlacements, padding, flipAlignment: false })` |
| `flip` (with an `auto*` placement) | `allowedAutoPlacements`, `flipVariations`, `padding` | `autoPlacement({ allowedPlacements, autoAlignment, padding })` |
| `preventOverflow` | `padding`, `altAxis` | `shift({ padding, crossAxis: altAxis })` |
| Any of the above | `enabled: false` or `"false"` | That middleware is dropped |

Everything else is **ignored**:
- Other modifier names, such as `arrow`, `computeStyles`, `eventListeners`, `hide` or custom modifiers.
- Other options on supported modifiers. For example, Popper's `boundary: "clippingParents"` and `rootBoundary` use values that floating-ui doesn't share.
- `phase`, `requires` and `fn`.

**Behavior today:** unsupported names and options are dropped silently. **Before the React release:** log a dev-mode warning naming each ignored modifier or option, plus a deprecation warning whenever `modifiers` is passed. Neither throws an error.

**Verified equivalences:**
- **Offset direction:** checked against Popper's source (`distanceAndSkiddingToXY`). Both libraries flip the distance for `top`/`left` placements and leave skidding alone. The one difference is right-to-left layouts: floating-ui reverses `crossAxis` for top and bottom placements, and Popper didn't. Playbook Popover has no right-to-left handling.
- **Middleware order:** offset → flip → shift, the same order Popper requires (offset → flip → preventOverflow).

Type: `PopperLikeModifier` accepts the shapes apps pass today: `enabled` as a string, extra keys such as `phase`, and untyped `options`.

### Rails props and DOM output

| | Before (Popper) | After (floating-ui) |
|---|---|---|
| `position` (12 values), boolean `offset` (20px), `append_to`, `close_on_click`, `trigger_element_id`, `tooltip_id`, `z_index`, sizing | — | Unchanged |
| Events, classes, IDs | `pb:popover:open/close`, `show`/`hide` | Unchanged |
| `data-popper-placement` | Written | Written |
| Inline style | `position:fixed; inset:0 auto auto 0; margin:0; transform: translate3d(…)`, rounded to device pixels | `position:fixed; margin:0; left:…; top:…`, rounded to device pixels |
| Reposition triggers | Scroll and resize, always on; plus `visualViewport` (from PLAY-3055) | `autoUpdate` (scroll, resize, element resize, layout shift) and `visualViewport`, only while open |
| Before first open | Positioned immediately | Hidden at its static spot until first opened (not visible or clickable) |

Rails `position` only accepts the 12 standard values, so `auto*` doesn't apply to Rails.

### Flip fallback

When neither side has room, floating-ui's default (`bestFit`) behaves differently from Popper. In the "Filter interactive" React example, Popper kept `bottom-start` and overflowed the bottom of the screen, while `bestFit` flipped to `top-start` and overflowed the top. Both React and Rails use `initialPlacement` to match Popper.

## Consumer audits

We audited four consuming apps: Nitro, Tempo (pinned to 18.2.0), Runway (pinned to 18.3.0-alpha; the audit read Runway's code, not the installed kit) and Connect-Web (React only, on 16.0.0).

### Rails

| App | `pb_rails("popover")` use | Findings |
|---|---|---|
| Nitro | ~152 call sites | Documented props only (`trigger_element_id`, `tooltip_id`, `position`, `close_on_click`, boolean `offset`, `append_to`, sizing, `z_index`, padding). |
| Tempo | 4 call sites | Documented props only, all `position: "bottom"`. No JS reaches into the element's `.popper` instance. |
| Runway | None directly; 6 Filter components | `active_sprint/index.js` listens for `pb:popover:open`, checks `.show` on `#filter-formbacklogs-show-search`, and avoids replacing the filter's markup during live refresh. `active_sprint_live_refresh_spec.rb` checks the filter panel sits just below its trigger, allowing for pixel rounding. |
| Connect-Web | None (React only) | — |

The POC keeps everything Runway relies on: the event, the `.show` class, the element IDs, device-pixel rounding, and the panel's position below the trigger. Runway avoided replacing the filter markup so the Popper instance stayed attached; the POC has no instance to lose, and `connect` restarts positioning if the popover is already open. Runway's spec and live refresh are still a release gate, because the audit read Runway's code but didn't run it against the POC.

### React

Across the four apps, about 190 `PbReactPopover` files use Playbook props only: `show`, `reference`, `referenceElement`, `placement`, `closeOnClick`, `shouldClosePopover`, boolean `offset`, `appendTo`, `usePortal`, `zIndex` (including string values like `"999"`), `className`, `id`, and spacing props. The POC keeps all of these working. No app passes `onFirstUpdate`, `innerRef` or `strategy`, and no app imports `react-popper` or `@popperjs/core` for these kits.

These call sites go beyond the documented kit props:

| App | Call site | Popper usage | With the POC |
|---|---|---|---|
| Nitro | `installation_scheduler/.../Crews/MoveUpButton` | `flip` with `fallbackPlacements: ["left", "right-start", "left-start", "top"]` | ✅ Passed through. In the browser, with no room below, it opened `left`, the first fallback. |
| Nitro | `installation_scheduler/.../AppointmentSelect` | `offset: [-10, 0]` | ✅ Translated to `crossAxis: -10`. |
| Nitro | `nitro_maps/.../MapLayersPopover` (shared by the map layer popovers) | `offset: [0, 8]` | ✅ Translated to `mainAxis: 8`. |
| Nitro | `nitro_maps/.../ThemeSwitcher` | `offset: [0, 8]` | ✅ Translated. |
| Tempo | `CommunicationsFilters.tsx` (3 popovers: type, user and date filters) | `offset: [0, 4]` with `phase: "main"`, to shrink the 20px default gap | ✅ Translated; `phase` is ignored. In the browser: 4px gap. |
| Runway | `SprintOverview` | `placement={isMobile ? "auto-start" : "right"}` | ⚠️ Mapped to `autoPlacement({ alignment: "start" })`. Without the mapping it was a TypeScript error and was pinned to the trigger's top-left at runtime. Equivalence with Popper isn't proven (React release gate). |
| Nitro | `territory_maps/.../TestTools` | `placement="left-top"` (typo, not a real placement) | Already invalid with Popper; both libraries treat it as plain `left`. Fix the typo in Nitro. |
| Nitro | `leave/.../PopoverEllipsisButton` | Types `placement` as `string`, comments link to Popper docs | No runtime effect. |

**Types.** Before the POC, `PbPopoverProps` extended `Omit<PopperProps, 'children'>`, so TypeScript accepted every Popper prop. Only `modifiers`, `placement` and `referenceElement` reached `<Popper>`. The modifier shapes Nitro and Tempo pass today compile against `PopperLikeModifier`, and a type-checked test covers both.

**CSS that depends on Popper's inline styles.** These won't break an API, but they could change how a popover looks:

| App | Selector | Risk |
|---|---|---|
| Runway | `FlightControl/columns/style.scss` `.reviewerPopover`: `right: 150px` on `[class^=pb_popover]` | **Medium-high.** Popper wrote `right: auto` inline (through `inset`), which cancelled this rule. floating-ui writes only `left`/`top`, so `right: 150px` now applies and may stretch or shift the popover. Expect to adjust this rule. |
| Runway | `BigBoardApp/Popovers/styles.scss` `.popoverAdjustment` (AdditionPopover): forces `inset`, `transform: translate3d(...)` and `position: fixed` with `!important` | Medium. Its `!important` rules still beat floating-ui's inline styles, so it probably behaves the same. It's the most fragile override. |
| Runway | `CloneItemsButton/styles.scss` `.customBacklogPopover`: `margin-top`, width, padding with `!important` | Low. Neither library writes these on React. |
| Connect-Web | `.room-popover-modal-position { margin-top: 15px }`, `.menu-popover` margins, `#popover-notification-preferences { padding-right: 93px }` | Low. React Popper didn't write margin or padding inline, and neither does floating-ui. |
| Runway, Connect-Web | `z-index` on `.pb_popover_kit`; `.pb_popover_body`, `.pb_popover_kit.p_none.pb_filter_sort_menu`; Cypress selects `.pb_popover_body` | None. Class names and structure are unchanged. |

**Dependencies in consuming apps.** Nitro, Tempo and Connect-Web don't depend on `@popperjs/core` themselves. When Playbook stops shipping it, nothing breaks for them. Runway lists `react-popper` in its `package.json` but never imports it, so it can be removed there. Runway's `popper.js` 1.x (for Bootstrap 4) and `@popperjs/core` (likely for react-bootstrap) aren't related to Playbook and stay.

### React options considered

| Option | What it means | Consumer work |
|---|---|---|
| **A. Non-breaking (recommended)** | Keep the modifier translation as a deprecation bridge (done in the POC). Add a numeric `offset` prop and dev-mode warnings. Remove `modifiers` in the next major. | None to upgrade. Before the major: move the Nitro (×3) and Tempo (×3) offset overrides to `offset={n}`, and move Nitro's `MoveUpButton` off `modifiers`. |
| B. Breaking (`!` release) | Drop `modifiers` and `auto*` placements now. | Coordinated updates in Nitro (4 sites), Tempo (3) and Runway (1) before they upgrade. |

## Release plan and gates

### Release 1: Rails Popover and Rails Filter

**Scope:** `utilities/autoPositionFixed.ts` (+ test), `pb_popover/index.ts`, `pb_filter/index.ts`. Keep `@popperjs/core` and `react-popper` installed. Changelog: internal change, no consumer action needed.

**Gate (all must pass before release):**
- [ ] Jest, lint and `check:external-deps` pass.
- [ ] Rails docs pages pass a manual check: Popover, Filter (including chips and `append_to: "parent"`), Table, Passphrase, Rich Text Editor, plus Dropdown, Multi Level Select, Date Picker, Time Picker and Typeahead inside a Rails Popover.
- [ ] Smoke test in Chrome, Safari, Firefox and iOS Safari: open, scroll, flip near an edge, and close one Rails Popover and one Filter. On iOS Safari, also pinch-zoom with the popover open.
- [ ] Popover shows `data-popper-placement` and `margin: 0` (already confirmed on the docs site).
- [ ] Runway: `active_sprint_live_refresh_spec.rb` passes against the release candidate, and live refresh on the active sprint page keeps the filter popover working.
- [ ] At least one real Turbo navigation in a consuming app opens and positions a Rails Popover. On the docs site this was only simulated (no Turbo loaded).

### Release 2: React Popover, and Popper removed

**Scope:** `_popover.tsx` (+ `buildMiddleware.test.ts`), package and lockfile removal, `build-ai-dist.mjs`, `dependencies.md`, regenerated metadata. Changelog: Popper removed; `modifiers` deprecated; `@popperjs/core` no longer shipped as a transitive dependency.

**Gate (all must pass before release):**
- [ ] Numeric `offset` prop added, with tests and docs.
- [ ] Dev-mode warnings for `modifiers` (deprecation) and for ignored modifiers or options, with tests.
- [ ] `auto`, `auto-start` and `auto-end` verified in the browser against the Popper version: plenty of room, a constrained container, nested scrolling containers, and no side fits. Differences documented or fixed.
- [ ] Runway `SprintOverview` checked on a phone.
- [ ] Nitro `MoveUpButton` and one offset override checked in the app.
- [ ] Runway `.reviewerPopover` and `.popoverAdjustment` checked visually and adjusted if needed.
- [ ] React docs pages pass a manual check (Popover, Filter, Table, Advanced Table, Passphrase, Rich Text Editor), including inside Dialog and Fullscreen.
- [ ] Smoke test in Chrome, Safari, Firefox and iOS Safari.
- [ ] `yarn generate:docs-metadata` run and the output reviewed.

### Rollback

- **Rails release:** revert the two kit files and the utility. No package or API changes, so it can be reverted on its own at any time.
- **React release:** revert `_popover.tsx` and restore the two packages. The revert doesn't touch the Rails release.
- **Consumers** that hit a regression can pin the previous Playbook version while it's fixed. floating-ui already ships for Tooltip, so neither release adds a dependency a consumer would have to remove.

## Bundle and build

Both sides were built with `npx vite build` into a clean `dist/`, for the full migration (Rails and React).

| | Before | After | Δ |
|---|---|---|---|
| All dist JS (excluding `dist/ai`) | 2,627,464 B / 636,818 B gz | 2,577,825 B / 626,357 B gz | **−49.6 KB / −10.5 KB gz** |
| `chunks/lib-*.js` | 305,358 / 77,132 gz | 263,735 / 67,530 gz | −41.6 KB / −9.6 KB gz |
| `playbook-rails.js` | 236,171 / 50,748 gz | 236,494 / 50,862 gz | +0.3 KB (floating-ui DOM code moves in) |
| Chunks containing Popper code | `lib` | none | — |

- The Rails release on its own won't show much saving, because Popper stays in the shared `lib` chunk until the React release. Measure each PR on its own.
- `@floating-ui/dom` is already in `dependencies` and `@floating-ui/react` is a bundled devDependency (installed: 1.6.12 and 0.26.28), so nothing new gets installed.
- **Packages removed in the POC:** `@popperjs/core` (from `dependencies`) and `react-popper` (from `devDependencies`). `yarn install` dropped four lockfile entries: `@popperjs/core`, `react-popper`, `react-fast-compare`, and the `warning@^4.0.2` range (`warning@^4.0.3` stays for other packages). Before the removal, `yarn why` showed nothing else in the workspace depended on either package.
- **Local dev after pulling this branch:** run `yarn install`, delete `playbook-website/node_modules/.vite`, and restart Vite. Vite's cache still held pre-bundled copies of `react-popper` and `@popperjs/core` until it was cleared.
- `yarn check:external-deps` needs no change: nothing loads from a CDN or remote host.
- Watch-out when measuring: `vite build` writes `../dist` and does **not** empty it, so stale chunks pile up. Run `rm -rf dist` before builds you want to compare.

## Testing

### Automated

- Full Jest suite: **160 suites, 2,300 tests passing**, with the packages removed.
- `pb_popover/buildMiddleware.test.ts` (11 tests): every row of the modifier contract, each `auto*` placement, and the Tempo and Nitro modifier shapes. The file is type-checked, so it also confirms those shapes compile.
- `utilities/autoPositionFixed.test.ts` (3 tests): `position: fixed`, `margin: 0`, device-pixel rounding at 1× and 2×, `data-popper-placement`, and `visualViewport` subscribe/unsubscribe.
- A clean `vite build` succeeds with no Popper code in `dist`. ESLint: 0 errors. `tsc`: no errors in Popover, Filter, Passphrase, Table, Advanced Table or Rich Text Editor files.
- jsdom has no layout, so Jest checks behavior (open/close, close-on-click, portals, DOM output), not positioning. Playbook has no browser-level test setup; see [Follow-up stories](#follow-up-stories).

### Manual (local docs site, Rails + Vite, Chromium)

Two passes:

- **Scripted:** for each trigger, a script clicked it and measured the trigger and popover positions. It checked placement, offset, flipping near edges, following the `.layout_body` scroll container, and every way of closing (toggle, outside, inside, any).
- **Maintainer:** a manual pass on localhost in a visible browser with the packages removed. No issues found.

| Page | Result |
|---|---|
| `/kits/popover/react`: all 22 examples, every placement | ✅ Correct placement, 20px offset, flips at edges (`right-end` → `left-end` in a narrow viewport). closeOnClick inside/outside/any correct. Follows scroll. |
| `/kits/popover/rails`: all 22 examples, every `position`, `append_to` parent/selector, z-index | ✅ Same as React. Tooltip moves to `body` or the `append_to` target as before. `data-popper-placement`, `margin: 0` and half-pixel rounding at 2× confirmed. |
| `/kits/filter/react`: 29 popovers (single, double, sort menu, placement, popoverProps, max width/height, interactive chips) | ✅ Matched a side-by-side run on the original react-popper code for every example. The one difference, the flip-fallback case, is fixed with `initialPlacement`. |
| `/kits/filter/rails`: 26 popovers + 4 interactive chips (select, dropdown, dropdown, date picker) | ✅ Filter popover opens below the trigger and flips above when there isn't room. Chips sit 8px below and follow scroll. Flatpickr calendar renders. Picking an option updates the chip and auto-submits the form. Outside click closes. |
| `/kits/filter/rails` "Within Turbo Frames" (`append_to: "parent"`) | ✅ Opens below its trigger. With the popover open, the example's markup was replaced the way a Turbo Frame render does it. The old instance cleaned up (one tooltip left in the DOM), and the new one opened in the same spot and followed scrolling. Simulated: the docs site doesn't load Turbo. |
| `/kits/passphrase/react` and `/rails` | ✅ Tips popover opens to the right and closes. Triggers in the `showTipsBelow` examples are hidden at desktop width, as intended. |
| `/kits/table/react` and `/rails` (sort and filter header) | ✅ |
| `/kits/advanced_table/react` (column visibility ×5, grouped headers sort, filter) | ✅ Column-visibility checkboxes keep the popover open. Flips to `top-end` near the bottom. |
| `/kits/rich_text_editor/react` and `/rails` (block-style and "more" dropdowns) | ✅ |
| Temporary React example: `auto-start`, Nitro-style `fallbackPlacements`, function offset, Tempo-style `[0, 4]` | ✅ `auto-start` opened `top-start` aligned to its trigger. The fallback list opened `left` with no room below. The function offset gave a 30px gap and 10px shift. Tempo's override gave a 4px gap. `auto-start` choosing the bottom side wasn't seen, because the example couldn't be scrolled near the top. |

### Kits inside a Rails Popover (PLAY-3055 shared portal logic)

No docs example puts these kits inside a Rails Popover, so a temporary one was added and then removed. It had a `close_on_click: "outside"` Rails Popover containing Dropdown, Multi Level Select, Date Picker, Time Picker and Typeahead. Typeahead used `is_multi: false` to get the react-select version that PLAY-3055 covers.

The same script ran on the original Popper code and on the POC. It opened each nested menu with the trigger placed high and then mid-screen, scrolled 60px, and closed with an outside click.

| Kit | POC result | Compared with original Popper code |
|---|---|---|
| Dropdown | ✅ Menu 5px below its trigger, left-aligned. Moves with the popover on scroll. Closes with the popover. | Same |
| Multi Level Select | ✅ Menu 16px below the input. Checking an option keeps the popover open, and the popover grows with the new pill. Moves on scroll. Closes with the popover. | Same (15px vs 16px is rounding) |
| Date Picker | ✅ Calendar opens below the input when there's room and above when there isn't. Moves on scroll. Closes with the popover. | Above-the-input case is the same. Below-the-input case: the POC places the calendar 5px below the input, while the original overlapped the input by 15px. In the above-the-input case the calendar moved 40px during a 60px scroll (60px on the original); check during the release gate. |
| Time Picker | ✅ Panel 5px below the input. Moves on scroll. Closes with the popover. | Same |
| Typeahead (react-select) | ✅ Menu opens directly below the input and extends past the popover's edge. Choosing an option keeps the popover open. Moves on scroll. Outside click closes both. | Only run on the POC |

The script's first version reported that the Date Picker calendar stayed open. It did the same on the original code: a synthetic `click()` doesn't fire flatpickr's close listener. With realistic pointer events (`pointerdown`, `mousedown`, `mouseup`, `click`), the calendar closes along with the popover.

These results predate `autoPositionFixed`. The helper keeps the same positioning and only changes rounding, `margin` and the placement attribute, and the Rails Popover and Filter checks were repeated after it.

### Not covered yet

- **Browsers:** Safari, Firefox, mobile and iOS Safari. Positioning interacts with layout, transforms, stacking contexts, zoom and scrolling, which is where a Chromium-only pass can give false confidence. Both release gates include a smoke test.
- **Pinch-zoom:** the `visualViewport` listener is restored, but the behavior hasn't been checked on a device.
- **Real Turbo navigation:** simulated only.
- **`auto*` in constrained and nested scroll containers:** React release gate.
- **React side of PLAY-3055** (React Dropdown, Select and Typeahead inside a React Popover, Dialog or Fullscreen): covered only by the maintainer pass.
- The scripted pass ran in a hidden browser pane at about 1024×600 to 1024×768.

### Existing issue found along the way (not caused by this change)

- **Filter "Max Width" / "Max Height" React examples:** the popover wrapper stretches to the full viewport width with both Popper and floating-ui. This is a CSS issue, not a positioning one.

## Follow-up stories

1. **Rails release** (see [gate](#release-1-rails-popover-and-rails-filter)).
2. **React release** (see [gate](#release-2-react-popover-and-popper-removed)): numeric `offset`, dev-mode warnings, `auto*` verification, package removal and metadata.
3. **Browser-level positioning tests.** Set up a browser test runner and cover `auto*`, fallback placements, nested scroll containers, viewport changes and transformed ancestors. Until then, the release gates use manual checklists.
4. **Consumer clean-up before the next major (Option A):** Nitro's 3 and Tempo's 3 offset overrides move to `offset={n}`. Nitro's `MoveUpButton` moves off `modifiers`. Nitro's `left-top` typo gets fixed. Runway drops its unused `react-popper` dependency. Then remove `modifiers` in the major.
5. **Deferred.** These are out of scope for moving Popover off Popper, not blocked:
   - **Fold Rails Tooltip into `autoPositionFixed`.** Tooltip already uses floating-ui, so this removes duplication but changes no dependency. It would also change Tooltip's own output: device-pixel rounding, `margin: 0` and the `visualViewport` listener. The helper would need a hook for Tooltip's arrow, which is positioned from `middlewareData.arrow`. That makes it a Tooltip change that needs its own testing.
   - **Use floating-ui's `useClick`/`useDismiss` in React** in place of the hand-rolled `closeOnClick` listener. It changes open/close behavior, not positioning, and has to keep the PLAY-3055 rules for menus that render outside the popover. That's riskier than this migration needs.
   - **Switch flip from `initialPlacement` to `bestFit`.** A deliberate behavior change: popovers would open on a different side when neither side fits. Keeping Popper's behavior keeps both releases free of visible changes.
6. **Separate bug:** the Filter max-width popover stretching.

## Repro

```bash
# from playbook/
npx jest app/pb_kits/playbook/pb_popover app/pb_kits/playbook/pb_filter app/pb_kits/playbook/utilities/autoPositionFixed
```

```bash
# bundle comparison (clean dist each time)
rm -rf dist && npx vite build
```

```bash
# docs site
yarn start-dev
```
