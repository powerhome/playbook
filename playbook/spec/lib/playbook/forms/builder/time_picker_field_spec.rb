# frozen_string_literal: true

require "rails_helper"

RSpec.describe Playbook::Forms::Builder, "#time_picker", type: :helper do
  include_context "playbook form builder"

  it "renders a time picker kit with scoped name and id" do
    rendered = render_form { |builder| concat builder.time_picker(:starts_at) }

    expect(rendered).to have_tag("form .pb_time_picker#example_starts_at")
    expect(rendered).to have_tag("input[name='example[starts_at]'][id='example_starts_at-input']")
  end

  it "defaults the label to Time Picker" do
    rendered = render_form { |builder| concat builder.time_picker(:starts_at) }

    expect(rendered).to have_tag("form .pb_time_picker", text: /Time Picker/)
  end

  it "humanizes the label when label is true" do
    rendered = render_form { |builder| concat builder.time_picker(:starts_at, props: { label: true }) }

    expect(rendered).to have_tag("form .pb_time_picker", text: /Starts at/)
  end
end
