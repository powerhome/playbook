# frozen_string_literal: true

require "playbook_mcp/middleware/request_logger"
require "playbook_mcp/middleware/shared_secret"
require "playbook_mcp/middleware/rate_limiter"

Rails.application.config.middleware.swap Rails::Rack::Logger, PlaybookMcp::Middleware::RequestLogger,
                                         Rails.application.config.log_tags
# Tool props/children are never logged: /mcp is a Rack mount (no controller
# param logging). Mask the /ui/:id param logged by UiController.
Rails.application.config.filter_parameters += [:id]

# Network exposure (VPN-only) is enforced by the Ingress, not in-app.
# RateLimiter must run after SharedSecret: it buckets by the matched consumer.
Rails.application.config.middleware.use PlaybookMcp::Middleware::SharedSecret
Rails.application.config.middleware.use PlaybookMcp::Middleware::RateLimiter
