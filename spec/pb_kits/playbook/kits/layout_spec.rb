# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_layout/layout.rb"

RSpec.describe Playbook::PbLayout::Layout do
  subject { Playbook::PbLayout::Layout }

  it { is_expected.to define_partial }

  it { is_expected.to define_enum_prop(:collapse)
                      .with_values("xs", "sm", "md", "lg", "xl")
                      .with_default("xs") }
  it { is_expected.to define_boolean_prop(:dark).with_default(false) }
  it { is_expected.to define_boolean_prop(:full).with_default(false) }
  it { is_expected.to define_enum_prop(:position)
                      .with_values("left", "right")
                      .with_default("left") }
  it { is_expected.to define_boolean_prop(:transparent).with_default(false) }
  it { is_expected.to define_enum_prop(:size)
                      .with_values("xs", "sm", "md", "lg", "xl")
                      .with_default("md") }

  describe "#dark_class" do
    it "returns 'dark' if dark prop is true", :aggregate_failures do
      expect(subject.new({}).dark_class).to eq nil
      expect(subject.new(dark: true).dark_class).to eq "dark"
    end
  end

  describe "#full_class" do
    it "returns 'full' if full prop is true", :aggregate_failures do
      expect(subject.new({}).full_class).to eq ""
      expect(subject.new(full: true).full_class).to eq "full"
    end
  end

  describe "#transparent_class" do
    it "returns 'transparent' if transparent prop is true", :aggregate_failures do
      expect(subject.new({}).transparent_class).to eq nil
      expect(subject.new(transparent: true).transparent_class).to eq "transparent"
    end
  end

  describe "#collapse_class" do
    it "returns the correct class with collapse and position props", :aggregate_failures do
      expect(subject.new({}).collapse_class).to eq "layout_left_collapse_xs"
      expect(subject.new(collapse: "md").collapse_class).to eq "layout_left_collapse_md"
      expect(subject.new(position: "right", collapse: "xl").collapse_class).to eq "layout_right_collapse_xl"
    end
  end

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      text = "Test text"
      expect(subject.new({}).classname).to eq "pb_layout_md_left layout_left_collapse_xs"
      expect(subject.new(full: true).classname).to eq "pb_layout_md_left full layout_left_collapse_xs"
      expect(subject.new(dark: true, transparent: true, full: true).classname).to eq "pb_layout_md_left_dark_transparent full layout_left_collapse_xs"
      expect(subject.new(dark: true, position: "right", size: "sm").classname).to eq "pb_layout_sm_right_dark layout_right_collapse_xs"
    end
  end
end


