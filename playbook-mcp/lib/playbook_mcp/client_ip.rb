# frozen_string_literal: true

module PlaybookMcp
  # Resolves client IP using ActionDispatch trusted-proxy rules instead of
  # blindly trusting the leftmost X-Forwarded-For hop.
  module ClientIp
  module_function

    def from_env(env)
      ActionDispatch::Request.new(env).remote_ip.presence || env["REMOTE_ADDR"] || "unknown"
    rescue
      env["REMOTE_ADDR"] || "unknown"
    end
  end
end
