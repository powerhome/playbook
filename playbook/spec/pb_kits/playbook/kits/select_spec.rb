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
  end
end
