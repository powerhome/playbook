# frozen_string_literal: true

module Playground
  # Helpers for playground preview HTML safety.
  #
  # Threat model (docs-site origin):
  # - Children / props from the playground panel are user-controlled.
  # - Plain user text must always be escaped.
  # - Only allowlisted pb_rails kit output may be treated as trusted HTML.
  # - RailsPlaygroundTab disables LiveExampleRails script re-execution.
  module TrustedHtml
    def self.plain_text(content)
      ERB::Util.html_escape(content.to_s)
    end

    def self.from_renderer(html)
      return nil if html.blank?

      html.to_s.html_safe
    end
  end
end
