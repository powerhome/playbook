# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_phone_number_input/phone_number_input"

RSpec.describe Playbook::PbPhoneNumberInput do
  subject { Playbook::PbPhoneNumberInput::PhoneNumberInput }

  it { is_expected.to define_boolean_prop(:disabled).with_default(false) }
  it { is_expected.to define_boolean_prop(:dark).with_default(false) }
  it { is_expected.to define_boolean_prop(:required).with_default(false) }
  it { is_expected.to define_prop(:initial_country).with_default("") }
  it { is_expected.to define_prop(:label).with_default("") }
  it { is_expected.to define_prop(:name).with_default("") }
  it { is_expected.to define_array_prop(:only_countries).with_default([]) }
  it { is_expected.to define_array_prop(:exclude_countries).with_default([]) }
  it { is_expected.to define_array_prop(:preferred_countries).with_default([]) }
  it { is_expected.to define_prop(:error).with_default("") }
  it { is_expected.to define_prop(:value).with_default("") }
  it { is_expected.to define_boolean_prop(:format_as_you_type).with_default(false) }
  it { is_expected.to define_boolean_prop(:strict_mode).with_default(false) }
  it { is_expected.to define_boolean_prop(:hidden_inputs).with_default(false) }
  it { is_expected.to define_boolean_prop(:country_search).with_default(false) }
  it { is_expected.to define_boolean_prop(:required_indicator).with_default(false) }
  it { is_expected.to define_boolean_prop(:show_placeholder).with_default(false) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      classname = "pb_phone_number_input"
      expect(subject.new({}).classname).to eq classname
      expect(subject.new(classname: "additional_class").classname).to eq "#{classname} additional_class"
    end
  end

  describe "#data" do
    it "includes enhanced element attributes and JSON config" do
      example = subject.new(
        data: { testid: "phone" },
        initial_country: "us",
        required: true
      )

      expect(example.data[:pb_phone_number_input]).to be true
      expect(example.data[:testid]).to eq "phone"

      config = JSON.parse(example.data[:pb_phone_number_input_config])
      expect(config["initialCountry"]).to eq "us"
      expect(config["required"]).to be true
    end
  end

  describe "#phone_number_input_config" do
    it "passes required_indicator as a defined prop and country lists to javascript" do
      example = subject.new(
        exclude_countries: ["us"],
        hidden_inputs: true,
        only_countries: %w[br gb],
        required_indicator: true,
        show_placeholder: true
      )

      expect(example.required_indicator).to be true
      expect(example.phone_number_input_config[:hiddenInputs]).to be true
      expect(example.phone_number_input_config[:showPlaceholder]).to be true
      expect(example.phone_number_input_config[:excludeCountries]).to eq ["us"]
      expect(example.phone_number_input_config[:onlyCountries]).to eq %w[br gb]
    end
  end
end
