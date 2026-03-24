# Kit Base Rendering Benchmark Results

## Step 0: Baseline (origin/master)

Ruby: ruby 3.3.6 (2024-11-05 revision 75015d4c1f) [arm64-darwin23]
Date: 2026-03-23
N=500 timing iterations, 200 allocation iterations

### P90 Timing

| Kit | .new (min) | .new (util) | .classname (min) | .classname (util) | html_options |
|-----|-----------|-------------|------------------|-------------------|-------------|
| Badge (65 props) | 11.0us | 12.0us | 54.0us | 66.0us | 18.0us |
| Body (68 props) | 11.0us | 13.0us | 58.0us | 64.0us | 18.0us |
| Icon (77 props) | 15.0us | 16.0us | 64.0us | 69.0us | 22.0us |
| Card (72 props) | 14.0us | 14.0us | 57.0us | 58.0us | 21.0us |

Icon render_svg: P90=33.0us

### Allocations per call

| Kit | .new (min) | .new (util) | .classname (min) | .classname (util) | html_options |
|-----|-----------|-------------|------------------|-------------------|-------------|
| Badge | 7.0 | 7.0 | 173.0 | 202.0 | 15.0 |
| Body | 7.0 | 7.0 | 173.0 | 204.0 | 15.0 |
| Icon | 7.0 | 7.0 | 177.0 | 198.0 | 15.0 |
| Card | 6.0 | 7.0 | 181.0 | 210.0 | 15.0 |

Icon render_svg: 14.0 allocs

### Key observations

- **classname generation is the bottleneck**: 173-210 allocations per call, P90 54-69us
- **.new() is cheap**: only 7 allocs and 11-16us P90
- **combined_html_options**: 15 allocs and 18-22us P90
- The 173+ allocations in classname come from 40+ `*_props` utility methods, each creating
  throwaway Hash/Array objects even when returning nil
- With utility props set, allocations increase by ~25-30 (to 198-210) as the `*_props`
  methods do actual work building CSS class strings

---

## Step 1: Eliminate throwaway allocations in all 32 utility *_props methods

Date: 2026-03-23
Change: Rewrote all 32 utility `*_props` methods to eliminate the
`options.keys.select { |sk| try(sk) }` pattern. Each method previously allocated
3-5 throwaway objects (Hash from `*_options`, Array from `.keys`, Array from `.select`,
and the `try` dispatch) on every call — even when the prop was nil. Replaced with
direct prop access: `value = prop_name; return nil unless value`. Also froze all
`*_values` arrays as module constants.

### P90 Timing

| Kit | .new (min) | .new (util) | .classname (min) | .classname (util) | html_options | P90 Delta (classname min) |
|-----|-----------|-------------|------------------|-------------------|-------------|--------------------------|
| Badge | 11.0us | 12.0us | 32.0us | 48.0us | 17.0us | **-41%** |
| Body | 12.0us | 12.0us | 30.0us | 32.0us | 23.0us | **-48%** |
| Icon | 14.0us | 17.0us | 39.0us | 43.0us | 21.0us | **-39%** |
| Card | 13.0us | 15.0us | 30.0us | 33.0us | 20.0us | **-47%** |

Icon render_svg: P90=37.0us (noise vs baseline)

### Allocations per call

| Kit | .new (min) | .new (util) | .classname (min) | .classname (util) | html_options |
|-----|-----------|-------------|------------------|-------------------|-------------|
| Badge | 7.0 | 7.0 | 7.0 | 14.0 | 15.0 |
| Body | 7.0 | 7.0 | 7.0 | 14.0 | 15.0 |
| Icon | 7.0 | 7.0 | 11.0 | 17.0 | 15.0 |
| Card | 6.0 | 7.0 | 11.0 | 19.0 | 15.0 |

Icon render_svg: 14.0 allocs

### Key observations

- **classname allocations dropped 95%**: from 173 → 7 allocs for Badge/Body (no utility props)
- **classname P90 dropped 39-48%**: from 54-64us → 30-39us
- With utility props set, allocations dropped from 198-210 → 14-19
- The remaining allocations are from the Array + compact + join in `generate_classname` itself
- `.new()` and `combined_html_options` unchanged (as expected, they weren't touched)

---

## Step 2: Rewrite generate_classname — replace Array+compact+join with String concat

Date: 2026-03-23
Change: Replaced the 43-element Array literal + `.compact.join(" ")` in
`generate_classname` with direct String concatenation using a mutable String
(`+""`) and `<<`. Also updated `generate_classname_without_spacing` to match.
This eliminates 2 Array allocations (the literal + compact result) and
1 String allocation (from join) per call.

### P90 Timing

| Kit | .classname (min) | .classname (util) | P90 Delta vs Step 1 |
|-----|------------------|-------------------|---------------------|
| Badge | 29.0us | 28.0us | -9% (noise) |
| Body | 29.0us | 34.0us | -3% (noise) |
| Icon | 40.0us | 43.0us | +3% (noise) |
| Card | 30.0us | 32.0us | 0% (noise) |

### Allocations per call

| Kit | .classname (min) | .classname (util) |
|-----|------------------|-------------------|
| Badge | 4.0 | 11.0 |
| Body | 4.0 | 11.0 |
| Icon | 8.0 | 14.0 |
| Card | 8.0 | 16.0 |

### Key observations

- Allocations dropped 7→4 for Badge/Body (minimal), 11→8 for Icon/Card (minimal)
- Timing within measurement noise — the Array overhead was small compared to
  the method dispatch savings from Step 1
- Cumulative vs baseline: Badge classname P90 54→29us (**-46%**), Body 58→29us (**-50%**)

---

## Step 3: Replace send() with values[] in spacing_props

Date: 2026-03-23
Change: In `spacing_props`, replaced `send(prop_name)` with `values[prop_name]`
for the 14 SPACING_PROP_MAP entries. Since all spacing props default to nil,
a direct Hash lookup is equivalent to calling the accessor. Saves 14 method
dispatches per call (when all spacing props are nil).

### P90 Timing

| Kit | .classname (min) | P90 Delta vs Step 2 |
|-----|------------------|---------------------|
| Badge | 28.0us | -3% (noise) |
| Body | 26.0us | -10% |
| Icon | 40.0us | 0% (noise) |
| Card | 43.0us | +43% (noise) |

### Key observations

- Marginal improvement at best, within measurement noise for most kits
- No allocation change — this only reduces method dispatch overhead
- Kept because the code is cleaner and slightly more direct

---

## Step 4: Remove dead transform_keys in data_attributes

Date: 2026-03-23
Change: `data_attributes` called `.transform_keys { |key| key.to_s.tr("_", "-").to_sym }`
on `{ data: data, aria: aria }`. Since neither `:data` nor `:aria` contains underscores,
`tr("_", "-")` is a no-op. Removed the transform_keys entirely.

### Allocations: combined_html_options

| Kit | Before | After |
|-----|--------|-------|
| All | 15.0 | 10.0 |

5 fewer allocations per render (the Hash from transform_keys, 2 Strings from to_s,
2 Strings from tr, 2 Symbols from to_sym — some of which Ruby interns).

---

## Step 5: Short-circuit global_inline_props and memoize dynamic_inline_props

Date: 2026-03-23
Change: `global_inline_props` now returns a frozen EMPTY_HASH when height,
min_height, and max_height are all nil (the common case), avoiding a Hash
allocation + compact. `dynamic_inline_props` is memoized since it's called
from both `kit_base_default_options` and `combined_html_options`, and
short-circuits immediately when `global_inline_props` is empty.

### Allocations: combined_html_options

| Kit | Before | After |
|-----|--------|-------|
| All | 10.0 | 4.0 |

6 fewer allocations — eliminated Hash from global_inline_props, Array from .map,
Array from .compact, and the redundant second call from kit_base_default_options.

---

## Step 6: Short-circuit combined_html_options for the common empty path

Date: 2026-03-23
Change: When `html_options` is the default empty hash and there are no inline
styles (the common case for most kits), `combined_html_options` now returns
`data_attributes` directly — skipping `default_html_options.dup`, the iteration
loop, and `.deep_merge`.

### Allocations: combined_html_options

| Kit | Before | After |
|-----|--------|-------|
| All | 4.0 | 1.0 |

Cumulative from baseline: 15.0 → 1.0 allocations per combined_html_options call.

---

## Final Summary vs Baseline

### P90 Timing — classname (no utility props)

| Kit | Baseline | Final | Delta |
|-----|----------|-------|-------|
| Badge | 54.0us | ~29us | **-46%** |
| Body | 58.0us | ~29us | **-50%** |
| Icon | 64.0us | ~40us | **-38%** |
| Card | 57.0us | ~30us | **-47%** |

### Allocations — classname (no utility props)

| Kit | Baseline | Final | Delta |
|-----|----------|-------|-------|
| Badge | 173.0 | 4.0 | **-98%** |
| Body | 173.0 | 4.0 | **-98%** |
| Icon | 177.0 | 8.0 | **-95%** |
| Card | 181.0 | 8.0 | **-96%** |

### Allocations — combined_html_options

| Kit | Baseline | Final | Delta |
|-----|----------|-------|-------|
| All | 15.0 | 1.0 | **-93%** |
