# frozen_string_literal: true

module Playbook
  module PbFormsHelper
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
    def pb_form_with(data: {}, validate: false, **kwargs, &block)
      data = data.merge("pb-form-validation" => validate)
      classname = ["pb-form", kwargs[:class]].join(" ")
      options = kwargs.merge(
        class: classname,
        data: data,
        builder: ::Playbook::Forms::Builder
      )

      content_for(:pb_js, javascript_tag(<<~JS))
        window.addEventListener("DOMContentLoaded", function() { PbFormValidation.start() })
      JS

      form_with(**options, &block)
    end
  end
end
