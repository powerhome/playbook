# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_typeahead/typeahead"

RSpec.describe Playbook::PbTypeahead::Typeahead do
  subject { Playbook::PbTypeahead::Typeahead }

  it { is_expected.to define_boolean_prop(:async).with_default(false) }
  it {
    is_expected.to define_prop(:default_options)
      .of_type(Playbook::Props::HashArray)
      .with_default([])
  }
  it { is_expected.to define_prop(:get_option_label) }
  it { is_expected.to define_prop(:get_option_value) }
  it { is_expected.to define_prop(:id) }
  it { is_expected.to define_prop(:inline).with_default(false) }
  it { is_expected.to define_prop(:label) }
  it { is_expected.to define_prop(:load_options) }
  it { is_expected.to define_prop(:margin_bottom).with_default("sm") }
  it { is_expected.to define_prop(:name) }
  it {
    is_expected.to define_prop(:options)
      .of_type(Playbook::Props::HashArray)
      .with_default([])
  }
  it { is_expected.to define_boolean_prop(:pills).with_default(false) }
  it { is_expected.to define_prop(:placeholder) }
  it { is_expected.to define_prop(:search_term_minimum_length).with_default(3) }
  it { is_expected.to define_prop(:search_debounce_timeout).with_default(250) }
  it { is_expected.to define_prop(:value) }
  it { is_expected.to define_prop(:input_options).of_type(Playbook::Props::HashProp).with_default({}) }
  it { is_expected.to define_boolean_prop(:preserve_search_input).with_default(false) }
  it { is_expected.to define_prop(:multi_kit).with_default("") }
  it { is_expected.to define_prop(:plus_icon).with_default(false) }
  it { is_expected.to define_prop(:pill_color).with_default("primary") }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_typeahead_kit mb_sm"
    end
  end

  describe "#typeahead_with_pills_options" do
    before(:each) do
      @expected_options = [{ label: "Windows", value: "1" }]
      @expected_label = "Label Here"
      @expected_placeholder = "Placeholder Here"
    end

    it "returns base props", :aggregate_failures do
      base_example = subject.new(label: @expected_label, options: @expected_options, placeholder: @expected_placeholder)
      expect(base_example.typeahead_react_options[:defaultValue]).to match_array([])
      expect(base_example.typeahead_react_options[:isMulti]).to eq(true)
      expect(base_example.typeahead_react_options[:options]).to match_array(@expected_options)
      expect(base_example.typeahead_react_options[:label]).to eq(@expected_label)
      expect(base_example.typeahead_react_options[:placeholder]).to eq(@expected_placeholder)
    end

    it "returns props with default_options", :aggregate_failures do
      default_options_example = subject.new(default_options: @expected_options, label: @expected_label, options: @expected_options, placeholder: @expected_placeholder)
      expect(default_options_example.typeahead_react_options[:defaultValue]).to match_array(@expected_options)
      expect(default_options_example.typeahead_react_options[:options]).to match_array(@expected_options)
    end
    it "returns props with load_options", :aggregate_failures do
      default_options_example = subject.new(async: true, load_options: "foo", label: @expected_label, options: @expected_options, placeholder: @expected_placeholder)
      expect(default_options_example.typeahead_react_options[:async]).to be(true)
      expect(default_options_example.typeahead_react_options[:loadOptions]).to eq("foo")
    end
  end
end
