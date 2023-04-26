# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_background/background"

RSpec.describe Playbook::PbBackground::Background do
  subject { Playbook::PbBackground::Background }

  it { is_expected.to define_prop(:image_url) }
  it {
    is_expected.to define_enum_prop(:tag)
      .with_default("div")
      .with_values("h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "div", "tr", "td", "th")
  }
  it {
    is_expected.to define_enum_prop(:background_color)
      .with_default("light")
      .with_values("gradient", "dark", "light", "white", "success", "warning", "error", "info", "neutral", "primary", "shadow", "category_1", "category_2", "category_3", "category_4", "category_5", "category_6", "category_7", "category_8", "category_9", "category_10", "category_11", "category_12", "category_13", "category_14", "category_15", "category_16", "category_17", "category_18", "category_19", "category_20", "category_21", "text_lt_default", "text_lt_light", "text_lt_lighter", "text_dk_default", "text_dk_light", "text_dk_lighter", "card_light", "card_dark", "data_1", "data_2", "data_3", "data_4", "data_5", "data_6", "data_7", "data_8", "border_light", "border_dark", "success_secondary", "error_secondary", "info_secondary", "warning_secondary", "neutral_secondary", "primary_secondary", "success_subtle", "warning_subtle", "error_subtle", "info_subtle", "neutral_subtle")
  }
  it {
    is_expected.to define_enum_prop(:transition)
      .with_default(nil)
      .with_values("fade", "blur", "scale", nil)
  }
  it { is_expected.to define_prop(:custom_color) }

  it {
    is_expected.to define_enum_prop(:background_repeat)
      .with_default("initial")
      .with_values("repeat", "repeat-x", "repeat-y", "no-repeat", "space", "round", "initial", "inherit")
  }
  it {
    is_expected.to define_enum_prop(:background_size)
      .with_default("cover")
      .with_values("cover", "contain", "auto")
  }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_background_kit pb_background_color_light"
      expect(subject.new(background_color: "gradient").classname).to eq "pb_background_kit pb_background_color_gradient"
      expect(subject.new(padding: "xl").classname).to eq "pb_background_kit pb_background_color_light p_xl"
      expect(subject.new(background_color: "success").classname).to eq "pb_background_kit pb_background_color_success"
      expect(subject.new(background_color: "category_1").classname).to eq "pb_background_kit pb_background_color_category_1"
      expect(subject.new(transition: "fade", image_url: "test.jpeg").classname).to eq "pb_background_kit pb_background_color_light lazyload fade"
      expect(subject.new(custom_color: "#1d99a8").classname).to eq "pb_background_kit pb_background_custom_color"
    end
  end

  describe "#custom_background_color" do
    it "returns a hash with a hex value assigned to the background-color" do
      kit = subject.new(custom_color: "#1d99a8")

      expect(kit.custom_background_color).to eq "background-color: #1d99a8;"
    end
  end
end
