# Changelog generator

Both website changelog files are built by `Playbook::ChangelogGenerator` from merged GitHub PRs, grouped by changelog labels. Run the commands from the **repo root**.

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
- Groups them into New Kits, Kit Enhancements, Improvements, Fixed Bugs, Breaking Changes, and Other (max 25 per section).
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

## PR labels

The generator maps these labels to sections:

| Label | Section |
|-------|---------|
| `new kit` | New Kits |
| `enhancement` | Kit Enhancements |
| `improvement` | Improvements |
| `bug` | Fixed Bugs |
| `breaking` | Breaking Changes |
| (none of the above) | Other |

PRs need the usual changelog label so they land in the right section.

## After you generate

1. Review the new markdown. For web, replace the title and description placeholders.
2. Commit `playbook/CHANGELOG.md` and/or `playbook/RC_CHANGELOG.md`.
3. The docs site reads those files in `PagesController` and renders them on `/changelog` and `/changelog/:variant`.

## Implementation

- Generator: `playbook/lib/playbook/changelog_generator.rb`
- Make targets: `changelog` and `changelog-rc` in the root `Makefile`
- Rake: `playbook/private/tasks/changelog.rake`
