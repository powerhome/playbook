# frozen_string_literal: true

require "rails_helper"

RSpec.describe Playbook::PbForm::FormWith do
  describe "#form_options" do
    it "allows the user to set the URL" do
      model = double
      kit = ::Playbook::PbForm::FormWith.new(options: { model: model, url: "http://example.org" })

      expect(kit.form_options).to include(url: "http://example.org", model: model)
    end

    it "allows the user to not set a URL" do
      model = double
      kit = ::Playbook::PbForm::FormWith.new(options: { model: model })

      expect(kit.form_options).to_not have_key(:url)
    end
  end
end
