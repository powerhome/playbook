# frozen_string_literal: true

require "spec_helper"
require "open3"

RSpec.describe "chart-bundle uiAction.js" do
  it "builds MCP-UI prompt/tool/intent messages" do
    skip "node not available" unless system("node", "-v", out: File::NULL, err: File::NULL)

    path = Rails.root.join("chart-bundle/uiAction.test.mjs")
    stdout, stderr, status = Open3.capture3("node", "--test", path.to_s)
    expect(status.success?).to be(true), "#{stdout}\n#{stderr}"
  end
end
