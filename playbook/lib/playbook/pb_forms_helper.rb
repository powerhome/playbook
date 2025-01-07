# frozen_string_literal: true

module Playbook
  module PbFormsHelper
    # Renders a pb form with ::Playbook::Forms::Builder, that can render
    # Playbook kits in the most railsie way.
    #
    # I.e.:
    #
    #   pb_form_with model: @user do |f|
    #     f.text_field :name
    #   end
    #
    # The form can also validate the fields, and trigger the validation automatically:
    #
    # I.e.:
    #
    #   pb_form_with model: @user, validate: true do |f|
    #     f.text_field :name, required: true
    #   end
    #
    # @param data [Hash] hash of data attributes
    # @param validate [Boolean] whether validation should be triggered or not
    # @see [#form_with] for other options
    def pb_form_with(data: {}, validate: false, loading: false, **kwargs, &block)
      global_props, flex_props, form_options = extract_all_props(kwargs)

      base_class = "pb-form"

      unless flex_props.empty?
        flex_props.each do |prop, value|
          next if value.nil?

          class_suffix =  case prop
                          when :justify
                            "_justify_#{value}" if %w[none start end center around between evenly].include?(value.to_s)
                          when :inline
                            "_inline" if value == true
                          when :orientation
                            "_orientation_#{value}" if %w[row column].include?(value.to_s)
                          when :spacing
                            "_spacing_#{value}" if %w[none around evenly between].include?(value.to_s)
                          when :gap
                            "_gap_#{value}" if %w[xxs xs sm md lg xl none].include?(value.to_s.downcase)
                          when :row_gap
                            "_row_gap_#{value}" if %w[xxs xs sm md lg xl none].include?(value.to_s.downcase)
                          when :column_gap
                            "_column_gap_#{value}" if %w[xxs xs sm md lg xl none].include?(value.to_s.downcase)
                          when :reverse
                            "_reverse" if value == true
                          when :align, :align_items
                            "_align_items_#{value}" if %w[start center end stretch baseline none].include?(value.to_s)
                          when :align_self
                            "_align_self_#{value}" if %w[start center end stretch none].include?(value.to_s)
                          when :wrap
                            "_wrap" if value == true
                          end

          base_class = "#{base_class}#{class_suffix}" if class_suffix
        end
      end

      base_class = "#{base_class} "

      classnames = [base_class]
      classnames << form_options[:class] if form_options[:class].present?
      classnames << "pb_form_loading" if loading

      classnames.concat(generate_prop_classes(global_props))

      data = data.merge("pb-form-validation" => validate)

      options = form_options.merge(
        class: classnames.compact.join(" "),
        data: data,
        builder: ::Playbook::Forms::Builder
      )

      content_for(:pb_js, javascript_tag(<<~JS))
        window.addEventListener("DOMContentLoaded", function() { PbFormValidation.start() })
        window.addEventListener("DOMContentLoaded", () => formHelper())
      JS

      form_with(**options, &block)
    end

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

      flex_props = %i[
        justify inline orientation spacing gap row_gap column_gap
        reverse align align_items align_self wrap
      ]

      props = {}
      flex_props_values = {}
      form_opts = options.dup

      global_props.each { |prop| props[prop] = form_opts.delete(prop) if form_opts.key?(prop) }
      flex_props.each { |prop| flex_props_values[prop] = form_opts.delete(prop) if form_opts.key?(prop) }

      if form_opts[:props].is_a?(Hash)
        nested_props = form_opts.delete(:props)
        props.merge!(nested_props.slice(*global_props))
        flex_props_values.merge!(nested_props.slice(*flex_props))
      end

      [props, flex_props_values, form_opts]
    end
  end
end
