# frozen_string_literal: true

require "rails_helper"

RSpec.describe Playbook::Forms::Builder, "#check_box", type: :helper do
  include_context "playbook form builder"

  it "renders a checkbox kit wrapping a checkbox input" do
    rendered = render_form { |builder| concat builder.check_box(:terms) }

    expect(rendered).to have_tag("form .pb_checkbox_kit_off input[type=checkbox][name='example[terms]']")
  end

  it "defaults margin_bottom to sm" do
    rendered = render_form { |builder| concat builder.check_box(:terms) }

    expect(rendered).to have_tag("form .pb_checkbox_kit_off.mb_sm")
  end

  it "preserves an explicit margin_bottom" do
    rendered = render_form { |builder| concat builder.check_box(:terms, props: { margin_bottom: "lg" }) }

    expect(rendered).to have_tag("form .pb_checkbox_kit_off.mb_lg")
    expect(rendered).not_to have_tag("form .pb_checkbox_kit_off.mb_sm")
  end

  it "adds a caption when label is true" do
    rendered = render_form { |builder| concat builder.check_box(:terms, props: { label: true }) }

    expect(rendered).to have_tag("form .pb_caption_kit_md_lighter", text: /Terms/)
    expect(rendered).to have_tag("form .pb_checkbox_kit_off")
  end

  it "marks the input required when required is true" do
    rendered = render_form { |builder| concat builder.check_box(:terms, props: { required: true }) }

    expect(rendered).to have_tag("input[type=checkbox][name='example[terms]'][required]")
  end

  it "passes checked and unchecked values through to the Rails checkbox helper" do
    rendered = render_form do |builder|
      concat builder.check_box(:terms, checked_value: "yes", unchecked_value: "no")
    end

    expect(rendered).to have_tag("input[type=hidden][name='example[terms]'][value='no']")
    expect(rendered).to have_tag("input[type=checkbox][name='example[terms]'][value='yes']")
  end
end
