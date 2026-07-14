# PromtBuilderRecipes

This folder is the central home for Prompt Builder recipes, patterns, and prompt-facing guidelines.

Use central recipes for screen-level intent:

- Settings pages
- Forms
- Dashboards
- Tables
- Empty states
- Profiles

Use kit playground configs for kit-level capability:

- Available props
- Valid prop values
- Children support
- Structure modes
- Data presets

The Prompt Builder should compose from these recipes, then let `promptCompiler.ts` validate the result against the real playground kit definitions. That keeps prompts fast and flexible while still only building UI that the kit code can actually support.

Add new files in `recipes/` when a prompt describes a reusable screen pattern. Add aliases in `aliases.ts` when a prompt directly names a kit or common synonym.

## Table With Filter

When building a table or advanced table with a filter:

- Wrap the filter and table in a Card.
- Set the Card padding to `none`.
- Set Filter background to `false`.
- Place a SectionSeparator between the Filter and the table.
- Set Table `container` to `false`.
- For AdvancedTable, set `tableProps.container` to `false`.
