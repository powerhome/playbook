# frozen_string_literal: true

module PlaybookMcp
  module Middleware
    # Per-consumer shared-secret gate. Each calling system (LibreChat, DW agent)
    # has its own key in PLAYBOOK_MCP_KEYS and sends it as X-Playbook-Mcp-Key.
    # Production refuses to boot without keys (security_guards.rb); with none
    # configured (dev/test) the gate is open.
    class SharedSecret
      HEADER = "HTTP_X_PLAYBOOK_MCP_KEY"
      CONSUMER_ENV = "playbook_mcp.consumer"

      # "librechat:<key>,dw_agent:<key>" → { "librechat" => "<key>", ... }
      def self.parse_keys(raw)
        raw.to_s.split(",").filter_map do |entry|
          # Strip both sides of the colon so `librechat: <key>` in a sops file works.
          name, key = entry.split(":", 2).map(&:strip)
          [name, key] if name.present? && key.present?
        end.to_h
      end

      def initialize(app)
        @app = app
      end

      def call(env)
        path = env["PATH_INFO"].to_s
        # /ui/* is loaded by the browser iframe (no custom headers); /assets likewise.
        return @app.call(env) if path.start_with?("/health") || path.start_with?("/assets") || path.start_with?("/ui/")

        keys = Rails.application.config.playbook_mcp.consumer_keys
        return @app.call(env) if keys.empty?

        consumer = consumer_for(env[HEADER].to_s.strip, keys)
        if consumer
          env[CONSUMER_ENV] = consumer
          return @app.call(env)
        end

        [401, { "Content-Type" => "application/json" }, [{ error: "unauthorized" }.to_json]]
      end

    private

      # Compares against every key (no early exit) so timing does not reveal which matched.
      def consumer_for(provided, keys)
        keys.reduce(nil) do |match, (name, key)|
          equal = provided.bytesize == key.bytesize &&
                  ActiveSupport::SecurityUtils.secure_compare(provided, key)
          match || (equal ? name : nil)
        end
      end
    end
  end
end
