# frozen_string_literal: true

module Playbook
  module PbForm
    class FormBuilder < ::ActionView::Helpers::FormBuilder
      prepend(FormFieldBuilder.new(:email_field, kit_name: "text_input"))
      prepend(FormFieldBuilder.new(:number_field, kit_name: "text_input"))
      prepend(FormFieldBuilder.new(:search_field, kit_name: "text_input"))
      prepend(FormFieldBuilder.new(:telephone_field, kit_name: "text_input"))
      prepend(FormFieldBuilder.new(:text_field, kit_name: "text_input"))
      prepend(FormFieldBuilder.new(:password_field, kit_name: "text_input"))
      prepend(FormFieldBuilder.new(:url_field, kit_name: "text_input"))
      prepend(FormFieldBuilder.new(:text_area, kit_name: "textarea"))
      prepend(TypeaheadField)
      prepend(SelectField)
      prepend(CollectionSelectField)
      prepend(CheckboxField)
      prepend(DatePickerField)

      def actions
        @template.send(:view_context).content_tag :ol, class: "pb-form-actions" do
          yield ActionArea.new(@template, submit_default_value)
        end
      end
    end
  end
end
