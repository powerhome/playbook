# frozen_string_literal: true

# require_dependency "app/pb_kits/playbook/pb_form/form_builder"

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

      def options
        { url: "" }.merge(Hash(prop(:options)))
      end

      def classname
        [generate_classname("pb-form"), options[:class]].join(" ")
      end

      def form_builder
        ::Playbook::PbForm::FormWith::FormBuilder
      end

      def render_in(view_context, &_block)
        super(view_context, &nil)
      end
    end
  end
end
