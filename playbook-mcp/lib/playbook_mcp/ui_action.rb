# frozen_string_literal: true

module PlaybookMcp
  # Declarative MCP-UI click actions (prompt / tool / intent). No user-supplied JS.
  module UiAction
    TYPES = %w[prompt tool intent none].freeze
    DEFAULT_PROMPT = "Show details for {{category}}, series {{series}}, value {{value}}"
    DEFAULT = { "type" => "prompt", "prompt" => DEFAULT_PROMPT }.freeze
    MAX_BYTES = 4096
    MAX_STRING = 2000
    MAX_DEPTH = 4
    TOOL_NAME = /\A[a-zA-Z][a-zA-Z0-9_-]{0,63}\z/

  module_function

    def resolve(raw)
      return nil if disabled?(raw)
      return DEFAULT.dup if raw.nil? || blank?(raw)

      hash = Props.deep_stringify_keys(raw)
      raise ValidationError, "uiAction must be an object" unless hash.is_a?(Hash)

      type = hash["type"].to_s
      type = "prompt" if type.empty?
      raise ValidationError, "uiAction.type must be one of #{TYPES.join(', ')}" unless TYPES.include?(type)
      return nil if type == "none"

      action = { "type" => type }
      case type
      when "prompt"
        action["prompt"] = require_string(hash["prompt"].presence || DEFAULT_PROMPT, field: "uiAction.prompt")
      when "tool"
        action["toolName"] = require_tool_name(hash["toolName"] || hash["tool_name"])
        action["params"] = sanitize_json(hash["params"] || {})
      when "intent"
        action["intent"] = require_string(hash["intent"], field: "uiAction.intent")
        action["params"] = sanitize_json(hash["params"] || {})
      end

      encoded = JSON.generate(action)
      raise ValidationError, "uiAction exceeds #{MAX_BYTES} bytes" if encoded.bytesize > MAX_BYTES

      action
    end

    def disabled?(raw)
      return true if raw == false
      return true if raw.is_a?(String) && %w[false none].include?(raw.strip.downcase)

      if raw.is_a?(Hash)
        type = (raw["type"] || raw[:type]).to_s
        return true if %w[none false].include?(type)
      end

      false
    end

    def from_tool_args(args)
      return nil unless args.is_a?(Hash)
      return args[:ui_action] if args.key?(:ui_action)
      return args["ui_action"] if args.key?("ui_action")
      return args[:uiAction] if args.key?(:uiAction)
      return args["uiAction"] if args.key?("uiAction")

      nil
    end

    def take_from_props(props)
      hash = Props.deep_stringify_keys(props || {})
      nested = hash.delete("uiAction") || hash.delete("ui_action")
      [hash, nested]
    end

    def attribute_json(action)
      JSON.generate(action) if action
    end

    def blank?(raw)
      raw.respond_to?(:empty?) && raw.empty?
    end

    def require_string(value, field:)
      raise ValidationError, "#{field} is required" if value.nil? || value.to_s.strip.empty?

      sanitized = ChartOptionsSanitizer.strip_dangerous_html(value.to_s)
      raise ValidationError, "#{field} is required" if sanitized.strip.empty?
      raise ValidationError, "#{field} exceeds #{MAX_STRING} characters" if sanitized.length > MAX_STRING

      sanitized
    end

    def require_tool_name(value)
      name = value.to_s.strip
      raise ValidationError, "uiAction.toolName is required" if name.empty?
      raise ValidationError, "uiAction.toolName is invalid" unless name.match?(TOOL_NAME)

      name
    end

    def sanitize_json(value, depth = 0)
      raise ValidationError, "uiAction.params is too deeply nested" if depth > MAX_DEPTH

      case value
      when Hash
        raise ValidationError, "uiAction.params has too many keys" if value.size > 32

        value.each_with_object({}) do |(key, child), memo|
          key_s = key.to_s
          next if key_s.empty? || key_s.start_with?("__")

          memo[key_s] = sanitize_json(child, depth + 1)
        end
      when Array
        raise ValidationError, "uiAction.params arrays are limited to 32 items" if value.size > 32

        value.map { |child| sanitize_json(child, depth + 1) }
      when String
        sanitized = ChartOptionsSanitizer.strip_dangerous_html(value)
        raise ValidationError, "uiAction.params string exceeds #{MAX_STRING} characters" if sanitized.length > MAX_STRING

        sanitized
      when Numeric, TrueClass, FalseClass, NilClass
        value
      else
        raise ValidationError, "uiAction.params contains an unsupported type"
      end
    end
  end
end
