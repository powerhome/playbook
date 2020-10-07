require 'github_changelog_generator/task'

GitHubChangelogGenerator::RakeTask.new :changelog do |config|
  config.user = 'powerhome'
  config.project = 'playbook'
  config.since_tag = Playbook::VERSION
  config.header = ''
  config.issues = false
  config.base = 'CHANGELOG.md'
  config.enhancement_prefix = '**Kit Enhancements:**'
  config.bug_prefix = '**Fixed Bugs:**'
  config.max_issues = 75
  config.configure_sections = {"New Kits":{"prefix":"**New Kits:**","labels":["new kit"]},"Improvements": {"prefix":"**Improvements:**","labels":["improvement"]},"Breaking": {"prefix":"**Breaking Changes:**","labels":["breaking"]}}
end