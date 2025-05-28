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
  it { is_expected.to define_boolean_prop(:multi_select).with_default(false) }
  it { is_expected.to define_hash_prop(:form_pill_props).with_default({}) }

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

  describe "#multi_select" do
    it "includes pb_dropdown_multi_select when multi_select is true" do
      dropdown = subject.new(multi_select: true)
      expect(dropdown.data).to include(pb_dropdown: true, pb_dropdown_multi_select: true)
    end
    it "does not include pb_dropdown_multi_select when multi_select is false" do
      dropdown = subject.new(multi_select: false)
      expect(dropdown.data).not_to include(pb_dropdown_multi_select: true)
    end
    it "includes pb_dropdown_multi_select when multi_select is true and autocomplete is true" do
      dropdown = subject.new(multi_select: true, autocomplete: true)
      expect(dropdown.data).to include(pb_dropdown: true, pb_dropdown_multi_select: true)
    end
    it "Renders form pill props when form_pills_props used and multi_select is true" do
      dropdown = subject.new(multi_select: true, form_pill_props: { size: "small" })
      expect(dropdown.data[:form_pill_props]).to eq("{\"size\":\"small\"}")
    end
    it "Renders form pill when multi_select is true" do
      dropdown = subject.new(multi_select: true)
      expect(dropdown.data[:form_pill_props]).to eq("{}")
    end
    it "Renders default_value when used" do
      dropdown = subject.new(multi_select: true, default_value: [{ id: 1, label: "Option 1", value: "1" }])
      expect(dropdown.send(:input_default_value)).to eq("1")
    end
  end
end
