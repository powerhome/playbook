# frozen_string_literal: true

module PlaybookMcp
  class Renderer
    def initialize(validator: Validator.new)
      @validator = validator
      @controller = ApplicationController.new
      @controller.request = ActionDispatch::Request.empty
      @controller.set_response!(ActionDispatch::Response.new)
      @view = @controller.view_context
      @view.extend(Playbook::PbKitHelper) unless @view.class.included_modules.include?(Playbook::PbKitHelper)
    end

    def render_kit(kit:, props: {}, children: nil, wrap_document: true)
      result = @validator.validate_kit!(kit: kit, props: props, children: children)
      raise ValidationError, result.errors.join("; ") unless result.ok?

      safe_props = prepare_props(kit, props)
      kit_props = Props.to_kit_props(safe_props)
      fragment = render_fragment(kit.to_s, kit_props, children)
      return fragment unless wrap_document

      Document.new(
        body_html: fragment,
        charts: Document.charts_kit?(kit),
        title: "Playbook · #{kit}"
      ).to_html
    rescue ValidationError
      raise
    rescue => e
      raise RenderError, "Failed to render kit '#{kit}': #{e.class}: #{e.message}"
    end

    def render_layout(items:, wrap_document: true)
      result = @validator.validate_layout!(items: items)
      raise ValidationError, result.errors.join("; ") unless result.ok?

      charts = false
      fragments = Array(items).map do |item|
        item = item.transform_keys(&:to_sym) if item.is_a?(Hash)
        kit = (item[:kit] || item["kit"]).to_s
        props = item[:props] || item["props"] || {}
        children = item[:children] || item["children"]
        charts ||= Document.charts_kit?(kit)
        render_fragment(kit, Props.to_kit_props(prepare_props(kit, props)), children)
      end

      body = fragments.join("\n")
      return body unless wrap_document

      Document.new(body_html: body, charts: charts, title: "Playbook · layout").to_html
    end

  private

    def prepare_props(kit, props)
      hash = Props.deep_stringify_keys(props || {})
      return ChartOptionsSanitizer.sanitize_props(hash) if Document.charts_kit?(kit)

      hash
    end

    def render_fragment(kit, kit_props, children)
      if children.present?
        raise ValidationError, "Kit '#{kit}' does not allow HTML children" unless HtmlSanitizer.children_allowed?(kit)

        safe_html = HtmlSanitizer.sanitize(children)
        @view.pb_rails(kit, props: kit_props) { safe_html.html_safe }
      else
        @view.pb_rails(kit, props: kit_props)
      end
    end
  end
end
