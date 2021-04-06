# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_passphrase/passphrase"

RSpec.describe Playbook::PbPassphrase::Passphrase do
  subject { Playbook::PbPassphrase::Passphrase }

  it { is_expected.to define_prop(:average_threshold) }
  it { is_expected.to define_prop(:confirmation).with_default(false) }
  it { is_expected.to define_prop(:input_props).with_default({}) }
  it { is_expected.to define_prop(:label) }
  it { is_expected.to define_prop(:min_length) }
  it { is_expected.to define_prop(:show_tips_below) }
  it { is_expected.to define_prop(:strong_threshold) }
  it { is_expected.to define_prop(:tips).with_default([]) }

  describe "passphrase_options" do
    it "returns base props", :aggregate_failures do
      base_example = subject.new
      expect(base_example.passphrase_options[:uncontrolled]).to be true
      expect(base_example.passphrase_options[:confirmation]).to be false
    end

    it "passes the props given along" do
      custom_example = subject.new(
        average_threshold: 1,
        dark: true,
        id: "some-id",
        label: "A Label",
        min_length: 8,
        show_tips_below: "lg",
        strong_threshold: 4,
        tips: ["some tips to show"]
      )

      expect(custom_example.passphrase_options[:averageThreshold]).to be 1
      expect(custom_example.passphrase_options[:confirmation]).to be false
      expect(custom_example.passphrase_options[:dark]).to be true
      expect(custom_example.passphrase_options[:id]).to be "some-id"
      expect(custom_example.passphrase_options[:label]).to be "A Label"
      expect(custom_example.passphrase_options[:minLength]).to be 8
      expect(custom_example.passphrase_options[:showTipsBelow]).to be "lg"
      expect(custom_example.passphrase_options[:strongThreshold]).to be 4
      expect(custom_example.passphrase_options[:tips]).to eq ["some tips to show"]

      expect(custom_example.passphrase_options[:input_props]).to be nil
    end
  end
end
