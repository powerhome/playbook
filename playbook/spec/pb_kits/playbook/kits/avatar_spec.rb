# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_avatar/avatar"

RSpec.describe Playbook::PbAvatar::Avatar do
  subject { Playbook::PbAvatar::Avatar }

  it { is_expected.to define_prop(:status) }
  it { is_expected.to define_prop(:image_url) }
  it { is_expected.to define_prop(:image_alt) }
  it {
    is_expected.to define_prop(:name)
      .with_default("")
  }
  it {
    is_expected.to define_enum_prop(:size)
      .with_default("md")
      .with_values("xxs", "xs", "sm", "md", "base", "lg", "xl")
  }
  it {
    is_expected.to define_boolean_prop(:grayscale)
      .with_default(false)
  }
  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_avatar_kit_size_md"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_avatar_kit_size_md additional_class"
      expect(subject.new(size: "lg").classname).to eq "pb_avatar_kit_size_lg"
    end
  end

  describe "with badge overlay" do
    it "renders with badge configuration" do
      avatar = subject.new(image_alt: "Terry Johnson", name: "Terry Johnson", component_overlay: {
                             component: "badge",
                             placement: "top-right",
                             text: "New",
                             variant: "error",
                           })
      expect(avatar.overlay_component).to eq "badge"
      expect(avatar.component_overlay[:text]).to eq "New"
      expect(avatar.component_overlay[:variant]).to eq "error"
      expect(avatar.component_overlay[:placement]).to eq "top-right"
    end
  end

  describe "with iconCircle overlay" do
    it "renders with iconCircle configuration" do
      avatar = subject.new(image_alt: "Terry Johnson", name: "Terry Johnson", component_overlay: {
                             component: "iconCircle",
                             placement: "bottom-left",
                             icon: "plus",
                             variant: "blue",
                           })
      expect(avatar.overlay_component).to eq "iconCircle"
      expect(avatar.component_overlay[:icon]).to eq "plus"
      expect(avatar.component_overlay[:variant]).to eq "blue"
      expect(avatar.component_overlay[:placement]).to eq "bottom-left"
    end
  end

  describe "with status" do
    it "renders with online status" do
      avatar = subject.new(image_alt: "Terry Johnson", name: "Terry Johnson", size: "xs", status: "online")
      expect(avatar.online_status_props[:status]).to eq "online"
      expect(avatar.online_status_props[:size]).to eq "sm"
    end
  end
end
