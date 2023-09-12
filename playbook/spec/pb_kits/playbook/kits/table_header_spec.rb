# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_table/table_header"

RSpec.describe Playbook::PbTable::TableHeader do
  subject { Playbook::PbTable::TableHeader }

  it {
    is_expected.to define_enum_prop(:align)
      .with_default("start")
      .with_values("start", "center", "end", "stretch", "baseline", "none")
  }
  it {
    is_expected.to define_enum_prop(:align_content)
      .with_default("center")
      .with_values("start", "center", "end", "stretch", "baseline", "none")
  }
  it {
    is_expected.to define_prop(:colspan)
      .of_type(Playbook::Props::Number)
  }
  it {
    is_expected.to define_enum_prop(:placement)
      .with_default("bottom-start")
      .with_values("top", "right", "bottom", "left", "top-start", "top-end", "bottom-start", "bottom-end", "right-start", "right-end", "left-start", "left-end")
  }
  it {
    is_expected.to define_prop(:sort_menu)
      .of_type(Playbook::Props::HashArray)
      .with_default([{}])
  }
  it {
    is_expected.to define_prop(:sort_dropdown_menu)
      .of_type(Playbook::Props::Boolean)
      .with_default(false)
  }
  it { is_expected.to define_prop(:text).with_default("") }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to start_with "pb_table_header_kit"
      expect(subject.new(dark: true, align: "end").classname).to eq "pb_table_header_kit_align_end dark align_content_center"
    end
  end
end
