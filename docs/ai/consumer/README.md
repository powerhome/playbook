# Playbook AI consumer templates

Copy these into apps that consume `playbook-ui` as agent rules/skills. They are not applied anywhere automatically.

| File | Purpose |
|------|---------|
| `playbook-ui.mdc` | Rule: Playbook-first for any UI prompt; point at `dist/ai` |
| `playbook-ui-generation.SKILL.md` | Skill: metadata workflow + prompt/screenshot paths |

Playbook publishes metadata under `node_modules/playbook-ui/dist/ai/` on package release (`yarn build:ai` / `yarn generate:docs-metadata`). Screen-level prompt recipes are intentionally **not** in this package yet — enforce Playbook-first via these rules until recipes live elsewhere.
