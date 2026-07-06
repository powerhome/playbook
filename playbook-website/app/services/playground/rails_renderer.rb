# frozen_string_literal: true

module Playground
  class RailsRenderer
    def initialize(view_context:, kit_name:, props: {}, global_props: {}, children: nil, structure_mode: nil)
      @view_context = view_context
      @kit_name = kit_name.to_s
      @props = normalize_hash(props)
      @global_props = normalize_hash(global_props)
      @children = children
      @structure_mode = structure_mode.to_s.presence
    end

    def render
      validate_kit!

      merged_props = build_merged_props
      html = render_kit(merged_props)

      { html: html, error: nil }
    rescue Playbook::Props::Error => e
      { html: nil, error: e.message }
    rescue => e
      { html: nil, error: e.message }
    end

  private

    def validate_kit!
      raise StandardError, "Kit is not enabled for the Rails Playground POC" unless Playground::RailsPlaygroundKits::POC_KITS.include?(@kit_name)

      raise StandardError, "Kit requires mock data and is not supported in the Rails Playground POC" if Playground::RailsPlaygroundKits::MOCK_DATA_KITS.include?(@kit_name)

      schema = kit_schema
      raise StandardError, "Kit does not support the Rails platform" unless schema.present? && Array(schema["platforms"]).include?("rails")
    end

    def render_kit(merged_props)
      case @kit_name
      when "dialog"
        render_dialog_preview(merged_props)
      when "card"
        render_card_preview(merged_props)
      when "flex"
        render_flex_preview(merged_props)
      else
        render_standard_kit(merged_props)
      end
    end

    def render_standard_kit(merged_props)
      block_content = render_playground_block_content(merged_props)

      if block_content.present?
        @view_context.pb_rails(@kit_name, props: merged_props) { block_content }
      else
        @view_context.pb_rails(@kit_name, props: merged_props)
      end
    end

    def render_flex_preview(merged_props)
      html = if @structure_mode == "controlled_flex_item"
               render_controlled_flex_item_preview(merged_props)
             else
               block_content = render_playground_block_content(merged_props)
               if block_content.present?
                 @view_context.pb_rails("flex", props: merged_props) { block_content }
               else
                 @view_context.pb_rails("flex", props: merged_props)
               end
             end

      wrap_flex_doc_example(html)
    end

    def wrap_flex_doc_example(html)
      %(<div class="flex-doc-example">#{html}</div>).html_safe
    end

    def render_controlled_flex_item_preview(merged_props)
      flex_item_props = flex_item_props_from_payload
      first_inner = render_playground_block_content(merged_props.except(:text)) ||
                    playground_html_content(extract_jsx_text(@children))

      @view_context.pb_rails("flex", props: merged_props) do
        first = @view_context.pb_rails("flex/flex_item", props: flex_item_props) do
          first_inner.presence || ""
        end
        second = @view_context.pb_rails("flex/flex_item") { "2" }
        third = @view_context.pb_rails("flex/flex_item") { "3" }

        safe_join([first, second, third])
      end
    end

    def flex_item_props_from_payload
      mapping = {
        "flexItemFixedSize" => :fixed_size,
        "flexItemGrow" => :grow,
        "flexItemShrink" => :shrink,
        "flexItemFlex" => :flex,
        "flexItemOrder" => :order,
        "flexItemAlignSelf" => :align_self,
        "flexItemDisplayFlex" => :display_flex,
      }

      props = {}
      mapping.each do |camel, snake|
        value = @props[camel]
        value = @props[camel_to_snake(camel)] if value.nil?
        next if value.nil? || value == ""

        props[snake] = value
      end

      props
    end

    def extract_jsx_text(content)
      Playground::JsxChildrenRenderer.extract_jsx_text(content)
    end

    def render_card_preview(merged_props)
      props = merged_props.dup
      props[:dark] = true if props[:background].to_s == "dark" && !props.key?(:dark)

      return render_compound_card_preview(props) if compound_card_preview?

      block_content = render_playground_block_content(props)
      if block_content.present?
        @view_context.pb_rails("card", props: props) { block_content }
      else
        @view_context.pb_rails("card", props: props)
      end
    end

    def compound_card_preview?
      %w[header_body full].include?(@structure_mode)
    end

    def render_compound_card_preview(card_props)
      card_props = card_props.except(:header_color, :header_color_striped)
      card_props[:padding] ||= "none"

      header_props = card_header_props_from_payload
      header_props[:padding] ||= "sm"

      body_content = render_card_body_content(card_props)
      include_footer = @structure_mode == "full"

      @view_context.pb_rails("card", props: card_props) do
        header = @view_context.pb_rails("card/card_header", props: header_props) do
          "Header title"
        end

        body = @view_context.pb_rails("card/card_body", props: { padding: "md" }) do
          body_content.presence || ""
        end

        parts = [header, body]
        if include_footer
          footer = @view_context.pb_rails("flex", props: { padding: "sm", justify: "end" }) do
            @view_context.pb_rails("button", props: { text: "Action" })
          end
          parts << footer
        end

        safe_join(parts)
      end
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

    def render_card_body_content(card_props)
      jsx_body = parse_jsx_body_children(@children)
      if jsx_body
        return @view_context.pb_rails(
          "body",
          props: {
            text: jsx_body[:text],
            dark: jsx_body[:dark],
          }.compact
        )
      end

      block_children(card_props)
    end

    def render_dialog_preview(merged_props)
      dialog_id = merged_props[:id] || "rails-playground-dialog"
      merged_props[:id] = dialog_id
      merged_props[:confirm_button_id] ||= "#{dialog_id}-confirm"
      merged_props[:cancel_button_id] ||= "#{dialog_id}-cancel"

      button_html = @view_context.pb_rails(
        "button",
        props: {
          text: "Open Dialog",
          data: { "open-dialog": dialog_id },
        }
      )

      dialog_html = if compound_dialog_preview?(merged_props)
                      render_compound_dialog_preview(merged_props, dialog_id)
                    else
                      @view_context.pb_rails("dialog", props: merged_props)
                    end

      safe_join([button_html, dialog_html])
    end

    def compound_dialog_preview?(merged_props)
      return true if @structure_mode == "subcomponents"

      @children.present? && merged_props[:title].blank? && merged_props[:text].blank?
    end

    def render_compound_dialog_preview(merged_props, dialog_id)
      simple_props = merged_props.except(:title, :text, :cancel_button, :confirm_button)

      @view_context.pb_rails("dialog", props: simple_props) do
        header = @view_context.pb_rails(
          "dialog/dialog_header",
          props: {
            id: dialog_id,
            title: "Header Title inside Dialog.Header",
          }
        )

        body = if @children.present?
                 @view_context.pb_rails("dialog/dialog_body") { playground_html_content(@children) }
               else
                 @view_context.pb_rails("dialog/dialog_body", props: { text: "" })
               end

        footer = @view_context.pb_rails(
          "dialog/dialog_footer",
          props: {
            cancel_button: "Cancel Button",
            confirm_button: "Okay",
            confirm_button_id: "#{dialog_id}-confirm",
            cancel_button_id: "#{dialog_id}-cancel",
            id: dialog_id,
          }
        )

        safe_join([header, body, footer])
      end
    end

    def safe_join(parts)
      parts.compact.join("\n").html_safe
    end

    def block_children(merged_props)
      return nil if @children.blank?

      # Prefer explicit content props over block children when both are present.
      return nil if merged_props[:text].present?

      playground_html_content(@children)
    end

    # Playground children mirror React: HTML in the children field should render, not display as text.
    def playground_html_content(content)
      return nil if content.blank?

      content.to_s.html_safe
    end

    def render_playground_block_content(merged_props)
      jsx_body = parse_jsx_body_children(@children)
      if jsx_body
        return @view_context.pb_rails(
          "body",
          props: {
            text: jsx_body[:text],
            dark: jsx_body[:dark],
          }.compact
        )
      end

      jsx_content = jsx_children_renderer.render(@children)
      return jsx_content if jsx_content.present?

      erb_content = erb_children_renderer.render(@children)
      return erb_content if erb_content.present?

      block_children(merged_props)
    end

    def jsx_children_renderer
      @jsx_children_renderer ||= Playground::JsxChildrenRenderer.new(view_context: @view_context)
    end

    def erb_children_renderer
      @erb_children_renderer ||= Playground::ErbChildrenRenderer.new(view_context: @view_context)
    end

    def parse_jsx_body_children(children)
      return nil if children.blank?

      match = children.strip.match(%r{\A<Body(\s+([^>]*))?\s*/?>\z}i)
      return nil unless match

      attrs = match[2].to_s
      {
        text: attrs[/text="([^"]*)"/, 1],
        dark: attrs.match?(/\bdark\b/),
      }
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
