# frozen_string_literal: true

RSpec.describe "CHANGELOG.md" do
  it "fails if CHANGELOG.md is not update in the branch" do
    current_branch = ENV["BRANCH_NAME"] || `git rev-parse --abbrev-ref HEAD`.strip
    changed_files = `git diff --name-only origin/master #{current_branch}`.split
    puts ">>> #{current_branch}"
    puts ">>> #{changed_files}"

    expect(changed_files).to include "CHANGELOG.md"
  end
end
