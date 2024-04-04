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
      .with_default("bottom-end")
      .with_values("top", "right", "bottom", "left", "top-start", "top-end", "bottom-start", "bottom-end", "right-start", "right-end", "left-start", "left-end")
  }
  it {
    is_expected.to define_prop(:sort_menu)
      .of_type(Playbook::Props::HashArray)
      .with_default([{}])
  }
  it {
    is_expected.to define_prop(:sort_dropdown)
      .of_type(Playbook::Props::Boolean)
      .with_default(false)
  }
  it { is_expected.to define_prop(:text).with_default("") }
  it { is_expected.to define_enum_prop(:tag).with_default("table").with_values("div", "table") }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to start_with "pb_table_header_kit"
      expect(subject.new(dark: true, align: "end").classname).to eq "pb_table_header_kit_align_end dark align_content_center pb_table_th"
    end
  end

  describe "next_link" do
    it "makes the next link the first sort option when nothing is active" do
      expect(
        subject.new(
          sort_menu: [
            { item: "Territory", link: "?sort=territory_desc", active: false, direction: "desc" },
            { item: "Territory", link: "?sort=territory_asc", active: false, direction: "asc" },
          ]
        ).next_link
      ).to eq "?sort=territory_desc"
    end
    it "provides what the next sort option link would be" do
      expect(
        subject.new(
          sort_menu: [
            { item: "Territory", link: "?sort=territory_desc", active: true, direction: "desc" },
            { item: "Territory", link: "?sort=territory_asc", active: false, direction: "asc" },
          ]
        ).next_link
      ).to eq "?sort=territory_asc"
    end
  end
end
