# frozen_string_literal: true

module PlaybookMcp
  module Middleware
    # Optional shared-secret gate. When PLAYBOOK_MCP_SHARED_SECRET is set,
    # require matching X-Playbook-Mcp-Key (LibreChat supports custom MCP headers).
    class SharedSecret
      HEADER = "HTTP_X_PLAYBOOK_MCP_KEY"

      def initialize(app)
        @app = app
      end

      def call(env)
        secret = Rails.application.config.playbook_mcp.shared_secret
        return @app.call(env) if secret.blank?

        path = env["PATH_INFO"].to_s
        return @app.call(env) if path.start_with?("/health") || path.start_with?("/assets")

        provided = env[HEADER].to_s
        authorized = provided.bytesize == secret.bytesize &&
                     ActiveSupport::SecurityUtils.secure_compare(provided, secret)
        return @app.call(env) if authorized

        [401, { "Content-Type" => "application/json" }, [{ error: "unauthorized" }.to_json]]
      end
    end
  end
end
