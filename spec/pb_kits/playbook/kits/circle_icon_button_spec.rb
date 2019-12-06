# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_circle_icon_button/circle_icon_button"

RSpec.describe Playbook::PbCircleIconButton::CircleIconButton do
  subject { Playbook::PbCircleIconButton::CircleIconButton }

  it { is_expected.to define_partial }

  it { is_expected.to define_prop(:button)
                      .of_type(Playbook::Props::Hash)
                      .that_is_required }

  it { is_expected.to define_prop(:icon).that_is_required }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new(icon: "user", button: {variant: "primary"}).classname).to eq "pb_circle_icon_button_kit"
      expect(subject.new(icon: "user", button: {variant: "primary"}, classname: "additional_class").classname).to eq "pb_circle_icon_button_kit additional_class"
    end
  end

  it "raises an error when not given an icon or button" do
    expect { subject.new({}) }.to raise_error(Playbook::Props::Error)
  end
end
