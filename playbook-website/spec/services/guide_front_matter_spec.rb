# frozen_string_literal: true

require "spec_helper"
require_relative "../../app/services/guide_front_matter"

RSpec.describe GuideFrontMatter do
  it "reads YAML metadata without reading markdown or later separators" do
    source = "---\ntitle: Café\ntags: [react, rails]\n---\n# Guide\n---\ntitle: Not metadata\n"
    expect(described_class.parse(source)).to eq("title" => "Café", "tags" => %w[react rails])
  end

  it "accepts Windows line endings and a UTF-8 byte order mark" do
    expect(described_class.parse("\uFEFF---\r\ntitle: Guide\r\n---\r\nBody")).to eq("title" => "Guide")
  end

  it "returns an empty mapping for absent, empty or unclosed metadata" do
    ["# Guide\n---\ntitle: Body", "---\n---\nBody", "---\ntitle: Guide"].each do |source|
      expect(described_class.parse(source)).to eq({})
    end
  end

  it "rejects non-mapping metadata" do
    expect { described_class.parse("---\n- title\n---\n") }.to raise_error(ArgumentError, /mapping/)
  end

  it "rejects YAML objects and aliases" do
    expect { described_class.parse("---\ntitle: !ruby/object:Object {}\n---\n") }.to raise_error(Psych::DisallowedClass)
    expect { described_class.parse("---\na: &title Guide\nb: *title\n---\n") }.to raise_error(Psych::AliasesNotEnabled)
  end

  it "parses every existing guide" do
    Dir[File.expand_path("../../app/views/guides/**/*.md", __dir__)].each do |filename|
      expect(described_class.parse(File.read(filename, encoding: "UTF-8"))).to include("title" => a_kind_of(String))
    end
  end
end
