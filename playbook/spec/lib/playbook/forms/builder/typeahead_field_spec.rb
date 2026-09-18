# frozen_string_literal: true

require "rails_helper"

RSpec.describe Playbook::Forms::Builder, "#typeahead", type: :helper do
  include_context "playbook form builder"

  let(:options) do
    [
      { label: "Red", value: "red" },
      { label: "Blue", value: "blue" },
    ]
  end

  it "renders a typeahead kit with the field name" do
    rendered = render_form { |builder| concat builder.typeahead(:color, props: { options: options }) }

    expect(rendered).to have_tag("form .pb_typeahead_kit")
  end

  it "humanizes the label when label is true" do
    rendered = render_form do |builder|
      concat builder.typeahead(:favorite_color, props: { options: options, label: true })
    end

    expect(rendered).to have_tag("form .pb_typeahead_kit", text: /Favorite color/)
  end

  it "copies validation message onto input_options data" do
    rendered = render_form do |builder|
      concat builder.typeahead(
        :color,
        props: { options: options, validation: { message: "Pick a color" } }
      )
    end

    expect(rendered).to have_tag("[data-validation-message='Pick a color']")
  end
end
