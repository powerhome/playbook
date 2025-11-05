# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_rich_text_editor/rich_text_editor"

RSpec.describe Playbook::PbRichTextEditor::RichTextEditor do
  subject { Playbook::PbRichTextEditor::RichTextEditor }

  it { is_expected.to define_boolean_prop(:focus).with_default(false) }
  it { is_expected.to define_boolean_prop(:inline).with_default(false) }
  it { is_expected.to define_boolean_prop(:simple).with_default(false) }
  it { is_expected.to define_boolean_prop(:sticky).with_default(false) }
  it { is_expected.to define_boolean_prop(:toolbar_bottom).with_default(false) }
  it { is_expected.to define_boolean_prop(:advanced_editor_toolbar).with_default(true) }
  it { is_expected.to define_prop(:value) }
  it { is_expected.to define_prop(:template) }
  it { is_expected.to define_prop(:placeholder) }
  it { is_expected.to define_prop(:input_options) }
  it {
    is_expected.to define_enum_prop(:max_width)
      .with_default("md")
      .with_values("xs", "sm", "md", "lg", "xl")
  }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_rich_text_editor_kit max_width_md"
      expect(subject.new(simple: true).classname).to eq "pb_rich_text_editor_kit simple max_width_md"
      expect(subject.new(focus: true).classname).to eq "pb_rich_text_editor_kit focus-editor-targets max_width_md"
      expect(subject.new(sticky: true).classname).to eq "pb_rich_text_editor_kit sticky max_width_md"
      expect(subject.new(simple: true, focus: true, sticky: true).classname).to eq "pb_rich_text_editor_kit simple focus-editor-targets sticky max_width_md"
    end
  end

  describe "#rich_text_options" do
    it "includes railsEditor: true", :aggregate_failures do
      options = subject.new({}).rich_text_options
      expect(options[:railsEditor]).to eq true
    end

    it "includes all expected options", :aggregate_failures do
      options = subject.new({
                              focus: true,
                              simple: true,
                              sticky: true,
                              toolbar_bottom: true,
                              advanced_editor_toolbar: false,
                              value: "test value",
                              template: "test template",
                              placeholder: "test placeholder",
                              extensions: [{ name: "test" }],
                              max_width: "lg",
                            }).rich_text_options

      expect(options[:railsEditor]).to eq true
      expect(options[:focus]).to eq true
      expect(options[:simple]).to eq true
      expect(options[:sticky]).to eq true
      expect(options[:toolbarBottom]).to eq true
      expect(options[:advancedEditorToolbar]).to eq false
      expect(options[:value]).to eq "test value"
      expect(options[:template]).to eq "test template"
      expect(options[:placeholder]).to eq "test placeholder"
      expect(options[:extensions]).to eq [{ name: "test" }]
      expect(options[:maxWidth]).to eq "lg"
    end

    it "defaults value to empty string when not provided" do
      options = subject.new({}).rich_text_options
      expect(options[:value]).to eq ""
    end
  end
end
