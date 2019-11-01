# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_list/list"

RSpec.describe Playbook::PbList::List do
  subject { Playbook::PbList::List }

  it { is_expected.to define_partial }
  it { is_expected.to define_boolean_prop(:borderless)
                      .with_default(false) }
  it { is_expected.to define_boolean_prop(:dark)
                      .with_default(false) }
  it { is_expected.to define_enum_prop(:layout)
                      .with_values("left", "right", "")
                      .with_default("")}
  it { is_expected.to define_prop(:size)}
  it { is_expected.to define_boolean_prop(:ordered)
                      .with_default(false) }
  it { is_expected.to define_boolean_prop(:xpadding)
                      .with_default(false) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).list_classname).to eq "pb_list_kit_"
      expect(subject.new(dark: true).list_classname).to eq "pb_list_kit_dark_"
      expect(subject.new(borderless: true).list_classname).to eq "pb_list_kit_borderless_"
      expect(subject.new(xpadding: true).list_classname).to eq "pb_list_kit_xpadding_"
      expect(subject.new(size: "large").list_classname).to eq "pb_list_kit_large_"
      expect(subject.new(layout: "right").list_classname).to eq "pb_list_kit_layout_right"
      expect(subject.new(dark: true, xpadding: true, size: "large", borderless: true, layout: "left").list_classname).to eq "pb_list_kit_xpadding_borderless_dark_large_layout_left"
    end
  end

end
