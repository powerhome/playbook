# frozen_string_literal: true

module Playground
  class RailsRenderer
    FLEX_ITEM_PROP_MAP = {
      "flexItemFixedSize" => :fixed_size,
      "flexItemGrow" => :grow,
      "flexItemShrink" => :shrink,
      "flexItemFlex" => :flex,
      "flexItemOrder" => :order,
      "flexItemAlignSelf" => :align_self,
      "flexItemDisplayFlex" => :display_flex,
    }.freeze

    def initialize(view_context:, kit_name:, props: {}, global_props: {}, children: nil, structure_mode: nil)
      @view_context = view_context
      @kit_name = kit_name.to_s
      @props = normalize_hash(props)
      @global_props = normalize_hash(global_props)
      @children = children
      @structure_mode = structure_mode.to_s.presence
    end

    def render
      validate_payload_limits!
      validate_kit!

      { html: render_kit(build_merged_props), error: nil }
    rescue Playground::PreviewLimits::LimitExceeded => e
      log_render_error(e)
      { html: nil, error: Playground::PreviewLimits::CLIENT_LIMIT_ERROR }
    rescue Playbook::Props::Error, StandardError => e
      log_render_error(e)
      { html: nil, error: Playground::PreviewLimits::CLIENT_ERROR }
    rescue SystemStackError => e
      log_render_error(e)
      { html: nil, error: Playground::PreviewLimits::CLIENT_ERROR }
    end

  private

    def validate_payload_limits!
      Playground::PreviewLimits.validate_payload!(
        props: @props,
        global_props: @global_props,
        children: @children
      )
    end

    def log_render_error(error)
      Rails.logger.error("Playground::RailsRenderer error: #{error.class}: #{error.message}")
    end

    def validate_kit!
      raise StandardError, "Kit is not enabled for the Rails Playground POC" unless Playground::RailsPlaygroundKits::POC_KITS.include?(@kit_name)

      raise StandardError, "Kit requires mock data and is not supported in the Rails Playground POC" if Playground::RailsPlaygroundKits::MOCK_DATA_KITS.include?(@kit_name)

      schema = kit_schema
      raise StandardError, "Kit does not support the Rails platform" unless schema.present? && Array(schema["platforms"]).include?("rails")
    end

    def render_kit(merged_props)
      case @kit_name
      when "dialog" then render_dialog_preview(merged_props)
      when "card" then render_card_preview(merged_props)
      when "flex" then render_flex_preview(merged_props)
      else render_pb_kit(@kit_name, merged_props, block_content(merged_props))
      end
    end

    def render_pb_kit(kit, props = {}, block_content = nil, &block)
      props = {} if props.nil?

      if block_content.present?
        @view_context.pb_rails(kit, props: props) { block_content }
      elsif block_given?
        @view_context.pb_rails(kit, props: props, &block)
      else
        @view_context.pb_rails(kit, props: props)
      end
    end

    def render_flex_preview(merged_props)
      html = if @structure_mode == "controlled_flex_item"
               render_controlled_flex_item_preview(merged_props)
             else
               render_pb_kit("flex", merged_props, block_content(merged_props))
             end

      wrap_flex_doc_example(html)
    end

    def wrap_flex_doc_example(html)
      %(<div class="flex-doc-example">#{html}</div>).html_safe
    end

    def render_controlled_flex_item_preview(merged_props)
      first_inner = block_content(merged_props.except(:text)) ||
                    TrustedHtml.plain_text(JsxChildrenRenderer.extract_jsx_text(@children))

      render_pb_kit("flex", merged_props, safe_join([
                                                      render_pb_kit("flex/flex_item", flex_item_props_from_payload) { first_inner.presence || "" },
                                                      render_pb_kit("flex/flex_item") { "2" },
                                                      render_pb_kit("flex/flex_item") { "3" },
                                                    ]))
    end

    def flex_item_props_from_payload
      payload_props(FLEX_ITEM_PROP_MAP)
    end

    def render_card_preview(merged_props)
      props = merged_props.dup
      props[:dark] = true if props[:background].to_s == "dark" && !props.key?(:dark)

      return render_compound_card_preview(props) if compound_card_preview?

      render_pb_kit("card", props, block_content(props))
    end

    def compound_card_preview?
      %w[header_body full].include?(@structure_mode)
    end

    def render_compound_card_preview(card_props)
      card_props = card_props.except(:header_color, :header_color_striped)
      card_props[:padding] ||= "none"

      header_props = card_header_props_from_payload
      header_props[:padding] ||= "sm"
      body_content = block_content(card_props)

      render_pb_kit("card", card_props, safe_join([
        render_pb_kit("card/card_header", header_props) { "Header title" },
        render_pb_kit("card/card_body", { padding: "md" }) { body_content.presence || "" },
        *compound_card_footer,
      ].compact))
    end

    def compound_card_footer
      return [] unless @structure_mode == "full"

      [render_pb_kit("flex", { padding: "sm", justify: "end" }) do
        render_pb_kit("button", { text: "Action" })
      end]
    end

    def card_header_props_from_payload
      header_color = @props["headerColor"] || @props["header_color"]
      header_color_striped = @props["headerColorStriped"]
      header_color_striped = @props["header_color_striped"] if header_color_striped.nil?

      props = {}
      props[:header_color] = header_color.to_s if header_color.present?
      props[:header_color_striped] = header_color_striped == true || header_color_striped.to_s == "true" unless header_color_striped.nil?
      props
    end

    def render_dialog_preview(merged_props)
      dialog_id = merged_props[:id] || "rails-playground-dialog"
      merged_props[:id] = dialog_id
      merged_props[:confirm_button_id] ||= "#{dialog_id}-confirm"
      merged_props[:cancel_button_id] ||= "#{dialog_id}-cancel"

      safe_join([
                  render_pb_kit("button", {
                                  text: "Open Dialog",
                                  data: { "open-dialog": dialog_id },
                                }),
                  compound_dialog_preview?(merged_props) ? render_compound_dialog_preview(merged_props, dialog_id) : render_pb_kit("dialog", merged_props),
                ])
    end

    def compound_dialog_preview?(merged_props)
      return true if @structure_mode == "subcomponents"

      @children.present? && merged_props[:title].blank? && merged_props[:text].blank?
    end

    def render_compound_dialog_preview(merged_props, dialog_id)
      simple_props = merged_props.except(:title, :text, :cancel_button, :confirm_button)
      body_content = block_content(simple_props)

      render_pb_kit("dialog", simple_props, safe_join([
                                                        render_pb_kit("dialog/dialog_header", {
                                                                        id: dialog_id,
                                                                        title: "Header Title inside Dialog.Header",
                                                                      }),
                                                        body_content.present? ? render_pb_kit("dialog/dialog_body") { body_content } : render_pb_kit("dialog/dialog_body", { text: "" }),
                                                        render_pb_kit("dialog/dialog_footer", {
                                                                        cancel_button: "Cancel Button",
                                                                        confirm_button: "Okay",
                                                                        confirm_button_id: "#{dialog_id}-confirm",
                                                                        cancel_button_id: "#{dialog_id}-cancel",
                                                                        id: dialog_id,
                                                                      }),
                                                      ]))
    end

    def block_content(merged_props)
      children_renderer.render(@children, merged_props: merged_props)
    end

    def children_renderer
      @children_renderer ||= ChildrenRenderer.new(view_context: @view_context)
    end

    def payload_props(key_map)
      key_map.each_with_object({}) do |(camel, snake), props|
        value = @props[camel] || @props[camel_to_snake(camel)]
        next if value.nil? || value == ""

        props[snake] = value
      end
    end

    def safe_join(parts)
      TrustedHtml.safe_join(parts) || "".html_safe
    end

    def build_merged_props
      schema_props = kit_schema.fetch("props", {})
      global_schema_props = global_props_schema.fetch("props", {})

      merged = {}
      merge_prop_source!(merged, @props, schema_props)
      merge_prop_source!(merged, @global_props, global_schema_props) if kit_uses_global_props?

      ensure_required_kit_props(merged)
    end

    def ensure_required_kit_props(merged)
      case @kit_name
      when "dialog"
        merged[:id] ||= "rails-playground-dialog"
      when "dropdown"
        merged[:id] ||= "rails-playground-dropdown"
      end

      merged
    end

    def merge_prop_source!(merged, source, definitions)
      source.each do |key, value|
        camel_key = key.to_s
        definition = definitions[camel_key]
        next if definition.present? && !prop_for_rails?(definition)
        next if unsupported_value?(value)

        converted = deep_convert(value)
        merged[camel_to_snake(camel_key).to_sym] = converted unless converted.nil?
      end
    end

    def prop_for_rails?(definition)
      platforms = definition["platforms"]
      platforms.blank? || platforms.include?("rails")
    end

    def unsupported_value?(value)
      return true if playground_code_expression?(value)

      if value.is_a?(String)
        trimmed = value.strip
        return true if trimmed.include?("=>") || trimmed.start_with?("function")
      end

      false
    end

    def playground_code_expression?(value)
      value.is_a?(Hash) && value.key?("__playgroundCode")
    end

    def kit_uses_global_props?
      kit_schema["globalProps"] == true
    end

    def kit_schema
      @kit_schema ||= load_json(::Playbook.kit_path(@kit_name, "", "kit.schema.json"))
    end

    def global_props_schema
      @global_props_schema ||= load_json(
        Playbook::Engine.root.join("app/pb_kits/playbook/utilities/global-props.schema.json")
      ) || {}
    end

    def load_json(path)
      return nil unless path.exist?

      JSON.parse(path.read)
    rescue JSON::ParserError
      nil
    end

    def camel_to_snake(name)
      name
        .gsub(/([a-z0-9])([A-Z])/, '\1_\2')
        .tr("-", "_")
        .downcase
    end

    def deep_convert(value)
      case value
      when Hash
        if playground_code_expression?(value)
          nil
        else
          value.transform_keys { |key| camel_to_snake(key.to_s).to_sym }
               .transform_values { |nested| deep_convert(nested) }
        end
      when Array
        value.map { |item| deep_convert(item) }
      else
        value
      end
    end

    def normalize_hash(value)
      return {} unless value.is_a?(Hash)

      value
    end
  end
end
