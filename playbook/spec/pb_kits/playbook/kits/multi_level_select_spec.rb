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
  end

  describe "#multi_level_select_options" do
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

    it "includes all expected keys" do
      mls = subject.new(tree_data: tree_data)
      options = mls.multi_level_select_options

      expected_keys = %i[
        data disabled error id inputDisplay name label
        treeData required requiredIndicator returnAllSelected selectedIds
        inputName variant pillColor wrapped showCheckedChildren
      ]
      expect(options.keys).to match_array(expected_keys)
    end

    it "includes variant in options" do
      mls = subject.new(variant: "single")
      expect(mls.multi_level_select_options[:variant]).to eq "single"
    end

    it "defaults variant to multi" do
      mls = subject.new({})
      expect(mls.multi_level_select_options[:variant]).to eq "multi"
    end

    it "includes tree_data in options as treeData" do
      mls = subject.new(tree_data: tree_data)
      expect(mls.multi_level_select_options[:treeData]).to eq tree_data
    end

    it "passes through tree_data with disabled options intact" do
      mls = subject.new(tree_data: tree_data, variant: "single")
      options = mls.multi_level_select_options

      expect(options[:variant]).to eq "single"
      expect(options[:treeData]).to eq tree_data
      disabled_child = options[:treeData][0][:children][0]
      expect(disabled_child[:disabled]).to eq true
    end

    it "includes disabled prop" do
      mls = subject.new(disabled: true)
      expect(mls.multi_level_select_options[:disabled]).to eq true
    end

    it "includes required prop" do
      mls = subject.new(required: true)
      expect(mls.multi_level_select_options[:required]).to eq true
    end

    it "includes required_indicator prop" do
      mls = subject.new(required_indicator: true)
      expect(mls.multi_level_select_options[:requiredIndicator]).to eq true
    end

    it "includes error prop" do
      mls = subject.new(error: "Please select an option")
      expect(mls.multi_level_select_options[:error]).to eq "Please select an option"
    end

    it "includes label prop" do
      mls = subject.new(label: "Select Location")
      expect(mls.multi_level_select_options[:label]).to eq "Select Location"
    end

    it "includes input_name as inputName" do
      mls = subject.new(input_name: "location_select")
      expect(mls.multi_level_select_options[:inputName]).to eq "location_select"
    end

    it "includes input_display as inputDisplay" do
      mls = subject.new(input_display: "none")
      expect(mls.multi_level_select_options[:inputDisplay]).to eq "none"
    end

    it "includes return_all_selected as returnAllSelected" do
      mls = subject.new(return_all_selected: true)
      expect(mls.multi_level_select_options[:returnAllSelected]).to eq true
    end

    it "includes selected_ids as selectedIds" do
      mls = subject.new(selected_ids: %w[id1 id2])
      expect(mls.multi_level_select_options[:selectedIds]).to eq %w[id1 id2]
    end

    it "includes pill_color as pillColor" do
      mls = subject.new(pill_color: "success")
      expect(mls.multi_level_select_options[:pillColor]).to eq "success"
    end

    it "includes wrapped prop" do
      mls = subject.new(wrapped: true)
      expect(mls.multi_level_select_options[:wrapped]).to eq true
    end

    it "includes show_checked_children as showCheckedChildren" do
      mls = subject.new(show_checked_children: false)
      expect(mls.multi_level_select_options[:showCheckedChildren]).to eq false
    end

    it "includes id prop" do
      mls = subject.new(id: "my-select")
      expect(mls.multi_level_select_options[:id]).to eq "my-select"
    end

    it "includes name prop" do
      mls = subject.new(name: "location")
      expect(mls.multi_level_select_options[:name]).to eq "location"
    end
  end

  describe "pill_color enum" do
    it "accepts primary" do
      expect { subject.new(pill_color: "primary") }.not_to raise_error
    end

    it "accepts neutral" do
      expect { subject.new(pill_color: "neutral") }.not_to raise_error
    end

    it "accepts success" do
      expect { subject.new(pill_color: "success") }.not_to raise_error
    end

    it "accepts warning" do
      expect { subject.new(pill_color: "warning") }.not_to raise_error
    end

    it "accepts error" do
      expect { subject.new(pill_color: "error") }.not_to raise_error
    end

    it "accepts info" do
      expect { subject.new(pill_color: "info") }.not_to raise_error
    end

    it "accepts data colors" do
      (1..8).each do |i|
        expect { subject.new(pill_color: "data_#{i}") }.not_to raise_error
      end
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
