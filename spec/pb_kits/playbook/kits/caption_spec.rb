# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_caption/caption"

module Playbook
  module PbCaption
    describe Caption do
      describe ":dark prop" do
        it "is Boolean type" do
          expect(Caption.props[:dark].class).to eq(Props::Boolean)
        end

        it "defaults to false" do
          expect(Caption.props[:dark].default).to eq(false)
        end
      end

      describe ":large prop" do
        it "is Boolean type" do
          expect(Caption.props[:large].class).to eq(Props::Boolean)
        end

        it "defaults to false" do
          expect(Caption.props[:large].default).to eq(false)
        end
      end

      describe ":tag prop" do
        it "is Enum type" do
          expect(Caption.props[:tag].class).to eq(Props::Enum)
        end

        it "defaults to 'div'" do
          expect(Caption.props[:tag].default).to eq("div")
        end
      end

      describe ":text prop" do
        it "is String type" do
          expect(Caption.props[:text].class).to eq(Props::String)
        end

        it "defaults to 'Caption'" do
          expect(Caption.props[:text].default).to eq("Caption")
        end
      end

      describe "#classname" do
        it "returns namespaced class name", :aggregate_failures do
          expect(Caption.new({}).classname).to eq "pb_caption_kit "
          expect(Caption.new(dark: true).classname).to eq "pb_caption_kit_dark "
          expect(Caption.new(large: true).classname).to eq "pb_caption_kit_lg "
          expect(Caption.new(dark: true, large: true).classname).to eq "pb_caption_kit_lg_dark "
          expect(Caption.new(classname: "additional_class").classname).to eq "pb_caption_kit additional_class"
        end
      end
    end
  end
end
