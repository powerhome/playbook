# Playbook AI consumer templates

Copy these into apps that consume `playbook-ui` as agent rules/skills.

| File | Purpose |
|------|---------|
| `playbook-ui-generation.SKILL.md` | Skill: read `dist/ai` schemas + slim playgrounds before generating UI |
| `playbook-ui.mdc` | Rule: prefer Playbook + point agents at `node_modules/playbook-ui/dist/ai/` |

Playbook publishes the metadata under `node_modules/playbook-ui/dist/ai/` on package release (`yarn build:ai` / `yarn generate:docs-metadata`).
