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
  it { is_expected.to define_prop(:gap) }
  it { is_expected.to define_prop(:row_gap) }
  it { is_expected.to define_prop(:column_gap) }
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
      expect(subject.new({}).classname).to include "pb_flex_kit pb_flex_kit_orientation_row pb_flex_kit_justify_content_left pb_flex_kit_align_items_top"
      expect(subject.new(orientation: "column").classname).to include "pb_flex_kit pb_flex_kit_orientation_column pb_flex_kit_align_items_left pb_flex_kit_justify_content_top"
      expect(subject.new(inline: true).classname).to include "pb_flex_kit pb_flex_kit_orientation_row pb_flex_kit_justify_content_left pb_flex_kit_align_items_top pb_flex_kit_inline"
      expect(subject.new(reverse: true).classname).to include "pb_flex_kit pb_flex_kit_orientation_row pb_flex_kit_justify_content_left pb_flex_kit_align_items_top pb_flex_kit_reverse"
      expect(subject.new(spacing: "around").classname).to include "pb_flex_kit pb_flex_kit_orientation_row pb_flex_kit_justify_content_left pb_flex_kit_align_items_top pb_flex_kit_spacing_around"
      expect(subject.new(horizontal: "center").classname).to include "pb_flex_kit pb_flex_kit_orientation_row pb_flex_kit_justify_content_center pb_flex_kit_align_items_top"
      expect(subject.new(vertical: "center").classname).to include "pb_flex_kit pb_flex_kit_orientation_row pb_flex_kit_justify_content_left pb_flex_kit_align_items_center"
      expect(subject.new(align: "center").classname).to include "pb_flex_kit pb_flex_kit_orientation_row pb_flex_kit_justify_content_left pb_flex_kit_align_items_center"
      expect(subject.new(justify: "center").classname).to include "pb_flex_kit pb_flex_kit_orientation_row pb_flex_kit_justify_content_center pb_flex_kit_align_items_top"
      expect(subject.new(gap: "xs").classname).to include "pb_flex_kit pb_flex_kit_orientation_row pb_flex_kit_justify_content_left pb_flex_kit_align_items_top pb_flex_kit_gap_xs"
      expect(subject.new(row_gap: "xs").classname).to include "pb_flex_kit pb_flex_kit_orientation_row pb_flex_kit_justify_content_left pb_flex_kit_align_items_top pb_flex_kit_rowGap_xs"
      expect(subject.new(column_gap: "xs").classname).to include "pb_flex_kit pb_flex_kit_orientation_row pb_flex_kit_justify_content_left pb_flex_kit_align_items_top pb_flex_kit_columnGap_xs"
      expect(subject.new(gap: { xs: "none", sm: "sm", md: "md", lg: "lg", xl: "xl" }).classname).to include "pb_flex_kit pb_flex_kit_orientation_row pb_flex_kit_justify_content_left pb_flex_kit_align_items_top gap_xs_none gap_sm_sm gap_md_md gap_lg_lg gap_xl_xl"
      expect(subject.new(row_gap: { xs: "none", sm: "sm", md: "md", lg: "lg", xl: "xl" }).classname).to include "pb_flex_kit pb_flex_kit_orientation_row pb_flex_kit_justify_content_left pb_flex_kit_align_items_top rowGap_xs_none rowGap_sm_sm rowGap_md_md rowGap_lg_lg rowGap_xl_xl"
      expect(subject.new(column_gap: { xs: "none", sm: "sm", md: "md", lg: "lg", xl: "xl" }).classname).to include "pb_flex_kit pb_flex_kit_orientation_row pb_flex_kit_justify_content_left pb_flex_kit_align_items_top columnGap_xs_none columnGap_sm_sm columnGap_md_md columnGap_lg_lg columnGap_xl_xl"
      expect(subject.new(vertical: "baseline").classname).to include "pb_flex_kit pb_flex_kit_orientation_row pb_flex_kit_justify_content_left pb_flex_kit_align_items_baseline"
      expect(subject.new(classname: "additional_class").classname).to include "pb_flex_kit pb_flex_kit_orientation_row pb_flex_kit_justify_content_left pb_flex_kit_align_items_top additional_class"
    end
  end
end
