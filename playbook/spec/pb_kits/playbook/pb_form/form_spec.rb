# frozen_string_literal: true

require "rails_helper"

RSpec.describe Playbook::PbForm::Form do
  describe "#form_options" do
    it "allows the user to set the URL" do
      model = double
      kit = ::Playbook::PbForm::Form.new(options: { model: model, url: "http://example.org" })

      expect(kit.form_options).to include(url: "http://example.org", model: model)
    end

    it "allows the user to not set a URL" do
      model = double
      kit = ::Playbook::PbForm::Form.new(options: { model: model })

      expect(kit.form_options).to_not have_key(:url)
    end

    it "adds pb-form to the form_with `class` option" do
      view_object = Playbook::PbForm::Form.new(options: { class: "example-class-option" })

      expect(view_object.form_options).to include(class: "example-class-option")
    end
  end
end
