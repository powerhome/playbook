# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_phone_number_input/phone_number_input"

RSpec.describe Playbook::PbPhoneNumberInput do
  subject { Playbook::PbPhoneNumberInput::PhoneNumberInput }

  it { is_expected.to define_boolean_prop(:disabled).with_default(false) }
  it { is_expected.to define_boolean_prop(:required).with_default(false) }
  it { is_expected.to define_prop(:initial_country).with_default("") }
  it { is_expected.to define_prop(:label).with_default("") }
  it { is_expected.to define_prop(:name).with_default("") }
  it { is_expected.to define_array_prop(:only_countries).with_default([]) }
  it { is_expected.to define_array_prop(:preferred_countries).with_default([]) }
  it { is_expected.to define_prop(:error).with_default("") }
  it { is_expected.to define_prop(:value).with_default("") }
  it { is_expected.to define_boolean_prop(:format_as_you_type).with_default(false) }
  it { is_expected.to define_boolean_prop(:strict_mode).with_default(false) }
  it { is_expected.to define_boolean_prop(:country_search).with_default(false) }
  it { is_expected.to define_boolean_prop(:required_indicator).with_default(false) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      classname = "pb_phone_number_input"
      expect(subject.new({}).classname).to eq classname
      expect(subject.new(classname: "additional_class").classname).to eq "#{classname} additional_class"
    end
  end

  describe "phone_number_input_options" do
    it "passes required_indicator as requiredIndicator to javascript" do
      example = subject.new(required_indicator: true)
      expect(example.phone_number_input_options[:requiredIndicator]).to be true
    end
  end
end
