# frozen_string_literal: true

require "uri"

Rails.application.routes.draw do
  get "/health", to: "health#show"
  get "/health_check/site", to: "health#show"

  match "/assets/*path", to: "assets#preflight", via: :options, format: false
  get "/assets/*path", to: "assets#show", format: false

  # Ephemeral rendered HTML for MCP-UI external_url (avoids host tool-result truncation).
  get "/ui/:id", to: "ui#show", format: false

  # Streamable HTTP transport (MCP 2025-03-26). Do not use deprecated standalone SSE.
  # The mcp gem validates Host/Origin (DNS rebinding). Behind ingress we either
  # allow the public host(s) or disable when PLAYBOOK_MCP_DISABLE_HOST_CHECK=1.
  mcp_server = PlaybookMcp::Server.build
  allowed_hosts = []
  allowed_origins = []
  asset_base = Rails.application.config.playbook_mcp.asset_base_url.to_s
  if asset_base.present?
    uri = URI.parse(asset_base)
    if uri.host.present?
      allowed_hosts << uri.host
      origin = "#{uri.scheme}://#{uri.host}"
      origin += ":#{uri.port}" if uri.port && ![80, 443].include?(uri.port)
      allowed_origins << origin
    end
  end
  allowed_hosts.concat(ENV.fetch("PLAYBOOK_MCP_ALLOWED_HOSTS", "").split(",").map(&:strip).reject(&:empty?))
  allowed_origins.concat(ENV.fetch("PLAYBOOK_MCP_ALLOWED_ORIGINS", "").split(",").map(&:strip).reject(&:empty?))

  transport = MCP::Server::Transports::StreamableHTTPTransport.new(
    mcp_server,
    allowed_hosts: allowed_hosts,
    allowed_origins: allowed_origins,
    dns_rebinding_protection: ENV["PLAYBOOK_MCP_DISABLE_HOST_CHECK"] != "1"
  )
  mount transport => "/mcp"
end
