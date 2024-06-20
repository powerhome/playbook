# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_overlay/overlay"

RSpec.describe Playbook::PbOverlay::Overlay do
  subject { Playbook::PbOverlay::Overlay }

  let(:test_id) { "overlay" }
  let(:children) { "This is the Overlay children" }

  describe "data prop" do
    it "passes data prop" do
      props = { children: children, data: { testid: test_id } }
      kit = subject.new(props)

      expect(kit).to be_in_the_document
    end
  end

  describe "className prop" do
    it "passes className prop" do
      class_name = "custom-class-name"
      props = { className: class_name, children: children, data: { testid: test_id } }
      kit = subject.new(props)

      expect(kit.classname).to include(class_name)
    end
  end

  describe "aria prop" do
    it "passes aria prop" do
      props = { aria: { label: test_id }, children: children, data: { testid: test_id } }
      kit = subject.new(props)

      expect(kit.attributes["aria-label"]).to eq(test_id)
    end
  end

  describe "id prop" do
    it "passes id prop" do
      props = { children: children, data: { testid: test_id }, id: test_id }
      kit = subject.new(props)

      expect(kit.attributes["id"]).to eq(test_id)
    end
  end
end
