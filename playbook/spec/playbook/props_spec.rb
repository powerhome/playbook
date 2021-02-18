# frozen_string_literal: true

RSpec.describe Playbook::Props do
  subject! do
    Class.new do
      include Playbook::Props

      prop :base_prop
    end
  end
  let!(:subclass) do
    Class.new(subject) do
      prop :subclass_prop
    end
  end
  let!(:another_subclass) do
    Class.new(subject) do
      prop :another_subclass_prop
    end
  end

  it "allows to inherit the parent's props and add to it" do
    expect(subject).to define_prop(:base_prop)
    expect(subject).to_not define_prop(:subclass_prop)
    expect(subject).to_not define_prop(:another_subclass_prop)

    expect(subclass).to define_prop(:base_prop)
    expect(subclass).to define_prop(:subclass_prop)
    expect(subclass).to_not define_prop(:another_subclass_prop)

    expect(another_subclass).to define_prop(:base_prop)
    expect(another_subclass).to_not define_prop(:subclass_prop)
    expect(another_subclass).to define_prop(:another_subclass_prop)
  end

  describe "can be overwritten with custom values" do
    it "#id" do
      instance = subject.new(base_prop: "123")
      expect(instance.base_prop).to eq("123")
    end
  end

  describe ".props" do
    it "returns collection of available properties" do
      expect(another_subclass.props.keys).to match_array [:base_prop, :another_subclass_prop]
    end
  end

  describe "required props" do
    subject do
      Class.new do
        include Playbook::Props

        def self.to_s
          "TestClassForRequiredProps"
        end

        prop :required_prop, required: true
      end
    end

    it { is_expected.to define_string_prop(:required_prop).that_is_required }

    it "raises error when not given a value" do
      expect { subject.new({}) }.to raise_error(
        Playbook::Props::Error,
        /TestClassForRequiredProps prop 'required_prop' of type String is required and needs a value/
      )
    end

    it "does not raise error when given a value" do
      expect(subject.new(required_prop: "value").required_prop).to eq "value"
    end
  end
end
