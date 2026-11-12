# Playbook PR titles

Use a Conventional Commit title for every Playbook pull request. Playbook uses the PR title as the squash commit subject, so it appears in the Git history.

Start with a lowercase type, followed by an optional scope in parentheses. Add `!` immediately before the colon for a breaking change. Follow the colon with a space and a short description of the change.

- Use `fix` for a bug fix and `feat` for a new feature. The check also accepts `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, and `revert`.
- Use `chore` for dependency updates and `docs` for documentation changes. The [changelog generator](./CHANGELOG_GENERATOR.md#changelog-categories) uses the title to group entries.
- Use the kit or area as the scope when it helps, such as `table` or `date-picker`.
- If the PR has a Runway story, put its key in brackets at the end of the title. A Runway key is optional.

## Titles that pass

```text
fix(table): Fix sticky column widths
feat(date-picker): Add a clear button [PLAY-1234]
docs: Update the installation guide
feat(button)!: Remove the legacy size prop [PLAY-5678]
```

## Titles that fail

```text
[PLAY-1234] Fix sticky column widths
Fix sticky column widths
bug(table): Fix sticky column widths
fix(table):Fix sticky column widths
```

If the **Conventional Commit title** check fails, edit the PR title to rerun it. The [title workflow](../.github/workflows/pr-title.yml) validates the format. Reviewers should confirm that the type and breaking-change marker match the changes in the PR.
