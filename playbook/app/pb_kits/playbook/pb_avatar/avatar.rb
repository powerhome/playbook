# frozen_string_literal: true

module Playbook
  module PbAvatar
    class Avatar < Playbook::KitBase
      prop :component_overlay
      prop :dark, type: Playbook::Props::Boolean,
                  default: false
      prop :image_url, type: Playbook::Props::String
      prop :image_alt, type: Playbook::Props::String,
                       default: ""
      prop :name, type: Playbook::Props::String,
                  default: ""
      prop :size, type: Playbook::Props::Enum,
                  values: %w[xxs xs sm md base lg xl],
                  default: "md"
      prop :status
      prop :grayscale, type: Playbook::Props::Boolean,
                       default: false

      def initials
        name.split.map(&:first).join.downcase
      end

      def classname
        generate_classname("pb_avatar_kit", "size_#{size}")
      end

      def online_status_props
        props = {
          dark: dark,
          status: status,
          size: online_status_size,
          position: "absolute",
          right: online_status_right_position,
        }

        case size
        when "xxs", "xs", "sm"
          props[:top] = { value: "0", inset: true }
        else
          props[:bottom] = { value: "0", inset: true }
        end

        props
      end

      def alt_text
        image_alt.present? ? image_alt : name
      end

      def handle_img_error
        "this.style.display = 'none'"
      end

      def overlay_component
        component_overlay && component_overlay[:component]
      end

      def specific_placement_style
        placement = component_overlay[:placement] if component_overlay
        placement_mapping[size][placement]
      end

    private

      def placement_mapping
        xs_styles = placement_styles("xs")
        {
          "xxs" => xs_styles,
          "xs" => xs_styles,
          "sm" => placement_styles("xs"),
          "md" => placement_styles("0"),
          "lg" => placement_styles("0"),
          "xl" => placement_styles({ value: "xxs", inset: true }),
        }
      end

      def online_status_size
        case size
        when "xxs", "xs"
          "sm"
        when "sm", "md"
          "md"
        when "lg", "xl"
          "lg"
        else
          "sm"
        end
      end

      def online_status_right_position
        case size
        when "xxs", "xs", "sm"
          "xxs"
        when "md"
          { value: "xxs", inset: true }
        when "lg"
          { value: "xs", inset: true }
        when "xl"
          { value: "sm", inset: true }
        end
      end

      def placement_styles(offset)
        top_bottom_offset = if offset == "xs"
                              "xs"
                            elsif offset == { value: "xxs", inset: true }
                              { value: "xxs", inset: true }
                            else
                              "0"
                            end

        {
          "top-right" => { top: top_bottom_offset, right: offset },
          "bottom-left" => { bottom: top_bottom_offset, left: offset },
          "top-left" => { top: top_bottom_offset, left: offset },
          "bottom-right" => { bottom: top_bottom_offset, right: offset },
          "bottom-center" => { bottom: "xs", classname: "overlay_bottom_center" },
          "top-center" => { top: "xs", classname: "overlay_top_center" },
          "left-center" => { left: "sm", classname: "overlay_left_center" },
          "right-center" => { right: "sm", classname: "overlay_right_center" },
        }
      end
    end
  end
end
