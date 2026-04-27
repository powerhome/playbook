# frozen_string_literal: true

require_relative "../../../app/pb_kits/playbook/pb_body/body"
require_relative "../../../app/pb_kits/playbook/pb_button/button"
require_relative "../../../app/pb_kits/playbook/pb_card/card"
require_relative "../../../app/pb_kits/playbook/pb_title/title"
require_relative "../../../app/pb_kits/playbook/pb_text_input/text_input"
require_relative "../../../app/pb_kits/playbook/pb_flex/flex"
require_relative "../../../app/pb_kits/playbook/pb_link/link"
require_relative "../../../app/pb_kits/playbook/pb_badge/badge"

RSpec.describe Playbook::Flex do
  subject { Playbook::PbBody::Body }

  test_global_prop(
    :border,
    %w[none default],
    ->(v) { v == "none" ? "border_none" : "border_#{v}" },
    test_subjects: [
      Playbook::PbBody::Body,
      Playbook::PbButton::Button,
      Playbook::PbCard::Card,
      Playbook::PbTitle::Title,
      Playbook::PbTextInput::TextInput,
      Playbook::PbFlex::Flex,
      Playbook::PbLink::Link,
      Playbook::PbBadge::Badge,
    ]
  )

  test_global_prop_absence(
    :border,
    %w[
      border_none border_default
      border_top_none border_top_default border_x_default
    ]
  )

  test_global_prop_invalid_values(
    :border,
    %w[invalid bad_value not_valid],
    %w[border_invalid border_bad_value border_not_valid]
  )

  describe "#classname with directional border props" do
    it "includes border_top and border_x classes", :aggregate_failures do
      kit = Playbook::PbBody::Body.new({ border_top: "default", border_x: "default" })
      expect(kit.classname).to include("border_top_default")
      expect(kit.classname).to include("border_x_default")
    end
  end
end
