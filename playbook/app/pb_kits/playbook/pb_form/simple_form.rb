# frozen_string_literal: true

if defined?(SimpleForm)
module Playbook
  module PbForm
    class SimpleForm < Playbook::KitBase
      class FormBuilder < ::SimpleForm::FormBuilder
        include ::Playbook::PbForm::FormBuilder

        def input(attribute_name, options = {}, &block)
          super(
            attribute_name,
            options.deep_merge(label: false, input_html: {
                            props: {
                              label: true,
                            },
                          }),
            &block
          )
        end
      end

      prop :options, type: Playbook::Props::Hash, default: {}
      prop :validate, type: Playbook::Props::Boolean, default: false

      def options
        {
          builder: Playbook::PbForm::SimpleForm::FormBuilder,
          html: html_options,
          url: "",
        }.merge(prop(:options))
      end

      def model
        prop(:options).fetch(:model, nil)
      end

      def data
        prop(:data).merge("pb-form-validation" => validate)
      end

      def classname
        [generate_classname("pb-form"), html[:class]].join(" ")
      end

      def html
        prop(:options).fetch(:html, {})
      end

      def render_in(view_context, &_block)
        super(view_context, &nil)
      end

    private

      def html_options
        html.merge(class: classname)
      end
    end
  end
end
end