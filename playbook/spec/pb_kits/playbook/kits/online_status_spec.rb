# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_online_status/online_status"

RSpec.describe Playbook::PbOnlineStatus::OnlineStatus do
  subject { Playbook::PbOnlineStatus::OnlineStatus }

  it {
    is_expected.to define_enum_prop(:status)
      .with_default("offline")
      .with_values("online", "offline", "away", "error", "neutral", "success", "warning", "info", "primary")
  }
  it {
    is_expected.to define_enum_prop(:size)
      .with_default("sm")
      .with_values("sm", "md", "lg")
  }
  it { is_expected.to define_boolean_prop(:no_border).with_default(false) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_online_status_kit_offline_size_sm"
      expect(subject.new(dark: true).classname).to eq "pb_online_status_kit_offline_size_sm dark"
      expect(subject.new(status: "online").classname).to eq "pb_online_status_kit_online_size_sm"
      expect(subject.new(size: "lg").classname).to eq "pb_online_status_kit_offline_size_lg"
      expect(subject.new(no_border: true).classname).to eq "pb_online_status_kit_offline_no_border_size_sm"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_online_status_kit_offline_size_sm additional_class"
      expect(subject.new(status: "online", size: "lg", no_border: true, classname: "additional_class", dark: true).classname).to eq "pb_online_status_kit_online_no_border_size_lg additional_class dark"
    end
  end
end
