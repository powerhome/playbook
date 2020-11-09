# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_selectable_list/selectable_list_item"

RSpec.describe Playbook::PbSelectableList::SelectableListItem do
  subject { Playbook::PbSelectableList::SelectableListItem }

  it { is_expected.to define_partial }

  it { is_expected.to define_prop(:text) }
  it { is_expected.to define_prop(:tabindex) }
  it { is_expected.to define_prop(:name) }
  it { is_expected.to define_prop(:value) }
  it { is_expected.to define_enum_prop(:variant)
                      .with_default("radio")
                      .with_values("radio", "checkbox")
  }
  it { is_expected.to define_boolean_prop(:checked).with_default(false) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_selectable_list_item_kit"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_selectable_list_item_kit additional_class"
    end
  end
end
