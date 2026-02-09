# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_advanced_table/advanced_table"

RSpec.describe Playbook::PbAdvancedTable::AdvancedTable do
  subject { Playbook::PbAdvancedTable::AdvancedTable }

  it { is_expected.to define_array_prop(:table_data).with_default([]) }
  it { is_expected.to define_array_prop(:column_definitions).with_default([]) }
  it {
    is_expected.to define_enum_prop(:column_group_border_color)
      .with_default("none")
      .with_values("text_lt_default", "text_lt_light", "text_lt_lighter", "text_dk_default", "text_dk_light", "text_dk_lighter", "none")
  }
  it {
    is_expected.to define_enum_prop(:enable_toggle_expansion)
      .with_default("header")
      .with_values("all", "header", "none")
  }
  it { is_expected.to define_boolean_prop(:loading).with_default(false) }
  it {
    is_expected.to define_enum_prop(:responsive)
      .with_default("scroll")
      .with_values("none", "scroll")
  }
  it { is_expected.to define_hash_prop(:table_props).with_default({}) }
  it {
    is_expected.to define_enum_prop(:max_height)
      .with_default("auto")
      .with_values("auto", "xs", "sm", "md", "lg", "xl", "xxl", "xxxl")
  }
  it { is_expected.to define_boolean_prop(:selectable_rows).with_default(false) }
  it { is_expected.to define_boolean_prop(:show_actions_bar).with_default(true) }
  it { is_expected.to define_array_prop(:actions).with_default([]) }
  it { is_expected.to define_boolean_prop(:scroll_bar_none).with_default(false) }
  it { is_expected.to define_boolean_prop(:inline_row_loading).with_default(false) }
  it { is_expected.to define_boolean_prop(:persist_toggle_expansion_button).with_default(false) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_advanced_table advanced-table-responsive-scroll advanced-table-max-height-auto   max_height_auto"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_advanced_table advanced-table-responsive-scroll advanced-table-max-height-auto   additional_class max_height_auto"
    end

    context "responsive prop" do
      it "adds correct responsive classes", :aggregate_failures do
        expect(subject.new(responsive: "scroll").classname).to include "advanced-table-responsive-scroll"
        expect(subject.new(responsive: "none").classname).to include "advanced-table-responsive-none"
        expect(subject.new(responsive: "none").classname).not_to include "advanced-table-responsive-scroll"
      end
    end

    context "max_height prop" do
      it "adds correct max height classes", :aggregate_failures do
        expect(subject.new(max_height: "auto").classname).to include "advanced-table-max-height-auto"
        expect(subject.new(max_height: "xs").classname).to include "advanced-table-max-height-xs"
        expect(subject.new(max_height: "sm").classname).to include "advanced-table-max-height-sm"
        expect(subject.new(max_height: "md").classname).to include "advanced-table-max-height-md"
        expect(subject.new(max_height: "lg").classname).to include "advanced-table-max-height-lg"
        expect(subject.new(max_height: "xl").classname).to include "advanced-table-max-height-xl"
        expect(subject.new(max_height: "xxl").classname).to include "advanced-table-max-height-xxl"
        expect(subject.new(max_height: "xxxl").classname).to include "advanced-table-max-height-xxxl"
      end
    end

    context "scroll_bar_none prop" do
      it "adds hide scrollbar class when true", :aggregate_failures do
        expect(subject.new(scroll_bar_none: true).classname).to include "advanced-table-hide-scrollbar"
        expect(subject.new(scroll_bar_none: false).classname).not_to include "advanced-table-hide-scrollbar"
      end
    end

    context "column_group_border_color prop" do
      it "adds correct border color classes", :aggregate_failures do
        expect(subject.new(column_group_border_color: "text_lt_default").classname).to include "column-group-border-text_lt_default"
        expect(subject.new(column_group_border_color: "text_lt_light").classname).to include "column-group-border-text_lt_light"
        expect(subject.new(column_group_border_color: "text_lt_lighter").classname).to include "column-group-border-text_lt_lighter"
        expect(subject.new(column_group_border_color: "text_dk_default").classname).to include "column-group-border-text_dk_default"
        expect(subject.new(column_group_border_color: "text_dk_light").classname).to include "column-group-border-text_dk_light"
        expect(subject.new(column_group_border_color: "text_dk_lighter").classname).to include "column-group-border-text_dk_lighter"
        expect(subject.new(column_group_border_color: "none").classname).not_to include "column-group-border"
      end
    end

    context "combined props" do
      it "handles multiple props correctly", :aggregate_failures do
        combined_classname = subject.new(
          responsive: "none",
          max_height: "lg",
          scroll_bar_none: true,
          column_group_border_color: "text_lt_default"
        ).classname

        expect(combined_classname).to include "pb_advanced_table"
        expect(combined_classname).to include "advanced-table-responsive-none"
        expect(combined_classname).to include "advanced-table-max-height-lg"
        expect(combined_classname).to include "advanced-table-hide-scrollbar"
        expect(combined_classname).to include "column-group-border-text_lt_default"
        expect(combined_classname).not_to include "advanced-table-responsive-scroll"
      end
    end
  end

  describe "#responsive_classname" do
    it "returns correct responsive class" do
      expect(subject.new(responsive: "scroll").responsive_classname).to eq "advanced-table-responsive-scroll"
      expect(subject.new(responsive: "none").responsive_classname).to eq "advanced-table-responsive-none"
    end
  end

  describe "#max_height_classname" do
    it "returns correct max height class" do
      expect(subject.new(max_height: "lg").max_height_classname).to eq "advanced-table-max-height-lg"
      expect(subject.new(max_height: "auto").max_height_classname).to eq "advanced-table-max-height-auto"
    end
  end

  describe "#hide_scroll_bar_class" do
    it "returns correct scroll bar class" do
      expect(subject.new(scroll_bar_none: true).hide_scroll_bar_class).to eq "advanced-table-hide-scrollbar"
      expect(subject.new(scroll_bar_none: false).hide_scroll_bar_class).to eq ""
    end
  end

  describe "#selected_rows" do
    it "returns empty array by default" do
      expect(subject.new({}).selected_rows).to eq []
    end
  end

  describe "#selected_rows_length" do
    it "returns length of selected rows" do
      expect(subject.new({}).selected_rows_length).to eq 0
    end
  end

  describe "#is_action_bar_visible" do
    it "returns false by default" do
      expect(subject.new({}).is_action_bar_visible).to be false
    end
  end
end
