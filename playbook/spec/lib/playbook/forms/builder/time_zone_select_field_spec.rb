# frozen_string_literal: true

require "rails_helper"

RSpec.describe Playbook::Forms::Builder, "#time_zone_select_field", type: :helper do
  include_context "playbook form builder"

  it "renders a select kit wrapping a time zone select" do
    rendered = render_form { |builder| concat builder.time_zone_select_field(:time_zone, nil) }

    expect(rendered).to have_tag("form .pb_select select[name='example[time_zone]']")
  end

  it "humanizes the label when label is true" do
    rendered = render_form { |builder| concat builder.time_zone_select_field(:time_zone, nil, props: { label: true }) }

    expect(rendered).to have_tag("form .pb_select label", text: /Time zone/)
  end

  it "uses a blank selection prompt, required, and validation message" do
    rendered = render_form do |builder|
      concat builder.time_zone_select_field(
        :time_zone,
        nil,
        {},
        {},
        props: { blank_selection: "Choose a zone", required: true, validation_message: "Time zone is required" }
      )
    end

    expect(rendered).to have_tag("select[name='example[time_zone]'][required][data-message='Time zone is required']")
    expect(rendered).to have_tag("option", text: "Choose a zone")
  end
end
