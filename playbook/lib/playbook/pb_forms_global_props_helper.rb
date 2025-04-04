# frozen_string_literal: true

module Playbook
  module PbFormsGlobalPropsHelper
  private

    def generate_prop_classes(props)
      classes = []

      props.each do |prop, value|
        next if value.nil?

        classes <<  case prop
                    when :padding
                      "p_#{value}"
                    when :padding_top
                      "pt_#{value}"
                    when :padding_bottom
                      "pb_#{value}"
                    when :padding_left
                      "pl_#{value}"
                    when :padding_right
                      "pr_#{value}"
                    when :padding_x
                      "px_#{value}"
                    when :padding_y
                      "py_#{value}"
                    when :margin
                      "m_#{value}"
                    when :margin_top
                      "mt_#{value}"
                    when :margin_bottom
                      "mb_#{value}"
                    when :margin_left
                      "ml_#{value}"
                    when :margin_right
                      "mr_#{value}"
                    when :margin_x
                      "mx_#{value}"
                    when :margin_y
                      "my_#{value}"
                    when :shadow
                      "shadow_#{value}"
                    when :width
                      value.to_s.end_with?("%") ? "width_#{value.to_i}_percent" : "width_#{value.downcase}"
                    when :min_width
                      value.to_s.end_with?("%") ? "min_width_#{value.to_i}_percent" : "min_width_#{value.downcase}"
                    when :max_width
                      value.to_s.end_with?("%") ? "max_width_#{value.to_i}_percent" : "max_width_#{value.downcase}"
                    when :height
                      "height_#{value.downcase}"
                    when :min_height
                      "min_height_#{value.downcase}"
                    when :max_height
                      "max_height_#{value.downcase}"
                    when :position
                      "position_#{value}"
                    when :vertical_alignment
                      "vertical_align_#{value}"
                    when :z_index
                      "z_index_#{value}"
                    when :line_height
                      "line_height_#{value}"
                    when :number_spacing
                      "ns_#{value}"
                    when :border_radius
                      "border_radius_#{value}"
                    when :text_size
                      "text_#{value}"
                    when :letter_spacing
                      "ls_#{value}"
                    when :display
                      "display_#{value}"
                    when :cursor
                      "cursor_#{value}"
                    when :hover
                      if value.is_a?(Hash)
                        value.map do |hover_prop, hover_value|
                          case hover_prop
                          when :shadow
                            "hover_shadow_#{hover_value}"
                          when :scale
                            "hover_scale_#{hover_value}"
                          when :underline
                            hover_value == true ? "hover_underline" : nil
                          when :color
                            "hover_color_#{hover_value}"
                          when :background
                            "hover_background_#{hover_value}"
                          end
                        end
                      else
                        "hover_#{value}"
                      end
                    when :text_align
                      "text_align_#{value}"
                    when :overflow
                      "overflow_#{value}"
                    when :overflow_x
                      "overflow_x_#{value}"
                    when :overflow_y
                      "overflow_y_#{value}"
                    when :truncate
                      "truncate_#{value}"
                    when :group_hover
                      value ? "group_hover" : nil
                    end
      end

      classes.flatten.compact
    end

    def extract_all_props(options)
      global_props = %i[
        padding padding_top padding_bottom padding_left padding_right padding_x padding_y
        margin margin_top margin_bottom margin_left margin_right margin_x margin_y
        shadow width min_width max_width height min_height max_height
        position vertical_alignment z_index line_height number_spacing
        border_radius text_size letter_spacing display cursor hover
        text_align overflow overflow_x overflow_y truncate group_hover
      ]

      props = {}
      form_opts = options.dup

      global_props.each { |prop| props[prop] = form_opts.delete(prop) if form_opts.key?(prop) }

      if form_opts[:props].is_a?(Hash)
        nested_props = form_opts.delete(:props)
        props.merge!(nested_props.slice(*global_props))
      end

      [props, form_opts]
    end
  end
end
