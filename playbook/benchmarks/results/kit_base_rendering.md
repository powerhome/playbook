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
