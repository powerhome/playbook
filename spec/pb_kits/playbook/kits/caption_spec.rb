# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_caption/caption"

module Playbook
  module PbCaption
    describe Caption do
      subject { Caption }

      it { is_expected.to define_partial }

      it { is_expected.to define_boolean_prop(:dark).with_default(false) }
      it { is_expected.to define_boolean_prop(:large).with_default(false) }
      it do
        is_expected.to define_enum_prop(:tag)
                       .with_default("div")
                       .with_values("h1", "h2", "h3", "h4", "h5",
                                    "h6", "p", "span", "div")
      end
      it { is_expected.to define_string_prop(:text).with_default("Caption") }

      describe "#classname" do
        it "returns namespaced class name", :aggregate_failures do
          expect(Caption.new({}).classname).to eq "pb_caption_kit"
          expect(Caption.new(dark: true).classname).to eq "pb_caption_kit_dark"
          expect(Caption.new(large: true).classname).to eq "pb_caption_kit_lg"
          expect(Caption.new(dark: true, large: true).classname).to eq "pb_caption_kit_lg_dark"
          expect(Caption.new(classname: "additional_class").classname).to eq "pb_caption_kit additional_class"
        end
      end
    end
  end
end
