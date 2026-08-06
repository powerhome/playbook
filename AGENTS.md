# Agent instructions — Playbook maintainers

This repository is the **Playbook design system** (kit source + docs website), not a consuming app.

Consumer-facing rule/skill drafts (for apps that import `playbook-ui`) live in [`docs/ai/consumer/`](docs/ai/consumer/) and are **not** applied here.

## Repo layout

| Path | Role |
|------|------|
| `playbook/` | Kit source (React + Rails gem), schemas, playground overrides |
| `playbook-website/` | Docs site, menu.yml, playground UI |
| `docs/` | Contributor docs (AI metadata, playground, global props) |
| `.cursor/rules/` | Cursor project rules (also useful as reference for other agents) |
| `.cursor/skills/` | Cursor project skills for common maintainer workflows |

## Non-negotiables

1. **Know which package you are in** — `playbook/` vs `playbook-website/` vs repo root.
2. **Prefer** `yarn generate:docs-metadata` **from the repo root** after changing kit props, global props, tokens, or playground overrides.
3. **Never hand-edit generated files** — they are overwritten by generate/build and pre-commit:
   - `playbook/app/pb_kits/playbook/pb_*/kit.schema.json`
   - `playbook/app/pb_kits/playbook/pb_*/docs/_playground.json`
   - `playbook/app/pb_kits/playbook/utilities/global-props.schema.json`
   - `playbook-website/.../AvailableProps/globalPropsValues.ts`
   - `playbook/dist/ai/**`
4. **Playground source of truth** is `docs/_playground.overrides.json` per kit — edit that, then regenerate.
5. **Do not install packages** into consuming apps from this repo’s AI guidance; that rule is for consumers. Here, follow normal workspace yarn flows when adding deps intentionally.

## Code change hygiene

| Topic | Rule |
|-------|------|
| Minimal diffs | [`.cursor/rules/minimal-diffs.mdc`](.cursor/rules/minimal-diffs.mdc) — no drive-by formatting; only touch what needs to change |
| Readable code | [`.cursor/rules/readable-code.mdc`](.cursor/rules/readable-code.mdc) — less code, reuse, clear names, performance, no DS regressions |
| Kit conventions | [`.cursor/rules/kit-conventions.mdc`](.cursor/rules/kit-conventions.mdc) — prop naming, `className` last in `classnames()`, required Jest/RSpec |
| PRs / commits | [`.cursor/rules/pr-hygiene.mdc`](.cursor/rules/pr-hygiene.mdc) — tests, playground metadata, labels/semver |

Formatting is **ESLint + RuboCop** (no Prettier). PR expectations: [`.github/PULL_REQUEST_TEMPLATE.md`](.github/PULL_REQUEST_TEMPLATE.md).

## Where to look

| Task | Read first |
|------|------------|
| AI schemas / `dist/ai` | [`docs/AI_METADATA.md`](docs/AI_METADATA.md) |
| Playground overrides | [`docs/PLAYGROUND_CONFIG.md`](docs/PLAYGROUND_CONFIG.md) |
| New global prop | [`docs/ADDING_GLOBAL_PROPS.md`](docs/ADDING_GLOBAL_PROPS.md) |
| Advanced Table docs | [`docs/ADVANCED_TABLE_DOCS.md`](docs/ADVANCED_TABLE_DOCS.md) |
| Deprecation warnings | [`docs/DEPRECATION_WARNINGS.md`](docs/DEPRECATION_WARNINGS.md) |
| Kit status in menu | [`docs/PLATFORM_SPECIFIC_STATUS.md`](docs/PLATFORM_SPECIFIC_STATUS.md) |

## Cursor-specific paths

- Rules: [`.cursor/rules/`](.cursor/rules/)
- Skills: [`.cursor/skills/`](.cursor/skills/)

Other agents: treat this file as the entry point; follow the same docs and the rule/skill content under `.cursor/` even if your tool does not auto-load them.
