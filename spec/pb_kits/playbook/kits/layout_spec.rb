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


