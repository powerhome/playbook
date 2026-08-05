# frozen_string_literal: true

module Playground
  class ChildrenRenderer
    BODY_TAG = %r{\A<Body(\s+([^>]*))?\s*/?>\z}i

    def initialize(view_context:, depth: 0)
      @view_context = view_context
      @depth = depth
      @jsx_renderer = JsxChildrenRenderer.new(view_context: view_context, depth: depth)
      @erb_renderer = ErbChildrenRenderer.new(view_context: view_context, depth: depth)
    end

    def render(children, merged_props: {})
      return nil if children.blank?

      Playground::PreviewLimits.validate_children_depth!(@depth)

      body_kit = render_body_kit(children)
      return body_kit if body_kit.present?

      structured = @erb_renderer.render(children) || @jsx_renderer.render(children)
      return structured if structured.present?

      return nil if merged_props[:text].present?

      TrustedHtml.plain_text(children)
    end

  private

    def render_body_kit(children)
      match = children.to_s.strip.match(BODY_TAG)
      return nil unless match

      attrs = match[2].to_s
      props = Playground::PropFilter.filter_child_props(
        kit_name: "body",
        props: {
          text: attrs[/text="([^"]*)"/, 1],
          dark: attrs.match?(/\bdark\b/) || nil,
        }.compact
      )
      @view_context.pb_rails("body", props: props)
    end
  end
end
