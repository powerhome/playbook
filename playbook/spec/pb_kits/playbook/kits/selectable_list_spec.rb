# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_selectable_list/selectable_list"

RSpec.describe Playbook::PbSelectableList::SelectableList do
  subject { Playbook::PbSelectableList::SelectableList }

  it { is_expected.to define_prop(:text) }
  it {
    is_expected.to define_enum_prop(:variant)
      .with_default("checkbox")
      .with_values("radio", "checkbox")
  }
  it {
    is_expected.to define_prop(:items)
      .of_type(Playbook::Props::Array)
      .with_default([])
  }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_selectable_list_kit"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_selectable_list_kit additional_class"
    end
  end
end
