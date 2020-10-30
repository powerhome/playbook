# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_flex/flex"

RSpec.describe Playbook::PbFlex::Flex do
  subject { Playbook::PbFlex::Flex }

  it { is_expected.to define_partial }

  it { is_expected.to define_enum_prop(:horizontal)
                      .with_default("left")
                      .with_values("left", "center", "right", "stretch") }
  it { is_expected.to define_boolean_prop(:inline).with_default(false) }
  it { is_expected.to define_enum_prop(:orientation)
                      .with_default("row")
                      .with_values("row", "column") }
  it { is_expected.to define_enum_prop(:spacing)
                      .with_default("none")
                      .with_values("around", "between", "evenly", "none") }
  it { is_expected.to define_boolean_prop(:reverse).with_default(false) }
  it { is_expected.to define_enum_prop(:vertical)
                      .with_default("top")
                      .with_values("top", "center", "bottom", "stretch", "baseline") }
  it { is_expected.to define_boolean_prop(:wrap).with_default(false) }

   describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_flex_kit_orientation_row_justify_content_left_align_items_top_spacing_none"
      expect(subject.new(orientation: "column").classname).to eq "pb_flex_kit_orientation_column_align_items_left_justify_content_top__spacing_none"
      expect(subject.new(inline: true).classname).to eq "pb_flex_kit_orientation_row_justify_content_left_align_items_top_inline_spacing_none"
      expect(subject.new(reverse: true).classname).to eq "pb_flex_kit_orientation_row_reverse_justify_content_left_reverse_align_items_top_spacing_none"
      expect(subject.new(spacing: "around").classname).to eq "pb_flex_kit_orientation_row_justify_content_left_align_items_top_spacing_around"
      expect(subject.new(horizontal: "center").classname).to eq "pb_flex_kit_orientation_row_justify_content_center_align_items_top_spacing_none"
      expect(subject.new(vertical: "center").classname).to eq "pb_flex_kit_orientation_row_justify_content_left_align_items_center_spacing_none"
      expect(subject.new(vertical: "baseline").classname).to eq "pb_flex_kit_orientation_row_justify_content_left_align_items_baseline_spacing_none"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_flex_kit_orientation_row_justify_content_left_align_items_top_spacing_none additional_class"
    end
  end

end
