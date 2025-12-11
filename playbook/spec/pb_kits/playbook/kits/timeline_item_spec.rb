# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_timeline/item"

RSpec.describe Playbook::PbTimeline::Item do
  subject { Playbook::PbTimeline::Item }

  it { is_expected.to define_prop(:date) }
  it {
    is_expected.to define_prop(:icon)
      .with_default("user")
  }
  it {
    is_expected.to define_enum_prop(:icon_color)
      .with_default("default")
      .with_values("default", "royal", "blue", "purple", "teal", "red", "yellow", "green")
  }
  it {
    is_expected.to define_enum_prop(:line_style)
      .with_default("solid")
      .with_values("solid", "dotted")
  }
  it {
    is_expected.to define_boolean_prop(:show_current_year)
      .with_default(false)
  }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_timeline_item_kit_solid"
      expect(subject.new(line_style: "solid").classname).to eq "pb_timeline_item_kit_solid"
      expect(subject.new(line_style: "dotted").classname).to eq "pb_timeline_item_kit_dotted"
    end
  end
end
