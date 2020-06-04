# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_avatar_action_button/avatar_action_button"

RSpec.describe Playbook::PbAvatarActionButton::AvatarActionButton do
  subject { Playbook::PbAvatarActionButton::AvatarActionButton }

  it { is_expected.to define_partial }
  it { is_expected.to define_prop(:action)
                  .with_default("add") }
  it { is_expected.to define_prop(:image_url) }
  it { is_expected.to define_prop(:link_url) }
  it { is_expected.to define_prop(:tooltip_text) }
  it { is_expected.to define_prop(:tooltip_id) }
  it { is_expected.to define_prop(:name)
                  .with_default("") }
  it { is_expected.to define_enum_prop(:size)
                  .with_default("md")
                  .with_values("xs", "sm", "md", "lg", "xl") }
  it { is_expected.to define_enum_prop(:placement)
                  .with_default("bottom_left")
                  .with_values("bottom_left", "bottom_right", "top_left", "top_right") }
  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_avatar_action_button_kit_add_md_bottom_left"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_avatar_action_button_kit_add_md_bottom_left additional_class"
      expect(subject.new(size: "lg").classname).to eq "pb_avatar_action_button_kit_add_lg_bottom_left"
      expect(subject.new(placement: "top_right").classname).to eq "pb_avatar_action_button_kit_add_md_top_right"
      expect(subject.new(action: "remove").classname).to eq "pb_avatar_action_button_kit_remove_md_bottom_left"
    end
  end
end
