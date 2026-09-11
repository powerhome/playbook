# frozen_string_literal: true

require "active_support/core_ext/integer/time"

Rails.application.configure do
  config.enable_reloading = false
  config.eager_load = true
  config.consider_all_requests_local = false
  config.public_file_server.enabled = ENV["RAILS_SERVE_STATIC_FILES"].present?
  config.log_level = ENV.fetch("RAILS_LOG_LEVEL", "info")
  config.log_tags = [:request_id]
  config.cache_store = :memory_store
  config.active_support.report_deprecations = false
  config.hosts.clear if ENV["PLAYBOOK_MCP_DISABLE_HOST_CHECK"] == "1"
end
