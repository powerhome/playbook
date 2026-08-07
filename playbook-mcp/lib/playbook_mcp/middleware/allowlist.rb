# frozen_string_literal: true

module PlaybookMcp
  module Middleware
    class Allowlist
      def initialize(app)
        @app = app
      end

      def call(env)
        allowed = Rails.application.config.playbook_mcp.allowlist
        return @app.call(env) if allowed.empty?

        path = env["PATH_INFO"].to_s
        return @app.call(env) if path.start_with?("/health")

        ip = ClientIp.from_env(env)
        return @app.call(env) if allowed.include?(ip) || allowed.include?("*")

        [403, { "Content-Type" => "application/json" }, [{ error: "forbidden" }.to_json]]
      end
    end
  end
end
