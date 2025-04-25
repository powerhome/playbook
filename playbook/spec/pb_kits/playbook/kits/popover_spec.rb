# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_popover/popover"

RSpec.describe Playbook::PbPopover::Popover do
  subject { Playbook::PbPopover::Popover }

  it { is_expected.to define_prop(:append_to).with_default("body") }
  it { is_expected.to define_prop(:position) }
  it { is_expected.to define_prop(:trigger_element_id) }
  it { is_expected.to define_prop(:tooltip_id) }
  it { is_expected.to define_boolean_prop(:offset).with_default(false) }
  it {
    is_expected.to define_enum_prop(:close_on_click)
      .with_default("none")
      .with_values("none", "outside", "inside", "any")
  }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_popover_kit"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_popover_kit additional_class"
    end
  end
end
