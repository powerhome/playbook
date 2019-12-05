# frozen_string_literal: true

ENV["RAILS_ENV"] ||= "test"

require "spec_helper"
require File.expand_path("dummy/config/environment", __dir__)
abort("The Rails environment is running in production mode!") if Rails.env.production?

require "rspec/rails"

Dir[File.expand_path("support/**/*.rb", __dir__)].sort.each(&method(:require))

RSpec.configure do |config|
  config.fixture_path = "#{::Rails.root}/spec/fixtures"
  config.use_transactional_fixtures = true
  config.infer_spec_type_from_file_location!
  config.filter_rails_from_backtrace!
end
