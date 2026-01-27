# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_passphrase/passphrase"

RSpec.describe Playbook::PbPassphrase::Passphrase do
  subject { Playbook::PbPassphrase::Passphrase }

  it { is_expected.to define_prop(:input_props).with_default({}) }
  it { is_expected.to define_prop(:label) }
  it { is_expected.to define_prop(:required_indicator).with_default(false) }
  it { is_expected.to define_prop(:show_tips_below) }
  it { is_expected.to define_prop(:tips).with_default([]) }

  describe "passphrase_options" do
    it "returns base props", :aggregate_failures do
      base_example = subject.new
      expect(base_example.passphrase_options[:uncontrolled]).to be true
      expect(base_example.passphrase_options[:confirmation]).to be false
    end

    it "passes the props given along" do
      custom_example = subject.new(
        dark: true,
        id: "some-id",
        label: "A Label",
        required_indicator: true,
        show_tips_below: "lg",
        tips: ["some tips to show"]
      )

      expect(custom_example.passphrase_options[:dark]).to be true
      expect(custom_example.passphrase_options[:id]).to be "some-id"
      expect(custom_example.passphrase_options[:label]).to be "A Label"
      expect(custom_example.passphrase_options[:requiredIndicator]).to be true
      expect(custom_example.passphrase_options[:showTipsBelow]).to be "lg"
      expect(custom_example.passphrase_options[:tips]).to eq ["some tips to show"]

      expect(custom_example.passphrase_options[:input_props]).to be nil
    end
  end
end
