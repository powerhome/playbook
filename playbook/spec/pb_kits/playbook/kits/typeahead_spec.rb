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
  it { is_expected.to define_prop(:input_display).with_default("pills") }
  it { is_expected.to define_boolean_prop(:required_indicator).with_default(false) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_typeahead_kit mb_sm"
    end
  end

  describe "focus behavior with default_options" do
    before(:each) do
      @default_option = { label: "Red", value: "#FF0000" }
      @options = [
        { label: "Orange", value: "#FFA500" },
        { label: "Red", value: "#FF0000" },
        { label: "Green", value: "#00FF00" },
        { label: "Blue", value: "#0000FF" },
      ]
    end

    it "passes default_options correctly to React props for focus behavior", :aggregate_failures do
      typeahead = subject.new(
        default_options: [@default_option],
        options: @options,
        is_multi: false
      )

      react_options = typeahead.typeahead_react_options

      expect(react_options[:defaultValue]).to eq([@default_option])
      expect(react_options[:options]).to eq(@options)
      expect(react_options[:isMulti]).to eq(false)
    end

    it "handles single default option for non-multi select", :aggregate_failures do
      typeahead = subject.new(
        default_options: [@default_option],
        options: @options,
        is_multi: false
      )

      react_options = typeahead.typeahead_react_options

      expect(react_options[:defaultValue]).to be_an(Array)
      expect(react_options[:defaultValue].first).to eq(@default_option)
      expect(react_options[:defaultValue].first[:label]).to eq("Red")
      expect(react_options[:defaultValue].first[:value]).to eq("#FF0000")
    end

    it "handles multiple default options for multi select", :aggregate_failures do
      multiple_defaults = [@default_option, { label: "Blue", value: "#0000FF" }]

      typeahead = subject.new(
        default_options: multiple_defaults,
        options: @options,
        is_multi: true
      )

      react_options = typeahead.typeahead_react_options

      expect(react_options[:defaultValue]).to eq(multiple_defaults)
      expect(react_options[:isMulti]).to eq(true)
    end

    it "passes empty array when no default_options provided", :aggregate_failures do
      typeahead = subject.new(options: @options)
      react_options = typeahead.typeahead_react_options
      expect(react_options[:defaultValue]).to eq([])
    end

    it "ensures focus-related props are correctly mapped", :aggregate_failures do
      typeahead = subject.new(
        default_options: [@default_option],
        options: @options,
        get_option_label: "customLabelFunc",
        get_option_value: "customValueFunc"
      )

      react_options = typeahead.typeahead_react_options

      # These props affect how focus logic compares options
      expect(react_options[:getOptionLabel]).to eq("customLabelFunc")
      expect(react_options[:getOptionValue]).to eq("customValueFunc")
      expect(react_options[:defaultValue]).to eq([@default_option])
    end

    it "handles grouped options with default option for focus behavior", :aggregate_failures do
      grouped_options = [
        {
          label: "Warm Colors",
          options: [
            { label: "Red", value: "#FF0000" },
            { label: "Orange", value: "#FFA500" },
            { label: "Yellow", value: "#FFFF00" },
          ],
        },
        {
          label: "Cool Colors",
          options: [
            { label: "Blue", value: "#0000FF" },
            { label: "Teal", value: "#008080" },
            { label: "Cyan", value: "#00FFFF" },
          ],
        },
        {
          label: "Fun Shades",
          options: [
            { label: "Pink", value: "#FFC0CB" },
            { label: "Magenta", value: "#FF00FF" },
            { label: "Purple", value: "#800080" },
          ],
        },
      ]

      pink_option = { label: "Pink", value: "#FFC0CB" }

      typeahead = subject.new(
        default_options: [pink_option],
        options: grouped_options,
        is_multi: false
      )

      react_options = typeahead.typeahead_react_options

      # Verify grouped options structure is preserved
      expect(react_options[:options]).to eq(grouped_options)
      expect(react_options[:options].first[:label]).to eq("Warm Colors")
      expect(react_options[:options].first[:options]).to be_an(Array)
      # Verify default value is set correctly for focus behavior
      expect(react_options[:defaultValue]).to eq([pink_option])
      expect(react_options[:defaultValue].first[:label]).to eq("Pink")
    end

    it "handles grouped options with default option from first group", :aggregate_failures do
      grouped_options = [
        {
          label: "Warm Colors",
          options: [
            { label: "Red", value: "#FF0000" },
            { label: "Orange", value: "#FFA500" },
            { label: "Yellow", value: "#FFFF00" },
          ],
        },
        {
          label: "Cool Colors",
          options: [
            { label: "Blue", value: "#0000FF" },
            { label: "Teal", value: "#008080" },
          ],
        },
      ]

      orange_option = { label: "Orange", value: "#FFA500" }

      typeahead = subject.new(
        default_options: [orange_option],
        options: grouped_options,
        is_multi: false
      )

      react_options = typeahead.typeahead_react_options

      # Verify grouped structure is maintained
      expect(react_options[:options]).to eq(grouped_options)
      # Verify default value from first group works correctly
      expect(react_options[:defaultValue]).to eq([orange_option])
      expect(react_options[:defaultValue].first[:label]).to eq("Orange")
      expect(react_options[:defaultValue].first[:value]).to eq("#FFA500")
    end

    it "handles grouped options with multiple defaults for multi select", :aggregate_failures do
      grouped_options = [
        {
          label: "Warm Colors",
          options: [
            { label: "Red", value: "#FF0000" },
            { label: "Orange", value: "#FFA500" },
          ],
        },
        {
          label: "Cool Colors",
          options: [
            { label: "Blue", value: "#0000FF" },
            { label: "Teal", value: "#008080" },
          ],
        },
      ]

      multiple_defaults = [
        { label: "Red", value: "#FF0000" },
        { label: "Blue", value: "#0000FF" },
      ]

      typeahead = subject.new(
        default_options: multiple_defaults,
        options: grouped_options,
        is_multi: true
      )

      react_options = typeahead.typeahead_react_options

      # Verify multiple defaults from different groups
      expect(react_options[:defaultValue]).to eq(multiple_defaults)
      expect(react_options[:defaultValue].length).to eq(2)
      expect(react_options[:isMulti]).to eq(true)
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
    it "returns props with input_display", :aggregate_failures do
      input_display_example = subject.new(input_display: "none", label: @expected_label, options: @expected_options, placeholder: @expected_placeholder)
      expect(input_display_example.typeahead_react_options[:inputDisplay]).to eq("none")
    end
  end
end
