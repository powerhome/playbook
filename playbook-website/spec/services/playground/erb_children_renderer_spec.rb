# frozen_string_literal: true

require "rails_helper"

RSpec.describe Playground::ErbChildrenRenderer do
  let(:rendered) { [] }
  let(:view_context) do
    calls = rendered
    ctx = Object.new
    ctx.define_singleton_method(:pb_rails) do |kit, props: {}, &block|
      inner = block&.call
      calls << { kit: kit, props: props, inner: inner.to_s }
      "ok:#{kit}".html_safe
    end
    ctx
  end

  describe "nested block-form parsing" do
    let(:children) do
      <<~ERB
        <%= pb_rails("flex/flex_item") do %>
          <%= pb_rails("caption") do %>
            Nested
          <% end %>
        <% end %>
      ERB
    end

    it "keeps inner do/end inside the outer block content" do
      block = described_class.new(view_context: view_context).send(:match_balanced_block, children)

      expect(block).not_to be_nil
      expect(block[:segment][:kit]).to eq("flex/flex_item")
      expect(block[:segment][:content]).to include('<%= pb_rails("caption") do %>')
      expect(block[:segment][:content]).to include("Nested")
      expect(block[:segment][:content]).to include("<% end %>")
      # Trailing heredoc newline is outside the matched block.
      expect(block[:consumed]).to eq(children.rstrip.length)
    end

    it "renders nested block kits instead of escaping the trailing end" do
      html = described_class.new(view_context: view_context).render(children)

      expect(html.to_s).to include("ok:flex/flex_item")
      expect(rendered.map { |call| call[:kit] }).to include("flex/flex_item", "caption")
      caption = rendered.find { |call| call[:kit] == "caption" }
      expect(caption[:inner]).to include("Nested")
    end
  end

  describe "sibling parsing" do
    it "renders kits after plain text instead of stopping at the leftover" do
      children = <<~ERB
        <%= pb_rails("caption", props: { text: "A" }) %>
        between
        <%= pb_rails("caption", props: { text: "B" }) %>
      ERB

      html = described_class.new(view_context: view_context).render(children)

      expect(rendered.map { |call| call[:kit] }).to eq(%w[caption caption])
      expect(rendered.map { |call| call[:props][:text] }).to eq(%w[A B])
      expect(html.to_s).to include("between")
      expect(html.to_s).not_to include("<between>")
    end

    it "escapes leading text and still renders the following kit" do
      children = 'NOTE <%= pb_rails("caption", props: { text: "Hi" }) %>'
      html = described_class.new(view_context: view_context).render(children)

      expect(html.to_s).to include("NOTE")
      expect(html.to_s).to include("ok:caption")
      expect(rendered.map { |call| call[:kit] }).to eq(%w[caption])
    end
  end
end
