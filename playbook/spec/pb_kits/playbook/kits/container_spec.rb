# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_container/container"

RSpec.describe Playbook::PbContainer::Container do
  subject { Playbook::PbContainer::Container }

  it do
    is_expected.to define_enum_prop(:tag)
      .with_default("div")
      .with_values("div", "span", "a", "button", "option", "table", "tbody", "thead", "tfoot", "tr", "td", "th", "img", "section", "article", "main", "header", "footer", "nav", "aside")
  end

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_container_kit"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_container_kit additional_class"
      expect(subject.new(padding: "md").classname).to eq "pb_container_kit p_md"
      expect(subject.new(border_radius: "lg").classname).to eq "pb_container_kit border_radius_lg"
      expect(subject.new(hover: { shadow: "deepest" }).classname).to eq "pb_container_kit hover_shadow_deepest"
    end
  end
end
