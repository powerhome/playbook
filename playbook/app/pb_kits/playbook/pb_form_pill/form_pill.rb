# frozen_string_literal: true

module Playbook
  module PbFormPill
    class FormPill < Playbook::KitBase
      prop :avatar_url
      prop :name
      prop :text

      def classname
        generate_classname("pb_form_pill_kit", "primary", name, text)
      end

      def display_text
        name.downcase
      end
    end
  end
end
