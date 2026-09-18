# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_multi_level_select/multi_level_select"

RSpec.describe Playbook::PbMultiLevelSelect::MultiLevelSelect do
  subject { Playbook::PbMultiLevelSelect::MultiLevelSelect }

  describe "prop definitions" do
    it { is_expected.to define_prop(:id) }
    it { is_expected.to define_prop(:name) }
    it { is_expected.to define_array_prop(:tree_data).with_default([]) }
    it { is_expected.to define_boolean_prop(:return_all_selected).with_default(false) }
    it { is_expected.to define_array_prop(:selected_ids).with_default([]) }
    it { is_expected.to define_enum_prop(:input_display).with_values("pills", "none").with_default("pills") }
    it { is_expected.to define_string_prop(:input_name).with_default("") }
    it { is_expected.to define_enum_prop(:variant).with_values("multi", "single").with_default("multi") }
    it { is_expected.to define_enum_prop(:pill_color).with_default("primary") }
    it { is_expected.to define_boolean_prop(:wrapped).with_default(false) }
    it { is_expected.to define_boolean_prop(:disabled).with_default(false) }
    it { is_expected.to define_boolean_prop(:required).with_default(false) }
    it { is_expected.to define_string_prop(:error).with_default("") }
    it { is_expected.to define_string_prop(:label).with_default("") }
    it { is_expected.to define_string_prop(:placeholder).with_default("Start typing...") }
    it { is_expected.to define_boolean_prop(:required_indicator).with_default(false) }
    it { is_expected.to define_boolean_prop(:show_checked_children).with_default(true) }
  end

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_multi_level_select"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_multi_level_select additional_class"
    end

    it "does not include variant in classname" do
      expect(subject.new(variant: "single").classname).to eq "pb_multi_level_select"
      expect(subject.new(variant: "multi").classname).to eq "pb_multi_level_select"
    end

    it "includes error class when error is present" do
      expect(subject.new(error: "Required").classname).to include("error")
    end
  end

  describe "#input_id" do
    it "uses id with _input suffix when id is present" do
      expect(subject.new(id: "my-select").input_id).to eq "my-select_input"
    end

    it "falls back to sanitized name" do
      expect(subject.new(name: "My Field").input_id).to eq "my_field"
    end

    it "falls back to sanitized label" do
      expect(subject.new(label: "Select Location").input_id).to eq "select_location"
    end

    it "falls back to default" do
      expect(subject.new({}).input_id).to eq "multiselect_input"
    end
  end

  describe "#data" do
    let(:tree_data) do
      [
        {
          label: "Power Home Remodeling",
          value: "powerHomeRemodeling",
          id: "powerhome1",
          children: [
            {
              label: "People",
              value: "people",
              id: "people1",
              disabled: true,
            },
            {
              label: "Contact Center",
              value: "contactCenter",
              id: "contact1",
            },
          ],
        },
      ]
    end

    it "includes the enhanced element selector flag" do
      expect(subject.new({}).data[:pb_multi_level_select]).to eq true
    end

    it "serializes tree_data as JSON" do
      mls = subject.new(tree_data: tree_data)
      parsed = JSON.parse(mls.data[:tree_data])
      expect(parsed[0]["id"]).to eq "powerhome1"
      expect(parsed[0]["children"][0]["disabled"]).to eq true
    end

    it "serializes selected_ids as JSON" do
      mls = subject.new(selected_ids: %w[id1 id2])
      expect(JSON.parse(mls.data[:selected_ids])).to eq %w[id1 id2]
    end

    it "includes variant" do
      expect(subject.new(variant: "single").data[:variant]).to eq "single"
      expect(subject.new({}).data[:variant]).to eq "multi"
    end

    it "includes disabled" do
      expect(subject.new(disabled: true).data[:disabled]).to eq "true"
    end

    it "includes required" do
      expect(subject.new(required: true).data[:required]).to eq "true"
    end

    it "includes input_name" do
      expect(subject.new(input_name: "location_select").data[:input_name]).to eq "location_select"
    end

    it "includes input_display" do
      expect(subject.new(input_display: "none").data[:input_display]).to eq "none"
    end

    it "includes return_all_selected" do
      expect(subject.new(return_all_selected: true).data[:return_all_selected]).to eq "true"
    end

    it "includes pill_color" do
      expect(subject.new(pill_color: "success").data[:pill_color]).to eq "success"
    end

    it "includes wrapped" do
      expect(subject.new(wrapped: true).data[:wrapped]).to eq "true"
    end

    it "includes show_checked_children" do
      expect(subject.new(show_checked_children: false).data[:show_checked_children]).to eq "false"
    end

    it "includes name" do
      expect(subject.new(name: "location").data[:name]).to eq "location"
    end

    it "includes placeholder" do
      expect(subject.new(placeholder: "Choose an option…").data[:placeholder]).to eq "Choose an option…"
      expect(subject.new({}).data[:placeholder]).to eq "Start typing..."
    end

    it "merges consumer data attributes" do
      mls = subject.new(data: { multi_level_select_form: true, testid: "mls" })
      expect(mls.data[:multi_level_select_form]).to eq true
      expect(mls.data[:testid]).to eq "mls"
      expect(mls.data[:pb_multi_level_select]).to eq true
    end
  end

  describe "pill_color enum" do
    it "accepts primary" do
      expect { subject.new(pill_color: "primary") }.not_to raise_error
    end

    it "accepts product colors" do
      %w[windows siding roofing doors gutters solar insulation accessories].each do |color|
        expect { subject.new(pill_color: color) }.not_to raise_error
      end
    end
  end

  describe "variant enum" do
    it "accepts multi" do
      expect { subject.new(variant: "multi") }.not_to raise_error
    end

    it "accepts single" do
      expect { subject.new(variant: "single") }.not_to raise_error
    end
  end

  describe "input_display enum" do
    it "accepts pills" do
      expect { subject.new(input_display: "pills") }.not_to raise_error
    end

    it "accepts none" do
      expect { subject.new(input_display: "none") }.not_to raise_error
    end
  end
end
