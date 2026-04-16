# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_select/select"

RSpec.describe Playbook::PbSelect::Select do
  subject { Playbook::PbSelect::Select }

  it { is_expected.to define_string_prop(:blank_selection) }
  it { is_expected.to define_boolean_prop(:disabled).with_default(false) }
  it { is_expected.to define_string_prop(:include_blank) }
  it { is_expected.to define_string_prop(:label) }
  it { is_expected.to define_string_prop(:margin) }
  it { is_expected.to define_string_prop(:margin_bottom) }
  it { is_expected.to define_boolean_prop(:multiple).with_default(false) }
  it { is_expected.to define_string_prop(:name) }
  it { is_expected.to define_string_prop(:onchange) }
  it { is_expected.to define_boolean_prop(:required).with_default(false) }
  it { is_expected.to define_boolean_prop(:inline).with_default(false) }
  it { is_expected.to define_boolean_prop(:compact).with_default(false) }
  it { is_expected.to define_boolean_prop(:show_arrow).with_default(false) }
  it { is_expected.to define_hash_prop(:input_options).with_default({}) }
  it { is_expected.to define_boolean_prop(:required_indicator).with_default(false) }
  it { is_expected.to define_string_prop(:validation_message).with_default("") }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_select mb_sm"
      expect(subject.new(dark: true).classname).to eq "pb_select mb_sm dark"
      expect(subject.new(margin: "lg").classname).to eq "pb_select m_lg"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_select mb_sm additional_class"
      expect(subject.new(compact: true).classnames).to eq "pb_select mb_sm compact"
      expect(subject.new(inline: true, show_arrow: true).classnames).to eq "pb_select mb_sm inline show_arrow"
      expect(subject.new(inline: true, compact: true, show_arrow: true).classnames).to eq "pb_select mb_sm inline compact show_arrow"
    end
  end

  describe "#all_attributes" do
    it "merges input_options into attributes" do
      select = subject.new(
        id: "default-id",
        input_options: {
          id: "custom-id",
          class: "custom-class",
          data: { controller: "search" },
        }
      )

      expect(select.all_attributes[:id]).to eq "custom-id"
      expect(select.all_attributes[:class]).to eq "custom-class"
      expect(select.all_attributes[:data]).to eq({ controller: "search" })
    end

    it "uses default id when input_options id is not provided" do
      select = subject.new(id: "default-id", input_options: {})

      expect(select.all_attributes[:id]).to eq "default-id"
    end

    it "includes validation_message as data-message attribute" do
      select = subject.new(validation_message: "Please select an option")

      expect(select.all_attributes[:data]).to eq({ message: "Please select an option" })
    end

    it "merges validation_message with existing input_options data" do
      select = subject.new(
        validation_message: "Required",
        input_options: { data: { controller: "select" } }
      )

      expect(select.all_attributes[:data]).to eq({ controller: "select", message: "Required" })
    end

    it "does not include data-message when validation_message is blank" do
      select = subject.new(validation_message: "")

      expect(select.all_attributes[:data]).to eq({})
    end
  end

  describe "#validation_data" do
    it "returns hash with message when validation_message is present" do
      select = subject.new(validation_message: "This field is required")

      expect(select.validation_data).to eq({ message: "This field is required" })
    end

    it "returns empty hash when validation_message is blank" do
      select = subject.new(validation_message: "")

      expect(select.validation_data).to eq({})
    end

    it "merges with existing input_options data" do
      select = subject.new(
        validation_message: "Required",
        input_options: { data: { custom: "value" } }
      )

      expect(select.validation_data).to eq({ custom: "value", message: "Required" })
    end
  end

  describe "#select_input_id" do
    it "matches the id applied to the select via top-level id" do
      select = subject.new(id: "favorite-food", name: "food", input_options: {})

      expect(select.select_input_id).to eq "favorite-food"
    end

    it "matches input_options id when present" do
      select = subject.new(
        id: "ignored",
        input_options: { id: "from-input-options" }
      )

      expect(select.select_input_id).to eq "from-input-options"
    end

    it "matches id from attributes when merged into all_attributes" do
      select = subject.new(
        attributes: { id: "from-attributes" },
        input_options: {}
      )

      expect(select.select_input_id).to eq "from-attributes"
    end

    it "returns nil when no id is set" do
      select = subject.new(name: "food", input_options: {})

      expect(select.select_input_id).to be_nil
    end
  end
end
