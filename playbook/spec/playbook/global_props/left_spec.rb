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

  valid_sizes = %w[xs sm md lg xl]

  test_global_prop(
    :left,
    valid_sizes,
    ->(v) { "left_#{v}" },
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

  # Test object values with inset
  describe "#left with object values (inset)" do
    it "returns correct class names", :aggregate_failures do
      test_cases = [
        { value: { value: "md", inset: true }, expected: "left_md_inset" },
        { value: { value: "lg", inset: false }, expected: "left_lg" },
        { value: { value: "sm", inset: true }, expected: "left_sm_inset" },
      ]

      test_cases.each do |test_case|
        instance = subject.new({ left: test_case[:value] })
        expect(instance.classname).to include(test_case[:expected])
      end
    end
  end

  test_global_prop_absence(
    :left,
    %w[left_xs left_sm left_md left_lg left_xl]
  )

  # NOTE: Currently using allow_errors: true because globalProps generates classes for invalid values
  test_global_prop_invalid_values(
    :left,
    ["invalid", "bad_value", "not_a_size", "special-chars!@#"],
    %w[left_invalid left_bad_value left_not_a_size left_special-chars!@#],
    allow_errors: true
  )
end
