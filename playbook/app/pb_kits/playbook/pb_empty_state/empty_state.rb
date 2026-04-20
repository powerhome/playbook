# frozen_string_literal: true

require "base64"

module Playbook
  module PbEmptyState
    class EmptyState < Playbook::KitBase
      prop :alignment, type: Playbook::Props::Enum,
                       values: %w[center left right],
                       default: "center"
      prop :description
      prop :header
      prop :image
      prop :link_button
      prop :link_button_url
      prop :orientation, type: Playbook::Props::Enum,
                         values: %w[horizontal vertical],
                         default: "vertical"
      prop :primary_button
      prop :primary_button_url
      prop :size, type: Playbook::Props::Enum,
                  values: %w[sm md lg],
                  default: "md"

      SIZE_CONFIGS = {
        sm: {
          vertical: {
            image_width: "100px",
            title_size: 4,
            title_padding: "xxs",
            description_pad: "sm",
            button_size: "sm",
            button_margin: "xs",
            scss_class: "sm-state-vertical",
            flex_direction: "column",
          },
          horizontal: {
            image_width: "100px",
            title_size: 4,
            title_padding: "xxs",
            description_pad: "sm",
            button_size: "sm",
            button_margin: "xs",
            scss_class: "sm-state-horizontal",
            flex_direction: "row",
          },
        },
        md: {
          vertical: {
            image_width: "140px",
            title_size: 3,
            title_padding: "xs",
            description_pad: "md",
            button_size: "md",
            button_margin: "sm",
            scss_class: "md-state-vertical",
            flex_direction: "column",
          },
          horizontal: {
            image_width: "140px",
            title_size: 3,
            title_padding: "xs",
            description_pad: "md",
            button_size: "md",
            button_margin: "sm",
            scss_class: "md-state-horizontal",
            flex_direction: "row",
          },
        },
        lg: {
          vertical: {
            image_width: "100%",
            title_size: 1,
            title_padding: "sm",
            description_pad: "lg",
            button_size: "md",
            button_margin: "md",
            scss_class: "lg-state-vertical",
            flex_direction: "column",
          },
          horizontal: {
            image_width: "100%",
            title_size: 2,
            title_padding: "sm",
            description_pad: "lg",
            button_size: "md",
            button_margin: "md",
            scss_class: "lg-state-horizontal",
            flex_direction: "row",
          },
        },
      }.freeze

      def classname
        generate_classname("pb_empty_state_kit")
      end

      def config
        SIZE_CONFIGS[size.to_sym][orientation.to_sym]
      end

      def default_image_data_uri
        svg_path = __dir__.then { |d| File.join(d, "docs", "default_image", "computer_fly_no_branding.svg") }
        svg      = File.read(svg_path)
        encoded  = ERB::Util.url_encode(svg)
        "data:image/svg+xml,#{encoded}"
      end

      def resolved_image_url
        case image
        when "default"
          default_image_data_uri
        when "this_is_fine"
          svg_preset_data_uri("this_is_fine.svg")
        when "travolta_lost"
          gif_preset_data_uri("travolta_lost.gif")
        when nil, ""
          nil
        else
          image
        end
      end

      def image_alt_text
        case image
        when "this_is_fine"
          "This is fine illustration"
        when "travolta_lost"
          "Confused reaction illustration"
        when "default"
          "Empty state illustration"
        else
          "Empty state image"
        end
      end

      def svg_preset_data_uri(filename)
        path = File.join(__dir__, "docs", "default_image", filename)
        svg = File.read(path)
        "data:image/svg+xml,#{ERB::Util.url_encode(svg)}"
      end

      def gif_preset_data_uri(filename)
        path = File.join(__dir__, "docs", "default_image", filename)
        binary = File.binread(path)
        b64 = Base64.strict_encode64(binary)
        "data:image/gif;base64,#{b64}"
      end

      def padding_size
        size == "sm" ? "xs" : "xl"
      end

      def flex_align
        case alignment
        when "left"
          "start"
        when "right"
          "end"
        else
          "center"
        end
      end
    end
  end
end
