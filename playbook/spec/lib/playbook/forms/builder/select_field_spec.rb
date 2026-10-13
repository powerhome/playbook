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

  it "renders an empty prompt by default" do
    rendered = render_form { |builder| concat builder.select(:status, choices) }

    expect(rendered).to have_tag("option[value='']", text: "")
  end

  [false, nil].each do |prompt|
    it "does not render a prompt when prompt is #{prompt.inspect} and blank_selection is omitted" do
      rendered = render_form do |builder|
        concat builder.select(:status, choices, { prompt: prompt })
      end

      expect(rendered).not_to have_tag("option[value='']")
      expect(rendered).to have_tag("option", count: 2)
    end
  end

  it "preserves an explicit prompt when blank_selection is omitted" do
    rendered = render_form do |builder|
      concat builder.select(:status, choices, { prompt: "Pick one" })
    end

    expect(rendered).to have_tag("option[value='']", text: "Pick one")
  end

  [false, nil, "Pick one"].each do |prompt|
    it "prefers blank_selection over prompt: #{prompt.inspect}" do
      rendered = render_form do |builder|
        concat builder.select(:status, choices, { prompt: prompt }, props: { blank_selection: "All" })
      end

      expect(rendered).to have_tag("option[value='']", text: "All")
      expect(rendered).not_to have_tag("option", text: "Pick one")
      expect(rendered).to have_tag("option", count: 3)
    end
  end

  it "renders an empty prompt when blank_selection is explicitly nil" do
    rendered = render_form do |builder|
      concat builder.select(:status, choices, { prompt: false }, props: { blank_selection: nil })
    end

    expect(rendered).to have_tag("option[value='']", text: "")
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
