# frozen_string_literal: true

module PlaybookMcp
  class Renderer
    # LibreChat measures iframe height before Highcharts hydrates. Reserve this
    # height on the mount node + options.chart.height so auto-resize is correct.
    DEFAULT_CHART_HEIGHT_PX = 400

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
      return hash unless Document.charts_kit?(kit)

      hash = ChartOptionsSanitizer.sanitize_props(hash)
      apply_chart_height_defaults!(hash)
      hash
    end

    def apply_chart_height_defaults!(hash)
      options = hash["options"]
      options = {} unless options.is_a?(Hash)
      chart = options["chart"]
      chart = {} unless chart.is_a?(Hash)
      chart["height"] = DEFAULT_CHART_HEIGHT_PX unless chart.key?("height")
      options["chart"] = chart
      hash["options"] = options
      hash
    end

    def render_fragment(kit, kit_props, children)
      html = if children.present?
               raise ValidationError, "Kit '#{kit}' does not allow HTML children" unless HtmlSanitizer.children_allowed?(kit)

               safe_html = HtmlSanitizer.sanitize(children)
               @view.pb_rails(kit, props: kit_props) { safe_html.html_safe }
             else
               @view.pb_rails(kit, props: kit_props)
             end

      html = reserve_chart_mount_height(html.to_s, kit_props) if Document.charts_kit?(kit)
      html
    end

    def reserve_chart_mount_height(html, kit_props)
      height = chart_height_px(kit_props)
      html.sub(/(<div\b(?=[^>]*\bdata-pb-react-component=)[^>]*)(>)/) do
        open_tag = Regexp.last_match(1)
        close = Regexp.last_match(2)
        if open_tag.match?(/\bstyle\s*=/)
          open_tag.sub(/\bstyle=(['"])(.*?)\1/) do
            quote = Regexp.last_match(1)
            existing = Regexp.last_match(2).to_s
            merged = existing.include?("height") ? existing : "#{existing};height:#{height}px;width:100%"
            %(style=#{quote}#{merged}#{quote})
          end + close
        else
          %(#{open_tag} style="height:#{height}px;width:100%"#{close})
        end
      end
    end

    def chart_height_px(kit_props)
      options = kit_props[:options] || kit_props["options"] || {}
      chart = options["chart"] || options[:chart] || {}
      raw = chart["height"] || chart[:height] || DEFAULT_CHART_HEIGHT_PX
      Integer(raw)
    rescue ArgumentError, TypeError
      DEFAULT_CHART_HEIGHT_PX
    end
  end
end
