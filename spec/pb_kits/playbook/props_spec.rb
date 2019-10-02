# frozen_string_literal: true

module Playbook
  describe Props do
    class BasePropsClass
      include Playbook::Props
    end

    describe "base props" do
      subject { BasePropsClass }

      it { is_expected.to define_prop(:id).with_default(nil) }
      it { is_expected.to define_prop(:data).of_type(Props::Hash).with_default({}) }
      it { is_expected.to define_prop(:classname).with_default("") }
      it { is_expected.to define_prop(:aria).of_type(Props::Hash).with_default({}) }

      describe "can be overwritten with custom values" do
        it "#id" do
          instance = BasePropsClass.new(id: "123")
          expect(instance.id).to eq("123")
        end

        it "#data" do
          instance = BasePropsClass.new(data: { foo: :bar })
          expect(instance.data).to eq(foo: :bar)
        end

        it "#classname" do
          instance = BasePropsClass.new(classname: "foo_bar")
          expect(instance.classname).to eq("foo_bar")
        end

        it "#aria" do
          instance = BasePropsClass.new(aria: { bar: :baz })
          expect(instance.aria).to eq(bar: :baz)
        end
      end
    end

    class ExtendedPropsClass
      include Playbook::Props

      prop :string_prop, default: "foo"
      prop :boolean_prop, type: Playbook::Props::Boolean, default: true
      prop :hash_prop, type: Playbook::Props::Hash, default: { baz: :foo }
      prop :enum_prop, type: Playbook::Props::Enum,
                       values: %i[up down left right],
                       default: :right
    end

    describe "additional props" do
      subject { ExtendedPropsClass }

      it { is_expected.to define_prop(:string_prop).with_default("foo") }
      it { is_expected.to define_prop(:boolean_prop).of_type(Props::Boolean).with_default(true) }
      it { is_expected.to define_prop(:hash_prop).of_type(Props::Hash).with_default(baz: :foo) }
      it { is_expected.to define_prop(:enum_prop).of_type(Props::Enum).with_default(:right) }

      describe "can be overwritten with custom values" do
        it "as string" do
          instance = ExtendedPropsClass.new(string_prop: "custom_string")
          expect(instance.string_prop).to eq("custom_string")
        end

        it "as boolean" do
          instance = ExtendedPropsClass.new(boolean_prop: true)
          expect(instance.boolean_prop).to eq(true)
        end

        it "as hash" do
          instance = ExtendedPropsClass.new(hash_prop: { custom: :value })
          expect(instance.hash_prop).to eq(custom: :value)
        end

        it "as enum" do
          instance = ExtendedPropsClass.new(enum_prop: :down)
          expect(instance.enum_prop).to eq(:down)
        end
      end
    end

    describe ".props" do
      it "returns collection of available properties", :aggregate_failures do
        expect(BasePropsClass.props).to include(:id, :data, :classname, :aria)
        expect(BasePropsClass.props).to_not include(:string_prop, :boolean_prop, :hash_prop, :enum_prop)

        expect(ExtendedPropsClass.props).to include(:id, :data, :classname, :aria)
        expect(ExtendedPropsClass.props).to include(:string_prop, :boolean_prop, :hash_prop, :enum_prop)
      end
    end
  end
end
