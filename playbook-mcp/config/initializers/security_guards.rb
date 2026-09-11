# frozen_string_literal: true

Rails.application.config.after_initialize do
  next unless Rails.env.production?

  raise "PLAYBOOK_MCP_ALLOWLIST must be set in production (comma-separated client IPs, or '*' only if intentionally open)" if Rails.application.config.playbook_mcp.allowlist.empty?
end
