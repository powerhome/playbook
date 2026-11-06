# frozen_string_literal: true

module PlaybookMcp
  module Middleware
    class RateLimiter
      def initialize(app)
        @app = app
        @mutex = Mutex.new
        @buckets = Hash.new { |h, k| h[k] = [] }
      end

      def call(env)
        path = env["PATH_INFO"].to_s
        return @app.call(env) if path.start_with?("/health") || path.start_with?("/assets") || path.start_with?("/ui/")

        max = Rails.application.config.playbook_mcp.rate_limit_max
        window = Rails.application.config.playbook_mcp.rate_limit_window
        ip = ClientIp.from_env(env)
        now = Process.clock_gettime(Process::CLOCK_MONOTONIC)

        limited = @mutex.synchronize do
          stamps = @buckets[ip]
          stamps.reject! { |t| now - t > window }
          if stamps.size >= max
            true
          else
            stamps << now
            false
          end
        end

        if limited
          return [429, { "Content-Type" => "application/json", "Retry-After" => window.to_s },
                  [{ error: "rate_limit_exceeded", max: max, window: window }.to_json]]
        end

        @app.call(env)
      end
    end
  end
end
