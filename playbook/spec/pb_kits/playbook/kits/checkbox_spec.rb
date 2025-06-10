# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_checkbox/checkbox"

RSpec.describe Playbook::PbCheckbox::Checkbox do
  subject { Playbook::PbCheckbox::Checkbox }

  it { is_expected.to define_boolean_prop(:dark).with_default(false) }
  it { is_expected.to define_boolean_prop(:error).with_default(false) }
  it { is_expected.to define_boolean_prop(:required).with_default(false) }
  it { is_expected.to define_boolean_prop(:form_spacing).with_default(false) }
  it { is_expected.to define_prop(:text) }
  it { is_expected.to define_prop(:value) }
  it { is_expected.to define_prop(:name) }
  it { is_expected.to define_prop(:disabled).with_default(false) }
  it { is_expected.to define_boolean_prop(:checked).with_default(false) }
  it { is_expected.to define_boolean_prop(:indeterminate_main).with_default(false) }
  it { is_expected.to define_prop(:indeterminate_parent) }
  it { is_expected.to define_hash_prop(:input_options).with_default({}) }
  it { is_expected.to define_boolean_prop(:hidden_input).with_default(false) }
  it { is_expected.to define_prop(:hidden_value) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_checkbox_kit_off"
      expect(subject.new(dark: true).classname).to eq "pb_checkbox_kit_off dark"
      expect(subject.new(checked: true).classname).to eq "pb_checkbox_kit_on"
      expect(subject.new(dark: true, checked: true).classname).to eq "pb_checkbox_kit_on dark"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_checkbox_kit_off additional_class"
      expect(subject.new(error: true).classname).to eq "pb_checkbox_kit_off error"
      expect(subject.new(dark: true, error: true).classname).to eq "pb_checkbox_kit_off dark error"
      expect(subject.new(disabled: true).disabled).to eq true
    end
  end

  describe "#input" do
    context "when hidden_input is true" do
      it "includes a hidden input with the correct name and value" do
        checkbox = subject.new(
          hidden_input: true,
          name: "example_name",
          value: "1",
          hidden_value: "0"
        )

        rendered_input = checkbox.input

        expect(rendered_input).to include('type="hidden"')
        expect(rendered_input).to include('name="example_name"')
        expect(rendered_input).to include('value="0"')
      end
    end

    context "when name is set in input_options" do
      it "resolves hidden input name from input_options" do
        checkbox = subject.new(
          hidden_input: true,
          input_options: {
            name: "option_name",
            value: "option_value",
          }
        )

        rendered_input = checkbox.input

        expect(rendered_input).to include('type="hidden"')
        expect(rendered_input).to include('name="option_name"')
        expect(rendered_input).to include('value="0"')
      end
    end

    context "when hidden_input is false" do
      it "does not include a hidden input" do
        checkbox = subject.new(
          hidden_input: false,
          name: "no_hidden"
        )

        rendered_input = checkbox.input

        expect(rendered_input).not_to include('<input type="hidden"')
        expect(rendered_input).to include('<input type="checkbox" name="no_hidden"')
      end
    end
  end
end
