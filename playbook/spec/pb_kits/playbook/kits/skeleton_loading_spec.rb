# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_skeleton_loading/skeleton_loading"

RSpec.describe Playbook::PbSkeletonLoading::SkeletonLoading do
  subject { Playbook::PbSkeletonLoading::SkeletonLoading }

  it { is_expected.to define_prop(:height).with_default("16px") }
  it { is_expected.to define_prop(:width).with_default("100%") }
  it { is_expected.to define_enum_prop(:border_radius).with_default("sm") }
  it { is_expected.to define_enum_prop(:gap).with_default("xxs") }
  it { is_expected.to define_prop(:stack).with_default(1) }
  it { is_expected.to define_enum_prop(:color).with_default("default") }
  it { is_expected.to define_boolean_prop(:dark).with_default(false) }

  describe "default props" do
    it "renders with default props" do
      skeleton_loading = subject.new
      expect(skeleton_loading.classname).to start_with("pb_skeleton_loading")
      expect(skeleton_loading.height).to eq("16px")
      expect(skeleton_loading.width).to eq("100%")
    end
  end

  describe "#classname" do
    it "returns correct classnames based on props", :aggregate_failures do
      expect(subject.new.classname).to start_with("pb_skeleton_loading")
      expect(subject.new(border_radius: "lg").classname).to include("border_radius_lg")
      expect(subject.new(dark: true).classname).to include("pb_skeleton_loading dark")
      expect(subject.new(color: "white").classname).to start_with("pb_skeleton_loading")
      expect(subject.new(stack: 3).classname).to start_with("pb_skeleton_loading")
    end
  end

  describe "#item_classname" do
    it "returns correct classnames for each item based on props", :aggregate_failures do
      skeleton_loading = subject.new(border_radius: "lg", color: "white", gap: "md", stack: 3)

      expect(skeleton_loading.item_classname(0)).to eq("pb_skeleton_loading_item border_radius_lg color_white")
      expect(skeleton_loading.item_classname(1)).to eq("pb_skeleton_loading_item border_radius_lg color_white gap_md")
      expect(skeleton_loading.item_classname(2)).to eq("pb_skeleton_loading_item border_radius_lg color_white gap_md")
    end
  end

  describe "#item_inline_styles" do
    it "returns correct inline styles based on props" do
      skeleton_loading = subject.new(width: "50%", height: "24px")

      expected_style = "height: 24px; width: 50%"
      expect(skeleton_loading.item_inline_styles).to eq(expected_style)
    end
  end
end
