# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_drawer/drawer"

RSpec.describe Playbook::PbDrawer::Drawer do
  subject { Playbook::PbDrawer::Drawer }

  it {
    is_expected.to define_enum_prop(:size)
      .with_values("xs", "sm", "md", "lg", "xl", "full")
      .with_default("md")
  }

  it {
    is_expected.to define_enum_prop(:placement)
      .with_values("left", "right", "bottom")
      .with_default("left")
  }

  it {
    is_expected.to define_enum_prop(:behavior)
      .with_values("floating", "push")
      .with_default("floating")
  }

  it {
    is_expected.to define_enum_prop(:border)
      .with_values("full", "none", "right", "left")
      .with_default("none")
  }

  it {
    is_expected.to define_enum_prop(:breakpoint)
      .with_values("none", "xs", "sm", "md", "lg", "xl")
      .with_default("none")
  }

  it {
    is_expected.to define_boolean_prop(:overlay)
      .with_default(true)
  }

  it {
    is_expected.to define_boolean_prop(:within_element)
      .with_default(false)
  }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      # Default drawer: size "md", placement "left", no within element, no border
      expect(subject.new({}).classname.strip).to eq "pb_drawer pb_drawer_md_left"

      # When within_element is true
      expect(subject.new(within_element: true).classname.strip)
        .to eq "pb_drawer pb_drawer_md_left pb_drawer_within_element_rails"

      # When border is set to 'full'
      expect(subject.new(border: "full").classname.strip)
        .to eq "pb_drawer pb_drawer_md_left  drawer_border-full"

      # When border is set to 'right'
      expect(subject.new(border: "right").classname.strip)
        .to eq "pb_drawer pb_drawer_md_left  drawer_border-right"

      # When border is set to 'left'
      expect(subject.new(border: "left").classname.strip)
        .to eq "pb_drawer pb_drawer_md_left  drawer_border-left"

      # Combination of different size and placement
      expect(subject.new(size: "lg", placement: "bottom").classname.strip)
        .to eq "pb_drawer pb_drawer_lg_bottom"
    end
  end
end
