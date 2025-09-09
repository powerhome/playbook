# frozen_string_literal: true

require "rails_helper"

RSpec.describe Playbook::PbFormsHelper, type: :helper do
  before { helper.extend(Playbook::PbKitHelper) }

  let(:form_body) do
    ->(builder) do
      concat builder.text_field :name
      concat builder.actions(&:submit)
    end
  end

  subject { helper.pb_form_with(url: "http://example.org", scope: :example, validate: true, &form_body) }

  it { is_expected.to have_tag("form[action='http://example.org']") }
  it { is_expected.to have_tag("form > .pb_text_input_kit input[name='example[name]'][type=text]") }
  it { is_expected.to have_tag("form > ol.pb-form-actions > li > button.pb_button_kit.pb_button_primary.pb_button_inline.pb_button_enabled[type=submit]") }

  context "with validations" do
    subject { helper.pb_form_with(url: "http://example.org", scope: :example, validate: true, &form_body) }

    it { is_expected.to have_tag("form[data-pb-form-validation=true]") }

    it "renders the javascript" do
      subject

      expect(helper.content_for(:pb_js)).to match(/window.addEventListener\("DOMContentLoaded", function\(\) \{ PbFormValidation.start\(\) \}\)/)
    end
  end

  context "without validations" do
    subject { helper.pb_form_with(url: "http://example.org", scope: :example, validate: false, &form_body) }

    it { is_expected.to have_tag("form[data-pb-form-validation=false]") }
  end
end
