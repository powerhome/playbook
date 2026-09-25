# frozen_string_literal: true

module Playbook
  module Forms
    class Builder < ::ActionView::Helpers::FormBuilder
      require_relative "builder/action_area"
      require_relative "builder/checkbox_field"
      require_relative "builder/collection_select_field"
      require_relative "builder/date_picker_field"
      require_relative "builder/dropdown_field"
      require_relative "builder/form_field_builder"
      require_relative "builder/select_field"
      require_relative "builder/intl_telephone_field"
      require_relative "builder/multi_level_select_field"
      require_relative "builder/phone_number_field"
      require_relative "builder/star_rating_field"
      require_relative "builder/time_zone_select_field"
      require_relative "builder/time_picker_field"
      require_relative "builder/typeahead_field"

      prepend(FormFieldBuilder.new(:email_field, kit_name: "text_input"))
      prepend(FormFieldBuilder.new(:number_field, kit_name: "text_input"))
      prepend(FormFieldBuilder.new(:search_field, kit_name: "text_input"))
      prepend(FormFieldBuilder.new(:telephone_field, kit_name: "text_input"))
      prepend(FormFieldBuilder.new(:text_field, kit_name: "text_input"))
      prepend(FormFieldBuilder.new(:password_field, kit_name: "text_input"))
      prepend(FormFieldBuilder.new(:url_field, kit_name: "text_input"))
      prepend(FormFieldBuilder.new(:text_area, kit_name: "textarea"))

      def actions
        context = @template.respond_to?(:view_context) ? @template.view_context : @template
        context.content_tag :ol, class: "pb-form-actions" do
          yield ActionArea.new(@template, submit_default_value)
        end
      end

    private

      # Kits apply `input_options` when they build the control. Form-built
      # controls are rendered by Rails, so ensure the same options are merged here.
      def merge_input_options(options, input_options)
        input_options = Hash(input_options)
        return options unless input_options.present?

        options = options.dup
        options[:class] = [options[:class], input_options[:classname]].compact.join(" ").strip if input_options[:classname].present?
        options[:data] = (options[:data] || {}).merge(input_options[:data]) if input_options[:data].present?
        options.merge(input_options.except(:class, :classname, :data))
      end
    end
  end
end
