# frozen_string_literal: true

require "rails_helper"

RSpec.describe Playbook::Forms::Builder, "#intl_telephone", type: :helper do
  include_context "playbook form builder"

  it "renders a phone number input kit with name and generated id" do
    rendered = render_form { |builder| concat builder.intl_telephone(:mobile) }

    expect(rendered).to have_tag("form .pb_phone_number_input")
    expect(rendered).to have_tag("input[name='mobile']")
  end

  it "humanizes the label when label is true" do
    rendered = render_form { |builder| concat builder.intl_telephone(:mobile, props: { label: true }) }

    expect(rendered).to have_tag("form .pb_phone_number_input", text: /Mobile/)
  end

  it "uses an explicit id when provided" do
    rendered = render_form { |builder| concat builder.intl_telephone(:mobile, props: { id: "custom-mobile" }) }

    expect(rendered).to have_tag("input#custom-mobile[name='mobile']")
  end
end
