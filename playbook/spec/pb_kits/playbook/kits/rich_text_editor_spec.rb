# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_rich_text_editor/rich_text_editor"

RSpec.describe Playbook::PbRichTextEditor::RichTextEditor do
  subject(:kit_class) { described_class }

  it { is_expected.to define_array_prop(:extensions).with_default([]) }

  describe "#enabled_extensions" do
    it "accepts every Playbook-owned extension" do
      kit = kit_class.new(extensions: %w[underline text_align horizontal_rule image])

      expect(kit.enabled_extensions).to eq %w[underline text_align horizontal_rule image]
    end

    it "normalizes symbols and removes duplicates" do
      kit = kit_class.new(extensions: [:underline, "underline"])

      expect(kit.enabled_extensions).to eq ["underline"]
    end

    it "warns and ignores unknown extensions" do
      kit = kit_class.new(extensions: %w[underline table])

      expect { expect(kit.enabled_extensions).to eq ["underline"] }
        .to output(/ignored unknown extensions: table/).to_stderr
    end

    it "rejects non-array values" do
      expect { kit_class.new(extensions: "underline") }.to raise_error(Playbook::Props::Error)
    end
  end

  describe "#show_extensions_dropdown?" do
    it "shows the extensions dropdown in the full toolbar" do
      kit = kit_class.new(extensions: ["image"])

      expect(kit.show_extensions_dropdown?).to be true
    end

    it "does not show the extensions dropdown without extensions" do
      expect(kit_class.new.show_extensions_dropdown?).to be false
    end

    it "hides the extensions dropdown in the simple toolbar without disabling the schema" do
      kit = kit_class.new(extensions: ["image"], simple: true)

      expect(kit.show_extensions_dropdown?).to be false
      expect(kit.extension_enabled?("image")).to be true
    end
  end
end
