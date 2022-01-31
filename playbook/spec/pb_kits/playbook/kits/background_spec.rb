# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_background/background"

RSpec.describe Playbook::PbBackground::Background do
  subject { Playbook::PbBackground::Background }

  it { is_expected.to define_prop(:image_url) }
  it {
    is_expected.to define_enum_prop(:tag)
      .with_default("div")
      .with_values("h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "div")
  }
  it {
    is_expected.to define_enum_prop(:background_color)
      .with_default("light")
      .with_values("gradient", "dark", "light", "white", "success", "warning", "error", "info", "neutral", "primary", "category_1", "category_2", "category_3", "category_4", "category_5", "category_6", "category_7", "category_8", "category_9", "category_10", "category_11", "category_12", "category_13", "category_14", "category_15", "category_16", "category_17", "category_18", "category_19", "category_20", "category_21")
  }
  it {
    is_expected.to define_enum_prop(:transition)
      .with_default(nil)
      .with_values("fade", "blur", "scale", nil)
  }
  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_background_kit lazyload pb_background_color_light"
      expect(subject.new(background_color: "gradient").classname).to eq "pb_background_kit lazyload pb_background_color_gradient"
      expect(subject.new(padding: "xl").classname).to eq "pb_background_kit lazyload pb_background_color_light p_xl"
      expect(subject.new(background_color: "success").classname).to eq "pb_background_kit lazyload pb_background_color_success"
      expect(subject.new(background_color: "category_1").classname).to eq "pb_background_kit lazyload pb_background_color_category_1"
      expect(subject.new(transition: "fade").classname).to eq "pb_background_kit lazyload pb_background_color_light"
    end
  end
end
