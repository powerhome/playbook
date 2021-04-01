# frozen_string_literal: true

module Playbook
  module PbForm
    class Form < ::Playbook::KitBase
      prop :form_system, deprecated: "Playbook only supports form_with",
                         type: Playbook::Props::Base
      prop :form_system_options, deprecated: "Use options instead",
                                 type: Playbook::Props::Base
      prop :options, type: Playbook::Props::Base
      prop :validate, type: Playbook::Props::Boolean, default: false

      def data
        prop(:data).merge("pb-form-validation" => validate)
      end

      def form_options
        {
          id: id,
          aria: aria,
          class: classname,
          data: data,
          builder: ::Playbook::PbForm::FormBuilder,
        }.merge(options)
      end

      def options
        prop(:options) || prop(:form_system_options) || { }
      end

      def render_form(builder)
        view_context.capture(builder, &children)
      end

      def classname
        [generate_classname("pb-form"), options[:class]].join(" ")
      end

      def render_in(view_context, &_block)
        super(view_context, &nil)
      end
    end
  end
end
