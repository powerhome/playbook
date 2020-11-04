# frozen_string_literal: true

require "rails_helper"

RSpec.describe Playbook::PbForm::Form do
  describe "#to_partial_path" do
    it "is a form with variant by default" do
      view_object = described_class.new
      expect(view_object.to_partial_path).to eq("pb_form/form_form_with")
    end

    it "is a form with variant when `form_system` is `form_with`" do
      view_object = described_class.new(form_system: "form_with")

      expect(view_object.to_partial_path).to eq("pb_form/form_form_with")
    end

    it "is a simple form variant when simple form is loaded and the `form_system` is `simple_form` " do
      load_simple_form
      view_object = described_class.new(form_system: "simple_form")

      expect(view_object.to_partial_path).to eq("pb_form/form_simple_form")
    end
  end

  describe "#merged_form_system_options" do
    it "adds pb-form to the form_with `class` option" do
      view_object = described_class.new(form_system_options: { class: "example-class-option" })

      expect(view_object.merged_form_system_options).to include(class: "pb-form example-class-option")
    end

    it "sets builder to `FormBuilder::FormWithFormBuilder` when `form_system` is `form_with`" do
      view_object = described_class.new

      expect(view_object.merged_form_system_options).to include(builder: Playbook::PbForm::FormBuilder::FormWithFormBuilder)
    end

    it "adds pb-form to the simple_form `class` option" do
      load_simple_form
      view_object = described_class.new(
        form_system: "simple_form",
        form_system_options: [nil, { html: { class: "example-class-option" } }]
      )

      expect(view_object.merged_form_system_options[1]).to include(html: { class: "pb-form example-class-option" })
    end

    it "sets builder to `FormBuilder::SimpleFormBuilder` when `form_system` is `simple_form`" do
      load_simple_form
      view_object = described_class.new(form_system: "simple_form")

      expect(view_object.merged_form_system_options[1]).to include(builder: Playbook::PbForm::FormBuilder::SimpleFormBuilder)
    end
  end

  def unload_simple_form
    hide_const("SimpleForm")
  end

  def load_simple_form
    stub_const("SimpleForm", Module.new)
    stub_const("SimpleForm::FormBuilder", Class.new)
  end
end
