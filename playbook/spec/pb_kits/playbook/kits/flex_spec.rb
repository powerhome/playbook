# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_flex/flex"

RSpec.describe Playbook::PbFlex::Flex do
  subject { Playbook::PbFlex::Flex }

  it {
    is_expected.to define_enum_prop(:horizontal)
      .with_default("left")
      .with_values("left", "center", "right", "stretch", "none")
  }
  it {
    is_expected.to define_enum_prop(:justify)
      .with_default("none")
      .with_values("start", "center", "end", "stretch", "none", "between", "around", "evenly")
  }
  it {
    is_expected.to define_enum_prop(:align)
      .with_default("none")
      .with_values("start", "center", "end", "stretch", "none", "baseline")
  }
  it {
    is_expected.to define_enum_prop(:gap)
      .with_default("none")
      .with_values("xs", "sm", "md", "lg", "xl", "none")
  }
  it {
    is_expected.to define_enum_prop(:row_gap)
      .with_default("none")
      .with_values("xs", "sm", "md", "lg", "xl", "none")
  }
  it {
    is_expected.to define_enum_prop(:column_gap)
      .with_default("none")
      .with_values("xs", "sm", "md", "lg", "xl", "none")
  }
  it { is_expected.to define_boolean_prop(:inline).with_default(false) }
  it {
    is_expected.to define_enum_prop(:orientation)
      .with_default("row")
      .with_values("row", "column")
  }
  it {
    is_expected.to define_enum_prop(:spacing)
      .with_default("none")
      .with_values("around", "between", "evenly", "none")
  }
  it { is_expected.to define_boolean_prop(:reverse).with_default(false) }
  it {
    is_expected.to define_enum_prop(:vertical)
      .with_default("top")
      .with_values("top", "center", "bottom", "stretch", "baseline", "none")
  }
  it { is_expected.to define_boolean_prop(:wrap).with_default(false) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_flex_kit_orientation_row_justify_content_left_align_items_top_spacing_none"
      expect(subject.new(orientation: "column").classname).to eq "pb_flex_kit_orientation_column_align_items_left_justify_content_top_spacing_none"
      expect(subject.new(inline: true).classname).to eq "pb_flex_kit_orientation_row_justify_content_left_align_items_top_inline_spacing_none"
      expect(subject.new(reverse: true).classname).to eq "pb_flex_kit_orientation_row_justify_content_left_align_items_top_reverse_spacing_none"
      expect(subject.new(spacing: "around").classname).to eq "pb_flex_kit_orientation_row_justify_content_left_align_items_top_spacing_around"
      expect(subject.new(horizontal: "center").classname).to eq "pb_flex_kit_orientation_row_justify_content_center_align_items_top_spacing_none"
      expect(subject.new(vertical: "center").classname).to eq "pb_flex_kit_orientation_row_justify_content_left_align_items_center_spacing_none"
      expect(subject.new(align: "center").classname).to eq "pb_flex_kit_orientation_row_justify_content_left_align_items_center_spacing_none"
      expect(subject.new(justify: "center").classname).to eq "pb_flex_kit_orientation_row_justify_content_center_align_items_top_spacing_none"
      expect(subject.new(gap: "xs").classname).to eq "pb_flex_kit_orientation_row_justify_content_left_align_items_top_spacing_none_gap_xs"
      expect(subject.new(row_gap: "xs").classname).to eq "pb_flex_kit_orientation_row_justify_content_left_align_items_top_spacing_none_rowGap_xs"
      expect(subject.new(column_gap: "xs").classname).to eq "pb_flex_kit_orientation_row_justify_content_left_align_items_top_spacing_none_columnGap_xs"
      expect(subject.new(vertical: "baseline").classname).to eq "pb_flex_kit_orientation_row_justify_content_left_align_items_baseline_spacing_none"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_flex_kit_orientation_row_justify_content_left_align_items_top_spacing_none additional_class"
    end
  end
end
