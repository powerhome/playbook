# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_user_badge/user_badge"

RSpec.describe Playbook::PbUserBadge::UserBadge do
  subject { Playbook::PbUserBadge::UserBadge }

  it { is_expected.to define_partial }

  it { is_expected.to define_enum_prop(:badge)
                      .with_default("million-dollar")
                      .with_values("million-dollar", "veteran")}
  it { is_expected.to define_enum_prop(:size)
                      .with_default("md")
                      .with_values("lg", "md", "sm")}

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_user_badge_kit_md"
      expect(subject.new(size: "lg").classname).to eq "pb_user_badge_kit_lg"
      expect(subject.new(size: "lg", dark: true).classname).to eq "pb_user_badge_kit_lg dark"
    end
  end
end
