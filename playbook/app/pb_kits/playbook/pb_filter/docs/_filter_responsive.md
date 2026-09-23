Use `responsive: "stacked"` (Rails) or `responsive="stacked"` (React) to switch to the two-row layout at viewports `≤767px`, and the one-row layout above that.

When `responsive` is `"stacked"`, it owns the layout: Rails ignores `template` for `default`/`single` chrome, and React ignores `double`. `filter_only` / `sort_only` are unchanged. Narrow viewports also get chip fade/scroll containment so content stays inside the kit.
