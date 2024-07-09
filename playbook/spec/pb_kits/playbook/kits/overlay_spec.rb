# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_overlay/overlay"

RSpec.describe Playbook::PbOverlay::Overlay do
  subject { Playbook::PbOverlay::Overlay }

  let(:test_id) { "overlay" }

  describe "data prop" do
    it "passes data prop" do
      props = { data: { testid: test_id } }
      kit = subject.new(props)

      expect(kit.data[:testid]).to eq(test_id)
    end
  end

  describe "className prop" do
    it "passes className prop" do
      classname = "custom-class-name"
      props = { classname: classname, data: { testid: test_id } }
      kit = subject.new(props)

      expect(kit.classname).to include(classname)
    end
  end

  describe "aria prop" do
    it "passes aria prop" do
      props = { aria: { label: test_id }, data: { testid: test_id } }
      kit = subject.new(props)

      expect(kit.aria[:label]).to eq(test_id)
    end
  end

  describe "id prop" do
    it "passes id prop" do
      props = { data: { testid: test_id }, id: test_id }
      kit = subject.new(props)

      expect(kit.id).to eq(test_id)
    end
  end
end
