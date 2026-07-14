# frozen_string_literal: true

module Playground
  class ErbChildrenRenderer
    PB_RAILS_BLOCK = /
      <%=\s*pb_rails\(\s*
      "([^"]+)"
      (?:\s*,\s*props:\s*(\{.*?\}))?
      \s*\)\s*do\s*%>
      \s*
      (.*?)
      \s*<%\s*end\s*%>
    /mx

    PB_RAILS_TAG = /
      <%=\s*pb_rails\(\s*
      "([^"]+)"
      (?:\s*,\s*props:\s*(\{.*?\}))?
      \s*\)\s*%
      >
    /mx

    def initialize(view_context:)
      @view_context = view_context
    end

    def render(children)
      return nil if children.blank?
      return nil unless erb_children?(children)

      segments = parse_segments(children.to_s)
      return nil if segments.empty?

      TrustedHtml.safe_join(segments.filter_map { |segment| render_segment(segment) })
    end

    def erb_children?(children)
      children.to_s.include?("pb_rails(")
    end

  private

    def parse_segments(children)
      segments = []
      remaining = children

      until remaining.blank?
        remaining = remaining.lstrip

        if (match = remaining.match(PB_RAILS_BLOCK))
          segments << {
            kit: match[1],
            props: parse_ruby_props_hash(match[2].to_s),
            content: match[3],
          }
          remaining = remaining[match[0].length..]
          next
        end

        if (match = remaining.match(PB_RAILS_TAG))
          segments << {
            kit: match[1],
            props: parse_ruby_props_hash(match[2].to_s),
            content: nil,
          }
          remaining = remaining[match[0].length..]
          next
        end

        break
      end

      segments
    end

    def render_segment(segment)
      kit = segment[:kit]
      props = segment[:props]
      content = segment[:content]

      return nil unless Playground::RailsPlaygroundKits.allowed_child_kit?(kit)

      if content.present?
        inner = render_inner_content(content.strip)
        @view_context.pb_rails(kit, props: props) { inner.presence || "" }
      else
        @view_context.pb_rails(kit, props: props)
      end
    end

    def render_inner_content(content)
      nested = self.class.new(view_context: @view_context).render(content)
      return nested if nested.present?

      jsx = Playground::JsxChildrenRenderer.new(view_context: @view_context).render(content)
      return jsx if jsx.present?

      TrustedHtml.plain_text(content)
    end

    def parse_ruby_props_hash(hash_string)
      props = {}
      return props if hash_string.blank?

      hash_string.scan(/(\w+):\s*"([^"]*)"/) do |key, value|
        props[key.to_sym] = value
      end

      hash_string.scan(/(\w+):\s*(true|false)\b/) do |key, value|
        props[key.to_sym] = value == "true"
      end

      hash_string.scan(/(\w+):\s*(\d+)\b/) do |key, value|
        props[key.to_sym] = value.to_i
      end

      props
    end
  end
end
