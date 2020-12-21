
const core = require("@actions/core");
// const { execSync } = require("child_process");
const { GitHub, context } = require("@actions/github");

const main = async () => {
  const repoName = context.repo.repo,
    repoOwner = context.repo.owner,
    githubToken = core.getInput("github-token"),
    coverageJSON = core.getInput("coverage-json");

  // const githubClient = new GitHub(githubToken);

  // coveragePercentage = parseFloat(coveragePercentage).toFixed(2);
  console.log(coverageJSON)

  // https://img.shields.io/badge/React%20Kit%20Coverage-90%25-brightgreen
};

main().catch(err => core.setFailed(err.message));