# frozen_string_literal: true

require "rails_helper"

RSpec.describe Playbook::Forms::Builder, "#date_picker", type: :helper do
  include_context "playbook form builder"

  it "renders a date picker kit wrapping a text input" do
    rendered = render_form { |builder| concat builder.date_picker(:starts_on) }

    expect(rendered).to have_tag("form .pb_date_picker_kit input[name='example[starts_on]']")
  end

  it "defaults the label to Date Picker" do
    rendered = render_form { |builder| concat builder.date_picker(:starts_on) }

    expect(rendered).to have_tag("form .pb_date_picker_kit", text: /Date Picker/)
  end

  it "humanizes the label when label is true" do
    rendered = render_form { |builder| concat builder.date_picker(:starts_on, props: { label: true }) }

    expect(rendered).to have_tag("form .pb_date_picker_kit", text: /Starts on/)
  end

  it "sets name, picker id, required, and placeholder on the nested input" do
    rendered = render_form do |builder|
      concat builder.date_picker(
        :starts_on,
        props: { required: true, placeholder: "Pick a date", validation_message: "Date is required" }
      )
    end

    expect(rendered).to have_tag("input[name='example[starts_on]'][id='example_starts_on'][required][placeholder='Pick a date'][data-message='Date is required']")
  end

  it "disables the nested input when disable_input is true" do
    rendered = render_form { |builder| concat builder.date_picker(:starts_on, props: { disable_input: true }) }

    expect(rendered).to have_tag("input[name='example[starts_on]'][disabled]")
  end
end
