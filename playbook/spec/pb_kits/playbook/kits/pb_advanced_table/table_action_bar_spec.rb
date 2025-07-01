# frozen_string_literal: true

require_relative "../../../../../app/pb_kits/playbook/pb_advanced_table/table_action_bar"

RSpec.describe Playbook::PbAdvancedTable::TableActionBar do
  subject { Playbook::PbAdvancedTable::TableActionBar }

  it { is_expected.to define_array_prop(:actions).with_default([]) }
  it { is_expected.to define_boolean_prop(:is_visible).with_default(false) }
  it { is_expected.to define_prop(:selected_count).with_default(0) }

  describe "#classname" do
    it "returns correct class name" do
      expect(subject.new({}).classname).to eq "row-selection-actions-card"
    end

    it "maintains consistent classname regardless of props" do
      expect(subject.new(is_visible: true, selected_count: 5).classname).to eq "row-selection-actions-card"
    end
  end

  describe "prop behavior" do
    context "actions prop" do
      it "accepts array of actions" do
        actions = [{ label: "Delete", action: "delete" }, { label: "Edit", action: "edit" }]
        instance = subject.new(actions: actions)
        expect(instance.actions).to eq actions
      end
    end

    context "is_visible prop" do
      it "defaults to false" do
        expect(subject.new({}).is_visible).to be false
      end

      it "can be set to true" do
        expect(subject.new(is_visible: true).is_visible).to be true
      end
    end

    context "selected_count prop" do
      it "defaults to 0" do
        expect(subject.new({}).selected_count).to eq 0
      end

      it "accepts numeric values" do
        expect(subject.new(selected_count: 5).selected_count).to eq 5
      end
    end
  end
end
