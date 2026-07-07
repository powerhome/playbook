# frozen_string_literal: true

module Playground
  # Helpers for playground preview HTML safety.
  #
  # Plain children from the props panel are user input — escape them.
  # Output from pb_rails / structured children renderers is trusted kit HTML.
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
