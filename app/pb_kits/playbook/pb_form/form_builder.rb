# frozen_string_literal: true

module Playbook
  module PbForm
    module FormBuilder
      extend ActiveSupport::Concern

      included do
        prepend(TextInputBuilder.new(:email_field))
        prepend(TextInputBuilder.new(:number_field))
        prepend(TextInputBuilder.new(:search_field))
        prepend(TextInputBuilder.new(:telephone_field))
        prepend(TextInputBuilder.new(:text_field))
        prepend(TextInputBuilder.new(:password_field))
        prepend(TextInputBuilder.new(:url_field))

        def actions(&block)
          ActionArea.new(self).wrapper(&block)
        end
      end
    end
  end
end
