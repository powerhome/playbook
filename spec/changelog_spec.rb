# frozen_string_literal: true

RSpec.describe "CHANGELOG.md" do
  it "fails if CHANGELOG.md is not update in the branch" do
    changed_files = `git diff --name-only origin/master HEAD`.split
    expect(changed_files).to include "CHANGELOG.md"
  end
end
