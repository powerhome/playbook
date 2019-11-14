# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_nav/nav"

RSpec.describe Playbook::PbNav::Nav do
  subject { Playbook::PbNav::Nav }

  it { is_expected.to define_partial }

  it { is_expected.to define_prop(:link)
                  .with_default("#") }
  it { is_expected.to define_prop(:title) }
  it { is_expected.to define_enum_prop(:orientation)
                      .with_values("horizontal", "vertical")
                      .with_default("vertical")}

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to start_with "pb_nav_list_vertical"
      expect(subject.new(orientation: "horizontal").classname).to eq "pb_nav_list_horizontal"
      expect(subject.new(orientation: "vertical").classname).to eq "pb_nav_list_vertical"
    end
  end

end
