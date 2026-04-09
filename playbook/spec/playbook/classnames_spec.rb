# frozen_string_literal: true

require_relative "../../app/pb_kits/playbook/pb_body/body"

RSpec.describe Playbook::Classnames do
  # Tests use Body as a concrete kit that includes Classnames via KitBase.
  # All assertions are on the public interface (generate_classname return
  # values), not on internal implementation details.

  describe "#generate_classname" do
    it "joins name parts with the default underscore separator" do
      instance = Playbook::PbBody::Body.new(text: "test")

      result = instance.generate_classname("part_one", "part_two")

      expect(result).to start_with("part_one_part_two")
    end

    it "joins name parts with a custom separator" do
      instance = Playbook::PbBody::Body.new(text: "test")

      result = instance.generate_classname("part_one", "part_two", separator: " ")

      expect(result).to start_with("part_one part_two")
    end

    it "compacts nil name parts" do
      instance = Playbook::PbBody::Body.new(text: "test")

      result = instance.generate_classname("base", nil, "extra")

      expect(result).to start_with("base_extra")
    end

    it "appends the classname prop when provided" do
      instance = Playbook::PbBody::Body.new(text: "test", classname: "custom_class")

      result = instance.generate_classname("pb_body_kit")

      expect(result).to include("custom_class")
    end

    it "does not include a custom classname when not provided" do
      instance = Playbook::PbBody::Body.new(text: "test")

      result = instance.generate_classname("pb_body_kit")

      expect(result).to eq(result.strip)
      expect(result).to start_with("pb_body_kit")
    end

    it "appends dark class when dark prop is true" do
      instance = Playbook::PbBody::Body.new(text: "test", dark: true)

      result = instance.generate_classname("pb_body_kit")

      expect(result).to include("dark")
    end

    it "does not append dark class when dark prop is false" do
      instance = Playbook::PbBody::Body.new(text: "test", dark: false)

      result = instance.generate_classname("pb_body_kit")

      expect(result).not_to include("dark")
    end

    it "appends spacing classes when margin is set" do
      instance = Playbook::PbBody::Body.new(text: "test", margin: "md")

      result = instance.generate_classname("pb_body_kit")

      expect(result).to include("m_md")
    end

    it "appends spacing classes when padding is set" do
      instance = Playbook::PbBody::Body.new(text: "test", padding: "lg")

      result = instance.generate_classname("pb_body_kit")

      expect(result).to include("p_lg")
    end

    it "appends shadow class when shadow prop is set" do
      instance = Playbook::PbBody::Body.new(text: "test", shadow: "deep")

      result = instance.generate_classname("pb_body_kit")

      expect(result).to include("shadow_deep")
    end

    it "appends display class when display prop is set" do
      instance = Playbook::PbBody::Body.new(text: "test", display: "flex")

      result = instance.generate_classname("pb_body_kit")

      expect(result).to include("display_flex")
    end

    it "appends cursor class when cursor prop is set" do
      instance = Playbook::PbBody::Body.new(text: "test", cursor: "pointer")

      result = instance.generate_classname("pb_body_kit")

      expect(result).to include("cursor_pointer")
    end

    it "appends multiple utility classes together" do
      instance = Playbook::PbBody::Body.new(
        text: "test",
        margin: "md",
        padding: "sm",
        shadow: "deep",
        display: "flex",
        dark: true
      )

      result = instance.generate_classname("pb_body_kit")

      expect(result).to include("m_md")
      expect(result).to include("p_sm")
      expect(result).to include("shadow_deep")
      expect(result).to include("display_flex")
      expect(result).to include("dark")
    end

    it "returns only the base class when no utility props are set" do
      instance = Playbook::PbBody::Body.new(text: "test")

      result = instance.generate_classname("pb_body_kit")

      expect(result).to eq("pb_body_kit")
    end

    it "includes position class when position is set" do
      instance = Playbook::PbBody::Body.new(text: "test", position: "relative")

      result = instance.generate_classname("pb_body_kit")

      expect(result).to include("position_relative")
    end

    it "includes border_radius class when border_radius is set" do
      instance = Playbook::PbBody::Body.new(text: "test", border_radius: "md")

      result = instance.generate_classname("pb_body_kit")

      expect(result).to include("border_radius_md")
    end

    it "includes text_align class when text_align is set" do
      instance = Playbook::PbBody::Body.new(text: "test", text_align: "center")

      result = instance.generate_classname("pb_body_kit")

      expect(result).to include("text_align_center")
    end

    it "includes z_index class when z_index is set" do
      instance = Playbook::PbBody::Body.new(text: "test", z_index: "5")

      result = instance.generate_classname("pb_body_kit")

      expect(result).to include("z_index_5")
    end

    it "includes height class when height is set" do
      instance = Playbook::PbBody::Body.new(text: "test", height: "auto")

      result = instance.generate_classname("pb_body_kit")

      expect(result).to include("height_auto")
    end

    it "includes overflow class when overflow is set" do
      instance = Playbook::PbBody::Body.new(text: "test", overflow: "hidden")

      result = instance.generate_classname("pb_body_kit")

      expect(result).to include("overflow_hidden")
    end

    it "includes truncate class when truncate is set" do
      instance = Playbook::PbBody::Body.new(text: "test", truncate: "1")

      result = instance.generate_classname("pb_body_kit")

      expect(result).to include("truncate_1")
    end

    it "supports responsive spacing with hash values" do
      instance = Playbook::PbBody::Body.new(
        text: "test",
        margin: { default: "md", sm: "lg", md: "xl" }
      )

      result = instance.generate_classname("pb_body_kit")

      expect(result).to include("m_md")
      expect(result).to include("break_on_sm:m_lg")
      expect(result).to include("break_on_md:m_xl")
    end
  end

  describe "#generate_classname_without_spacing" do
    it "joins name parts and appends the classname prop" do
      instance = Playbook::PbBody::Body.new(text: "test", classname: "custom")

      result = instance.generate_classname_without_spacing("pb_body_kit", "extra")

      expect(result).to eq("pb_body_kit_extra custom")
    end

    it "does not include utility prop classes" do
      instance = Playbook::PbBody::Body.new(
        text: "test",
        margin: "md",
        shadow: "deep",
        display: "flex"
      )

      result = instance.generate_classname_without_spacing("pb_body_kit")

      expect(result).not_to include("m_md")
      expect(result).not_to include("shadow_deep")
      expect(result).not_to include("display_flex")
    end

    it "does not include dark class" do
      instance = Playbook::PbBody::Body.new(text: "test", dark: true)

      result = instance.generate_classname_without_spacing("pb_body_kit")

      expect(result).not_to include("dark")
    end

    it "returns only the base class when no classname prop is set" do
      instance = Playbook::PbBody::Body.new(text: "test")

      result = instance.generate_classname_without_spacing("pb_body_kit")

      expect(result).to eq("pb_body_kit")
    end
  end

  describe "#dark_props" do
    it "returns 'dark' when dark is true" do
      instance = Playbook::PbBody::Body.new(text: "test", dark: true)

      expect(instance.send(:dark_props)).to eq("dark")
    end

    it "returns nil when dark is false" do
      instance = Playbook::PbBody::Body.new(text: "test", dark: false)

      expect(instance.send(:dark_props)).to be_nil
    end
  end
end
