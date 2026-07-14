# frozen_string_literal: true

module Playground
  class JsxChildrenRenderer
    COMPONENT_KITS = {
      "Caption" => "caption",
      "Body" => "body",
      "Button" => "button",
      "Title" => "title",
      "Badge" => "badge",
      "Icon" => "icon",
      "FlexItem" => "flex/flex_item",
    }.freeze

    CAPTION_FALLBACK_CLASS = "pb_caption_kit_md"

    def initialize(view_context:)
      @view_context = view_context
    end

    def render(children)
      return nil if children.blank?
      return nil unless jsx_children?(children)

      segments = parse_segments(children.to_s.strip)
      return nil if segments.empty?

      TrustedHtml.safe_join(segments.filter_map { |segment| render_segment(segment) })
    end

    def jsx_children?(children)
      children.to_s.match?(/<[A-Z][A-Za-z]*/)
    end

    def self.extract_jsx_text(content)
      text = content.to_s.strip
      return Regexp.last_match(1) if text =~ /\A\{'([^']*)'\}\z/
      return Regexp.last_match(1) if text =~ /\A\{"([^"]*)"\}\z/

      text
    end

  private

    def parse_segments(children)
      segments = []
      remaining = children

      until remaining.blank?
        remaining = remaining.lstrip

        if (match = remaining.match(%r{\A<([A-Z][A-Za-z]*)(\s[^>]*)?\s*/>}m))
          segments << { type: :self_closing, name: match[1], attrs: match[2].to_s }
          remaining = remaining[match[0].length..]
          next
        end

        if (match = remaining.match(%r{\A<([A-Z][A-Za-z]*)(\s[^>]*)?>(.*?)</\1>}m))
          segments << { type: :block, name: match[1], attrs: match[2].to_s, content: match[3] }
          remaining = remaining[match[0].length..]
          next
        end

        if (match = remaining.match(/\A\{'([^']*)'\}/))
          segments << { type: :text, content: match[1] }
          remaining = remaining[match[0].length..]
          next
        end

        if (match = remaining.match(/\A\{"([^"]*)"\}/))
          segments << { type: :text, content: match[1] }
          remaining = remaining[match[0].length..]
          next
        end

        if (match = remaining.match(/\A([^\n<]+)/))
          text = match[1].strip
          segments << { type: :text, content: text } if text.present?
          remaining = remaining[match[0].length..]
          next
        end

        break
      end

      segments
    end

    def render_segment(segment)
      case segment[:type]
      when :text
        playground_html_content(segment[:content])
      when :self_closing
        render_component(segment[:name], parse_jsx_attrs(segment[:attrs]), nil)
      when :block
        inner = render_inner_content(segment[:content])
        render_component(segment[:name], parse_jsx_attrs(segment[:attrs]), inner)
      end
    end

    def render_inner_content(content)
      nested = self.class.new(view_context: @view_context).render(content)
      return nested if nested.present?

      TrustedHtml.plain_text(self.class.extract_jsx_text(content))
    end

    def render_component(name, props, block_content)
      kit = COMPONENT_KITS[name]

      return render_kit(kit, props, block_content) if kit && allowed_child_kit?(kit)

      caption_fallback(name, props, block_content)
    end

    def render_kit(kit, props, block_content)
      if block_content.present?
        @view_context.pb_rails(kit, props: props) { block_content }
      else
        @view_context.pb_rails(kit, props: props.compact)
      end
    end

    def caption_fallback(name, props, block_content)
      return nil unless name == "Caption"

      text = props[:text] || block_content.to_s
      return nil if text.blank?

      %(<div class="#{CAPTION_FALLBACK_CLASS}">#{TrustedHtml.plain_text(text)}</div>).html_safe
    end

    def allowed_child_kit?(kit)
      Playground::RailsPlaygroundKits.allowed_child_kit?(kit)
    end

    def parse_jsx_attrs(attr_string)
      props = {}

      attr_string.to_s.scan(/(\w+)="([^"]*)"/) do |name, value|
        props[camel_to_snake(name).to_sym] = value
      end

      attr_string.scan(/(\w+)=\{([^}]*)\}/) do |name, value|
        props[camel_to_snake(name).to_sym] = coerce_jsx_value(value.strip)
      end

      boolean_shorthand_attrs(attr_string).each do |name|
        snake = camel_to_snake(name).to_sym
        props[snake] = true unless props.key?(snake)
      end

      props
    end

    def boolean_shorthand_attrs(attr_string)
      %w[dark grow shrink displayFlex].select do |name|
        !attr_string.include?("#{name}=") && attr_string.match?(/\b#{name}\b/)
      end
    end

    def coerce_jsx_value(value)
      if value.match?(/\A['"](.*)['"]\z/)
        Regexp.last_match(1)
      elsif value.match?(/\A-?\d+\z/)
        value.to_i
      elsif %w[true false].include?(value)
        value == "true"
      else
        value
      end
    end

    def camel_to_snake(name)
      name
        .gsub(/([a-z0-9])([A-Z])/, '\1_\2')
        .tr("-", "_")
        .downcase
    end

    def playground_html_content(content)
      return nil if content.blank?

      TrustedHtml.plain_text(content)
    end
  end
end
