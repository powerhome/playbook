# frozen_string_literal: true

Rails.application.config.secret_key_base = if Rails.env.production?
                                             ENV.fetch("SECRET_KEY_BASE") do
                                               raise "SECRET_KEY_BASE must be set in production"
                                             end
                                           else
                                             ENV.fetch(
                                               "SECRET_KEY_BASE",
                                               "playbook-mcp-dev-secret-key-base-change-me-in-production-0123456789abcdef"
                                             )
                                           end
