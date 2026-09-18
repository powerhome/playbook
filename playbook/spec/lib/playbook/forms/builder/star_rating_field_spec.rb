# frozen_string_literal: true

require "rails_helper"

RSpec.describe Playbook::Forms::Builder, "#star_rating_field", type: :helper do
  include_context "playbook form builder"

  it "renders a star rating kit" do
    rendered = render_form { |builder| concat builder.star_rating_field(:score) }

    expect(rendered).to have_tag("form .pb_star_rating_kit")
  end

  it "defaults margin_bottom to sm" do
    rendered = render_form { |builder| concat builder.star_rating_field(:score) }

    expect(rendered).to have_tag("form .pb_star_rating_kit.mb_sm")
  end

  it "preserves an explicit margin_bottom" do
    rendered = render_form { |builder| concat builder.star_rating_field(:score, props: { margin_bottom: "lg" }) }

    expect(rendered).to have_tag("form .pb_star_rating_kit.mb_lg")
    expect(rendered).not_to have_tag("form .pb_star_rating_kit.mb_sm")
  end

  it "uses a Rails label when label is true" do
    rendered = render_form { |builder| concat builder.star_rating_field(:score, props: { label: true, variant: "interactive" }) }

    expect(rendered).to have_tag("form .pb_star_rating_kit", text: /Score/)
  end
end
