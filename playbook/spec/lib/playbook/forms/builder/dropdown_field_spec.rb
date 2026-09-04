# frozen_string_literal: true

require "rails_helper"

RSpec.describe Playbook::Forms::Builder, "#dropdown_field", type: :helper do
  include_context "playbook form builder"

  let(:options) do
    [
      { id: "1", label: "One", value: "1" },
      { id: "2", label: "Two", value: "2" },
    ]
  end

  it "renders a dropdown kit with the field name" do
    rendered = render_form { |builder| concat builder.dropdown_field(:status, props: { options: options }) }

    expect(rendered).to have_tag("form .pb_dropdown_default")
    expect(rendered).to have_tag("input[name='status']")
  end

  it "defaults margin_bottom to sm" do
    rendered = render_form { |builder| concat builder.dropdown_field(:status, props: { options: options }) }

    expect(rendered).to have_tag("form .pb_dropdown_default.mb_sm")
  end

  it "preserves an explicit margin_bottom" do
    rendered = render_form do |builder|
      concat builder.dropdown_field(:status, props: { options: options, margin_bottom: "lg" })
    end

    expect(rendered).to have_tag("form .pb_dropdown_default.mb_lg")
    expect(rendered).not_to have_tag("form .pb_dropdown_default.mb_sm")
  end

  it "humanizes the label when label is true" do
    rendered = render_form do |builder|
      concat builder.dropdown_field(:office_location, props: { options: options, label: true })
    end

    expect(rendered).to have_tag("form .pb_dropdown_default", text: /Office location/)
  end
end
