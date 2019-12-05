# frozen_string_literal: true

# require_dependency "app/pb_kits/playbook/pb_form/form_builder"

module Playbook
  module PbForm
    class Form
      include Playbook::Props

      clear_props
      prop :form_system, type: Playbook::Props::Enum,
                         values: %w[form_with simple_form],
                         default: "form_with"
      prop :form_system_options, type: Playbook::Props::Base
      prop :children, type: Playbook::Props::Proc

      delegate :to_partial_path, to: :specific_form
      delegate :merged_form_system_options, to: :specific_form
      delegate :form_builder, to: :specific_form

    private

      def specific_form
        @specific_form ||= "#{self.class}::#{form_system.classify}Form".constantize.new(self)
      end
    end
  end
end
