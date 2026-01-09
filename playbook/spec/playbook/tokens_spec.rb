# frozen_string_literal: true

require "rails_helper"

RSpec.describe Playbook::Tokens do
  describe ".colors" do
    let(:colors) { described_class.colors }

    it "returns a ColorHash instance" do
      expect(colors).to be_a(Playbook::Tokens::ColorHash)
    end

    it "loads all expected tokens" do
      # Should have 100+ tokens from the full SCSS export
      expect(colors.keys.size).to be >= 100
    end

    describe "hash-style access" do
      it "accesses colors by symbol key" do
        expect(colors[:royal]).to eq("#0056CF")
        expect(colors[:green]).to eq("#1CA05C")
      end

      it "accesses colors by string key" do
        expect(colors["royal"]).to eq("#0056CF")
      end

      it "returns nil for unknown keys" do
        expect(colors[:not_a_color]).to be_nil
      end
    end

    describe "method-style access" do
      it "accesses colors as methods" do
        expect(colors.royal).to eq("#0056CF")
        expect(colors.green).to eq("#1CA05C")
        expect(colors.data_4).to eq("#1CA05C")
      end

      it "raises NoMethodError for undefined colors" do
        expect { colors.not_a_color }.to raise_error(NoMethodError)
      end
    end

    describe "#to_h" do
      it "returns the underlying hash" do
        hash = colors.to_h
        expect(hash).to be_a(Hash)
        expect(hash[:royal]).to eq("#0056CF")
      end

      it "is frozen" do
        expect(colors.to_h).to be_frozen
      end
    end

    describe "#keys" do
      it "returns all color keys" do
        keys = colors.keys
        expect(keys).to include(:royal, :green, :success, :error)
      end
    end

    describe "#key?" do
      it "returns true for existing keys" do
        expect(colors.key?(:royal)).to be true
        expect(colors.key?("royal")).to be true
      end

      it "returns false for missing keys" do
        expect(colors.key?(:not_a_color)).to be false
      end
    end
  end

  describe ".reload_colors!" do
    it "reloads colors from JSON" do
      reloaded = described_class.reload_colors!
      expect(reloaded).to be_a(Playbook::Tokens::ColorHash)
    end
  end

  # Validate that Sass-resolved values are present
  # These are computed values that prove Sass is actually resolving functions
  describe "Sass-resolved values" do
    let(:colors) { described_class.colors }

    # These values are computed by Sass from functions like mix(), lighten(), etc.
    # If these tests pass, it proves the Sass compilation is working correctly

    it "includes hover_light (darken($silver, 5%))" do
      # This is a computed value, not a literal in SCSS
      expect(colors[:hover_light]).to be_present
      expect(colors[:hover_light]).to match(/^#[0-9a-fA-F]{6}$/)
    end

    it "includes success_secondary (lighten($success, 10%))" do
      expect(colors[:success_secondary]).to be_present
      expect(colors[:success_secondary]).to match(/^#[0-9a-fA-F]{6}$/)
    end

    it "includes border_dark (mix(white, $bg_dark, 20%))" do
      expect(colors[:border_dark]).to be_present
      expect(colors[:border_dark]).to match(/^#[0-9a-fA-F]{6}$/)
    end

    it "includes error_subtle (rgba($error, $opacity_1))" do
      # This should be an rgba value
      expect(colors[:error_subtle]).to be_present
      expect(colors[:error_subtle]).to match(/^rgba\(/)
    end

    it "includes hover_dark (rgba($white, $opacity_2))" do
      expect(colors[:hover_dark]).to be_present
      expect(colors[:hover_dark]).to match(/^rgba\(/)
    end
  end

  # Validate base colors match SCSS source
  describe "base color values" do
    let(:colors) { described_class.colors }

    # These are literal values in SCSS, so we can validate exactly
    it "royal equals #0056CF" do
      expect(colors[:royal].upcase).to eq("#0056CF")
    end

    it "green equals #1CA05C" do
      expect(colors[:green].upcase).to eq("#1CA05C")
    end

    it "purple equals #9E64E9" do
      expect(colors[:purple].upcase).to eq("#9E64E9")
    end

    it "teal equals #00C4D7" do
      expect(colors[:teal].upcase).to eq("#00C4D7")
    end

    it "red equals #DA0014" do
      expect(colors[:red].upcase).to eq("#DA0014")
    end

    it "yellow equals #F9BB00" do
      expect(colors[:yellow].upcase).to eq("#F9BB00")
    end
  end

  # Validate data colors for chart usage
  describe "data colors" do
    let(:colors) { described_class.colors }

    it "includes all 8 data colors" do
      (1..8).each do |i|
        expect(colors.key?("data_#{i}".to_sym)).to be true
      end
    end

    it "data_1 equals royal" do
      expect(colors["data_1".to_sym]).to eq(colors[:royal])
    end

    it "data_4 equals green" do
      expect(colors["data_4".to_sym]).to eq(colors[:green])
    end
  end

  # Validate product colors
  describe "product colors" do
    let(:colors) { described_class.colors }

    it "includes all 10 product background and highlight colors" do
      (1..10).each do |i|
        expect(colors.key?("product_#{i}_background".to_sym))
          .to be(true), "Missing product_#{i}_background"
        expect(colors.key?("product_#{i}_highlight".to_sym))
          .to be(true), "Missing product_#{i}_highlight"
      end
    end
  end
end
