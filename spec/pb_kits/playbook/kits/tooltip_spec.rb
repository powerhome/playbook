# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_tooltip/tooltip"

RSpec.describe Playbook::PbTooltip::Tooltip do
  subject { Playbook::PbTooltip::Tooltip }

  it { is_expected.to define_partial }

  it { is_expected.to define_prop(:position) }
  it { is_expected.to define_prop(:trigger_element_id) }
  it { is_expected.to define_prop(:tooltip_id) }
  it { is_expected.to define_boolean_prop(:dark).with_default(false) }



  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new(dark: true).classname).to eq "pb_tooltip_kit_dark"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_tooltip_kit additional_class"
  end
  end

end
