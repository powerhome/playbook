# frozen_string_literal: true

require_relative "boot"

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
# require "active_storage/engine"
require "action_controller/railtie"
# require "action_mailer/railtie"
# require "action_mailbox/engine"
# require "action_text/engine"
require "action_view/railtie"
require "action_cable/engine"
# require "rails/test_unit/railtie"

require "playbook"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module PlaybookWebsite
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    config.icon_path = Rails.env.production? ? "app/javascript/images/" : "../node_modules/@powerhome/playbook-icons/icons"
    config.icon_alias_path = Rails.env.production? ? "app/javascript/aliases.json" : "../node_modules/@powerhome/playbook-icons/aliases.json"
    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # Don't generate system test files.

    config.generators.system_tests = nil

    openai_api_key = ENV["OPENAI_API_KEY"]
    Rails.application.config.openai_api_key = openai_api_key
  end
end
