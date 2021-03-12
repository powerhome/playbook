# frozen_string_literal: true

module Playbook
  module PbForm
    class FormWith < Playbook::KitBase
      class FormBuilder < ::ActionView::Helpers::FormBuilder
        include ::Playbook::PbForm::FormBuilder
      end

      prop :options, type: Playbook::Props::Hash, default: {}
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
          builder: ::Playbook::PbForm::FormWith::FormBuilder,
        }.merge(options)
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
