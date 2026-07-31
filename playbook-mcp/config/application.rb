# frozen_string_literal: true

require_relative "boot"

require "rails"
require "action_controller/railtie"
require "action_view/railtie"
require "playbook"
require "ipaddr"

Bundler.require(*Rails.groups)

module PlaybookMcp
  class Application < Rails::Application
    config.load_defaults 7.2
    config.api_only = false

    config.eager_load_paths << Rails.root.join("lib")
    config.autoload_paths << Rails.root.join("lib")
    config.autoload_lib(ignore: %w[tasks]) if config.respond_to?(:autoload_lib)

    config.playbook_mcp = ActiveSupport::OrderedOptions.new
    config.playbook_mcp.asset_base_url = ENV.fetch("PLAYBOOK_MCP_ASSET_BASE_URL", "")
    config.playbook_mcp.max_props_bytes = Integer(ENV.fetch("PLAYBOOK_MCP_MAX_PROPS_BYTES", "65536"))
    config.playbook_mcp.rate_limit_max = Integer(ENV.fetch("PLAYBOOK_MCP_RATE_LIMIT_MAX", "60"))
    config.playbook_mcp.rate_limit_window = Integer(ENV.fetch("PLAYBOOK_MCP_RATE_LIMIT_WINDOW", "60"))
    config.playbook_mcp.allowlist = ENV.fetch("PLAYBOOK_MCP_ALLOWLIST", "").split(",").map(&:strip).reject(&:empty?)
    config.playbook_mcp.shared_secret = ENV.fetch("PLAYBOOK_MCP_SHARED_SECRET", "")

    if ENV["PLAYBOOK_MCP_TRUSTED_PROXIES"].present?
      config.action_dispatch.trusted_proxies = ENV["PLAYBOOK_MCP_TRUSTED_PROXIES"]
                                               .split(",")
                                               .map(&:strip)
                                               .reject(&:empty?)
                                               .map { |cidr| IPAddr.new(cidr) }
    end
  end
end
