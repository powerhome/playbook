# frozen_string_literal: true

require_relative "boot"

require "rails"
require "action_controller/railtie"
require "action_view/railtie"
require "playbook"
require_relative "../lib/playbook_mcp/middleware/shared_secret"

Bundler.require(*Rails.groups)

module PlaybookMcp
  class Application < Rails::Application
    config.load_defaults 7.2
    config.api_only = false

    # Playbook Icon kit inlines SVGs when these are set (same pattern as playbook-website).
    # Without them, icons fall back to Font Awesome <i> classes with no webfont in the
    # MCP document — which shows up as empty colored circles in icon_stat_value / icon_circle.
    # Production image vendors icons; local/dev/test fall back to monorepo node_modules.
    vendor_icons = root.join("vendor/playbook-icons/icons")
    vendor_aliases = root.join("vendor/playbook-icons/aliases.json")
    config.icon_path = if Rails.env.production? || vendor_icons.exist?
                         "vendor/playbook-icons/icons"
                       else
                         "../node_modules/@powerhome/playbook-icons/icons"
                       end
    config.icon_alias_path = if Rails.env.production? || vendor_aliases.exist?
                               "vendor/playbook-icons/aliases.json"
                             else
                               "../node_modules/@powerhome/playbook-icons/aliases.json"
                             end

    # version.rb defines PlaybookMcp::VERSION (not ::Version); require it manually.
    config.autoload_lib(ignore: %w[tasks playbook_mcp/version.rb])

    config.playbook_mcp = ActiveSupport::OrderedOptions.new
    config.playbook_mcp.asset_base_url = ENV.fetch("PLAYBOOK_MCP_ASSET_BASE_URL", "")
    config.playbook_mcp.max_props_bytes = Integer(ENV.fetch("PLAYBOOK_MCP_MAX_PROPS_BYTES", "65536"))
    config.playbook_mcp.rate_limit_max = Integer(ENV.fetch("PLAYBOOK_MCP_RATE_LIMIT_MAX", "60"))
    config.playbook_mcp.rate_limit_window = Integer(ENV.fetch("PLAYBOOK_MCP_RATE_LIMIT_WINDOW", "60"))
    config.playbook_mcp.consumer_keys = PlaybookMcp::Middleware::SharedSecret.parse_keys(ENV.fetch("PLAYBOOK_MCP_KEYS", ""))
  end
end
