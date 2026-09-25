# frozen_string_literal: true

require "rails_helper"

RSpec.describe Playbook::Forms::Builder, "#select", type: :helper do
  include_context "playbook form builder"

  let(:choices) { [%w[Active active], %w[Inactive inactive]] }

  it "renders a select kit wrapping a Rails select" do
    rendered = render_form { |builder| concat builder.select(:status, choices) }

    expect(rendered).to have_tag("form .pb_select select[name='example[status]']")
    expect(rendered).to have_tag("option[value='active']", text: "Active")
  end

  it "humanizes the label when label is true" do
    rendered = render_form { |builder| concat builder.select(:status, choices, props: { label: true }) }

    expect(rendered).to have_tag("form .pb_select label", text: /Status/)
  end

  it "uses a blank selection prompt, required, and validation message" do
    rendered = render_form do |builder|
      concat builder.select(
        :status,
        choices,
        props: { blank_selection: "Choose one", required: true, validation_message: "Status is required" }
      )
    end

    expect(rendered).to have_tag("select[name='example[status]'][required][data-message='Status is required']")
    expect(rendered).to have_tag("option", text: "Choose one")
  end

  it "passes class and data from input_options" do
    rendered = render_form do |builder|
      concat builder.select(
        :status,
        choices,
        props: { input_options: { class: "custom-select", data: { controller: "search" } } }
      )
    end

    expect(rendered).to have_tag("select.custom-select[data-controller='search']")
  end
end
