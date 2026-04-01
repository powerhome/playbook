# frozen_string_literal: true

RSpec.describe Playbook::KitBase do
  subject { Playbook::KitBase }

  it { is_expected.to define_prop(:id) }
  it { is_expected.to define_hash_prop(:data).with_default({}) }
  it { is_expected.to define_hash_prop(:html_options).with_default({}) }
  it { is_expected.to define_prop(:classname) }
  it { is_expected.to define_hash_prop(:aria).with_default({}) }
  it { is_expected.to define_prop(:margin) }
  it { is_expected.to define_prop(:margin_bottom) }
  it { is_expected.to define_prop(:margin_left) }
  it { is_expected.to define_prop(:margin_right) }
  it { is_expected.to define_prop(:margin_top) }
  it { is_expected.to define_prop(:margin_x) }
  it { is_expected.to define_prop(:margin_y) }
  it { is_expected.to define_prop(:padding) }
  it { is_expected.to define_prop(:padding_bottom) }
  it { is_expected.to define_prop(:padding_left) }
  it { is_expected.to define_prop(:padding_right) }
  it { is_expected.to define_prop(:padding_top) }
  it { is_expected.to define_prop(:padding_x) }
  it { is_expected.to define_prop(:padding_y) }
  it { is_expected.to define_boolean_prop(:dark).with_default(false) }
  it { is_expected.to define_prop(:shadow) }
  it { is_expected.to define_prop(:line_height) }
  it { is_expected.to define_prop(:display) }
  it { is_expected.to define_prop(:cursor) }
  it { is_expected.to define_prop(:flex_direction) }
  it { is_expected.to define_prop(:flex_wrap) }
  it { is_expected.to define_prop(:justify_content) }
  it { is_expected.to define_prop(:justify_self) }
  it { is_expected.to define_prop(:align_items) }
  it { is_expected.to define_prop(:align_content) }
  it { is_expected.to define_prop(:align_self) }
  it { is_expected.to define_prop(:flex) }
  it { is_expected.to define_prop(:flex_grow) }
  it { is_expected.to define_prop(:flex_shrink) }
  it { is_expected.to define_prop(:order) }
  it { is_expected.to define_prop(:truncate) }

  describe "#children" do
    it "allows to be passed as prop" do
      block = -> { 42 }

      kit = subject.new(children: block)

      expect(kit.children.call).to eql 42
    end

    it "allows to be passed as a block" do
      kit = subject.new({}) { 42 }

      expect(kit.children.call).to eql 42
    end
  end

  describe "#generate_classname" do
    it "with default separator" do
      instance = subject.new(classname: "passed_classname")

      expect(instance.generate_classname("separate", "with", "default")).to eq(
        "separate_with_default passed_classname"
      )
    end

    it "with custom separator" do
      instance = subject.new(classname: "passed_classname")

      expect(instance.generate_classname("separate", "with", "custom", separator: "X")).to eq(
        "separateXwithXcustom passed_classname"
      )
      expect(instance.generate_classname("separate", "with", "custom", separator: " ")).to eq(
        "separate with custom passed_classname"
      )
    end
  end

  describe "#combined_html_options" do
    it "returns data and aria attributes when no html_options are set" do
      instance = subject.new(data: { testid: "abc" }, aria: { label: "test" })

      result = instance.combined_html_options

      expect(result[:data]).to eq(testid: "abc")
      expect(result[:aria]).to eq(label: "test")
    end

    it "merges html_options into the result" do
      instance = subject.new(html_options: { role: "button", tabindex: 0 })

      result = instance.combined_html_options

      expect(result[:role]).to eq("button")
      expect(result[:tabindex]).to eq(0)
    end

    it "converts style hash to CSS string" do
      instance = subject.new(html_options: { style: { background_color: "red", font_size: "14px" } })

      result = instance.combined_html_options

      expect(result[:style]).to include("background-color: red")
      expect(result[:style]).to include("font-size: 14px")
    end
  end

  describe "#data_attributes" do
    it "returns a hash with data and aria keys" do
      instance = subject.new(data: { testid: "x" }, aria: { label: "y" })

      result = instance.send(:data_attributes)

      expect(result).to eq(data: { testid: "x" }, aria: { label: "y" })
    end

    it "returns empty hashes when data and aria are not set" do
      instance = subject.new({})

      result = instance.send(:data_attributes)

      expect(result).to eq(data: {}, aria: {})
    end
  end

  describe "#global_inline_props" do
    it "returns height values when set" do
      instance = subject.new(height: "100px")

      result = instance.global_inline_props

      expect(result[:height]).to eq("100px")
    end

    it "returns an empty hash when no height props are set" do
      instance = subject.new({})

      result = instance.global_inline_props

      expect(result).to be_empty
    end
  end
end
