# frozen_string_literal: true

module Playground
  # Helpers for playground preview HTML safety.
  #
  # Trust split:
  # - Raw user / plain text → plain_text (escaped)
  # - pb_rails kit output → already trusted SafeBuffers
  # - Mixed segments → safe_join (escapes unsafe pieces, preserves trusted ones)
  #
  # RailsPlaygroundTab also disables LiveExampleRails script re-execution.
  module TrustedHtml
    def self.plain_text(content)
      ERB::Util.html_escape(content.to_s)
    end

    # Same behavior as ActionView safe_join: escape non-safe parts, keep
    # html_safe kit output as-is, then mark the assembled buffer safe.
    def self.safe_join(parts, sep = "\n")
      compact = Array(parts).flatten.compact
      return nil if compact.empty?

      escaped_sep = ERB::Util.unwrapped_html_escape(sep)
      compact
        .map { |part| ERB::Util.unwrapped_html_escape(part) }
        .join(escaped_sep)
        .html_safe
    end
  end
end
