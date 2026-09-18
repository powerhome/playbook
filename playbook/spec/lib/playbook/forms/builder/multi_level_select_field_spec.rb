# frozen_string_literal: true

require "rails_helper"

RSpec.describe Playbook::Forms::Builder, "#multi_level_select", type: :helper do
  include_context "playbook form builder"

  it "renders a multi level select kit with form data and name" do
    rendered = render_form { |builder| concat builder.multi_level_select(:region) }

    expect(rendered).to have_tag("form .pb_multi_level_select[data-multi-level-select-form='true']")
  end

  it "humanizes the label when label is true" do
    rendered = render_form { |builder| concat builder.multi_level_select(:office_region, props: { label: true }) }

    expect(rendered).to have_tag("form .pb_multi_level_select", text: /Office region/)
  end

  it "merges with existing data props" do
    rendered = render_form do |builder|
      concat builder.multi_level_select(:region, props: { data: { testid: "regions" } })
    end

    expect(rendered).to have_tag(".pb_multi_level_select[data-testid='regions'][data-multi-level-select-form='true']")
  end
end
