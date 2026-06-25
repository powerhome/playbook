# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_passphrase/passphrase"

RSpec.describe Playbook::PbPassphrase::Passphrase do
  subject { Playbook::PbPassphrase::Passphrase }

  it { is_expected.to define_prop(:input_props).with_default({}) }
  it { is_expected.to define_prop(:label) }
  it { is_expected.to define_prop(:required_indicator).with_default(false) }
  it { is_expected.to define_prop(:required).with_default(false) }
  it { is_expected.to define_prop(:show_tips_below) }
  it { is_expected.to define_prop(:tips).with_default([]) }

  describe "display_label" do
    it "defaults to Passphrase" do
      expect(subject.new.display_label).to eq "Passphrase"
    end

    it "defaults to Confirm Passphrase when confirmation is true" do
      expect(subject.new(confirmation: true).display_label).to eq "Confirm Passphrase"
    end

    it "uses a custom label when provided" do
      expect(subject.new(label: "New Passphrase").display_label).to eq "New Passphrase"
    end
  end

  describe "show_tips?" do
    it "is false for confirmation fields" do
      kit = subject.new(confirmation: true, tips: ["tip"])
      expect(kit.show_tips?).to be false
    end

    it "is true when tips are present on the primary field" do
      kit = subject.new(tips: ["tip"])
      expect(kit.show_tips?).to be true
    end
  end

  describe "text_input_props" do
    it "merges input props and min_length", :aggregate_failures do
      kit = subject.new(
        input_props: { id: "passphrase", name: "passphrase", data: { passphrase: true } },
        min_length: 12,
        required: true,
        value: "secret"
      )

      props = kit.text_input_props
      expect(props[:required]).to be true
      expect(props[:value]).to eq "secret"
      expect(props[:input_options][:id]).to eq "passphrase"
      expect(props[:input_options][:minlength]).to eq 12
      expect(props[:data].with_indifferent_access[:passphrase]).to be true
      expect(props[:input_options][:data]).to be_nil
    end
  end

  describe "passphrase_options" do
    it "returns base props for legacy react serialization", :aggregate_failures do
      base_example = subject.new
      expect(base_example.passphrase_options[:uncontrolled]).to be true
      expect(base_example.passphrase_options[:confirmation]).to be false
    end
  end
end
