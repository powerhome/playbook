# frozen_string_literal: true

ENV["RAILS_ENV"] ||= "test"

require File.expand_path("../config/environment", __dir__)
abort("The Rails environment is running in production mode!") if Rails.env.production?

require "fileutils"
require "rspec/rails"
require "rspec-html-matchers"

RSpec.configure do |config|
  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end
  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end
  config.shared_context_metadata_behavior = :apply_to_host_groups
  config.filter_rails_from_backtrace!
  config.include RSpecHtmlMatchers

  config.before(:suite) do
    dir = Rails.root.join("vendor/chart-peers")
    FileUtils.mkdir_p(dir)
    path = dir.join(PlaybookMcp::ChartPeers::BUNDLE)
    File.write(path, "(function(){})();\n") unless path.file? && path.size.positive?
  end
end
