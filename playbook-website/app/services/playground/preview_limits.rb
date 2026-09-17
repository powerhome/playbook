# frozen_string_literal: true

module Playground
  # Caps for the Rails playground preview endpoint.
  # Keeps untrusted POST payloads from blowing request size or recursion depth.
  module PreviewLimits
    MAX_REQUEST_BYTES = 64.kilobytes
    MAX_CHILDREN_BYTES = 8.kilobytes
    MAX_HASH_DEPTH = 8
    MAX_CHILDREN_DEPTH = 6
    MAX_PREVIEW_PER_MINUTE = 30

    CLIENT_ERROR = "Failed to render preview"
    CLIENT_LIMIT_ERROR = "Preview input is too large or too deeply nested"
    CLIENT_RATE_LIMIT_ERROR = "Too many preview requests. Please try again shortly."

    class LimitExceeded < StandardError; end

    def self.validate_payload!(props:, global_props:, children:)
      validate_children_size!(children)
      validate_hash_depth!(props, label: "props")
      validate_hash_depth!(global_props, label: "global_props")
    end

    def self.validate_children_size!(children)
      return if children.blank?
      return if children.to_s.bytesize <= MAX_CHILDREN_BYTES

      raise LimitExceeded, "Children exceed #{MAX_CHILDREN_BYTES} bytes"
    end

    def self.validate_hash_depth!(value, label:, depth: 0)
      return unless value.is_a?(Hash) || value.is_a?(Array)

      raise LimitExceeded, "#{label} nesting exceeds depth #{MAX_HASH_DEPTH}" if depth > MAX_HASH_DEPTH

      values = value.is_a?(Hash) ? value.values : value
      values.each { |nested| validate_hash_depth!(nested, label: label, depth: depth + 1) }
    end

    def self.validate_children_depth!(depth)
      return if depth <= MAX_CHILDREN_DEPTH

      raise LimitExceeded, "Children nesting exceeds depth #{MAX_CHILDREN_DEPTH}"
    end
  end
end
