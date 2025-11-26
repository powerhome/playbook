# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_time_picker/time_picker"

RSpec.describe Playbook::PbTimePicker::TimePicker do
  subject { Playbook::PbTimePicker::TimePicker }

  it { is_expected.to define_prop(:default_value) }
  it { is_expected.to define_prop(:label) }
  it { is_expected.to define_prop(:show_timezone) }
  it { is_expected.to define_prop(:value) }

  describe "#classname" do
    it "returns pb_time_picker classname", :aggregate_failures do
      expect(subject.new.classname).to eq "pb_time_picker"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_time_picker additional_class"
    end
  end

  describe "#global props work as expected" do
    it "global props work" do
      expect(subject.new(margin: "lg").classname).to eq("pb_time_picker m_lg")
    end
  end

  describe "default values" do
    it "has correct defaults" do
      instance = subject.new
      expect(instance.label).to eq "Time Picker"
      expect(instance.show_timezone).to eq false
    end
  end
end
