# frozen_string_literal: true

require "playbook_mcp/middleware/allowlist"
require "playbook_mcp/middleware/shared_secret"
require "playbook_mcp/middleware/rate_limiter"

Rails.application.config.middleware.use PlaybookMcp::Middleware::Allowlist
Rails.application.config.middleware.use PlaybookMcp::Middleware::SharedSecret
Rails.application.config.middleware.use PlaybookMcp::Middleware::RateLimiter
