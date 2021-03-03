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

      another_instance = subject.new(classname: "passed_classname")

      expect(instance.generate_classname("separate", "with", "custom", separator: " ")).to eq(
        "separate with custom passed_classname"
      )
    end
  end
end
