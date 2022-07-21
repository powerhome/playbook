
const { readFileSync } = require('fs'),
  { join } = require('path');

const core = require("@actions/core"),
  github = require("@actions/github"),
  context = github.context;

const main = async () => {
  const githubToken = core.getInput('github-token'),
    githubRepo = core.getInput('github-repo').split('/'),
    minCovPct = core.getInput('minimum-coverage-pct'),
    octokit = github.getOctokit(githubToken),
    pullNumber = core.getInput('pull-number'),
    repoName = context.repo.repo,
    repoOwner = context.repo.owner;

  const coverageInput = readFileSync(join(__dirname, core.getInput('coverage-summary-file'))),
    coverageJSON = JSON.parse(coverageInput),
    { lines, statements, functions } = coverageJSON.total,
    totalAveCovPct = parseFloat((lines.pct + statements.pct + functions.pct) / 3).toFixed(2),
    badgeColor = parseInt(minCovPct) > totalAveCovPct ? 'red' : 'brightgreen';

  const CREDS = {
    owner: githubRepo[0],
    repo: githubRepo[1],
    pull_number: pullNumber,
  }

  core.info('Hello!!');

  const pr = await octokit.pulls.get(CREDS);

  const { body } = pr.data,
    badgeTitle = core.getInput('badge-title'),
    badge = `![${badgeTitle}](https://img.shields.io/badge/${encodeURI(badgeTitle)}-${totalAveCovPct}%25-${badgeColor})`,
    badgeSubst = new RegExp('(\\!\\[' + badgeTitle + '\\]\\().+\\)/g'),
    updatedBody = body.indexOf(badgeTitle) > -1 ? body.replace(badgeSubst, `${badge}`) : `${badge}\r${body}`;

  await octokit.pulls.update({ ...CREDS, body: updatedBody });
};

main().catch(err => core.setFailed(err.message));