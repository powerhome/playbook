# frozen_string_literal: true

module Playbook
  module PbForm
    module FormBuilder
      extend ActiveSupport::Concern

      included do
        prepend(FormFieldBuilder.new(:email_field, kit_name: "text_input"))
        prepend(FormFieldBuilder.new(:number_field, kit_name: "text_input"))
        prepend(FormFieldBuilder.new(:search_field, kit_name: "text_input"))
        prepend(FormFieldBuilder.new(:telephone_field, kit_name: "text_input"))
        prepend(FormFieldBuilder.new(:text_field, kit_name: "text_input"))
        prepend(FormFieldBuilder.new(:password_field, kit_name: "text_input"))
        prepend(FormFieldBuilder.new(:url_field, kit_name: "text_input"))
        prepend(FormFieldBuilder.new(:text_area, kit_name: "textarea"))
        prepend(SelectField)
        prepend(CollectionSelectField)

        def actions(&block)
          ActionArea.new(self).wrapper(&block)
        end
      end
    end
  end
end
