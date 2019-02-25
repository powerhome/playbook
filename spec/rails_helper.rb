ENV["RAILS_ENV"] ||= "test"

# Per SimpleCov documentation, this MUST be required before any appplication code
# https://github.com/colszowka/simplecov#getting-started
unless ENV["SIMPLECOV"] == "false"
  require "simplecov"
  SimpleCov.start "rails" do
    add_filter "/spec"
  end
end

require "spec_helper"
require File.expand_path "../dummy/config/environment", __FILE__

require "rspec/rails"
require "rspec/expectations"
require "factory_girl_rails"

RSpec.configure do |config|
  config.include FactoryGirl::Syntax::Methods

  config.infer_spec_type_from_file_location!
  config.use_transactional_fixtures = false # database cleaner
end
