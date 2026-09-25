---
name: docs-metadata
description: >-
  Regenerate Playbook docs/AI metadata (kit schemas, global props, playgrounds,
  dist/ai). Use when kit props, global props, tokens, playground overrides, or
  visual cues change, or when pre-commit fails on out-of-sync docs metadata.
disable-model-invocation: true
---

# Docs / AI metadata regeneration

## When to use

- Changed kit React/Rails props
- Changed `globalProps.ts`, `types/*.ts`, spacing/breakpoint tokens
- Changed `_playground.overrides.json` or `visual-cues.mjs`
- Husky reports docs metadata out of sync

## Command (preferred)

From **repo root**:

```bash
yarn generate:docs-metadata
```

This runs schemas → global props values → playground configs → `playbook/dist/ai`.

## Do not hand-edit

- `kit.schema.json`, `_playground.json`, `global-props.schema.json`
- `globalPropsValues.ts`
- Anything under `playbook/dist/ai/`

## Pre-commit failure

If verify fails after generate:

```bash
git add playbook/app/pb_kits/playbook/*/kit.schema.json
git add playbook/app/pb_kits/playbook/*/docs/_playground.json
git add playbook/app/pb_kits/playbook/utilities/global-props.schema.json
git add playbook-website/app/javascript/components/Website/src/components/AvailableProps/globalPropsValues.ts
```

(Also stage any other regenerated files the script touched, then commit again.)

## Narrower commands (from `playbook/`)

| Need | Command |
|------|---------|
| One kit schema | `yarn generate:ai-metadata --kit=<name>` |
| Global props schema only | `yarn generate:global-props-metadata` |
| One playground | `yarn generate:playground-configs --kit=<name> --overwrite` |
| dist/ai only | `yarn build:ai` |
| Schemas + dist | `yarn build:ai:full` |

## Visual cues

Edit `playbook/scripts/lib/visual-cues.mjs`, then regenerate (`yarn generate:docs-metadata` or `yarn build:ai`). Confirm under `playbook/dist/ai/visual-index.json`.

## Reference

- `docs/AI_METADATA.md`
- Hook: `.git-hooks/pre_commit/verify_docs_metadata.sh`
- Script: `scripts/generate-docs-metadata.sh`
