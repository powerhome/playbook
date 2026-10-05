# frozen_string_literal: true

module Playground
  class ErbChildrenRenderer
    # Opening tag only — body is taken with a do/end depth counter so nested
    # block-form children are not truncated at the first <% end %>.
    PB_RAILS_BLOCK_OPEN = /
      \A
      <%=\s*pb_rails\(\s*
      "([^"]+)"
      (?:\s*,\s*props:\s*(\{.*?\}))?
      \s*\)\s*do\s*%>
    /mx

    PB_RAILS_TAG = /
      \A
      <%=\s*pb_rails\(\s*
      "([^"]+)"
      (?:\s*,\s*props:\s*(\{.*?\}))?
      \s*\)\s*%
      >
    /mx

    PB_RAILS_BLOCK_OPEN_ANYWHERE = /
      <%=\s*pb_rails\(\s*
      "[^"]+"
      (?:\s*,\s*props:\s*\{.*?\})?
      \s*\)\s*do\s*%>
    /mx

    PB_RAILS_END = /<%\s*end\s*%>/

    def initialize(view_context:, depth: 0)
      @view_context = view_context
      @depth = depth
    end

    def render(children)
      return nil if children.blank?
      return nil unless erb_children?(children)

      Playground::PreviewLimits.validate_children_depth!(@depth)

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

        if (block = match_balanced_block(remaining))
          segments << block[:segment]
          remaining = remaining[block[:consumed]..]
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

        # Non-tag leftover: keep escaped text and resume at the next pb_rails
        # so siblings after plain text still render (preview matches the ERB panel).
        next_kit = remaining.index(/<%=\s*pb_rails\(/)
        if next_kit.nil?
          text = remaining.strip
          segments << { text: text } if text.present?
          break
        end

        if next_kit.positive?
          text = remaining[0...next_kit].strip
          segments << { text: text } if text.present?
          remaining = remaining[next_kit..]
          next
        end

        # Looks like pb_rails at index 0 but didn't match BLOCK/TAG — skip the
        # ERB tag so we cannot loop forever on malformed markup.
        erb_close = remaining.index("%>")
        break unless erb_close

        remaining = remaining[(erb_close + 2)..]
      end

      segments
    end

    def match_balanced_block(source)
      open = source.match(PB_RAILS_BLOCK_OPEN)
      return nil unless open

      cursor = open[0].length
      depth = 1
      last_end_length = nil

      while depth.positive? && cursor < source.length
        rest = source[cursor..]
        nested_open = rest.match(PB_RAILS_BLOCK_OPEN_ANYWHERE)
        block_end = rest.match(PB_RAILS_END)
        return nil unless block_end

        open_at = nested_open&.begin(0)
        end_at = block_end.begin(0)

        if open_at && open_at < end_at
          cursor += open_at + nested_open[0].length
          depth += 1
        else
          cursor += end_at + block_end[0].length
          last_end_length = block_end[0].length
          depth -= 1
        end
      end

      return nil unless depth.zero? && last_end_length

      {
        segment: {
          kit: open[1],
          props: parse_ruby_props_hash(open[2].to_s),
          content: source[open[0].length...(cursor - last_end_length)],
        },
        consumed: cursor,
      }
    end

    def render_segment(segment)
      return TrustedHtml.plain_text(segment[:text]) if segment.key?(:text)

      kit = segment[:kit]
      props = segment[:props]
      content = segment[:content]

      return nil unless Playground::RailsPlaygroundKits.allowed_child_kit?(kit)

      safe_props = Playground::PropFilter.filter_child_props(kit_name: kit, props: props)

      if content.present?
        inner = render_inner_content(content.strip)
        @view_context.pb_rails(kit, props: safe_props) { inner.presence || "" }
      else
        @view_context.pb_rails(kit, props: safe_props)
      end
    end

    def render_inner_content(content)
      nested = self.class.new(view_context: @view_context, depth: @depth + 1).render(content)
      return nested if nested.present?

      jsx = Playground::JsxChildrenRenderer.new(
        view_context: @view_context,
        depth: @depth + 1
      ).render(content)
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
