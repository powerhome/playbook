const core = require("@actions/core"),
  github = require("@actions/github"),
  context = github.context;

const main = async () => {
  core.info('Hello!');
}

main().catch(err => core.setFailed(err.message));
