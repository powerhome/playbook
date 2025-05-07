# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_dropdown/dropdown"

RSpec.describe Playbook::PbDropdown::Dropdown do
  subject { Playbook::PbDropdown::Dropdown }

  it { is_expected.to define_array_prop(:options).with_default([]) }
  it { is_expected.to define_string_prop(:label) }
  it { is_expected.to define_string_prop(:name) }
  it { is_expected.to define_boolean_prop(:required).with_default(false) }
  it { is_expected.to define_string_prop(:blank_selection).with_default("") }
  it { is_expected.to define_enum_prop(:variant).with_values("default", "subtle").with_default("default") }
  it { is_expected.to define_boolean_prop(:separators).with_default(true) }
  it { is_expected.to define_string_prop(:default_value) }
  it { is_expected.to define_boolean_prop(:autocomplete) }
  it { is_expected.to define_boolean_prop(:searchbar) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_dropdown_default"
      expect(subject.new(dark: true).classname).to eq "pb_dropdown_default dark"
      expect(subject.new(margin: "lg").classname).to eq "pb_dropdown_default m_lg"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_dropdown_default additional_class"
    end
  end

  describe "#options_with_blank" do
    it "includes blank selection option if blank_selection is present" do
      dropdown = subject.new(blank_selection: "Select an option", options: [{ id: 1, label: "Option 1", value: "1" }])
      expect(dropdown.send(:options_with_blank)).to include({ id: "", value: "", label: "Select an option" })
    end

    it "does not include blank selection option if blank_selection is not present" do
      dropdown = subject.new(options: [{ id: 1, label: "Option 1", value: "1" }])
      expect(dropdown.send(:options_with_blank)).not_to include({ id: "", value: "", label: "" })
    end
  end
end
