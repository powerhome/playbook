# frozen_string_literal: true

module PlaybookMcp
  # Strips Highcharts HTML/JS sinks from chart options before render.
  module ChartOptionsSanitizer
    BLOCKED_KEYS = %w[
      useHTML
      useHtml
      usehtml
      formatter
      pointFormatter
      headerFormatter
      footerFormatter
      tooltipFormatter
      labelFormatter
      positioner
    ].freeze

  module_function

    def sanitize(value)
      case value
      when Hash
        value.each_with_object({}) do |(key, child), memo|
          next if blocked_key?(key)

          memo[key] = sanitize(child)
        end
      when Array
        value.map { |child| sanitize(child) }
      when String
        strip_dangerous_html(value)
      when Proc, Method
        nil
      else
        value
      end
    end

    def sanitize_props(props)
      hash = Props.deep_stringify_keys(props || {})
      hash["options"] = sanitize(hash["options"]) if hash.key?("options")
      hash
    end

    def blocked_key?(key)
      key_s = key.to_s
      return true if BLOCKED_KEYS.any? { |blocked| blocked.casecmp?(key_s) }
      return true if key_s.match?(/\Ausehtml\z/i)
      return true if key_s.match?(/formatter\z/i)

      false
    end

    def strip_dangerous_html(string)
      string
        .gsub(%r{<\s*script\b[^>]*>.*?<\s*/\s*script\s*>}mi, "")
        .gsub(%r{<\s*/?\s*script\b[^>]*>}mi, "")
        .gsub(/\son\w+\s*=\s*(['"]).*?\1/mi, "")
        .gsub(/\son\w+\s*=\s*[^\s>]+/mi, "")
        .gsub(/javascript\s*:/i, "")
    end
  end
end
