# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_nav/item"

RSpec.describe Playbook::PbNav::Item do
  subject { Playbook::PbNav::Item }

  it { is_expected.to define_boolean_prop(:active) }
  it { is_expected.to define_boolean_prop(:highlighted_border) }
  it { is_expected.to define_prop(:link) }
  it { is_expected.to define_prop(:icon_left) }
  it { is_expected.to define_prop(:icon_right) }
  it { is_expected.to define_prop(:image_url) }
  it { is_expected.to define_prop(:collapsible) }
  it { is_expected.to define_prop(:collapsed) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to start_with "pb_nav_list_kit_item"
      expect(subject.new(active: true).classname).to eq "pb_nav_list_kit_item_active font_size_normal font_regular pb_nav_list_item_link"
      expect(subject.new(active: true, highlighted_border: false).classname).to eq "pb_nav_list_kit_item_active_highlighted_border_none font_size_normal font_regular pb_nav_list_item_link"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_nav_list_kit_item additional_class font_size_normal font_regular pb_nav_list_item_link"
      expect(subject.new(collapsible: true).classname).to eq "pb_nav_list_kit_item pb_collapsible_nav_item font_size_normal font_regular pb_nav_list_item_link_collapsible"
    end
  end
end
