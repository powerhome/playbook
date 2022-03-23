# frozen_string_literal: true

RSpec.describe Playbook::KitBase do
  subject { Playbook::KitBase }

  it { is_expected.to define_prop(:id) }
  it { is_expected.to define_hash_prop(:data).with_default({}) }
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
end
