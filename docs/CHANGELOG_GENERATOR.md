# Changelog generator

Both website changelog files are built by `Playbook::ChangelogGenerator` from merged GitHub PRs, grouped by PR title. Run the commands from the **repo root**.

## Auth

Set `CHANGELOG_GITHUB_TOKEN` before you run either command.

## Web: `make changelog`

```bash
make changelog
```

Equivalent rake task: `changelog`.

**Writes** `playbook/CHANGELOG.md` (the Web tab on `/changelog`).

- Uses `Playbook::VERSION` and `Playbook::PREVIOUS_VERSION` from `playbook/lib/playbook/version.rb`.
- Fetches PRs merged since the previous release tag.
- Groups them by Conventional Commit type and breaking-change marker.
- Prepends one new section. Aborts if that version is already in the file.
- Inserts a title placeholder, date, hero image, and description placeholder. Edit those before you publish.

The compare link prefers the newest RC tag for the current version (`vX.Y.Z-rc.N`), then the previous stable tag.

## RC: `make changelog-rc`

```bash
make changelog-rc
```

Equivalent rake task: `changelog-rc`.

**Writes** `playbook/RC_CHANGELOG.md` (the RC tab on `/changelog/rc`).

- Finds RC tags like `v17.2.0-rc.1` (or `17.2.0-rc.1`).
- Reads headings already in `RC_CHANGELOG.md` (for example `# ✨ 17.2.0.pre.rc.1`).
- Prepends every **missing** RC since the last heading in that file.
- If the file is empty, it generates every RC after the last stable version (`Playbook::VERSION`).
- Splits PRs by each RC’s tag window (rc.1 since stable, rc.2 since rc.1, and so on).
- Newest RC is first. Running again only adds RCs that are not already documented.

Optional ceiling if you do not want every newer tag, or if the newest RC is not tagged locally:

```bash
RC_VERSION=17.2.0-rc.3 make changelog-rc
```

`RC_VERSION` also accepts the gem form, `17.2.0.pre.rc.3`.

## Changelog categories

Use the [Playbook PR title format](./PR_TITLES.md). Changelog category labels are deprecated. The stable and RC generators use these headings in order:

- **New Kits** groups titles whose description starts with `New Kit`, such as `feat(full-screen): New Kit [PLAY-1234]`.
- **Enhancement** groups `feat`, `style`, and `refactor`.
- **Bug Fixes** groups `fix`.
- **Documentation** groups `docs` and legacy `doc` titles.
- **Improvement** groups `perf`, `test`, `build`, and `ci`.
- **Dependencies** groups `chore`.
- **Deprecated** groups titles whose description starts with `Deprecated`, such as `feat(button): Deprecated the legacy size prop`.
- **Breaking** takes precedence when a recognized title has `!` immediately before the colon.
- **Revert** groups `revert`.
- **Other** comes last and includes older free-form titles and titles with unrecognized types.

`New Kit` and `Deprecated` are case-insensitive and override the type-based category. A breaking marker takes precedence over both.

For a recognized title, the entry uses its description. If the title has a scope, the generator puts the scope first and replaces hyphens with spaces. For example, `fix(advanced-table): Fix sticky column widths [PLAY-1234]` becomes Advanced Table: **Fix Sticky Column Widths** under **Bug Fixes**.

Review entries under **Other** and move them to the appropriate headings as needed during the transition.

## After you generate

1. Review the new markdown. For web, replace the title and description placeholders.
2. Commit `playbook/CHANGELOG.md` and/or `playbook/RC_CHANGELOG.md`.
3. The docs site reads those files in `PagesController` and renders them on `/changelog` and `/changelog/:variant`.

## Implementation

- Generator: `playbook/lib/playbook/changelog_generator.rb`
- Make targets: `changelog` and `changelog-rc` in the root `Makefile`
- Rake: `playbook/private/tasks/changelog.rake`
