# frozen_string_literal: true

module Playbook
  describe Props do
    class BasePropsClass
      include Playbook::Props
    end

    describe "base props" do
      it "includes id with default of nil" do
        test_class_instance = BasePropsClass.new({})
        expect(test_class_instance.id).to eq(nil)
      end

      it "includes data with default of {}" do
        test_class_instance = BasePropsClass.new({})
        expect(test_class_instance.data).to eq({})
      end

      it "includes classname with default of ''" do
        test_class_instance = BasePropsClass.new({})
        expect(test_class_instance.classname).to eq("")
      end

      it "includes aria with default of {}" do
        test_class_instance = BasePropsClass.new({})
        expect(test_class_instance.aria).to eq({})
      end

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
      it "can declare string prop with default" do
        test_class_instance = ExtendedPropsClass.new({})
        expect(test_class_instance.string_prop).to eq("foo")
      end

      it "can declare boolean string prop with default" do
        test_class_instance = ExtendedPropsClass.new({})
        expect(test_class_instance.boolean_prop).to eq(true)
      end

      it "can declare hash string prop with default" do
        test_class_instance = ExtendedPropsClass.new({})
        expect(test_class_instance.hash_prop).to eq({ baz: :foo})
      end

      it "can declare enum string prop with default" do
        test_class_instance = ExtendedPropsClass.new({})
        expect(test_class_instance.enum_prop).to eq(:right)
      end

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
