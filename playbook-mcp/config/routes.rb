# frozen_string_literal: true

Rails.application.routes.draw do
  get "/health", to: "health#show"
  get "/health_check/site", to: "health#show"

  match "/assets/*path", to: "assets#preflight", via: :options, format: false
  get "/assets/*path", to: "assets#show", format: false

  # Streamable HTTP transport (MCP 2025-03-26). Do not use deprecated standalone SSE.
  mcp_server = PlaybookMcp::Server.build
  transport = MCP::Server::Transports::StreamableHTTPTransport.new(mcp_server)
  mount transport => "/mcp"
end
