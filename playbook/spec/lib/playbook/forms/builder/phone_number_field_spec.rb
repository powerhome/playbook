# frozen_string_literal: true

require "rails_helper"

RSpec.describe Playbook::Forms::Builder, "#phone_number_field", type: :helper do
  include_context "playbook form builder"

  it "renders a phone number input kit with name and generated id" do
    rendered = render_form { |builder| concat builder.phone_number_field(:phone) }

    expect(rendered).to have_tag("form .pb_phone_number_input")
    expect(rendered).to have_tag("input[name='phone']")
  end

  it "humanizes the label when label is true" do
    rendered = render_form { |builder| concat builder.phone_number_field(:home_phone, props: { label: true }) }

    expect(rendered).to have_tag("form .pb_phone_number_input", text: /Home phone/)
  end

  it "uses an explicit id when provided" do
    rendered = render_form { |builder| concat builder.phone_number_field(:phone, props: { id: "custom-phone" }) }

    expect(rendered).to have_tag("input#custom-phone[name='phone']")
  end
end
