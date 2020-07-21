# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_title/title"

RSpec.describe Playbook::PbTitle::Title do
  subject { Playbook::PbTitle::Title }

  it { is_expected.to define_partial }
  it { is_expected.to define_boolean_prop(:dark)
    .with_default(false) }
  it { is_expected.to define_prop(:size).of_type(Playbook::Props::Enum).with_default(3) }
  it { is_expected.to define_enum_prop(:tag)
    .with_values("h1", "h2", "h3", "h4", "h5", "h6", "p", "div", "span")
    .with_default("h3")
     }
  it { is_expected.to define_enum_prop(:variant)
     .with_values(nil, "primary")
     .with_default(nil)
      }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_title_kit_3"

      expect(subject.new(classname: "additional_class").classname).to eq "pb_title_kit_3 additional_class"
      expect(subject.new(dark: true).classname).to eq "pb_title_kit_3_dark"
      expect(subject.new(size: nil).classname).to eq "pb_title_kit_3"
      expect(subject.new(size: 4).classname).to eq "pb_title_kit_4"
      expect(subject.new(tag: "h3").classname).to eq "pb_title_kit_3"
      expect(subject.new(size: 4, variant: "primary").classname).to eq "pb_title_kit_4_primary"
    end
  end
end
