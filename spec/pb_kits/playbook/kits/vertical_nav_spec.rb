# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_vertical_nav/vertical_nav"

RSpec.describe Playbook::PbVerticalNav::VerticalNav do
  subject { Playbook::PbVerticalNav::VerticalNav }

  it { is_expected.to define_partial }

  it { is_expected.to define_prop(:link)
                  .with_default("#") }
  it { is_expected.to define_prop(:title) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "vertical_nav_list"
      expect(subject.new(classname: "additional_class").classname).to eq "vertical_nav_list additional_class"
    end
  end
end
