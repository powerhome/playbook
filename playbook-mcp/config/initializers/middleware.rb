# frozen_string_literal: true

require "playbook_mcp/middleware/shared_secret"
require "playbook_mcp/middleware/rate_limiter"

# Network exposure (VPN-only) is enforced by the Ingress, not in-app.
# RateLimiter must run after SharedSecret: it buckets by the matched consumer.
Rails.application.config.middleware.use PlaybookMcp::Middleware::SharedSecret
Rails.application.config.middleware.use PlaybookMcp::Middleware::RateLimiter
