The `sortParentOnly` prop is a boolean set to `false` by default. When set to `true`, only parent (depth-0) rows are re-ordered when sorting; children and grandchildren stay grouped under their parent and keep their original order.

`sortParentOnly` works with every sorting mode: `enableSorting` on the header, per-column `enableSort: true`, and sortable leaf columns in the multi-header variant. Sort indicators behave as usual.

When omitted or `false`, sorting applies to all levels.
