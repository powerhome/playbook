# frozen_string_literal: true

RSpec.describe Playbook::Props do
  describe "base props" do
    subject do
      Class.new do
        include Playbook::Props
      end
    end

    it { is_expected.to define_prop(:id) }
    it { is_expected.to define_hash_prop(:data).with_default({}) }
    it { is_expected.to define_prop(:classname) }
    it { is_expected.to define_hash_prop(:aria).with_default({}) }

    describe "can be overwritten with custom values" do
      it "#id" do
        instance = subject.new(id: "123")
        expect(instance.id).to eq("123")
      end

      it "#data" do
        instance = subject.new(data: { foo: :bar })
        expect(instance.data).to eq(foo: :bar)
      end

      it "#classname" do
        instance = subject.new(classname: "foo_bar")
        expect(instance.classname).to eq("foo_bar")
      end

      it "#aria" do
        instance = subject.new(aria: { bar: :baz })
        expect(instance.aria).to eq(bar: :baz)
      end
    end

    describe ".props" do
      it "returns collection of available properties" do
        expect(subject.props).to include(:id, :data, :classname, :aria)
      end
    end
  end

  describe "additional props" do
    subject do
      Class.new do
        include Playbook::Props

        prop :string_prop, type: Playbook::Props::String, default: "foo"
        prop :boolean_prop, type: Playbook::Props::Boolean, default: true
        prop :hash_prop, type: Playbook::Props::Hash, default: { baz: :foo }
        prop :enum_prop, type: Playbook::Props::Enum,
                         values: %i[up down left right],
                         default: :right
        prop :default_prop
      end
    end

    it { is_expected.to define_string_prop(:string_prop).with_default("foo") }
    it { is_expected.to define_boolean_prop(:boolean_prop).with_default(true) }
    it { is_expected.to define_hash_prop(:hash_prop).with_default(baz: :foo) }
    it do
      is_expected.to define_enum_prop(:enum_prop)
                     .with_default(:right)
                     .with_values(:up, :down, :left, :right)
    end
    it { is_expected.to define_string_prop(:default_prop).with_default(nil) }

    describe "can be overwritten with custom values" do
      it "as string" do
        instance = subject.new(string_prop: "custom_string")
        expect(instance.string_prop).to eq("custom_string")
      end

      it "as boolean" do
        instance = subject.new(boolean_prop: true)
        expect(instance.boolean_prop).to eq(true)
      end

      it "as hash" do
        instance = subject.new(hash_prop: { custom: :value })
        expect(instance.hash_prop).to eq(custom: :value)
      end

      it "as enum" do
        instance = subject.new(enum_prop: :down)
        expect(instance.enum_prop).to eq(:down)
      end
    end

    describe ".props" do
      it "returns collection of available properties", :aggregate_failures do
        expect(subject.props).to include(:id, :data, :classname, :aria)
        expect(subject.props).to include(:string_prop, :boolean_prop, :hash_prop, :enum_prop, :default_prop)
      end
    end
  end
end
