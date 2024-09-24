# frozen_string_literal: true

# spec/helpers/markdown_helper_spec.rb
require "rails_helper"

RSpec.describe PlaybookWebsite::Markdown::Helper do
  describe "#render_code" do
    let(:helper) { Class.new { include PlaybookWebsite::Markdown::Helper }.new }
    let(:formatter) { instance_double(Rouge::Formatters::HTML) }
    let(:ruby_lexer) { instance_double(Rouge::Lexers::Ruby) }
    let(:plain_text_lexer) { instance_double(Rouge::Lexers::PlainText) }

    before do
      allow(Rouge::Formatters::HTML).to receive(:new).and_return(formatter)
      allow(formatter).to receive(:format).and_return("<formatted_code>")
    end

    it "formats code with the correct lexer when language is found" do
      allow(Rouge::Lexer).to receive(:find).with("ruby").and_return(ruby_lexer)
      allow(ruby_lexer).to receive(:lex).with("puts 'Hello, World!'").and_return("lexed_code")

      expect(formatter).to receive(:format).with("lexed_code")
      result = helper.render_code("puts 'Hello, World!'", "ruby")
      expect(result).to eq("<formatted_code>")
    end

    it "uses PlainText lexer when language is not found" do
      allow(Rouge::Lexer).to receive(:find).with("unknown_language").and_return(nil)
      allow(Rouge::Lexers::PlainText).to receive(:new).and_return(plain_text_lexer)
      allow(plain_text_lexer).to receive(:lex).with("Some plain text").and_return("lexed_plain_text")

      expect(formatter).to receive(:format).with("lexed_plain_text")
      result = helper.render_code("Some plain text", "unknown_language")
      expect(result).to eq("<formatted_code>")
    end

    it "handles nil language parameter" do
      allow(Rouge::Lexer).to receive(:find).with(nil).and_return(nil)
      allow(Rouge::Lexers::PlainText).to receive(:new).and_return(plain_text_lexer)
      allow(plain_text_lexer).to receive(:lex).with("Some text").and_return("lexed_text")

      expect(formatter).to receive(:format).with("lexed_text")
      result = helper.render_code("Some text", nil)
      expect(result).to eq("<formatted_code>")
    end
  end
end
