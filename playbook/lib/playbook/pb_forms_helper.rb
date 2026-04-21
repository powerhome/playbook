# frozen_string_literal: true

require_relative "pb_forms_global_props_helper"

module Playbook
  module PbFormsHelper
    include Playbook::PbFormsGlobalPropsHelper
    # Renders a pb form with ::Playbook::Forms::Builder, that can render
    # Playbook kits in the most railsie way.
    #
    # I.e.:
    #
    #   pb_form_with model: @user do |f|
    #     f.text_field :name
    #   end
    #
    # The form can also validate the fields, and trigger the validation automatically:
    #
    # I.e.:
    #
    #   pb_form_with model: @user, validate: true do |f|
    #     f.text_field :name, required: true
    #   end
    #
    # @param data [Hash] hash of data attributes
    # @param validate [Boolean] whether validation should be triggered or not
    # @see [#form_with] for other options
    def pb_form_with(data: {}, validate: false, loading: false, **kwargs, &block)
      global_props, form_options = extract_all_props(kwargs)

      # Handle nil model to avoid Rails 8.0 deprecation warning
      form_options[:model] = false if form_options.key?(:model) && form_options[:model].nil?

      classnames = ["pb-form"]
      classnames << form_options[:class] if form_options[:class].present?
      classnames << "pb_form_loading" if loading
      classnames.concat(generate_prop_classes(global_props))

      data = data.merge("pb-form-validation" => validate)

      options = form_options.merge(
        class: classnames.compact.join(" "),
        data: data,
        builder: ::Playbook::Forms::Builder
      )

      capture do
        concat form_with(**options, &block)
        concat javascript_tag(<<~JS)
          (function() {
            // PbFormValidation is registered with PbKitRegistry and starts automatically
            // when the playbook-rails bundle loads. The MutationObserver in PbKitRegistry
            // handles dynamically added forms (including Turbo navigations).
            // This inline script ensures formHelper runs for this form.
            var initForm = function() {
              if (typeof formHelper === 'function') {
                formHelper();
              }
            };

            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', initForm, { once: true });
            } else {
              initForm();
            }
          })();
        JS
      end
    end
  end
end
