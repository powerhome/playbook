# frozen_string_literal: true

require "rails_helper"

RSpec.describe Playbook::Tokens::Colors do
  # Path to the SCSS source of truth
  let(:scss_path) do
    Playbook::Engine.root.join("app/pb_kits/playbook/tokens/_colors.scss")
  end

  let(:scss_content) { File.read(scss_path) }

  describe "SCSS sync validation" do
    # This spec ensures Ruby token values stay in sync with SCSS definitions.
    # If this fails, update lib/playbook/tokens.rb to match _colors.scss

    # Helper to extract simple HEX values from SCSS (e.g., "$royal: #0056CF")
    def extract_scss_hex_value(scss_content, variable_name)
      match = scss_content.match(/\$#{variable_name}:\s*(#[0-9A-Fa-f]{6})\s*!default;/)
      match&.captures&.first&.upcase
    end

    describe "base colors" do
      it "ROYAL matches SCSS $royal" do
        expect(described_class::ROYAL.upcase).to eq(extract_scss_hex_value(scss_content, "royal"))
      end

      it "PURPLE matches SCSS $purple" do
        expect(described_class::PURPLE.upcase).to eq(extract_scss_hex_value(scss_content, "purple"))
      end

      it "TEAL matches SCSS $teal" do
        expect(described_class::TEAL.upcase).to eq(extract_scss_hex_value(scss_content, "teal"))
      end

      it "RED matches SCSS $red" do
        expect(described_class::RED.upcase).to eq(extract_scss_hex_value(scss_content, "red"))
      end

      it "YELLOW matches SCSS $yellow" do
        expect(described_class::YELLOW.upcase).to eq(extract_scss_hex_value(scss_content, "yellow"))
      end

      it "GREEN matches SCSS $green" do
        expect(described_class::GREEN.upcase).to eq(extract_scss_hex_value(scss_content, "green"))
      end

      it "ORANGE matches SCSS $orange" do
        expect(described_class::ORANGE.upcase).to eq(extract_scss_hex_value(scss_content, "orange"))
      end
    end

    describe "interface colors" do
      it "WHITE matches SCSS $white" do
        expect(described_class::WHITE.upcase).to eq(extract_scss_hex_value(scss_content, "white"))
      end

      it "SILVER matches SCSS $silver" do
        expect(described_class::SILVER.upcase).to eq(extract_scss_hex_value(scss_content, "silver"))
      end

      it "SLATE matches SCSS $slate" do
        expect(described_class::SLATE.upcase).to eq(extract_scss_hex_value(scss_content, "slate"))
      end

      it "CHARCOAL matches SCSS $charcoal" do
        expect(described_class::CHARCOAL.upcase).to eq(extract_scss_hex_value(scss_content, "charcoal"))
      end

      it "BLACK matches SCSS $black" do
        expect(described_class::BLACK.upcase).to eq(extract_scss_hex_value(scss_content, "black"))
      end
    end

    describe "data colors" do
      it "DATA_6 matches SCSS $data_6" do
        expect(described_class::DATA_6.upcase).to eq(extract_scss_hex_value(scss_content, "data_6"))
      end

      # DATA_1-5, 7-8 reference other variables, so we test the resolved values
      it "DATA_1 equals ROYAL (per SCSS $data_1: $royal)" do
        expect(described_class::DATA_1).to eq(described_class::ROYAL)
      end

      it "DATA_2 equals YELLOW (per SCSS $data_2: $yellow)" do
        expect(described_class::DATA_2).to eq(described_class::YELLOW)
      end

      it "DATA_3 equals PURPLE (per SCSS $data_3: $purple)" do
        expect(described_class::DATA_3).to eq(described_class::PURPLE)
      end

      it "DATA_4 equals GREEN (per SCSS $data_4: $green)" do
        expect(described_class::DATA_4).to eq(described_class::GREEN)
      end

      it "DATA_5 equals ORANGE (per SCSS $data_5: $orange)" do
        expect(described_class::DATA_5).to eq(described_class::ORANGE)
      end

      it "DATA_7 equals TEAL (per SCSS $data_7: $teal)" do
        expect(described_class::DATA_7).to eq(described_class::TEAL)
      end

      it "DATA_8 equals RED (per SCSS $data_8: $red)" do
        expect(described_class::DATA_8).to eq(described_class::RED)
      end
    end

    describe "product colors" do
      (1..10).each do |i|
        it "PRODUCT_#{i}_BACKGROUND matches SCSS" do
          expected = extract_scss_hex_value(scss_content, "product_#{i}_background")
          actual = described_class.const_get("PRODUCT_#{i}_BACKGROUND").upcase
          expect(actual).to eq(expected)
        end

        it "PRODUCT_#{i}_HIGHLIGHT matches SCSS" do
          expected = extract_scss_hex_value(scss_content, "product_#{i}_highlight")
          actual = described_class.const_get("PRODUCT_#{i}_HIGHLIGHT").upcase
          expect(actual).to eq(expected)
        end
      end
    end

    describe "category colors" do
      # Direct HEX values in SCSS
      [2, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].each do |i|
        it "CATEGORY_#{i} matches SCSS $category_#{i}" do
          expected = extract_scss_hex_value(scss_content, "category_#{i}")
          actual = described_class.const_get("CATEGORY_#{i}").upcase
          expect(actual).to eq(expected)
        end
      end

      # Variable references
      it "CATEGORY_1 equals ROYAL (per SCSS $category_1: $royal)" do
        expect(described_class::CATEGORY_1).to eq(described_class::ROYAL)
      end

      it "CATEGORY_3 equals YELLOW (per SCSS $category_3: $yellow)" do
        expect(described_class::CATEGORY_3).to eq(described_class::YELLOW)
      end

      it "CATEGORY_11 equals RED (per SCSS $category_11: $red)" do
        expect(described_class::CATEGORY_11).to eq(described_class::RED)
      end
    end
  end

  describe "API" do
    describe ".[]" do
      it "accesses colors by symbol key" do
        expect(described_class[:royal]).to eq("#0056CF")
        expect(described_class["data_1".to_sym]).to eq("#0056CF")
      end

      it "accesses colors by string key" do
        expect(described_class["royal"]).to eq("#0056CF")
      end
    end

    describe ".all" do
      it "returns a hash of all colors" do
        all_colors = described_class.all
        expect(all_colors).to be_a(Hash)
        expect(all_colors[:royal]).to eq("#0056CF")
        expect(all_colors[:green]).to eq("#1CA05C")
      end

      it "is frozen" do
        expect(described_class.all).to be_frozen
      end
    end

    describe ".data_colors" do
      it "returns an array of 8 data colors in order" do
        colors = described_class.data_colors
        expect(colors).to be_an(Array)
        expect(colors.length).to eq(8)
        expect(colors.first).to eq(described_class::DATA_1)
        expect(colors.last).to eq(described_class::DATA_8)
      end

      it "is frozen" do
        expect(described_class.data_colors).to be_frozen
      end
    end

    describe ".status_colors" do
      it "returns a hash with status colors" do
        colors = described_class.status_colors
        expect(colors).to be_a(Hash)
        expect(colors[:success]).to eq(described_class::SUCCESS)
        expect(colors[:error]).to eq(described_class::ERROR)
        expect(colors[:warning]).to eq(described_class::WARNING)
        expect(colors[:info]).to eq(described_class::INFO)
      end
    end

    describe ".category_colors" do
      it "returns an array of 21 category colors" do
        colors = described_class.category_colors
        expect(colors).to be_an(Array)
        expect(colors.length).to eq(21)
      end
    end

    describe "method access" do
      it "allows accessing colors as methods" do
        expect(described_class.royal).to eq("#0056CF")
        expect(described_class.data_1).to eq("#0056CF")
        expect(described_class.green).to eq("#1CA05C")
      end

      it "raises NoMethodError for undefined colors" do
        expect { described_class.not_a_color }.to raise_error(NoMethodError)
      end
    end
  end
end
