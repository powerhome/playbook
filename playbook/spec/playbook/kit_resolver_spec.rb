# frozen_string_literal: true

require "rails_helper"

RSpec.describe ::Playbook::KitResolver do
  describe ".resolve(kit_name)" do
    it "it resolves to nil when kit does not exist" do
      expect(Playbook::KitResolver.resolve("crazy_little_thing")).to be_nil
    end

    it "it resolves kit names to playbook kit classes" do
      expect(Playbook::KitResolver.resolve("body")).to be Playbook::PbBody::Body
    end

    it "it resolves sub kit names to playbook kit classes" do
      expect(Playbook::KitResolver.resolve("table/table_row")).to be Playbook::PbTable::TableRow
    end

    it "resolves rich_text_editor to the Rails TipTap kit" do
      expect(Playbook::KitResolver.resolve("rich_text_editor")).to be Playbook::PbRichTextEditor::RichTextEditor
    end
  end
end
