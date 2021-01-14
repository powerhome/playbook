# frozen_string_literal: true

require "rails_helper"

RSpec.describe Playbook::PbForm::Form do
  describe "#form_system_options" do
    it "adds pb-form to the form_with `class` option" do
      view_object = Playbook::PbForm::Form.new(form_system_options: { class: "example-class-option" })

      expect(view_object.form_system_options).to include(class: "example-class-option")
    end

    it "adds pb-form to the simple_form `class` option" do
      model = double
      view_object = Playbook::PbForm::Form.new(
        form_system: "simple_form",
        form_system_options: [model, { html: { class: "example-class-option" } }]
      )

      expect(view_object.form_system_options).to include(html: { class: "example-class-option" }, model: model)
    end
  end
end
