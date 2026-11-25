# frozen_string_literal: true

module PlaybookMcp
  module Middleware
    # /ui/:id links are bearer URLs (anyone holding one can view the render until
    # it expires), so keep the id out of the "Started GET ..." request log line.
    class RequestLogger < Rails::Rack::Logger
      UI_PATH = %r{"/ui/[^"]+"}

    private

      def started_request_message(request)
        super.sub(UI_PATH, '"/ui/[FILTERED]"')
      end
    end
  end
end
