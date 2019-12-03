# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_circle_icon_button/circle_icon_button"

RSpec.describe Playbook::PbCircle icon button::Circle icon button do
  subject { Playbook::PbCircle icon button::Circle icon button }

  it { is_expected.to define_partial }

  it { is_expected.to define_enum_prop(:variant)
                      .with_default("primary")
                      .with_values("primary", "secondary", "link") }
  it { is_expected.to define_boolean_prop(:dark).with_default(false) }
  it { is_expected.to define_boolean_prop(:disabled).with_default(false) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_circle_icon_button_kit"
    end
  end
end
