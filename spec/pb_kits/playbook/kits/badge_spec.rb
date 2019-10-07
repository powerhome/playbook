# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_badge/badge"

module Playbook
  module PbBadge
    describe Badge do
      subject { Badge }

      it { is_expected.to define_partial }

      it { is_expected.to define_prop(:text) }
      it { is_expected.to define_boolean_prop(:rounded).with_default(false) }
      it { is_expected.to define_enum_prop(:variant).with_default("neutral") }


      describe "#classname" do
        it "returns namespaced class name", :aggregate_failures do
          expect(Badge.new({}).classname).to eq "pb_badge_kit_neutral"
          expect(Badge.new(variant: "warning").classname).to eq "pb_badge_kit_warning"
          expect(Badge.new(rounded: true).classname).to eq "pb_badge_kit_neutral_rounded"
          expect(Badge.new(variant: "error", rounded: true).classname).to eq "pb_badge_kit_error_rounded"
          expect(Badge.new(classname: "additional_class").classname).to eq "pb_badge_kit_neutral additional_class"
        end
      end
    end
  end
end
