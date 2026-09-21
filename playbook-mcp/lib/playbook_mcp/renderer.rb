# frozen_string_literal: true

require "erb"

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

    def render_kit(kit:, props: {}, children: nil, wrap_document: true, ui_action: nil)
      props_hash, nested_action = UiAction.take_from_props(props)
      resolved_action = nil
      if Document.charts_kit?(kit)
        raw = ui_action.nil? ? nested_action : ui_action
        resolved_action = UiAction.resolve(raw)
      end

      result = @validator.validate_kit!(kit: kit, props: props_hash, children: children)
      raise ValidationError, result.errors.join("; ") unless result.ok?

      safe_props = prepare_props(kit, props_hash)
      kit_props = Props.to_kit_props(safe_props)
      fragment = render_fragment(kit.to_s, kit_props, children, ui_action: resolved_action)
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

    def render_layout(items:, wrap_document: true, ui_action: nil)
      normalized = Array(items).map { |item| normalize_layout_item(item) }
      result = @validator.validate_layout!(items: normalized)
      raise ValidationError, result.errors.join("; ") unless result.ok?

      charts = false
      include_rails = false
      fragments = normalized.map do |item|
        kit = item["kit"].to_s
        chart_kit = Document.charts_kit?(kit)
        charts ||= chart_kit
        include_rails ||= !chart_kit
        resolved_action = if chart_kit
                            raw = item["uiAction"].nil? ? ui_action : item["uiAction"]
                            UiAction.resolve(raw)
                          end
        render_fragment(kit, Props.to_kit_props(prepare_props(kit, item["props"])), item["children"], ui_action: resolved_action)
      end

      body = fragments.join("\n")
      return body unless wrap_document

      Document.new(
        body_html: body,
        charts: charts,
        include_rails: include_rails,
        title: "Playbook · layout"
      ).to_html
    rescue ValidationError
      raise
    rescue => e
      raise RenderError, "Failed to render layout: #{e.class}: #{e.message}"
    end

  private

    def normalize_layout_item(item)
      item = Props.deep_stringify_keys(item || {})
      props_hash, nested_action = UiAction.take_from_props(item["props"] || {})
      item_action = nested_action
      item_action = item["uiAction"] || item["ui_action"] if item.key?("uiAction") || item.key?("ui_action")
      {
        "kit" => item["kit"],
        "props" => props_hash,
        "children" => item["children"],
        "uiAction" => item_action,
      }
    end

    def prepare_props(kit, props)
      hash = Props.deep_stringify_keys(props || {})
      hash.delete("uiAction")
      hash.delete("ui_action")
      # Map colloquial / FA icon names onto @powerhome/playbook-icons ids so we
      # never emit empty Font Awesome <i> fallbacks inside MCP documents.
      hash = IconResolver.apply(hash)
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

    def render_fragment(kit, kit_props, children, ui_action: nil)
      html = if children.present?
               raise ValidationError, "Kit '#{kit}' does not allow HTML children" unless HtmlSanitizer.children_allowed?(kit)

               safe_html = HtmlSanitizer.sanitize(children)
               @view.pb_rails(kit, props: kit_props) { safe_html.html_safe }
             else
               @view.pb_rails(kit, props: kit_props)
             end

      html = html.to_s
      return html unless Document.charts_kit?(kit)

      html = reserve_chart_mount_height(html, kit_props)
      attach_ui_action_attr(html, ui_action)
    end

    def attach_ui_action_attr(html, ui_action)
      json = UiAction.attribute_json(ui_action)
      return html unless json

      encoded = ERB::Util.html_escape(json)
      html.sub(/(<div\b(?=[^>]*\bdata-pb-react-component=)[^>]*)(>)/) do
        open_tag = Regexp.last_match(1)
        close = Regexp.last_match(2)
        next "#{open_tag}#{close}" if open_tag.include?("data-pb-mcp-ui-action")

        %(#{open_tag} data-pb-mcp-ui-action="#{encoded}"#{close})
      end
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
