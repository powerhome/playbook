# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_circle_icon_button/circle_icon_button"

RSpec.describe Playbook::PbCircleIconButton::CircleIconButton do
  subject { Playbook::PbCircleIconButton::CircleIconButton }

  it { is_expected.to define_partial }

  it { is_expected.to define_enum_prop(:variant)
                      .with_default("primary")
                      .with_values("primary", "secondary", "link") }
  it { is_expected.to define_boolean_prop(:dark).with_default(false) }
  it { is_expected.to define_boolean_prop(:disabled).with_default(false) }
  it { is_expected.to define_prop(:icon).that_is_required }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      icon = "user"
      expect(subject.new(icon: icon).classname).to eq "pb_circle_icon_button_kit"
    end

    it "raises an error when not given an icon" do
      expect { subject.new{} }.to raise_error(Playbook::Props::Error)
    end
  end
end
