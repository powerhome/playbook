# frozen_string_literal: true

require "playbook/changelog_generator"

desc "Generate a website-ready changelog section and prepend it to CHANGELOG.md"
task :changelog do
  Playbook::ChangelogGenerator.run!
end

desc "Prepend every RC missing from RC_CHANGELOG.md since the last heading"
task "changelog-rc" do
  Playbook::ChangelogGenerator.run!(mode: :rc)
end
