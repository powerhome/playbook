# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_online_status/online_status"

RSpec.describe Playbook::PbOnlineStatus::OnlineStatus do
  subject { Playbook::PbOnlineStatus::OnlineStatus }

  it { is_expected.to define_partial }

  it { is_expected.to define_enum_prop(:status)
                      .with_default("offline")
                      .with_values("online", "offline", "away") }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_online_status_kit_offline"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_online_status_kit_offline additional_class"
    end
  end
end
