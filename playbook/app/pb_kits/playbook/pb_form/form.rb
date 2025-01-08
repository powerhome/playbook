# frozen_string_literal: true

module Playbook
  module PbForm
    class Form < ::Playbook::KitBase
      prop :form_system, deprecated: "Playbook only supports form_with and this prop is ignored",
                         type: Playbook::Props::Base
      prop :form_system_options, deprecated: "Use options instead",
                                 type: Playbook::Props::Base
      prop :loading, type: Playbook::Props::Boolean, default: false
      prop :options, type: Playbook::Props::Base
      prop :validate, type: Playbook::Props::Boolean, default: false

      def render_in(view_context, &block)
        view_context.pb_form_with(**form_options, &block)
      end

    private

      def form_options
        {
          id: id,
          aria: aria,
          class: classname,
          data: data,
          loading: loading,
          validate: validate,
        }.merge(prop(:options) || prop(:form_system_options) || {})
      end
    end
  end
end
