# Releasing a stable version

[release-please](https://github.com/googleapis/release-please) prepares each stable release as a pull request. Publishing to RubyGems and npm stays manual, with the same 2FA prompts.

Alphas and release candidates are unchanged. See `.github/workflows/github-actions-alpha-version.yml`.

## How the version is chosen

PRs are squash-merged, so release-please reads their titles. They follow the [Playbook PR title format](./PR_TITLES.md), which the required **Conventional Commit title** check enforces.

| Title | Release |
|-------|---------|
| `feat` | minor |
| `fix`, `perf`, `revert` | patch |
| `!` before the colon | major |
| `style`, `refactor`, `docs`, `chore`, `ci`, and the rest | none on their own |

Titles of every type still appear in the `CHANGELOG.md` section once a release PR is open.

To choose a version yourself, add a `Release-As: x.y.z` line to the body of a squash-merged commit.

## The release pull request

On every push to master, `.github/workflows/release-please.yml` opens or updates `chore(release): Version bump <version>` from the branch `release-please--branches--master`.

- **release-please** bumps `VERSION` in `playbook/lib/playbook/version.rb` (the line marked `x-release-please-version`) and `playbook/package.json`. Its notes go in the PR body.
- **The prepare job** (`.github/scripts/prepare-release-pr`) then commits the rest:
  - `PREVIOUS_VERSION`, set to the version on master
  - the new version in `playbook/Gemfile.lock`, the Appraisal lockfiles, and `playbook-website/Gemfile.lock`
  - the `playbook/CHANGELOG.md` section, from Playbook's own [changelog generator](./CHANGELOG_GENERATOR.md). release-please's changelog is turned off (`skip-changelog`), so the website format stays the same.
- The PR is labeled `Inactive RC`, so merging it doesn't cut a release candidate, and `milano`.
- Both jobs use `GITHUB_TOKEN`, so the PR doesn't run other workflows by itself. **Editing the PR title, or pushing a commit to the branch, runs the required checks.**

When a later merge changes the release notes, release-please rebuilds the branch from master and the prepare job runs again. That replaces any edits on the branch, including the changelog title and description, so make those edits last.

## Cutting the release

1. Review the release PR. Check the version and the generated `CHANGELOG.md` section.
2. Finalize the changelog title, date, hero image, and description with the team, and push them to the release branch. The push runs the required checks.
3. Run `make connect` from the repo root on the release branch. The message is copied to your clipboard.
4. Merge the release PR. release-please tags the merge commit (for example `18.5.0`) and creates its GitHub Release with the notes.
5. Pull master, then from `playbook/` run `bin/rails pb_release:push`. It builds and verifies both packages, publishes to RubyGems and then npm with the same 2FA prompts, and confirms both registries list the release.

If either publish fails, keep both package files and rerun with `PLAYBOOK_RESUME_RELEASE=1 bin/rails pb_release:push`.

## Configuration

| File | Purpose |
|------|---------|
| `release-please-config.json` | Release type, bare `X.Y.Z` tags, PR title, labels, and the version files to bump |
| `.release-please-manifest.json` | The last released version. release-please updates it in each release PR. |
| `.github/workflows/release-please.yml` | Runs release-please and the prepare job |
| `.github/scripts/prepare-release-pr` | Sets `PREVIOUS_VERSION`, pins the lockfiles, and generates the changelog |

`bin/rails pb_release:version` still works as a manual fallback. Don't use it while a release PR is open.
