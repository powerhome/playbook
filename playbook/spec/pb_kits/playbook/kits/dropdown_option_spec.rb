# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_dropdown/dropdown_option"

RSpec.describe Playbook::PbDropdown::DropdownOption do
  subject { described_class }

  it { is_expected.to define_hash_prop(:option) }
  it { is_expected.to define_string_prop(:id) }

  describe "#classname" do
    it "adds a standalone disabled class when the option is disabled" do
      option = subject.new(option: { id: "disabled-option", label: "Disabled", value: "disabled", disabled: true })

      expect(option.classname).to eq("pb_dropdown_option_list disabled")
    end
  end

  describe "#data" do
    it "exposes disabled state for the Rails dropdown javascript" do
      option = subject.new(option: { id: "disabled-option", label: "Disabled", value: "disabled", disabled: true })

      expect(option.data).to include(dropdown_option_disabled: true)
      expect(option.data).to include(dropdown_option_label: { id: "disabled-option", label: "Disabled", value: "disabled", disabled: true })
    end
  end

  describe "#option_wrapper_class" do
    it "marks custom child content as disabled" do
      option = subject.new(option: { id: "disabled-option", label: "Disabled", value: "disabled", disabled: true })

      expect(option.option_wrapper_class).to eq("dropdown_option_wrapper disabled")
    end
  end
end
