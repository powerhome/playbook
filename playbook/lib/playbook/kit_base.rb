# frozen_string_literal: true

require "playbook/classnames"
require "playbook/spacing"
require "playbook/z_index"
require "playbook/number_spacing"
require "playbook/shadow"
require "playbook/line_height"
require "playbook/display"
require "playbook/cursor"
require "playbook/flex_direction"
require "playbook/flex_wrap"
require "playbook/justify_content"
require "playbook/justify_self"
require "playbook/align_items"
require "playbook/align_content"
require "playbook/align_self"
require "playbook/flex"
require "playbook/flex_grow"
require "playbook/flex_shrink"
require "playbook/order"
require "playbook/position"
require "playbook/hover"
require "playbook/border_radius"
require "playbook/text_align"
require "playbook/overflow"
require "playbook/truncate"
require "playbook/left"
require "playbook/top"
require "playbook/right"
require "playbook/bottom"
require "playbook/vertical_align"
require "playbook/height"
require "playbook/min_height"
require "playbook/max_height"

module Playbook
  include ActionView::Helpers

  class KitBase < ViewComponent::Base
    include Playbook::PbKitHelper
    include Playbook::Props
    include Playbook::Classnames
    include Playbook::Spacing
    include Playbook::ZIndex
    include Playbook::NumberSpacing
    include Playbook::Shadow
    include Playbook::LineHeight
    include Playbook::Display
    include Playbook::Cursor
    include Playbook::FlexDirection
    include Playbook::FlexWrap
    include Playbook::JustifyContent
    include Playbook::JustifySelf
    include Playbook::AlignItems
    include Playbook::AlignContent
    include Playbook::AlignSelf
    include Playbook::Flex
    include Playbook::FlexGrow
    include Playbook::FlexShrink
    include Playbook::Order
    include Playbook::Position
    include Playbook::Hover
    include Playbook::BorderRadius
    include Playbook::TextAlign
    include Playbook::Overflow
    include Playbook::Truncate
    include Playbook::Left
    include Playbook::Top
    include Playbook::Right
    include Playbook::Bottom
    include Playbook::VerticalAlign
    include Playbook::Height
    include Playbook::MinHeight
    include Playbook::MaxHeight

    prop :id
    prop :data, type: Playbook::Props::HashProp, default: {}
    prop :aria, type: Playbook::Props::HashProp, default: {}
    prop :html_options, type: Playbook::Props::HashProp, default: {}
    prop :children, type: Playbook::Props::Proc
    prop :style, type: Playbook::Props::HashProp, default: {}
    prop :height
    prop :min_height
    prop :max_height

    def object
      self
    end

    # rubocop:disable Layout/CommentIndentation
    # pb_content_tag information (potentially to be abstracted into its own dev doc in the future)
    # The pb_content_tag generates HTML content tags for rails kits with flexible options.
    # Modify a generated kit.html.erb file accordingly (the kit_base_default_options listed below no longer need to be explictly outlined in that file, only modifications).
    # name - the first argument is for HTML tag. The default is :div.
    # content_or_options_with_block - additional content or options for the tag (i.e., the customizations a dev adds to kit.html.erb).
    # options - Within combined_options, the empty options hash allows for customizations to
        # merge with the kit_base_default_options and combined_html_options.
    # escape - set to true, this allows for HTML-escape.
    # block - an optional block for content inside the tag.
    # The return is a HTML tag that includes any provided customizations. If nothing is specified in kit.html.erb, the default shape is:
        # :div,
        # aria: object.aria,
        # class: object.classname,
        # data: object.data,
        # id: object.id,
        # **combined_html_options
    # rubocop:enable Layout/CommentIndentation

    # rubocop:disable Style/OptionalBooleanParameter
    def pb_content_tag(name = :div, content_or_options_with_block = {}, options = {}, escape = true, &block)
      combined_options = options
                         .merge(combined_html_options)
                         .merge(kit_base_default_options.merge(content_or_options_with_block))
      content_tag(name, combined_options, options, escape, &block)
    end
    # rubocop:enable Style/OptionalBooleanParameter

    def combined_html_options
      merged = default_html_options.dup

      html_options.each do |key, value|
        if key == :style && value.is_a?(Hash)
          # Convert style hash to CSS string
          merged[:style] = value.map { |k, v| "#{k.to_s.tr('_', '-')}: #{v}" }.join("; ")
        else
          merged[key] = value
        end
      end

      inline_styles = dynamic_inline_props
      if inline_styles.present?
        merged[:style] = merged[:style].present? ? "#{merged[:style]}; #{inline_styles}" : inline_styles
      end

      merged.deep_merge(data_attributes)
    end

    # Custom react_component helper to replace Webpacker React
    def react_component(component_name, props = {}, html_options = {})
      # Convert props to JSON for the data attribute
      props_json = props.to_json

      # Build the HTML attributes
      html_attrs = {
        "data-react-component" => component_name,
        "data-react-props" => props_json,
      }

      # Merge with any additional HTML options
      html_attrs.merge!(html_options)

      # Return the div element
      content_tag(:div, "", html_attrs)
    end

    def global_inline_props
      {
        height: height,
        min_height: min_height,
        max_height: max_height,
      }.compact
    end

  private

    def kit_base_default_options
      options = {
        id: id,
        data: data,
        class: classname,
        aria: aria,
      }

      inline_styles = dynamic_inline_props
      options[:style] = inline_styles if inline_styles.present? && !html_options.key?(:style)

      options
    end

    def default_html_options
      {}
    end

    def data_attributes
      {
        data: data,
        aria: aria,
      }.transform_keys { |key| key.to_s.tr("_", "-").to_sym }
    end

    def dynamic_inline_props
      styles = global_inline_props.map { |key, value| "#{key.to_s.tr('_', '-')}: #{value}" if inline_validator(key, value) }.compact
      styles.join("; ").presence
    end

    def inline_validator(key, value)
      return false if value.nil?
      return false if height_values.include?(value) && key == :height
      return false if min_height_values.include?(value) && key == :min_height
      return false if max_height_values.include?(value) && key == :max_height

      true
    end
  end
end
