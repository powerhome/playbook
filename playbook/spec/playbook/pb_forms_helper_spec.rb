# frozen_string_literal: true

require "rails_helper"

RSpec.describe Playbook::PbFormsHelper, type: :helper do
  before { helper.extend(Playbook::PbKitHelper) }

  let(:form_body) do
    ->(builder) do
      concat builder.text_field :name
      concat builder.actions(&:submit)
    end
  end

  subject { helper.pb_form_with(url: "http://example.org", scope: :example, validate: true, &form_body) }

  it { is_expected.to have_tag("form[action='http://example.org']") }
  it { is_expected.to have_tag("form > .pb_text_input_kit input[name='example[name]'][type=text]") }
  it { is_expected.to have_tag("form > ol.pb-form-actions > li > button.pb_button_kit.pb_button_primary.pb_button_inline.pb_button_enabled[type=submit]") }

  context "with validations" do
    subject { helper.pb_form_with(url: "http://example.org", scope: :example, validate: true, &form_body) }

    it { is_expected.to have_tag("form[data-pb-form-validation=true]") }

    it "renders the javascript" do
      subject

      expect(helper.content_for(:pb_js)).to match(/window.addEventListener\("DOMContentLoaded", function\(\) \{ PbFormValidation.start\(\) \}\)/)
    end
  end

  context "without validations" do
    subject { helper.pb_form_with(url: "http://example.org", scope: :example, validate: false, &form_body) }

    it { is_expected.to have_tag("form[data-pb-form-validation=false]") }
  end

  context "with autocomplete props" do
    let(:form_body_with_autocomplete) do
      ->(builder) do
        concat builder.text_field :string_autocomplete, props: { label: true, autocomplete: "email" }
        concat builder.text_field :boolean_true_autocomplete, props: { label: true, autocomplete: true }
        concat builder.text_field :boolean_false_autocomplete, props: { label: true, autocomplete: false }
        concat builder.text_field :no_autocomplete, props: { label: true }
      end
    end

    subject { helper.pb_form_with(url: "http://example.org", scope: :example, validate: false, &form_body_with_autocomplete) }

    it "passes through string autocomplete values" do
      expect(subject).to have_tag("input[name='example[string_autocomplete]'][autocomplete='email']")
    end

    it "sets autocomplete to 'off' when false" do
      expect(subject).to have_tag("input[name='example[boolean_false_autocomplete]'][autocomplete='off']")
    end

    it "removes autocomplete attribute when true" do
      expect(subject).to have_tag("input[name='example[boolean_true_autocomplete]']")
      expect(subject).not_to have_tag("input[name='example[boolean_true_autocomplete]'][autocomplete]")
    end

    it "has no autocomplete attribute when not specified" do
      expect(subject).to have_tag("input[name='example[no_autocomplete]']")
      expect(subject).not_to have_tag("input[name='example[no_autocomplete]'][autocomplete]")
    end
  end

  context "with style props" do
    let(:form_body_with_styles) do
      ->(builder) do
        concat builder.text_field :disabled_with_style, props: { label: true, disabled: true }, style: "border: 1px solid blue;"
        concat builder.text_field :enabled_with_style, props: { label: true, disabled: false }, style: "border: 1px solid blue;"
        concat builder.text_field :no_style_field, props: { label: true, disabled: true }
      end
    end

    subject { helper.pb_form_with(url: "http://example.org", scope: :example, validate: false, &form_body_with_styles) }

    it "combines existing styles with cursor style for disabled fields" do
      expect(subject).to have_tag("input[name='example[disabled_with_style]'][style*='border: 1px solid blue'][style*='cursor: not-allowed']")
    end

    it "combines existing styles with cursor style for enabled fields" do
      expect(subject).to have_tag("input[name='example[enabled_with_style]'][style*='border: 1px solid blue'][style*='cursor: pointer']")
    end

    it "only adds cursor style when no existing styles" do
      expect(subject).to have_tag("input[name='example[no_style_field]'][style='cursor: not-allowed']")
    end
  end

  context "with mask props" do
    let(:form_body_with_mask) do
      ->(builder) do
        concat builder.text_field :currency_field, props: { label: true, mask: "currency" }
        concat builder.text_field :inline_field, props: { label: true, inline: true }
        concat builder.text_field :both_field, props: { label: true, mask: "currency", inline: true }
      end
    end

    subject { helper.pb_form_with(url: "http://example.org", scope: :example, validate: false, &form_body_with_mask) }

    it "passes through mask prop to text input" do
      expect(subject).to have_tag("input[mask='currency'][data-pb-input-mask='true']")
    end

    it "passes through inline prop to text input" do
      expect(subject).to have_tag("input[name='example[inline_field]']")
    end

    it "passes through both mask and inline props" do
      expect(subject).to have_tag("input[mask='currency'][data-pb-input-mask='true']")
    end

    it "includes all mask-related attributes for currency" do
      expect(subject).to have_tag("input[mask='currency']")
      expect(subject).to have_tag("input[data-pb-input-mask='true']")
      expect(subject).to have_tag("input[pattern]")
    end
  end

  context "with disabled props" do
    let(:form_body_with_disabled) do
      ->(builder) do
        concat builder.text_field :disabled_field, props: { label: true, disabled: true }
        concat builder.text_field :enabled_field, props: { label: true, disabled: false }
        concat builder.text_field :no_disabled_prop, props: { label: true }
      end
    end

    subject { helper.pb_form_with(url: "http://example.org", scope: :example, validate: false, &form_body_with_disabled) }

    it "adds disabled attribute when disabled is true" do
      expect(subject).to have_tag("input[name='example[disabled_field]'][disabled]")
    end

    it "does not add disabled attribute when disabled is false" do
      expect(subject).to have_tag("input[name='example[enabled_field]']")
      expect(subject).not_to have_tag("input[name='example[enabled_field]'][disabled]")
    end

    it "does not add disabled attribute when not specified" do
      expect(subject).to have_tag("input[name='example[no_disabled_prop]']")
      expect(subject).not_to have_tag("input[name='example[no_disabled_prop]'][disabled]")
    end
  end

  context "with required props" do
    let(:form_body_with_required) do
      ->(builder) do
        concat builder.text_field :required_field, props: { label: true, required: true }
        concat builder.text_field :not_required_field, props: { label: true, required: false }
        concat builder.text_field :no_required_prop, props: { label: true }
      end
    end

    subject { helper.pb_form_with(url: "http://example.org", scope: :example, validate: false, &form_body_with_required) }

    it "adds required attribute when required is true" do
      expect(subject).to have_tag("input[name='example[required_field]'][required]")
    end

    it "does not add required attribute when required is false" do
      expect(subject).to have_tag("input[name='example[not_required_field]']")
      expect(subject).not_to have_tag("input[name='example[not_required_field]'][required]")
    end

    it "does not add required attribute when not specified" do
      expect(subject).to have_tag("input[name='example[no_required_prop]']")
      expect(subject).not_to have_tag("input[name='example[no_required_prop]'][required]")
    end
  end

  context "with placeholder props" do
    let(:form_body_with_placeholder) do
      ->(builder) do
        concat builder.text_field :with_placeholder, props: { label: true, placeholder: "Enter your name" }
        concat builder.text_field :empty_placeholder, props: { label: true, placeholder: "" }
        concat builder.text_field :no_placeholder, props: { label: true }
      end
    end

    subject { helper.pb_form_with(url: "http://example.org", scope: :example, validate: false, &form_body_with_placeholder) }

    it "adds placeholder attribute when specified" do
      expect(subject).to have_tag("input[name='example[with_placeholder]'][placeholder='Enter your name']")
    end

    it "adds empty placeholder attribute when empty string" do
      expect(subject).to have_tag("input[name='example[empty_placeholder]'][placeholder='']")
    end

    it "adds empty placeholder attribute when not specified" do
      expect(subject).to have_tag("input[name='example[no_placeholder]'][placeholder='']")
    end
  end

  context "with type props" do
    let(:form_body_with_type) do
      ->(builder) do
        concat builder.text_field :text_field, props: { label: true, type: "text" }
        concat builder.text_field :email_field, props: { label: true, type: "email" }
        concat builder.text_field :no_type, props: { label: true }
      end
    end

    subject { helper.pb_form_with(url: "http://example.org", scope: :example, validate: false, &form_body_with_type) }

    it "adds type attribute when specified" do
      expect(subject).to have_tag("input[name='example[text_field]'][type='text']")
      expect(subject).to have_tag("input[name='example[email_field]'][type='email']")
    end

    it "uses default type when not specified" do
      expect(subject).to have_tag("input[name='example[no_type]'][type='text']")
    end
  end

  context "with value props" do
    let(:form_body_with_value) do
      ->(builder) do
        concat builder.text_field :with_value, props: { label: true, value: "Hello World" }
        concat builder.text_field :empty_value, props: { label: true, value: "" }
        concat builder.text_field :no_value, props: { label: true }
      end
    end

    subject { helper.pb_form_with(url: "http://example.org", scope: :example, validate: false, &form_body_with_value) }

    it "adds value attribute when specified" do
      expect(subject).to have_tag("input[name='example[with_value]'][value='Hello World']")
    end

    it "adds empty value attribute when empty string" do
      expect(subject).to have_tag("input[name='example[empty_value]'][value='']")
    end

    it "does not add value attribute when not specified" do
      expect(subject).to have_tag("input[name='example[no_value]']")
      expect(subject).not_to have_tag("input[name='example[no_value]'][value]")
    end
  end

  context "with validation props" do
    let(:form_body_with_validation) do
      ->(builder) do
        concat builder.text_field :with_pattern, props: { label: true, validation: { pattern: "\\d{3}-\\d{3}-\\d{4}", message: "Please enter a valid phone number" } }
        concat builder.text_field :with_message_only, props: { label: true, validation: { message: "This field is required" } }
        concat builder.text_field :no_validation, props: { label: true }
      end
    end

    subject { helper.pb_form_with(url: "http://example.org", scope: :example, validate: false, &form_body_with_validation) }

    it "adds pattern and data-message attributes when validation is specified" do
      expect(subject).to have_tag("input[name='example[with_pattern]'][pattern]")
      expect(subject).to have_tag("input[name='example[with_pattern]'][data-message='Please enter a valid phone number']")
    end

    it "adds only data-message attribute when only message is specified" do
      expect(subject).to have_tag("input[name='example[with_message_only]'][data-message='This field is required']")
      expect(subject).not_to have_tag("input[name='example[with_message_only]'][pattern]")
    end

    it "does not add validation attributes when not specified" do
      expect(subject).to have_tag("input[name='example[no_validation]']")
      expect(subject).not_to have_tag("input[name='example[no_validation]'][pattern]")
      expect(subject).not_to have_tag("input[name='example[no_validation]'][data-message]")
    end
  end

  context "with multiple props combined" do
    let(:form_body_with_multiple) do
      ->(builder) do
        concat builder.text_field :complex_field, props: {
          label: true,
          disabled: true,
          required: true,
          placeholder: "Enter value",
          type: "email",
          value: "test@example.com",
          autocomplete: "email",
          validation: { pattern: "\\S+@\\S+\\.\\S+", message: "Invalid email" },
        }, style: "border: 2px solid red;"
      end
    end

    subject { helper.pb_form_with(url: "http://example.org", scope: :example, validate: false, &form_body_with_multiple) }

    it "handles all props correctly when combined" do
      expect(subject).to have_tag("input[name='example[complex_field]'][disabled]")
      expect(subject).to have_tag("input[name='example[complex_field]'][required]")
      expect(subject).to have_tag("input[name='example[complex_field]'][placeholder='Enter value']")
      expect(subject).to have_tag("input[name='example[complex_field]'][type='email']")
      expect(subject).to have_tag("input[name='example[complex_field]'][value='test@example.com']")
      expect(subject).to have_tag("input[name='example[complex_field]'][autocomplete='email']")
      expect(subject).to have_tag("input[name='example[complex_field]'][pattern]")
      expect(subject).to have_tag("input[name='example[complex_field]'][data-message='Invalid email']")
      expect(subject).to have_tag("input[name='example[complex_field]'][style*='border: 2px solid red'][style*='cursor: not-allowed']")
    end
  end
end
