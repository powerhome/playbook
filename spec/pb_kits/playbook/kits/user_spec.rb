# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_user/user"

RSpec.describe Playbook::PbUser::User do
  subject { Playbook::PbUser::User }

  it { is_expected.to define_partial }

  it { is_expected.to define_enum_prop(:align)
                      .with_default("left")
                      .with_values("left", "center", "right")}
  it { is_expected.to define_boolean_prop(:avatar)
                      .with_default(false) }
  it { is_expected.to define_prop(:avatar_url) }
  it { is_expected.to define_prop(:name) }
  it { is_expected.to define_enum_prop(:orientation)
                      .with_default("horizontal")
                      .with_values("vertical", "horizontal")}
  it { is_expected.to define_enum_prop(:size)
                      .with_default("sm")
                      .with_values("lg", "md", "sm")}
  it { is_expected.to define_prop(:title) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_user_kit_left_horizontal_sm"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_user_kit_left_horizontal_sm additional_class"
      expect(subject.new({size: "lg"}).classname).to eq "pb_user_kit_left_horizontal_lg"
      expect(subject.new({orientation: "vertical"}).classname).to eq "pb_user_kit_left_vertical_sm"
      expect(subject.new({align: "right"}).classname).to eq "pb_user_kit_right_horizontal_sm"
      expect(subject.new({size: "md", align: "center", orientation: "vertical"}).classname).to eq "pb_user_kit_center_vertical_md"
    end
  end
end
