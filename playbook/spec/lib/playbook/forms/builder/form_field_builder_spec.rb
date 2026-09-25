# frozen_string_literal: true

require "rails_helper"

RSpec.describe Playbook::Forms::Builder::FormFieldBuilder, type: :helper do
  include_context "playbook form builder"

  describe "MASK_PATTERNS" do
    it "maps known masks to validation patterns" do
      expect(described_class::MASK_PATTERNS).to include(
        "currency" => '^\$\d{1,3}(?:,\d{3})*(?:\.\d{2})?$',
        "zip_code" => '\d{5}',
        "ssn" => '\d{3}-\d{2}-\d{4}'
      )
    end
  end

  describe "prepended field methods" do
    it "renders a text input kit for text_field" do
      rendered = render_form { |builder| concat builder.text_field(:name) }

      expect(rendered).to have_tag("form > .pb_text_input_kit input[name='example[name]'][type=text].text_input")
    end

    it "renders a textarea kit for text_area" do
      rendered = render_form { |builder| concat builder.text_area(:bio) }

      expect(rendered).to have_tag("form .pb_textarea_kit textarea[name='example[bio]']")
    end

    it "applies mask attributes and patterns" do
      rendered = render_form { |builder| concat builder.text_field(:amount, props: { mask: "currency" }) }

      expect(rendered).to have_tag("input[name='example[amount]'][mask='currency'][data-pb-input-mask='true'][pattern]")
    end

    it "applies emoji_mask data attributes" do
      rendered = render_form { |builder| concat builder.text_field(:note, props: { emoji_mask: true }) }

      expect(rendered).to have_tag("input[name='example[note]'][data-pb-emoji-mask='true']")
    end

    describe "input_options" do
      it "passes data on text_field" do
        rendered = render_form do |builder|
          concat builder.text_field(:name, props: { input_options: { data: { something: true } } })
        end

        expect(rendered).to have_tag("input[name='example[name]'][data-something='true']")
      end

      it "merges data with mask data on text_field" do
        rendered = render_form do |builder|
          concat builder.text_field(:amount, props: { mask: "currency", input_options: { data: { something: true } } })
        end

        expect(rendered).to have_tag("input[name='example[amount]'][data-something='true'][data-pb-input-mask='true']")
      end

      it "appends classname to the text_input class on text_field" do
        rendered = render_form do |builder|
          concat builder.text_field(:name, props: { input_options: { classname: "custom" } })
        end

        expect(rendered).to have_tag("input.text_input.custom[name='example[name]']")
      end

      it "passes extra attributes on text_field" do
        rendered = render_form do |builder|
          concat builder.text_field(
            :name,
            props: { input_options: { id: "name-input", autocomplete: "one-time-code" } }
          )
        end

        expect(rendered).to have_tag("input#name-input[name='example[name]'][autocomplete='one-time-code']")
      end

      it "uses classname and ignores class on text_field" do
        rendered = render_form do |builder|
          concat builder.text_field(
            :name,
            props: { input_options: { class: "ignored", classname: "custom" } }
          )
        end

        expect(rendered).to have_tag("input.text_input.custom[name='example[name]']")
        expect(rendered).not_to have_tag("input.ignored")
      end

      it "passes data on email_field" do
        rendered = render_form do |builder|
          concat builder.email_field(:email, props: { input_options: { data: { something: true } } })
        end

        expect(rendered).to have_tag("input[type=email][name='example[email]'][data-something='true']")
      end

      it "passes data on text_area" do
        rendered = render_form do |builder|
          concat builder.text_area(:bio, props: { input_options: { data: { something: true } } })
        end

        expect(rendered).to have_tag("textarea[name='example[bio]'][data-something='true']")
      end

      it "merges data with emoji_mask data on text_area" do
        rendered = render_form do |builder|
          concat builder.text_area(:bio, props: { emoji_mask: true, input_options: { data: { something: true } } })
        end

        expect(rendered).to have_tag("textarea[name='example[bio]'][data-something='true'][data-pb-emoji-mask='true']")
      end

      it "appends classname on text_area" do
        rendered = render_form do |builder|
          concat builder.text_area(:bio, props: { input_options: { classname: "custom" } })
        end

        expect(rendered).to have_tag("textarea.custom[name='example[bio]']")
      end

      it "passes extra attributes on text_area" do
        rendered = render_form do |builder|
          concat builder.text_area(:bio, props: { input_options: { id: "bio-input", maxlength: 200 } })
        end

        expect(rendered).to have_tag("textarea#bio-input[name='example[bio]'][maxlength='200']")
      end

      it "uses classname and ignores class on text_area" do
        rendered = render_form do |builder|
          concat builder.text_area(:bio, props: { input_options: { class: "ignored", classname: "custom" } })
        end

        expect(rendered).to have_tag("textarea.custom[name='example[bio]']")
        expect(rendered).not_to have_tag("textarea.ignored")
      end
    end

    it "uses a humanized label when label is true and required_indicator is set" do
      rendered = render_form do |builder|
        concat builder.text_field(:full_name, props: { label: true, required_indicator: true })
      end

      expect(rendered).to have_tag("form .pb_text_input_kit", text: /Full name/)
    end

    it "wraps a string label in a label tag unless required_indicator is set" do
      rendered = render_form do |builder|
        concat builder.text_field(:name, props: { label: "Your name" })
      end

      expect(rendered).to have_tag("label", text: "Your name")
    end
  end
end
