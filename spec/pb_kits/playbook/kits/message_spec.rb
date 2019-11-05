# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_message/message"

RSpec.describe Playbook::PbMessage::Message do
  subject { Playbook::PbMessage::Message }

  it { is_expected.to define_partial }

  it { is_expected.to define_prop(:avatar) }
  it { is_expected.to define_prop(:avatar_name) }
  it { is_expected.to define_prop(:avatar_status) }
  it { is_expected.to define_prop(:avatar_url) }
  it { is_expected.to define_prop(:label) }
  it { is_expected.to define_prop(:message) }
  it { is_expected.to define_prop(:timestamp) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_message_kit"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_message_kit additional_class"
    end
  end
end
